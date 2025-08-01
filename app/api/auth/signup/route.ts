import z from "zod";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
export async function POST(req:Request) {
    const body = await req.json();
    const schema = z.object({
        username: z.string().min(3),
        password: z.string().min(3),
    });
    const {username, password} = schema.parse(body);
    const exist = await prisma.user.findUnique({
        where: {
            username
        }
    })
    if(exist) {
        return new Response(JSON.stringify({error: "User already exists"}), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user =await prisma.user.create({
        data: { 
            username,
            password: hashedPassword
        }   
    })
    return new Response(JSON.stringify(user), {
        status: 201,
        headers: {
            "Content-Type": "application/json"
        }
    });
}
import z from "zod";
import { prisma } from "@/lib/prisma";
export async function POST(req:Request) {
    const body = await req.json();
    const schema = z.object({
        name: z.string().min(3),
        description: z.string().optional(),
    });
    const { name, description } = schema.parse(body);
    const exist = await prisma.category.findFirst({
        where: {
            name
        }
    });
    if (exist) {
        return new Response(JSON.stringify({ error: "Category already exists" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    const category = await prisma.category.create({
        data: {
            name,
            description
        }
    });
    return new Response(JSON.stringify(category), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
export async function GET() {
    const categories = await prisma.category.findMany();
    return new Response(JSON.stringify(categories), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function DELETE(req: Request) {
    const body = await req.json();
    const schema = z.object({
        id: z.string()
    });
    const { id } = schema.parse(body);
    const category = await prisma.category.delete({
        where: {
            id,
        },
    });
    return new Response(JSON.stringify(category), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
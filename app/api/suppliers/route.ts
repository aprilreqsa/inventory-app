import z from "zod";
import { prisma } from "@/lib/prisma";
export async function POST(req:Request) {
    const body = await req.json();
    const schema = z.object({
        name: z.string().min(3),
        contact: z.string().optional(),
        address: z.string().optional(),
    })
    const { name, contact, address } = schema.parse(body);
    const exist = await prisma.supplier.findFirst({
        where: {
            name
        }
    });
    if (exist) {
        return new Response(JSON.stringify({ error: "Supplier already exists" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    const supplier = await prisma.supplier.create({
        data: {
            name,
            contact,
            address
        }
    });
    return new Response(JSON.stringify(supplier), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function GET() {
    const suppliers = await prisma.supplier.findMany();
    return new Response(JSON.stringify(suppliers), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}


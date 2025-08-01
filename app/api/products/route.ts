import z from "zod";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.json();
    const schema = z.object({
        name: z.string().min(3),
        description: z.string().optional(),
        price: z.number().positive(),
        categoryId: z.string(),
        supplierId: z.string(),
    })
    const { name, description, price, categoryId, supplierId } = schema.parse(body);
    const product = await prisma.product.create({
        data: {
            name,
            description,
            price,
            categoryId,
            supplierId
        }
    });
    return new Response(JSON.stringify(product), {
        status: 201,
        headers: {
            "Content-Type": "application/json"
        }
    });
}
export async function GET() {
    const products = await prisma.product.findMany({
        include: {
            category: true,
            supplier: true
        }
    });
    return new Response(JSON.stringify(products), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export async function DELETE(req: Request) {
    const body = await req.json();
    const schema = z.object({
        id: z.string()
    });
    const { id } = schema.parse(body);
    const product = await prisma.product.delete({
        where: {
            id,
        },
    });
    return new Response(JSON.stringify(product), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
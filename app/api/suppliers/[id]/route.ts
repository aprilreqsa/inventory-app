import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context:{params: {id: string;}}){
    const id = context.params.id
    const body = await req.json()
    const {name, contact, address } = body

    const updated = await prisma.supplier.update({
        where: {
            id
        },
        data: {
            name,
            contact,
            address
        }
    })
    if(!updated) return NextResponse.json({message: "supplier not found"})
    return NextResponse.json({updated})
}

export async function DELETE(req: Request, context: {params: {id: string;}}) {
    const id = context.params.id
    const supplier = await prisma.supplier.delete({
        where: {
            id,
        },
    });
    return new Response(JSON.stringify(supplier), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
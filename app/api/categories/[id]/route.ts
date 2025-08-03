import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, {params}: {params: {id: string;}}){
    const {id} = params
    const body = await req.json()
    const {name, description} = body
    const updated = await prisma.category.update({
        where: {
            id
        },
        data: {
            name,
            description
        }
    })
    if(!updated) return NextResponse.json({message: "Category not found"});
    return NextResponse.json({updated},{status:200})
    
}

export async function DELETE( context: {params: {id: string;}}) {
    const id = context.params.id
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
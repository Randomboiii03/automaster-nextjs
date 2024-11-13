import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { moduleSchema } from "@/app/validationSchema";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = moduleSchema.safeParse(body)

    if(!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    const newModule = await prisma.module.create({
        data: { title: body.title, description: body.description }
    });

    return NextResponse.json(newModule, { status: 201 })
}
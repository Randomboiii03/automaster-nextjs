import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { moduleSchema } from "@/app/validationSchema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = moduleSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }

    const newModule = await prisma.module.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newModule, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong while creating the module." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const modules = await prisma.module.findMany();

    return NextResponse.json(modules, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong while fetching the modules." },
      { status: 500 }
    );
  }
}

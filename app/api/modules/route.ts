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

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (id) {
      const module = await prisma.module.findUnique({
        where: { id: parseInt(id) },
      });

      if (!module) {
        return NextResponse.json(
          { error: `Module with ID ${id} not found` },
          { status: 404 }
        );
      }

      return NextResponse.json(module, { status: 200 });
    } else {
      const modules = await prisma.module.findMany();
      return NextResponse.json(modules, { status: 200 });
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong while fetching the modules." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Module ID is required" },
        { status: 400 }
      );
    }

    
    const deletedModule = await prisma.module.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(deletedModule, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong while deleting the module." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
    try {
      const id = request.nextUrl.searchParams.get("id");
  
      if (!id) {
        return NextResponse.json(
          { error: "Module ID is required" },
          { status: 400 }
        );
      }
  
      const body = await request.json();
  
      // Validate the input data
      const validation = moduleSchema.safeParse(body);
  
      if (!validation.success) {
        return NextResponse.json(
          { error: validation.error.errors },
          { status: 400 }
        );
      }
  
      // Check if the module exists
      const existingModule = await prisma.module.findUnique({
        where: { id: parseInt(id) }, // Ensure the ID is an integer
      });
  
      if (!existingModule) {
        return NextResponse.json(
          { error: `Module with ID ${id} not found` },
          { status: 404 }
        );
      }
  
      // Update the module
      const updatedModule = await prisma.module.update({
        where: { id: parseInt(id) },
        data: {
          title: body.title,
          description: body.description,
        },
      });
  
      return NextResponse.json(updatedModule, { status: 200 });
    } catch (error) {
      console.error(error);
  
      return NextResponse.json(
        { error: "Something went wrong while updating the module." },
        { status: 500 }
      );
    }
  }
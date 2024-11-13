import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { moduleSchema } from "@/app/validationSchema";

// POST: Create a new module
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

// GET: Fetch all modules or a specific module by ID
export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id"); // Use .get() to access the query parameter

    if (id) {
      // Fetch a single module by ID
      const module = await prisma.module.findUnique({
        where: { id: parseInt(id) }, // Ensure the ID is an integer
      });

      if (!module) {
        return NextResponse.json(
          { error: `Module with ID ${id} not found` },
          { status: 404 }
        );
      }

      return NextResponse.json(module, { status: 200 });
    } else {
      // Fetch all modules
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

// DELETE: Delete a module by its ID
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id"); // Use .get() to access the query parameter

    if (!id) {
      return NextResponse.json(
        { error: "Module ID is required" },
        { status: 400 }
      );
    }

    // Delete the module
    const deletedModule = await prisma.module.delete({
      where: { id: parseInt(id) }, // Convert the ID to an integer
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

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

function getUser(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) return null;

  return verifyToken(token);
}

export async function GET() {
  const projects = await prisma.project.findMany({
    include: {
      owner: {
        select: {
          name: true,
          email: true,
        },
      },
      tasks: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const user = getUser(request);

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Only admin can create projects" },
      { status: 403 }
    );
  }

  const body = await request.json();
  const { name, description } = body;

  if (!name) {
    return NextResponse.json(
      { message: "Project name is required" },
      { status: 400 }
    );
  }

  const project = await prisma.project.create({
    data: {
      name,
      description,
      ownerId: user.id,
    },
  });

  return NextResponse.json(project);
}

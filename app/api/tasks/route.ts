import { NextResponse } from "next/server";
import { TaskStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

function getUser(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) return null;

  return verifyToken(token);
}

export async function GET(request: Request) {
  const user = getUser(request);

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const tasks = await prisma.task.findMany({
    where:
      user.role === "MEMBER"
        ? {
            assigneeId: user.id,
          }
        : undefined,
    include: {
      project: true,
      assignee: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const user = getUser(request);

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Only admin can create tasks" },
      { status: 403 }
    );
  }

  const body = await request.json();
  const { title, description, projectId, assigneeId, dueDate } = body;

  if (!title || !projectId) {
    return NextResponse.json(
      { message: "Title and project are required" },
      { status: 400 }
    );
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      projectId,
      assigneeId: assigneeId || null,
      dueDate: dueDate ? new Date(dueDate) : null,
    },
  });

  return NextResponse.json(task);
}

export async function PATCH(request: Request) {
  const user = getUser(request);

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
  
const body = await request.json();
const { taskId } = body;
const rawStatus = String(body.status || "").trim().toUpperCase();

if (!taskId || !rawStatus) {
  return NextResponse.json(
    { message: "Task ID and status are required" },
    { status: 400 }
  );
}

const allowedStatuses = Object.values(TaskStatus);

if (!allowedStatuses.includes(rawStatus as TaskStatus)) {
  return NextResponse.json(
    { message: `Invalid task status: ${rawStatus}` },
    { status: 400 }
  );
}

const status = rawStatus as TaskStatus;



  const existingTask = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!existingTask) {
    return NextResponse.json(
      { message: "Task not found" },
      { status: 404 }
    );
  }

  if (user.role === "MEMBER" && existingTask.assigneeId !== user.id) {
    return NextResponse.json(
      { message: "Members can only update assigned tasks" },
      { status: 403 }
    );
  }

  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      status,
    },
  });

  return NextResponse.json(task);
}

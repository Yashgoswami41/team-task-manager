import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const now = new Date();

  const totalProjects = await prisma.project.count();

  const totalTasks = await prisma.task.count();

  const completedTasks = await prisma.task.count({
    where: {
      status: "DONE",
    },
  });

  const pendingTasks = await prisma.task.count({
    where: {
      status: {
        not: "DONE",
      },
    },
  });

  const overdueTasks = await prisma.task.count({
    where: {
      dueDate: {
        lt: now,
      },
      status: {
        not: "DONE",
      },
    },
  });

  return NextResponse.json({
    totalProjects,
    totalTasks,
    completedTasks,
    pendingTasks,
    overdueTasks,
  });
}

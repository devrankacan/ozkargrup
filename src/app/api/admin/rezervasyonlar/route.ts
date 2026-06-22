import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const reservations = await prisma.reservation.findMany({
    include: { car: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(reservations);
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const reservations = await prisma.reservation.findMany({
    where: { carId: id, status: { not: "cancelled" } },
    select: { startDate: true, endDate: true },
  });
  return NextResponse.json(reservations);
}

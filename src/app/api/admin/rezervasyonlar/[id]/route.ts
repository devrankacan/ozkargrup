import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await req.json();
  const reservation = await prisma.reservation.update({
    where: { id },
    data: {
      carId: body.carId,
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      startDate: body.startDate ? new Date(body.startDate) : undefined,
      endDate: body.endDate ? new Date(body.endDate) : undefined,
      pickupPlace: body.pickupPlace,
      dropoffPlace: body.dropoffPlace,
      notes: body.notes,
      status: body.status,
    },
    include: { car: true },
  });
  return NextResponse.json(reservation);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  await prisma.reservation.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

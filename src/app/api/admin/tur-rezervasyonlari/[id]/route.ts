import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await req.json();

  const reservation = await prisma.tourReservation.update({
    where: { id },
    data: {
      tourSlug: body.tourSlug,
      tourName: body.tourName,
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      peopleCount: body.peopleCount ? Number(body.peopleCount) : undefined,
      tourDate: body.tourDate ? new Date(body.tourDate) : undefined,
      notes: body.notes,
      status: body.status,
    },
  });
  return NextResponse.json(reservation);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  await prisma.tourReservation.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

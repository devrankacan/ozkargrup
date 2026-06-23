import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await req.json();

  const event = await prisma.tourEvent.update({
    where: { id },
    data: {
      tourSlug: body.tourSlug,
      tourName: body.tourName,
      eventDate: body.eventDate ? new Date(body.eventDate) : undefined,
      notes: body.notes,
    },
  });
  return NextResponse.json(event);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  await prisma.tourReservation.deleteMany({ where: { eventId: id } });
  await prisma.tourEvent.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const reservations = await prisma.tourReservation.findMany({
    include: { event: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(reservations);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json();

  if (!body.eventId || !body.fullName || !body.phone) {
    return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  const event = await prisma.tourEvent.findUnique({ where: { id: body.eventId } });
  if (!event) {
    return NextResponse.json({ error: "Seçilen etkinlik bulunamadı." }, { status: 404 });
  }

  const reservation = await prisma.tourReservation.create({
    data: {
      eventId: body.eventId,
      fullName: body.fullName,
      email: body.email || null,
      phone: body.phone,
      peopleCount: body.peopleCount ? Number(body.peopleCount) : 1,
      notes: body.notes || null,
      status: body.status || "confirmed",
    },
    include: { event: true },
  });

  return NextResponse.json(reservation, { status: 201 });
}

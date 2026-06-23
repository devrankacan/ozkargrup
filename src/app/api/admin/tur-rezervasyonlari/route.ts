import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const reservations = await prisma.tourReservation.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(reservations);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json();

  if (!body.tourSlug || !body.tourName || !body.fullName || !body.phone || !body.tourDate) {
    return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  const reservation = await prisma.tourReservation.create({
    data: {
      tourSlug: body.tourSlug,
      tourName: body.tourName,
      fullName: body.fullName,
      email: body.email || null,
      phone: body.phone,
      peopleCount: body.peopleCount ? Number(body.peopleCount) : 1,
      tourDate: new Date(body.tourDate),
      notes: body.notes || null,
      status: body.status || "confirmed",
    },
  });

  return NextResponse.json(reservation, { status: 201 });
}

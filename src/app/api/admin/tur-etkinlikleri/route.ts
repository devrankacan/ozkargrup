import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const events = await prisma.tourEvent.findMany({
    include: { reservations: true },
    orderBy: { eventDate: "asc" },
  });
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json();
  if (!body.tourSlug || !body.tourName || !body.eventDate) {
    return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  const event = await prisma.tourEvent.create({
    data: {
      tourSlug: body.tourSlug,
      tourName: body.tourName,
      eventDate: new Date(body.eventDate),
      notes: body.notes || null,
    },
  });
  return NextResponse.json(event, { status: 201 });
}

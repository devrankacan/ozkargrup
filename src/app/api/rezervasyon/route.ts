import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { findOverlappingReservation } from "@/lib/reservations";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { carId, fullName, email, phone, startDate, endDate, pickupPlace, dropoffPlace, notes } = body;

  if (!carId || !fullName || !email || !phone || !startDate || !endDate || !pickupPlace || !dropoffPlace) {
    return NextResponse.json({ error: "Lütfen gerekli alanları doldurun." }, { status: 400 });
  }

  const car = await prisma.car.findUnique({ where: { id: carId } });
  if (!car) {
    return NextResponse.json({ error: "Seçilen araç bulunamadı." }, { status: 404 });
  }

  const overlapping = await findOverlappingReservation(carId, new Date(startDate), new Date(endDate));
  if (overlapping) {
    return NextResponse.json(
      { error: "Seçilen araç bu tarihlerde dolu. Lütfen farklı bir tarih veya araç seçin." },
      { status: 409 }
    );
  }

  const reservation = await prisma.reservation.create({
    data: {
      carId,
      fullName,
      email,
      phone,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      pickupPlace,
      dropoffPlace,
      notes,
    },
  });

  return NextResponse.json({ success: true, id: reservation.id });
}

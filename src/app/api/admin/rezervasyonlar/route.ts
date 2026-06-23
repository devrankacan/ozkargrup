import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { findOverlappingReservation } from "@/lib/reservations";
import { sendReservationConfirmationEmail } from "@/lib/mailer";
import { getSiteSettings } from "@/lib/siteSettings";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const reservations = await prisma.reservation.findMany({
    include: { car: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(reservations);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json();

  if (!body.carId || !body.fullName || !body.phone || !body.startDate || !body.endDate) {
    return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  if (body.status !== "cancelled") {
    const overlapping = await findOverlappingReservation(body.carId, new Date(body.startDate), new Date(body.endDate));
    if (overlapping) {
      return NextResponse.json({ error: "Seçilen araç bu tarihlerde dolu." }, { status: 409 });
    }
  }

  const reservation = await prisma.reservation.create({
    data: {
      carId: body.carId,
      fullName: body.fullName,
      email: body.email || "",
      phone: body.phone,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      pickupPlace: body.pickupPlace || "",
      dropoffPlace: body.dropoffPlace || "",
      notes: body.notes || null,
      status: body.status || "confirmed",
    },
    include: { car: true },
  });

  if (reservation.email) {
    const settings = await getSiteSettings();
    sendReservationConfirmationEmail({
      to: reservation.email,
      fullName: reservation.fullName,
      logoUrl: settings.logoUrl,
      itemLabel: `${reservation.car.brand} ${reservation.car.name}`,
      dateRangeText: `${reservation.startDate.toLocaleDateString("tr-TR")} → ${reservation.endDate.toLocaleDateString("tr-TR")}`,
      detailRows: [
        { label: "Alış Yeri", value: reservation.pickupPlace },
        { label: "İade Yeri", value: reservation.dropoffPlace },
      ],
    }).catch((err) => console.error("Onay e-postası gönderilemedi:", err));
  }

  return NextResponse.json(reservation, { status: 201 });
}

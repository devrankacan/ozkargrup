import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { sendReservationEmail, type EmailTemplate } from "@/lib/mailer";
import { getSiteSettings } from "@/lib/siteSettings";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const { template } = (await req.json()) as { template: EmailTemplate };

  const reservation = await prisma.reservation.findUnique({ where: { id }, include: { car: true } });
  if (!reservation) {
    return NextResponse.json({ error: "Rezervasyon bulunamadı." }, { status: 404 });
  }
  if (!reservation.email) {
    return NextResponse.json({ error: "Bu rezervasyonda e-posta adresi yok." }, { status: 400 });
  }

  const settings = await getSiteSettings();
  await sendReservationEmail({
    to: reservation.email,
    fullName: reservation.fullName,
    logoUrl: settings.logoUrl,
    itemLabel: `${reservation.car.brand} ${reservation.car.name}`,
    dateRangeText: `${reservation.startDate.toLocaleDateString("tr-TR")} → ${reservation.endDate.toLocaleDateString("tr-TR")}`,
    detailRows: [
      { label: "Alış Yeri", value: reservation.pickupPlace },
      { label: "İade Yeri", value: reservation.dropoffPlace },
      { label: "Kategori", value: reservation.car.category },
      { label: "Vites", value: reservation.car.transmission },
      { label: "Yakıt", value: reservation.car.fuelType },
      { label: "Koltuk", value: `${reservation.car.seats} kişi` },
    ],
    template,
    kind: "car",
  });

  return NextResponse.json({ success: true });
}

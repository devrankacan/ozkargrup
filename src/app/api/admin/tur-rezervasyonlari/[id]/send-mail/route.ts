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

  const reservation = await prisma.tourReservation.findUnique({ where: { id } });
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
    itemLabel: reservation.tourName,
    dateRangeText: reservation.tourDate.toLocaleDateString("tr-TR"),
    detailRows: [],
    template,
  });

  return NextResponse.json({ success: true });
}

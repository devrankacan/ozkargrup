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

  const event = await prisma.tourEvent.findUnique({
    where: { id },
    include: { reservations: true },
  });
  if (!event) {
    return NextResponse.json({ error: "Etkinlik bulunamadı." }, { status: 404 });
  }

  const settings = await getSiteSettings();
  const recipients = event.reservations.filter((r) => r.email);

  await Promise.all(
    recipients.map((r) =>
      sendReservationEmail({
        to: r.email as string,
        fullName: r.fullName,
        logoUrl: settings.logoUrl,
        itemLabel: event.tourName,
        dateRangeText: event.eventDate.toLocaleDateString("tr-TR"),
        detailRows: [],
        template,
      })
    )
  );

  return NextResponse.json({ success: true, sent: recipients.length });
}

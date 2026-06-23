import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { buildCorporateWorkbook } from "@/lib/excel";

const statusLabels: Record<string, string> = {
  pending: "Bekliyor",
  confirmed: "Onaylandı",
  cancelled: "İptal",
};

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const reservations = await prisma.tourReservation.findMany({
    where: {
      event: {
        ...(from && { eventDate: { gte: new Date(from) } }),
        ...(to && { eventDate: { lte: new Date(`${to}T23:59:59`) } }),
      },
    },
    include: { event: true },
    orderBy: { event: { eventDate: "asc" } },
  });

  const buffer = await buildCorporateWorkbook({
    sheetName: "Tur Rezervasyonları",
    title: "Tur Rezervasyonları",
    subtitle: from || to ? `${from || "Başlangıç"} - ${to || "Bugün"}` : undefined,
    columns: [
      { header: "Ad Soyad", width: 24 },
      { header: "Telefon", width: 16 },
      { header: "E-posta", width: 26 },
      { header: "Tur", width: 24 },
      { header: "Tur Tarihi", width: 14 },
      { header: "Kişi Sayısı", width: 12 },
      { header: "Durum", width: 14 },
      { header: "Not", width: 30 },
    ],
    rows: reservations.map((r) => [
      r.fullName,
      r.phone,
      r.email || "",
      r.event.tourName,
      r.event.eventDate.toLocaleDateString("tr-TR"),
      r.peopleCount,
      statusLabels[r.status] || r.status,
      r.notes || "",
    ]),
  });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="tur-rezervasyonlari.xlsx"`,
    },
  });
}

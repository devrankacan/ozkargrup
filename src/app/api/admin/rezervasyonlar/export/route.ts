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

  const reservations = await prisma.reservation.findMany({
    where: {
      ...(from && { startDate: { gte: new Date(from) } }),
      ...(to && { endDate: { lte: new Date(`${to}T23:59:59`) } }),
    },
    include: { car: true },
    orderBy: { startDate: "asc" },
  });

  const buffer = await buildCorporateWorkbook({
    sheetName: "Araç Kiralama",
    title: "Araç Kiralama Rezervasyonları",
    subtitle: from || to ? `${from || "Başlangıç"} - ${to || "Bugün"}` : undefined,
    columns: [
      { header: "Ad Soyad", width: 24 },
      { header: "Telefon", width: 16 },
      { header: "E-posta", width: 26 },
      { header: "Araç", width: 24 },
      { header: "Alış Tarihi", width: 14 },
      { header: "İade Tarihi", width: 14 },
      { header: "Alış Yeri", width: 18 },
      { header: "İade Yeri", width: 18 },
      { header: "Durum", width: 14 },
      { header: "Not", width: 30 },
    ],
    rows: reservations.map((r) => [
      r.fullName,
      r.phone,
      r.email,
      `${r.car.brand} ${r.car.name}`,
      r.startDate.toLocaleDateString("tr-TR"),
      r.endDate.toLocaleDateString("tr-TR"),
      r.pickupPlace,
      r.dropoffPlace,
      statusLabels[r.status] || r.status,
      r.notes || "",
    ]),
  });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="arac-kiralama.xlsx"`,
    },
  });
}

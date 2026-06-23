import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

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

  const rows = reservations.map((r) => ({
    "Ad Soyad": r.fullName,
    "Telefon": r.phone,
    "E-posta": r.email,
    "Araç": `${r.car.brand} ${r.car.name}`,
    "Alış Tarihi": r.startDate.toLocaleDateString("tr-TR"),
    "İade Tarihi": r.endDate.toLocaleDateString("tr-TR"),
    "Alış Yeri": r.pickupPlace,
    "İade Yeri": r.dropoffPlace,
    "Durum": statusLabels[r.status] || r.status,
    "Not": r.notes || "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Rezervasyonlar");
  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="rezervasyonlar.xlsx"`,
    },
  });
}

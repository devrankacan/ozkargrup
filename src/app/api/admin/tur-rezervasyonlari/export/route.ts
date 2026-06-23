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

  const reservations = await prisma.tourReservation.findMany({
    where: {
      ...(from && { tourDate: { gte: new Date(from) } }),
      ...(to && { tourDate: { lte: new Date(`${to}T23:59:59`) } }),
    },
    orderBy: { tourDate: "asc" },
  });

  const rows = reservations.map((r) => ({
    "Ad Soyad": r.fullName,
    "Telefon": r.phone,
    "E-posta": r.email || "",
    "Tur": r.tourName,
    "Tur Tarihi": r.tourDate.toLocaleDateString("tr-TR"),
    "Kişi Sayısı": r.peopleCount,
    "Durum": statusLabels[r.status] || r.status,
    "Not": r.notes || "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Tur Rezervasyonları");
  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="tur-rezervasyonlari.xlsx"`,
    },
  });
}

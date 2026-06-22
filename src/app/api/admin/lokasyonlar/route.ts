import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const locations = await prisma.location.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
  return NextResponse.json(locations);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json();
  const name = (body.name || "").trim();
  if (!name) {
    return NextResponse.json({ error: "Lokasyon adı gerekli." }, { status: 400 });
  }

  try {
    const location = await prisma.location.create({ data: { name } });
    return NextResponse.json(location, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Bu lokasyon zaten ekli." }, { status: 409 });
  }
}

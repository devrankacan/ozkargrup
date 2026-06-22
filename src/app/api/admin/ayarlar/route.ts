import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { getSiteSettings } from "@/lib/siteSettings";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}

export async function PATCH(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json();
  const settings = await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: { logoUrl: body.logoUrl ?? null },
    create: { id: "main", logoUrl: body.logoUrl ?? null },
  });
  return NextResponse.json(settings);
}

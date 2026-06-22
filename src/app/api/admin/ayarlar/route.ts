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
  const fields = ["logoUrl", "heroImageDesktopUrl", "heroImageMobileUrl", "faviconUrl"] as const;
  const data: Record<string, string | null> = {};
  for (const field of fields) {
    if (field in body) data[field] = body[field] ?? null;
  }

  const settings = await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: data,
    create: { id: "main", ...data },
  });
  return NextResponse.json(settings);
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const campaigns = await prisma.campaign.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(campaigns);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json();
  const campaign = await prisma.campaign.create({
    data: {
      title: body.title,
      description: body.description,
      discount: body.discount || null,
      imageUrl: body.imageUrl || null,
      isActive: body.isActive ?? true,
    },
  });
  return NextResponse.json(campaign, { status: 201 });
}

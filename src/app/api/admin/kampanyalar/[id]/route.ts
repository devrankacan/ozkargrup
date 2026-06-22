import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await req.json();
  const campaign = await prisma.campaign.update({
    where: { id },
    data: {
      title: body.title,
      description: body.description,
      discount: body.discount,
      imageUrl: body.imageUrl,
      isActive: body.isActive,
    },
  });
  return NextResponse.json(campaign);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  await prisma.campaign.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

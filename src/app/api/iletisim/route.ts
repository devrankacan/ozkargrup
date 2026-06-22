import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Lütfen gerekli alanları doldurun." }, { status: 400 });
  }

  const contactMessage = await prisma.contactMessage.create({
    data: { name, email, phone, subject, message },
  });

  return NextResponse.json({ success: true, id: contactMessage.id });
}

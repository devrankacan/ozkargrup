import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signAdminToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Kullanıcı adı ve şifre gerekli." }, { status: 400 });
  }

  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) {
    return NextResponse.json({ error: "Geçersiz kullanıcı adı veya şifre." }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    return NextResponse.json({ error: "Geçersiz kullanıcı adı veya şifre." }, { status: 401 });
  }

  const token = signAdminToken(admin.id, admin.username);
  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

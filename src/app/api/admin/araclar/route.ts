import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const cars = await prisma.car.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json(cars);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json();
  const images: string[] = Array.isArray(body.images) ? body.images.filter(Boolean) : [];

  const car = await prisma.car.create({
    data: {
      name: body.name,
      brand: body.brand,
      category: body.category,
      pricePerDay: Number(body.pricePerDay),
      transmission: body.transmission,
      fuelType: body.fuelType,
      seats: Number(body.seats),
      imageUrl: body.imageUrl || null,
      description: body.description || null,
      isActive: body.isActive ?? true,
      images: {
        create: images.map((url, i) => ({ url, order: i })),
      },
    },
    include: { images: true },
  });
  return NextResponse.json(car, { status: 201 });
}

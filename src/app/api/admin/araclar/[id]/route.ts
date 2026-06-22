import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await req.json();

  if (Array.isArray(body.images)) {
    await prisma.carImage.deleteMany({ where: { carId: id } });
    const images: string[] = body.images.filter(Boolean);
    if (images.length > 0) {
      await prisma.carImage.createMany({
        data: images.map((url, i) => ({ carId: id, url, order: i })),
      });
    }
  }

  const car = await prisma.car.update({
    where: { id },
    data: {
      name: body.name,
      brand: body.brand,
      category: body.category,
      pricePerDay: body.pricePerDay !== undefined ? Number(body.pricePerDay) : undefined,
      transmission: body.transmission,
      fuelType: body.fuelType,
      seats: body.seats !== undefined ? Number(body.seats) : undefined,
      imageUrl: body.imageUrl,
      description: body.description,
      isActive: body.isActive,
    },
    include: { images: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json(car);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  await prisma.car.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CarsList from "@/components/CarsList";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Araçlarımız | Özkar Grup Rent a Car",
  description: "Özkar Grup Rent a Car araç filomuzu inceleyin, kategori ve fiyata göre filtreleyin.",
};

export default async function AraclarPage() {
  const cars = await prisma.car.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold text-brown-700">Araçlarımız</h1>
      <CarsList cars={cars} />
    </div>
  );
}

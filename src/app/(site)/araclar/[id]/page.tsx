import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CarGallery from "@/components/CarGallery";

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const car = await prisma.car.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!car || !car.isActive) {
    notFound();
  }

  const images = car.images.length > 0
    ? car.images.map((img) => img.url)
    : car.imageUrl
      ? [car.imageUrl]
      : [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/araclar" className="mb-6 inline-block text-sm font-medium text-brown-500 hover:text-brown-700">
        ← Tüm araçlar
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <CarGallery images={images} alt={`${car.brand} ${car.name}`} />

        <div>
          <h1 className="text-3xl font-bold text-brown-700">
            {car.brand} {car.name}
          </h1>
          <p className="mt-1 text-brown-500">{car.category}</p>

          <p className="mt-4 text-3xl font-bold text-brown-600">
            {car.pricePerDay} ₺ <span className="text-base font-normal text-brown-400">/ gün</span>
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-4 text-sm text-brown-600">
            <li className="rounded-lg bg-brown-50 p-3">
              <span className="block text-brown-400">Vites</span>
              {car.transmission}
            </li>
            <li className="rounded-lg bg-brown-50 p-3">
              <span className="block text-brown-400">Yakıt</span>
              {car.fuelType}
            </li>
            <li className="rounded-lg bg-brown-50 p-3">
              <span className="block text-brown-400">Koltuk</span>
              {car.seats} kişi
            </li>
            <li className="rounded-lg bg-brown-50 p-3">
              <span className="block text-brown-400">Kategori</span>
              {car.category}
            </li>
          </ul>

          {car.description && (
            <p className="mt-6 leading-relaxed text-brown-600">{car.description}</p>
          )}

          <Link
            href={`/rezervasyon?carId=${car.id}`}
            className="mt-8 inline-block w-full rounded-full bg-brown-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-brown-600"
          >
            Bu Aracı Rezerve Et
          </Link>
        </div>
      </div>
    </div>
  );
}

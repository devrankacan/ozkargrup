import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AraclarPage() {
  const cars = await prisma.car.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold text-brown-700">Araçlarımız</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => {
          const thumb = car.images[0]?.url || car.imageUrl;
          return (
            <Link
              key={car.id}
              href={`/araclar/${car.id}`}
              className="block overflow-hidden rounded-xl border border-brown-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-40 items-center justify-center overflow-hidden bg-brown-100 text-brown-400">
                {thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={thumb} alt={`${car.brand} ${car.name}`} className="h-full w-full object-cover" />
                ) : (
                  <span>{car.brand} {car.name}</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-brown-700">
                  {car.brand} {car.name}
                </h3>
                <p className="text-sm text-brown-500">{car.category}</p>
                <ul className="mt-2 space-y-1 text-sm text-brown-500">
                  <li>Vites: {car.transmission}</li>
                  <li>Yakıt: {car.fuelType}</li>
                  <li>Koltuk: {car.seats}</li>
                </ul>
                <p className="mt-3 text-lg font-bold text-brown-600">
                  {car.pricePerDay} ₺ <span className="text-sm font-normal">/ gün</span>
                </p>
                <span className="mt-3 inline-block w-full rounded-lg bg-brown-500 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-brown-600">
                  Detayları Gör
                </span>
              </div>
            </Link>
          );
        })}
        {cars.length === 0 && <p className="text-brown-500">Henüz araç eklenmemiş.</p>}
      </div>
    </div>
  );
}

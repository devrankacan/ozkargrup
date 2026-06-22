import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const cars = await prisma.car.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  const campaigns = await prisma.campaign.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 2,
  });

  return (
    <div>
      <section className="bg-brown-50">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-20">
          <h1 className="text-4xl font-bold text-brown-700 md:text-5xl">
            Yolculuğunuz İçin Güvenilir Araç Kiralama
          </h1>
          <p className="max-w-xl text-brown-600">
            Özkar Grup Rent a Car ile geniş araç filomuzdan size en uygun aracı
            kolayca seçin, online rezervasyon yapın ve yolculuğunuza güvenle başlayın.
          </p>
          <Link
            href="/rezervasyon"
            className="rounded-full bg-brown-500 px-6 py-3 font-semibold text-white transition hover:bg-brown-600"
          >
            Hemen Rezervasyon Yap
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-brown-700">Öne Çıkan Araçlar</h2>
          <Link href="/araclar" className="text-sm font-medium text-brown-500 hover:text-brown-700">
            Tüm araçları gör →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cars.map((car) => (
            <div
              key={car.id}
              className="overflow-hidden rounded-xl border border-brown-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-40 items-center justify-center bg-brown-100 text-brown-400">
                {car.brand} {car.name}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-brown-700">
                  {car.brand} {car.name}
                </h3>
                <p className="text-sm text-brown-500">{car.category}</p>
                <p className="mt-2 text-lg font-bold text-brown-600">
                  {car.pricePerDay} ₺ <span className="text-sm font-normal">/ gün</span>
                </p>
                <Link
                  href={`/rezervasyon?carId=${car.id}`}
                  className="mt-3 inline-block w-full rounded-lg bg-brown-500 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-brown-600"
                >
                  Rezervasyon Yap
                </Link>
              </div>
            </div>
          ))}
          {cars.length === 0 && (
            <p className="text-brown-500">Henüz araç eklenmemiş.</p>
          )}
        </div>
      </section>

      {campaigns.length > 0 && (
        <section className="bg-brown-50">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="mb-8 text-2xl font-bold text-brown-700">Kampanyalar</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {campaigns.map((c) => (
                <div key={c.id} className="rounded-xl border border-brown-200 bg-white p-6 shadow-sm">
                  <h3 className="font-semibold text-brown-700">{c.title}</h3>
                  <p className="mt-2 text-sm text-brown-600">{c.description}</p>
                  {c.discount && (
                    <span className="mt-3 inline-block rounded-full bg-brown-200 px-3 py-1 text-xs font-semibold text-brown-700">
                      {c.discount}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

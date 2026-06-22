import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

function buildReservationLink(carId: string, startDate: string, endDate: string, pickupPlace?: string) {
  const params = new URLSearchParams({ carId, startDate, endDate });
  if (pickupPlace) params.set("pickupPlace", pickupPlace);
  return `/rezervasyon?${params.toString()}`;
}

export default async function MusaitlikPage({
  searchParams,
}: {
  searchParams: Promise<{ carId?: string; startDate?: string; endDate?: string; pickupPlace?: string }>;
}) {
  const { carId, startDate, endDate, pickupPlace } = await searchParams;

  if (!startDate || !endDate) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="mb-4 text-2xl font-bold text-brown-700">Tarih bilgisi eksik</h1>
        <p className="mb-6 text-brown-500">Müsaitlik sorgulamak için alış ve iade tarihi girmelisin.</p>
        <Link href="/" className="text-brown-600 underline">
          Anasayfaya dön
        </Link>
      </div>
    );
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const allCars = await prisma.car.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
  });

  const overlappingReservations = await prisma.reservation.findMany({
    where: {
      status: { not: "cancelled" },
      startDate: { lt: end },
      endDate: { gt: start },
    },
    select: { carId: true },
  });
  const bookedCarIds = new Set(overlappingReservations.map((r) => r.carId));

  const requestedCar = carId ? allCars.find((c) => c.id === carId) : undefined;
  const requestedCarAvailable = requestedCar ? !bookedCarIds.has(requestedCar.id) : false;

  const availableCars = allCars.filter((c) => !bookedCarIds.has(c.id) && c.id !== requestedCar?.id);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link href="/" className="mb-6 inline-block text-sm text-brown-500 hover:text-brown-700">
        ← Anasayfaya dön
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-brown-700">Müsaitlik Sonuçları</h1>
      <p className="mb-10 text-brown-500">
        {new Date(startDate).toLocaleDateString("tr-TR")} → {new Date(endDate).toLocaleDateString("tr-TR")}
        {pickupPlace && <> · Alış yeri: {pickupPlace}</>}
      </p>

      {requestedCar && (
        <div className="mb-10">
          {requestedCarAvailable ? (
            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-green-700">Müsait</p>
              <h2 className="mb-2 text-xl font-bold text-brown-700">
                {requestedCar.brand} {requestedCar.name}
              </h2>
              <p className="mb-4 text-brown-600">
                Seçtiğin araç bu tarihler için müsait. Hemen rezervasyon talebinde bulunabilirsin.
              </p>
              <Link
                href={buildReservationLink(requestedCar.id, startDate, endDate, pickupPlace)}
                className="inline-block rounded-full bg-brown-500 px-6 py-2.5 font-semibold text-white transition hover:bg-brown-600"
              >
                Rezervasyon Yap
              </Link>
            </div>
          ) : (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-red-700">Dolu</p>
              <h2 className="mb-2 text-xl font-bold text-brown-700">
                {requestedCar.brand} {requestedCar.name}
              </h2>
              <p className="text-brown-600">
                Üzgünüz, seçtiğin araç bu tarihlerde başka bir rezervasyonla dolu. Aşağıda aynı tarihler için müsait
                alternatif araçları görebilirsin.
              </p>
            </div>
          )}
        </div>
      )}

      <h2 className="mb-6 text-xl font-bold text-brown-700">
        {requestedCar ? "Alternatif Müsait Araçlar" : "Müsait Araçlar"}
      </h2>

      {availableCars.length === 0 ? (
        <p className="text-brown-500">Bu tarihler için müsait araç bulunamadı, lütfen farklı bir tarih dene.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {availableCars.map((car) => {
            const thumb = car.images[0]?.url || car.imageUrl;
            return (
              <div
                key={car.id}
                className="overflow-hidden rounded-xl border border-brown-200 bg-white shadow-sm transition hover:shadow-md"
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
                  <p className="mt-2 text-lg font-bold text-brown-600">
                    {car.pricePerDay} ₺ <span className="text-sm font-normal">/ gün</span>
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Link
                      href={`/araclar/${car.id}`}
                      className="flex-1 rounded-lg border border-brown-300 px-3 py-2 text-center text-sm font-semibold text-brown-600 hover:bg-brown-50"
                    >
                      Detay
                    </Link>
                    <Link
                      href={buildReservationLink(car.id, startDate, endDate, pickupPlace)}
                      className="flex-1 rounded-lg bg-brown-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-brown-600"
                    >
                      Rezervasyon Yap
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import ReservationForm from "@/components/ReservationForm";

export default async function RezervasyonPage({
  searchParams,
}: {
  searchParams: Promise<{ carId?: string; startDate?: string; endDate?: string; pickupPlace?: string }>;
}) {
  const { carId, startDate, endDate, pickupPlace } = await searchParams;
  const cars = await prisma.car.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold text-brown-700">Rezervasyon</h1>
      <p className="mb-8 text-brown-500">
        Aşağıdaki formu doldurarak rezervasyon talebinizi oluşturabilirsiniz.
      </p>
      <ReservationForm
        cars={cars}
        defaultCarId={carId}
        defaultStartDate={startDate}
        defaultEndDate={endDate}
        defaultPickupPlace={pickupPlace}
      />
    </div>
  );
}

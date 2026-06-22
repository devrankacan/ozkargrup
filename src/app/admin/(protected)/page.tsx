import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [carCount, reservationCount, pendingCount, messageCount] = await Promise.all([
    prisma.car.count(),
    prisma.reservation.count(),
    prisma.reservation.count({ where: { status: "pending" } }),
    prisma.contactMessage.count(),
  ]);

  const stats = [
    { label: "Toplam Araç", value: carCount },
    { label: "Toplam Rezervasyon", value: reservationCount },
    { label: "Bekleyen Rezervasyon", value: pendingCount },
    { label: "Mesajlar", value: messageCount },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-brown-700">Panel</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-brown-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-brown-500">{s.label}</p>
            <p className="mt-2 text-3xl font-bold text-brown-700">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/prisma";

const categories = [
  {
    href: "/admin/lokasyonlar",
    label: "Site",
    description: "Lokasyonlar, kampanyalar, mesajlar, bülten ve ayarlar",
  },
  {
    href: "/admin/araclar",
    label: "Araç Kiralama",
    description: "Araçlar ve kiralama rezervasyonları",
  },
  {
    href: "/admin/tur-etkinlikleri",
    label: "Turlar",
    description: "Tur etkinlikleri ve tur rezervasyonları",
  },
];

export default async function AdminDashboardPage() {
  const [carCount, reservationCount, pendingCount, messageCount, subscriberCount] = await Promise.all([
    prisma.car.count(),
    prisma.reservation.count(),
    prisma.reservation.count({ where: { status: "pending" } }),
    prisma.contactMessage.count(),
    prisma.newsletterSubscriber.count(),
  ]);

  const stats = [
    { label: "Toplam Araç", value: carCount },
    { label: "Toplam Rezervasyon", value: reservationCount },
    { label: "Bekleyen Rezervasyon", value: pendingCount },
    { label: "Mesajlar", value: messageCount },
    { label: "Bülten Aboneleri", value: subscriberCount },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-brown-700">Panel</h1>

      <div className="mb-10 grid gap-6 sm:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-brown-200 bg-white p-6 text-center shadow-sm transition hover:border-brown-400 hover:shadow-md"
          >
            <p className="text-xl font-bold text-brown-700">{c.label}</p>
            <p className="mt-2 text-sm text-brown-500">{c.description}</p>
          </Link>
        ))}
      </div>

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

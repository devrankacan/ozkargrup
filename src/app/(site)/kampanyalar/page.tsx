import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Kampanyalar | Özkar Grup Rent a Car",
  description: "Özkar Grup Rent a Car güncel kampanya ve fırsatlarını inceleyin.",
};

export default async function KampanyalarPage() {
  const campaigns = await prisma.campaign.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold text-brown-700">Kampanyalar & Fiyatlandırma</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {campaigns.map((c) => (
          <div key={c.id} className="rounded-xl border border-brown-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-brown-700">{c.title}</h3>
            <p className="mt-2 text-sm text-brown-600">{c.description}</p>
            {c.discount && (
              <span className="mt-3 inline-block rounded-full bg-brown-200 px-3 py-1 text-xs font-semibold text-brown-700">
                {c.discount}
              </span>
            )}
          </div>
        ))}
        {campaigns.length === 0 && (
          <p className="text-brown-500">Şu anda aktif bir kampanya bulunmuyor.</p>
        )}
      </div>
    </div>
  );
}

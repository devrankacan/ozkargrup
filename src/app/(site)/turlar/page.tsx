import type { Metadata } from "next";
import Link from "next/link";
import { tours } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Turlar | Özkar Grup Rent a Car",
  description: "Uzungöl, Ayder Yaylası, Hıdırnebi Yaylası ve Sümela Manastırı turlarımızı keşfedin.",
};

export default function TurlarPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold text-brown-700">Turlarımız</h1>
      <p className="mb-8 text-brown-500">
        Doğu Karadeniz'in en güzel doğa ve kültür noktalarını keşfedin.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {tours.map((tour) => (
          <Link
            key={tour.slug}
            href={`/turlar/${tour.slug}`}
            className="block overflow-hidden rounded-xl border border-brown-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="h-48 w-full overflow-hidden bg-brown-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tour.imageUrl} alt={tour.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-brown-700">{tour.name}</h3>
              <p className="text-xs font-medium text-brown-400">{tour.location}</p>
              <p className="mt-2 text-sm text-brown-600">{tour.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tours } from "@/lib/tours";

const WHATSAPP_NUMBER = "905419121461";

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = tours.find((t) => t.slug === slug);
  if (!tour) return {};
  return {
    title: `${tour.name} Turu | Özkar Grup Rent a Car`,
    description: tour.summary,
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = tours.find((t) => t.slug === slug);
  if (!tour) notFound();

  const message = encodeURIComponent(
    `Merhaba, ${tour.name} turu hakkında bilgi almak istiyorum.`
  );
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/turlar" className="text-sm font-medium text-brown-500 hover:text-brown-700">
        ← Tüm turlar
      </Link>
      <div className="mt-4 overflow-hidden rounded-xl border border-brown-200 bg-white shadow-sm">
        <div className="h-72 w-full overflow-hidden bg-brown-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tour.imageUrl} alt={tour.name} className="h-full w-full object-cover" />
        </div>
        <div className="p-8">
          <h1 className="text-3xl font-bold text-brown-700">{tour.name}</h1>
          <p className="mt-1 text-sm font-medium text-brown-400">{tour.location}</p>
          <p className="mt-6 text-brown-600">{tour.description}</p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-lg bg-brown-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brown-600"
          >
            Tur Hakkında Bilgi Al
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

type Car = {
  id: string;
  name: string;
  brand: string;
  category: string;
  pricePerDay: number;
  transmission: string;
  fuelType: string;
  seats: number;
  imageUrl: string | null;
  images: { url: string }[];
};

type SortOption = "newest" | "price-asc" | "price-desc";

export default function CarsList({ cars }: { cars: Car[] }) {
  const [category, setCategory] = useState("");
  const [transmission, setTransmission] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");

  const categories = useMemo(
    () => Array.from(new Set(cars.map((c) => c.category))).sort(),
    [cars]
  );
  const transmissions = useMemo(
    () => Array.from(new Set(cars.map((c) => c.transmission))).sort(),
    [cars]
  );

  const filtered = useMemo(() => {
    let list = cars;
    if (category) list = list.filter((c) => c.category === category);
    if (transmission) list = list.filter((c) => c.transmission === transmission);

    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sort === "price-desc") list.sort((a, b) => b.pricePerDay - a.pricePerDay);

    return list;
  }, [cars, category, transmission, sort]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-brown-200 px-3 py-2 text-sm text-brown-700"
        >
          <option value="">Tüm Kategoriler</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
          className="rounded-lg border border-brown-200 px-3 py-2 text-sm text-brown-700"
        >
          <option value="">Tüm Vites Tipleri</option>
          {transmissions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="rounded-lg border border-brown-200 px-3 py-2 text-sm text-brown-700"
        >
          <option value="newest">En Yeni</option>
          <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
          <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((car, index) => {
          const thumb = car.images[0]?.url || car.imageUrl;
          return (
            <RevealOnScroll key={car.id} index={index}>
              <Link
                href={`/araclar/${car.id}`}
                className="block overflow-hidden rounded-xl border border-brown-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl"
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
            </RevealOnScroll>
          );
        })}
        {filtered.length === 0 && <p className="text-brown-500">Bu kriterlere uygun araç bulunamadı.</p>}
      </div>
    </div>
  );
}

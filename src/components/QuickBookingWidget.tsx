"use client";

import { useRouter } from "next/navigation";

type Car = {
  id: string;
  brand: string;
  name: string;
  pricePerDay: number;
};

export default function QuickBookingWidget({ cars }: { cars: Car[] }) {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const carId = (form.elements.namedItem("carId") as HTMLSelectElement).value;
    const startDate = (form.elements.namedItem("startDate") as HTMLInputElement).value;
    const endDate = (form.elements.namedItem("endDate") as HTMLInputElement).value;
    const pickupPlace = (form.elements.namedItem("pickupPlace") as HTMLInputElement).value;

    const params = new URLSearchParams();
    if (carId) params.set("carId", carId);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    if (pickupPlace) params.set("pickupPlace", pickupPlace);

    router.push(`/musaitlik?${params.toString()}`);
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/20 p-6 shadow-xl shadow-brown-900/20 backdrop-blur-2xl sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
      <h2 className="relative mb-1 text-lg font-bold text-brown-800 drop-shadow-sm">Hızlı Rezervasyon</h2>
      <p className="relative mb-5 text-sm text-brown-700">Aracını ve tarihlerini seç, hemen devam et.</p>

      <form onSubmit={handleSubmit} className="relative space-y-4">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brown-400">
            Alış Yeri
          </label>
          <input
            name="pickupPlace"
            placeholder="Şehir / havalimanı / şube"
            className="w-full rounded-lg border border-brown-200 bg-white/70 px-4 py-2.5 text-brown-700 outline-none focus:border-brown-400 focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brown-400">
            Araç
          </label>
          <select
            name="carId"
            className="w-full rounded-lg border border-brown-200 bg-white/70 px-4 py-2.5 text-brown-700 outline-none focus:border-brown-400 focus:bg-white"
          >
            <option value="">Fark etmez</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.brand} {car.name} — {car.pricePerDay} ₺/gün
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brown-400">
              Alış Tarihi
            </label>
            <input
              name="startDate"
              type="date"
              required
              className="w-full rounded-lg border border-brown-200 bg-white/70 px-3 py-2.5 text-brown-700 outline-none focus:border-brown-400 focus:bg-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brown-400">
              İade Tarihi
            </label>
            <input
              name="endDate"
              type="date"
              required
              className="w-full rounded-lg border border-brown-200 bg-white/70 px-3 py-2.5 text-brown-700 outline-none focus:border-brown-400 focus:bg-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-brown-500 px-6 py-3 font-semibold text-white transition hover:bg-brown-600"
        >
          Müsaitlik Sorgula
        </button>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";

type Car = {
  id: string;
  name: string;
  brand: string;
  pricePerDay: number;
};

export default function ReservationForm({
  cars,
  defaultCarId,
}: {
  cars: Car[];
  defaultCarId?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      carId: (form.elements.namedItem("carId") as HTMLSelectElement).value,
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      startDate: (form.elements.namedItem("startDate") as HTMLInputElement).value,
      endDate: (form.elements.namedItem("endDate") as HTMLInputElement).value,
      pickupPlace: (form.elements.namedItem("pickupPlace") as HTMLInputElement).value,
      dropoffPlace: (form.elements.namedItem("dropoffPlace") as HTMLInputElement).value,
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/rezervasyon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        setErrorMsg(err.error || "Bir hata oluştu.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("Bağlantı hatası, lütfen tekrar deneyin.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-lg bg-brown-100 p-4 text-brown-700">
        Rezervasyon talebiniz alındı. Ekibimiz en kısa sürede sizinle iletişime geçecek.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-brown-700">Araç</label>
        <select
          name="carId"
          required
          defaultValue={defaultCarId || ""}
          className="w-full rounded-lg border border-brown-200 px-4 py-2 outline-none focus:border-brown-400"
        >
          <option value="" disabled>
            Araç seçin
          </option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.brand} {car.name} — {car.pricePerDay} ₺/gün
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="fullName"
          required
          placeholder="Ad Soyad"
          className="rounded-lg border border-brown-200 px-4 py-2 outline-none focus:border-brown-400"
        />
        <input
          name="phone"
          required
          placeholder="Telefon"
          className="rounded-lg border border-brown-200 px-4 py-2 outline-none focus:border-brown-400"
        />
      </div>
      <input
        name="email"
        type="email"
        required
        placeholder="E-posta"
        className="w-full rounded-lg border border-brown-200 px-4 py-2 outline-none focus:border-brown-400"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-brown-700">Alış Tarihi</label>
          <input
            name="startDate"
            type="date"
            required
            className="w-full rounded-lg border border-brown-200 px-4 py-2 outline-none focus:border-brown-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-brown-700">İade Tarihi</label>
          <input
            name="endDate"
            type="date"
            required
            className="w-full rounded-lg border border-brown-200 px-4 py-2 outline-none focus:border-brown-400"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="pickupPlace"
          required
          placeholder="Alış Yeri"
          className="rounded-lg border border-brown-200 px-4 py-2 outline-none focus:border-brown-400"
        />
        <input
          name="dropoffPlace"
          required
          placeholder="İade Yeri"
          className="rounded-lg border border-brown-200 px-4 py-2 outline-none focus:border-brown-400"
        />
      </div>

      <textarea
        name="notes"
        rows={3}
        placeholder="Ek notlar (opsiyonel)"
        className="w-full rounded-lg border border-brown-200 px-4 py-2 outline-none focus:border-brown-400"
      />

      {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-brown-500 px-6 py-2 font-semibold text-white transition hover:bg-brown-600 disabled:opacity-60"
      >
        {status === "loading" ? "Gönderiliyor..." : "Rezervasyon Talebi Gönder"}
      </button>
    </form>
  );
}

"use client";

import { useEffect, useState } from "react";

type Reservation = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  pickupPlace: string;
  dropoffPlace: string;
  notes: string | null;
  status: string;
  car: { brand: string; name: string };
};

const statusLabels: Record<string, string> = {
  pending: "Bekliyor",
  confirmed: "Onaylandı",
  cancelled: "İptal",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminRezervasyonlarPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/admin/rezervasyonlar");
    setReservations(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/rezervasyonlar/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Bu rezervasyonu silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/admin/rezervasyonlar/${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <p className="text-brown-500">Yükleniyor...</p>;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-brown-700">Rezervasyonlar</h1>
      <div className="space-y-4">
        {reservations.map((r) => (
          <div key={r.id} className="rounded-xl border border-brown-200 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-brown-700">
                  {r.fullName} — {r.car.brand} {r.car.name}
                </p>
                <p className="text-sm text-brown-500">{r.email} · {r.phone}</p>
                <p className="mt-1 text-sm text-brown-600">
                  {new Date(r.startDate).toLocaleDateString("tr-TR")} → {new Date(r.endDate).toLocaleDateString("tr-TR")}
                </p>
                <p className="text-sm text-brown-500">
                  Alış: {r.pickupPlace} · İade: {r.dropoffPlace}
                </p>
                {r.notes && <p className="mt-1 text-sm text-brown-500">Not: {r.notes}</p>}
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[r.status]}`}>
                {statusLabels[r.status] || r.status}
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => updateStatus(r.id, "confirmed")}
                className="rounded-lg bg-green-500 px-3 py-1 text-xs font-semibold text-white hover:bg-green-600"
              >
                Onayla
              </button>
              <button
                onClick={() => updateStatus(r.id, "cancelled")}
                className="rounded-lg bg-red-500 px-3 py-1 text-xs font-semibold text-white hover:bg-red-600"
              >
                İptal Et
              </button>
              <button
                onClick={() => updateStatus(r.id, "pending")}
                className="rounded-lg border border-brown-300 px-3 py-1 text-xs font-semibold text-brown-600"
              >
                Bekliyor
              </button>
              <button onClick={() => remove(r.id)} className="ml-auto text-xs text-red-600 hover:underline">
                Sil
              </button>
            </div>
          </div>
        ))}
        {reservations.length === 0 && <p className="text-brown-500">Henüz rezervasyon bulunmuyor.</p>}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

type Location = {
  id: string;
  name: string;
  isActive: boolean;
};

export default function AdminLokasyonlarPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/admin/lokasyonlar");
    setLocations(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/lokasyonlar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      const err = await res.json();
      setError(err.error || "Bir hata oluştu.");
      return;
    }
    setName("");
    load();
  }

  async function toggleActive(loc: Location) {
    await fetch(`/api/admin/lokasyonlar/${loc.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !loc.isActive }),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Bu lokasyonu silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/admin/lokasyonlar/${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <p className="text-brown-500">Yükleniyor...</p>;

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-brown-700">Alış / İade Lokasyonları</h1>
      <p className="mb-8 text-sm text-brown-500">
        Burada eklediğiniz lokasyonlar, rezervasyon formlarındaki alış ve iade yeri seçeneklerinde gösterilir.
      </p>

      <form onSubmit={handleSubmit} className="mb-8 flex max-w-md gap-2">
        <input
          required
          placeholder="Örn: Antalya Havalimanı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-brown-200 px-3 py-2 text-sm"
        />
        <button type="submit" className="shrink-0 rounded-lg bg-brown-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brown-600">
          Ekle
        </button>
      </form>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="max-w-md overflow-hidden rounded-xl border border-brown-200 bg-white">
        {locations.map((loc) => (
          <div key={loc.id} className="flex items-center justify-between border-b border-brown-100 px-4 py-3 last:border-b-0">
            <span className={`text-sm ${loc.isActive ? "text-brown-700" : "text-brown-400 line-through"}`}>{loc.name}</span>
            <div className="flex gap-3 text-xs">
              <button onClick={() => toggleActive(loc)} className="font-semibold text-brown-600 hover:underline">
                {loc.isActive ? "Pasif Yap" : "Aktif Yap"}
              </button>
              <button onClick={() => remove(loc.id)} className="font-semibold text-red-600 hover:underline">
                Sil
              </button>
            </div>
          </div>
        ))}
        {locations.length === 0 && <p className="p-4 text-sm text-brown-500">Henüz lokasyon eklenmedi.</p>}
      </div>
    </div>
  );
}

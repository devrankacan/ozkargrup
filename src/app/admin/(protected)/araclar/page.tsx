"use client";

import { useEffect, useState } from "react";

type Car = {
  id: string;
  name: string;
  brand: string;
  category: string;
  pricePerDay: number;
  transmission: string;
  fuelType: string;
  seats: number;
  description: string | null;
  isActive: boolean;
  images: { url: string }[];
};

const emptyForm = {
  name: "",
  brand: "",
  category: "",
  pricePerDay: "",
  transmission: "",
  fuelType: "",
  seats: "",
  description: "",
  imagesText: "",
};

export default function AdminAraclarPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function load() {
    const res = await fetch("/api/admin/araclar");
    setCars(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = editingId ? `/api/admin/araclar/${editingId}` : "/api/admin/araclar";
    const method = editingId ? "PATCH" : "POST";
    const images = form.imagesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, images }),
    });
    setForm(emptyForm);
    setEditingId(null);
    load();
  }

  function imagesList() {
    return form.imagesText.split("\n").map((s) => s.trim()).filter(Boolean);
  }

  function setImagesList(urls: string[]) {
    setForm({ ...form, imagesText: urls.join("\n") });
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError("");
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error || "Yükleme başarısız oldu.");
        continue;
      }
      uploaded.push(data.url);
    }
    setImagesList([...imagesList(), ...uploaded]);
    setUploading(false);
    e.target.value = "";
  }

  function removeImage(url: string) {
    setImagesList(imagesList().filter((u) => u !== url));
  }

  function startEdit(car: Car) {
    setEditingId(car.id);
    setForm({
      name: car.name,
      brand: car.brand,
      category: car.category,
      pricePerDay: String(car.pricePerDay),
      transmission: car.transmission,
      fuelType: car.fuelType,
      seats: String(car.seats),
      description: car.description || "",
      imagesText: car.images.map((img) => img.url).join("\n"),
    });
  }

  async function toggleActive(car: Car) {
    await fetch(`/api/admin/araclar/${car.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !car.isActive }),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Bu aracı silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/admin/araclar/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-brown-700">Araçlar</h1>

      <form onSubmit={handleSubmit} className="mb-10 grid gap-3 rounded-xl border border-brown-200 bg-white p-6 sm:grid-cols-2">
        <input
          required
          placeholder="Marka"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          className="rounded-lg border border-brown-200 px-3 py-2"
        />
        <input
          required
          placeholder="Model"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-lg border border-brown-200 px-3 py-2"
        />
        <input
          required
          placeholder="Kategori"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="rounded-lg border border-brown-200 px-3 py-2"
        />
        <input
          required
          type="number"
          placeholder="Günlük Fiyat (₺)"
          value={form.pricePerDay}
          onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
          className="rounded-lg border border-brown-200 px-3 py-2"
        />
        <input
          required
          placeholder="Vites (Manuel/Otomatik)"
          value={form.transmission}
          onChange={(e) => setForm({ ...form, transmission: e.target.value })}
          className="rounded-lg border border-brown-200 px-3 py-2"
        />
        <input
          required
          placeholder="Yakıt Tipi"
          value={form.fuelType}
          onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
          className="rounded-lg border border-brown-200 px-3 py-2"
        />
        <input
          required
          type="number"
          placeholder="Koltuk Sayısı"
          value={form.seats}
          onChange={(e) => setForm({ ...form, seats: e.target.value })}
          className="rounded-lg border border-brown-200 px-3 py-2"
        />
        <textarea
          placeholder="Açıklama"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="sm:col-span-2 rounded-lg border border-brown-200 px-3 py-2"
        />
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-brown-700">Araç Görselleri</label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
            className="block w-full rounded-lg border border-brown-200 px-3 py-2 text-sm"
          />
          {uploading && <p className="mt-1 text-sm text-brown-500">Yükleniyor...</p>}
          {uploadError && <p className="mt-1 text-sm text-red-600">{uploadError}</p>}
          {imagesList().length > 0 && (
            <div className="mt-3 flex flex-wrap gap-3">
              {imagesList().map((url) => (
                // eslint-disable-next-line @next/next/no-img-element
                <div key={url} className="relative h-20 w-28 overflow-hidden rounded-lg border border-brown-200">
                  <img src={url} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute right-0 top-0 rounded-bl bg-red-600 px-1.5 py-0.5 text-xs font-bold text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <details className="mt-3">
            <summary className="cursor-pointer text-sm text-brown-500">Veya görsel URL&apos;si yapıştır</summary>
            <textarea
              rows={3}
              placeholder={"https://.../foto1.jpg\nhttps://.../foto2.jpg"}
              value={form.imagesText}
              onChange={(e) => setForm({ ...form, imagesText: e.target.value })}
              className="mt-2 w-full rounded-lg border border-brown-200 px-3 py-2"
            />
          </details>
        </div>
        <div className="sm:col-span-2 flex gap-2">
          <button type="submit" className="rounded-lg bg-brown-500 px-4 py-2 font-semibold text-white hover:bg-brown-600">
            {editingId ? "Güncelle" : "Araç Ekle"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="rounded-lg border border-brown-300 px-4 py-2 text-brown-600"
            >
              Vazgeç
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-brown-500">Yükleniyor...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-brown-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-brown-100 text-left text-brown-700">
              <tr>
                <th className="p-3">Araç</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Fiyat</th>
                <th className="p-3">Görsel</th>
                <th className="p-3">Durum</th>
                <th className="p-3">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id} className="border-t border-brown-100">
                  <td className="p-3 text-brown-700">{car.brand} {car.name}</td>
                  <td className="p-3 text-brown-600">{car.category}</td>
                  <td className="p-3 text-brown-600">{car.pricePerDay} ₺</td>
                  <td className="p-3 text-brown-500">{car.images.length} görsel</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleActive(car)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        car.isActive ? "bg-green-100 text-green-700" : "bg-brown-100 text-brown-500"
                      }`}
                    >
                      {car.isActive ? "Aktif" : "Pasif"}
                    </button>
                  </td>
                  <td className="p-3 space-x-2">
                    <button onClick={() => startEdit(car)} className="text-brown-600 hover:underline">
                      Düzenle
                    </button>
                    <button onClick={() => remove(car.id)} className="text-red-600 hover:underline">
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

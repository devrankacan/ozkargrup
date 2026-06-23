"use client";

import { useEffect, useState } from "react";
import { tours } from "@/lib/tours";

type TourReservation = {
  id: string;
  tourSlug: string;
  tourName: string;
  fullName: string;
  email: string | null;
  phone: string;
  peopleCount: number;
  tourDate: string;
  notes: string | null;
  status: string;
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

const emptyForm = {
  tourSlug: "",
  fullName: "",
  email: "",
  phone: "",
  peopleCount: "1",
  tourDate: "",
  notes: "",
  status: "confirmed",
};

function toDateInputValue(value: string) {
  return value ? value.slice(0, 10) : "";
}

export default function AdminTurRezervasyonlariPage() {
  const [reservations, setReservations] = useState<TourReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");
  const [exportFrom, setExportFrom] = useState("");
  const [exportTo, setExportTo] = useState("");
  const [mailTemplates, setMailTemplates] = useState<Record<string, string>>({});
  const [sendingMailId, setSendingMailId] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/tur-rezervasyonlari");
    setReservations(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    const tour = tours.find((t) => t.slug === form.tourSlug);
    if (!tour) {
      setFormError("Lütfen bir tur seçin.");
      return;
    }
    const url = editingId ? `/api/admin/tur-rezervasyonlari/${editingId}` : "/api/admin/tur-rezervasyonlari";
    const method = editingId ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, tourName: tour.name, peopleCount: Number(form.peopleCount) }),
    });
    if (!res.ok) {
      const err = await res.json();
      setFormError(err.error || "Bir hata oluştu.");
      return;
    }
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    load();
  }

  function startEdit(r: TourReservation) {
    setEditingId(r.id);
    setShowForm(true);
    setFormError("");
    setForm({
      tourSlug: r.tourSlug,
      fullName: r.fullName,
      email: r.email || "",
      phone: r.phone,
      peopleCount: String(r.peopleCount),
      tourDate: toDateInputValue(r.tourDate),
      notes: r.notes || "",
      status: r.status,
    });
  }

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
    setShowForm(true);
  }

  function cancelForm() {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
    setShowForm(false);
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/tur-rezervasyonlari/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Bu rezervasyonu silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/admin/tur-rezervasyonlari/${id}`, { method: "DELETE" });
    load();
  }

  async function sendMail(id: string) {
    setSendingMailId(id);
    const template = mailTemplates[id] || "confirmed";
    const res = await fetch(`/api/admin/tur-rezervasyonlari/${id}/send-mail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ template }),
    });
    setSendingMailId(null);
    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Mail gönderilemedi.");
      return;
    }
    alert("Mail gönderildi.");
  }

  function downloadExcel() {
    const params = new URLSearchParams();
    if (exportFrom) params.set("from", exportFrom);
    if (exportTo) params.set("to", exportTo);
    window.open(`/api/admin/tur-rezervasyonlari/export?${params.toString()}`, "_blank");
  }

  if (loading) return <p className="text-brown-500">Yükleniyor...</p>;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-brown-700">Tur Rezervasyonları</h1>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={exportFrom}
            onChange={(e) => setExportFrom(e.target.value)}
            className="rounded-lg border border-brown-200 px-3 py-2 text-sm"
          />
          <span className="text-brown-400">—</span>
          <input
            type="date"
            value={exportTo}
            onChange={(e) => setExportTo(e.target.value)}
            className="rounded-lg border border-brown-200 px-3 py-2 text-sm"
          />
          <button
            onClick={downloadExcel}
            className="rounded-lg border border-brown-300 px-4 py-2 text-sm font-semibold text-brown-600 hover:bg-brown-100"
          >
            Excel İndir
          </button>
          {!showForm && (
            <button
              onClick={startCreate}
              className="rounded-lg bg-brown-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brown-600"
            >
              + Yeni Tur Rezervasyonu (Elden)
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 grid gap-3 rounded-xl border border-brown-200 bg-white p-6 sm:grid-cols-2"
        >
          {formError && (
            <p className="sm:col-span-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{formError}</p>
          )}
          <select
            required
            value={form.tourSlug}
            onChange={(e) => setForm({ ...form, tourSlug: e.target.value })}
            className="rounded-lg border border-brown-200 px-3 py-2 sm:col-span-2"
          >
            <option value="" disabled>
              Tur seçin
            </option>
            {tours.map((tour) => (
              <option key={tour.slug} value={tour.slug}>
                {tour.name}
              </option>
            ))}
          </select>
          <input
            required
            placeholder="Ad Soyad"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className="rounded-lg border border-brown-200 px-3 py-2"
          />
          <input
            required
            placeholder="Telefon"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="rounded-lg border border-brown-200 px-3 py-2"
          />
          <input
            type="text"
            placeholder="E-posta (opsiyonel, birden fazla için virgülle ayırın)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-lg border border-brown-200 px-3 py-2"
          />
          <input
            type="number"
            min={1}
            placeholder="Kişi Sayısı"
            value={form.peopleCount}
            onChange={(e) => setForm({ ...form, peopleCount: e.target.value })}
            className="rounded-lg border border-brown-200 px-3 py-2"
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-brown-700">Tur Tarihi</label>
            <input
              required
              type="date"
              value={form.tourDate}
              onChange={(e) => setForm({ ...form, tourDate: e.target.value })}
              className="w-full rounded-lg border border-brown-200 px-3 py-2"
            />
          </div>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="rounded-lg border border-brown-200 px-3 py-2"
          >
            <option value="confirmed">Onaylandı</option>
            <option value="pending">Bekliyor</option>
            <option value="cancelled">İptal</option>
          </select>
          <textarea
            placeholder="Not (opsiyonel)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="sm:col-span-2 rounded-lg border border-brown-200 px-3 py-2"
          />
          <div className="sm:col-span-2 flex gap-2">
            <button type="submit" className="rounded-lg bg-brown-500 px-4 py-2 font-semibold text-white hover:bg-brown-600">
              {editingId ? "Güncelle" : "Rezervasyon Oluştur"}
            </button>
            <button
              type="button"
              onClick={cancelForm}
              className="rounded-lg border border-brown-300 px-4 py-2 text-brown-600"
            >
              Vazgeç
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {reservations.map((r) => (
          <div key={r.id} className="rounded-xl border border-brown-200 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-brown-700">
                  {r.fullName} — {r.tourName}
                </p>
                <p className="text-sm text-brown-500">{r.email} · {r.phone}</p>
                <p className="mt-1 text-sm text-brown-600">
                  {new Date(r.tourDate).toLocaleDateString("tr-TR")} · {r.peopleCount} kişi
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
              <button onClick={() => startEdit(r)} className="rounded-lg border border-brown-300 px-3 py-1 text-xs font-semibold text-brown-600">
                Düzenle
              </button>
              <button onClick={() => remove(r.id)} className="ml-auto text-xs text-red-600 hover:underline">
                Sil
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-brown-100 pt-3">
              <select
                value={mailTemplates[r.id] || "confirmed"}
                onChange={(e) => setMailTemplates({ ...mailTemplates, [r.id]: e.target.value })}
                className="rounded-lg border border-brown-200 px-2 py-1 text-xs"
              >
                <option value="confirmed">Rezervasyonunuz Onaylandı</option>
                <option value="reminder">Hatırlatma (1 Gün Kaldı)</option>
                <option value="completed">Teşekkür / Tamamlandı</option>
              </select>
              <button
                onClick={() => sendMail(r.id)}
                disabled={sendingMailId === r.id}
                className="rounded-lg bg-brown-500 px-3 py-1 text-xs font-semibold text-white hover:bg-brown-600 disabled:opacity-50"
              >
                {sendingMailId === r.id ? "Gönderiliyor..." : "Mail Gönder"}
              </button>
            </div>
          </div>
        ))}
        {reservations.length === 0 && <p className="text-brown-500">Henüz tur rezervasyonu bulunmuyor.</p>}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { tours } from "@/lib/tours";

type TourEvent = {
  id: string;
  tourSlug: string;
  tourName: string;
  eventDate: string;
  notes: string | null;
  reservations: { id: string; email: string | null; peopleCount: number }[];
};

const emptyForm = {
  tourSlug: "",
  eventDate: "",
  notes: "",
};

function toDateInputValue(value: string) {
  return value ? value.slice(0, 10) : "";
}

export default function AdminTurEtkinlikleriPage() {
  const [events, setEvents] = useState<TourEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");
  const [mailTemplates, setMailTemplates] = useState<Record<string, string>>({});
  const [sendingId, setSendingId] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/tur-etkinlikleri");
    setEvents(await res.json());
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
    const url = editingId ? `/api/admin/tur-etkinlikleri/${editingId}` : "/api/admin/tur-etkinlikleri";
    const method = editingId ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, tourName: tour.name }),
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

  function startEdit(ev: TourEvent) {
    setEditingId(ev.id);
    setShowForm(true);
    setFormError("");
    setForm({
      tourSlug: ev.tourSlug,
      eventDate: toDateInputValue(ev.eventDate),
      notes: ev.notes || "",
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

  async function remove(id: string) {
    if (!confirm("Bu etkinliği ve bağlı rezervasyonları silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/admin/tur-etkinlikleri/${id}`, { method: "DELETE" });
    load();
  }

  async function sendBulkMail(id: string) {
    setSendingId(id);
    const template = mailTemplates[id] || "confirmed";
    const res = await fetch(`/api/admin/tur-etkinlikleri/${id}/send-mail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ template }),
    });
    setSendingId(null);
    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Mail gönderilemedi.");
      return;
    }
    const data = await res.json();
    alert(`${data.sent} kişiye mail gönderildi.`);
  }

  if (loading) return <p className="text-brown-500">Yükleniyor...</p>;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-brown-700">Tur Etkinlikleri</h1>
        {!showForm && (
          <button
            onClick={startCreate}
            className="rounded-lg bg-brown-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brown-600"
          >
            + Yeni Etkinlik
          </button>
        )}
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
          <div>
            <label className="mb-1 block text-sm font-medium text-brown-700">Etkinlik Tarihi</label>
            <input
              required
              type="date"
              value={form.eventDate}
              onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
              className="w-full rounded-lg border border-brown-200 px-3 py-2"
            />
          </div>
          <input
            placeholder="Not (opsiyonel)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="rounded-lg border border-brown-200 px-3 py-2"
          />
          <div className="sm:col-span-2 flex gap-2">
            <button type="submit" className="rounded-lg bg-brown-500 px-4 py-2 font-semibold text-white hover:bg-brown-600">
              {editingId ? "Güncelle" : "Etkinlik Oluştur"}
            </button>
            <button type="button" onClick={cancelForm} className="rounded-lg border border-brown-300 px-4 py-2 text-brown-600">
              Vazgeç
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {events.map((ev) => {
          const withEmail = ev.reservations.filter((r) => r.email).length;
          const totalPeople = ev.reservations.reduce((sum, r) => sum + r.peopleCount, 0);
          return (
            <div key={ev.id} className="rounded-xl border border-brown-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-brown-700">{ev.tourName}</p>
                  <p className="mt-1 text-sm text-brown-600">
                    {new Date(ev.eventDate).toLocaleDateString("tr-TR")} · {ev.reservations.length} rezervasyon · {totalPeople} kişi
                  </p>
                  {ev.notes && <p className="mt-1 text-sm text-brown-500">Not: {ev.notes}</p>}
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => startEdit(ev)} className="rounded-lg border border-brown-300 px-3 py-1 text-xs font-semibold text-brown-600">
                  Düzenle
                </button>
                <button onClick={() => remove(ev.id)} className="ml-auto text-xs text-red-600 hover:underline">
                  Sil
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2 border-t border-brown-100 pt-3">
                <select
                  value={mailTemplates[ev.id] || "confirmed"}
                  onChange={(e) => setMailTemplates({ ...mailTemplates, [ev.id]: e.target.value })}
                  className="rounded-lg border border-brown-200 px-2 py-1 text-xs"
                >
                  <option value="confirmed">Rezervasyonunuz Onaylandı</option>
                  <option value="reminder">Hatırlatma (1 Gün Kaldı)</option>
                  <option value="completed">Teşekkür / Tamamlandı</option>
                </select>
                <button
                  onClick={() => sendBulkMail(ev.id)}
                  disabled={sendingId === ev.id || withEmail === 0}
                  className="rounded-lg bg-brown-500 px-3 py-1 text-xs font-semibold text-white hover:bg-brown-600 disabled:opacity-50"
                >
                  {sendingId === ev.id ? "Gönderiliyor..." : `Tümüne Mail Gönder (${withEmail})`}
                </button>
              </div>
            </div>
          );
        })}
        {events.length === 0 && <p className="text-brown-500">Henüz tur etkinliği bulunmuyor.</p>}
      </div>
    </div>
  );
}

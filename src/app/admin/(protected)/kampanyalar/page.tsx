"use client";

import { useEffect, useState } from "react";

type Campaign = {
  id: string;
  title: string;
  description: string;
  discount: string | null;
  isActive: boolean;
};

const emptyForm = { title: "", description: "", discount: "" };

export default function AdminKampanyalarPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/kampanyalar");
    setCampaigns(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = editingId ? `/api/admin/kampanyalar/${editingId}` : "/api/admin/kampanyalar";
    const method = editingId ? "PATCH" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(emptyForm);
    setEditingId(null);
    load();
  }

  function startEdit(c: Campaign) {
    setEditingId(c.id);
    setForm({ title: c.title, description: c.description, discount: c.discount || "" });
  }

  async function toggleActive(c: Campaign) {
    await fetch(`/api/admin/kampanyalar/${c.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !c.isActive }),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Bu kampanyayı silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/admin/kampanyalar/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-brown-700">Kampanyalar</h1>

      <form onSubmit={handleSubmit} className="mb-10 grid gap-3 rounded-xl border border-brown-200 bg-white p-6">
        <input
          required
          placeholder="Başlık"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded-lg border border-brown-200 px-3 py-2"
        />
        <textarea
          required
          placeholder="Açıklama"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="rounded-lg border border-brown-200 px-3 py-2"
        />
        <input
          placeholder="İndirim (örn: %15)"
          value={form.discount}
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
          className="rounded-lg border border-brown-200 px-3 py-2"
        />
        <div className="flex gap-2">
          <button type="submit" className="rounded-lg bg-brown-500 px-4 py-2 font-semibold text-white hover:bg-brown-600">
            {editingId ? "Güncelle" : "Kampanya Ekle"}
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
        <div className="space-y-3">
          {campaigns.map((c) => (
            <div key={c.id} className="rounded-xl border border-brown-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-brown-700">{c.title}</p>
                  <p className="text-sm text-brown-500">{c.description}</p>
                  {c.discount && <p className="text-sm text-brown-600">İndirim: {c.discount}</p>}
                </div>
                <button
                  onClick={() => toggleActive(c)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    c.isActive ? "bg-green-100 text-green-700" : "bg-brown-100 text-brown-500"
                  }`}
                >
                  {c.isActive ? "Aktif" : "Pasif"}
                </button>
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => startEdit(c)} className="text-sm text-brown-600 hover:underline">
                  Düzenle
                </button>
                <button onClick={() => remove(c.id)} className="text-sm text-red-600 hover:underline">
                  Sil
                </button>
              </div>
            </div>
          ))}
          {campaigns.length === 0 && <p className="text-brown-500">Henüz kampanya bulunmuyor.</p>}
        </div>
      )}
    </div>
  );
}

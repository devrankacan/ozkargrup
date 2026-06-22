"use client";

import { useEffect, useState } from "react";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  createdAt: string;
};

export default function AdminMesajlarPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/admin/mesajlar");
    setMessages(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id: string) {
    if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/admin/mesajlar/${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <p className="text-brown-500">Yükleniyor...</p>;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-brown-700">İletişim Mesajları</h1>
      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className="rounded-xl border border-brown-200 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-brown-700">{m.subject}</p>
                <p className="text-sm text-brown-500">
                  {m.name} · {m.email} {m.phone && `· ${m.phone}`}
                </p>
                <p className="mt-2 text-sm text-brown-600">{m.message}</p>
              </div>
              <button onClick={() => remove(m.id)} className="text-sm text-red-600 hover:underline">
                Sil
              </button>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-brown-500">Henüz mesaj bulunmuyor.</p>}
      </div>
    </div>
  );
}

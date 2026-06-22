"use client";

import { useEffect, useState } from "react";

export default function AdminAyarlarPage() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/admin/ayarlar");
    const data = await res.json();
    setLogoUrl(data.logoUrl);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function saveLogoUrl(url: string | null) {
    await fetch("/api/admin/ayarlar", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ logoUrl: url }),
    });
    setLogoUrl(url);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const body = new FormData();
    body.append("file", file);
    body.append("target", "logo");
    const res = await fetch("/api/admin/upload", { method: "POST", body });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Yükleme başarısız oldu.");
      setUploading(false);
      return;
    }
    await saveLogoUrl(data.url);
    setUploading(false);
    e.target.value = "";
  }

  async function removeLogo() {
    if (!confirm("Logoyu kaldırmak istediğinize emin misiniz?")) return;
    await saveLogoUrl(null);
  }

  if (loading) return <p className="text-brown-500">Yükleniyor...</p>;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-brown-700">Site Ayarları</h1>

      <div className="max-w-md rounded-xl border border-brown-200 bg-white p-6">
        <h2 className="mb-3 font-semibold text-brown-700">Logo</h2>
        {logoUrl ? (
          <div className="mb-4 flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoUrl} alt="Logo" className="h-16 w-auto rounded-lg border border-brown-200 bg-brown-50 object-contain p-2" />
            <button onClick={removeLogo} className="text-sm text-red-600 hover:underline">
              Kaldır
            </button>
          </div>
        ) : (
          <p className="mb-4 text-sm text-brown-500">Henüz bir logo yüklenmedi, varsayılan metin gösteriliyor.</p>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileUpload}
          disabled={uploading}
          className="block w-full rounded-lg border border-brown-200 px-3 py-2 text-sm"
        />
        {uploading && <p className="mt-2 text-sm text-brown-500">Yükleniyor...</p>}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}

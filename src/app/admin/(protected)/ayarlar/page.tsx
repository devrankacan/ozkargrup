"use client";

import { useEffect, useState } from "react";

type Settings = {
  logoUrl: string | null;
  heroImageDesktopUrl: string | null;
  heroImageMobileUrl: string | null;
};

const emptySettings: Settings = { logoUrl: null, heroImageDesktopUrl: null, heroImageMobileUrl: null };

function ImageSetting({
  label,
  hint,
  value,
  previewClassName,
  onUpload,
  onRemove,
}: {
  label: string;
  hint?: string;
  value: string | null;
  previewClassName: string;
  onUpload: (file: File) => void;
  onRemove: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      await onUpload(file);
    } catch {
      setError("Yükleme başarısız oldu.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="rounded-xl border border-brown-200 bg-white p-6">
      <h2 className="mb-1 font-semibold text-brown-700">{label}</h2>
      {hint && <p className="mb-3 text-xs text-brown-400">{hint}</p>}
      {value ? (
        <div className="mb-4 flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={label} className={previewClassName} />
          <button onClick={onRemove} className="text-sm text-red-600 hover:underline">
            Kaldır
          </button>
        </div>
      ) : (
        <p className="mb-4 text-sm text-brown-500">Henüz yüklenmedi.</p>
      )}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleChange}
        disabled={uploading}
        className="block w-full rounded-lg border border-brown-200 px-3 py-2 text-sm"
      />
      {uploading && <p className="mt-2 text-sm text-brown-500">Yükleniyor, sunucu güncelleniyor (birkaç saniye sürebilir)...</p>}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default function AdminAyarlarPage() {
  const [settings, setSettings] = useState<Settings>(emptySettings);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/admin/ayarlar");
    setSettings(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function patch(field: keyof Settings, value: string | null) {
    await fetch("/api/admin/ayarlar", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    setSettings((s) => ({ ...s, [field]: value }));
  }

  async function waitUntilAvailable(url: string, timeoutMs = 15000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      try {
        const res = await fetch(url, { method: "HEAD", cache: "no-store" });
        if (res.ok) return;
      } catch {
        // henüz hazır değil, tekrar denenecek
      }
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  async function upload(file: File, target: string, field: keyof Settings) {
    const body = new FormData();
    body.append("file", file);
    body.append("target", target);
    const res = await fetch("/api/admin/upload", { method: "POST", body });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    await waitUntilAvailable(data.url);
    await patch(field, data.url);
  }

  if (loading) return <p className="text-brown-500">Yükleniyor...</p>;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-brown-700">Site Ayarları</h1>

      <div className="grid max-w-2xl gap-6">
        <ImageSetting
          label="Logo"
          value={settings.logoUrl}
          previewClassName="h-16 w-auto rounded-lg border border-brown-200 bg-brown-50 object-contain p-2"
          onUpload={(file) => upload(file, "logo", "logoUrl")}
          onRemove={() => {
            if (confirm("Logoyu kaldırmak istediğinize emin misiniz?")) patch("logoUrl", null);
          }}
        />
        <ImageSetting
          label="Anasayfa Arkaplan Görseli (Masaüstü)"
          hint="Önerilen boyut: 1920×1080px ve üzeri, geniş ekran (16:9) görseller."
          value={settings.heroImageDesktopUrl}
          previewClassName="h-24 w-40 rounded-lg border border-brown-200 bg-brown-50 object-cover"
          onUpload={(file) => upload(file, "hero", "heroImageDesktopUrl")}
          onRemove={() => {
            if (confirm("Masaüstü arkaplan görselini kaldırmak istediğinize emin misiniz?")) patch("heroImageDesktopUrl", null);
          }}
        />
        <ImageSetting
          label="Anasayfa Arkaplan Görseli (Mobil)"
          hint="Önerilen boyut: 1080×1920px civarı, dikey (9:16) görseller."
          value={settings.heroImageMobileUrl}
          previewClassName="h-24 w-14 rounded-lg border border-brown-200 bg-brown-50 object-cover"
          onUpload={(file) => upload(file, "hero", "heroImageMobileUrl")}
          onRemove={() => {
            if (confirm("Mobil arkaplan görselini kaldırmak istediğinize emin misiniz?")) patch("heroImageMobileUrl", null);
          }}
        />
      </div>
    </div>
  );
}

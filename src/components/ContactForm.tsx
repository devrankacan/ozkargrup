"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/iletisim", {
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
        Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Ad Soyad"
          className="rounded-lg border border-brown-200 px-4 py-2 outline-none focus:border-brown-400"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="E-posta"
          className="rounded-lg border border-brown-200 px-4 py-2 outline-none focus:border-brown-400"
        />
      </div>
      <input
        name="phone"
        placeholder="Telefon (opsiyonel)"
        className="w-full rounded-lg border border-brown-200 px-4 py-2 outline-none focus:border-brown-400"
      />
      <input
        name="subject"
        required
        placeholder="Konu"
        className="w-full rounded-lg border border-brown-200 px-4 py-2 outline-none focus:border-brown-400"
      />
      <textarea
        name="message"
        required
        rows={5}
        placeholder="Mesajınız"
        className="w-full rounded-lg border border-brown-200 px-4 py-2 outline-none focus:border-brown-400"
      />
      {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-brown-500 px-6 py-2 font-semibold text-white transition hover:bg-brown-600 disabled:opacity-60"
      >
        {status === "loading" ? "Gönderiliyor..." : "Gönder"}
      </button>
    </form>
  );
}

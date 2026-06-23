"use client";

import { useState } from "react";
import RippleButton from "@/components/animations/RippleButton";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/bulten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const err = await res.json();
        setErrorMsg(err.error || "Bir hata oluştu.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setErrorMsg("Bağlantı hatası, lütfen tekrar deneyin.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="text-sm text-brown-700">Bültenimize başarıyla kaydoldunuz, teşekkürler!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="E-posta adresiniz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-brown-200 bg-white px-3 py-2 text-sm outline-none focus:border-brown-400"
        />
        <RippleButton
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-lg bg-brown-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brown-600 disabled:opacity-60"
        >
          {status === "loading" ? "..." : "Kaydol"}
        </RippleButton>
      </div>
      {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}
    </form>
  );
}

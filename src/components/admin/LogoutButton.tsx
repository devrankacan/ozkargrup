"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full rounded-lg border border-brown-300 px-3 py-2 text-sm font-medium text-brown-600 transition hover:bg-brown-100"
    >
      Çıkış Yap
    </button>
  );
}

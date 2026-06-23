"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const groups = [
  {
    key: "site",
    label: "Site",
    links: [
      { href: "/admin/lokasyonlar", label: "Lokasyonlar" },
      { href: "/admin/kampanyalar", label: "Kampanyalar" },
      { href: "/admin/mesajlar", label: "Mesajlar" },
      { href: "/admin/bulten", label: "Bülten" },
      { href: "/admin/ayarlar", label: "Ayarlar" },
    ],
  },
  {
    key: "arac-kiralama",
    label: "Araç Kiralama",
    links: [
      { href: "/admin/araclar", label: "Araçlar" },
      { href: "/admin/rezervasyonlar", label: "Kiralama Rezervasyonları" },
    ],
  },
  {
    key: "turlar",
    label: "Turlar",
    links: [
      { href: "/admin/tur-etkinlikleri", label: "Tur Etkinlikleri" },
      { href: "/admin/tur-rezervasyonlari", label: "Tur Rezervasyonları" },
    ],
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  const activeGroup = groups.find((g) => g.links.some((l) => pathname === l.href || pathname.startsWith(`${l.href}/`)));

  if (!activeGroup) {
    return (
      <nav>
        <Link
          href="/admin"
          className={`block rounded-lg px-3 py-2 text-sm font-semibold transition ${
            pathname === "/admin" ? "bg-brown-500 text-white" : "text-brown-700 hover:bg-brown-100"
          }`}
        >
          Panel
        </Link>
      </nav>
    );
  }

  return (
    <nav>
      <Link
        href="/admin"
        className="mb-4 flex items-center gap-1 text-sm font-medium text-brown-500 hover:text-brown-700"
      >
        ← Ana Ekrana Dön
      </Link>
      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-brown-400">
        {activeGroup.label}
      </p>
      <div className="space-y-1">
        {activeGroup.links.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                active ? "bg-brown-500 text-white" : "text-brown-600 hover:bg-brown-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

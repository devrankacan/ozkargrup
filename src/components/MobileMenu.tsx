"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Menü"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center text-brown-700"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
          {open ? (
            <path d="M6.4 4.98 4.98 6.4 10.59 12l-5.6 5.6 1.4 1.4 5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6 5.6-5.6-1.4-1.4-5.6 5.6z" />
          ) : (
            <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
          )}
        </svg>
      </button>
      {open && (
        <nav className="absolute inset-x-0 top-full z-40 flex flex-col border-b border-brown-200 bg-white px-6 py-4 shadow-md">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-brown-100 py-3 text-sm font-medium text-brown-600 last:border-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}

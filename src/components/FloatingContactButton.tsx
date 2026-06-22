"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "905616179731";
const PHONE_NUMBER = "+905616179731";

export default function FloatingContactButton() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed z-[60] flex flex-col items-end gap-3"
      style={{
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)",
        right: "calc(env(safe-area-inset-right, 0px) + 1.5rem)",
      }}
    >
      {open && (
        <div className="flex flex-col items-end gap-2">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-600"
          >
            <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current">
              <path d="M16 0C7.16 0 0 7.16 0 16c0 2.84.74 5.5 2.04 7.82L0 32l8.34-2.18A15.9 15.9 0 0 0 16 32c8.84 0 16-7.16 16-16S24.84 0 16 0zm0 29.09c-2.5 0-4.85-.68-6.88-1.86l-.49-.29-4.95 1.3 1.32-4.82-.32-.5A13.05 13.05 0 0 1 2.91 16C2.91 8.78 8.78 2.91 16 2.91S29.09 8.78 29.09 16 23.22 29.09 16 29.09zm7.18-9.74c-.39-.2-2.3-1.13-2.65-1.26-.36-.13-.62-.2-.88.2-.26.39-1 1.26-1.23 1.52-.23.26-.45.29-.84.1-.39-.2-1.63-.6-3.1-1.92-1.15-1.02-1.92-2.29-2.15-2.68-.23-.39-.02-.6.17-.8.2-.2.45-.52.68-.78.23-.26.3-.45.45-.75.16-.3.08-.55-.04-.75-.13-.2-.78-1.88-1.07-2.58-.28-.68-.57-.58-.78-.59-.2-.01-.43-.01-.66-.01-.23 0-.59.08-.9.39-.3.3-1.16 1.13-1.16 2.76 0 1.63 1.19 3.21 1.36 3.43.16.23 2.27 3.47 5.5 4.73 3.23 1.26 3.23.84 3.81.78.59-.07 1.89-.78 2.16-1.52.26-.75.26-1.39.18-1.52-.08-.13-.3-.2-.65-.36z" />
            </svg>
            WhatsApp
          </a>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-2 rounded-full bg-brown-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brown-600"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.25 1.02l-2.2 2.19z" />
            </svg>
            Ara
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="İletişim seçenekleri"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brown-700 text-white shadow-lg transition hover:bg-brown-800"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path d="M6.4 4.98 4.98 6.4 10.59 12l-5.6 5.6 1.4 1.4 5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6 5.6-5.6-1.4-1.4-5.6 5.6z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
          </svg>
        )}
      </button>
    </div>
  );
}

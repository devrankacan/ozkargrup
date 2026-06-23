"use client";

import { useRef } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function RippleButton({ className = "", children, onClick, ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = ref.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const ripple = document.createElement("span");
      ripple.className = "ripple-effect";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    }
    onClick?.(e);
  }

  return (
    <button ref={ref} onClick={handleClick} className={`relative overflow-hidden ${className}`} {...rest}>
      {children}
    </button>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  index?: number;
  className?: string;
};

export default function RevealOnScroll({ children, index = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromX = index % 2 === 0 ? -70 : 70;
    const tween = gsap.fromTo(
      el,
      { opacity: 0, x: fromX },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [index]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

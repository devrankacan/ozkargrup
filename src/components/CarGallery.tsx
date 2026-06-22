"use client";

import { useState } from "react";

export default function CarGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center rounded-xl bg-brown-100 text-brown-400">
        {alt}
      </div>
    );
  }

  return (
    <div>
      <div className="h-80 overflow-hidden rounded-xl bg-brown-100 sm:h-96">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[active]} alt={alt} className="h-full w-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                i === active ? "border-brown-500" : "border-transparent"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`${alt} ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

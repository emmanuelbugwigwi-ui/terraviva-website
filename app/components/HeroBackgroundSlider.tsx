"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Add more paths here as more photos are uploaded to /public — the slider
// automatically adjusts to however many images are listed, up to 4.
const images = [
  "/hero-background.jpeg",
  "/background-photo.jpeg",
  "/image_3.jpeg",
  "/image_4.jpeg",
];

const SLIDE_INTERVAL = 5000; // ms between slides
const TRANSITION_MS = 1200; // ms for each slide transition

export default function HeroBackgroundSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    if (images.length < 2) return;

    const id = setInterval(() => {
      setIndex((prev) => {
        const next = prev + direction;

        if (next > images.length - 1) {
          setDirection(-1);
          return prev - 1;
        }
        if (next < 0) {
          setDirection(1);
          return prev + 1;
        }
        return next;
      });
    }, SLIDE_INTERVAL);

    return () => clearInterval(id);
  }, [direction]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 ease-in-out"
          style={{
            transform: `translateX(${(i - index) * 100}%)`,
            transitionProperty: "transform",
            transitionDuration: `${TRANSITION_MS}ms`,
          }}
        >
          <Image
            src={src}
            alt="Terraviva community and environmental work"
            fill
            priority={i === 0}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const EXIT_DELAY = 2200; // when the exit animation starts
const UNMOUNT_DELAY = 2900; // when the splash is removed from the DOM

export default function Splash() {
  const [mounted, setMounted] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), EXIT_DELAY);
    const unmountTimer = setTimeout(() => setMounted(false), UNMOUNT_DELAY);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = mounted ? "hidden" : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden={exiting}
      className={`fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-forest-green transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
        exiting
          ? "pointer-events-none translate-y-[-4%] opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      {/* Ambient background texture */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(102,187,106,0.35),transparent_55%),radial-gradient(circle_at_75%_80%,rgba(21,101,192,0.35),transparent_55%)]" />
        <div className="absolute inset-0 bg-forest-green/40" />
      </div>

      {/* Pulse rings behind the logo */}
      <div className="absolute flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
        <span className="splash-ring absolute h-full w-full rounded-full border border-light-green/40" />
        <span className="splash-ring splash-ring-delay absolute h-full w-full rounded-full border border-cta-orange/30" />
      </div>

      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="splash-rise flex h-24 w-24 items-center justify-center rounded-full bg-white p-3 shadow-[0_0_40px_rgba(0,0,0,0.25)] sm:h-28 sm:w-28">
          <Image
            src="/logo-left.jpeg"
            alt="Terraviva logo"
            width={160}
            height={160}
            priority
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <p className="splash-rise splash-rise-1 mt-7 font-heading text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
          Welcome to
        </p>
        <h1 className="splash-rise splash-rise-2 mt-2 font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Terra<span className="text-cta-orange">viva</span>
        </h1>
        <p className="splash-rise splash-rise-3 mt-4 max-w-xs text-sm text-white/75 sm:max-w-sm">
          Protecting nature, empowering communities.
        </p>

        <div className="splash-rise splash-rise-4 mt-9 h-[3px] w-40 overflow-hidden rounded-full bg-white/15 sm:w-48">
          <div className="splash-progress h-full rounded-full bg-cta-orange" />
        </div>
      </div>
    </div>
  );
}

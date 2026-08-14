"use client";

import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Projects", href: "#projects" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 z-30 w-full">
      <div className="flex items-center justify-between px-4 py-3 sm:px-10 sm:py-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-left.jpeg"
            alt="Terraviva logo"
            width={160}
            height={80}
            className="h-9 w-auto sm:h-12 md:h-14"
          />
          <span className="hidden font-heading text-lg font-semibold tracking-tight text-white sm:inline sm:text-xl">
            Terra<span className="text-cta-orange">viva</span>
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-heading text-sm font-medium text-white transition hover:text-cta-orange"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/donate"
            className="rounded-md bg-cta-orange px-5 py-2 font-heading text-sm font-medium text-white transition hover:opacity-90"
          >
            Donate now
          </a>
        </nav>

        <Image
          src="/logo-right.jpeg"
          alt="Partner logo"
          width={160}
          height={80}
          className="hidden h-9 w-auto sm:h-12 md:h-14 lg:block"
        />

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-white transition ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col items-center gap-6 bg-forest-green px-6 py-8 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-heading text-base font-medium text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/donate"
            onClick={() => setOpen(false)}
            className="rounded-md bg-cta-orange px-6 py-2 font-heading text-sm font-medium text-white"
          >
            Donate now
          </a>
        </nav>
      )}
    </header>
  );
}

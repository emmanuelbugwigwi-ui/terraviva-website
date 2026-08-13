"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import HeroBackgroundSlider from "./HeroBackgroundSlider";

const CONTENT_DOC = doc(db, "site-content", "homepage");

const DEFAULT_TEXT = {
  heroHeadline: "Building climate-resilient communities for a sustainable future.",
  heroSubheadline:
    "Terraviva works with communities to promote environmental conservation, sustainable agriculture, reproductive health education and the empowerment of youth and women.",
};

export default function Hero() {
  const [text, setText] = useState(DEFAULT_TEXT);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(CONTENT_DOC);
        if (snap.exists()) {
          const data = snap.data();
          setText({
            heroHeadline: data.heroHeadline || DEFAULT_TEXT.heroHeadline,
            heroSubheadline: data.heroSubheadline || DEFAULT_TEXT.heroSubheadline,
          });
        }
      } catch {
        // Keep showing the defaults above.
      }
    }
    load();
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center text-white">
      <HeroBackgroundSlider />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="mb-5 flex items-center justify-center gap-3 font-heading text-sm font-semibold uppercase tracking-[0.35em] text-white/90">
          <span className="h-px w-8 bg-cta-orange" />
          Terraviva
          <span className="h-px w-8 bg-cta-orange" />
        </p>

        <h1 className="font-heading text-4xl font-semibold leading-tight sm:text-5xl">
          {text.heroHeadline}
        </h1>

        <p className="mt-6 text-lg text-white/90">{text.heroSubheadline}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="/donate"
            className="rounded-md bg-cta-orange px-6 py-3 font-heading font-medium text-white transition hover:opacity-90"
          >
            Donate now
          </a>
          <a
            href="#projects"
            className="rounded-md border border-white px-6 py-3 font-heading font-medium text-white transition hover:bg-white hover:text-forest-green"
          >
            Our projects
          </a>
          <a
            href="#about"
            className="rounded-md border border-white px-6 py-3 font-heading font-medium text-white transition hover:bg-white hover:text-forest-green"
          >
            Learn more
          </a>
          <a
            href="#contact"
            className="rounded-md border border-white px-6 py-3 font-heading font-medium text-white transition hover:bg-white hover:text-forest-green"
          >
            Become a partner
          </a>
        </div>
      </div>
    </section>
  );
}

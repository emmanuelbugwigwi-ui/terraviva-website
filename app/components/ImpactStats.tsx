"use client";

import { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { ImpactStat } from "@/types/content";

const CONTENT_DOC = doc(db, "site-content", "homepage");

const DEFAULT_STATS: ImpactStat[] = [
  { label: "Communities Reached", value: 120 },
  { label: "Trees Planted", value: 250000 },
  { label: "Hectares Restored/Conserved", value: 850 },
  { label: "Farmers Supported", value: 4300 },
  { label: "Farmers Adopting Sustainable Agriculture", value: 1800 },
  { label: "Youth Empowered", value: 2600 },
  { label: "Women Empowered", value: 3100 },
  { label: "People Reached with Reproductive Health Education", value: 5200 },
  { label: "Environmental Education Beneficiaries", value: 6400 },
  { label: "Livelihoods Supported", value: 1500 },
];

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const startTime = performance.now();

          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function ImpactStats() {
  const [stats, setStats] = useState<ImpactStat[]>(DEFAULT_STATS);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(CONTENT_DOC);
        if (snap.exists()) {
          const data = snap.data();
          if (Array.isArray(data.impactStats) && data.impactStats.length > 0) {
            setStats(data.impactStats as ImpactStat[]);
          }
        }
      } catch {
        // Firebase not reachable yet — keep showing the defaults above.
      }
    }
    load();
  }, []);

  return (
    <section id="impact" className="bg-deep-blue px-6 py-16 text-white sm:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 text-center sm:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-heading text-3xl font-semibold sm:text-4xl">
              <Counter value={stat.value} />+
            </p>
            <p className="mt-2 text-sm text-white/80">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

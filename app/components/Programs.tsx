"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Program } from "@/types/content";

const CONTENT_DOC = doc(db, "site-content", "homepage");

const DEFAULT_HEADING = "Our programs";
const DEFAULT_SUBHEADING =
  "Six focus areas working together to build resilient, empowered communities.";

const DEFAULT_PROGRAMS: Program[] = [
  {
    title: "Climate action",
    description:
      "Helping communities anticipate, withstand, and recover from a changing climate.",
    items: [
      "Climate adaptation",
      "Climate resilience",
      "Community awareness",
      "Carbon reduction initiatives",
    ],
  },
  {
    title: "Environmental conservation",
    description:
      "Restoring ecosystems and reducing pressure on the natural resources communities depend on.",
    items: [
      "Tree planting",
      "Ecosystem restoration",
      "Biodiversity conservation",
      "Waste management initiatives",
    ],
  },
  {
    title: "Sustainable agriculture",
    description:
      "Helping farmers grow more, sustainably, even as growing conditions shift.",
    items: [
      "Climate-smart agriculture",
      "Agroforestry",
      "Farmer training",
      "Food security programs",
    ],
  },
  {
    title: "Youth empowerment",
    description:
      "Equipping young people with the skills and opportunities to build their own futures.",
    items: [
      "Skills development",
      "Entrepreneurship",
      "Leadership training",
      "Employment opportunities",
    ],
  },
  {
    title: "Women empowerment",
    description:
      "Expanding economic opportunity and leadership for women in every community we work with.",
    items: [
      "Economic empowerment",
      "Leadership development",
      "Financial literacy",
      "Gender equality initiatives",
    ],
  },
  {
    title: "Reproductive health education",
    description:
      "Providing accurate, age-appropriate health education to young people and their communities.",
    items: [
      "Sexual and reproductive health awareness",
      "Menstrual hygiene education",
      "Adolescent health education",
      "Community sensitization programs",
    ],
  },
];

export default function Programs() {
  const [heading, setHeading] = useState(DEFAULT_HEADING);
  const [subheading, setSubheading] = useState(DEFAULT_SUBHEADING);
  const [programs, setPrograms] = useState<Program[]>(DEFAULT_PROGRAMS);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(CONTENT_DOC);
        if (snap.exists()) {
          const data = snap.data();
          setHeading(data.programsHeading || DEFAULT_HEADING);
          setSubheading(data.programsSubheading || DEFAULT_SUBHEADING);
          setPrograms(
            data.programs?.length > 0 ? data.programs : DEFAULT_PROGRAMS
          );
        }
      } catch {
        // Keep showing the defaults above.
      }
    }
    load();
  }, []);

  return (
    <section id="programs" className="bg-soft-gray px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold text-dark-gray sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-dark-gray/70">{subheading}</p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <div
              key={program.title}
              className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5"
            >
              <h3 className="font-heading text-xl font-semibold text-forest-green">
                {program.title}
              </h3>
              <p className="mt-3 text-sm text-dark-gray/80">
                {program.description}
              </p>
              <ul className="mt-4 space-y-1 text-sm text-dark-gray/70">
                {program.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <button className="mt-6 font-heading text-sm font-medium text-deep-blue transition hover:text-cta-orange">
                Read more →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

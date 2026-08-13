"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { AboutContent } from "@/types/content";

const CONTENT_DOC = doc(db, "site-content", "homepage");

const DEFAULT_ABOUT: AboutContent = {
  aboutHeading: "Protecting nature, empowering communities",
  aboutIntroParagraph1:
    "Terraviva is a registered non-governmental and non-profit organization based in Mwanza, Tanzania. Founded in December 2024 and officially registered in June 2025, we are dedicated to advancing environmental sustainability, climate resilience, and inclusive community development.",
  aboutIntroParagraph2:
    "Our work integrates climate change adaptation and mitigation, sustainable agriculture, environmental conservation, reproductive health education, and the empowerment of youth and women. We adopt community-led approaches informed by scientific evidence and indigenous knowledge to address pressing environmental and social challenges.",
  missionText:
    "To solve problems related to climate change, particularly its negative impacts, by conserving ecosystems, promoting sustainable and climate-smart agriculture, improving community health outcomes, and empowering youth and women as agents of inclusive and sustainable development.",
  visionText:
    "Resilient communities living in harmony with nature and enjoying sustainable and dignified livelihoods.",
  approachText:
    "Terraviva believes that sustainable change is strongest when communities are actively involved. We combine scientific evidence, indigenous knowledge, community participation, education, innovation, and partnerships to develop practical and scalable solutions.",
  whoWeServe: [
    "Smallholder farmers",
    "Youth and women-led groups",
    "School communities",
    "Vulnerable and climate-affected households",
    "Local leaders",
    "Community structures",
    "Environmental committees",
  ],
  whereWeWorkText:
    "Our current area of operation is the Mwanza Region, Tanzania, covering:",
  districts: [
    "Nyamagana",
    "Buchosa",
    "Ilemela",
    "Magu",
    "Sengerema",
    "Misungwi",
    "Ukerewe",
    "Kwimba",
  ],
  expansionText:
    "We also envision expanding our environmental conservation and community development work to other regions within the Lake Victoria Zone, including Kagera, Geita, and Shinyanga.",
  researchText:
    'Terraviva is committed to generating knowledge that supports sustainable environmental action. One proposed research area is "Moral Ecology and Human Flourishing: Investigating the Moral Foundations of Environmental Stewardship in Lake Victoria Communities." The research seeks to explore how moral values, cultural beliefs, indigenous knowledge systems, and community norms influence environmental stewardship practices among communities surrounding Lake Victoria.',
  partnershipsIntroText:
    "We work with organizations and community partners to strengthen collaboration and advance sustainable development.",
  partners: [
    {
      name: "Partners in Rural Integration and Development Organization (PRIDO)",
      location: "Sierra Leone",
    },
    {
      name: "Candle Shining Development Organization (CSD)",
      location: "Mwanza, Tanzania",
    },
    {
      name: "Ujamaa Federation Group",
      location: "Community-based organization, Mwanza",
    },
  ],
  collaborationText:
    "We welcome collaboration with development partners, donors, foundations, corporate organizations, researchers, community organizations, and individuals who share our commitment to environmental sustainability and inclusive community development.",
  joinUsText:
    "Together, we can protect nature, empower communities, strengthen resilience, and create a more sustainable future.",
};

export default function About() {
  const [content, setContent] = useState<AboutContent>(DEFAULT_ABOUT);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(CONTENT_DOC);
        if (snap.exists()) {
          const data = snap.data();
          setContent({
            aboutHeading: data.aboutHeading || DEFAULT_ABOUT.aboutHeading,
            aboutIntroParagraph1:
              data.aboutIntroParagraph1 || DEFAULT_ABOUT.aboutIntroParagraph1,
            aboutIntroParagraph2:
              data.aboutIntroParagraph2 || DEFAULT_ABOUT.aboutIntroParagraph2,
            missionText: data.missionText || DEFAULT_ABOUT.missionText,
            visionText: data.visionText || DEFAULT_ABOUT.visionText,
            approachText: data.approachText || DEFAULT_ABOUT.approachText,
            whoWeServe:
              data.whoWeServe?.length > 0
                ? data.whoWeServe
                : DEFAULT_ABOUT.whoWeServe,
            whereWeWorkText:
              data.whereWeWorkText || DEFAULT_ABOUT.whereWeWorkText,
            districts:
              data.districts?.length > 0
                ? data.districts
                : DEFAULT_ABOUT.districts,
            expansionText: data.expansionText || DEFAULT_ABOUT.expansionText,
            researchText: data.researchText || DEFAULT_ABOUT.researchText,
            partnershipsIntroText:
              data.partnershipsIntroText ||
              DEFAULT_ABOUT.partnershipsIntroText,
            partners:
              data.partners?.length > 0 ? data.partners : DEFAULT_ABOUT.partners,
            collaborationText:
              data.collaborationText || DEFAULT_ABOUT.collaborationText,
            joinUsText: data.joinUsText || DEFAULT_ABOUT.joinUsText,
          });
        }
      } catch {
        // Keep showing the defaults above.
      }
    }
    load();
  }, []);

  return (
    <section id="about" className="bg-white px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 flex items-center justify-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.3em] text-cta-orange">
            <span className="h-px w-8 bg-cta-orange" />
            About us
            <span className="h-px w-8 bg-cta-orange" />
          </p>
          <h2 className="font-heading text-3xl font-semibold text-dark-gray sm:text-4xl">
            {content.aboutHeading}
          </h2>
          <p className="mt-5 text-dark-gray/80">{content.aboutIntroParagraph1}</p>
          <p className="mt-4 text-dark-gray/80">{content.aboutIntroParagraph2}</p>
        </div>

        {/* Mission & Vision */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          <div className="rounded-2xl bg-soft-gray p-8">
            <h3 className="font-heading text-xl font-semibold text-forest-green">
              Our mission
            </h3>
            <p className="mt-3 text-sm text-dark-gray/80">{content.missionText}</p>
          </div>
          <div className="rounded-2xl bg-soft-gray p-8">
            <h3 className="font-heading text-xl font-semibold text-forest-green">
              Our vision
            </h3>
            <p className="mt-3 text-sm text-dark-gray/80">{content.visionText}</p>
          </div>
        </div>

        {/* Approach */}
        <div className="mt-14 rounded-2xl bg-forest-green px-8 py-10 text-white sm:px-12">
          <h3 className="font-heading text-xl font-semibold">Our approach</h3>
          <p className="mt-3 max-w-3xl text-sm text-white/90">
            {content.approachText}
          </p>
        </div>

        {/* Who we serve / Where we work */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
            <h3 className="font-heading text-xl font-semibold text-deep-blue">
              Who we serve
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-dark-gray/80 sm:grid-cols-2">
              {content.whoWeServe.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cta-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
            <h3 className="font-heading text-xl font-semibold text-deep-blue">
              Where we work
            </h3>
            <p className="mt-3 text-sm text-dark-gray/80">
              {content.whereWeWorkText}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {content.districts.map((district) => (
                <span
                  key={district}
                  className="rounded-full bg-soft-gray px-3 py-1 text-xs font-medium text-dark-gray/80"
                >
                  {district}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm text-dark-gray/80">
              {content.expansionText}
            </p>
          </div>
        </div>

        {/* Research */}
        <div className="mt-14 rounded-2xl bg-soft-gray p-8 sm:p-10">
          <h3 className="font-heading text-xl font-semibold text-forest-green">
            Research &amp; knowledge generation
          </h3>
          <p className="mt-3 text-sm text-dark-gray/80">{content.researchText}</p>
        </div>

        {/* Partnerships */}
        <div className="mt-14">
          <h3 className="text-center font-heading text-xl font-semibold text-dark-gray">
            Partnerships &amp; collaboration
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-dark-gray/80">
            {content.partnershipsIntroText}
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {content.partners.map((partner) => (
              <div
                key={partner.name}
                className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5"
              >
                <p className="font-heading text-sm font-semibold text-forest-green">
                  {partner.name}
                </p>
                <p className="mt-2 text-xs text-dark-gray/70">
                  {partner.location}
                </p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-dark-gray/80">
            {content.collaborationText}
          </p>
        </div>

        {/* Join us */}
        <div className="mt-16 text-center">
          <h3 className="font-heading text-2xl font-semibold text-dark-gray">
            Join us
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-dark-gray/80">
            {content.joinUsText}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/financial-support"
              className="rounded-md bg-cta-orange px-6 py-3 font-heading font-medium text-white transition hover:opacity-90"
            >
              Financial support
            </a>
            <a
              href="#contact"
              className="rounded-md border border-forest-green px-6 py-3 font-heading font-medium text-forest-green transition hover:bg-forest-green hover:text-white"
            >
              Become a partner
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

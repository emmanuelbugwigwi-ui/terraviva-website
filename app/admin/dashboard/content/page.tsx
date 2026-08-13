"use client";

import { useEffect, useState, type FormEvent } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { HomepageContent } from "@/types/content";

const CONTENT_DOC = doc(db, "site-content", "homepage");

const DEFAULT_CONTENT: HomepageContent = {
  heroHeadline: "Building climate-resilient communities for a sustainable future.",
  heroSubheadline:
    "Terraviva works with communities to promote environmental conservation, sustainable agriculture, reproductive health education and the empowerment of youth and women.",
  impactStats: [
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
  ],
  programsHeading: "Our programs",
  programsSubheading:
    "Six focus areas working together to build resilient, empowered communities.",
  programs: [
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
  ],
  contactAddress: "Dar es Salaam, Tanzania",
  contactPhone: "+255 000 000 000",
  contactEmail: "info@terraviva.org",
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
  updatedAt: Date.now(),
};

const inputClass =
  "mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue";
const labelClass = "block text-sm font-medium text-dark-gray";
const sectionHeadingClass = "mt-10 font-heading text-lg font-semibold text-dark-gray";

export default function ContentEditorPage() {
  const [content, setContent] = useState<HomepageContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        // TODO: once real Firebase keys are in .env.local, this loads the
        // actual saved content. With placeholder keys it fails quietly and
        // falls back to the defaults above — that's expected for now.
        const snap = await getDoc(CONTENT_DOC);
        if (snap.exists()) {
          setContent({ ...DEFAULT_CONTENT, ...(snap.data() as HomepageContent) });
        }
      } catch {
        // Placeholder Firebase keys — using defaults until real keys are added.
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      await setDoc(CONTENT_DOC, { ...content, updatedAt: Date.now() });
      setSaved(true);
    } catch {
      alert("Couldn't save — check that Firebase keys are set up in .env.local.");
    } finally {
      setSaving(false);
    }
  }

  function updateStat(index: number, field: "label" | "value", value: string) {
    setContent((prev) => {
      const next = [...prev.impactStats];
      next[index] = {
        ...next[index],
        [field]: field === "value" ? Number(value) || 0 : value,
      };
      return { ...prev, impactStats: next };
    });
  }

  // --- Helpers for the Programs section ---

  function updateProgram(
    index: number,
    field: "title" | "description",
    value: string
  ) {
    setContent((prev) => {
      const next = [...prev.programs];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, programs: next };
    });
  }

  function updateProgramItem(
    programIndex: number,
    itemIndex: number,
    value: string
  ) {
    setContent((prev) => {
      const nextPrograms = [...prev.programs];
      const nextItems = [...nextPrograms[programIndex].items];
      nextItems[itemIndex] = value;
      nextPrograms[programIndex] = {
        ...nextPrograms[programIndex],
        items: nextItems,
      };
      return { ...prev, programs: nextPrograms };
    });
  }

  function addProgramItem(programIndex: number) {
    setContent((prev) => {
      const nextPrograms = [...prev.programs];
      nextPrograms[programIndex] = {
        ...nextPrograms[programIndex],
        items: [...nextPrograms[programIndex].items, ""],
      };
      return { ...prev, programs: nextPrograms };
    });
  }

  function removeProgramItem(programIndex: number, itemIndex: number) {
    setContent((prev) => {
      const nextPrograms = [...prev.programs];
      nextPrograms[programIndex] = {
        ...nextPrograms[programIndex],
        items: nextPrograms[programIndex].items.filter(
          (_, i) => i !== itemIndex
        ),
      };
      return { ...prev, programs: nextPrograms };
    });
  }

  function addProgram() {
    setContent((prev) => ({
      ...prev,
      programs: [...prev.programs, { title: "", description: "", items: [] }],
    }));
  }

  function removeProgram(index: number) {
    setContent((prev) => ({
      ...prev,
      programs: prev.programs.filter((_, i) => i !== index),
    }));
  }

  // --- Generic helpers for the About section's list fields ---

  function updateListItem(
    field: "whoWeServe" | "districts",
    index: number,
    value: string
  ) {
    setContent((prev) => {
      const next = [...prev[field]];
      next[index] = value;
      return { ...prev, [field]: next };
    });
  }

  function addListItem(field: "whoWeServe" | "districts") {
    setContent((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  }

  function removeListItem(field: "whoWeServe" | "districts", index: number) {
    setContent((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  }

  function updatePartner(
    index: number,
    field: "name" | "location",
    value: string
  ) {
    setContent((prev) => {
      const next = [...prev.partners];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, partners: next };
    });
  }

  function addPartner() {
    setContent((prev) => ({
      ...prev,
      partners: [...prev.partners, { name: "", location: "" }],
    }));
  }

  function removePartner(index: number) {
    setContent((prev) => ({
      ...prev,
      partners: prev.partners.filter((_, i) => i !== index),
    }));
  }

  if (loading) {
    return <p className="text-sm text-dark-gray/60">Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <h1 className="font-heading text-2xl font-semibold text-dark-gray">
        Homepage content
      </h1>

      <label className="mt-6 block text-sm font-medium text-dark-gray">
        Hero headline
        <textarea
          value={content.heroHeadline}
          onChange={(e) => setContent({ ...content, heroHeadline: e.target.value })}
          rows={2}
          className={inputClass}
        />
      </label>

      <label className="mt-4 block text-sm font-medium text-dark-gray">
        Hero sub-headline
        <textarea
          value={content.heroSubheadline}
          onChange={(e) => setContent({ ...content, heroSubheadline: e.target.value })}
          rows={3}
          className={inputClass}
        />
      </label>

      <h2 className={sectionHeadingClass}>Impact stats</h2>
      <div className="mt-3 space-y-3">
        {content.impactStats.map((stat, i) => (
          <div key={i} className="flex gap-3">
            <input
              value={stat.label}
              onChange={(e) => updateStat(i, "label", e.target.value)}
              placeholder="Label"
              className="w-2/3 rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue"
            />
            <input
              type="number"
              value={stat.value}
              onChange={(e) => updateStat(i, "value", e.target.value)}
              placeholder="Value"
              className="w-1/3 rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue"
            />
          </div>
        ))}
      </div>

      {/* ─────────────── Programs ─────────────── */}
      <h2 className={sectionHeadingClass}>Programs</h2>
      <p className="mt-1 text-xs text-dark-gray/60">
        Shown in the &quot;Our programs&quot; section of the homepage.
      </p>

      <div className="mt-3 space-y-3">
        <label className={labelClass}>
          Section heading
          <input
            value={content.programsHeading}
            onChange={(e) =>
              setContent({ ...content, programsHeading: e.target.value })
            }
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Section subheading
          <textarea
            value={content.programsSubheading}
            onChange={(e) =>
              setContent({ ...content, programsSubheading: e.target.value })
            }
            rows={2}
            className={inputClass}
          />
        </label>
      </div>

      <div className="mt-4 space-y-5">
        {content.programs.map((program, pi) => (
          <div
            key={pi}
            className="space-y-3 rounded-md border border-black/10 p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-dark-gray">
                Program {pi + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeProgram(pi)}
                className="rounded-md border border-black/10 px-3 py-1 text-xs text-dark-gray/60 hover:bg-soft-gray"
              >
                Remove program
              </button>
            </div>

            <input
              value={program.title}
              onChange={(e) => updateProgram(pi, "title", e.target.value)}
              placeholder="Program title"
              className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue"
            />
            <textarea
              value={program.description}
              onChange={(e) =>
                updateProgram(pi, "description", e.target.value)
              }
              placeholder="Program description"
              rows={2}
              className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue"
            />

            <div>
              <p className="text-xs font-medium text-dark-gray/70">
                Focus areas
              </p>
              <div className="mt-2 space-y-2">
                {program.items.map((item, ii) => (
                  <div key={ii} className="flex gap-2">
                    <input
                      value={item}
                      onChange={(e) =>
                        updateProgramItem(pi, ii, e.target.value)
                      }
                      className="flex-1 rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue"
                    />
                    <button
                      type="button"
                      onClick={() => removeProgramItem(pi, ii)}
                      className="rounded-md border border-black/10 px-3 text-sm text-dark-gray/60 hover:bg-soft-gray"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addProgramItem(pi)}
                  className="text-sm font-medium text-deep-blue hover:underline"
                >
                  + Add focus area
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addProgram}
          className="text-sm font-medium text-deep-blue hover:underline"
        >
          + Add program
        </button>
      </div>

      {/* ─────────────── About us ─────────────── */}
      <h2 className={sectionHeadingClass}>About us</h2>
      <p className="mt-1 text-xs text-dark-gray/60">
        Shown in the &quot;About us&quot; section of the homepage.
      </p>

      <div className="mt-3 space-y-3">
        <label className={labelClass}>
          Section title
          <input
            value={content.aboutHeading}
            onChange={(e) =>
              setContent({ ...content, aboutHeading: e.target.value })
            }
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Intro paragraph 1
          <textarea
            value={content.aboutIntroParagraph1}
            onChange={(e) =>
              setContent({ ...content, aboutIntroParagraph1: e.target.value })
            }
            rows={3}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Intro paragraph 2
          <textarea
            value={content.aboutIntroParagraph2}
            onChange={(e) =>
              setContent({ ...content, aboutIntroParagraph2: e.target.value })
            }
            rows={3}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Our mission
          <textarea
            value={content.missionText}
            onChange={(e) => setContent({ ...content, missionText: e.target.value })}
            rows={3}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Our vision
          <textarea
            value={content.visionText}
            onChange={(e) => setContent({ ...content, visionText: e.target.value })}
            rows={2}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Our approach
          <textarea
            value={content.approachText}
            onChange={(e) => setContent({ ...content, approachText: e.target.value })}
            rows={3}
            className={inputClass}
          />
        </label>
      </div>

      {/* Who we serve */}
      <h3 className="mt-6 text-sm font-semibold text-dark-gray">Who we serve</h3>
      <div className="mt-2 space-y-2">
        {content.whoWeServe.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => updateListItem("whoWeServe", i, e.target.value)}
              className="flex-1 rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue"
            />
            <button
              type="button"
              onClick={() => removeListItem("whoWeServe", i)}
              className="rounded-md border border-black/10 px-3 text-sm text-dark-gray/60 hover:bg-soft-gray"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem("whoWeServe")}
          className="text-sm font-medium text-deep-blue hover:underline"
        >
          + Add item
        </button>
      </div>

      {/* Where we work */}
      <label className="mt-6 block text-sm font-medium text-dark-gray">
        Where we work — intro line
        <input
          value={content.whereWeWorkText}
          onChange={(e) =>
            setContent({ ...content, whereWeWorkText: e.target.value })
          }
          className={inputClass}
        />
      </label>

      <h3 className="mt-4 text-sm font-semibold text-dark-gray">Districts</h3>
      <div className="mt-2 space-y-2">
        {content.districts.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => updateListItem("districts", i, e.target.value)}
              className="flex-1 rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue"
            />
            <button
              type="button"
              onClick={() => removeListItem("districts", i)}
              className="rounded-md border border-black/10 px-3 text-sm text-dark-gray/60 hover:bg-soft-gray"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem("districts")}
          className="text-sm font-medium text-deep-blue hover:underline"
        >
          + Add district
        </button>
      </div>

      <label className="mt-4 block text-sm font-medium text-dark-gray">
        Expansion plans text
        <textarea
          value={content.expansionText}
          onChange={(e) => setContent({ ...content, expansionText: e.target.value })}
          rows={2}
          className={inputClass}
        />
      </label>

      <label className="mt-6 block text-sm font-medium text-dark-gray">
        Research &amp; knowledge generation
        <textarea
          value={content.researchText}
          onChange={(e) => setContent({ ...content, researchText: e.target.value })}
          rows={4}
          className={inputClass}
        />
      </label>

      {/* Partnerships */}
      <label className="mt-6 block text-sm font-medium text-dark-gray">
        Partnerships — intro line
        <input
          value={content.partnershipsIntroText}
          onChange={(e) =>
            setContent({ ...content, partnershipsIntroText: e.target.value })
          }
          className={inputClass}
        />
      </label>

      <h3 className="mt-4 text-sm font-semibold text-dark-gray">Partners</h3>
      <div className="mt-2 space-y-3">
        {content.partners.map((partner, i) => (
          <div key={i} className="space-y-2 rounded-md border border-black/10 p-3">
            <input
              value={partner.name}
              onChange={(e) => updatePartner(i, "name", e.target.value)}
              placeholder="Partner name"
              className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue"
            />
            <div className="flex gap-2">
              <input
                value={partner.location}
                onChange={(e) => updatePartner(i, "location", e.target.value)}
                placeholder="Location"
                className="flex-1 rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue"
              />
              <button
                type="button"
                onClick={() => removePartner(i)}
                className="rounded-md border border-black/10 px-3 text-sm text-dark-gray/60 hover:bg-soft-gray"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addPartner}
          className="text-sm font-medium text-deep-blue hover:underline"
        >
          + Add partner
        </button>
      </div>

      <label className="mt-6 block text-sm font-medium text-dark-gray">
        Collaboration invite text
        <textarea
          value={content.collaborationText}
          onChange={(e) =>
            setContent({ ...content, collaborationText: e.target.value })
          }
          rows={3}
          className={inputClass}
        />
      </label>

      <label className="mt-4 block text-sm font-medium text-dark-gray">
        &quot;Join us&quot; text
        <textarea
          value={content.joinUsText}
          onChange={(e) => setContent({ ...content, joinUsText: e.target.value })}
          rows={2}
          className={inputClass}
        />
      </label>

      {/* ─────────────── Contact info ─────────────── */}
      <h2 className={sectionHeadingClass}>Contact info</h2>
      <p className="mt-1 text-xs text-dark-gray/60">
        Shown in the footer at the bottom of the website.
      </p>
      <div className="mt-3 space-y-3">
        <label className="block text-sm font-medium text-dark-gray">
          Location
          <input
            value={content.contactAddress}
            onChange={(e) => setContent({ ...content, contactAddress: e.target.value })}
            placeholder="e.g. Dar es Salaam, Tanzania"
            className={inputClass}
          />
        </label>
        <label className="block text-sm font-medium text-dark-gray">
          Phone number
          <input
            value={content.contactPhone}
            onChange={(e) => setContent({ ...content, contactPhone: e.target.value })}
            placeholder="e.g. +255 000 000 000"
            className={inputClass}
          />
        </label>
        <label className="block text-sm font-medium text-dark-gray">
          Email
          <input
            type="email"
            value={content.contactEmail}
            onChange={(e) => setContent({ ...content, contactEmail: e.target.value })}
            placeholder="e.g. info@terraviva.org"
            className={inputClass}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="mt-8 rounded-md bg-cta-orange px-6 py-2 font-heading text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save changes"}
      </button>
      {saved && <p className="mt-3 text-sm text-forest-green">Saved.</p>}
    </form>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TIERS = [
  {
    amount: "$25",
    value: 25,
    title: "Support tree planting",
  },
  {
    amount: "$50",
    value: 50,
    title: "Support sustainable agriculture training",
  },
  {
    amount: "$100",
    value: 100,
    title: "Support women & youth empowerment",
  },
  {
    amount: "$250+",
    value: 250,
    title: "Support community conservation projects",
  },
];

export default function DonatePage() {
  const [selected, setSelected] = useState<number | "other" | null>(null);
  const [otherAmount, setOtherAmount] = useState("");

  const chosenAmount =
    selected === "other" ? otherAmount : selected != null ? String(selected) : "";

  return (
    <main>
      <Navbar />

      <section className="bg-soft-gray px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 flex items-center justify-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.3em] text-cta-orange">
            <span className="h-px w-8 bg-cta-orange" />
            Donate
            <span className="h-px w-8 bg-cta-orange" />
          </p>
          <h1 className="font-heading text-3xl font-semibold text-dark-gray sm:text-4xl">
            Support a Sustainable Future
          </h1>
          <p className="mt-5 text-dark-gray/80">
            Your donation helps Terraviva protect nature, support sustainable
            agriculture, empower women and youth and promote reproductive
            health education.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-10">
          <h2 className="font-heading text-lg font-semibold text-dark-gray">
            Choose your support
          </h2>

          <div className="mt-5 space-y-3">
            {TIERS.map((tier) => (
              <button
                key={tier.value}
                type="button"
                onClick={() => setSelected(tier.value)}
                className={`flex w-full items-center justify-between rounded-xl border px-5 py-4 text-left transition ${
                  selected === tier.value
                    ? "border-cta-orange bg-cta-orange/5 ring-2 ring-cta-orange"
                    : "border-black/10 hover:border-cta-orange/50"
                }`}
              >
                <span className="text-sm text-dark-gray">{tier.title}</span>
                <span className="font-heading text-lg font-semibold text-forest-green">
                  {tier.amount}
                </span>
              </button>
            ))}

            <button
              type="button"
              onClick={() => setSelected("other")}
              className={`flex w-full items-center justify-between rounded-xl border px-5 py-4 text-left transition ${
                selected === "other"
                  ? "border-cta-orange bg-cta-orange/5 ring-2 ring-cta-orange"
                  : "border-black/10 hover:border-cta-orange/50"
              }`}
            >
              <span className="text-sm text-dark-gray">
                Give what you can
              </span>
              <span className="font-heading text-lg font-semibold text-forest-green">
                Other amount
              </span>
            </button>

            {selected === "other" && (
              <div className="pl-1">
                <label className="block text-sm font-medium text-dark-gray">
                  Enter an amount (USD)
                  <input
                    type="number"
                    min={1}
                    value={otherAmount}
                    onChange={(e) => setOtherAmount(e.target.value)}
                    placeholder="e.g. 15"
                    className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue"
                  />
                </label>
              </div>
            )}
          </div>

          <button
            type="button"
            disabled={!chosenAmount}
            className="mt-8 w-full rounded-md bg-cta-orange px-6 py-3 font-heading font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {chosenAmount ? `Continue with $${chosenAmount}` : "Select an amount to continue"}
          </button>

          <p className="mt-4 text-center text-xs text-dark-gray/50">
            Payment processing isn&apos;t connected yet — this screen collects
            the chosen amount and is ready to hook up to a payment provider.
          </p>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-dark-gray/60">
          Prefer another way to help?{" "}
          <Link href="/#about" className="font-medium text-deep-blue hover:text-cta-orange">
            Learn about becoming a partner
          </Link>
          .
        </p>
      </section>

      <Footer />
    </main>
  );
}

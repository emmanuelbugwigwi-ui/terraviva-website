"use client";

import { useEffect, useState, type FormEvent } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const CONTENT_DOC = doc(db, "site-content", "homepage");

const DEFAULT_CONTACT = {
  contactAddress: "Dar es Salaam, Tanzania",
  contactPhone: "+255 000 000 000",
  contactEmail: "info@terraviva.org",
};

const quickLinks = [
  "About us",
  "Programs",
  "Projects",
  "Impact",
  "Volunteer",
  "Careers",
  "Donate",
  "Contact us",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [contact, setContact] = useState(DEFAULT_CONTACT);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(CONTENT_DOC);
        if (snap.exists()) {
          const data = snap.data();
          setContact({
            contactAddress: data.contactAddress || DEFAULT_CONTACT.contactAddress,
            contactPhone: data.contactPhone || DEFAULT_CONTACT.contactPhone,
            contactEmail: data.contactEmail || DEFAULT_CONTACT.contactEmail,
          });
        }
      } catch {
        // Keep showing the defaults above.
      }
    }
    load();
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email) setSubscribed(true);
  }

  return (
    <footer id="contact" className="bg-dark-gray px-6 py-16 text-white sm:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-lg font-semibold">Terraviva</p>
          <p className="mt-3 text-sm text-white/70">
            Empowering communities. Protecting the environment. Building a
            sustainable future.
          </p>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-white/60">
            Quick links
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {quickLinks.map((link) => (
              <li key={link}>
                <a href="#" className="transition hover:text-cta-orange">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-white/60">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>{contact.contactAddress}</li>
            <li>{contact.contactPhone}</li>
            <li>{contact.contactEmail}</li>
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-white/60">
            Newsletter
          </p>
          {subscribed ? (
            <p className="mt-4 text-sm text-light-green">
              Thanks — you&apos;re subscribed.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full rounded-md bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cta-orange"
              />
              <button
                type="submit"
                className="rounded-md bg-cta-orange px-4 py-2 text-sm font-medium transition hover:opacity-90"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
        <p>© {new Date().getFullYear()} Terraviva. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="transition hover:text-white">
            Privacy policy
          </a>
          <a href="#" className="transition hover:text-white">
            Terms &amp; conditions
          </a>
        </div>
      </div>
    </footer>
  );
}

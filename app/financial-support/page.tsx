import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FinancialSupportPage() {
  return (
    <main>
      <Navbar />

      <section className="bg-soft-gray px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 flex items-center justify-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.3em] text-cta-orange">
            <span className="h-px w-8 bg-cta-orange" />
            Financial support
            <span className="h-px w-8 bg-cta-orange" />
          </p>
          <h1 className="font-heading text-3xl font-semibold text-dark-gray sm:text-4xl">
            Support Terraviva Through Bank Transfer
          </h1>
          <p className="mt-5 text-dark-gray/80">
            Your financial support helps Terraviva advance environmental
            conservation, sustainable agriculture, youth and women
            empowerment and reproductive health education.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-10">
          <h2 className="font-heading text-lg font-semibold text-dark-gray">
            Bank details
          </h2>

          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-black/10 px-5 py-4">
              <span className="text-sm text-dark-gray/70">Bank</span>
              <span className="font-heading text-sm font-semibold text-forest-green">
                CRDB Bank
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-black/10 px-5 py-4">
              <span className="text-sm text-dark-gray/70">Account name</span>
              <span className="font-heading text-sm font-semibold text-forest-green">
                TERRAVIVA
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-soft-gray p-5">
              <p className="font-heading text-xs font-semibold uppercase tracking-wide text-dark-gray/60">
                TZS account
              </p>
              <p className="mt-2 text-sm text-dark-gray/70">Account number</p>
              <p className="mt-1 font-heading text-lg font-semibold text-dark-gray">
                10322685567
              </p>
            </div>
            <div className="rounded-xl bg-soft-gray p-5">
              <p className="font-heading text-xs font-semibold uppercase tracking-wide text-dark-gray/60">
                USD account
              </p>
              <p className="mt-2 text-sm text-dark-gray/70">Account number</p>
              <p className="mt-1 font-heading text-lg font-semibold text-dark-gray">
                10322385566
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-cta-orange/30 bg-cta-orange/5 p-5 text-sm text-dark-gray/80">
            <p className="font-heading text-sm font-semibold text-dark-gray">
              For international transfers
            </p>
            <p className="mt-2">
              Contact us for SWIFT/BIC and additional bank details.
            </p>
            <p className="mt-2">
              Email:{" "}
              <a
                href="mailto:terraviva.org.est2024@gmail.com"
                className="font-medium text-deep-blue hover:text-cta-orange"
              >
                terraviva.org.est2024@gmail.com
              </a>
            </p>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-dark-gray/60">
          Prefer another way to help?{" "}
          <Link
            href="/#about"
            className="font-medium text-deep-blue hover:text-cta-orange"
          >
            Learn about becoming a partner
          </Link>
          .
        </p>
      </section>

      <Footer />
    </main>
  );
}

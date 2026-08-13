import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsAndConditionsPage() {
  return (
    <main>
      <Navbar />

      <section className="bg-soft-gray px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 flex items-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.3em] text-cta-orange">
            <span className="h-px w-8 bg-cta-orange" />
            Legal
          </p>
          <h1 className="font-heading text-3xl font-semibold text-dark-gray sm:text-4xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-sm text-dark-gray/60">
            Last updated: {new Date().getFullYear()}
          </p>

          <div className="mt-10 space-y-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-10">
            <div>
              <h2 className="font-heading text-lg font-semibold text-forest-green">
                1. Acceptance of terms
              </h2>
              <p className="mt-2 text-sm text-dark-gray/80">
                By using this website, you agree to these Terms &amp;
                Conditions. If you do not agree, please do not use the
                site.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-forest-green">
                2. Use of this website
              </h2>
              <p className="mt-2 text-sm text-dark-gray/80">
                This website provides information about Terraviva, our
                programs, and ways to support our work. You agree to use
                the site only for lawful purposes and not to misuse or
                attempt to disrupt it.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-forest-green">
                3. Donations and financial support
              </h2>
              <p className="mt-2 text-sm text-dark-gray/80">
                Donations made through this website or via bank transfer
                are voluntary contributions to Terraviva&apos;s programs.
                Please ensure your payment details are accurate; we are not
                responsible for funds sent to incorrect accounts.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-forest-green">
                4. Intellectual property
              </h2>
              <p className="mt-2 text-sm text-dark-gray/80">
                All content on this website, including text, images, and
                logos, belongs to Terraviva or its partners and may not be
                used without permission.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-forest-green">
                5. Limitation of liability
              </h2>
              <p className="mt-2 text-sm text-dark-gray/80">
                We make reasonable efforts to keep information on this site
                accurate and up to date, but we make no guarantees. We are
                not liable for any loss or damage arising from your use of
                this website.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-forest-green">
                6. Changes to these terms
              </h2>
              <p className="mt-2 text-sm text-dark-gray/80">
                We may update these Terms &amp; Conditions from time to
                time. Continued use of the website after changes means you
                accept the updated terms.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-forest-green">
                7. Contact us
              </h2>
              <p className="mt-2 text-sm text-dark-gray/80">
                Questions about these terms can be sent to{" "}
                <a
                  href="mailto:terraviva.org.est2024@gmail.com"
                  className="font-medium text-deep-blue hover:text-cta-orange"
                >
                  terraviva.org.est2024@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-dark-gray/60">
            Last updated: {new Date().getFullYear()}
          </p>

          <div className="mt-10 space-y-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-10">
            <div>
              <h2 className="font-heading text-lg font-semibold text-forest-green">
                1. Introduction
              </h2>
              <p className="mt-2 text-sm text-dark-gray/80">
                Terraviva (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy.
                This policy explains what information we collect through
                this website, how we use it, and the choices you have.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-forest-green">
                2. Information we collect
              </h2>
              <p className="mt-2 text-sm text-dark-gray/80">
                We may collect information you provide directly, such as
                your name and email address when you subscribe to our
                newsletter, contact us, or make a donation. We may also
                collect basic technical information, such as browser type
                and pages visited, to help us improve the site.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-forest-green">
                3. How we use your information
              </h2>
              <p className="mt-2 text-sm text-dark-gray/80">
                We use the information we collect to respond to your
                inquiries, send updates about our programs (if you
                subscribed), process donations, and improve our website and
                services. We do not sell your personal information.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-forest-green">
                4. Sharing of information
              </h2>
              <p className="mt-2 text-sm text-dark-gray/80">
                We do not share your personal information with third
                parties, except where required by law or where necessary to
                operate the website (for example, our hosting or payment
                providers).
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-forest-green">
                5. Your choices
              </h2>
              <p className="mt-2 text-sm text-dark-gray/80">
                You can unsubscribe from our newsletter at any time using
                the link in our emails, or by contacting us directly. You
                may also request that we delete personal information we
                hold about you.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-lg font-semibold text-forest-green">
                6. Contact us
              </h2>
              <p className="mt-2 text-sm text-dark-gray/80">
                If you have questions about this Privacy Policy, please
                contact us at{" "}
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

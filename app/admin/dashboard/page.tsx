import Link from "next/link";

const sections = [
  {
    title: "Homepage content",
    description: "Edit the hero headline, sub-headline, and impact numbers.",
    href: "/admin/dashboard/content",
  },
  {
    title: "Media library",
    description: "Upload and manage images, video, audio, and documents.",
    href: "/admin/dashboard/media",
  },
];

export default function DashboardHome() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-dark-gray">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-dark-gray/70">
        Choose what you&apos;d like to update.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:ring-2 hover:ring-deep-blue"
          >
            <h2 className="font-heading text-lg font-semibold text-forest-green">
              {section.title}
            </h2>
            <p className="mt-2 text-sm text-dark-gray/70">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const navItems = [
  { label: "Overview", href: "/admin/dashboard" },
  { label: "Homepage content", href: "/admin/dashboard/content" },
  { label: "Projects", href: "/admin/dashboard/projects" },
  { label: "Media library", href: "/admin/dashboard/media" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-soft-gray">
        <p className="text-sm text-dark-gray/60">Loading...</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-soft-gray">
      <header className="flex flex-wrap items-center justify-between gap-4 bg-forest-green px-6 py-4 text-white">
        <p className="font-heading font-semibold">Terraviva admin</p>
        <nav className="flex flex-wrap items-center gap-6 text-sm">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-cta-orange">
              {item.label}
            </a>
          ))}
          <button
            onClick={() => logout()}
            className="rounded-md bg-white/10 px-3 py-1.5 transition hover:bg-white/20"
          >
            Sign out
          </button>
        </nav>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
    </div>
  );
}

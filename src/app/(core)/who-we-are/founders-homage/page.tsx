import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FoundersHomageSection from "@/components/who-we-are/FoundersHomageSection";
import { FOUNDERS_HOMAGE_DATA } from "@/data/foundersHomageData";

export const metadata: Metadata = {
  title: FOUNDERS_HOMAGE_DATA.seo.title,
  description: FOUNDERS_HOMAGE_DATA.seo.description,
  alternates: {
    canonical: "/who-we-are/founders-homage",
  },
};

export default function FoundersHomagePage() {
  const { breadcrumbs, hero } = FOUNDERS_HOMAGE_DATA;

  return (
    <main className="w-full bg-sand-100 text-pingaksh-navy">
      {/* Compact Navy Header */}
      <header className="bg-pingaksh-navy text-white pt-36 pb-16 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center flex-wrap gap-2 text-xs text-sand-200/75">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <li key={crumb.href} className="flex items-center gap-2">
                    {isLast ? (
                      <span
                        aria-current="page"
                        className="text-pingaksh-sand font-semibold"
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <>
                        <Link
                          href={crumb.href}
                          className="hover:text-white transition-colors"
                        >
                          {crumb.label}
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <span className="font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-sand font-bold block">
            {hero.eyebrow}
          </span>
          <h1 className="font-logo text-4xl sm:text-6xl text-white mt-2">
            {hero.title}
          </h1>
          <p className="text-sm sm:text-base text-sand-100/85 mt-3 max-w-2xl">
            {hero.subtitle}
          </p>
        </div>
      </header>

      {/* Main Homage & Torchbearer Section */}
      <FoundersHomageSection data={FOUNDERS_HOMAGE_DATA} />
    </main>
  );
}

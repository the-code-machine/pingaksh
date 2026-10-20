// src/app/(core)/who-we-are/leadership/page.tsx

import React from "react";
import type { Metadata } from "next";
import LeadershipDirectoryView from "@/components/who-we-are/LeadershipDirectoryView";
import { LEADERSHIP_DATA } from "@/data/leadershipData";

export const metadata: Metadata = {
  title: LEADERSHIP_DATA.seo.title,
  description: LEADERSHIP_DATA.seo.description,
  alternates: {
    canonical: LEADERSHIP_DATA.seo.canonicalUrl,
  },
  openGraph: {
    title: LEADERSHIP_DATA.seo.title,
    description: LEADERSHIP_DATA.seo.description,
    url: LEADERSHIP_DATA.seo.canonicalUrl,
    siteName: "Pingaksh Renewables",
    type: "website",
  },
};

export default function LeadershipPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: LEADERSHIP_DATA.breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: crumb.label,
          item: `https://pingaksh.com${crumb.href}`,
        })),
      },
      {
        "@type": "ItemList",
        name: "Board of Directors — Pingaksh Renewables",
        itemListElement: LEADERSHIP_DATA.directors.map((director, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "Person",
            name: director.name,
            jobTitle: director.designation,
            url: `https://pingaksh.com/who-we-are/board-of-directors/${director.slug}`,
            image: director.portraitImage,
            alumniOf: director.almaMater,
            worksFor: {
              "@type": "Corporation",
              name: "Pingaksh Renewables",
            },
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LeadershipDirectoryView />
    </>
  );
}

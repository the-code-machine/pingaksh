// src/app/(core)/who-we-are/subsidiary-leadership/page.tsx

import React from "react";
import type { Metadata } from "next";
import SubsidiaryLeadershipView from "@/components/who-we-are/SubsidiaryLeadershipView";
import { SUBSIDIARY_LEADERSHIP_DATA } from "@/data/subsidiaryLeadershipData";

export const metadata: Metadata = {
  title: SUBSIDIARY_LEADERSHIP_DATA.seo.title,
  description: SUBSIDIARY_LEADERSHIP_DATA.seo.description,
  alternates: {
    canonical: SUBSIDIARY_LEADERSHIP_DATA.seo.canonicalUrl,
  },
  openGraph: {
    title: SUBSIDIARY_LEADERSHIP_DATA.seo.title,
    description: SUBSIDIARY_LEADERSHIP_DATA.seo.description,
    url: SUBSIDIARY_LEADERSHIP_DATA.seo.canonicalUrl,
    siteName: "Pingaksh Renewables",
    type: "website",
  },
};

export default function SubsidiaryLeadershipPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: SUBSIDIARY_LEADERSHIP_DATA.breadcrumbs.map(
          (crumb, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: crumb.label,
            item: `https://pingaksh.com${crumb.href}`,
          }),
        ),
      },
      {
        "@type": "ItemList",
        name: "Subsidiary & Operating Leadership — Pingaksh Renewables",
        itemListElement: SUBSIDIARY_LEADERSHIP_DATA.leaders.map(
          (leader, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            item: {
              "@type": "Person",
              name: leader.name,
              jobTitle: leader.designation,
              url: `https://pingaksh.com/who-we-are/subsidiary-leadership/${leader.slug}`,
              image: leader.portraitImage,
              alumniOf: leader.almaMater,
              worksFor: {
                "@type": "Organization",
                name: leader.subsidiaryName,
              },
            },
          }),
        ),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubsidiaryLeadershipView />
    </>
  );
}

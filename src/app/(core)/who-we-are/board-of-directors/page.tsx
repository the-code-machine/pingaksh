// src/app/(core)/who-we-are/leadership/page.tsx

import React from "react";
import type { Metadata } from "next";
import LeadershipDirectoryView from "@/components/who-we-are/LeadershipDirectoryView";
import { DirectorProfile, LEADERSHIP_DATA } from "@/data/leadershipData";

const API_URL =
  "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/api/directors.php";
async function getDirectors() {
  "use cache";

  const response = await fetch(API_URL, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Directors API failed: ${response.status}`);
  }

  const result = await response.json();

  if (!result.success || !Array.isArray(result.data)) {
    throw new Error(result.message || "Invalid directors API response");
  }

  const MEDIA_BASE_URL = "https://aliceblue-yak-580540.hostingersite.com";

  return result.data.map((director: any) => ({
    ...director,

    // Convert DB snake_case → frontend camelCase
    isFounder: Boolean(director.is_founder),
    boardCategory: director.board_category,
    dinNumber: director.din_number,
    appointedSince: director.appointed_since,
    almaMater: director.alma_mater,
    portraitAlt: director.portrait_alt,
    shortSummary: director.short_summary,
    executiveQuote: director.executive_quote,

    biographyParagraphs: director.biography_paragraphs ?? [],
    keyResponsibilities: director.key_responsibilities ?? [],
    committees: director.committees ?? [],
    directorshipsAndAffiliations: director.directorships_and_affiliations ?? [],

    // Add Hostinger domain to image path
    portraitImage: director.portrait_image
      ? director.portrait_image.startsWith("http")
        ? director.portrait_image
        : `${MEDIA_BASE_URL}${director.portrait_image.startsWith("/") ? "" : "/"}${director.portrait_image}`
      : "",
  }));
}

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

export default async function LeadershipPage() {
  const directors = await getDirectors();

  const leadershipData = {
    ...LEADERSHIP_DATA,
    directors,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: leadershipData.breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: crumb.label,
          item: `https://pingaksh.com${crumb.href}`,
        })),
      },
      {
        "@type": "ItemList",
        name: "Board of Directors — Pingaksh Renewables",
        itemListElement: leadershipData.directors.map(
          (director: DirectorProfile, idx: number) => ({
            "@type": "ListItem",
            position: idx + 1,
            item: {
              "@type": "Person",
              name: director.name,
              jobTitle: director.designation,
              url: `https://pingaksh.com/who-we-are/board-of-directors/${director.slug}`,
              image: director.portraitImage || undefined,
              alumniOf: director.almaMater,
              worksFor: {
                "@type": "Corporation",
                name: "Pingaksh Renewables",
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <LeadershipDirectoryView LEADERSHIP_DATA={leadershipData} />
    </>
  );
}

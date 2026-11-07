// src/app/(core)/who-we-are/leadership/[slug]/page.tsx

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DirectorProfileView from "@/components/who-we-are/DirectorProfileView";
import {
  LEADERSHIP_DATA,
  getDirectorBySlug,
  type DirectorProfile,
} from "@/data/leadershipData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* ============================================================================
 * COMMENTED OUT: Hostinger Dynamic API Fetch (Reverted to Static Data)
 * ============================================================================
async function getDirectors() {
  "use cache";

  const API_URL =
    "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/api/directors.php";
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

async function getDirectorBySlugFromApi(slug: string) {
  const directors = await getDirectors();

  return directors.find((director: { slug: string }) => director.slug === slug);
}
============================================================================ */

export async function generateStaticParams() {
  // const directors = await getDirectors();
  const directors = LEADERSHIP_DATA.directors;

  return directors.map((director: DirectorProfile) => ({
    slug: director.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  // const director = await getDirectorBySlugFromApi(slug);
  const director = getDirectorBySlug(slug);

  if (!director) {
    return {
      title: "Director Not Found | Pingaksh Renewables",
    };
  }

  const canonicalUrl = `https://pingaksh.com/who-we-are/leadership/${director.slug}`;

  return {
    title: `${director.name} — ${director.designation} | Pingaksh Renewables`,
    description: director.shortSummary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${director.name} — ${director.designation}`,
      description: director.shortSummary,
      url: canonicalUrl,
      siteName: "Pingaksh Renewables",
      type: "profile",
      ...(director.portraitImage
        ? {
            images: [
              {
                url: director.portraitImage,
                width: 900,
                height: 1100,
                alt: director.portraitAlt || director.name,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function DirectorDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Commented out API calls:
  // const directors = await getDirectors();
  // const director = directors.find(
  //   (item: { slug: string }) => item.slug === slug,
  // );

  // Using static LEADERSHIP_DATA:
  const director = getDirectorBySlug(slug);

  if (!director) {
    notFound();
  }

  const canonicalUrl = `https://pingaksh.com/who-we-are/leadership/${director.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://pingaksh.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Who We Are",
            item: "https://pingaksh.com/who-we-are",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Board of Directors",
            item: "https://pingaksh.com/who-we-are/leadership",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: director.name,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "ProfilePage",
        url: canonicalUrl,
        mainEntity: {
          "@type": "Person",
          name: director.name,
          jobTitle: director.designation,
          description: director.shortSummary,
          ...(director.portraitImage
            ? {
                image: director.portraitImage,
              }
            : {}),
          ...(director.almaMater
            ? {
                alumniOf: {
                  "@type": "CollegeOrUniversity",
                  name: director.almaMater,
                },
              }
            : {}),
          worksFor: {
            "@type": "Corporation",
            name: "Pingaksh Renewables Limited",
            url: "https://pingaksh.com",
          },
        },
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

      <DirectorProfileView director={director} />
    </>
  );
}

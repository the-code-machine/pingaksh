// src/app/(core)/who-we-are/leadership/[slug]/page.tsx

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DirectorProfileView from "@/components/who-we-are/DirectorProfileView";
import { LEADERSHIP_DATA, getDirectorBySlug } from "@/data/leadershipData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LEADERSHIP_DATA.directors.map((director) => ({
    slug: director.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const director = getDirectorBySlug(slug);

  if (!director) {
    return {
      title: "Director Not Found | Pingaksh Renewables",
    };
  }

  const canonicalUrl = `https://pingaksh.com/who-we-are/board-of-directors/${director.slug}`;

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
      images: [
        {
          url: director.portraitImage,
          width: 900,
          height: 1100,
          alt: director.portraitAlt,
        },
      ],
    },
  };
}

export default async function DirectorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const director = getDirectorBySlug(slug);

  if (!director) {
    notFound();
  }

  const canonicalUrl = `https://pingaksh.com/who-we-are/board-of-directors/${director.slug}`;

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
            item: "https://pingaksh.com/who-we-are/board-of-directors",
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
          image: director.portraitImage,
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: director.almaMater,
          },
          worksFor: {
            "@type": "Corporation",
            name: "Pingaksh Renewables (Pingaksh Group)",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DirectorProfileView director={director} />
    </>
  );
}

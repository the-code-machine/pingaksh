// src/app/(core)/who-we-are/subsidiary-leadership/[slug]/page.tsx

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubsidiaryLeaderProfileView from "@/components/who-we-are/SubsidiaryLeaderProfileView";
import {
  SUBSIDIARY_LEADERSHIP_DATA,
  getSubsidiaryLeaderBySlug,
} from "@/data/subsidiaryLeadershipData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SUBSIDIARY_LEADERSHIP_DATA.leaders.map((leader) => ({
    slug: leader.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const leader = getSubsidiaryLeaderBySlug(slug);

  if (!leader) {
    return {
      title: "Executive Profile Not Found | Pingaksh Renewables",
    };
  }

  const canonicalUrl = `https://pingaksh.com/who-we-are/subsidiary-leadership/${leader.slug}`;

  return {
    title: `${leader.name} — ${leader.designation} | Pingaksh Renewables`,
    description: leader.shortSummary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${leader.name} — ${leader.designation}`,
      description: leader.shortSummary,
      url: canonicalUrl,
      siteName: "Pingaksh Renewables",
      type: "profile",
      images: [
        {
          url: leader.portraitImage,
          width: 900,
          height: 1100,
          alt: leader.portraitAlt,
        },
      ],
    },
  };
}

export default async function SubsidiaryLeaderDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const leader = getSubsidiaryLeaderBySlug(slug);

  if (!leader) {
    notFound();
  }

  const canonicalUrl = `https://pingaksh.com/who-we-are/subsidiary-leadership/${leader.slug}`;

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
            name: "Subsidiary Leadership",
            item: "https://pingaksh.com/who-we-are/subsidiary-leadership",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: leader.name,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "ProfilePage",
        url: canonicalUrl,
        mainEntity: {
          "@type": "Person",
          name: leader.name,
          jobTitle: leader.designation,
          description: leader.shortSummary,
          image: leader.portraitImage,
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: leader.almaMater,
          },
          worksFor: {
            "@type": "Organization",
            name: leader.subsidiaryName,
            parentOrganization: {
              "@type": "Corporation",
              name: "Pingaksh Renewables (Pingaksh Group)",
              url: "https://pingaksh.com",
            },
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
      <SubsidiaryLeaderProfileView leader={leader} />
    </>
  );
}

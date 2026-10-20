// src/app/(core)/who-we-are/vision-mission/page.tsx

import React from "react";
import type { Metadata } from "next";
import VisionMissionView from "@/components/who-we-are/VisionMissionView";
import { VISION_MISSION_DATA } from "@/data/visionMissionData";

export const metadata: Metadata = {
  title: VISION_MISSION_DATA.seo.title,
  description: VISION_MISSION_DATA.seo.description,
  keywords: VISION_MISSION_DATA.seo.keywords,
  alternates: {
    canonical: VISION_MISSION_DATA.seo.canonicalUrl,
  },
  openGraph: {
    title: VISION_MISSION_DATA.seo.title,
    description: VISION_MISSION_DATA.seo.description,
    url: VISION_MISSION_DATA.seo.canonicalUrl,
    siteName: "Pingaksh Renewables",
    type: "website",
    images: [
      {
        url: VISION_MISSION_DATA.seo.ogImage,
        width: 1200,
        height: 630,
        alt: "Pingaksh Renewables Vision, Mission and Core Ethos",
      },
    ],
  },
};

export default function VisionMissionPage() {
  // Structured Data: BreadcrumbList + AboutPage + Corporation Vision/Mission Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: VISION_MISSION_DATA.breadcrumbs.map(
          (crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.label,
            item: `https://pingaksh.com${crumb.href}`,
          }),
        ),
      },
      {
        "@type": "AboutPage",
        "@id": `${VISION_MISSION_DATA.seo.canonicalUrl}#webpage`,
        url: VISION_MISSION_DATA.seo.canonicalUrl,
        name: VISION_MISSION_DATA.seo.title,
        description: VISION_MISSION_DATA.seo.description,
        isPartOf: {
          "@id": "https://pingaksh.com/#website",
        },
        mainEntity: {
          "@type": "Corporation",
          name: "Pingaksh Renewables (Pingaksh Group)",
          alternateName: "Uttar Bharat Hydro Power (UBHP)",
          url: "https://pingaksh.com",
          slogan: "Clean Energy | Sustainable Tomorrow",
          knowsAbout: [
            "Run-of-the-River Hydroelectric Power",
            "Grain-Based Bio-Ethanol Production",
            "DDGS Livestock Nutrition",
            "Zero Liquid Discharge Bio-Refineries",
            "Sustainable Napier Grass Biomass",
          ],
          founders: [
            {
              "@type": "Person",
              name: "Mr. Naresh Goel",
              jobTitle: "Founder & Promoter",
            },
          ],
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
      <VisionMissionView />
    </>
  );
}

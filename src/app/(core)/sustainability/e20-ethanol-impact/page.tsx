// src/app/(core)/sustainability/e20-ethanol-impact/page.tsx

import React from "react";
import type { Metadata } from "next";
import E20EthanolImpactView from "@/components/sustainability/E20EthanolImpactView";
import { E20_ETHANOL_IMPACT_DATA } from "@/data/e20EthanolImpactData";

export const metadata: Metadata = {
  title: E20_ETHANOL_IMPACT_DATA.seo.title,
  description: E20_ETHANOL_IMPACT_DATA.seo.description,
  keywords: E20_ETHANOL_IMPACT_DATA.seo.keywords,
  alternates: {
    canonical: E20_ETHANOL_IMPACT_DATA.seo.canonicalUrl,
  },
  openGraph: {
    title: E20_ETHANOL_IMPACT_DATA.seo.title,
    description: E20_ETHANOL_IMPACT_DATA.seo.description,
    url: E20_ETHANOL_IMPACT_DATA.seo.canonicalUrl,
    siteName: "Pingaksh Renewables",
    type: "website",
  },
};

export default function E20EthanolImpactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: E20_ETHANOL_IMPACT_DATA.breadcrumbs.map(
          (crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.label,
            item: `https://pingaksh.com${crumb.href}`,
          }),
        ),
      },
      {
        "@type": "Dataset",
        name: E20_ETHANOL_IMPACT_DATA.seo.title,
        description: E20_ETHANOL_IMPACT_DATA.seo.description,
        url: E20_ETHANOL_IMPACT_DATA.seo.canonicalUrl,
        creator: {
          "@type": "Corporation",
          name: "Pingaksh Renewables (Pingaksh Bio-Energy & Green Fuels Ltd.)",
          url: "https://pingaksh.com",
        },
        variableMeasured: [
          "E20 Ethanol vs Pure Petrol Net Lifecycle CO2 Savings (1.65 kg CO2/Liter)",
          "Tailpipe Carbon Monoxide (CO) Reduction (-50% to -55% in 2-Wheelers)",
          "Tailpipe Unburned Hydrocarbon (HC) Reduction (-20%)",
          "Crude Oil Import Substitution per Kiloliter Distilled",
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <E20EthanolImpactView />
    </>
  );
}

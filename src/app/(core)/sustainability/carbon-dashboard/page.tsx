// src/app/(core)/sustainability/carbon-dashboard/page.tsx

import React from "react";
import type { Metadata } from "next";
import CarbonDashboardView from "@/components/sustainability/CarbonDashboardView";
import { CARBON_DASHBOARD_DATA } from "@/data/carbonDashboardData";

export const metadata: Metadata = {
  title: CARBON_DASHBOARD_DATA.seo.title,
  description: CARBON_DASHBOARD_DATA.seo.description,
  keywords: CARBON_DASHBOARD_DATA.seo.keywords,
  alternates: {
    canonical: CARBON_DASHBOARD_DATA.seo.canonicalUrl,
  },
  openGraph: {
    title: CARBON_DASHBOARD_DATA.seo.title,
    description: CARBON_DASHBOARD_DATA.seo.description,
    url: CARBON_DASHBOARD_DATA.seo.canonicalUrl,
    siteName: "Pingaksh Renewables",
    type: "website",
  },
};

export default function CarbonDashboardPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: CARBON_DASHBOARD_DATA.breadcrumbs.map(
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
        name: CARBON_DASHBOARD_DATA.seo.title,
        description: CARBON_DASHBOARD_DATA.seo.description,
        url: CARBON_DASHBOARD_DATA.seo.canonicalUrl,
        creator: {
          "@type": "Corporation",
          name: "Pingaksh Renewables (Pingaksh Group)",
          url: "https://pingaksh.com",
        },
        variableMeasured: [
          "Cumulative CO2 Displaced (Metric Tonnes)",
          "Run-of-the-River Hydroelectric Generation vs Thermal Coal Baseline (0.82 kg CO2/kWh)",
          "Grain-Based E20 Bio-Ethanol vs Pure Fossil Petrol Baseline (1.65 kg CO2/Liter)",
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
      <CarbonDashboardView />
    </>
  );
}

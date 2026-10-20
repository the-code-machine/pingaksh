// src/app/(core)/sustainability/zero-liquid-discharge/page.tsx

import React from "react";
import type { Metadata } from "next";
import ZeroLiquidDischargeView from "@/components/sustainability/ZeroLiquidDischargeView";
import { ZERO_LIQUID_DISCHARGE_DATA } from "@/data/zeroLiquidDischargeData";

export const metadata: Metadata = {
  title: ZERO_LIQUID_DISCHARGE_DATA.seo.title,
  description: ZERO_LIQUID_DISCHARGE_DATA.seo.description,
  keywords: ZERO_LIQUID_DISCHARGE_DATA.seo.keywords,
  alternates: {
    canonical: ZERO_LIQUID_DISCHARGE_DATA.seo.canonicalUrl,
  },
  openGraph: {
    title: ZERO_LIQUID_DISCHARGE_DATA.seo.title,
    description: ZERO_LIQUID_DISCHARGE_DATA.seo.description,
    url: ZERO_LIQUID_DISCHARGE_DATA.seo.canonicalUrl,
    siteName: "Pingaksh Renewables",
    type: "website",
  },
};

export default function ZeroLiquidDischargePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: ZERO_LIQUID_DISCHARGE_DATA.breadcrumbs.map(
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
        name: ZERO_LIQUID_DISCHARGE_DATA.seo.title,
        description: ZERO_LIQUID_DISCHARGE_DATA.seo.description,
        url: ZERO_LIQUID_DISCHARGE_DATA.seo.canonicalUrl,
        creator: {
          "@type": "Corporation",
          name: "Pingaksh Renewables (Pingaksh Bio-Energy & Green Fuels Ltd.)",
          url: "https://pingaksh.com",
        },
        variableMeasured: [
          "Industrial Effluent Discharge (0.0 Liters/Day - 100% ZLD)",
          "Process Condensate Recycling Ratio (84.5%)",
          "Specific Freshwater Consumption (< 2.6 Liters/Liter Ethanol)",
          "CPU Reverse Osmosis Permeate Quality (< 45 mg/L TDS, < 5 mg/L BOD)",
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
      <ZeroLiquidDischargeView />
    </>
  );
}

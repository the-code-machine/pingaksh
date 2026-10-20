// src/app/(core)/sustainability/hydro-vs-coal/page.tsx

import React from "react";
import type { Metadata } from "next";
import HydroVsCoalView from "@/components/sustainability/HydroVsCoalView";
import { HYDRO_VS_COAL_DATA } from "@/data/hydroVsCoalData";

export const metadata: Metadata = {
  title: HYDRO_VS_COAL_DATA.seo.title,
  description: HYDRO_VS_COAL_DATA.seo.description,
  keywords: HYDRO_VS_COAL_DATA.seo.keywords,
  alternates: {
    canonical: HYDRO_VS_COAL_DATA.seo.canonicalUrl,
  },
  openGraph: {
    title: HYDRO_VS_COAL_DATA.seo.title,
    description: HYDRO_VS_COAL_DATA.seo.description,
    url: HYDRO_VS_COAL_DATA.seo.canonicalUrl,
    siteName: "Pingaksh Renewables",
    type: "website",
  },
};

export default function HydroVsCoalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: HYDRO_VS_COAL_DATA.breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.label,
          item: `https://pingaksh.com${crumb.href}`,
        })),
      },
      {
        "@type": "Dataset",
        name: HYDRO_VS_COAL_DATA.seo.title,
        description: HYDRO_VS_COAL_DATA.seo.description,
        url: HYDRO_VS_COAL_DATA.seo.canonicalUrl,
        creator: {
          "@type": "Corporation",
          name: "Pingaksh Renewables (Uttar Bharat Hydro Power Pvt. Ltd.)",
          url: "https://pingaksh.com",
        },
        variableMeasured: [
          "Run-of-the-River Hydro Lifecycle GHG Intensity (4.0 kg CO2e/MWh)",
          "Thermal Coal Lifecycle GHG Intensity (1,020.0 kg CO2e/MWh)",
          "CEA Grid Baseline Carbon Displacement (820.0 kg CO2/MWh)",
          "Sulfur Dioxide, NOx, Fly Ash, and Consumptive Water Avoided per MWh",
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
      <HydroVsCoalView />
    </>
  );
}

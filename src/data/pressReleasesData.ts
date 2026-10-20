export interface PressReleaseItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category:
    | "Hydro Power"
    | "Bio-Energy & Fuels"
    | "Corporate & Governance"
    | "Sustainability & CSR";
  releaseCode: string;
  date: string;
  isoDate: string;
  year: string;
  location: string;
  imageUrl: string;
  imageAlt: string;
  redirectHref: string;
  pdfDownloadHref?: string;
  isFeatured?: boolean;
  tags: string[];
}

export interface PressReleasesPageData {
  seo: {
    title: string;
    description: string;
  };
  breadcrumbs: { label: string; href: string }[];
  hero: {
    title: string;
    subtitle: string;
    leadText: string;
    backgroundImage: string;
    backgroundAlt: string;
  };
  categories: string[];
  years: string[];
  mediaContact: {
    deskName: string;
    spokespersonRole: string;
    email: string;
    phone: string;
    note: string;
  };
  releases: PressReleaseItem[];
}

export const PRESS_RELEASES_DATA: PressReleasesPageData = {
  seo: {
    title: "Press Releases & Corporate Announcements | Pingaksh Renewables",
    description:
      "Search and read official press releases, commissioning updates, OMC ethanol supply allocations, and board announcements from Pingaksh Group (UBHP & PBPL).",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Media & Insights", href: "/media" },
    { label: "Press Releases & Announcements", href: "/media/press-releases" },
  ],
  hero: {
    title: "Press Releases & Announcements",
    subtitle: "Official Dispatches & Institutional Disclosures",
    leadText:
      "Search our archive of corporate communications, project commissioning announcements, off-take agreements, and governance updates across Pingaksh Group.",
    backgroundImage:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=85",
    backgroundAlt:
      "Pingaksh Group Corporate Communications and Press Release Archive",
  },
  categories: [
    "All",
    "Hydro Power",
    "Bio-Energy & Fuels",
    "Corporate & Governance",
    "Sustainability & CSR",
  ],
  years: ["All Years", "2026", "2025", "2024"],
  mediaContact: {
    deskName: "Corporate Communications & Media Relations",
    spokespersonRole: "Head — Institutional Communications, Pingaksh Group",
    email: "media@pingakshrenewables.com",
    phone: "+91 (11) 2345-6744",
    note: "For press kits, high-resolution plant photography, or interview requests with our Board of Directors.",
  },
  releases: [
    {
      id: "pr-2026-grid-connectivity",
      slug: "grid-connectivity-agreement-2026",
      title:
        "Pingaksh Group and State Transmission Utility execute long-term Power Purchase & Grid Connectivity Agreement for Sarju Hydro Cascade expansion",
      excerpt:
        "Strategic bilateral framework secures dedicated high-voltage evacuation corridors and long-term tariff certainty for Uttar Bharat Hydro Power (UBHP) generation assets in District Bageshwar, Uttarakhand.",
      category: "Hydro Power",
      releaseCode: "PR/UBHP/2026/104",
      date: "14 October 2026",
      isoDate: "2026-10-14",
      year: "2026",
      location: "Dehradun / New Delhi",
      imageUrl:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=85",
      imageAlt:
        "High-voltage transmission lines evacuating clean hydro power from UBHP Sarju cascade",
      redirectHref: "/media/press-releases/grid-connectivity-agreement-2026",
      pdfDownloadHref: "/investors/statutory-filings#grid-pact-2026",
      isFeatured: true,
      tags: ["UBHP", "Sarju Cascade", "Grid Evacuation", "PPA", "Uttarakhand"],
    },
    {
      id: "pr-2026-omc-allocation",
      slug: "omc-supply-allocation-2026",
      title:
        "Pingaksh Beverages Pvt. Ltd. (PBPL) secures multi-quarter Anhydrous Ethanol supply allocation with Public Sector OMCs for ESY 2026–27",
      excerpt:
        "Long-term off-take allocation from our 250 KLPD grain-based distillery strengthens order-book visibility across northern regional blending depots under India’s E20 mandate.",
      category: "Bio-Energy & Fuels",
      releaseCode: "PR/PBPL/2026/089",
      date: "28 September 2026",
      isoDate: "2026-09-28",
      year: "2026",
      location: "New Delhi",
      imageUrl:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
      imageAlt:
        "Pingaksh Beverages PBPL 250 KLPD Grain-Based Bio-Ethanol Distillery Columns",
      redirectHref: "/media/press-releases/omc-supply-allocation-2026",
      pdfDownloadHref: "/investors/statutory-filings#omc-allocation-2026",
      tags: ["PBPL", "250 KLPD", "E20 Ethanol", "OMC Tender", "Biofuels"],
    },
    {
      id: "pr-2026-board-reconstitution",
      slug: "board-audit-committee-reconstitution-2026",
      title:
        "Pingaksh Renewables reconstitutes Audit, Nomination & Risk Committees; inducts Independent Directors for listed-grade governance",
      excerpt:
        "The reconstituted 6-member Parent Board and 2 Subsidiary Additional Directors establish institutional oversight across all operating Special Purpose Vehicles.",
      category: "Corporate & Governance",
      releaseCode: "PR/CORP/2026/072",
      date: "10 August 2026",
      isoDate: "2026-08-10",
      year: "2026",
      location: "New Delhi",
      imageUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
      imageAlt:
        "Pingaksh Group Corporate Headquarters and Board of Directors Governance",
      redirectHref: "/who-we-are/board-of-directors",
      tags: [
        "Board of Directors",
        "Corporate Governance",
        "Independent Directors",
        "Audit Committee",
      ],
    },
    {
      id: "pr-2026-carbon-milestone",
      slug: "cumulative-carbon-offset-milestone-2026",
      title:
        "Pingaksh Group surpasses 217,800+ Metric Tonnes of verified cumulative CO₂ reduction across Hydro and Bio-Refinery operations",
      excerpt:
        "Driven by 600+ tonnes of daily greenhouse gas avoidance, 100% Zero-Liquid Discharge water recovery, and industrial fermentation CO₂ liquefaction.",
      category: "Sustainability & CSR",
      releaseCode: "PR/ESG/2026/054",
      date: "05 June 2026",
      isoDate: "2026-06-05",
      year: "2026",
      location: "Uttarakhand / New Delhi",
      imageUrl:
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=85",
      imageAlt:
        "Pingaksh Renewables Carbon Offset and Zero-Liquid Discharge Sustainability Milestone",
      redirectHref: "/sustainability/carbon-dashboard",
      tags: [
        "Carbon Offset",
        "ZLD",
        "World Environment Day",
        "CO2 Recovery",
        "ESG",
      ],
    },
    {
      id: "pr-2025-ddgs-co2-commissioning",
      slug: "ddgs-and-co2-recovery-plant-commissioning-2025",
      title:
        "PBPL commissions automated High-Protein DDGS dryers and food-grade CO₂ bottling unit to achieve 100% circular grain valorization",
      excerpt:
        "Closed-loop co-product recovery converts spent distillation mash into nutrient-dense poultry/cattle feed while capturing fermentation gas for industrial dry-ice production.",
      category: "Bio-Energy & Fuels",
      releaseCode: "PR/PBPL/2025/118",
      date: "19 November 2025",
      isoDate: "2025-11-19",
      year: "2025",
      location: "Northern Industrial Zone",
      imageUrl:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
      imageAlt:
        "High-protein DDGS animal feed and circular economy processing at Pingaksh",
      redirectHref: "/our-businesses/circular-economy",
      tags: [
        "DDGS",
        "CO2 Bottling",
        "Dry Ice",
        "Circular Economy",
        "Animal Feed",
      ],
    },
    {
      id: "pr-2025-sarju-catchment-afforestation",
      slug: "sarju-valley-afforestation-drive-2025",
      title:
        "UBHP completes monsoon green-belt afforestation and slope-stabilization drive across Kapkot villages in Bageshwar district",
      excerpt:
        "In partnership with local Van Panchayats, our hydro operations team planted native Himalayan species to protect watershed ecology around Sarju I, II & III.",
      category: "Sustainability & CSR",
      releaseCode: "PR/CSR/2025/063",
      date: "22 July 2025",
      isoDate: "2025-07-22",
      year: "2025",
      location: "Bageshwar, Uttarakhand",
      imageUrl:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85",
      imageAlt:
        "Sarju River Valley Catchment Afforestation in Bageshwar, Uttarakhand",
      redirectHref: "/sustainability/zero-liquid-discharge",
      tags: [
        "CSR",
        "Afforestation",
        "Bageshwar",
        "Sarju River",
        "Himalayan Ecology",
      ],
    },
    {
      id: "pr-2024-napier-grass-procurement",
      slug: "pingaksh-farms-napier-grass-expansion-2024",
      title:
        "Pingaksh Farms expands rural farmer buy-back network for high-yield Napier Grass and non-food grain feedstock aggregation",
      excerpt:
        "Direct farm-gate procurement eliminates middlemen and guarantees assured seasonal off-take for agrarian communities across northern India.",
      category: "Sustainability & CSR",
      releaseCode: "PR/FARMS/2024/091",
      date: "12 October 2024",
      isoDate: "2024-10-12",
      year: "2024",
      location: "Uttarakhand",
      imageUrl:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=85",
      imageAlt:
        "Pingaksh Farms Napier Grass Bio-Mass Cultivation and Farmer Procurement",
      redirectHref: "/our-businesses/subsidiaries-spvs",
      tags: ["Pingaksh Farms", "Napier Grass", "Rural Livelihoods", "Biomass"],
    },
    {
      id: "pr-2024-corporate-identity",
      slug: "ubhp-evolves-into-pingaksh-group-2024",
      title:
        "Uttar Bharat Hydro Power (UBHP) unveils unified ‘Pingaksh Group’ corporate identity to anchor multi-vertical clean energy expansion",
      excerpt:
        "Led by founder Mr. Naresh Goel alongside directors Mr. Amul Goel and Mr. Aadish Goel, the group consolidates its hydro, bio-ethanol, and agro-ventures under a single institutional brand.",
      category: "Corporate & Governance",
      releaseCode: "PR/CORP/2024/015",
      date: "22 January 2024",
      isoDate: "2024-01-22",
      year: "2024",
      location: "New Delhi",
      imageUrl:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85",
      imageAlt:
        "UBHP Evolution into Pingaksh Group Corporate Identity Announcement",
      redirectHref: "/who-we-are/heritage-timeline",
      tags: [
        "Corporate Rebrand",
        "UBHP",
        "Naresh Goel",
        "Heritage",
        "Pingaksh Group",
      ],
    },
  ],
};

export interface SubMenuItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  isGated?: boolean;
}

export interface MegaMenuColumn {
  heading: string;
  items: SubMenuItem[];
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  columns: MegaMenuColumn[];
  featuredHighlight: {
    tag: string;
    title: string;
    description: string;
    metrics?: { label: string; value: string }[];
    ctaText: string;
    ctaHref: string;
  };
}

export const NAVIGATION_DATA: NavItem[] = [
  {
    id: "who-we-are",
    label: "Who We Are",
    href: "/who-we-are",
    columns: [
      {
        heading: "About Pingaksh",
        items: [
          // {
          //   label: "Corporate Overview",
          //   href: "/who-we-are/corporate-overview",
          //   description: "Evolution from UBHP to Pingaksh Renewables",
          // },
          {
            label: "Our Heritage & Growth Timeline",
            href: "/who-we-are/heritage-timeline",
            description:
              "Interactive milestone scrubber from groundbreaking to commissioning",
          },
          {
            label: "Vision, Mission & Core Values",
            href: "/who-we-are/vision-mission",
            description: "Guiding principles driving clean energy excellence",
          },
        ],
      },
      {
        heading: "Governance & Leadership",
        items: [
          {
            label: "Leadership & Board of Directors",
            href: "/who-we-are/board-of-directors",
            description: "6 Parent Directors including Independent Directors",
          },
          {
            label: "Subsidiary Leadership & Group Structure",
            href: "/who-we-are/subsidiary-leadership",
            description: "2 Subsidiary Additional Directors & SPV hierarchy",
          },
        ],
      },
    ],
    featuredHighlight: {
      tag: "Interactive Milestone Scrubber",
      title: "From UBHP to Pingaksh Renewables",
      description:
        "Explore our horizontal timeline showcasing groundbreaking to commissioning milestones and our tiered leadership grid.",
      metrics: [
        { label: "Parent Board", value: "6 Directors" },
        { label: "Subsidiary Board", value: "2 Addl. Directors" },
      ],
      ctaText: "Explore Our Heritage",
      ctaHref: "/who-we-are/heritage-timeline",
    },
  },
  {
    id: "our-businesses",
    label: "Our Businesses",
    href: "/our-businesses",
    columns: [
      {
        heading: "Clean Power & Bio-Energy",
        items: [
          {
            label: "Hydro Power Generation",
            href: "/our-businesses/hydro-power",
            description: "Sarju I, II, III Run-of-the-River Projects",
            badge: "Sarju I, II, III",
          },
          {
            label: "Green Fuels & Bio-Energy",
            href: "/our-businesses/green-fuels-ethanol",
            description: "250 KLPD Grain-Based Ethanol Distillery (E20)",
            badge: "250 KLPD",
          },
        ],
      },
      {
        heading: "Circular Economy & Group Entities",
        items: [
          {
            label: "By-Products & Circular Economy",
            href: "/our-businesses/circular-byproducts",
            description: "High-protein DDGS, CO₂ Bottling & Dry Ice Production",
          },
          {
            label: "Subsidiaries & SPVs",
            href: "/our-businesses/subsidiaries-spvs",
            description: "Special Purpose Vehicles & asset-specific entities",
          },
        ],
      },
    ],
    featuredHighlight: {
      tag: "Interactive Process Workflows",
      title: "Grain-to-Ethanol (E20) & Francis Turbine Hydro Matrices",
      description:
        "Inspect technical plant spec matrices (Net Head, Discharge, Francis Turbines, MW & KLPD capacity) and animated SVG workflows.",
      metrics: [
        { label: "Ethanol Capacity", value: "250 KLPD" },
        { label: "Hydro Assets", value: "Sarju I, II & III" },
      ],
      ctaText: "View Plant Spec Matrices",
      ctaHref: "/our-businesses/hydro-power",
    },
  },
  {
    id: "sustainability-impact",
    label: "Sustainability & Impact",
    href: "/sustainability",
    columns: [
      {
        heading: "Carbon & Emission Analytics",
        items: [
          {
            label: "Live Carbon Offset Dashboard",
            href: "/sustainability/carbon-dashboard",
            description: "Real-time daily & monthly cumulative CO₂ reduction",
            badge: "Live Ticker",
          },
          {
            label: "Hydro vs. Coal Emission Comparison",
            href: "/sustainability/hydro-vs-coal",
            description: "Lifecycle emission avoidance metrics per MWh",
          },
        ],
      },
      {
        heading: "Green Mobility & Ecology",
        items: [
          {
            label: "E20 Ethanol vs. Pure Petrol Impact",
            href: "/sustainability/e20-ethanol-impact",
            description:
              "Tailpipe emission savings & crude import substitution",
          },
          {
            label: "Zero-Liquid Discharge & Ecological Balance",
            href: "/sustainability/zero-liquid-discharge",
            description: "100% water recycling & catchment afforestation",
          },
        ],
      },
    ],
    featuredHighlight: {
      tag: "Dynamic CO₂ Savings Engine",
      title: "Live Mathematical Carbon Reduction Ticker",
      description:
        "Real-time algorithmic tracking of cumulative carbon offset across our run-of-the-river hydro stations and 250 KLPD ethanol operations.",
      metrics: [
        { label: "Effluent Standard", value: "100% ZLD" },
        { label: "Fuel Standard", value: "E20 Ready" },
      ],
      ctaText: "Launch Live Dashboard",
      ctaHref: "/sustainability/carbon-dashboard",
    },
  },
  //   {
  //     id: "investor-relations",
  //     label: "Investor Relations",
  //     href: "/investors",
  //     columns: [
  //       {
  //         heading: "Market & Financial Performance",
  //         items: [
  //           {
  //             label: "Stock Price & Share Tracker",
  //             href: "/investors/stock-tracker",
  //             description: "NSE/BSE benchmark tracking & equity snapshot",
  //           },
  //           {
  //             label: "Financial Reports & Annual Returns",
  //             href: "/investors/financial-reports",
  //             description: "Filterable fiscal year repository (Audited & Annual)",
  //           },
  //         ],
  //       },
  //       {
  //         heading: "Corporate Compliance",
  //         items: [
  //           {
  //             label: "Corporate Governance & Committees",
  //             href: "/investors/corporate-governance",
  //             description: "Audit, CSR, Nomination & Remuneration committees",
  //           },
  //           {
  //             label: "Disclaimers & Statutory Filings",
  //             href: "/investors/statutory-filings",
  //             description: "Regulatory disclosures & IPO-ready compliance",
  //           },
  //         ],
  //       },
  //     ],
  //     featuredHighlight: {
  //       tag: "Statutory Repository",
  //       title: "IPO-Ready Governance & Fiscal Disclosures",
  //       description:
  //         "Access audited financial statements, annual returns, and board committee charters organized by fiscal year.",
  //       metrics: [
  //         { label: "Compliance", value: "SEBI / MCA" },
  //         { label: "Fiscal Archive", value: "Filterable FY Tabs" },
  //       ],
  //       ctaText: "Browse Financial Reports",
  //       ctaHref: "/investors/financial-reports",
  //     },
  //   },
  {
    id: "contact-partners",
    label: "Contact & Partners",
    href: "/contact",
    columns: [
      {
        heading: "Offices & Careers",
        items: [
          {
            label: "Corporate & Registered Offices",
            href: "/contact/offices",
            description: "Headquarters, project site offices & plant locations",
          },
          // {
          //   label: "Career Inquiries",
          //   href: "/contact/careers",
          //   description: "Join our engineering, hydro & bio-energy teams",
          // },
        ],
      },
      {
        heading: "Partner Ecosystem",
        items: [
          {
            label: "Vendor Registration Portal",
            href: "/contact/vendor-portal",
            description: "Password-protected onboarding with GST/PAN uploads",
            badge: "Protected",
            isGated: true,
          },
        ],
      },
    ],
    featuredHighlight: {
      tag: "Gated Vendor Onboarding",
      title: "Encrypted Partner & Supplier Registration",
      description:
        "Authorized vendors can unlock our multi-step onboarding portal to submit GST, PAN, and technical capability profiles.",
      ctaText: "Access Vendor Portal",
      ctaHref: "/contact/vendor-portal",
    },
  },
  {
    id: "media-insights",
    label: "Media & Insights",
    href: "/media",
    columns: [
      {
        heading: "Newsroom & Recognition",
        items: [
          {
            label: "Press Releases & Announcements",
            href: "/media/press-releases",
            description: "Official corporate updates & commissioning news",
          },
          {
            label: "Certifications & Awards",
            href: "/media/certifications-awards",
            description:
              "ISO accreditations, safety citations & industry honors",
          },
        ],
      },
      {
        heading: "Visual Archive",
        items: [
          {
            label: "Project Gallery",
            href: "/media/project-gallery",
            description:
              "High-impact masonry grid of site progress & operations",
          },
        ],
      },
    ],
    featuredHighlight: {
      tag: "Operations Masonry Grid",
      title: "Site Progress & Plant Photography",
      description:
        "High-resolution visual documentation of Sarju hydro turbines, distillery columns, and safety awards.",
      ctaText: "Open Project Gallery",
      ctaHref: "/media/project-gallery",
    },
  },
];

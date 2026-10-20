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
  featuredInsight: {
    category: string;
    date: string;
    title: string;
    imageUrl: string;
    href: string;
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
          {
            label: "Our Heritage",
            href: "/who-we-are/heritage-timeline",
            description:
              "Tracing our journey and milestones in the renewable energy sector.",
          },
          {
            label: "Vision, Mission & Values",
            href: "/who-we-are/vision-mission",
            description:
              "The core principles driving our commitment to clean energy.",
          },
        ],
      },
      {
        heading: "Governance & Leadership",
        items: [
          {
            label: "Board of Directors",
            href: "/who-we-are/board-of-directors",
            description: "The leadership team guiding our strategic growth.",
          },
          {
            label: "Group Structure",
            href: "/who-we-are/group-structure",
            description:
              "Overview of our operational framework and subsidiary entities.",
          },
        ],
      },
    ],
    featuredInsight: {
      category: "Corporate Update",
      date: "Oct 12, 2026",
      title:
        "Pingaksh Group Announces Expansion of Board of Directors Ahead of Q4",
      imageUrl:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
      href: "/media/press-releases/board-expansion",
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
            description: "Run-of-the-river projects across the Sarju basin.",
            badge: "Sarju I, II, III",
          },
          {
            label: "Green Fuels & Bio-Energy",
            href: "/our-businesses/green-fuels-ethanol",
            description: "State-of-the-art grain-based ethanol distillation.",
            badge: "250 KLPD",
          },
        ],
      },
      {
        heading: "Circular Economy",
        items: [
          {
            label: "By-Products Integration",
            href: "/our-businesses/circular-byproducts",
            description:
              "High-protein DDGS, CO₂ bottling, and dry ice production.",
          },
          {
            label: "Asset SPVs",
            href: "/our-businesses/subsidiaries-spvs",
            description:
              "Special Purpose Vehicles dedicated to specific project assets.",
          },
        ],
      },
    ],
    featuredInsight: {
      category: "Operations",
      date: "Sep 28, 2026",
      title: "Sarju III Hydro Project Reaches Peak Operational Capacity",
      imageUrl:
        "https://images.unsplash.com/photo-1542336391-aeeb901e913a?auto=format&fit=crop&w=600&q=80",
      href: "/media/press-releases/sarju-iii-capacity",
    },
  },
  {
    id: "sustainability-impact",
    label: "Sustainability & Impact",
    href: "/sustainability",
    columns: [
      {
        heading: "Carbon Analytics",
        items: [
          {
            label: "Emissions Dashboard",
            href: "/sustainability/carbon-dashboard",
            description: "Tracking our cumulative CO₂ reduction metrics.",
            badge: "Live Data",
          },
          {
            label: "Lifecycle Impact",
            href: "/sustainability/hydro-vs-coal",
            description:
              "Emission avoidance compared to conventional power sources.",
          },
        ],
      },
      {
        heading: "Ecology & Conservation",
        items: [
          {
            label: "Fuel Blending Impact",
            href: "/sustainability/e20-ethanol-impact",
            description:
              "Contributions to the E20 mandate and tailpipe emission reductions.",
          },
          {
            label: "Zero-Liquid Discharge (ZLD)",
            href: "/sustainability/zero-liquid-discharge",
            description:
              "100% water recycling and catchment conservation initiatives.",
          },
        ],
      },
    ],
    featuredInsight: {
      category: "Sustainability",
      date: "Sep 15, 2026",
      title:
        "Pingaksh Beverages Achieves 100% ZLD Compliance at Rajasthan Plant",
      imageUrl:
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80",
      href: "/sustainability/zero-liquid-discharge",
    },
  },
  {
    id: "contact-partners",
    label: "Contact & Partners",
    href: "/contact",
    columns: [
      {
        heading: "Locations",
        items: [
          {
            label: "Corporate & Site Offices",
            href: "/contact/offices",
            description:
              "Headquarters, plant locations, and regional contact details.",
          },
        ],
      },
      {
        heading: "Partner Ecosystem",
        items: [
          {
            label: "Vendor Registration Portal",
            href: "/contact/vendor-portal",
            description:
              "Secure onboarding for suppliers, contractors, and partners.",
            badge: "Protected",
            isGated: true,
          },
        ],
      },
    ],
    featuredInsight: {
      category: "Vendor Network",
      date: "Aug 30, 2026",
      title: "Streamlined Vendor Onboarding Portal Launched for FY27 Projects",
      imageUrl:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
      href: "/contact/vendor-portal",
    },
  },
  {
    id: "media-insights",
    label: "Media & Insights",
    href: "/media",
    columns: [
      {
        heading: "News & Announcements",
        items: [
          {
            label: "Press Releases",
            href: "/media/press-releases",
            description:
              "Official corporate updates, developments, and commissioning news.",
          },
          {
            label: "Accreditations",
            href: "/media/certifications-awards",
            description:
              "ISO certifications, safety citations, and industry recognition.",
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
              "Visual documentation of our facilities and ongoing operations.",
          },
        ],
      },
    ],
    featuredInsight: {
      category: "Press Release",
      date: "Aug 12, 2026",
      title:
        "Pingaksh Green Energy Awarded ISO 14001 for Environmental Management",
      imageUrl:
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80",
      href: "/media/certifications-awards",
    },
  },
];

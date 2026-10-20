export interface TimelineMilestone {
  id: string;
  year: string;
  dateStamp: string;
  isoDate: string;
  eraTitle: string;
  headline: string;
  narrative: string[];
  location: string;
  keyFigure: {
    number: string;
    label: string;
  };
  primaryImage: {
    url: string;
    alt: string;
    caption: string;
  };
  secondaryImage?: {
    url: string;
    alt: string;
    caption: string;
  };
  archivalNote?: string;
}

export interface HeritageTimelinePageData {
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
  prologue: {
    statement: string;
    author: string;
    role: string;
  };
  milestones: TimelineMilestone[];
}

export const HERITAGE_TIMELINE_DATA: HeritageTimelinePageData = {
  seo: {
    title: "Our Heritage & Growth Timeline | Pingaksh Renewables (UBHP)",
    description:
      "Trace the institutional history of Pingaksh Group from the founding of Uttar Bharat Hydro Power (UBHP) and commissioning of Sarju II & III to our modern bio-energy expansion.",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Who We Are", href: "/who-we-are" },
    {
      label: "Our Heritage & Growth Timeline",
      href: "/who-we-are/heritage-timeline",
    },
  ],
  hero: {
    title: "Our Heritage",
    subtitle: "From Himalayan River Valleys to National Clean-Energy Scale",
    leadText:
      "Every enduring industrial institution is built milestone by milestone. Explore how Uttar Bharat Hydro Power evolved into Pingaksh Group through disciplined civil engineering and generational stewardship.",
    backgroundImage:
      "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=2000&q=85",
    backgroundAlt:
      "Archival view of Sarju River hydroelectric civil engineering in Bageshwar, Uttarakhand",
  },
  prologue: {
    statement:
      "We did not begin in boardrooms; we began in the steep gorges of the Sarju River—tunneling through Himalayan rock to prove that clean, run-of-the-river power could be engineered in harmony with nature.",
    author: "Mr. Naresh Goel",
    role: "Founder & Promoter, Pingaksh Group",
  },
  milestones: [
    {
      id: "era-foundation",
      year: "2008",
      dateStamp: "Foundation & Concession Era",
      isoDate: "2008-04-01",
      eraTitle: "Inception of Uttar Bharat Hydro Power",
      headline: "Laying the Cornerstone in Uttarakhand’s Sarju Basin",
      narrative: [
        "Recognizing India’s critical need for non-fossil peaking power, our founders established Uttar Bharat Hydro Power Pvt. Ltd. (UBHP) to develop a cascade of run-of-the-river hydroelectric stations in District Bageshwar, Uttarakhand.",
        "Detailed hydrological surveys, geological core drilling, and environmental impact assessments were completed across the Sarju River valley to design high-head diversion weirs with zero village displacement.",
      ],
      location: "Kapkot, District Bageshwar · Uttarakhand",
      keyFigure: {
        number: "30.60 MW",
        label: "Sanctioned Cascade Capacity (Sarju I, II & III)",
      },
      primaryImage: {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85",
        alt: "Hydrological survey and river catchment of the Sarju River in Bageshwar, Uttarakhand",
        caption:
          "Initial hydrological assessment along the upper Sarju River stream in Bageshwar.",
      },
      secondaryImage: {
        url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80",
        alt: "Civil excavation and headrace tunnel engineering work for UBHP",
        caption:
          "Early civil excavation and slope stabilization in high-altitude terrain.",
      },
      archivalNote:
        "Designed from day one as a pure Run-of-the-River scheme to preserve the natural flow regime of the Himalayan tributary.",
    },
    {
      id: "era-sarju-iii",
      year: "2014",
      dateStamp: "11 July 2014 · Commercial Operation",
      isoDate: "2014-07-11",
      eraTitle: "First Grid Synchronization",
      headline: "Commissioning of the 10.50 MW Sarju III Hydroelectric Plant",
      narrative: [
        "On July 11, 2014, UBHP achieved its landmark Commercial Operation Date (COD) for the Sarju III Small Hydro Project—synchronizing three 3,600 kW Horizontal Axis Francis Turbine units with the state transmission grid.",
        "Engineered for a rated net head of 51.85 meters and a design discharge of 6.73 cumecs per unit, Sarju III established the group’s reputation for reliable electro-mechanical execution and high seasonal plant load factors.",
      ],
      location: "Sarju III Powerhouse · Bageshwar, UK",
      keyFigure: {
        number: "10.50 MW",
        label: "3 × 3,600 kW Horizontal Francis Turbines",
      },
      primaryImage: {
        url: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1400&q=85",
        alt: "Sarju III Hydroelectric Powerhouse and high-pressure penstock infrastructure",
        caption:
          "Sarju III powerhouse and penstock assembly commissioned on 11.07.2014.",
      },
      archivalNote:
        "Rated Net Head: 51.85 m | Design Discharge: 6.73 m³/s | Grid Evacuation: UPCL Sub-station.",
    },
    {
      id: "era-sarju-ii",
      year: "2016",
      dateStamp: "25 May 2016 · Commercial Operation",
      isoDate: "2016-05-25",
      eraTitle: "High-Head Cascade Expansion",
      headline: "Sarju II (12.60 MW) Achieves Commercial Operation",
      narrative: [
        "Less than two years after Sarju III, our engineering teams commissioned the technically demanding 12.60 MW Sarju II Hydroelectric Project on May 25, 2016.",
        "Operating at a high rated head of 155.0 meters with three 4,200 kW Horizontal Francis generating units, Sarju II more than doubled the group’s operational hydro generation footprint to 23.10 MW of commissioned capacity.",
      ],
      location: "Sarju II Powerhouse · Bageshwar, UK",
      keyFigure: {
        number: "12.60 MW",
        label: "155.0m Rated Head · 3 × 4,200 kW Units",
      },
      primaryImage: {
        url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1400&q=85",
        alt: "High-voltage switchyard and transmission lines evacuating power from Sarju II",
        caption:
          "Switchyard synchronization following Sarju II commissioning on 25.05.2016.",
      },
      secondaryImage: {
        url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=900&q=80",
        alt: "Electro-mechanical turbine governor and control room telemetry",
        caption:
          "Automated SCADA control systems managing turbine load and headrace levels.",
      },
      archivalNote:
        "Rated Net Head: 155.0 m | Design Discharge: 2.59 m³/s | COD: 25.05.2016.",
    },
    {
      id: "era-sarju-i-agro",
      year: "2021",
      dateStamp: "Cascade Completion & Agro-Ventures",
      isoDate: "2021-09-15",
      eraTitle: "Upstream Hydro & Pingaksh Farms",
      headline: "Advancing Sarju I (7.50 MW) & Sustainable Biomass Cultivation",
      narrative: [
        "With second-generation directors Mr. Amul Goel and Mr. Aadish Goel expanding strategic execution, the group advanced civil works on the upstream 7.50 MW Sarju I project (160m design head, 2 × 3,750 kW units).",
        "Simultaneously, the group launched Pingaksh Farms to pioneer large-scale Napier grass cultivation and agrarian supply-chain integration—laying the feedstock foundation for our entry into green biofuels.",
      ],
      location: "Uttarakhand & Northern Agrarian Belt",
      keyFigure: {
        number: "7.50 MW",
        label: "Sarju I Upstream Hydro (160m Design Head)",
      },
      primaryImage: {
        url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1400&q=85",
        alt: "Pingaksh Farms Napier grass cultivation and rural agricultural integration",
        caption:
          "High-yield Napier grass bio-crops and farmer procurement networks.",
      },
    },
    {
      id: "era-pingaksh-rebrand",
      year: "2024",
      dateStamp: "Corporate Transformation",
      isoDate: "2024-01-22",
      eraTitle: "The Pingaksh Group Identity",
      headline: "Commissioning PBPL Green Fuels & Industrial Circularity",
      narrative: [
        "Unifying our hydro, biofuel, and agro-industrial entities under the Pingaksh Group banner, we established Pingaksh Beverages Pvt. Ltd. (PBPL) to build a state-of-the-art grain-based ethanol biorefinery.",
        "Engineered with closed-loop Distillers Dried Grains with Solubles (DDGS) recovery and food-grade CO₂ liquefaction, the facility diversified the group into national E20 fuel blending with Public Sector Oil Marketing Companies.",
      ],
      location: "Corporate Headquarters & Biorefinery Complex",
      keyFigure: {
        number: "217,800+ t",
        label: "Cumulative Tonnes of Carbon Offset Achieved",
      },
      primaryImage: {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85",
        alt: "Pingaksh Beverages PBPL automated distillation columns and process plant",
        caption:
          "Automated multi-pressure distillation and zero-liquid-discharge recovery units.",
      },
    },
    {
      id: "era-future-horizon",
      year: "2026",
      dateStamp: "Present & Future Horizon",
      isoDate: "2026-10-01",
      eraTitle: "Institutional Scale & Listed-Grade Governance",
      headline: "Scaling Multi-State Clean Infrastructure",
      narrative: [
        "Today, Pingaksh Renewables operates under a reconstituted 6-member Parent Board (including Independent Directors) and dedicated subsidiary governance across all Special Purpose Vehicles.",
        "With full hydro cascade integration and expanded biofuel off-take allocations, Pingaksh stands poised for its next decade of disciplined capital deployment.",
      ],
      location: "Pan-India Operations",
      keyFigure: {
        number: "6 + 2",
        label: "Parent & Subsidiary Board Directors",
      },
      primaryImage: {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
        alt: "Pingaksh Renewables modern corporate headquarters and future growth horizon",
        caption:
          "Institutional governance preparing Pingaksh Renewables for capital-market scale.",
      },
    },
  ],
};

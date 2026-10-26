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
    title: "Our Heritage & Growth Timeline | Pingaksh Group",
    description:
      "Trace the institutional history of Pingaksh Group from the founding of Uttar Bharat Hydro Power (UBHP) and the commissioning of Sarju cascade projects to our modern 250 KLPD bio-energy expansion.",
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
      "Every enduring industrial institution is built milestone by milestone. Explore how Uttar Bharat Hydro Power evolved into the Pingaksh Group through disciplined civil engineering and generational stewardship.",
    backgroundImage:
      "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/P9090483_4dece626.jpg",
    backgroundAlt:
      "Archival view of Sarju River hydroelectric civil engineering in Bageshwar, Uttarakhand",
  },
  prologue: {
    statement:
      "We did not begin in boardrooms; we began in the steep gorges of the Sarju River—tunneling through Himalayan rock to prove that clean, run-of-the-river power could be engineered in harmony with nature.",
    author: "Mr. Naresh Goel",
    role: "Visionary Founder, Pingaksh Group",
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
        url: "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/DSC00992_f807ae3a.jpg",
        alt: "Hydrological survey and river catchment of the Sarju River in Bageshwar, Uttarakhand",
        caption:
          "Initial hydrological assessment along the upper Sarju River stream in Bageshwar.",
      },
      secondaryImage: {
        url: "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/20150914_130417_b13c6c87.jpg",
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
        "Engineered for a rated net head of 51.85 meters and a rated discharge of 6.73 cumecs, Sarju III established the group’s reputation for reliable electro-mechanical execution and high seasonal plant load factors.",
      ],
      location: "Sarju III Powerhouse · Bageshwar, UK",
      keyFigure: {
        number: "10.50 MW",
        label: "3 × 3,600 kW Horizontal Francis Turbines",
      },
      primaryImage: {
        url: "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/20150914_152820_164b397b.jpg",
        alt: "Sarju III Hydroelectric Powerhouse and high-pressure penstock infrastructure",
        caption:
          "Sarju III powerhouse and penstock assembly commissioned on 11.07.2014.",
      },
      archivalNote:
        "Rated Net Head: 51.85 m | Rated Discharge: 6.73 m³/s | Grid Evacuation: UPCL Sub-station.",
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
        url: "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/_MG_3560_bcb2ca66.webp",
        alt: "High-voltage switchyard and transmission lines evacuating power from Sarju II",
        caption:
          "Switchyard synchronization following Sarju II commissioning on 25.05.2016.",
      },
      secondaryImage: {
        url: "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/_MG_3326_fa877723.webp",
        alt: "Electro-mechanical turbine governor and control room telemetry",
        caption:
          "Automated SCADA control systems managing turbine load and headrace levels.",
      },
      archivalNote:
        "Rated Net Head: 155.0 m | Rated Discharge: 2.59 m³/s | COD: 25.05.2016.",
    },
    {
      id: "era-green-fuels-expansion",
      year: "2021",
      dateStamp: "Diversification & Green Fuels",
      isoDate: "2021-09-15",
      eraTitle: "Venturing into Other Green Energy Streams",
      headline: "Setting up Rajasthan's First and Largest Ethanol Distillery",
      narrative: [
        "Venturing into other green energy streams, the group began its strategic diversification into green fuels.",
        "This pivotal milestone was marked by setting up Rajasthan's first and largest ethanol distillery, establishing a major foundation for the group in the bio-energy sector and agrarian supply-chain integration.",
      ],
      location: "Rajasthan",
      keyFigure: {
        number: "1st & Largest",
        label: "Ethanol Distillery in Rajasthan",
      },
      primaryImage: {
        url: "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/IMG_7095_edited_03c57d3d.webp",
        alt: "Agricultural integration and early distillery site setup",
        caption:
          "Laying the groundwork for green fuel diversification in Rajasthan.",
      },
    },
    {
      id: "era-pingaksh-rebrand",
      year: "2024",
      dateStamp: "Corporate Transformation",
      isoDate: "2024-01-22",
      eraTitle: "The Pingaksh Group Identity",
      headline: "Commissioning the Group's Green Fuel Plant in Rajasthan",
      narrative: [
        "Unifying our hydro, biofuel, and agro-industrial entities under the Pingaksh Group banner, we successfully commissioned the group's green fuel plant in Rajasthan.",
        "Scaling to a robust 250 KLPD capacity with closed-loop Distillers Dried Grains with Solubles (DDGS) recovery, the facility firmly positioned the group as a key contributor to India's E20 fuel blending mandate.",
      ],
      location: "Corporate Headquarters & Rajasthan Biorefinery",
      keyFigure: {
        number: "250 KLPD",
        label: "Operational Bio-Ethanol Distillation Capacity",
      },
      primaryImage: {
        url: "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/dji_fly_20240307_160310_241_1709808715887_photo_87485549.webp",
        alt: "Pingaksh green fuel plant and automated distillation columns in Rajasthan",
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
        "Today, the Pingaksh Group operates with stringent institutional governance, featuring dedicated subsidiary boards and independent oversight across all Special Purpose Vehicles.",
        "With a fully integrated hydro cascade and expanding biofuel offtake allocations with Public Sector Oil Marketing Companies, Pingaksh stands poised for its next decade of disciplined capital deployment.",
      ],
      location: "Pan-India Operations",
      keyFigure: {
        number: "222,000+",
        label: "Tonnes of Cumulative Carbon Offset Achieved",
      },
      primaryImage: {
        url: "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/_MG_3751_a4bd973c.webp",
        alt: "Pingaksh modern corporate headquarters and future growth horizon",
        caption:
          "Institutional governance preparing Pingaksh for capital-market scale.",
      },
    },
  ],
};

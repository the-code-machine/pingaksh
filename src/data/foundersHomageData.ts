// src/data/foundersHomageData.ts

export interface FoundersHomageData {
  seo: {
    title: string;
    description: string;
  };
  breadcrumbs: { label: string; href: string }[];
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    backgroundImage: string;
    backgroundAlt: string;
  };
  memorialTribute: {
    sectionEyebrow: string;
    heading: string;
    honorees: {
      id: string;
      name: string;
      titleTag: string;
      portraitUrl: string;
      portraitAlt: string;
    }[];
    leadTribute: string;
    bodyTribute: string;
    guidingPillars: {
      title: string;
      description: string;
    }[];
  };
  torchbearerSpotlight: {
    eyebrow: string;
    name: string;
    designation: string;
    portraitUrl: string;
    portraitAlt: string;
    leadParagraph: string;
    secondaryParagraph: string;
    visionQuote: string;
    ctaLabel: string;
    ctaHref: string;
  };
}

export const FOUNDERS_HOMAGE_DATA: FoundersHomageData = {
  seo: {
    title: "Founders' Homage & Guiding Legacy | Pingaksh Renewables",
    description:
      "Honouring the enduring legacy of Late Shri Hans Raj Goel and Smt. Santosh Devi, and the visionary leadership of Mr. Naresh Goel steering Pingaksh Group.",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Who We Are", href: "/who-we-are" },
    { label: "Founders' Homage", href: "/who-we-are/founders-homage" },
  ],
  hero: {
    eyebrow: "Our Guiding Stars & Heritage",
    title: "About The Founder",
    subtitle:
      "Honouring the timeless values, integrity, and community spirit that form the bedrock of the Pingaksh Group.",
    backgroundImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85",
    backgroundAlt:
      "Himalayan Dawn Symbolizing the Guiding Legacy of Pingaksh Group",
  },
  memorialTribute: {
    sectionEyebrow: "In Loving Memory & Reverence",
    heading: "About The Founder",
    honorees: [
      {
        id: "shri-hans-raj-goel",
        name: "Late Shri Hans Raj Goel",
        titleTag: "Patriarch & Guiding Inspiration",
        // Replace with your uploaded Media Manager path once uploaded
        portraitUrl:
          "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/Screenshot_2026-11-04_at_12_43_17___PM_bb846f62.png",
        portraitAlt: "Portrait of Late Shri Hans Raj Goel",
      },
      {
        id: "smt-santosh-devi",
        name: "Smt. Santosh Devi",
        titleTag: "Matriarch & Pillar of Strength",
        // Replace with your uploaded Media Manager path once uploaded
        portraitUrl:
          "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/Screenshot_2026-11-04_at_12_43_24___PM_dd8559df.png",
        portraitAlt: "Portrait of Smt. Santosh Devi",
      },
    ],
    leadTribute:
      "Honouring the legacy of late Shri Hans Raj Goel and Smt. Santosh Devi, whose legacy continues to guide and inspire us in all our endeavours.",
    bodyTribute:
      "Late Shri Hans Raj Goel and Smt. Santosh Devi will forever remain our guiding stars. Their memory inspires us to strive for excellence, to lead with integrity, and to cherish the bonds of family and community. In their honor, we pledge to continue their legacy, upholding the principles they held dear, and working towards a future that reflects their enduring spirit and unwavering love.",
    guidingPillars: [
      {
        title: "Unwavering Integrity",
        description:
          "Conducting every business endeavour with ethical transparency, honouring our word across partners and institutions.",
      },
      {
        title: "Pursuit of Excellence",
        description:
          "Building resilient industrial infrastructure that stands the test of time and serves national energy self-reliance.",
      },
      {
        title: "Family & Community Bonds",
        description:
          "Uplifting rural and Himalayan communities as an extended family through healthcare, education, and sustainable livelihoods.",
      },
    ],
  },
  torchbearerSpotlight: {
    eyebrow: "Carrying the Torch Forward",
    name: "Mr. Naresh Goel",
    designation: "Chairman & Visionary Leader — Pingaksh Group",
    // Replace with your uploaded Media Manager path once uploaded
    portraitUrl:
      "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/directors/director_89bec1ff20800c2f_1792514583.png",
    portraitAlt: "Mr. Naresh Goel — Visionary Leader of Pingaksh Group",
    leadParagraph:
      "Mr. Naresh Goel is a visionary entrepreneur and dynamic leader steering the Pingaksh Group’s diversified growth across multiple sectors. With an exceptional ability to integrate innovation, sustainability, and strategic foresight, he has built a business ecosystem that balances industrial scale with ecological stewardship.",
    secondaryParagraph:
      "Expanding the group’s footprint through forward-thinking initiatives that promote clean energy—spanning the 23.100 MW Sarju hydroelectric cascade in Uttarakhand, 250 KLPD Zero-Liquid Discharge grain bio-refining, and sustainable agricultural value chains—he continues to translate the founding family’s values into purpose-driven transformation.",
    visionQuote:
      "Our endeavours in clean baseload hydro power and circular bio-energy are a living tribute to the values of integrity, perseverance, and community service instilled by our parents.",
    ctaLabel: "Explore Board of Directors",
    ctaHref: "/who-we-are/board-of-directors",
  },
};

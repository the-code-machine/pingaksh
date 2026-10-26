// src/data/visionMissionData.ts

export interface StrategicPillar {
  id: string;
  code: string;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
}

export interface CoreValueItem {
  id: string;
  number: string;
  sanskritConcept: string;
  sanskritMeaning: string;
  title: string;
  subtitle: string;
  description: string;
  operationalProof: string;
  badge: string;
  image: string;
  imageAlt: string;
}

export interface NationalAlignmentItem {
  id: string;
  mandate: string;
  targetYear: string;
  pingakshContribution: string;
  headlineMetric: string;
  unit: string;
  details: string;
}

export interface LeadershipCreedItem {
  name: string;
  role: string;
  credentials: string;
  pillarFocus: string;
  ethosStatement: string;
  traits: string[];
}

export interface VisionMissionPageData {
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    keywords: string[];
    ogImage: string;
  };
  breadcrumbs: {
    label: string;
    href: string;
  }[];
  sectionNav: {
    id: string;
    label: string;
    code: string;
  }[];
  hero: {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    subtitle: string;
    sanskritBadge: string;
    backgroundImage: string;
    backgroundImageAlt: string;
    quickStats: {
      label: string;
      value: string;
      subtext: string;
    }[];
  };
  etymologyManifesto: {
    eyebrow: string;
    sanskritWord: string;
    phonetic: string;
    headline: string;
    leadParagraph: string;
    bodyParagraph: string;
    keyQuote: string;
    quoteAttribution: string;
  };
  visionSection: {
    code: string;
    label: string;
    headline: string;
    statement: string;
    subtext: string;
    image: string;
    imageAlt: string;
    horizons: StrategicPillar[];
  };
  missionSection: {
    code: string;
    label: string;
    headline: string;
    statement: string;
    subtext: string;
    image: string;
    imageAlt: string;
    commitments: StrategicPillar[];
  };
  coreValues: {
    eyebrow: string;
    headline: string;
    description: string;
    items: CoreValueItem[];
  };
  nationalCharter: {
    eyebrow: string;
    headline: string;
    description: string;
    mandates: NationalAlignmentItem[];
  };
  leadershipPhilosophy: {
    eyebrow: string;
    headline: string;
    description: string;
    leaders: LeadershipCreedItem[];
  };
  ctaBanner: {
    eyebrow: string;
    headline: string;
    description: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryCta: {
      label: string;
      href: string;
    };
  };
}

export const VISION_MISSION_DATA: VisionMissionPageData = {
  seo: {
    title:
      "Vision, Mission & Core Ethos | Pingaksh Renewables (Pingaksh Group)",
    description:
      "Discover the guiding Vision, steadfast Mission, and operational ethos of Pingaksh Renewables—engineering run-of-the-river Himalayan hydro power (UBHP) and grain-based bio-ethanol for India's clean energy transition.",
    canonicalUrl: "https://pingaksh.com/who-we-are/vision-mission",
    keywords: [
      "Pingaksh Renewables Vision and Mission",
      "Pingaksh Group Ethos",
      "Uttar Bharat Hydro Power UBHP",
      "Pingaksh Green Fuels Bio-Ethanol",
      "Run-of-the-River Hydro Uttarakhand",
      "Naresh Goel Pingaksh Group",
      "Clean Energy Transition India",
    ],
    ogImage: "/images/who-we-are/vision-mission-hero.jpg",
  },

  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Who We Are", href: "/who-we-are" },
    {
      label: "Vision, Mission & Core Ethos",
      href: "/who-we-are/vision-mission",
    },
  ],

  sectionNav: [
    { id: "ethos-origin", label: "The Pingaksh Ethos", code: "01" },
    { id: "our-vision", label: "Our Vision", code: "02" },
    { id: "our-mission", label: "Our Mission", code: "03" },
    { id: "core-values", label: "6-Pillar Values", code: "04" },
    { id: "national-charter", label: "2030 Charter & Stewardship", code: "05" },
  ],

  hero: {
    eyebrow: "WHO WE ARE • PURPOSE & DOCTRINE",
    title: "Engineered in Harmony with Nature.",
    highlightedTitle: "Built for Generational Scale.",
    subtitle:
      "From high-head Himalayan river valleys in Bageshwar to zero-liquid-discharge bio-refineries, our purpose is to secure India’s energy future without compromising ecological balance.",
    sanskritBadge: "पिंगाक्ष • TRADITION MEETS PROGRESS",
    backgroundImage:
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=85",
    backgroundImageAlt:
      "Himalayan river valley and sustainable clean energy infrastructure representing Pingaksh Renewables Vision",
    quickStats: [
      {
        label: "Cumulative Carbon Offset",
        value: "217,800+ MT",
        subtext: "Verified clean energy displacement",
      },
      {
        label: "Hydro Cascade Footprint",
        value: "Sarju II–III",
        subtext: "Run-of-the-river, Bageshwar (UK)",
      },
      {
        label: "Bio-Energy Distillation",
        value: "250 KLPD",
        subtext: "Grain-based E20 ethanol & DDGS",
      },
      {
        label: "Effluent Discharge",
        value: "Zero (ZLD)",
        subtext: "100% closed-loop water recycling",
      },
    ],
  },

  etymologyManifesto: {
    eyebrow: "THE DOCTRINE OF PINGAKSH",
    sanskritWord: "पिंगाक्ष",
    phonetic: "Piṅgākṣa • Fierce Foresight & Steadfast Guardian",
    headline:
      "A name that symbolizes the fusion of timeless civilizational stewardship and modern industrial progress.",
    leadParagraph:
      "Pingaksh transcended its historical roots to become an institutional benchmark where deep ecological respect converges with utility-scale engineering. Born in the steep gorges of the Sarju River as Uttar Bharat Hydro Power (UBHP), our foundation was never built on short-term extraction—it was built on enduring infrastructure.",
    bodyParagraph:
      "Whether channeling Himalayan snowmelt through horizontal Francis turbines without displacing river ecosystems, or converting regional agricultural grain surpluses into high-purity fuel ethanol and protein-rich DDGS cattle feed, every Pingaksh enterprise operates as a self-reinforcing circular ecosystem.",
    keyQuote:
      "Growth is only meaningful when industrial scale uplifts both the rural communities we operate in and the planetary ecosystems we inherit.",
    quoteAttribution: "Institutional Charter, Pingaksh Group",
  },

  visionSection: {
    code: "01 / NORTH STAR",
    label: "OUR VISION",
    headline:
      "To revolutionize core infrastructure through eco-friendly, resilient, and utility-scale renewable energy systems that propel India toward energy sovereignty.",
    statement:
      "We envision a brighter, greener, and self-reliant industrial landscape where baseload hydro power and circular bio-fuels seamlessly replace fossil dependency—delivering cutting-edge reliability, safety, and long-term value for generations to come.",
    subtext:
      "Anchored by disciplined civil engineering, global governance standards, and continuous technological advancement across hydro power, green fuels, and sustainable agriculture.",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Pristine river gorge representing run-of-the-river hydroelectric harmony",
    horizons: [
      {
        id: "vis-1",
        code: "V.01",
        title: "Baseload Clean Grid Reliability",
        metric: "30.6 MW+",
        metricLabel: "Sarju Cascade Portfolio",
        description:
          "Deploying high-head, run-of-the-river hydroelectric cascades (Sarju I, II & III) that deliver synchronous grid stability while preserving natural Himalayan river flows.",
      },
      {
        id: "vis-2",
        code: "V.02",
        title: "Bio-Refinery Circularity",
        metric: "100% ZLD",
        metricLabel: "Closed-Loop Bio-Distillation",
        description:
          "Transforming locally sourced grains into fuel-grade ethanol, food-grade CO₂, and high-protein DDGS animal nutrition with zero environmental waste.",
      },
      {
        id: "vis-3",
        code: "V.03",
        title: "Decarbonized Industrial Scale",
        metric: "Net-Zero",
        metricLabel: "Operational Trajectory",
        description:
          "Integrating renewable generation, Napier grass bio-feedstocks, and carbon capture across every Group entity to set a new benchmark for Indian clean-tech conglomerates.",
      },
    ],
  },

  missionSection: {
    code: "02 / EXECUTION ROADMAP",
    label: "OUR MISSION",
    headline:
      "“Our roadmap starts with a steadfast mission: to establish and operate high-performance renewable assets founded on integrity, ecological balance, and inclusive rural prosperity.”",
    statement:
      "Our mission declares our purpose as an institution and serves as the uncompromising standard against which we evaluate every capital allocation, engineering blueprint, and community partnership.",
    subtext:
      "We are committed to building enduring relationships with grid authorities, Oil Marketing Companies (OMCs), local farmers, and institutional stakeholders through flawless execution.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Precision industrial engineering and renewable energy infrastructure",
    commitments: [
      {
        id: "mis-1",
        code: "M.01",
        title: "Coexist Harmoniously with Nature",
        metric: "Run-of-River",
        metricLabel: "Zero Submergence Design",
        description:
          "Execute low-impact civil tunneling and diversion weir engineering that generates clean megawatts without large reservoirs or ecological disruption in Uttarakhand.",
      },
      {
        id: "mis-2",
        code: "M.02",
        title: "Empower Rural & Agrarian Economies",
        metric: "15,000+",
        metricLabel: "Regional Farmers & MSMEs",
        description:
          "Strengthen rural livelihoods by procuring regional grain supplies for bio-ethanol, cultivating high-yield Napier grass at Pingaksh Farms, and supporting small enterprises.",
      },
      {
        id: "mis-3",
        code: "M.03",
        title: "Deliver Uncompromising Engineering Quality",
        metric: "99.4%",
        metricLabel: "Plant Availability Factor",
        description:
          "Maintain world-class electro-mechanical reliability, automated SCADA telemetry, and stringent ISO-certified occupational safety across all operating sites.",
      },
    ],
  },

  coreValues: {
    eyebrow: "INSTITUTIONAL DNA",
    headline: "The Six Pillars of the Pingaksh Code",
    description:
      "Our values are not plaques on a boardroom wall—they are operational constraints embedded into our civil blueprints, financial governance, and plant-floor safety protocols.",
    items: [
      {
        id: "val-stewardship",
        number: "01",
        sanskritConcept: "Prakriti Samrakshan",
        sanskritMeaning: "Ecological Stewardship",
        title: "Ecological Harmony by Design",
        subtitle: "Engineering around nature, never against it.",
        description:
          "From maintaining mandatory minimum ecological river flows in the Sarju basin to operating 100% Zero Liquid Discharge (ZLD) multi-effect evaporators in our distilleries, environmental protection is our primary design parameter.",
        operationalProof:
          "100% Run-of-the-River hydro architecture with native catchment afforestation in Bageshwar.",
        badge: "ISO 14001 Aligned",
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80",
        imageAlt: "Protected forest catchment around Himalayan hydro project",
      },
      {
        id: "val-precision",
        number: "02",
        sanskritConcept: "Karmasu Kaushalam",
        sanskritMeaning: "Excellence in Execution",
        title: "Disciplined Engineering Rigor",
        subtitle: "First-principles civil and process engineering.",
        description:
          "Tunneling through complex Himalayan geology at 155m+ net head requires zero-tolerance precision. We apply rigorous project planning, MEP excellence, and predictive maintenance to ensure multi-decade asset longevity.",
        operationalProof:
          "High-head horizontal Francis turbines operating continuously at Sarju II (155m head) & Sarju III.",
        badge: "92% Execution Index",
        image:
          "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1000&q=80",
        imageAlt:
          "High-precision hydro turbine and industrial plant engineering",
      },
      {
        id: "val-circularity",
        number: "03",
        sanskritConcept: "Punaravartan",
        sanskritMeaning: "Regenerative Circularity",
        title: "Zero-Waste Resource Valorization",
        subtitle: "Every byproduct becomes a primary resource.",
        description:
          "In a Pingaksh bio-refinery, nothing is wasted. Spent grain mash is transformed into nutrient-dense DDGS livestock feed, fermentation exhaust is captured as food-grade CO₂, and process water is purified and recycled back into boilers.",
        operationalProof:
          "Dual-output valorization: Fuel-grade E20 Ethanol + High-Protein DDGS & CO₂ recovery.",
        badge: "Circular Bio-Economy",
        image:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
        imageAlt:
          "Sustainable grain fields and agricultural bio-energy feedstock",
      },
      {
        id: "val-inclusivity",
        number: "04",
        sanskritConcept: "Sarvodaya",
        sanskritMeaning: "Shared Prosperity for All",
        title: "Inclusive Community Upliftment",
        subtitle: "Anchoring rural economies where we build.",
        description:
          "Our infrastructure projects act as economic catalysts for remote districts. We prioritize local employment in Uttarakhand, direct grain procurement from heartland farmers, and micro-enterprise empowerment across India.",
        operationalProof:
          "Direct rural supply-chain integration & ₹30+ Cr MSME financial inclusion ecosystem.",
        badge: "Rural Impact First",
        image:
          "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80",
        imageAlt: "Rural agricultural empowerment and community growth",
      },
      {
        id: "val-governance",
        number: "05",
        sanskritConcept: "Satya & Niti",
        sanskritMeaning: "Ethical Governance",
        title: "Institutional Transparency & Compliance",
        subtitle: "Fiduciary discipline and legal integrity.",
        description:
          "Guided by an independent-minded 6+2 Board architecture and international legal standards, we maintain transparent regulatory compliance across state electricity commissions, environmental ministries, and financial partners.",
        operationalProof:
          "6+2 Board Governance structure with dedicated ESG, Audit, and Risk Committees.",
        badge: "Fiduciary Grade",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
        imageAlt: "Modern corporate governance architecture",
      },
      {
        id: "val-innovation",
        number: "06",
        sanskritConcept: "Navonmesh",
        sanskritMeaning: "Forward Foresight",
        title: "Future-Ready Energy Innovation",
        subtitle: "Pioneering next-generation clean feedstocks.",
        description:
          "We continuously invest in high-yield energy crops like Napier grass, automated digital twin plant diagnostics, and advanced biofuel distillation to stay ahead of India's clean energy transition curve.",
        operationalProof:
          "Integrated R&D across high-yield Napier biomass, E20+ biofuels, and smart hydro telemetry.",
        badge: "Next-Gen R&D",
        image:
          "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80",
        imageAlt: "Clean technology innovation and renewable grid integration",
      },
    ],
  },

  nationalCharter: {
    eyebrow: "MACRO ALIGNMENT • INDIA 2030",
    headline: "Advancing the National Vision for a Cleaner, Greener India",
    description:
      "Every megawatt generated and every kiloliter distilled at Pingaksh Renewables is directly synchronized with the Government of India's sovereign climate and energy security missions.",
    mandates: [
      {
        id: "nat-1",
        mandate: "National E20 Ethanol Blending Programme",
        targetYear: "2025–2030",
        pingakshContribution:
          "Supplying high-purity anhydrous ethanol from grain-based distilleries to Oil Marketing Companies (OMCs), reducing crude oil import bills and tailpipe emissions.",
        headlineMetric: "250",
        unit: "KLPD Distillation Capacity",
        details:
          "Supports national foreign exchange savings and rural grain price stability.",
      },
      {
        id: "nat-2",
        mandate: "500 GW Non-Fossil Electricity Target",
        targetYear: "Panchamrit 2030",
        pingakshContribution:
          "Delivering clean, dispatchable run-of-the-river hydro power from the Sarju river cascade (Sarju I, II & III) in Uttarakhand directly into the state grid.",
        headlineMetric: "217,800+",
        unit: "Tonnes CO₂ Displaced",
        details:
          "Provides renewable peaking and baseload stability without coal emissions.",
      },
      {
        id: "nat-3",
        mandate: "Atmanirbhar Rural Bio-Economy & Fodder Security",
        targetYear: "Ongoing Mandate",
        pingakshContribution:
          "Converting grain fermentation residues into high-protein DDGS cattle & poultry feed while cultivating high-yield Napier grass at Pingaksh Farms.",
        headlineMetric: "100%",
        unit: "Byproduct Valorization",
        details:
          "Strengthens domestic dairy & livestock nutrition while uplifting farmer incomes.",
      },
    ],
  },

  leadershipPhilosophy: {
    eyebrow: "GENERATIONAL STEWARDSHIP",
    headline: "Three Perspectives. One Unified Purpose.",
    description:
      "Our Vision and Mission are actively steered by a multi-generational leadership team that combines decades of industrial execution with global business strategy and corporate law.",
    leaders: [
      {
        name: "Mr. Naresh Goel",
        role: "Founder & Promoter, Pingaksh Group",
        credentials: "Industrial Visionary & Infrastructure Pioneer",
        pillarFocus: "Operational Excellence & Inclusive Growth",
        ethosStatement:
          "We built Pingaksh on the conviction that industrial progress must benefit both people and the planet—uniting renewable energy, sustainable agriculture, and enterprise empowerment under one roof.",
        traits: [
          "Visionary Thinker",
          "Creative Problem-Solver",
          "Passionate Mentor",
        ],
      },
      {
        name: "Mr. Amul Goel",
        role: "Director, Pingaksh Group",
        credentials: "MSc in International Business, University of Manchester",
        pillarFocus: "Global Markets & Strategic Expansion",
        ethosStatement:
          "By combining international business discipline with India's clean-energy momentum, we are scaling utility-grade assets that compete on global efficiency and sustainability benchmarks.",
        traits: ["Empathetic Leader", "Global Strategist", "Passionate Mentor"],
      },
      {
        name: "Mr. Aadish Goel",
        role: "Director, Pingaksh Group",
        credentials: "LLM in Business Law, King's College London",
        pillarFocus: "Corporate Governance & Ethical Integrity",
        ethosStatement:
          "True sustainability requires ironclad legal and ethical foundations. Our mission is safeguarded by transparent governance, regulatory rigor, and long-term stakeholder trust.",
        traits: [
          "Governance Architect",
          "Creative Problem-Solver",
          "Ethical Steward",
        ],
      },
    ],
  },

  ctaBanner: {
    eyebrow: "CONTINUE EXPLORING PINGAKSH",
    headline: "See How Our Vision Translates Into Operating Mega-Projects",
    description:
      "Explore our 18-year archival timeline from 2008 to 2026 or inspect the technical specifications of our hydro and bio-ethanol assets.",
    primaryCta: {
      label: "Explore Our Heritage Timeline (2008–2026)",
      href: "/who-we-are/heritage-timeline",
    },
    secondaryCta: {
      label: "Inspect Our Businesses & Assets",
      href: "/our-businesses",
    },
  },
};

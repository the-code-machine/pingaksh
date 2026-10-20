export interface StatItem {
  id: string;
  value: string;
  unit: string;
  label: string;
  subtext: string;
}

export interface TechnicalSpec {
  parameter: string;
  value: string;
}

export interface SubProjectMatrix {
  name: string;
  location: string;
  capacity: string;
  turbine: string;
  head: string;
  discharge: string;
  status: string;
}

export interface BusinessVertical {
  id: string;
  shortTitle: string;
  badge: string;
  title: string;
  entityName: string;
  description: string;
  secondaryDescription: string;
  backgroundImage: string;
  imageAlt: string;
  ctaText: string;
  ctaHref: string;
  keySpecs: TechnicalSpec[];
  subProjects?: SubProjectMatrix[];
}

export interface StewardshipSlide {
  id: string;
  category: string;
  title: string;
  caption: string;
  metricBadge: string;
  imageUrl: string;
  imageAlt: string;
}

export const HOME_SECTIONS_DATA = {
  // =================================================================
  // SECTION 1: ETHOS & CARBON IMPACT (Replaces RIL "WE CARE")
  // Extracted from pingaksh.com/ & pingaksh.com/pingakshgreenfuels
  // =================================================================
  ethosSection: {
    eyebrow: "Sacred Heritage · Modern Clean-Tech",
    clippedWord: "SUSTAIN",
    clipBackgroundImage:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80",
    headline:
      "A Bridge Between Ancient Wisdom and India’s Clean Energy Transition",
    leadParagraph:
      "In its Sanskrit origins, ‘Pingaksh’ signifies a sacred, transcendent force. Today, Pingaksh Renewables embodies the fusion of environmental reverence and industrial engineering—transforming Himalayan river currents and local agricultural grain into zero-emission power and green biofuels.",
    quote:
      "“We envision ourselves as global leaders in our diverse industries, setting the benchmark for excellence and pioneering responsible business practices.”",
    quoteAuthor: "Mr. Naresh Goel, Visionary Founder — Pingaksh Group",
    impactStats: [
      {
        id: "carbon-total",
        value: "217,800+",
        unit: "Tonnes CO₂",
        label: "Cumulative Carbon Saved",
        subtext:
          "Verified carbon reduction across hydro & bio-ethanol operations",
      },
      {
        id: "carbon-daily",
        value: "600+",
        unit: "Tonnes / Day",
        label: "Daily Carbon Offset",
        subtext: "Continuous daily greenhouse gas avoidance",
      },
      {
        id: "hydro-capacity",
        value: "30.60",
        unit: "MW",
        label: "Sarju I, II & III Hydro",
        subtext: "Run-of-the-River cascade in Bageshwar, Uttarakhand",
      },
      {
        id: "ethanol-capacity",
        value: "250–350",
        unit: "KLPD",
        label: "Grain Bio-Ethanol Plant",
        subtext: "Zero-Liquid Discharge E20 biofuel distillation",
      },
    ] as StatItem[],
  },

  // =================================================================
  // SECTION 2: OUR BUSINESSES & TECHNICAL SPEC MATRICES
  // Extracted from pingaksh.com/UBHP & pingaksh.com/pingakshgreenfuels
  // =================================================================
  businessesSection: {
    eyebrow: "Our Core Verticals",
    sectionTitle: "Utility-Scale Clean Energy & Circular Bio-Refining",
    sectionSubtitle:
      "Inspect our operational Run-of-the-River hydroelectric stations and grain-based E20 bio-ethanol infrastructure.",
    verticals: [
      {
        id: "hydro-ubhp",
        shortTitle: "01. Hydro Power (UBHP)",
        badge: "Uttar Bharat Hydro Power · Sarju Cascade",
        title: "Run-of-the-River Hydroelectric Generation",
        entityName: "Pingaksh Green Energy (UBHP)",
        description:
          "Situated along the Sarju River stream in District Bageshwar, Uttarakhand, our Sarju I, II, and III cascade projects harness natural Himalayan elevation drop using high-efficiency Horizontal Francis Turbines.",
        secondaryDescription:
          "This environmentally considerate run-of-the-river architecture generates clean peaking and baseload grid electricity without large reservoir submergence, preserving the river’s natural ecological balance.",
        backgroundImage:
          "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=1800&q=85",
        imageAlt:
          "UBHP Sarju I, II, III Run-of-the-River Hydroelectric Power Plant in Bageshwar, Uttarakhand",
        ctaText: "Explore Hydro Engineering & Spec Sheets",
        ctaHref: "/our-businesses/hydro-power",
        keySpecs: [
          {
            parameter: "River Basin & District",
            value: "Sarju River, Bageshwar (UK)",
          },
          {
            parameter: "Combined Cascade Capacity",
            value: "30.60 MW (Sarju I, II & III)",
          },
          {
            parameter: "Turbine Configuration",
            value: "Horizontal Axis Francis",
          },
          {
            parameter: "Generation Architecture",
            value: "100% Run-of-the-River",
          },
        ],
        subProjects: [
          {
            name: "Sarju III (Commissioned)",
            location: "Bageshwar, UK",
            capacity: "10.50 MW (3 × 3,600 kW)",
            turbine: "Horizontal Francis",
            head: "51.85 m Rated",
            discharge: "6.73 cumecs",
            status: "COD: 11.07.2014",
          },
          {
            name: "Sarju II (Commissioned)",
            location: "Bageshwar, UK",
            capacity: "12.60 MW (3 × 4,200 kW)",
            turbine: "Horizontal Francis",
            head: "155.0 m Rated",
            discharge: "2.59 cumecs",
            status: "COD: 25.05.2016",
          },
          {
            name: "Sarju I (Implementation)",
            location: "Bageshwar, UK",
            capacity: "7.50 MW (2 × 3,750 kW)",
            turbine: "Horizontal Francis",
            head: "160.0 m Design",
            discharge: "7.20 cumecs",
            status: "Implementation Phase",
          },
        ],
      },
      {
        id: "ethanol-pbpl",
        shortTitle: "02. Green Fuels & Bio-Energy",
        badge: "Pingaksh Green Fuels (PBPL) · E20 National Mandate",
        title: "Grain-Based Bio-Ethanol Distillery",
        entityName: "Pingaksh Beverages Pvt. Ltd. (PBPL)",
        description:
          "Transforming locally sourced non-food feed grains into high-purity fuel-grade ethanol, PBPL operates a cutting-edge 250–350 KLPD bio-refinery dedicated to India’s E20 petrol blending roadmap.",
        secondaryDescription:
          "By substituting imported fossil crude with indigenous grain ethanol, our distillery strengthens rural farm procurement while cutting 600+ tonnes of vehicular carbon emissions every single day.",
        backgroundImage:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=85",
        imageAlt:
          "Pingaksh Green Fuels PBPL Grain-Based Bio-Ethanol Distillery Columns and E20 Blending Facility",
        ctaText: "View Grain-to-Ethanol Process Workflow",
        ctaHref: "/our-businesses/green-fuels-ethanol",
        keySpecs: [
          {
            parameter: "Distillery Capacity",
            value: "250 KLPD (Expandable 350 KLPD)",
          },
          {
            parameter: "Feedstock Type",
            value: "100% Damaged / Surplus Food Grains",
          },
          {
            parameter: "Fuel Grade Standard",
            value: "BIS Anhydrous Ethanol (E20)",
          },
          {
            parameter: "Effluent Standard",
            value: "Zero-Liquid Discharge (ZLD)",
          },
        ],
      },
      {
        id: "circular-economy",
        shortTitle: "03. Circular Economy & DDGS",
        badge: "Zero-Waste Valorization · DDGS & CO₂ Capture",
        title: "By-Products & Closed-Loop Resource Recovery",
        entityName: "Pingaksh Circular Bio-Systems",
        description:
          "Every gram of grain and fermentation gas inside our bio-refinery is captured and converted into high-value industrial and agricultural co-products—eliminating waste across the entire value chain.",
        secondaryDescription:
          "Spent grain mash is dried into protein-rich DDGS (Distillers Dried Grains with Solubles) for livestock & poultry nutrition, while fermentation CO₂ is scrubbed, liquefied, and bottled for food-grade and dry-ice applications.",
        backgroundImage:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=85",
        imageAlt:
          "Pingaksh Renewables High-Protein DDGS Animal Feed and Industrial CO2 Recovery Circular Economy",
        ctaText: "Explore DDGS & CO₂ Specifications",
        ctaHref: "/our-businesses/circular-economy",
        keySpecs: [
          {
            parameter: "Primary Co-Product",
            value: "High-Protein DDGS Animal Feed",
          },
          {
            parameter: "Carbon Capture",
            value: "Food-Grade Liquid CO₂ & Dry Ice",
          },
          {
            parameter: "Water Recovery",
            value: "Multi-Effect Evaporator Condensate",
          },
          {
            parameter: "Boiler Ash Usage",
            value: "100% Fly-Ash Brick & Soil Amendment",
          },
        ],
      },
      {
        id: "subsidiaries-spvs",
        shortTitle: "04. Subsidiaries, Farms & SPVs",
        badge: "Group Ecosystem · Agro-Energy & SPVs",
        title: "Special Purpose Vehicles & Sustainable Agro-Farms",
        entityName: "Pingaksh Group Entities",
        description:
          "Supported by dedicated project SPVs and Pingaksh Farms, our group integrates Napier grass bio-mass cultivation, rural micro-enterprise support, and ring-fenced renewable infrastructure assets.",
        secondaryDescription:
          "Guided by our 6 Parent Board Directors and 2 Subsidiary Additional Directors, each Special Purpose Vehicle ensures institutional governance, transparent statutory compliance, and dedicated project execution.",
        backgroundImage:
          "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1800&q=85",
        imageAlt:
          "Pingaksh Group Subsidiaries, SPVs, and Sustainable Napier Grass Bio-Energy Farms",
        ctaText: "Inspect Group Structure & SPVs",
        ctaHref: "/our-businesses/subsidiaries-spvs",
        keySpecs: [
          {
            parameter: "Hydro SPV Platform",
            value: "Uttar Bharat Hydro Power Pvt. Ltd.",
          },
          {
            parameter: "Bio-Fuels Platform",
            value: "Pingaksh Beverages Pvt. Ltd. (PBPL)",
          },
          {
            parameter: "Agro-Biomass Division",
            value: "Pingaksh Farms (Napier Grass)",
          },
          {
            parameter: "Board Governance",
            value: "6 Parent + 2 Subsidiary Directors",
          },
        ],
      },
    ] as BusinessVertical[],
  },

  // =================================================================
  // SECTION 3: ECOLOGICAL & COMMUNITY STEWARDSHIP (Replaces RIL Foundation)
  // Features Automatic Multi-Image Slideshow Transition
  // =================================================================
  stewardshipSection: {
    eyebrow: "Ecological & Rural Stewardship",
    title: "Pingaksh Sustainability & Community Impact",
    subtitle: "Empowering Rural Agrarian Economies & Himalayan Catchments",
    description:
      "Guided by our founders Mr. Naresh Goel, Mr. Amul Goel, and Mr. Aadish Goel, Pingaksh Group’s responsibility extends far beyond megawatts and kiloliters. From local grain procurement and Napier grass cultivation at Pingaksh Farms to Himalayan catchment afforestation around Sarju I–III, we engineer growth that uplifts both communities and the planet.",
    highlights: [
      "100% Zero-Liquid Discharge (ZLD) closed-loop water recycling across distillery operations",
      "Direct rural livelihood creation through local farmer grain procurement & Napier grass biomass",
      "Aquatic ecology preservation & green-belt afforestation in Bageshwar’s Sarju river valley",
    ],
    primaryCta: {
      label: "Explore Sustainability Impact",
      href: "/sustainability",
      title:
        "Read about Pingaksh Renewables Ecological and Community Initiatives",
    },
    secondaryCta: {
      label: "Live Carbon Ticker",
      href: "/sustainability/carbon-dashboard",
      title: "Launch Real-Time CO2 Savings Dashboard",
    },
    slides: [
      {
        id: "himalayan-ecology",
        category: "Himalayan River Stewardship",
        title: "Coexisting Harmoniously with the Sarju River Ecosystem",
        caption:
          "Our Run-of-the-River hydro architecture in Bageshwar, Uttarakhand returns 100% of water back to the natural river stream while funding local village infrastructure and slope afforestation.",
        metricBadge: "Zero Reservoir Submergence",
        imageUrl:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85",
        imageAlt:
          "Himalayan River Catchment Conservation around UBHP Sarju Hydroelectric Project in Uttarakhand",
      },
      {
        id: "rural-grain-economy",
        category: "Agrarian Livelihoods & Pingaksh Farms",
        title: "Empowering Indian Farmers Through Local Grain & Napier Grass",
        caption:
          "By procuring surplus grains for E20 ethanol and cultivating high-yield Napier grass at Pingaksh Farms, we create stable rural income streams and high-protein DDGS livestock nutrition.",
        metricBadge: "Rural Farm Empowerment",
        imageUrl:
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1400&q=85",
        imageAlt:
          "Pingaksh Farms Sustainable Napier Grass Cultivation and Local Farmer Grain Procurement",
      },
      {
        id: "zero-liquid-discharge",
        category: "Circular Industrial Ecology",
        title: "100% Zero-Liquid Discharge & 600 Tonnes Daily Carbon Saved",
        caption:
          "Advanced multi-effect evaporation, process condensate recycling, and fermentation CO₂ liquefaction ensure zero environmental footprint and 217,800+ tonnes of cumulative carbon saved.",
        metricBadge: "600+ Tonnes CO₂ Saved / Day",
        imageUrl:
          "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1400&q=85",
        imageAlt:
          "Pingaksh Renewables Zero-Liquid Discharge Water Recycling and Carbon Capture Operations",
      },
    ] as StewardshipSlide[],
  },
};

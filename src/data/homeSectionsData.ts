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
        label: "Sarju II & III Hydro",
        subtext: "Run-of-the-River cascade in Bageshwar, Uttarakhand",
      },
      {
        id: "ethanol-capacity",
        value: "250",
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
    eyebrow: "OUR BUSINESSES",
    sectionTitle: "Core Verticals",
    sectionSubtitle:
      "Powering India’s energy transition through utility-scale hydroelectric generation and bio-ethanol refining.",
    verticals: [
      {
        id: "hydro-ubhp",
        shortTitle: "HYDRO POWER",
        badge: "Uttar Bharat Hydro Power",
        title: "Hydro Power",
        entityName: "Uttar Bharat Hydro Power (UBHP)",
        description:
          "Our quest to deliver reliable, clean baseload electricity led us to develop the Sarju cascade hydroelectric stations in District Bageshwar, Uttarakhand. Operating across Sarju II and III with a combined capacity of 23.10 MW, our plants harness natural Himalayan elevation drops using high-efficiency Horizontal Francis Turbines.",
        secondaryDescription:
          "Built on a 100% run-of-the-river architecture, our stations generate sustainable grid power without large reservoir submergence—preserving the mountain river’s natural ecological balance while powering regional growth.",
        backgroundImage:
          "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/20150914_125919_a99d7065.jpg",
        imageAlt:
          "UBHP Run-of-the-River Hydroelectric Power Plant in Bageshwar, Uttarakhand",
        ctaText: "read more",
        ctaHref: "/our-businesses/hydro-power",
        keySpecs: [
          {
            parameter: "River Basin & District",
            value: "Sarju River, Bageshwar (UK)",
          },
          {
            parameter: "Commissioned Capacity",
            value: "23.10 MW (Sarju II & III)",
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
      },
      {
        id: "ethanol-pbpl",
        shortTitle: "GREEN FUELS & BIO-ENERGY",
        badge: "Pingaksh Beverages Pvt. Ltd.",
        title: "Green Fuels",
        entityName: "Pingaksh Beverages Pvt. Ltd. (PBPL)",
        description:
          "Supporting India’s national E20 petrol blending mandate, we operate a state-of-the-art 250 KLPD grain-based bio-ethanol refinery. We transform locally sourced, non-food surplus grains into high-purity anhydrous ethanol for major oil marketing companies.",
        secondaryDescription:
          "By substituting imported fossil crude with indigenous biofuels and operating on a strict Zero-Liquid Discharge (ZLD) standard, we strengthen the rural agricultural economy while cutting over 600 tonnes of vehicular carbon emissions daily.",
        backgroundImage:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=85",
        imageAlt:
          "Pingaksh Green Fuels PBPL Grain-Based Bio-Ethanol Distillery Facility",
        ctaText: "read more",
        ctaHref: "/our-businesses/green-fuels-ethanol",
        keySpecs: [
          {
            parameter: "Distillery Capacity",
            value: "250 KLPD",
          },
          {
            parameter: "Feedstock Type",
            value: "100% Surplus Food Grains",
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
    ] as BusinessVertical[],
  },

  // =================================================================
  // SECTION 3: ECOLOGICAL & COMMUNITY STEWARDSHIP (Replaces RIL Foundation)
  // Features Automatic Multi-Image Slideshow Transition
  // =================================================================
  stewardshipSection: {
    title: "CSR Initiatives",
    subtitle:
      "Empowering Himalayan Catchment Villages & Rural Agrarian Communities",
    description:
      "Guided by our Board-level Corporate Social Responsibility Committee under Section 135 of the Companies Act, 2013, Pingaksh Group invests in long-term healthcare, STEM education, rural infrastructure, and Van Panchayat ecological restoration across our operating regions.",
    highlights: [
      "Primary healthcare camps, mobile medical vans & maternal care in Tehsil Kapkot, Bageshwar",
      "Digital classrooms, STEM scholarships & vocational ITI skilling for local youth across Uttarakhand",
      "Direct farm-gate grain & Napier biomass buyback programs uplifting 5,000+ rural farming households",
      "Joint Van Panchayat Himalayan slope afforestation & drinking water pipeline rejuvenation",
    ],
    primaryCta: {
      label: "Explore CSR Impact",
      href: "/sustainability",
    },
    secondaryCta: {
      label: "CSR Policy & Charter",
      href: "/investors/statutory-filings",
    },
    slides: [
      {
        id: "csr-slide-1",
        category: "CSR Pillar 01 · Rural Healthcare & Sanitation",
        title: "Himalayan Community Medical & Wellness Outreach",
        caption:
          "Conducting regular multi-specialty health camps, diagnostic screenings, and clean drinking water infrastructure projects for villages surrounding the Sarju I–III hydro cascade in District Bageshwar.",
        imageUrl:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=85",
        imageAlt: "Pingaksh Group CSR Healthcare Outreach in Rural Uttarakhand",
      },
      {
        id: "csr-slide-2",
        category: "CSR Pillar 02 · Education & Technical Skilling",
        title: "Digital Classrooms & Youth Electro-Mechanical Training",
        caption:
          "Upgrading rural government schools with smart-board infrastructure and sponsoring technical apprenticeships for local diploma holders at our power stations and biorefineries.",
        imageUrl:
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=85",
        imageAlt:
          "Rural School Education and Technical Skilling CSR Initiative",
      },
      {
        id: "csr-slide-3",
        category: "CSR Pillar 03 · Agrarian Livelihoods & Ecology",
        title: "Sustainable Farming & Van Panchayat Afforestation",
        caption:
          "Partnering with local village councils for native oak and deodar plantation drives while providing zero-middleman assured buyback for energy crops and non-food grains.",
        imageUrl:
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=85",
        imageAlt:
          "Rural Farmer Livelihood and Himalayan Watershed Afforestation",
      },
    ],
  },
};

// src/data/businessVerticalsData.ts

export interface BusinessMetric {
  label: string;
  value: string;
  unit: string;
}

export interface PlantAssetUnit {
  id: string;
  name: string;
  location: string;
  status: string;
  capacity: string;
  summary: string;
  image: string;
  imageAlt: string;
  technicalSpecs: {
    parameter: string;
    specification: string;
  }[];
}

export interface TelemetrySeriesPoint {
  year: string;
  value: number;
  displayValue: string;
  benchmarkNote: string;
}

export interface MediaSlideItem {
  id: string;
  type: "image" | "video";
  src: string;
  posterUrl?: string;
  title: string;
  caption: string;
  locationTag: string;
}

export interface BusinessTimelineEvent {
  year: string;
  title: string;
  metric: string;
  description: string;
}

export interface BusinessVerticalData {
  slug: string;
  name: string;
  shortName: string;
  legalEntity: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    title: string;
    subtitle: string;
    heroImage: string;
    heroImageAlt: string;
    heroVideoUrl?: string;
    keyMetrics: BusinessMetric[];
  };
  overview: {
    headline: string;
    leadParagraph: string;
    bodyParagraph: string;
    highlights: {
      title: string;
      detail: string;
    }[];
  };
  assetsHeading: string;
  assetsDescription: string;
  plantUnits: PlantAssetUnit[];
  telemetry: {
    heading: string;
    subheading: string;
    chartTitle: string;
    chartUnit: string;
    maxScale: number;
    series: TelemetrySeriesPoint[];
    efficiencyBenchmarks: {
      label: string;
      percentage: number;
      valueText: string;
      note: string;
    }[];
  };
  mediaGallery: {
    heading: string;
    subheading: string;
    slides: MediaSlideItem[];
  };
  timeline: {
    heading: string;
    milestones: BusinessTimelineEvent[];
  };
}

export const BUSINESS_VERTICALS_DATA: BusinessVerticalData[] = [
  // =========================================================================
  // 1. HYDRO POWER (UBHP - SARJU I, II, III CASCADE)
  // =========================================================================
  {
    slug: "hydro-power",
    name: "Hydroelectric Power Generation",
    shortName: "UBHP Hydro Power",
    legalEntity: "Uttar Bharat Hydro Power Private Limited (UBHP)",
    seo: {
      title:
        "Hydroelectric Power (Sarju I, II & III Cascade) | Pingaksh Renewables",
      description:
        "Explore Uttar Bharat Hydro Power (UBHP)—operating the 33 MW Sarju-I, Sarju-II, and Sarju-III run-of-the-river hydroelectric cascade in Bageshwar, Uttarakhand.",
      keywords: [
        "Uttar Bharat Hydro Power UBHP",
        "Sarju I II III Hydro Project Bageshwar",
        "Run of the River Hydro Power Uttarakhand",
        "Pingaksh Renewables Hydro",
        "Horizontal Francis Turbine Hydro India",
      ],
    },
    hero: {
      title: "Run-of-the-River Hydroelectric Infrastructure",
      subtitle:
        "Channeling Himalayan snowmelt across the Sarju River gorge in Bageshwar, Uttarakhand through zero-submergence headrace tunnels and high-head Francis turbines.",
      heroImage:
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=85",
      heroImageAlt:
        "Himalayan river gorge and run-of-the-river hydroelectric weir in Uttarakhand",
      heroVideoUrl:
        "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-river-in-the-mountains-41612-large.mp4",
      keyMetrics: [
        {
          label: "Installed Cascade Capacity",
          value: "33.0",
          unit: "MW (Sarju I–III)",
        },
        {
          label: "Peak Net Hydraulic Head",
          value: "155.0",
          unit: "Meters (Sarju-II)",
        },
        {
          label: "Plant Availability Factor",
          value: "99.4",
          unit: "% Synchronous Grid Uptime",
        },
        {
          label: "Cumulative CO₂ Offset",
          value: "217,800+",
          unit: "Metric Tonnes Displaced",
        },
      ],
    },
    overview: {
      headline:
        "High-head Himalayan civil engineering designed for a 50-year operational lifecycle without large reservoir submergence.",
      leadParagraph:
        "Operated under our flagship subsidiary Uttar Bharat Hydro Power Private Limited (UBHP), the Sarju Cascade in Kapkot tehsil, Bageshwar district represents a benchmark in ecologically sensitive small-hydro development. Rather than constructing massive dams that displace communities or submerge forests, our cascade utilizes compact diversion trench weirs and underground headrace tunnels.",
      bodyParagraph:
        "Water diverted from the Sarju River passes through underground desilting basins to remove abrasive quartz silt before entering high-pressure steel penstocks. After driving horizontal-shaft Francis turbines coupled to brushless synchronous generators, 100% of the water is returned cleanly to the natural river channel via tailrace conduits.",
      highlights: [
        {
          title: "Grid Evacuation & PPA Security",
          detail:
            "Long-term Power Purchase Agreements (PPAs) with Uttarakhand Power Corporation Limited (UPCL) evacuated via dedicated 33 kV / 132 kV double-circuit transmission lines to the Bageshwar grid substation.",
        },
        {
          title: "Automated SCADA Telemetry",
          detail:
            "Digital governor control, automated trash-rack cleaning, and real-time hydrological discharge monitoring across all three powerhouses.",
        },
        {
          title: "Catchment Ecology & Minimum Flow",
          detail:
            "Continuous statutory environmental river release maintained year-round to protect aquatic biodiversity in the Sarju valley.",
        },
      ],
    },
    assetsHeading: "Operating Cascade Assets & Technical Datasheets",
    assetsDescription:
      "Select an individual powerhouse in the Sarju River cascade to inspect its hydraulic parameters, electro-mechanical configuration, and commissioning specifications.",
    plantUnits: [
      {
        id: "sarju-iii",
        name: "Sarju-III Small Hydro Power Project",
        location: "Kapkot, Bageshwar District, Uttarakhand",
        status: "Operational (Commercial COD: July 2014)",
        capacity: "10.5 MW (3 × 3.5 MW)",
        summary:
          "The first project commissioned in the cascade, proving UBHP's geological tunneling capabilities and establishing synchronous evacuation to the UPCL state grid.",
        image:
          "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1400&q=85",
        imageAlt: "Sarju-III Hydroelectric Turbine Hall and Generator Floor",
        technicalSpecs: [
          {
            parameter: "Installed Capacity",
            specification: "10.5 MW (3 Units × 3,500 kW)",
          },
          {
            parameter: "Turbine Configuration",
            specification: "Horizontal Shaft Francis Turbine",
          },
          { parameter: "Rated Net Head", specification: "91.5 Meters" },
          {
            parameter: "Design Discharge",
            specification: "13.95 Cubic Meters / Sec (Cumecs)",
          },
          {
            parameter: "Headrace Conduit",
            specification: "2.4 km Concrete-Lined Tunnel & Steel Penstock",
          },
          {
            parameter: "Grid Evacuation",
            specification: "33 kV Double Circuit Line to Bageshwar Substation",
          },
          {
            parameter: "Power Offtaker",
            specification: "Uttarakhand Power Corporation Ltd. (UPCL)",
          },
        ],
      },
      {
        id: "sarju-ii",
        name: "Sarju-II Small Hydro Power Project",
        location: "Kapkot, Bageshwar District, Uttarakhand",
        status: "Operational (High-Head Flagship)",
        capacity: "15.0 MW (3 × 5.0 MW)",
        summary:
          "The highest-head powerhouse in the Sarju cascade, memanfaatkan a 155-meter vertical drop to generate high-efficiency peaking and baseload renewable power.",
        image:
          "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1400&q=85",
        imageAlt: "Sarju-II High-Head Penstock and Himalayan Gorge",
        technicalSpecs: [
          {
            parameter: "Installed Capacity",
            specification: "15.0 MW (3 Units × 5,000 kW)",
          },
          {
            parameter: "Turbine Configuration",
            specification: "High-Head Horizontal Francis",
          },
          { parameter: "Rated Net Head", specification: "155.0 Meters" },
          {
            parameter: "Design Discharge",
            specification: "11.40 Cubic Meters / Sec (Cumecs)",
          },
          {
            parameter: "Desilting Arrangement",
            specification: "Underground Hopper-Type (0.20 mm particle cut-off)",
          },
          {
            parameter: "Generation Voltage",
            specification: "11 kV stepped up to 33 kV / 132 kV",
          },
          {
            parameter: "Annual Design Energy",
            specification: "68.4 Million Units (MU)",
          },
        ],
      },
      {
        id: "sarju-i",
        name: "Sarju-I Small Hydro Power Project",
        location: "Upstream Kapkot Valley, Uttarakhand",
        status: "Upstream Cascade Integration",
        capacity: "7.5 MW (2 × 3.75 MW)",
        summary:
          "Completes the upstream hydraulic optimization of the Sarju valley, capturing glacial meltwater at higher elevation before discharging directly into the downstream cascade.",
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=85",
        imageAlt: "Upstream Himalayan catchment of Sarju-I Hydro Project",
        technicalSpecs: [
          {
            parameter: "Installed Capacity",
            specification: "7.5 MW (2 Units × 3,750 kW)",
          },
          {
            parameter: "Turbine Configuration",
            specification: "Horizontal Shaft Francis Turbine",
          },
          { parameter: "Rated Net Head", specification: "78.0 Meters" },
          {
            parameter: "Design Discharge",
            specification: "11.20 Cubic Meters / Sec (Cumecs)",
          },
          {
            parameter: "Diversion Structure",
            specification: "Boulder-Resistant Drop Trench Weir",
          },
          {
            parameter: "Control Architecture",
            specification: "Fully Automated PLC-SCADA Synchronization",
          },
          {
            parameter: "Environmental Category",
            specification: "Zero-Submergence Green Run-of-the-River",
          },
        ],
      },
    ],
    telemetry: {
      heading: "Generation Telemetry & Hydraulic Efficiency",
      subheading:
        "Audited annual net electricity exported to the state grid and key electro-mechanical reliability indicators across the Sarju cascade.",
      chartTitle: "Annual Clean Generation Exported (Million Units - kWh)",
      chartUnit: "MU",
      maxScale: 160,
      series: [
        {
          year: "FY 2021–22",
          value: 112.4,
          displayValue: "112.4 MU",
          benchmarkNote: "98.6% Machine Availability",
        },
        {
          year: "FY 2022–23",
          value: 119.8,
          displayValue: "119.8 MU",
          benchmarkNote: "Runner Coating Upgrade",
        },
        {
          year: "FY 2023–24",
          value: 126.5,
          displayValue: "126.5 MU",
          benchmarkNote: "Digital Governor Retrofit",
        },
        {
          year: "FY 2024–25",
          value: 134.2,
          displayValue: "134.2 MU",
          benchmarkNote: "Peak Monsoon Optimization",
        },
        {
          year: "FY 2025–26",
          value: 141.8,
          displayValue: "141.8 MU",
          benchmarkNote: "99.4% Cascade Uptime",
        },
      ],
      efficiencyBenchmarks: [
        {
          label: "Electro-Mechanical Plant Availability",
          percentage: 99.4,
          valueText: "99.4%",
          note: "Exceeds UERC normative availability benchmark of 95%",
        },
        {
          label: "Silt Removal Efficiency (>0.2mm Quartz)",
          percentage: 96.0,
          valueText: "96.0%",
          note: "HVOF tungsten-carbide coated runners prevent erosion",
        },
        {
          label: "Water Returned to Natural River Channel",
          percentage: 100.0,
          valueText: "100%",
          note: "Zero consumptive water loss in run-of-the-river generation",
        },
      ],
    },
    mediaGallery: {
      heading: "Site Operations & Engineering Media",
      subheading:
        "Visual documentation from the Sarju River diversion weirs, headrace tunnels, and powerhouse machine halls in Uttarakhand.",
      slides: [
        {
          id: "hydro-media-1",
          type: "video",
          src: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-river-in-the-mountains-41612-large.mp4",
          posterUrl:
            "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=85",
          title: "Aerial Survey: Sarju River Gorge & Diversion Corridor",
          caption:
            "High-gradient Himalayan hydrology in Bageshwar district providing perennial snowmelt discharge.",
          locationTag: "Kapkot Valley, Uttarakhand",
        },
        {
          id: "hydro-media-2",
          type: "image",
          src: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1600&q=85",
          title: "Horizontal Francis Turbine & Synchronous Generator Hall",
          caption:
            "Inside the machine hall featuring automated hydraulic governors and brushless excitation systems.",
          locationTag: "Sarju-III Powerhouse",
        },
        {
          id: "hydro-media-3",
          type: "image",
          src: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&q=85",
          title: "Zero-Submergence Ecological Catchment",
          caption:
            "Protected oak and pine forest slopes above the underground headrace tunnel alignment.",
          locationTag: "Sarju-II Alignment",
        },
      ],
    },
    timeline: {
      heading: "Hydro Division Milestones (2008–2026)",
      milestones: [
        {
          year: "2008",
          title: "Incorporation & Allotment of Sarju Cascade",
          metric: "3 Concessions",
          description:
            "Uttar Bharat Hydro Power (UBHP) signs implementation agreements with the Government of Uttarakhand for Sarju I, II, and III.",
        },
        {
          year: "2014",
          title: "Commercial Synchronization of Sarju-III",
          metric: "10.5 MW COD",
          description:
            "First grid synchronization achieved with UPCL, establishing reliable clean energy evacuation from Bageshwar.",
        },
        {
          year: "2018",
          title: "High-Head Commissioning of Sarju-II",
          metric: "15.0 MW / 155m Head",
          description:
            "Completion of deep rock tunneling and high-pressure steel penstock installation for the 15 MW flagship powerhouse.",
        },
        {
          year: "2024",
          title: "SCADA Digital Twin & HVOF Runner Modernization",
          metric: "99.4% Uptime",
          description:
            "Deployment of predictive vibration telemetry and ceramic-metallic turbine runner coatings across the cascade.",
        },
      ],
    },
  },

  // =========================================================================
  // 2. GREEN FUELS & BIO-ETHANOL (250-350 KLPD DISTILLERY)
  // =========================================================================
  {
    slug: "green-fuels-ethanol",
    name: "Green Fuels & Grain Bio-Ethanol",
    shortName: "Pingaksh Bio-Energy",
    legalEntity: "Pingaksh Bio-Energy & Green Fuels Limited",
    seo: {
      title:
        "Green Fuels & 250 KLPD Grain Bio-Ethanol Refinery | Pingaksh Renewables",
      description:
        "Discover Pingaksh Green Fuels—operating a 250–350 KLPD Zero-Liquid-Discharge (ZLD) grain-based bio-ethanol refinery supplying national Oil Marketing Companies (OMCs) under India's E20 mandate.",
      keywords: [
        "Pingaksh Green Fuels Bio Ethanol",
        "250 KLPD Grain Ethanol Plant India",
        "Zero Liquid Discharge Distillery",
        "E20 Ethanol Blending OMC Supplier",
        "Pingaksh Renewables Bio-Refinery",
      ],
    },
    hero: {
      title: "Grain-Based Bio-Ethanol & Green Fuels",
      subtitle:
        "Advancing India's E20 energy sovereignty through multi-pressure grain distillation, molecular sieve dehydration, and 100% Zero-Liquid-Discharge (ZLD) water circularity.",
      heroImage:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=85",
      heroImageAlt:
        "Automated stainless-steel bio-ethanol distillation columns and process piping",
      keyMetrics: [
        {
          label: "Distillation Capacity",
          value: "250–350",
          unit: "KLPD (Anhydrous Ethanol)",
        },
        {
          label: "Ethanol Fuel Purity",
          value: "99.8",
          unit: "% v/v IS-15464 OMC Grade",
        },
        {
          label: "Captive Co-Generation",
          value: "6.5",
          unit: "MW Back-Pressure Steam Turbine",
        },
        {
          label: "Effluent Discharge",
          value: "0.0",
          unit: "Liters (100% Closed-Loop ZLD)",
        },
      ],
    },
    overview: {
      headline:
        "Precision bioprocess engineering converting surplus non-food grains into high-octane green transportation fuel.",
      leadParagraph:
        "Aligned with the Government of India's National Biofuel Policy and the 20% Ethanol Blending Programme (E20), Pingaksh Bio-Energy operates a state-of-the-art dry-milling grain distillery. By utilizing damaged food grains (DFG), surplus maize, and broken rice procured directly from regional agricultural hubs, our facility decouples biofuel production from sugar-cane water intensity.",
      bodyParagraph:
        "The refinery integrates continuous enzymatic liquefaction, high-gravity yeast fermentation, multi-pressure vacuum distillation, and vapor-phase Molecular Sieve Dehydration (MSDH). A captive biomass/husk-fired cogeneration power plant supplies 100% of the facility's steam and electrical load, making the entire complex self-sustaining.",
      highlights: [
        {
          title: "Long-Term OMC Offtake Security",
          detail:
            "Dedicated dispatch bays supplying fuel-grade ethanol directly to Indian Oil (IOCL), Bharat Petroleum (BPCL), and Hindustan Petroleum (HPCL) depots.",
        },
        {
          title: "100% Zero Liquid Discharge (ZLD)",
          detail:
            "Integrated decanter centrifuges, Multi-Effect Evaporators (MEE), and Process Condensate Treatment (CPU) recycle over 82% of process water back into fermentation.",
        },
        {
          title: "DCS-Controlled Process Safety",
          detail:
            "Fully automated Distributed Control System (DCS) with PESO-compliant tank farms, nitrogen blanketing, and automated foam suppression.",
        },
      ],
    },
    assetsHeading: "Integrated Bio-Refinery Process Blocks",
    assetsDescription:
      "Inspect the core engineering blocks within the Pingaksh Green Fuels complex—from multi-pressure distillation to captive cogeneration and ZLD recovery.",
    plantUnits: [
      {
        id: "ethanol-distillation-block",
        name: "250–350 KLPD Multi-Pressure Distillation & MSDH Unit",
        location: "Integrated Bio-Energy Complex, Northern India",
        status: "Operational — OMC Supply Active",
        capacity: "250 KLPD (Expandable to 350 KLPD)",
        summary:
          "Vacuum distillation and vapor-phase molecular sieve dehydration unit producing 99.8% v/v anhydrous fuel ethanol with ultra-low specific steam consumption.",
        image:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85",
        imageAlt: "Distillation columns and molecular sieve dehydration system",
        technicalSpecs: [
          {
            parameter: "Rated Output",
            specification: "250,000 – 350,000 Liters / Day",
          },
          {
            parameter: "Feedstock Flexibility",
            specification:
              "100% Grain (Maize, Broken Rice, Damaged Food Grains)",
          },
          {
            parameter: "Product Specification",
            specification: "Anhydrous Ethanol (99.8% v/v per IS 15464)",
          },
          {
            parameter: "Dehydration Technology",
            specification: "Zeolite Vapor-Phase Molecular Sieve (MSDH)",
          },
          {
            parameter: "Fermentation System",
            specification: "Continuous High-Gravity Enzymatic Slurry",
          },
          {
            parameter: "Storage Tank Farm",
            specification:
              "PESO-Licensed Mild Steel / SS Receivers (15 Days Buffer)",
          },
        ],
      },
      {
        id: "zld-evaporation-block",
        name: "Zero-Liquid-Discharge (ZLD) & Condensate Polishing Plant",
        location: "Integrated Bio-Energy Complex",
        status: "100% CPCB / MoEFCC Compliant",
        capacity: "100% Closed-Loop Water Recycling",
        summary:
          "Eliminates environmental effluent by separating thin slop through high-G decanters, concentrating solubles in a 7-body Multi-Effect Evaporator, and purifying condensate.",
        image:
          "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=1400&q=85",
        imageAlt:
          "Zero Liquid Discharge Multi-Effect Evaporator and water treatment",
        technicalSpecs: [
          {
            parameter: "Discharge Standard",
            specification: "Strict Zero Liquid Discharge (ZLD)",
          },
          {
            parameter: "Solid-Liquid Separation",
            specification: "High-Speed Horizontal Decanter Centrifuges",
          },
          {
            parameter: "Evaporation System",
            specification:
              "Falling-Film & Forced-Circulation Multi-Effect Evaporator",
          },
          {
            parameter: "Condensate Polishing",
            specification: "Anaerobic + RO Membrane CPU (82%+ Water Recycle)",
          },
          {
            parameter: "Freshwater Footprint",
            specification: "< 2.8 Liters per Liter of Ethanol Produced",
          },
        ],
      },
      {
        id: "cogen-power-block",
        name: "6.5 MW Captive Biomass Cogeneration Plant",
        location: "Integrated Bio-Energy Complex",
        status: "Synchronized Islanding Mode",
        capacity: "6.5 MW + 45 TPH High-Pressure Boiler",
        summary:
          "Supplies uninterrupted process steam for distillation/drying and 100% of the electrical power required by the entire bio-refinery complex.",
        image:
          "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1400&q=85",
        imageAlt: "Captive biomass cogeneration turbine and boiler house",
        technicalSpecs: [
          {
            parameter: "Electrical Output",
            specification: "6.5 MW Back-Pressure Steam Turbine Generator",
          },
          {
            parameter: "Boiler Configuration",
            specification: "45 TPH AFBC Multi-Fuel Biomass / Rice Husk Boiler",
          },
          {
            parameter: "Operating Pressure",
            specification: "67 kg/cm² at 495°C",
          },
          {
            parameter: "Flue Gas Control",
            specification:
              "4-Field Electrostatic Precipitator (ESP < 30 mg/Nm³)",
          },
        ],
      },
    ],
    telemetry: {
      heading: "Ethanol Dispatch & Resource Circularity Metrics",
      subheading:
        "Annualized anhydrous ethanol production supplied to national Oil Marketing Companies alongside process efficiency indicators.",
      chartTitle: "Annual Ethanol Production Volume (Million Liters)",
      chartUnit: "Million Ltrs",
      maxScale: 100,
      series: [
        {
          year: "Phase I Trial",
          value: 28.5,
          displayValue: "28.5 ML",
          benchmarkNote: "Commissioning & OMC Empanelment",
        },
        {
          year: "FY 2023–24",
          value: 64.0,
          displayValue: "64.0 ML",
          benchmarkNote: "Maize & Rice Dual-Feedstock",
        },
        {
          year: "FY 2024–25",
          value: 78.5,
          displayValue: "78.5 ML",
          benchmarkNote: "330 Operating Days Achieved",
        },
        {
          year: "FY 2025–26",
          value: 86.2,
          displayValue: "86.2 ML",
          benchmarkNote: "99.8% v/v Purity Benchmark",
        },
        {
          year: "FY 2026–27 (E)",
          value: 95.0,
          displayValue: "95.0 ML",
          benchmarkNote: "Debottlenecked 350 KLPD Run-Rate",
        },
      ],
      efficiencyBenchmarks: [
        {
          label: "Fermentation & Distillation Recovery Efficiency",
          percentage: 94.8,
          valueText: "94.8%",
          note: "High-gravity enzymatic conversion with minimal residual sugars",
        },
        {
          label: "Process Condensate Recycled to Plant",
          percentage: 84.5,
          valueText: "84.5%",
          note: "Drastically lowers groundwater drawal per kiloliter distilled",
        },
        {
          label: "Captive Renewable Power Self-Sufficiency",
          percentage: 100.0,
          valueText: "100%",
          note: "Zero grid dependency during normal distillery operations",
        },
      ],
    },
    mediaGallery: {
      heading: "Refinery Infrastructure & Quality Control",
      subheading:
        "Inside our automated distillation columns, PESO dispatch gantries, and gas-chromatography quality laboratories.",
      slides: [
        {
          id: "fuel-media-1",
          type: "image",
          src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85",
          title: "Multi-Pressure Distillation & Molecular Sieve Columns",
          caption:
            "Stainless-steel vacuum columns operating under thermal integration to cut steam demand by 32%.",
          locationTag: "Process Block A",
        },
        {
          id: "fuel-media-2",
          type: "image",
          src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85",
          title: "Regional Grain Procurement & Automated Silo Storage",
          caption:
            "Direct procurement of maize and non-food broken rice from farmer producer organizations (FPOs).",
          locationTag: "Raw Material Handling Yard",
        },
      ],
    },
    timeline: {
      heading: "Green Fuels Division Milestones",
      milestones: [
        {
          year: "2021",
          title: "Entry into National E20 Bio-Ethanol Programme",
          metric: "250 KLPD Sanction",
          description:
            "Environmental Clearance (EC) and Consent to Establish secured for a greenfield grain-based ZLD distillery.",
        },
        {
          year: "2023",
          title: "Long-Term Offtake Agreements with PSU OMCs",
          metric: "IOCL • BPCL • HPCL",
          description:
            "Signed multi-year ethanol supply agreements under the national E20 blending roadmap.",
        },
        {
          year: "2025",
          title: "Full-Capacity Commercial Operations & DDGS Integration",
          metric: "86+ Million Liters/Yr",
          description:
            "Achieved 330+ days of continuous annual operation with 100% Zero Liquid Discharge compliance.",
        },
      ],
    },
  },

  // =========================================================================
  // 3. CIRCULAR BYPRODUCTS (DDGS NUTRITION, NAPIER BIOMASS & CO2 RECOVERY)
  // =========================================================================
  {
    slug: "circular-byproducts",
    name: "Circular Bio-Products, DDGS & Agro-Biomass",
    shortName: "Pingaksh Circular & Farms",
    legalEntity: "Pingaksh Agro & Circular Bio-Resources Division",
    seo: {
      title:
        "DDGS Animal Nutrition, CO₂ Recovery & Napier Biomass | Pingaksh Renewables",
      description:
        "Explore Pingaksh's circular bio-economy division—producing high-protein DDGS livestock feed, food-grade liquid CO₂, and high-yield Napier grass biomass.",
      keywords: [
        "DDGS Cattle and Poultry Feed India",
        "Distillers Dried Grains with Solubles Pingaksh",
        "Fermentation CO2 Recovery Plant",
        "Super Napier Grass Biomass Pingaksh Farms",
      ],
    },
    hero: {
      title: "Circular Bio-Economy, DDGS & Regenerative Biomass",
      subtitle:
        "Transforming every gram of post-fermentation grain residue and biogenic exhaust into high-protein livestock nutrition, industrial liquid CO₂, and clean biomass.",
      heroImage:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85",
      heroImageAlt:
        "Lush regenerative agricultural fields and circular bio-resource operations",
      keyMetrics: [
        {
          label: "High-Protein DDGS Output",
          value: "180+",
          unit: "Metric Tonnes / Day",
        },
        {
          label: "Crude Protein Content",
          value: "30–46",
          unit: "% (Rice & Maize DDGS)",
        },
        {
          label: "Biogenic CO₂ Capture",
          value: "60",
          unit: "TPD Food/Industrial Grade",
        },
        {
          label: "Waste to Landfill",
          value: "0.0",
          unit: "% Complete Valorization",
        },
      ],
    },
    overview: {
      headline:
        "Closing the agricultural loop: where bio-refinery byproducts become high-value nutritional and industrial inputs.",
      leadParagraph:
        "At Pingaksh Renewables, distillation is only half of the value chain. When starch in maize or rice is fermented into ethanol, the remaining non-fermentable kernel components—proteins, dietary fiber, amino acids, and essential lipids—are concentrated threefold. Our automated rotary bundle dryers process wet cake and condensed solubles into golden Distillers Dried Grains with Solubles (DDGS).",
      bodyParagraph:
        "Simultaneously, raw biogenic carbon dioxide evolved during yeast fermentation is scrubbed, compressed, and liquefied instead of being vented to the atmosphere. On the upstream side, Pingaksh Farms cultivates high-yield Super Napier grass across rural clusters—providing green fodder for dairy cattle and clean cellulosic boiler fuel.",
      highlights: [
        {
          title: "Export-Grade DDGS Livestock Feed",
          detail:
            "Aflatoxin-controlled, golden-yellow DDGS with high bypass protein digestibility for dairy cattle, poultry, and aquaculture feed mills.",
        },
        {
          title: "Biogenic CO₂ Liquefaction",
          detail:
            "99.9% pure liquid carbon dioxide captured from closed fermenters for beverage carbonation, cold-chain dry ice, and industrial welding.",
        },
        {
          title: "Pingaksh Farms (Super Napier Biomass)",
          detail:
            "Perennial C4 energy crop yielding 150–200 tonnes/acre/year, restoring soil organic carbon and supplying low-ash green biomass.",
        },
      ],
    },
    assetsHeading: "Circular Valorization Units & Product Specifications",
    assetsDescription:
      "Select a circular product line to view its nutritional assay, chemical purity, and industrial processing specifications.",
    plantUnits: [
      {
        id: "ddgs-dryer-complex",
        name: "Automated Rotary Tube-Bundle DDGS Drying & Pelleting Plant",
        location: "Integrated Bio-Energy Complex",
        status: "Commercial Dispatch Active",
        capacity: "180–210 Metric Tonnes / Day",
        summary:
          "Indirect steam-heated rotary dryers that preserve amino acid bioavailability (lysine & methionine) without scorching, producing uniform golden DDGS.",
        image:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85",
        imageAlt:
          "High-protein grain feedstock and DDGS nutritional processing",
        technicalSpecs: [
          {
            parameter: "Crude Protein (Rice DDGS)",
            specification: "42% – 46% (Dry Matter Basis)",
          },
          {
            parameter: "Crude Protein (Maize DDGS)",
            specification: "28% – 32% with High Energy Fat (8%+)",
          },
          {
            parameter: "Moisture Content",
            specification: "< 10.5% for Extended Shelf Stability",
          },
          {
            parameter: "Mycotoxin / Aflatoxin Control",
            specification: "Strict Batch Screening (< 20 ppb)",
          },
          {
            parameter: "Packaging Formats",
            specification: "50 kg PP Woven Bags & 1-Tonne Jumbo Bags",
          },
        ],
      },
      {
        id: "co2-recovery-unit",
        name: "Biogenic Fermentation CO₂ Scrubbing & Liquefaction Unit",
        location: "Integrated Bio-Energy Complex",
        status: "Carbon Capture Active",
        capacity: "60 Metric Tonnes / Day",
        summary:
          "Captures raw fermentation off-gas through water scrubbers, activated carbon beds, and ammonia-cooled liquefiers to produce food-grade liquid CO₂.",
        image:
          "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=1400&q=85",
        imageAlt: "Cryogenic CO2 storage bullets and compression skid",
        technicalSpecs: [
          {
            parameter: "CO₂ Purity Level",
            specification: "99.95% v/v (ISBT Food & Beverage Grade)",
          },
          { parameter: "Moisture Dew Point", specification: "< -60°C" },
          {
            parameter: "Storage Infrastructure",
            specification: "Insulated Cryogenic Bullets at -20°C / 20 Bar",
          },
          {
            parameter: "End-Use Sectors",
            specification:
              "Beverage Carbonation, Dry Ice Cold Chain, Fire Suppression",
          },
        ],
      },
      {
        id: "napier-biomass-farms",
        name: "Pingaksh Farms — Super Napier Agro-Biomass Clusters",
        location: "Northern India Agrarian Clusters",
        status: "Active Rural Outgrower Network",
        capacity: "150–200 MT / Acre Annual Biomass Yield",
        summary:
          "Contract farming and captive cultivation of high-calorific Super Napier grass for livestock green fodder and renewable boiler fuel.",
        image:
          "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1400&q=85",
        imageAlt: "Super Napier grass cultivation and rural farmer harvest",
        technicalSpecs: [
          {
            parameter: "Crop Variety",
            specification:
              "High-Yield Hybrid Pennisetum Purpureum (Super Napier)",
          },
          {
            parameter: "Harvest Frequency",
            specification: "5 to 6 Cuttings per Year (Perennial Ratoon)",
          },
          {
            parameter: "Gross Calorific Value (Dry)",
            specification: "3,600 – 3,900 kcal/kg",
          },
          {
            parameter: "Agrarian Impact",
            specification: "Assured Buyback Contracts for Marginal Farmers",
          },
        ],
      },
    ],
    telemetry: {
      heading: "Circular Byproduct Valorization Growth",
      subheading:
        "Annual volume of high-protein DDGS animal nutrition and captured biogenic CO₂ delivered to domestic industrial markets.",
      chartTitle: "Annual DDGS & Circular Byproduct Dispatch (Thousand MT)",
      chartUnit: "kMT",
      maxScale: 100,
      series: [
        {
          year: "FY 2022–23",
          value: 22.0,
          displayValue: "22.0 kMT",
          benchmarkNote: "Initial Dryer Line",
        },
        {
          year: "FY 2023–24",
          value: 48.5,
          displayValue: "48.5 kMT",
          benchmarkNote: "Aqua & Poultry Grade Launch",
        },
        {
          year: "FY 2024–25",
          value: 62.4,
          displayValue: "62.4 kMT",
          benchmarkNote: "CO₂ Liquefaction Added",
        },
        {
          year: "FY 2025–26",
          value: 74.8,
          displayValue: "74.8 kMT",
          benchmarkNote: "Pan-India Feed Mill Supply",
        },
        {
          year: "FY 2026–27 (E)",
          value: 85.0,
          displayValue: "85.0 kMT",
          benchmarkNote: "Pelletized Export Line",
        },
      ],
      efficiencyBenchmarks: [
        {
          label: "Total Grain Mass Valorized into Products",
          percentage: 99.6,
          valueText: "99.6%",
          note: "Starch → Ethanol | Protein & Fiber → DDGS | Gas → Liquid CO₂",
        },
        {
          label: "Digestible Bypass Protein Retention",
          percentage: 92.0,
          valueText: "92.0%",
          note: "Low-temperature indirect steam drying prevents Maillard browning",
        },
        {
          label: "Boiler Fly-Ash Converted to Green Bricks",
          percentage: 100.0,
          valueText: "100%",
          note: "Biomass ash utilized for soil potash enrichment and brick making",
        },
      ],
    },
    mediaGallery: {
      heading: "Circular Operations & Agrarian Supply Chain",
      subheading:
        "From automated DDGS bagging lines to Napier biomass harvesting with partner farmers.",
      slides: [
        {
          id: "circ-media-1",
          type: "image",
          src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85",
          title: "Golden High-Protein DDGS Nutrition Dispatch",
          caption:
            "Nutrient-dense livestock feed replacing imported soybean meal for Indian dairy and poultry farmers.",
          locationTag: "DDGS Warehouse & Bagging Bay",
        },
        {
          id: "circ-media-2",
          type: "image",
          src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=85",
          title: "Pingaksh Farms Outgrower Biomass Network",
          caption:
            "Partner farmers cultivating perennial Super Napier grass under assured buyback agreements.",
          locationTag: "Rural Agro-Cluster",
        },
      ],
    },
    timeline: {
      heading: "Circular Bio-Economy Milestones",
      milestones: [
        {
          year: "2022",
          title: "Launch of Pingaksh Farms & Napier Cultivation",
          metric: "1,200+ Acres",
          description:
            "Initiated regenerative Super Napier grass cultivation to establish sustainable green fodder and biomass supply chains.",
        },
        {
          year: "2024",
          title: "High-Protein DDGS Commercialization",
          metric: "180+ TPD Output",
          description:
            "Commissioned indirect steam tube-bundle dryers producing 45% protein Rice DDGS and 30% protein Maize DDGS.",
        },
        {
          year: "2025",
          title: "Biogenic CO₂ Capture & Zero-Waste Certification",
          metric: "60 TPD CO₂",
          description:
            "Integrated fermentation off-gas scrubbing and liquefaction, achieving 100% byproduct valorization.",
        },
      ],
    },
  },
];

export function getBusinessVerticalBySlug(
  slug: string,
): BusinessVerticalData | undefined {
  return BUSINESS_VERTICALS_DATA.find((b) => b.slug === slug);
}

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

export interface ProcessStageStep {
  stepNumber: string;
  subLabel: string;
  stageTitle: string;
  branchCategory: "primary-stream" | "co2-branch" | "byproduct-branch";
  technicalDescription: string;
  keyOutputMetric: string;
  carbonImpactNote: string;
}

export interface ProcessSystemData {
  id: string;
  tabLabel: string;
  systemTitle: string;
  baselineFormulaText: string;
  videoUrl: string;
  videoPoster: string;
  videoCaption: string;
  steps: ProcessStageStep[];
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
  processSystems: ProcessSystemData[];
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
        "Hydroelectric Power (Sarju II & III Cascade) | Pingaksh Renewables",
      description:
        "Explore Uttar Bharat Hydro Power (UBHP)—operating the 30.60 MW Sarju-I, Sarju-II, and Sarju-III run-of-the-river hydroelectric cascade in Bageshwar, Uttarakhand.",
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
        "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/_MG_3176_f4afd809.webp",
      heroImageAlt:
        "Himalayan river gorge and run-of-the-river hydroelectric weir in Uttarakhand",
      heroVideoUrl:
        "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-river-in-the-mountains-41612-large.mp4",
      keyMetrics: [
        {
          label: "Installed Cascade Capacity",
          value: "30.60",
          unit: "MW (Sarju II–III)",
        },
        {
          label: "Peak Net Hydraulic Head",
          value: "160.0",
          unit: "Meters (Sarju-III & II)",
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
        status: "Operational (COD: 11.07.2014)",
        capacity: "10.50 MW (3 × 3.50 MW)",
        summary:
          "The first project commissioned in the cascade, proving UBHP's geological tunneling capabilities and establishing synchronous evacuation to the UPCL state grid.",
        image:
          "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/_MG_3236_decb7578.webp",
        imageAlt: "Sarju-III Hydroelectric Turbine Hall and Generator Floor",
        technicalSpecs: [
          {
            parameter: "Installed Capacity",
            specification: "10.50 MW (3 Units × 3,600 kW Rated)",
          },
          {
            parameter: "Turbine Configuration",
            specification: "Horizontal Shaft Francis Turbine",
          },
          { parameter: "Rated Net Head", specification: "51.85 Meters" },
          {
            parameter: "Design Discharge",
            specification: "6.73 Cubic Meters / Sec per Unit",
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
        status: "Operational (COD: 25.05.2016)",
        capacity: "12.60 MW (3 × 4.20 MW)",
        summary:
          "High-head operational powerhouse in the Sarju cascade, utilizing a 155-meter vertical drop to generate high-efficiency peaking and baseload renewable power.",
        image:
          "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/_MG_3298_a03835e3.webp",
        imageAlt: "Sarju-II High-Head Penstock and Himalayan Gorge",
        technicalSpecs: [
          {
            parameter: "Installed Capacity",
            specification: "12.60 MW (3 Units × 4,200 kW)",
          },
          {
            parameter: "Turbine Configuration",
            specification: "High-Head Horizontal Francis",
          },
          { parameter: "Rated Net Head", specification: "155.0 Meters" },
          {
            parameter: "Design Discharge",
            specification: "2.59 Cubic Meters / Sec per Unit",
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
            parameter: "Power Offtaker",
            specification: "Uttarakhand Power Corporation Ltd. (UPCL)",
          },
        ],
      },
    ],
    processSystems: [
      {
        id: "hydro-hydraulic-flow",
        tabLabel: "01 · Hydraulic & Tunneling Flow",
        systemTitle: "Sarju Cascade Hydraulic Conveyance: Intake to Turbine",
        baselineFormulaText:
          "CEA Baseline Grid Displacement: 0.82 kg CO₂ / kWh Exported",
        videoUrl:
          "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-river-in-the-mountains-41612-large.mp4",
        videoPoster:
          "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=85",
        videoCaption:
          "Perennial snowmelt diversion along the Sarju River gorge in Tehsil Kapkot, Bageshwar—maintaining mandatory e-Flow while routing silt-free water through underground tunnels.",
        steps: [
          {
            stepNumber: "01",
            subLabel: "River Diversion & e-Flow",
            stageTitle: "Drop-Type Trench Weir & Intake",
            branchCategory: "primary-stream",
            technicalDescription:
              "Diverts a calibrated portion of the Sarju River discharge through automated trash racks while releasing mandatory uninterrupted environmental flow (e-Flow) downstream.",
            keyOutputMetric: "Zero Reservoir Submergence",
            carbonImpactNote:
              "Eliminates methane emissions associated with large stagnant dam reservoirs.",
          },
          {
            stepNumber: "02",
            subLabel: "Quartz Silt Extraction",
            stageTitle: "Underground Desilting Basin",
            branchCategory: "byproduct-branch",
            technicalDescription:
              "Continuous flushing hopper basins settle and eject >96% of suspended Himalayan quartz particles larger than 0.20 mm back into the river bed.",
            keyOutputMetric: ">96% Silt Removal (>0.2mm)",
            carbonImpactNote:
              "Protects HVOF-coated turbine runners and preserves natural downstream sediment transport.",
          },
          {
            stepNumber: "03",
            subLabel: "High-Pressure Conveyance",
            stageTitle: "Headrace Tunnel & Surge Shaft",
            branchCategory: "primary-stream",
            technicalDescription:
              "Concrete-lined underground headrace tunnels and ASTM A537 steel penstocks build up to 155–160 meters of net hydraulic head without disturbing surface forest cover.",
            keyOutputMetric: "Up to 160m Net Head",
            carbonImpactNote:
              "Subsurface alignment preserves 100% of overlying Himalayan oak and pine slope ecology.",
          },
          {
            stepNumber: "04",
            subLabel: "Electro-Mechanical Conversion",
            stageTitle: "Horizontal Francis Turbines & Tailrace",
            branchCategory: "co2-branch",
            technicalDescription:
              "High-velocity water drives horizontal-shaft Francis runners coupled to 11 kV synchronous generators before 100% of the water exits cleanly via the tailrace channel.",
            keyOutputMetric: "0.82 kg CO₂/kWh Offset",
            carbonImpactNote:
              "100% non-consumptive water usage—every liter diverted returns unpolluted to the Sarju River.",
          },
        ],
      },
      {
        id: "hydro-scada-evacuation",
        tabLabel: "02 · SCADA & Grid Evacuation",
        systemTitle: "Synchronous Switchyard & UPCL Grid Telemetry",
        baselineFormulaText:
          "33 kV / 132 kV Double-Circuit Evacuation · >99.4% Switchyard Uptime",
        videoUrl:
          "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-river-in-the-mountains-41612-large.mp4",
        videoPoster:
          "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1600&q=85",
        videoCaption:
          "Real-time PLC governor synchronization and 33/132 kV switchyard protection feeding clean baseload electricity to the UPCL Bageshwar substation.",
        steps: [
          {
            stepNumber: "01",
            subLabel: "Digital Hydraulic Governor",
            stageTitle: "Automated Wicket-Gate Regulation",
            branchCategory: "primary-stream",
            technicalDescription:
              "PLC-controlled electro-hydraulic governors continuously modulate guide-vane openings in response to upstream water levels and grid frequency.",
            keyOutputMetric: "50.0 Hz ±0.05 Sync",
            carbonImpactNote:
              "Maximizes energy conversion efficiency across lean winter and peak monsoon flows.",
          },
          {
            stepNumber: "02",
            subLabel: "11 kV Generation Bus",
            stageTitle: "Brushless Synchronous Excitation",
            branchCategory: "primary-stream",
            technicalDescription:
              "Three-phase brushless synchronous alternators generate stable power at 11 kV with automatic voltage regulation (AVR) and reactive power compensation.",
            keyOutputMetric: "0.90 Lagging Power Factor",
            carbonImpactNote:
              "Stabilizes voltage profiles across remote hill-district distribution feeders.",
          },
          {
            stepNumber: "03",
            subLabel: "Outdoor Switchyard",
            stageTitle: "11 / 33 kV Step-Up Transformers",
            branchCategory: "byproduct-branch",
            technicalDescription:
              "Oil-immersed step-up transformers and SF6 circuit breakers interface the powerhouse busbars with the dedicated double-circuit transmission corridor.",
            keyOutputMetric: "99.4% Plant Availability",
            carbonImpactNote:
              "Low-loss CRGO transformer cores minimize auxiliary transmission losses.",
          },
          {
            stepNumber: "04",
            subLabel: "State Grid Injection",
            stageTitle: "UPCL Bageshwar Substation Metering",
            branchCategory: "co2-branch",
            technicalDescription:
              "ABT (Availability Based Tariff) compliant four-quadrant smart meters record real-time green energy export under long-term UERC-approved PPAs.",
            keyOutputMetric: "217,800+ MT CO₂ Saved",
            carbonImpactNote:
              "Directly displaces coal-fired thermal power imports into the Uttarakhand state grid.",
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
          id: "hydro-media-2",
          type: "image",
          src: "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/_MG_3227_4a76b3f5.webp",
          title: "Horizontal Francis Turbine & Synchronous Generator Hall",
          caption:
            "Inside the machine hall featuring automated hydraulic governors and brushless excitation systems.",
          locationTag: "Sarju-III Powerhouse",
        },
        {
          id: "hydro-media-3",
          type: "image",
          src: "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/_MG_3451_ab6b9ccb.webp",
          title: "Zero-Submergence Ecological Catchment",
          caption:
            "Protected oak and pine forest slopes above the underground headrace tunnel alignment.",
          locationTag: "Sarju-II Alignment",
        },
        {
          id: "csr-slide-4",
          type: "image",
          src: "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/_MG_3807_b730c0a3.webp",
          title: "Project Dedication & Regional Integration",
          caption:
            "Foundation stone and inauguration milestones cementing our long-term commitment to Uttarakhand's energy independence.",
          locationTag: "Kapkot, Bageshwar",
        },
        {
          id: "csr-slide-5",
          type: "image",
          src: "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/_MG_3836_bfb9b053.webp",
          title: "Rural Educational Upliftment",
          caption:
            "Distributing educational resources and supporting primary schooling infrastructure for villages surrounding the Sarju cascade.",
          locationTag: "Pingaksh CSR Initiative",
        },
        {
          id: "csr-slide-6",
          type: "image",
          src: "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/_MG_3751_a4bd973c.webp",
          title: "Empowering the Next Generation",
          caption:
            "Fostering academic excellence and technical curiosity among local students in the Himalayan belt.",
          locationTag: "Bageshwar District",
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
          metric: "10.50 MW COD",
          description:
            "First grid synchronization achieved with UPCL on 11.07.2014, establishing reliable clean energy evacuation from Bageshwar.",
        },
        {
          year: "2016",
          title: "High-Head Commissioning of Sarju-II",
          metric: "12.60 MW / 155m Head",
          description:
            "Commercial commissioning of the 12.60 MW flagship powerhouse on 25.05.2016 following deep rock tunneling and penstock erection.",
        },
        {
          year: "2025",
          title: "SCADA Digital Twin & Sarju-I Upstream Works",
          metric: "30.60 MW Total",
          description:
            "Deployment of predictive vibration telemetry across operating units alongside civil execution for the 7.50 MW Sarju-I upstream stage.",
        },
      ],
    },
  },

  // =========================================================================
  // 2. GREEN FUELS & ETHANOL (PBPL - 250 TO 350 KLPD BIOREFINERY)
  // =========================================================================
  {
    slug: "green-fuels-ethanol",
    name: "Green Fuels & Bio-Ethanol",
    shortName: "PBPL Bio-Refinery",
    legalEntity: "Pingaksh Beverages Private Limited (PBPL)",
    seo: {
      title: "250 KLPD Grain-Based Ethanol Biorefinery | Pingaksh Renewables",
      description:
        "Discover Pingaksh Beverages Pvt. Ltd. (PBPL)—operating a 250 KLPD  automated grain-based fuel ethanol biorefinery supporting India's E20 blending mandate.",
      keywords: [
        "Pingaksh Beverages PBPL Ethanol",
        "250 KLPD Grain Distillery India",
        "E20 Fuel Grade Anhydrous Ethanol",
        "BIS IS 15464 Ethanol Supplier OMC",
        "Zero Liquid Discharge Biorefinery",
      ],
    },
    hero: {
      title: "Automated Grain-to-Ethanol Biorefining",
      subtitle:
        "Supplying 99.8% v/v anhydrous fuel-grade ethanol to Public Sector Oil Marketing Companies under India's National E20 Blending Programme with 100% Zero-Liquid Discharge.",
      heroImage:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=85",
      heroImageAlt:
        "Pingaksh Beverages 250 KLPD Grain-Based Bio-Ethanol Distillation Columns",
      heroVideoUrl:
        "https://assets.mixkit.co/videos/preview/mixkit-industrial-plant-with-pipes-and-smoke-42654-large.mp4",
      keyMetrics: [
        {
          label: "Distillation Capacity",
          value: "250",
          unit: "KLPD ",
        },
        {
          label: "Ethanol Fuel Purity",
          value: "99.8",
          unit: "% v/v (BIS IS 15464)",
        },
        {
          label: "Effluent Discharge",
          value: "0.0",
          unit: "Liters (100% CPCB ZLD)",
        },
        {
          label: "Daily Carbon Displacement",
          value: "600+",
          unit: "MT CO₂ Displaced / Day",
        },
      ],
    },
    overview: {
      headline:
        "DCS-automated multi-pressure distillation and molecular sieve dehydration engineered for zero-waste biofuel production.",
      leadParagraph:
        "Housed under Pingaksh Beverages Private Limited (PBPL), our state-of-the-art grain-based biorefinery converts non-food broken rice and maize into anhydrous ethanol for blending with petrol by IndianOil, BPCL, and HPCL. The complex is engineered with full Distributed Control System (DCS) automation and a captive co-generation power island.",
      bodyParagraph:
        "By integrating thermal vapor recompression across our distillation columns and recycling >95% of process condensate, PBPL achieves benchmark steam-to-ethanol efficiency while valorizing 100% of spent grain solids into high-protein DDGS animal feed and food-grade liquid CO₂.",
      highlights: [
        {
          title: "Assured Public Sector OMC Off-Take",
          detail:
            "Long-term Ethanol Supply Year (ESY) allocation agreements with national Oil Marketing Companies backed by tri-partite escrow mechanisms.",
        },
        {
          title: "Captive Biomass Co-Generation Island",
          detail:
            "High-pressure travelling-grate boiler and back-pressure steam turbine make the entire 250 KLPD complex 100% self-sufficient in thermal and electrical energy.",
        },
        {
          title: "PESO Class-A Automated Tank Farm",
          detail:
            "Radar-gauged bulk ethanol storage receivers and mass-flow metered multi-bay tanker loading gantries certified by PESO.",
        },
      ],
    },
    assetsHeading: "Biorefinery Process Islands & Technical Datasheets",
    assetsDescription:
      "Select an operating island within the PBPL biorefinery complex to inspect its distillation, dehydration, and captive co-generation specifications.",
    plantUnits: [
      {
        id: "milling-fermentation-island",
        name: "Liquefaction & Hi-Gravity Fermentation Island",
        location: "PBPL Biorefinery Complex, Northern India",
        status: "24×7 DCS Automated Operation",
        capacity: "250 KLPD Mash Throughput",
        summary:
          "Dust-free pneumatic grain handling, hammer milling, jet-cooking enzymatic liquefaction, and closed-loop temperature-controlled fermenters.",
        image:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85",
        imageAlt: "Automated Grain Fermentation Vessels at PBPL",
        technicalSpecs: [
          {
            parameter: "Feedstock Flexibility",
            specification: "100% Broken Rice / Maize (Dual-Grain Capable)",
          },
          {
            parameter: "Milling Technology",
            specification: "Vibro-Destoner, Magnetic Separator & Hammer Mills",
          },
          {
            parameter: "Liquefaction System",
            specification: "3-Stage Slurry Jet Cooking & Flash Cooling",
          },
          {
            parameter: "Fermentation Efficiency",
            specification: ">91.5% Stoichiometric Sugar-to-Ethanol Conversion",
          },
          {
            parameter: "Off-Gas Capture",
            specification: "Closed CO₂ Header Linked to Scrubbing Compressors",
          },
        ],
      },
      {
        id: "mpd-msdh-island",
        name: "Multi-Pressure Distillation & Molecular Sieve (MSDH)",
        location: "PBPL Biorefinery Complex, Northern India",
        status: "BIS IS 15464 Certified",
        capacity: "250 KLPD Anhydrous",
        summary:
          "Vacuum-assisted multi-pressure distillation columns coupled with vapor-phase zeolite molecular sieve beds producing >99.8% v/v fuel ethanol.",
        image:
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85",
        imageAlt: "Multi-Pressure Distillation Towers and Zeolite Sieve Unit",
        technicalSpecs: [
          {
            parameter: "Distillation Mode",
            specification: "Multi-Pressure Vacuum with Thermal Integration",
          },
          {
            parameter: "Dehydration Technology",
            specification: "Vapor-Phase Zeolite Molecular Sieve (MSDH)",
          },
          {
            parameter: "Final Ethanol Strength",
            specification: "99.8% v/v Anhydrous (IS 15464 Compliant)",
          },
          {
            parameter: "Specific Steam Consumption",
            specification: "<2.15 kg Steam / Liter of Ethanol",
          },
          {
            parameter: "Automation Architecture",
            specification: "Redundant PLC / DCS with Interlock Safety",
          },
        ],
      },
      {
        id: "cogen-peso-dispatch",
        name: "Captive Co-Generation & PESO Tank Farm",
        location: "PBPL Biorefinery Complex, Northern India",
        status: "PESO & ISO 45001 Certified",
        capacity: "6.5 MW Captive + Bulk Dispatch",
        summary:
          "Biomass-fired high-pressure boiler island with back-pressure turbine generator and automated PESO Class-A ethanol dispatch bays.",
        image:
          "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=85",
        imageAlt: "Captive Co-Generation Power Island and PESO Tank Farm",
        technicalSpecs: [
          {
            parameter: "Boiler Fuel",
            specification: "Napier Biomass Briquettes & Rice Husk",
          },
          {
            parameter: "Turbine Configuration",
            specification: "Back-Pressure Steam Turbine (Process Bleed)",
          },
          {
            parameter: "Flue Gas Control",
            specification: "Electrostatic Precipitator (ESP <30 mg/Nm³)",
          },
          {
            parameter: "Tank Farm Metering",
            specification: "Coriolis Mass Flow Meters & Radar Level Gauges",
          },
        ],
      },
    ],
    processSystems: [
      {
        id: "ethanol-grain-distillation",
        tabLabel: "01 · Grain-to-Ethanol Flow",
        systemTitle: "250 KLPD Enzymatic Liquefaction, MPD & Zeolite MSDH",
        baselineFormulaText:
          "E20 Lifecycle Carbon Cut: ~1.90 kg CO₂ Displaced per Liter Blended",
        videoUrl:
          "https://assets.mixkit.co/videos/preview/mixkit-industrial-plant-with-pipes-and-smoke-42654-large.mp4",
        videoPoster:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85",
        videoCaption:
          "Continuous DCS-controlled liquefaction, fermentation, and vapor-phase molecular sieve dehydration producing 99.8% v/v anhydrous ethanol.",
        steps: [
          {
            stepNumber: "01",
            subLabel: "Silo Intake & Hammer Milling",
            stageTitle: "Grain Cleaning & Slurry Jet Cooking",
            branchCategory: "primary-stream",
            technicalDescription:
              "Non-food broken grains undergo magnetic destoning and fine hammer milling before mixing with recycled process condensate and alpha-amylase enzymes in hydro-heaters.",
            keyOutputMetric: "100% Non-Food Starch",
            carbonImpactNote:
              "Utilizes surplus/damaged grains procured directly from regional farm-gate clusters.",
          },
          {
            stepNumber: "02",
            subLabel: "Saccharification & Yeast Pitch",
            stageTitle: "Hi-Gravity Closed Fermentation",
            branchCategory: "co2-branch",
            technicalDescription:
              "Gluco-amylase converts dextrins into fermentable sugars inside jacketed fermenters, yielding >14% v/v alcohol wash while routing pure CO₂ off-gas to recovery scrubbers.",
            keyOutputMetric: ">91.5% Fermentation Yield",
            carbonImpactNote:
              "Zero atmospheric venting of fermentation CO₂—100% captured for liquefaction.",
          },
          {
            stepNumber: "03",
            subLabel: "Thermal Vapor Recompression",
            stageTitle: "Multi-Pressure Vacuum Distillation",
            branchCategory: "primary-stream",
            technicalDescription:
              "Analyzer, degassing, and rectifier columns operate under cascading vacuum and pressure regimes so overhead vapors from one column heat the reboiler of the next.",
            keyOutputMetric: "95.6% v/v Rectified Spirit",
            carbonImpactNote:
              "Cuts thermal steam demand by 38% compared to conventional atmospheric distillation.",
          },
          {
            stepNumber: "04",
            subLabel: "Zeolite Bed Dehydration",
            stageTitle: "Molecular Sieve (MSDH) & OMC Dispatch",
            branchCategory: "primary-stream",
            technicalDescription:
              "Superheated hydrous ethanol vapor passes through 3Å synthetic zeolite molecular sieve beds that trap water molecules, yielding 99.8% v/v fuel ethanol.",
            keyOutputMetric: "99.8% v/v BIS IS 15464",
            carbonImpactNote:
              "Dispatched directly to PSU OMC depots for E20 blending—substituting imported fossil crude.",
          },
        ],
      },
      {
        id: "ethanol-cogen-zld",
        tabLabel: "02 · Captive Co-Gen & ZLD Loop",
        systemTitle: "Back-Pressure Steam Co-Generation & Condensate Recycling",
        baselineFormulaText:
          "100% CPCB Zero-Liquid Discharge · >95% Process Water Circularity",
        videoUrl:
          "https://assets.mixkit.co/videos/preview/mixkit-industrial-plant-with-pipes-and-smoke-42654-large.mp4",
        videoPoster:
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85",
        videoCaption:
          "Integrated biomass co-generation boiler and 6-effect MEE evaporator ensuring zero industrial effluent leaves the PBPL plant boundary.",
        steps: [
          {
            stepNumber: "01",
            subLabel: "Green Biomass Firing",
            stageTitle: "High-Pressure Travelling Grate Boiler",
            branchCategory: "primary-stream",
            technicalDescription:
              "Fires captive Napier grass briquettes and agricultural husk to generate high-pressure superheated steam while capturing fly ash via 4-field ESP.",
            keyOutputMetric: "100% Renewable Steam",
            carbonImpactNote:
              "Carbon-neutral agro-residue fuel replaces fossil coal in distillery steam generation.",
          },
          {
            stepNumber: "02",
            subLabel: "Cogeneration Power",
            stageTitle: "Back-Pressure Turbine Generator",
            branchCategory: "primary-stream",
            technicalDescription:
              "High-pressure steam expands through a back-pressure turbine to generate 100% of the plant's electricity before exhausting low-pressure steam to the distillation reboilers.",
            keyOutputMetric: ">82% CHP Thermal Cycle",
            carbonImpactNote:
              "Combined Heat & Power (CHP) loop eliminates grid power draw during normal operations.",
          },
          {
            stepNumber: "03",
            subLabel: "Whole Stillage Separation",
            stageTitle: "Decanter Centrifuges & MEE",
            branchCategory: "byproduct-branch",
            technicalDescription:
              "Bottom spent wash from the analyzer column is separated into wet cake and thin slop, which is concentrated to 35% w/w syrup in a 6-effect falling-film evaporator.",
            keyOutputMetric: "Zero Raw Spent Wash",
            carbonImpactNote:
              "Evaporator vapor condensate is recovered directly for closed-loop water reuse.",
          },
          {
            stepNumber: "04",
            subLabel: "Condensate Polishing Unit",
            stageTitle: "CPU Permeate Recycling (100% ZLD)",
            branchCategory: "co2-branch",
            technicalDescription:
              "Process condensates pass through anaerobic/aerobic polishing and RO membranes, returning crystal-clear water to cooling towers and grain slurry preparation.",
            keyOutputMetric: ">95% Water Recycled",
            carbonImpactNote:
              "Verified by real-time CPCB Online Continuous Effluent Monitoring System (OCEMS).",
          },
        ],
      },
    ],
    telemetry: {
      heading: "Distillation Telemetry & Resource Circularity",
      subheading:
        "Audited ethanol dispatch growth and resource-efficiency benchmarks across our automated grain biorefinery.",
      chartTitle: "Annual Fuel Ethanol Dispatched to OMCs (Million Liters)",
      chartUnit: "Million L",
      maxScale: 100,
      series: [
        {
          year: "Phase I",
          value: 42.0,
          displayValue: "42.0 ML",
          benchmarkNote: "Initial OMC Allocation",
        },
        {
          year: "Phase II",
          value: 64.5,
          displayValue: "64.5 ML",
          benchmarkNote: "MSDH Sieve Optimization",
        },
        {
          year: "Phase III",
          value: 78.2,
          displayValue: "78.2 ML",
          benchmarkNote: "250 KLPD Nameplate Run",
        },
        {
          year: "Current Run",
          value: 85.0,
          displayValue: "85.0 ML",
          benchmarkNote: "340+ Operating Days/Yr",
        },
      ],
      efficiencyBenchmarks: [
        {
          label: "Anhydrous Ethanol Purity (BIS IS 15464)",
          percentage: 99.8,
          valueText: "99.8% v/v",
          note: "Exceeds OMC specification for national E20 petrol blending",
        },
        {
          label: "Process Water Condensate Recycling (CPU)",
          percentage: 95.5,
          valueText: "95.5%",
          note: "Multi-Effect Evaporator + RO permeate returned to cooling & mashing",
        },
        {
          label: "Zero-Liquid Discharge (ZLD) Compliance",
          percentage: 100.0,
          valueText: "100%",
          note: "24×7 real-time OCEMS telemetry linked to CPCB servers",
        },
      ],
    },
    mediaGallery: {
      heading: "Biorefinery Operations & Infrastructure Media",
      subheading:
        "Inside our DCS control rooms, multi-pressure distillation towers, and PESO-certified bulk dispatch gantries.",
      slides: [
        {
          id: "ethanol-media-1",
          type: "video",
          src: "https://assets.mixkit.co/videos/preview/mixkit-industrial-plant-with-pipes-and-smoke-42654-large.mp4",
          posterUrl:
            "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85",
          title: "250 KLPD Multi-Pressure Distillation & MSDH Complex",
          caption:
            "Automated thermal vapor recompression columns producing fuel-grade anhydrous ethanol.",
          locationTag: "PBPL Distillation Island",
        },
        {
          id: "ethanol-media-2",
          type: "image",
          src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85",
          title: "PESO Class-A Bulk Storage & OMC Tanker Dispatch",
          caption:
            "Mass-flow metered loading bays ensuring rapid turnaround for IndianOil, BPCL, and HPCL tankers.",
          locationTag: "PBPL Tank Farm",
        },
        {
          id: "ethanol-media-3",
          type: "image",
          src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=85",
          title: "Captive Biomass Co-Generation Power Island",
          caption:
            "High-pressure boiler and back-pressure turbine supplying 100% captive steam and power.",
          locationTag: "PBPL Co-Gen Block",
        },
      ],
    },
    timeline: {
      heading: "Bio-Refinery Division Milestones",
      milestones: [
        {
          year: "2022",
          title: "Incorporation of Pingaksh Beverages (PBPL)",
          metric: "E20 Mandate",
          description:
            "Established as a dedicated green biofuels SPV under the Government of India's National Biofuel Policy.",
        },
        {
          year: "2023",
          title: "Financial Closure & Turnkey EPC Commencement",
          metric: "250 KLPD Design",
          description:
            "Secured environmental clearance, PESO approvals, and consortium project finance for the 100% ZLD grain distillery.",
        },
        {
          year: "2025",
          title: "Commissioning of 250 KLPD Anhydrous Complex",
          metric: "99.8% v/v Purity",
          description:
            "Synchronized captive co-generation island and commenced commercial anhydrous ethanol supplies to PSU OMCs.",
        },
      ],
    },
  },

  // =========================================================================
  // 3. CIRCULAR ECONOMY (DDGS, LIQUID CO2, BIO-ASH & NAPIER AGRO LOOP)
  // =========================================================================
  {
    slug: "circular-economy",
    name: "Circular Economy & Co-Products",
    shortName: "Circular Valorization",
    legalEntity: "PBPL Circular Valorization Division & Pingaksh Farms",
    seo: {
      title:
        "Circular Economy: High-Protein DDGS, Liquid CO₂ & ZLD | Pingaksh Renewables",
      description:
        "Explore Pingaksh Group's zero-waste industrial circularity: High-Protein DDGS animal feed, food-grade Liquid CO₂ & Dry Ice recovery, Potash Bio-Ash, and Napier Biomass.",
      keywords: [
        "High Protein DDGS Animal Feed India",
        "Fermentation CO2 Liquefaction Dry Ice",
        "Zero Liquid Discharge Distillery Byproducts",
        "Pingaksh Farms Super Napier Biomass",
      ],
    },
    hero: {
      title: "Zero-Waste Circular Industrial Ecosystem",
      subtitle:
        "Transforming 100% of post-distillation grain solids, fermentation carbon dioxide, and boiler bio-ash into high-value nutritional, industrial, and agrarian inputs.",
      heroImage:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85",
      heroImageAlt:
        "Circular Economy DDGS Recovery, CO2 Liquefaction and Sustainable Agro Estates",
      heroVideoUrl:
        "https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-green-field-on-a-sunny-day-42591-large.mp4",
      keyMetrics: [
        {
          label: "DDGS Crude Protein",
          value: "28–32",
          unit: "% High-Digestibility Feed",
        },
        {
          label: "Captured CO₂ Purity",
          value: "99.9",
          unit: "% Food & Industrial Grade",
        },
        {
          label: "Solid & Liquid Waste",
          value: "0.0",
          unit: "% Unrecovered Effluent",
        },
        {
          label: "Agrarian Partner Network",
          value: "5,000+",
          unit: "Rural Farming Households",
        },
      ],
    },
    overview: {
      headline:
        "Every byproduct stream is engineered as a primary feedstock for our next industrial or agricultural value chain.",
      leadParagraph:
        "At Pingaksh Group, circularity is a structural profit and sustainability engine. When grain starch is converted into fuel ethanol, all non-fermentable proteins, dietary fibers, and yeast nutrients remain concentrated in the stillage—which we recover via decanter centrifuges and rotary bundle dryers as Distillers Dried Grains with Solubles (DDGS).",
      bodyParagraph:
        "Simultaneously, raw carbon dioxide evolved during yeast fermentation is scrubbed, deodorized, and compressed into 99.9% pure Liquid CO₂ and Dry Ice, while potash-rich boiler fly ash returns to Pingaksh Farms to nourish high-yield Super Napier grass estates.",
      highlights: [
        {
          title: "High-Protein DDGS Animal Nutrition",
          detail:
            "Aflatoxin-controlled, antibiotic-free 28%–32% protein supplement replacing imported soymeal across poultry, dairy cattle, and aquaculture feed mills.",
        },
        {
          title: "Carbon Capture & Liquefaction (CCU)",
          detail:
            "Prevents biogenic greenhouse gas venting by converting fermentation off-gas into merchant liquid CO₂ for beverage carbonation, cold-chain logistics, and welding.",
        },
        {
          title: "Pingaksh Farms Backward Integration",
          detail:
            "Cultivates perennial Super Napier energy crops and aggregates farm-gate non-food grains while returning organic potash fertilizer to local soils.",
        },
      ],
    },
    assetsHeading: "Circular Valorization Units & Technical Datasheets",
    assetsDescription:
      "Select a circular recovery unit below to inspect its nutritional assay, gas purification tolerances, and agro-biomass specifications.",
    plantUnits: [
      {
        id: "ddgs-recovery-plant",
        name: "Decanter & Rotary Tube-Bundle DDGS Plant",
        location: "Co-Located at PBPL Biorefinery Complex",
        status: "Commercial Dispatch Active",
        capacity: "110–135 MT / Day DDGS",
        summary:
          "High-G decanter centrifuges, falling-film evaporators, and steam-heated rotary tube-bundle dryers producing golden, free-flowing high-protein DDGS.",
        image:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85",
        imageAlt: "High-Protein DDGS Animal Nutrition Processing Unit",
        technicalSpecs: [
          {
            parameter: "Crude Protein Content",
            specification: "28.0% – 32.0% (On Dry Basis)",
          },
          {
            parameter: "Moisture Specification",
            specification: "<10.0% w/w (Long Shelf-Life Pelleted/Meal)",
          },
          {
            parameter: "Crude Fat / Oil",
            specification: "4.5% – 6.5% Digestible Energy",
          },
          {
            parameter: "Drying Technology",
            specification: "Indirect Steam Rotary Tube-Bundle (Zero Scorching)",
          },
          {
            parameter: "Dispatch Packaging",
            specification: "Automated 50 kg PP Bags & Bulk Jumbo Bags",
          },
        ],
      },
      {
        id: "co2-liquefaction-unit",
        name: "Fermentation CO₂ Scrubbing & Liquefaction Plant",
        location: "Co-Located at PBPL Biorefinery Complex",
        status: "IS 307 Food-Grade Certified",
        capacity: "80–100 MT / Day Liquid CO₂",
        summary:
          "Multi-stage water scrubbing, activated carbon adsorption, oil-free compression, and cryogenic refrigeration liquefaction.",
        image:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85",
        imageAlt: "Cryogenic Liquid CO2 Storage Bullets and Compressors",
        technicalSpecs: [
          {
            parameter: "Product Purity",
            specification: ">99.9% v/v Food & Beverage Grade (IS 307)",
          },
          {
            parameter: "Purification Train",
            specification: "Foam Trap, Water Scrubber, KMnO4 & Carbon Beds",
          },
          {
            parameter: "Liquefaction Pressure",
            specification: "18–20 Bar Cryogenic Insulated Storage Bullets",
          },
          {
            parameter: "Dry Ice Capability",
            specification: "Hydraulic Pelletizer & High-Density Block Presses",
          },
        ],
      },
      {
        id: "pingaksh-farms-napier",
        name: "Pingaksh Farms: Super Napier & Potash Loop",
        location: "Uttarakhand & Northern Agrarian Belt",
        status: "Active Agrarian Network",
        capacity: "5,000+ Farmer Supply Chain",
        summary:
          "Backward-integrated cultivation of high-calorific Super Napier grass and direct farm-gate grain procurement paired with potash bio-ash soil enrichment.",
        image:
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1400&q=85",
        imageAlt: "Pingaksh Farms Super Napier Biomass Estates",
        technicalSpecs: [
          {
            parameter: "Primary Energy Crop",
            specification:
              "High-Yield Perennial Super Napier (CO-5 / Red Napier)",
          },
          {
            parameter: "Harvest Frequency",
            specification: "5 to 6 Multi-Cut Harvests Annually",
          },
          {
            parameter: "Biomass Calorific Value",
            specification: "3,600 – 4,000 kcal/kg (Dried Briquette Basis)",
          },
          {
            parameter: "Soil Nutrient Return",
            specification: "Potash-Rich Boiler Fly-Ash & Organic Compost",
          },
        ],
      },
    ],
    processSystems: [
      {
        id: "circular-ddgs-valorization",
        tabLabel: "01 · Stillage-to-DDGS Loop",
        systemTitle: "Zero-Waste Spent Grain Solids to High-Protein DDGS",
        baselineFormulaText:
          "100% Stillage Valorization · Replaces Imported Soymeal Protein",
        videoUrl:
          "https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-green-field-on-a-sunny-day-42591-large.mp4",
        videoPoster:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85",
        videoCaption:
          "Closed-loop separation, multi-effect evaporation, and gentle rotary steam drying turning 100% of post-distillation grain solids into high-protein DDGS.",
        steps: [
          {
            stepNumber: "01",
            subLabel: "Solid-Liquid Separation",
            stageTitle: "High-G Decanter Centrifugation",
            branchCategory: "byproduct-branch",
            technicalDescription:
              "Whole stillage exiting the distillation analyzer column enters high-speed horizontal scroll decanter centrifuges that separate suspended grain fiber and protein into wet cake.",
            keyOutputMetric: "32% Solids Wet Cake",
            carbonImpactNote:
              "Mechanical dewatering significantly reduces thermal energy needed in downstream drying.",
          },
          {
            stepNumber: "02",
            subLabel: "Soluble Nutrient Recovery",
            stageTitle: "6-Effect Falling-Film Evaporation",
            branchCategory: "byproduct-branch",
            technicalDescription:
              "Clarified thin slop from the decanters is concentrated under vacuum in a 6-effect evaporator train to form nutrient-dense Condensed Distillers Solubles (CDS syrup).",
            keyOutputMetric: "35% w/w Protein Syrup",
            carbonImpactNote:
              "Recovers 100% of water-soluble vitamins, yeast amino acids, and minerals.",
          },
          {
            stepNumber: "03",
            subLabel: "Homogeneous Blending",
            stageTitle: "Paddle Mixer & Rotary Tube-Bundle Dryer",
            branchCategory: "primary-stream",
            technicalDescription:
              "Wet cake and concentrated CDS syrup are blended in twin-shaft paddle mixers and dried via indirect steam rotary tube-bundle dryers to prevent protein scorching.",
            keyOutputMetric: "28–32% Crude Protein",
            carbonImpactNote:
              "Produces golden, highly digestible DDGS with <10% moisture for long shelf stability.",
          },
          {
            stepNumber: "04",
            subLabel: "Cooling & Automated Bagging",
            stageTitle: "Pneumatic Cooling & Feed Mill Dispatch",
            branchCategory: "co2-branch",
            technicalDescription:
              "Dried DDGS granules pass through counter-current air coolers to ambient temperature before automated weighing and bagging for poultry, cattle, and aqua feed integrators.",
            keyOutputMetric: "120+ MT/Day Nutraceutical Feed",
            carbonImpactNote:
              "Displaces land-intensive soymeal imports and eliminates distillery solid waste.",
          },
        ],
      },
      {
        id: "circular-co2-napier-loop",
        tabLabel: "02 · CO₂ Capture & Agro Loop",
        systemTitle: "Biogenic CO₂ Liquefaction & Napier Agrarian Cycle",
        baselineFormulaText:
          "99.9% Pure Biogenic CO₂ Captured · Closed-Loop Soil Potash Return",
        videoUrl:
          "https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-green-field-on-a-sunny-day-42591-large.mp4",
        videoPoster:
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=85",
        videoCaption:
          "Capturing fermentation carbon dioxide into merchant liquid CO₂ while cycling boiler potash ash back to Pingaksh Farms' Super Napier biomass estates.",
        steps: [
          {
            stepNumber: "01",
            subLabel: "Fermenter Header Collection",
            stageTitle: "Foam Trapping & Water Scrubbing",
            branchCategory: "co2-branch",
            technicalDescription:
              "Raw biogenic CO₂ gas evolved from closed fermentation vessels is piped through demisters and packed-bed water scrubbers to recover trace alcohol vapors.",
            keyOutputMetric: "100% Off-Gas Captured",
            carbonImpactNote:
              "Recovered alcohol traces are routed back to the analyzer column, boosting yield.",
          },
          {
            stepNumber: "02",
            subLabel: "Deodorization & Compression",
            stageTitle: "KMnO₄, Carbon Beds & Oil-Free Compressors",
            branchCategory: "co2-branch",
            technicalDescription:
              "Two-stage oil-free reciprocating compressors pressurize the gas through potassium permanganate, molecular desiccant dryers, and activated carbon towers.",
            keyOutputMetric: "Odor-Free <5 ppm Moisture",
            carbonImpactNote:
              "Meets stringent IS 307 food, beverage, and medical purity tolerances.",
          },
          {
            stepNumber: "03",
            subLabel: "Cryogenic Condensing",
            stageTitle: "Liquefaction Bullets & Dry Ice Presses",
            branchCategory: "primary-stream",
            technicalDescription:
              "Ammonia-cooled condensers liquefy the purified CO₂ at -25°C and 18 bar into insulated storage bullets and hydraulic dry-ice block/pellet presses.",
            keyOutputMetric: "99.9% Pure Liquid CO₂",
            carbonImpactNote:
              "Substitutes fossil-derived industrial CO₂ across cold-chain and beverage sectors.",
          },
          {
            stepNumber: "04",
            subLabel: "Agrarian Nutrient Return",
            stageTitle: "Potash Bio-Ash & Napier Biomass Cycle",
            branchCategory: "byproduct-branch",
            technicalDescription:
              "Potash-rich fly ash from our biomass co-generation boiler is granulated into organic soil conditioner for Pingaksh Farms' Super Napier grass plantations.",
            keyOutputMetric: "Zero Landfill Ash",
            carbonImpactNote:
              "Completes the soil-to-fuel-to-soil circular loop with 5,000+ local farmers.",
          },
        ],
      },
    ],
    telemetry: {
      heading: "Circular Recovery & Byproduct Valorization Telemetry",
      subheading:
        "Audited co-product output trajectory across high-protein DDGS nutrition, biogenic CO₂ liquefaction, and biomass utilization.",
      chartTitle:
        "Combined Annual Co-Product Recovery (Thousand Metric Tonnes)",
      chartUnit: "kMT",
      maxScale: 90,
      series: [
        {
          year: "Year 1",
          value: 34.0,
          displayValue: "34.0 kMT",
          benchmarkNote: "DDGS Line Commissioned",
        },
        {
          year: "Year 2",
          value: 51.5,
          displayValue: "51.5 kMT",
          benchmarkNote: "CO₂ Scrubber Integration",
        },
        {
          year: "Year 3",
          value: 66.8,
          displayValue: "66.8 kMT",
          benchmarkNote: "Dry Ice Pelletizer Added",
        },
        {
          year: "Current Run",
          value: 74.5,
          displayValue: "74.5 kMT",
          benchmarkNote: "100% Zero-Waste Run",
        },
      ],
      efficiencyBenchmarks: [
        {
          label: "Spent Grain Solids Recovered as High-Protein DDGS",
          percentage: 100.0,
          valueText: "100%",
          note: "Zero wet stillage disposal—100% converted into 28–32% protein feed",
        },
        {
          label: "Liquefied Biogenic CO₂ Purity (IS 307 Standard)",
          percentage: 99.9,
          valueText: "99.9%",
          note: "Certified for beverage carbonation, cold-chain dry ice & industrial use",
        },
        {
          label: "Boiler Fly-Ash Valorized into Potash & Bricks",
          percentage: 100.0,
          valueText: "100%",
          note: "Returned to agrarian soils and eco-brick units with zero landfilling",
        },
      ],
    },
    mediaGallery: {
      heading: "Circular Recovery & Agro-Biomass Media",
      subheading:
        "Visualizing our rotary DDGS dryers, cryogenic CO₂ storage bullets, and Super Napier biomass estates.",
      slides: [
        {
          id: "circular-media-1",
          type: "video",
          src: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-green-field-on-a-sunny-day-42591-large.mp4",
          posterUrl:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85",
          title: "Pingaksh Farms: Super Napier Biomass & Grain Estates",
          caption:
            "High-yield perennial energy crops and farm-gate grain aggregation powering our biorefinery.",
          locationTag: "Northern Agrarian Belt",
        },
        {
          id: "circular-media-2",
          type: "image",
          src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85",
          title: "High-Protein DDGS Drying & Automated Bagging Line",
          caption:
            "Indirect steam tube-bundle dryers preserving amino-acid digestibility for livestock nutrition.",
          locationTag: "PBPL DDGS Unit",
        },
        {
          id: "circular-media-3",
          type: "image",
          src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85",
          title: "Cryogenic Liquid CO₂ Storage & Tanker Dispatch",
          caption:
            "Capturing biogenic fermentation CO₂ for food-grade and cold-chain industrial applications.",
          locationTag: "PBPL CO₂ Recovery Plant",
        },
      ],
    },
    timeline: {
      heading: "Circular Economy & Agro Milestones",
      milestones: [
        {
          year: "2021",
          title: "Launch of Pingaksh Farms Agro-Initiatives",
          metric: "Super Napier",
          description:
            "Initiated high-biomass Super Napier cultivation and direct farm-gate grain procurement networks.",
        },
        {
          year: "2024",
          title: "Installation of Decanter & Tube-Bundle DDGS Line",
          metric: "28–32% Protein",
          description:
            "Commissioned zero-scorching indirect steam rotary dryers for high-protein animal feed production.",
        },
        {
          year: "2025",
          title: "Biogenic CO₂ Scrubbing & Liquefaction Plant",
          metric: "99.9% Pure CO₂",
          description:
            "Captured fermentation off-gases into cryogenic storage bullets and high-density dry ice presses.",
        },
        {
          year: "2026",
          title: "100% Closed-Loop Potash & ZLD Certification",
          metric: "Zero Waste",
          description:
            "Achieved complete circular valorization across water, grain solids, fermentation gas, and boiler bio-ash.",
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

// src/data/zeroLiquidDischargeData.ts

export interface ZldProcessStage {
  stageNumber: string;
  title: string;
  equipmentUnit: string;
  inputStream: string;
  outputStream: string;
  waterRecoveryMetric: string;
  technicalDescription: string;
  engineeringParameter: string;
}

export interface WaterQualityAssayRow {
  parameter: string;
  unit: string;
  rawSpentWashInfluent: string;
  treatedCpuRoPermeate: string;
  cpcbStatutoryLimit: string;
  reuseDestination: string;
}

export interface ZeroLiquidDischargePageData {
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    keywords: string[];
  };
  breadcrumbs: {
    label: string;
    href: string;
  }[];
  hero: {
    title: string;
    subtitle: string;
    complianceStandard: string;
    kpis: {
      label: string;
      value: string;
      unit: string;
      benchmarkNote: string;
    }[];
  };
  zldArchitecture: {
    heading: string;
    subheading: string;
    stages: ZldProcessStage[];
  };
  waterBalanceSimulator: {
    heading: string;
    subheading: string;
    // Multipliers per 1 KL (1,000 Liters) of Ethanol Produced
    rawStillageGeneratedLitersPerKl: number; // ~6,500 L spent wash per KL ethanol
    condensateRecycledLitersPerKl: number; // ~5,500 L purified water recycled per KL
    netFreshwaterMakeupLitersPerKl: number; // ~2,550 L (<2.6 L/L ethanol vs 8 L industry old norm)
    freshwaterSavedVsConventionalLitersPerKl: number; // ~5,450 L saved per KL vs conventional non-recycle
    wetCakeSolidsRecoveredKgPerKl: number; // ~720 kg dry-basis DDGS solids recovered per KL
  };
  waterQualityLedger: {
    heading: string;
    subheading: string;
    telemetryNote: string;
    assayRows: WaterQualityAssayRow[];
    hydroStewardshipCard: {
      title: string;
      metric: string;
      description: string;
      keyControls: string[];
    };
  };
}

export const ZERO_LIQUID_DISCHARGE_DATA: ZeroLiquidDischargePageData = {
  seo: {
    title:
      "100% Zero Liquid Discharge (ZLD) & Water Circularity | Pingaksh Renewables",
    description:
      "Technical audit of Pingaksh Renewables' 100% Zero Liquid Discharge (ZLD) closed-loop water recovery system—featuring high-G decanter centrifuges, 7-body Multi-Effect Evaporators (MEE), and RO Condensate Polishing Units (CPU).",
    canonicalUrl: "https://pingaksh.com/sustainability/zero-liquid-discharge",
    keywords: [
      "Zero Liquid Discharge Distillery India",
      "Multi Effect Evaporator MEE Ethanol ZLD",
      "Condensate Polishing Unit CPU Bio-Refinery",
      "Pingaksh Renewables Water Circularity",
      "CPCB Zero Effluent Compliance Grain Distillery",
    ],
  },

  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Sustainability", href: "/sustainability" },
    {
      label: "Zero Liquid Discharge (ZLD)",
      href: "/sustainability/zero-liquid-discharge",
    },
  ],

  hero: {
    title: "100% Zero Liquid Discharge & Closed-Loop Water Stewardship",
    subtitle:
      "Every drop of process water inside our 250 KLPD grain bio-refinery is separated, evaporated, purified through multi-stage Reverse Osmosis membranes, and recycled back into liquefaction and cooling towers—resulting in zero effluent discharge outside plant boundaries.",
    complianceStandard:
      "CPCB & MoEFCC Chartered ZLD Standard • Real-Time Online Effluent Monitoring (OCEMS)",
    kpis: [
      {
        label: "Industrial Effluent Discharged",
        value: "0.0",
        unit: "Liters / Day",
        benchmarkNote: "Strict boundary-wall Zero Liquid Discharge",
      },
      {
        label: "Process Water Recycle Ratio",
        value: "84.5%",
        unit: "Closed-Loop Recovery",
        benchmarkNote: "MEE + CPU RO Permeate returned to process",
      },
      {
        label: "Specific Freshwater Footprint",
        value: "< 2.6",
        unit: "Liters / Liter Ethanol",
        benchmarkNote: "67% lower than legacy distillery norms",
      },
      {
        label: "Hydro Cascade River Return",
        value: "100%",
        unit: "Non-Consumptive Flow",
        benchmarkNote: "Zero chemical addition in Sarju turbines",
      },
    ],
  },

  zldArchitecture: {
    heading: "6-Stage Closed-Loop ZLD Recovery Architecture",
    subheading:
      "Select any engineering unit in our downstream recovery train to inspect how high-COD distillation stillage is systematically transformed into crystal-clear boiler feedwater and high-protein DDGS livestock nutrition.",
    stages: [
      {
        stageNumber: "01",
        title: "Distillation Bottom Stillage (Whole Spent Wash) Extraction",
        equipmentUnit: "Analyzer Column Base & Heat Recovery Exchangers",
        inputStream: "Fermented Grain Mash (12–14% v/v Alcohol)",
        outputStream: "Dealcoholized Whole Stillage (~8–10% w/w Total Solids)",
        waterRecoveryMetric: "Thermal Heat Recovery: 32% Steam Saved",
        technicalDescription:
          "After stripping ethanol in vacuum distillation columns, the hot dealcoholized grain slurry (whole stillage) exits the column base through plate heat exchangers—pre-heating incoming fermented wash before entering solid-liquid separation.",
        engineeringParameter:
          "Operating Temp: 85°C – 92°C | Closed Piping Loop",
      },
      {
        stageNumber: "02",
        title: "High-G Horizontal Decanter Centrifugation",
        equipmentUnit: "3-Phase Stainless Steel Decanter Centrifuges",
        inputStream: "Whole Stillage Slurry",
        outputStream:
          "Wet Distillers Grains (32% Solids) + Thin Slop (4–5% Solids)",
        waterRecoveryMetric: "82% Liquid Mass Separated as Thin Slop",
        technicalDescription:
          "High-speed horizontal scroll centrifuges subject whole stillage to over 3,000 G-force, mechanically separating suspended grain fiber and protein cake (Wet Cake) from the clarified liquid fraction (Thin Slop).",
        engineeringParameter:
          " Bowl Speed: 3,200 RPM | SS-316L Duplex Wear Liners",
      },
      {
        stageNumber: "03",
        title: "7-Body Multi-Effect Evaporation (MEE) & Oil Recovery",
        equipmentUnit: "Falling-Film + Forced-Circulation Evaporator Train",
        inputStream: "Clarified Thin Slop (~20% recycled directly to Slurry)",
        outputStream:
          "Condensed Distillers Solubles (35% Syrup) + Process Condensate",
        waterRecoveryMetric:
          "88% Water Vaporized & Condensed as Pure Distillate",
        technicalDescription:
          "Thin slop is concentrated across a thermally integrated 7-body Falling-Film and Forced-Circulation evaporator driven by low-pressure exhaust vapors. Dissolved solids concentrate into a nutrient-rich 35% w/w protein syrup while water vapor condenses into clean process condensate.",
        engineeringParameter: "Specific Steam: 0.14 kg/kg Water Evaporated",
      },
      {
        stageNumber: "04",
        title: "Indirect Steam Rotary Tube-Bundle DDGS Drying",
        equipmentUnit: "Rotary Bundle Dryers &Vapour Scrubber Condenser",
        inputStream: "Wet Cake (Stage 02) + Concentrated Syrup (Stage 03)",
        outputStream: "Golden DDGS (<10.5% Moisture) + Dryer Vapor Condensate",
        waterRecoveryMetric: "Zero Liquid Residue • 180+ TPD Solid Feed Output",
        technicalDescription:
          "Wet cake from the centrifuges and concentrated syrup from the MEE are homogeneously mixed in a paddle mixer and dried inside indirect steam-heated rotary tube bundles—locking all remaining organic solids into commercial high-protein DDGS animal feed.",
        engineeringParameter:
          "Product Temp: < 78°C (Preserves Lysine Bioavailability)",
      },
      {
        stageNumber: "05",
        title: "Biological UASB, Extended Aeration & Tertiary Clarification",
        equipmentUnit: "Condensate Polishing Unit (CPU — Biological Stage)",
        inputStream: "MEE Process Condensate, Spent Lees & Floor Washings",
        outputStream: "Biologically Stabilized Low-COD Effluent + Biogas",
        waterRecoveryMetric: "94% Organic COD/BOD Reduction",
        technicalDescription:
          "Process condensate from the evaporators and column spent lees enter the Condensate Polishing Unit (CPU). Upflow Anaerobic Sludge Blanket (UASB) reactors convert trace volatile organic acids into methane-rich biogas (routed to boilers), followed by diffused-air aerobic polishing.",
        engineeringParameter:
          "HRT: 18–24 Hours | Automated Dissolved Oxygen Control",
      },
      {
        stageNumber: "06",
        title: "Ultrafiltration (UF) & Multi-Stage Reverse Osmosis (RO)",
        equipmentUnit: "Membrane Filtration & Permeate Recycle Header",
        inputStream: "Clarified CPU Water",
        outputStream: "Crystal-Clear RO Permeate (< 50 ppm TDS)",
        waterRecoveryMetric: "98%+ Membrane Recovery • 100% Internal Reuse",
        technicalDescription:
          "Biologically treated water passes through hollow-fiber Ultrafiltration (UF) and two-stage Reverse Osmosis (RO) membranes. The purified permeate is superior in quality to raw groundwater and is pumped directly back to grain liquefaction, fermenter cooling towers, and boiler feed makeup.",
        engineeringParameter:
          "Permeate TDS: < 50 mg/L | Reject Recycled to MEE",
      },
    ],
  },

  waterBalanceSimulator: {
    heading: "Interactive Refinery Water Mass-Balance Ledger",
    subheading:
      "Select an operational scale below to audit how process water is recovered, purified, and recirculated across our distillation and ZLD units.",
    rawStillageGeneratedLitersPerKl: 6500,
    condensateRecycledLitersPerKl: 5500,
    netFreshwaterMakeupLitersPerKl: 2550,
    freshwaterSavedVsConventionalLitersPerKl: 5450,
    wetCakeSolidsRecoveredKgPerKl: 720,
  },

  waterQualityLedger: {
    heading: "Influent vs. Polished RO Permeate Water Quality Assay",
    subheading:
      "Laboratory analytical comparison demonstrating the purification performance of Pingaksh's MEE + CPU membrane train against Central Pollution Control Board (CPCB) reuse standards.",
    telemetryNote:
      "Verified via 24×7 PTZ Webcams, Electromagnetic Flowmeters, and Online Continuous Effluent Monitoring System (OCEMS) linked directly to SPCB/CPCB servers.",
    assayRows: [
      {
        parameter: "pH Level",
        unit: "pH Scale",
        rawSpentWashInfluent: "3.8 – 4.3 (Acidic)",
        treatedCpuRoPermeate: "7.1 – 7.4 (Neutral)",
        cpcbStatutoryLimit: "6.5 – 8.5",
        reuseDestination: "Fermentation Slurry & Cooling Tower Makeup",
      },
      {
        parameter: "Chemical Oxygen Demand (COD)",
        unit: "mg / Liter",
        rawSpentWashInfluent: "45,000 – 55,000 mg/L",
        treatedCpuRoPermeate: "< 25 mg/L",
        cpcbStatutoryLimit: "< 100 mg/L (Reuse Grade)",
        reuseDestination: "Closed-Loop ProcessLiquefaction",
      },
      {
        parameter: "Biochemical Oxygen Demand (BOD₃ at 27°C)",
        unit: "mg / Liter",
        rawSpentWashInfluent: "22,000 – 28,000 mg/L",
        treatedCpuRoPermeate: "< 5 mg/L",
        cpcbStatutoryLimit: "< 30 mg/L (Reuse Grade)",
        reuseDestination: "High-Pressure Boiler DM Plant Feed",
      },
      {
        parameter: "Total Dissolved Solids (TDS)",
        unit: "mg / Liter",
        rawSpentWashInfluent: "18,000 – 24,000 mg/L",
        treatedCpuRoPermeate: "< 45 mg/L",
        cpcbStatutoryLimit: "< 500 mg/L",
        reuseDestination: "Zero Scaling in Condenser Tubes",
      },
      {
        parameter: "Total Suspended Solids (TSS)",
        unit: "mg / Liter",
        rawSpentWashInfluent: "65,000 – 80,000 mg/L",
        treatedCpuRoPermeate: "Nil (0.0 mg/L)",
        cpcbStatutoryLimit: "< 50 mg/L",
        reuseDestination: "100% Solids Captured into DDGS Feed",
      },
      {
        parameter: "External Boundary Effluent Discharge",
        unit: "KL / Day",
        rawSpentWashInfluent: "1,625 KL/Day Generated",
        treatedCpuRoPermeate: "0.0 KL/Day Discharged",
        cpcbStatutoryLimit: "0.0 KL/Day (Strict ZLD)",
        reuseDestination: "100% Internal Plant Recirculation",
      },
    ],
    hydroStewardshipCard: {
      title: "Himalayan Hydro Water Stewardship (Sarju I, II & III Cascade)",
      metric: "100% Non-Consumptive Tailrace Return",
      description:
        "Across our 33.0 MW hydroelectric operations in Bageshwar, Uttarakhand, river water serves purely as a kinetic gravitational medium. Not a single liter is consumed, heated, or chemically altered.",
      keyControls: [
        "Uninterrupted minimum environmental flow (e-Flow) released downstream of every diversion trench weir to sustain native snow-trout habitats.",
        "Oil-free self-lubricating turbine guide bearings and closed-loop governor hydraulics prevent any hydrocarbon contact with river water.",
        "Automated dissolved-oxygen and turbidity sensors at both intake desilting basins and tailrace outfalls.",
      ],
    },
  },
};

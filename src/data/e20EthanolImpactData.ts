// src/data/e20EthanolImpactData.ts

export interface TailpipePollutantMetric {
  id: string;
  pollutant: string;
  chemicalSymbol: string;
  twoWheelerReductionPct: number;
  fourWheelerReductionPct: number;
  purePetrolBaselineIndex: number; // Normalized 100% baseline
  combustionMechanism: string;
  healthAndClimateBenefit: string;
}

export interface FuelPropertyRow {
  property: string;
  purePetrolE0: string;
  anhydrousEthanolE100: string;
  blendedE20Fuel: string;
  engineeringAdvantage: string;
}

export interface WellToWheelStage {
  stageCode: string;
  stageName: string;
  petrolGramsCo2PerLiter: number;
  ethanolGramsCo2PerLiter: number;
  technicalExplanation: string;
}

export interface E20EthanolImpactPageData {
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
    policyAlignment: string;
    kpis: {
      label: string;
      value: string;
      comparisonNote: string;
      subtext: string;
    }[];
  };
  tailpipeSection: {
    heading: string;
    subheading: string;
    sourceCitation: string;
    pollutants: TailpipePollutantMetric[];
    fuelProperties: FuelPropertyRow[];
  };
  substitutionMatrix: {
    heading: string;
    subheading: string;
    // Base multipliers per 1,000 Liters (1 KL) of Anhydrous Ethanol
    co2SavedTonnesPerKl: number; // 1.65 MT per KL (1.65 kg/L)
    crudeBarrelsReplacedPerKl: number; // ~6.29 Barrels (1 Barrel = 159 Liters)
    forexSavedInrPerKl: number; // ~₹44,500 per KL import substitution
    grainProcuredTonnesPerKl: number; // ~2.27 MT grain per KL ethanol
    ddgsProducedTonnesPerKl: number; // ~0.72 MT high-protein DDGS per KL
    co2CapturedTonnesPerKl: number; // ~0.24 MT food-grade CO2 captured per KL
  };
  wellToWheelLedger: {
    heading: string;
    subheading: string;
    purePetrolTotalGramsPerLiter: number;
    pingakshEthanolNetGramsPerLiter: number;
    netSavedGramsPerLiter: number;
    stages: WellToWheelStage[];
  };
}

export const E20_ETHANOL_IMPACT_DATA: E20EthanolImpactPageData = {
  seo: {
    title:
      "E20 Ethanol vs. Pure Petrol Impact: Tailpipe Emissions & Crude Substitution | Pingaksh Renewables",
    description:
      "Technical audit of E20 grain bio-ethanol vs. pure fossil petrol—quantifying tailpipe CO, hydrocarbon, and CO₂ emission savings alongside crude oil import substitution from Pingaksh's 250–350 KLPD distillery.",
    canonicalUrl: "https://pingaksh.com/sustainability/e20-ethanol-impact",
    keywords: [
      "E20 Ethanol vs Pure Petrol Impact",
      "Tailpipe Emission Savings E20 Fuel India",
      "Crude Oil Import Substitution Ethanol",
      "Pingaksh Green Fuels 250 KLPD Carbon Offset",
      "Grain Ethanol Well to Wheel Lifecycle Emissions",
    ],
  },

  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Sustainability", href: "/sustainability" },
    {
      label: "E20 Ethanol vs. Pure Petrol Impact",
      href: "/sustainability/e20-ethanol-impact",
    },
  ],

  hero: {
    title: "E20 Ethanol vs. Pure Petrol Impact",
    subtitle:
      "Quantifying tailpipe emission reductions, octane combustion efficiency, and sovereign crude oil import substitution pegged to Pingaksh Renewables' 250–350 KLPD grain bio-refinery.",
    policyAlignment:
      "National Biofuel Policy & NITI Aayog / ARAI E20 Roadmap Benchmark",
    kpis: [
      {
        label: "Net Carbon Saved Per Liter",
        value: "1.65 kg CO₂",
        comparisonNote: "vs. 2.31 kg CO₂/L Pure Petrol",
        subtext: "71.4% net lifecycle GHG reduction",
      },
      {
        label: "Daily Distillery Offset (250 KLPD)",
        value: "412.50 MT",
        comparisonNote: "250,000 Liters / Day Output",
        subtext: "577.50 MT/day at 350 KLPD expansion",
      },
      {
        label: "Tailpipe Carbon Monoxide (CO) Cut",
        value: "-50% to -55%",
        comparisonNote: "vs. E0 Baseline Gasoline",
        subtext: "Oxygenated complete fuel combustion",
      },
      {
        label: "Research Octane Number (RON)",
        value: "108 RON",
        comparisonNote: "vs. 91 RON Regular Petrol",
        subtext: "Eliminates carcinogenic MTBE/BTEX boosters",
      },
    ],
  },

  tailpipeSection: {
    heading: "Tailpipe Emission Savings: E20 Blend vs. Pure Fossil Petrol (E0)",
    subheading:
      "Anhydrous ethanol (C₂H₅OH) contains 34.7% molecular oxygen by weight. Blending 20% grain ethanol into motor gasoline promotes cleaner, cooler, and more complete cylinder combustion—drastically cutting urban air pollutants.",
    sourceCitation:
      "Benchmark Reference: NITI Aayog & Ministry of Petroleum and Natural Gas (MoPNG) / ARAI E20 Vehicular Emission Study",
    pollutants: [
      {
        id: "carbon-monoxide",
        pollutant: "Carbon Monoxide Emissions",
        chemicalSymbol: "CO",
        twoWheelerReductionPct: 55,
        fourWheelerReductionPct: 30,
        purePetrolBaselineIndex: 100,
        combustionMechanism:
          "In-built fuel oxygen oxidizes fuel-rich pockets inside the combustion chamber that would otherwise exit as toxic CO gas.",
        healthAndClimateBenefit:
          "Directly reduces urban street-level carboxyhemoglobin health risks and ground-level smog formation.",
      },
      {
        id: "hydrocarbons",
        pollutant: "Unburned Hydrocarbons",
        chemicalSymbol: "HC / VOCs",
        twoWheelerReductionPct: 20,
        fourWheelerReductionPct: 20,
        purePetrolBaselineIndex: 100,
        combustionMechanism:
          "Higher flame speed and faster evaporation via high latent heat of vaporization eliminate quench-layer unburned fuel.",
        healthAndClimateBenefit:
          "Curbs volatile organic compounds (VOCs) and carcinogenic benzene/toluene exhaust plumes.",
      },
      {
        id: "lifecycle-co2",
        pollutant: "Net Well-to-Wheel Carbon Dioxide",
        chemicalSymbol: "CO₂ (Lifecycle)",
        twoWheelerReductionPct: 71,
        fourWheelerReductionPct: 71,
        purePetrolBaselineIndex: 100,
        combustionMechanism:
          "Photosynthetic carbon uptake during grain growth + 60 TPD fermentation CO₂ capture offsets tailpipe carbon release.",
        healthAndClimateBenefit:
          "Displaces 1.65 kg of fossil carbon dioxide for every liter of anhydrous ethanol blended.",
      },
      {
        id: "particulate-aromatics",
        pollutant: "Aromatic Soot & Fine Particulates",
        chemicalSymbol: "PM₂.₅ / BTEX",
        twoWheelerReductionPct: 34,
        fourWheelerReductionPct: 31,
        purePetrolBaselineIndex: 100,
        combustionMechanism:
          "Ethanol contains zero carbon-to-carbon double rings (aromatics) or sulfur, preventing soot nucleation.",
        healthAndClimateBenefit:
          "Replaces toxic aromatic octane enhancers (Benzene, Toluene, Xylene) in refinery gasoline pools.",
      },
    ],
    fuelProperties: [
      {
        property: "Chemical Composition & Oxygen Content",
        purePetrolE0: "C₄–C₁₂ Hydrocarbons (0% w/w Oxygen)",
        anhydrousEthanolE100: "Pure C₂H₅OH (34.7% w/w Oxygen)",
        blendedE20Fuel: "6.9% w/w Molecular Oxygen",
        engineeringAdvantage:
          "Enables lean, complete stoichiometry with lower carbon monoxide and soot formation.",
      },
      {
        property: "Research Octane Number (RON)",
        purePetrolE0: "91.0 RON",
        anhydrousEthanolE100: "108.0 RON",
        blendedE20Fuel: "95.0 – 98.0 RON",
        engineeringAdvantage:
          "Prevents engine knocking and supports higher compression-ratio thermal efficiency.",
      },
      {
        property: "Latent Heat of Vaporization",
        purePetrolE0: "349 kJ / kg",
        anhydrousEthanolE100: "920 kJ / kg",
        blendedE20Fuel: "465 kJ / kg",
        engineeringAdvantage:
          "Charge-cooling effect lowers peak cylinder temperature and increases volumetric density.",
      },
      {
        property: "Sulfur & Poly-Aromatic Content",
        purePetrolE0: "Up to 10 ppm Sulfur / 35% Aromatics",
        anhydrousEthanolE100: "0 ppm Sulfur / 0% Aromatics",
        blendedE20Fuel: "20% Dilution of Fossil Aromatics",
        engineeringAdvantage:
          "Extends catalytic converter lifespan and eliminates sulfate particulate formation.",
      },
    ],
  },

  substitutionMatrix: {
    heading: "Crude Import Substitution & Rural Bio-Economy Multiplier",
    subheading:
      "Select an operational volume below to see how Pingaksh's grain distillery simultaneously substitutes imported crude oil, conserves sovereign foreign exchange, and circulates capital into Indian farming households.",
    co2SavedTonnesPerKl: 1.65,
    crudeBarrelsReplacedPerKl: 6.29,
    forexSavedInrPerKl: 44500,
    grainProcuredTonnesPerKl: 2.27,
    ddgsProducedTonnesPerKl: 0.72,
    co2CapturedTonnesPerKl: 0.24,
  },

  wellToWheelLedger: {
    heading: "Well-to-Wheel (WTW) Carbon Accounting per Liter",
    subheading:
      "How Pingaksh achieves a net saving of 1,650 grams (1.65 kg) of CO₂ per liter of grain ethanol compared to pure fossil petrol through biomass cogeneration and cryogenic fermentation CO₂ capture.",
    purePetrolTotalGramsPerLiter: 2310,
    pingakshEthanolNetGramsPerLiter: 660,
    netSavedGramsPerLiter: 1650,
    stages: [
      {
        stageCode: "WTW 01",
        stageName: "Feedstock Cultivation / Crude Oil Extraction",
        petrolGramsCo2PerLiter: 310,
        ethanolGramsCo2PerLiter: 380,
        technicalExplanation:
          "Crude oil requires offshore/deep-well drilling, flaring, and ocean tanker transport. Pingaksh procures non-food broken rice and maize from regional FPO clusters within a short haulage radius.",
      },
      {
        stageCode: "WTW 02",
        stageName: "Refining / Multi-Pressure Distillation & ZLD",
        petrolGramsCo2PerLiter: 240,
        ethanolGramsCo2PerLiter: 80,
        technicalExplanation:
          "Fossil refineries burn natural gas and petcoke for fractional distillation. Pingaksh powers 100% of its distillation and ZLD evaporators using a 6.5 MW captive renewable rice-husk/biomass cogeneration plant.",
      },
      {
        stageCode: "WTW 03",
        stageName:
          "Co-Product Credits (DDGS Nutrition & Cryogenic CO₂ Capture)",
        petrolGramsCo2PerLiter: 0,
        ethanolGramsCo2PerLiter: -240,
        technicalExplanation:
          "Capturing 60 TPD of pure fermentation CO₂ and producing 180+ TPD of high-protein DDGS animal feed generates a direct -240g CO₂e/Liter lifecycle displacement credit.",
      },
      {
        stageCode: "WTW 04",
        stageName: "Net Non-Biogenic Tailpipe Combustion",
        petrolGramsCo2PerLiter: 1760,
        ethanolGramsCo2PerLiter: 440,
        technicalExplanation:
          "Combusting fossil petrol releases ancient geological carbon into the atmosphere. Ethanol combustion recycles atmospheric carbon recently fixed via crop photosynthesis.",
      },
    ],
  },
};

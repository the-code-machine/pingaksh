// src/data/subsidiaryLeadershipData.ts

export type SubsidiaryEntityId =
  | "ubhp-hydro"
  | "pingaksh-bio-energy"
  | "pingaksh-agro-circular";

export interface SubsidiaryEntityInfo {
  id: SubsidiaryEntityId;
  legalName: string;
  shortName: string;
  headquarters: string;
  coreMandate: string;
  flagshipAssetMetric: string;
}

export interface SubsidiaryLeaderProfile {
  slug: string;
  name: string;
  designation: string;
  subsidiaryId: SubsidiaryEntityId;
  subsidiaryName: string;
  operationalBase: string;
  experienceYears: string;
  appointedSince: string;
  qualifications: string[];
  almaMater: string;
  portraitImage: string;
  portraitAlt: string;
  shortSummary: string;
  executiveQuote: string;
  biographyParagraphs: string[];
  operationalMandates: string[];
  keyProjectsDelivered: {
    project: string;
    role: string;
    capacityOrMetric: string;
  }[];
  professionalAffiliations: string[];
}

export interface SubsidiaryLeadershipPageData {
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
  };
  breadcrumbs: {
    label: string;
    href: string;
  }[];
  hero: {
    title: string;
    subtitle: string;
    summaryStat: string;
  };
  entities: SubsidiaryEntityInfo[];
  leaders: SubsidiaryLeaderProfile[];
}

export const SUBSIDIARY_LEADERSHIP_DATA: SubsidiaryLeadershipPageData = {
  seo: {
    title:
      "Subsidiary & Operating Leadership | UBHP Hydro & Pingaksh Bio-Energy",
    description:
      "Meet the Chief Operating Officers, Plant Heads, and Technical Presidents leading Pingaksh Group's operating subsidiaries across Uttar Bharat Hydro Power (UBHP), Pingaksh Bio-Energy, and Circular Agro-Resources.",
    canonicalUrl: "https://pingaksh.com/who-we-are/subsidiary-leadership",
  },

  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Who We Are", href: "/who-we-are" },
    {
      label: "Subsidiary Leadership",
      href: "/who-we-are/subsidiary-leadership",
    },
  ],

  hero: {
    title: "Subsidiary & Operating Leadership",
    subtitle:
      "While the Group Board sets capital allocation and fiduciary governance, our operating subsidiaries are led by domain veterans in Himalayan hydro-mechanical engineering, ZLD bioprocess distillation, and agrarian supply chains.",
    summaryStat:
      "3 Operating Subsidiary Entities • 6 Division Heads & Plant Chiefs",
  },

  entities: [
    {
      id: "ubhp-hydro",
      legalName: "Uttar Bharat Hydro Power Private Limited (UBHP)",
      shortName: "UBHP Hydro Power",
      headquarters: "Kapkot, Bageshwar District, Uttarakhand",
      coreMandate:
        "Operation, maintenance, and upstream expansion of the 33.0 MW Sarju-I, Sarju-II, and Sarju-III run-of-the-river hydroelectric cascade.",
      flagshipAssetMetric: "33.0 MW Cascade • 99.4% Plant Availability",
    },
    {
      id: "pingaksh-bio-energy",
      legalName: "Pingaksh Bio-Energy & Green Fuels Limited",
      shortName: "Pingaksh Bio-Energy",
      headquarters: "Integrated Bio-Refinery Complex, Northern India",
      coreMandate:
        "Commercial operation of the 250 KLPD grain-based E20 ethanol refinery, 6.5 MW captive cogeneration plant, and 100% Zero-Liquid-Discharge recovery loop.",
      flagshipAssetMetric: "250 KLPD E20 Ethanol • 100% ZLD",
    },
    {
      id: "pingaksh-agro-circular",
      legalName: "Pingaksh Agro & Circular Bio-Resources Division",
      shortName: "Pingaksh Circular & Farms",
      headquarters: "Northern India Agrarian Outgrower Clusters",
      coreMandate:
        "High-protein DDGS animal nutrition commercialization, 60 TPD cryogenic CO₂ liquefaction, and Super Napier biomass contract farming.",
      flagshipAssetMetric: "180+ TPD DDGS • 60 TPD Liquid CO₂",
    },
  ],

  leaders: [
    // =========================================================================
    // 1. UBHP HYDRO POWER LEADERS
    // =========================================================================
    {
      slug: "vikramaditya-neg-hydro",
      name: "Er. Vikramaditya Singh Negi",
      designation: "Chief Operating Officer — UBHP Hydro Cascade",
      subsidiaryId: "ubhp-hydro",
      subsidiaryName: "Uttar Bharat Hydro Power Private Limited (UBHP)",
      operationalBase: "Bageshwar & Dehradun, Uttarakhand",
      experienceYears: "28+ Years in Himalayan Hydro O&M",
      appointedSince: "2015",
      qualifications: [
        "M.E. in Hydro-Mechanical & Turbine Systems",
        "B.Tech in Electrical & Power Systems Engineering",
      ],
      almaMater: "GBPUAT Pantnagar & IIT Roorkee (Exec. Hydro Program)",
      portraitImage:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
      portraitAlt:
        "Er. Vikramaditya Singh Negi - Chief Operating Officer of UBHP Hydro Cascade",
      shortSummary:
        "Commands day-to-day generation, SCADA load dispatch, and UPCL grid synchronization across Sarju-I (7.5 MW), Sarju-II (15 MW), and Sarju-III (10.5 MW).",
      executiveQuote:
        "In high-head Himalayan hydro, plant availability is won during the monsoon—through real-time silt monitoring, tungsten-carbide runner upkeep, and disciplined switchyard telemetry.",
      biographyParagraphs: [
        "Er. Vikramaditya Singh Negi serves as Chief Operating Officer of Uttar Bharat Hydro Power Private Limited (UBHP), overseeing all operational, electro-mechanical, and grid-evacuation functions across the Sarju River hydroelectric cascade in Bageshwar district.",
        "With over 28 years of field leadership in Uttarakhand's snow-fed river basins, he previously managed powerhouse commissioning and O&M for major state and private run-of-the-river stations in the Alaknanda and Bhagirathi valleys.",
        "At UBHP, he led the implementation of centralized PLC-SCADA telemetry linking all three Sarju powerhouses and introduced High-Velocity Oxygen-Fuel (HVOF) ceramic-metallic coatings on horizontal Francis turbine runners—pushing cascade availability to 99.4%.",
      ],
      operationalMandates: [
        "24×7 synchronous generation and 33kV/132kV UPCL grid evacuation",
        "Monsoon hydrology management and automated desilting chamber flushing",
        "Predictive vibration diagnostics across 8 horizontal Francis generating units",
        "Statutory tariff & availability reporting to UERC and SLDC Dehradun",
      ],
      keyProjectsDelivered: [
        {
          project: "Sarju-II High-Head Powerhouse (155m Net Head)",
          role: "Chief Commissioning & O&M Lead",
          capacityOrMetric: "15.0 MW (68.4 MU/Yr)",
        },
        {
          project: "Sarju Cascade Unified SCADA & Optical Fiber Grid Link",
          role: "Project Director",
          capacityOrMetric: "33.0 MW Integrated Telemetry",
        },
      ],
      professionalAffiliations: [
        "Senior Member, International Hydropower Association (IHA)",
        "Chartered Engineer, Institution of Engineers (India)",
      ],
    },
    {
      slug: "kundan-lal-joshi",
      name: "Er. Kundan Lal Joshi",
      designation:
        "Vice President — Civil Tunnels, Dam Safety & Catchment Ecology",
      subsidiaryId: "ubhp-hydro",
      subsidiaryName: "Uttar Bharat Hydro Power Private Limited (UBHP)",
      operationalBase: "Kapkot Valley, Bageshwar, Uttarakhand",
      experienceYears: "25+ Years in Himalayan Rock Tunneling & Geology",
      appointedSince: "2016",
      qualifications: [
        "M.Sc. Tech in Engineering Geology & Rock Mechanics",
        "B.E. in Civil Engineering",
      ],
      almaMater: "Banaras Hindu University (IIT-BHU)",
      portraitImage:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85",
      portraitAlt:
        "Er. Kundan Lal Joshi - Vice President Civil & Catchment Ecology at UBHP",
      shortSummary:
        "Oversees diversion trench weirs, 2.4+ km underground headrace tunnels, high-pressure steel penstock slope stability, and statutory e-Flow releases.",
      executiveQuote:
        "Our civil structures are engineered to coexist with the Sarju gorge—routing water underground through solid rock so the surface forest and river ecology remain untouched.",
      biographyParagraphs: [
        "Er. Kundan Lal Joshi heads Civil Infrastructure, Geotechnical Safety, and Catchment Stewardship at Uttar Bharat Hydro Power Private Limited. An engineering geologist and civil engineer by training, he specializes in Himalayan slope stabilization, surge shaft hydraulics, and boulder-resistant drop trench weirs.",
        "He manages structural health monitoring across UBHP's underground water conductor systems and oversees mandatory ecological river flow (e-Flow) compliance, catchment afforestation, and local village infrastructure initiatives in Kapkot tehsil.",
      ],
      operationalMandates: [
        "Structural integrity of diversion trench weirs, desilting basins, and headrace tunnels",
        "Geotechnical instrumentation and penstock anchor-block slope stability",
        "Continuous statutory minimum environmental flow (e-Flow) verification",
        "Community liaison and CSR watershed development in Bageshwar villages",
      ],
      keyProjectsDelivered: [
        {
          project: "Sarju-III & Sarju-II Underground Headrace Tunnels",
          role: "Head of Geotechnical & Tunnel Lining",
          capacityOrMetric: "4.8+ km Combined Rock Tunneling",
        },
        {
          project: "Sarju Basin Catchment Afforestation Program",
          role: "Program Lead",
          capacityOrMetric: "120,000+ Native Oak & Pine Saplings",
        },
      ],
      professionalAffiliations: [
        "Life Member, Indian Society for Rock Mechanics and Tunnelling Technology (ISRMTT)",
      ],
    },

    // =========================================================================
    // 2. PINGAKSH BIO-ENERGY & GREEN FUELS LEADERS
    // =========================================================================
    {
      slug: "harpreet-singh-gill",
      name: "Mr. Harpreet Singh Gill",
      designation: "President & Plant Head — 250 KLPD Grain Bio-Refinery",
      subsidiaryId: "pingaksh-bio-energy",
      subsidiaryName: "Pingaksh Bio-Energy & Green Fuels Limited",
      operationalBase: "Integrated Bio-Energy Complex, Northern India",
      experienceYears: "24+ Years in Multi-Pressure Grain Distilleries",
      appointedSince: "2021",
      qualifications: [
        "DIFAT (Post-Graduate Diploma in Industrial Fermentation & Alcohol Technology)",
        "B.Sc. in Industrial Chemistry",
      ],
      almaMater:
        "Vasantdada Sugar Institute (VSI) & National Sugar Institute (NSI Kanpur)",
      portraitImage:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=85",
      portraitAlt:
        "Mr. Harpreet Singh Gill - President & Plant Head of Pingaksh Bio-Energy",
      shortSummary:
        "Directs end-to-end operations of the 250 KLPD fuel ethanol complex, enzymatic fermentation yields, PESO tank-farm safety, and OMC dispatch logistics.",
      executiveQuote:
        "Running a 330-day continuous grain bio-refinery requires absolute synchronization between enzymatic fermentation, multi-pressure thermal integration, and zero-defect OMC dispatch.",
      biographyParagraphs: [
        "Mr. Harpreet Singh Gill serves as President and Plant Head of Pingaksh Bio-Energy & Green Fuels Limited. A credentialed alcohol technologist with over two decades of leadership in large-scale grain and dual-feed distilleries across Punjab, Uttar Pradesh, and Maharashtra, he led the greenfield commissioning of Pingaksh's 250 KLPD bio-refinery.",
        "He oversees raw grain milling, high-gravity enzymatic liquefaction, continuous yeast fermentation, vacuum distillation, and vapor-phase Molecular Sieve Dehydration (MSDH)—consistently achieving 99.8% v/v anhydrous ethanol purity for Indian Oil, BPCL, and HPCL.",
      ],
      operationalMandates: [
        "330+ days annual plant uptime across the 250 KLPD distillation block",
        "Fermentation recovery optimization (>94.8% efficiency) across maize and rice feedstocks",
        "PESO-licensed ethanol storage tank farm safety and OMC tanker gantry dispatch",
        "6.5 MW captive biomass cogeneration turbine and 45 TPH boiler synchronization",
      ],
      keyProjectsDelivered: [
        {
          project: "250 KLPD Greenfield Grain Distillery & MSDH Block",
          role: "Plant Commissioning Director",
          capacityOrMetric: "86.25 Million Liters / Year E20 Fuel",
        },
        {
          project: "6.5 MW Captive Rice-Husk Cogeneration Power Plant",
          role: "Execution Head",
          capacityOrMetric: "100% Captive Steam & Power Self-Sufficiency",
        },
      ],
      professionalAffiliations: [
        "Fellow, Sugar Technologists' Association of India (STAI)",
        "Technical Committee Member, All India Distillers' Association (AIDA)",
      ],
    },
    {
      slug: "ananya-kulkarni-zld",
      name: "Dr. Ananya Kulkarni",
      designation:
        "Vice President — ZLD Water Recovery, EHS & Quality Assurance",
      subsidiaryId: "pingaksh-bio-energy",
      subsidiaryName: "Pingaksh Bio-Energy & Green Fuels Limited",
      operationalBase: "Integrated Bio-Energy Complex",
      experienceYears:
        "19+ Years in Industrial ZLD Membranes & Environmental Compliance",
      appointedSince: "2022",
      qualifications: [
        "Ph.D. in Environmental & Membrane Process Engineering",
        "M.Tech in Chemical Engineering",
      ],
      almaMater: "IIT Bombay",
      portraitImage:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85",
      portraitAlt:
        "Dr. Ananya Kulkarni - Vice President of ZLD Water Recovery & Quality Assurance",
      shortSummary:
        "Commands the 7-body Multi-Effect Evaporator (MEE), UASB-RO Condensate Polishing Unit (CPU), CPCB online telemetry, and IS-15464 gas-chromatography quality labs.",
      executiveQuote:
        "Zero Liquid Discharge is not an end-of-pipe treatment at Pingaksh; it is a closed thermodynamic loop that recycles 84.5% of our process water back into fermentation.",
      biographyParagraphs: [
        "Dr. Ananya Kulkarni leads Zero-Liquid-Discharge (ZLD) Operations, Environmental Health & Safety (EHS), and Analytical Quality Assurance at Pingaksh Bio-Energy. Holding a doctorate from IIT Bombay in industrial membrane separation, she designed the refinery's closed-loop water balance.",
        "She supervises the high-G decanter centrifuges, 7-effect falling-film evaporators, anaerobic UASB digesters, and two-stage Reverse Osmosis (RO) Condensate Polishing Unit—ensuring 0.0 liters of external effluent discharge and real-time OCEMS compliance with CPCB servers.",
      ],
      operationalMandates: [
        "100% boundary-wall Zero Liquid Discharge (ZLD) and 84.5% condensate recycling",
        "24×7 CPCB/SPCB Online Continuous Effluent Monitoring System (OCEMS) integrity",
        "IS-15464:2004 fuel ethanol gas-chromatography certification for every OMC batch",
        "ISO 14001 & ISO 45001 occupational safety and process hazard audits (HAZOP)",
      ],
      keyProjectsDelivered: [
        {
          project:
            "7-Body Integrated MEE & Two-Stage RO Condensate Polishing Plant",
          role: "Lead Process Architect",
          capacityOrMetric: "< 2.6 L Freshwater / Liter Ethanol",
        },
        {
          project: "NABL-Aligned Ethanol & Mycotoxin Analytical Laboratory",
          role: "Quality Head",
          capacityOrMetric: "Zero OMC Batch Rejections Since COD",
        },
      ],
      professionalAffiliations: [
        "Member, Indian Membrane Society (IMS)",
        "Certified Lead Auditor — ISO 14001 Environmental Management Systems",
      ],
    },

    // =========================================================================
    // 3. PINGAKSH AGRO & CIRCULAR BIO-RESOURCES LEADERS
    // =========================================================================
    {
      slug: "devendra-pratap-rathore",
      name: "Mr. Devendra Pratap Rathore",
      designation:
        "Senior Vice President — Grain Supply Chain, DDGS & Napier Farms",
      subsidiaryId: "pingaksh-agro-circular",
      subsidiaryName: "Pingaksh Agro & Circular Bio-Resources Division",
      operationalBase: "Northern India Agrarian Clusters",
      experienceYears:
        "22+ Years in Agri-Commodities, FPO Procurement & Animal Feed",
      appointedSince: "2022",
      qualifications: [
        "PGDM in Agribusiness Management",
        "B.Sc. (Hons.) in Agriculture",
      ],
      almaMater: "MANAGE Hyderabad & CCS Haryana Agricultural University",
      portraitImage:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85",
      portraitAlt:
        "Mr. Devendra Pratap Rathore - SVP of Grain Supply Chain & DDGS Nutrition",
      shortSummary:
        "Leads direct procurement of 550+ MT/day of maize and broken rice from Farmer Producer Organizations (FPOs), 180+ TPD DDGS animal feed marketing, and Super Napier contract farming.",
      executiveQuote:
        "Every kiloliter of ethanol we distill begins with a rural farmer and returns to the agrarian economy as high-protein DDGS livestock nutrition.",
      biographyParagraphs: [
        "Mr. Devendra Pratap Rathore heads the Pingaksh Agro & Circular Bio-Resources Division, bridging the Group's industrial bio-refineries with over 15,000 regional farmers, FPOs, and compound livestock feed manufacturers across India.",
        "He manages the procurement of non-food broken rice and maize for the distillery, oversees the commercialization of 180+ MT/day of high-protein Distillers Dried Grains with Solubles (DDGS) for dairy, poultry, and aquaculture mills, and directs Pingaksh Farms' outgrower network cultivating high-yield Super Napier biomass.",
      ],
      operationalMandates: [
        "Direct FPO & mandi procurement of 200,000+ MT/year of maize and broken rice",
        "Pan-India institutional sales of 30%–46% protein Rice & Maize DDGS",
        "Contract farming expansion of perennial Super Napier grass for green fodder & boiler fuel",
        "60 TPD food-grade liquid CO₂ offtake agreements with beverage and dry-ice partners",
      ],
      keyProjectsDelivered: [
        {
          project:
            "180+ TPD Rotary Tube-Bundle DDGS Commercialization & Export Line",
          role: "Business Head",
          capacityOrMetric: "74,800+ MT Annual DDGS Dispatch",
        },
        {
          project: "Pingaksh Farms Super Napier Outgrower Cluster Program",
          role: "Program Head",
          capacityOrMetric: "150–200 MT/Acre Annual Biomass Yield",
        },
      ],
      professionalAffiliations: [
        "Executive Member, Compound Livestock Feed Manufacturers Association (CLFMA)",
      ],
    },
    {
      slug: "saurabh-chaturvedi-finance",
      name: "Mr. Saurabh Chaturvedi, CFA",
      designation:
        "Chief Financial Officer — Subsidiary Operations & Green Treasury",
      subsidiaryId: "pingaksh-bio-energy",
      subsidiaryName: "Pingaksh Bio-Energy & Green Fuels Limited",
      operationalBase: "Corporate Office & Integrated Bio-Refinery",
      experienceYears:
        "20+ Years in Infrastructure Project Finance & Green Bonds",
      appointedSince: "2020",
      qualifications: [
        "Chartered Accountant (ACA) & CFA Charterholder",
        "B.Com (Hons.)",
      ],
      almaMater: "ICAI & Shri Ram College of Commerce (SRCC), Delhi",
      portraitImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
      portraitAlt:
        "Mr. Saurabh Chaturvedi - CFO of Subsidiary Operations & Green Treasury",
      shortSummary:
        "Manages project debt syndication, interest-subvention schemes under the National Biofuel Policy, UPCL/OMC working-capital cycles, and carbon credit monetization.",
      executiveQuote:
        "Disciplined project treasury and sovereign interest-subvention alignment allow us to scale capital-intensive clean energy assets with industry-leading return on capital employed.",
      biographyParagraphs: [
        "Mr. Saurabh Chaturvedi serves as Chief Financial Officer for Subsidiary Operations across UBHP Hydro Power and Pingaksh Bio-Energy. A Chartered Accountant and CFA Charterholder with 20 years in power and biofuel project finance, he structures long-term institutional term loans, working-capital facilities, and DFPD ethanol interest-subvention claims.",
        "He also leads the Group's carbon credit monetization registry (Verra / Gold Standard & Indian Carbon Market) and ERP financial controls across all operating sites.",
      ],
      operationalMandates: [
        "Term-debt syndication and DFPD ethanol interest-subvention compliance",
        "Receivables management across PSU Oil Marketing Companies (OMCs) and UPCL",
        "Carbon credit verification and monetization for hydro and bio-refinery offsets",
        "SAP ERP cost-center accounting across hydro powerhouses and distillery units",
      ],
      keyProjectsDelivered: [
        {
          project: "250 KLPD Bio-Refinery Project Financial Closure",
          role: "Lead Treasury Architect",
          capacityOrMetric: "Consortium Green Term-Loan Syndication",
        },
        {
          project: "Sarju Cascade Long-Term Debt Refinancing",
          role: "Head of Project Finance",
          capacityOrMetric: "185 bps Interest Cost Reduction",
        },
      ],
      professionalAffiliations: [
        "Associate Member, Institute of Chartered Accountants of India (ICAI)",
        "Charterholder, CFA Institute (USA)",
      ],
    },
  ],
};

export function getSubsidiaryLeaderBySlug(
  slug: string,
): SubsidiaryLeaderProfile | undefined {
  return SUBSIDIARY_LEADERSHIP_DATA.leaders.find((l) => l.slug === slug);
}

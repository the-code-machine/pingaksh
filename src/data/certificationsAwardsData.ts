export type AccreditationCategory =
  | "All"
  | "Quality & ISO Systems"
  | "Environmental & ZLD"
  | "Bio-Fuel & Grid Standards"
  | "Safety & CSR Citations";

export interface CertificationItem {
  id: string;
  standardCode: string; // e.g., "ISO 9001:2015", "BIS IS 15464"
  title: string;
  issuingAuthority: string;
  applicableEntity: string;
  category: Exclude<AccreditationCategory, "All">;
  validThrough: string;
  certificateNumber: string;
  scopeDescription: string;
  verificationHighlights: string[];
  badgeImageUrl: string;
  documentPreviewUrl: string;
  imageAlt: string;
  pdfHref: string;
}

export interface AwardCitationItem {
  id: string;
  year: string;
  title: string;
  conferredBy: string;
  recipientEntity: string;
  location: string;
  citationSummary: string;
  metricHighlight: string;
  imageUrl: string;
  imageAlt: string;
}

export interface CertificationsAwardsPageData {
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
  trustBenchmarks: {
    value: string;
    unit: string;
    label: string;
    detail: string;
  }[];
  categories: AccreditationCategory[];
  certifications: CertificationItem[];
  awards: AwardCitationItem[];
  qualityPolicyStatement: {
    heading: string;
    quote: string;
    signatory: string;
    designation: string;
  };
}

export const CERTIFICATIONS_AWARDS_DATA: CertificationsAwardsPageData = {
  seo: {
    title: "Certifications, ISO Standards & Awards | Pingaksh Renewables",
    description:
      "Inspect Pingaksh Group’s ISO 9001, ISO 14001, ISO 45001 accreditations, BIS IS 15464 E20 ethanol certification, 100% ZLD compliance, and clean energy awards.",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Media & Insights", href: "/media" },
    { label: "Certifications & Awards", href: "/media/certifications-awards" },
  ],
  hero: {
    title: "Certifications & Awards",
    subtitle: "Accredited Engineering, Environmental & Safety Excellence",
    leadText:
      "Every megawatt evacuated from our Himalayan hydro cascades and every kiloliter of anhydrous ethanol dispatched from our biorefinery is governed by globally audited ISO, BIS, and CPCB compliance frameworks.",
    backgroundImage:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=85",
    backgroundAlt:
      "Pingaksh Group Statutory Accreditations, ISO Certifications and Industry Awards",
  },
  trustBenchmarks: [
    {
      value: "ISO",
      unit: "9001 · 14001 · 45001",
      label: "Integrated Management Systems",
      detail: "Audited across both Hydro (UBHP) & Bio-Energy (PBPL)",
    },
    {
      value: "100%",
      unit: "CPCB / SPCB ZLD",
      label: "Zero-Liquid Discharge Certified",
      detail: "Closed-loop MEE & Condensate Polishing compliance",
    },
    {
      value: "IS 15464",
      unit: "99.8% Purity",
      label: "BIS Fuel-Grade Ethanol",
      detail: "Certified for PSU OMC E20 national blending depots",
    },
    {
      value: "Zero",
      unit: "LTI Record",
      label: "Occupational Health & Safety",
      detail: "Strict Lockout-Tagout (LOTO) & process safety governance",
    },
  ],
  categories: [
    "All",
    "Quality & ISO Systems",
    "Environmental & ZLD",
    "Bio-Fuel & Grid Standards",
    "Safety & CSR Citations",
  ],
  certifications: [
    {
      id: "cert-iso-9001",
      standardCode: "ISO 9001:2015",
      title: "Quality Management System (QMS) Accreditation",
      issuingAuthority: "TÜV SÜD / NABCB Accredited Registrar",
      applicableEntity: "Pingaksh Renewables Pvt. Ltd. (UBHP & PBPL)",
      category: "Quality & ISO Systems",
      validThrough: "Valid through December 2028",
      certificateNumber: "QMS-IN-PRPL-2024-0891",
      scopeDescription:
        "Covers the operation and maintenance of Run-of-the-River Hydroelectric Power Stations (Sarju I, II, III) and automated grain-based anhydrous ethanol distillation.",
      verificationHighlights: [
        "24×7 SCADA turbine & distillation telemetry logs",
        "Standardized preventive maintenance & relay calibration",
        "Batch-level laboratory quality assurance for OMC dispatches",
      ],
      badgeImageUrl:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
      documentPreviewUrl:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=85",
      imageAlt:
        "Pingaksh Renewables ISO 9001:2015 Quality Management Certificate",
      pdfHref: "/investors/statutory-filings#iso-9001",
    },
    {
      id: "cert-iso-14001",
      standardCode: "ISO 14001:2015",
      title: "Environmental Management System (EMS) Certification",
      issuingAuthority: "International Accreditation Forum (IAF) Member Body",
      applicableEntity: "Uttar Bharat Hydro Power & Pingaksh Beverages",
      category: "Environmental & ZLD",
      validThrough: "Valid through December 2028",
      certificateNumber: "EMS-IN-PRPL-2024-1104",
      scopeDescription:
        "Certifies minimum ecological footprint across Himalayan river diversion weirs and zero-effluent grain biorefining operations.",
      verificationHighlights: [
        "Mandatory environmental flow (e-Flow) maintenance in Sarju River",
        "Continuous Emission Monitoring System (OCEMS) linked to CPCB",
        "100% fly-ash utilization & CO₂ fermentation gas recovery",
      ],
      badgeImageUrl:
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=80",
      documentPreviewUrl:
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1400&q=85",
      imageAlt:
        "Pingaksh Renewables ISO 14001:2015 Environmental Management Certificate",
      pdfHref: "/investors/statutory-filings#iso-14001",
    },
    {
      id: "cert-iso-45001",
      standardCode: "ISO 45001:2018",
      title: "Occupational Health & Safety (OH&S) Management System",
      issuingAuthority: "DNV / Accredited Safety Certifier",
      applicableEntity: "All Operating Plants & Project Sites",
      category: "Safety & CSR Citations",
      validThrough: "Valid through November 2028",
      certificateNumber: "OHS-IN-PRPL-2024-0452",
      scopeDescription:
        "Governs workplace safety across high-voltage 33/132 kV switchyards, underground penstock tunnels, PESO ethanol tank farms, and high-pressure boilers.",
      verificationHighlights: [
        "PESO-compliant automated foam & hydrant fire suppression",
        "Strict Permit-to-Work (PTW) and Lockout-Tagout (LOTO) enforcement",
        "Mandatory safety induction for all EPC & plant personnel",
      ],
      badgeImageUrl:
        "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=900&q=80",
      documentPreviewUrl:
        "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1400&q=85",
      imageAlt:
        "Pingaksh Group ISO 45001:2018 Occupational Health and Safety Certificate",
      pdfHref: "/investors/statutory-filings#iso-45001",
    },
    {
      id: "cert-bis-ethanol",
      standardCode: "BIS IS 15464",
      title: "Anhydrous Ethanol Fuel-Grade Conformity (E20 Blending)",
      issuingAuthority: "Bureau of Indian Standards (BIS) & OMC QC Labs",
      applicableEntity: "Pingaksh Beverages Pvt. Ltd. (250 KLPD Distillery)",
      category: "Bio-Fuel & Grid Standards",
      validThrough: "Continuous Batch & Annual Renewal",
      certificateNumber: "BIS-ETH-PBPL-250KLPD",
      scopeDescription:
        "Certifies that anhydrous ethanol distilled from damaged/surplus food grains meets >99.8% v/v purity standards for direct blending with motor spirit (petrol).",
      verificationHighlights: [
        "Molecular sieve dehydration ensuring <0.1% moisture content",
        "Approved supplier to IndianOil, BPCL, and HPCL depots",
        "Zero-sulfur renewable biofuel compliance",
      ],
      badgeImageUrl:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
      documentPreviewUrl:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85",
      imageAlt:
        "BIS IS 15464 Anhydrous Ethanol Certification for Pingaksh Beverages",
      pdfHref: "/investors/statutory-filings#bis-is15464",
    },
    {
      id: "cert-cpcb-zld",
      standardCode: "CPCB / SPCB ZLD",
      title: "100% Zero-Liquid Discharge & Consent to Operate (CTO)",
      issuingAuthority: "Central & State Pollution Control Boards",
      applicableEntity: "Pingaksh Beverages Pvt. Ltd. (PBPL)",
      category: "Environmental & ZLD",
      validThrough: "Valid Statutory Consent",
      certificateNumber: "CTO-ZLD-PBPL-2025-99",
      scopeDescription:
        "Statutory environmental clearance verifying zero industrial effluent discharge outside plant boundaries through Multi-Effect Evaporation (MEE), DWGS dryers, and CPU.",
      verificationHighlights: [
        "95%+ process condensate recycled into plant utilities",
        "Real-time flowmeters & PTZ cameras connected to CPCB server",
        "100% spent wash valorized into High-Protein DDGS animal feed",
      ],
      badgeImageUrl:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
      documentPreviewUrl:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85",
      imageAlt: "CPCB 100% Zero Liquid Discharge Compliance Certificate",
      pdfHref: "/investors/statutory-filings#cpcb-zld",
    },
    {
      id: "cert-mnre-grid",
      standardCode: "CEA / UERC / MNRE",
      title: "Small Hydro Grid Connectivity & Renewable Energy Accreditation",
      issuingAuthority: "Uttarakhand Electricity Regulatory Commission & SLDC",
      applicableEntity: "Uttar Bharat Hydro Power Pvt. Ltd. (Sarju I, II, III)",
      category: "Bio-Fuel & Grid Standards",
      validThrough: "Long-Term 35-Year Concession / PPA",
      certificateNumber: "UERC-SHP-UBHP-SARJU-123",
      scopeDescription:
        "Statutory grid synchronization, ABT metering, and renewable generation accreditation for the 30.60 MW Sarju cascade in District Bageshwar, Uttarakhand.",
      verificationHighlights: [
        "Sarju III (10.50 MW) & Sarju II (12.60 MW) commercial operation",
        "Automated ABT tariff metering with State Load Despatch Centre",
        "Eligible for Carbon Credit / Renewable Energy Certificate (REC) attributes",
      ],
      badgeImageUrl:
        "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=900&q=80",
      documentPreviewUrl:
        "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=1400&q=85",
      imageAlt: "UERC and MNRE Renewable Hydro Grid Accreditation for UBHP",
      pdfHref: "/investors/statutory-filings#uerc-hydro",
    },
  ],
  awards: [
    {
      id: "award-2026-hydro-excellence",
      year: "2026",
      title: "Excellence in High-Head Himalayan Small Hydro Operations",
      conferredBy: "Northern India Renewable Energy & Grid Forum",
      recipientEntity: "Uttar Bharat Hydro Power Pvt. Ltd. (Sarju II & III)",
      location: "Dehradun / New Delhi",
      citationSummary:
        "Recognized for maintaining >99% switchyard availability and executing sediment-resilient Horizontal Francis Turbine operations across monsoon cycles in District Bageshwar.",
      metricHighlight: "23.10 MW Commissioned · >99% Grid Uptime",
      imageUrl:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Award for Excellence in Himalayan Small Hydro Operations",
    },
    {
      id: "award-2025-circular-bioeconomy",
      year: "2025",
      title: "Green Bio-Refinery & Zero-Waste Circular Economy Citation",
      conferredBy: "National Bio-Energy & Ethanol Manufacturers Conclave",
      recipientEntity: "Pingaksh Beverages Pvt. Ltd. (PBPL)",
      location: "New Delhi",
      citationSummary:
        "Honored for integrating 250 KLPD grain-based E20 ethanol distillation with 100% Zero-Liquid Discharge, high-protein DDGS animal nutrition, and food-grade CO₂ capture.",
      metricHighlight: "600+ Tonnes Daily CO₂ Saved",
      imageUrl:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Green Bio-Refinery and Circular Economy Award for PBPL",
    },
    {
      id: "award-2025-himalayan-csr",
      year: "2025",
      title: "Watershed Stewardship & Rural Livelihood Impact Honour",
      conferredBy: "Uttarakhand State Industrial & Ecological Council",
      recipientEntity: "Pingaksh Group & Pingaksh Farms",
      location: "Bageshwar & Kashipur, UK",
      citationSummary:
        "Awarded for slope-stabilization afforestation in the Sarju river catchment and direct farm-gate procurement of Napier grass and non-food grains from local farmers.",
      metricHighlight: "Zero Village Displacement",
      imageUrl:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Watershed Stewardship and Rural Livelihood CSR Award",
    },
  ],
  qualityPolicyStatement: {
    heading:
      "Our Institutional Commitment to Statutory & Operational Integrity",
    quote:
      "At Pingaksh Group, compliance is not a post-construction checklist—it is engineered into the blueprint of every weir, turbine hall, and distillation column we commission.",
    signatory: "Board of Directors — Audit & ESG Committee",
    designation: "Pingaksh Renewables Pvt. Ltd.",
  },
};

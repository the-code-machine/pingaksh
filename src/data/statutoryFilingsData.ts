export type StatutoryCategoryKey =
  | "all"
  | "roc-mca"
  | "cfo-debt"
  | "environmental-cto"
  | "credit-ratings"
  | "board-policies";

export interface StatutoryFilingDocument {
  id: string;
  categoryKey: Exclude<StatutoryCategoryKey, "all">;
  categoryLabel: string;
  referenceNumber: string;
  sectionAct: string; // e.g., "Section 92 · Companies Act, 2013"
  title: string;
  applicableEntity:
    | "Pingaksh Group (Consolidated)"
    | "UBHP (Hydro SPV)"
    | "PBPL (Bio-Energy SPV)";
  filingDate: string;
  isoDate: string;
  fiscalYear: string;
  fileSize: string;
  href: string;
}

export interface CorporateEntityIdentifier {
  entityName: string;
  role: string;
  cinNumber: string;
  isinOrDematStatus: string;
  registeredState: string;
  statutoryAuditor: string;
}

export interface LegalDisclaimerClause {
  id: string;
  heading: string;
  body: string;
}

export interface StatutoryFilingsPageData {
  seo: {
    title: string;
    description: string;
  };
  breadcrumbs: { label: string; href: string }[];
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    backgroundAlt: string;
  };
  entityRegistry: CorporateEntityIdentifier[];
  categories: { key: StatutoryCategoryKey; label: string; count: number }[];
  filings: StatutoryFilingDocument[];
  disclaimers: LegalDisclaimerClause[];
  complianceOfficer: {
    name: string;
    designation: string;
    officeAddress: string;
    email: string;
    phone: string;
  };
}

export const STATUTORY_FILINGS_DATA: StatutoryFilingsPageData = {
  seo: {
    title:
      "Statutory Filings, ROC Disclosures & Legal Disclaimers | Pingaksh Renewables",
    description:
      "Access official Ministry of Corporate Affairs (MCA/ROC) filings, CFO debt certificates, CPCB environmental compliance reports, credit ratings, and statutory disclaimers.",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Investor Relations", href: "/investors" },
    {
      label: "Disclaimers & Statutory Filings",
      href: "/investors/statutory-filings",
    },
  ],
  hero: {
    title: "Statutory Filings & Regulatory Disclosures",
    subtitle:
      "Mandatory disclosures pursuant to the Companies Act, 2013, SEBI (LODR) alignment standards, CPCB environmental mandates, and institutional debt covenants.",
    backgroundImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=85",
    backgroundAlt:
      "Pingaksh Group Statutory Filings and Regulatory Compliance Archive",
  },
  entityRegistry: [
    {
      entityName: "Pingaksh Renewables Pvt. Ltd.",
      role: "Parent Holding & Clean Infrastructure Platform",
      cinNumber: "U40106DL2024PTC425610",
      isinOrDematStatus: "100% Dematerialized Equity Shares (NSDL / CDSL)",
      registeredState: "NCT of Delhi & Uttarakhand",
      statutoryAuditor: "Chartered Accountants (Peer Reviewed by ICAI)",
    },
    {
      entityName: "Uttar Bharat Hydro Power Pvt. Ltd. (UBHP)",
      role: "Hydroelectric Generation SPV (Sarju I, II & III — 30.60 MW)",
      cinNumber: "U40101UR2008PTC032481",
      isinOrDematStatus: "Long-Term PPA with UPCL · UERC Regulated",
      registeredState: "Dehradun / Bageshwar, Uttarakhand",
      statutoryAuditor: "Independent Statutory & Cost Auditors",
    },
    {
      entityName: "Pingaksh Beverages Pvt. Ltd. (PBPL)",
      role: "250 KLPD Grain Bio-Ethanol, DDGS & CO₂ SPV",
      cinNumber: "U15549DL2022PTC398104",
      isinOrDematStatus: "PESO, BIS IS 15464 & 100% CPCB ZLD Certified",
      registeredState: "Northern Industrial Zone, India",
      statutoryAuditor: "Independent Statutory & Internal Auditors",
    },
  ],
  categories: [
    { key: "all", label: "All Statutory Filings", count: 9 },
    { key: "cfo-debt", label: "CFO & Lender Certificates", count: 2 },
    { key: "roc-mca", label: "MCA / ROC & AGM Returns", count: 3 },
    { key: "environmental-cto", label: "CPCB / UERC Environmental", count: 2 },
    { key: "credit-ratings", label: "Credit Rating Rationales", count: 1 },
    { key: "board-policies", label: "Statutory Charters & Policies", count: 1 },
  ],
  filings: [
    {
      id: "cfo-certificate-q2",
      categoryKey: "cfo-debt",
      categoryLabel: "CFO & Lender Certificates",
      referenceNumber: "MCA/ROC/2026-27/Q2",
      sectionAct: "SEBI / Institutional Debt Covenant Compliance",
      title:
        "CFO Certificate on Debt Service Coverage Ratio (DSCR), Asset Cover & Commercial Obligations for Q2 ended September 30, 2026",
      applicableEntity: "Pingaksh Group (Consolidated)",
      filingDate: "12 Oct, 2026",
      isoDate: "2026-10-12",
      fiscalYear: "FY 2026-27",
      fileSize: "0.7 MB",
      href: "/uploads/investors/cfo-certificate-q2-fy27.pdf",
    },
    {
      id: "agm-outcome-2026",
      categoryKey: "roc-mca",
      categoryLabel: "MCA / ROC & AGM Returns",
      referenceNumber: "AGM/PINGAKSH/2026/09",
      sectionAct: "Section 108 & 109 · Companies Act, 2013",
      title:
        "Proceedings of Annual General Meeting (AGM) & Consolidated Scrutinizer’s Report for FY 2025–26",
      applicableEntity: "Pingaksh Group (Consolidated)",
      filingDate: "29 Sep, 2026",
      isoDate: "2026-09-29",
      fiscalYear: "FY 2026-27",
      fileSize: "1.4 MB",
      href: "/uploads/investors/agm-scrutinizer-report-2026.pdf",
    },
    {
      id: "cpcb-zld-half-yearly",
      categoryKey: "environmental-cto",
      categoryLabel: "CPCB / UERC Environmental",
      referenceNumber: "ENV/CPCB/ZLD/2026/H1",
      sectionAct: "Environment (Protection) Act, 1986 & CPCB Norms",
      title:
        "Half-Yearly Environmental Compliance & 100% Zero-Liquid Discharge (OCEMS) Telemetry Audit Report",
      applicableEntity: "PBPL (Bio-Energy SPV)",
      filingDate: "18 Sep, 2026",
      isoDate: "2026-09-18",
      fiscalYear: "FY 2026-27",
      fileSize: "2.3 MB",
      href: "/uploads/investors/pbpl-zld-compliance-h1-2026.pdf",
    },
    {
      id: "uerc-hydro-generation-return",
      categoryKey: "environmental-cto",
      categoryLabel: "CPCB / UERC Environmental",
      referenceNumber: "UERC/SHP/SARJU/2026/08",
      sectionAct: "Electricity Act, 2003 & UERC Tariff Regulations",
      title:
        "Statutory Hydrological e-Flow & Auxiliary Consumption Filing for Sarju II (12.60 MW) & Sarju III (10.50 MW)",
      applicableEntity: "UBHP (Hydro SPV)",
      filingDate: "25 Aug, 2026",
      isoDate: "2026-08-25",
      fiscalYear: "FY 2026-27",
      fileSize: "1.9 MB",
      href: "/uploads/investors/ubhp-uerc-generation-filing-2026.pdf",
    },
    {
      id: "credit-rating-reaffirmation-2026",
      categoryKey: "credit-ratings",
      categoryLabel: "Credit Rating Rationales",
      referenceNumber: "CR/CARE-ICRA/2026/07",
      sectionAct: "RBI / Basel-III External Credit Assessment",
      title:
        "Credit Rating Rationale for Long-Term Term Loan & Working Capital Facilities (UBHP & PBPL)",
      applicableEntity: "Pingaksh Group (Consolidated)",
      filingDate: "14 Jul, 2026",
      isoDate: "2026-07-14",
      fiscalYear: "FY 2026-27",
      fileSize: "1.1 MB",
      href: "/uploads/investors/credit-rating-rationale-2026.pdf",
    },
    {
      id: "form-mgt-7-fy26",
      categoryKey: "roc-mca",
      categoryLabel: "MCA / ROC & AGM Returns",
      referenceNumber: "ROC/MGT-7/2025-26",
      sectionAct: "Section 92(3) · Companies Act, 2013",
      title:
        "Form MGT-7 Annual Return as on March 31, 2026 filed with the Registrar of Companies (ROC)",
      applicableEntity: "Pingaksh Group (Consolidated)",
      filingDate: "30 May, 2026",
      isoDate: "2026-05-30",
      fiscalYear: "FY 2025-26",
      fileSize: "2.1 MB",
      href: "/uploads/investors/form-mgt7-fy26.pdf",
    },
    {
      id: "form-aoc-4-xbrl-fy26",
      categoryKey: "roc-mca",
      categoryLabel: "MCA / ROC & AGM Returns",
      referenceNumber: "ROC/AOC-4-CFS/2025-26",
      sectionAct: "Section 137 · Companies Act, 2013",
      title:
        "Form AOC-4 NBFC/CFS Consolidated Financial Statements Filing Receipt & XBRL Annexure",
      applicableEntity: "Pingaksh Group (Consolidated)",
      filingDate: "28 May, 2026",
      isoDate: "2026-05-28",
      fiscalYear: "FY 2025-26",
      fileSize: "3.0 MB",
      href: "/uploads/investors/form-aoc4-cfs-fy26.pdf",
    },
    {
      id: "cfo-utilization-certificate-fy26",
      categoryKey: "cfo-debt",
      categoryLabel: "CFO & Lender Certificates",
      referenceNumber: "FIN/END-USE/2025-26/Q4",
      sectionAct: "Consortium Term-Lender Covenant",
      title:
        "Statutory Auditor & CFO End-Use Certificate for Capital Expenditure on 250 KLPD Bio-Refinery & Sarju I Civil Works",
      applicableEntity: "PBPL (Bio-Energy SPV)",
      filingDate: "20 Apr, 2026",
      isoDate: "2026-04-20",
      fiscalYear: "FY 2025-26",
      fileSize: "0.9 MB",
      href: "/uploads/investors/cfo-end-use-certificate-fy26.pdf",
    },
    {
      id: "vigil-whistleblower-csr-charter",
      categoryKey: "board-policies",
      categoryLabel: "Statutory Charters & Policies",
      referenceNumber: "POL/BOARD/2026/V3",
      sectionAct: "Section 135 & 177 · Companies Act, 2013",
      title:
        "Vigil Mechanism (Whistleblower Policy), Related Party Transaction (RPT) Policy & CSR Action Plan",
      applicableEntity: "Pingaksh Group (Consolidated)",
      filingDate: "01 Apr, 2026",
      isoDate: "2026-04-01",
      fiscalYear: "FY 2025-26",
      fileSize: "1.3 MB",
      href: "/uploads/investors/statutory-board-policies-2026.pdf",
    },
  ],
  disclaimers: [
    {
      id: "forward-looking-statements",
      heading: "01. Safe Harbor & Forward-Looking Statements",
      body: "Certain statements in our investor presentations, press releases, and annual reports concerning Pingaksh Group’s future growth prospects, upstream hydro commissioning timelines (including Sarju I), E20 ethanol blending allocations, and carbon reduction projections are forward-looking statements. These involve inherent hydrological, regulatory, and commodity-market risks that could cause actual results to differ materially.",
    },
    {
      id: "no-offer-solicitation",
      heading: "02. No Offer or Solicitation of Securities",
      body: "Nothing contained on this portal or within the downloadable statutory repository constitutes an offer, solicitation, or invitation to subscribe for or purchase any equity shares, debentures, or commercial papers of Pingaksh Renewables Pvt. Ltd., Uttar Bharat Hydro Power Pvt. Ltd. (UBHP), or Pingaksh Beverages Pvt. Ltd. (PBPL) in any jurisdiction.",
    },
    {
      id: "hydrological-tariff-disclaimer",
      heading: "03. Regulatory Tariff & Off-Take Dependencies",
      body: "Hydroelectric generation figures are subject to seasonal Himalayan snowmelt and monsoon discharge variations in the Sarju River basin, as well as tariff orders issued by the Uttarakhand Electricity Regulatory Commission (UERC). Bio-ethanol revenues are governed by Ethanol Supply Year (ESY) procurement prices notified by the Government of India and Public Sector Oil Marketing Companies (OMCs).",
    },
  ],
  complianceOfficer: {
    name: "Company Secretary & Compliance Officer",
    designation: "Secretarial & Legal Department — Pingaksh Group",
    officeAddress:
      "Pingaksh Renewables Pvt. Ltd., Corporate Tower, New Delhi – 110001 & Dehradun, Uttarakhand – 248001",
    email: "secretarial@pingakshrenewables.com",
    phone: "+91 (11) 2345-6711",
  },
};

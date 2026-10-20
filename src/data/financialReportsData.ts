export type FiscalYearKey = "FY 2026-27" | "FY 2025-26" | "FY 2024-25";

export interface QuarterlyPack {
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  periodEnded: string;
  releaseDate: string;
  isoDate: string;
  status: "Published" | "Upcoming";
  highlights: { label: string; value: string }[];
  documents: {
    id: string;
    type:
      | "Financial Statement"
      | "Investor Presentation"
      | "Press Release"
      | "Auditor Review";
    title: string;
    fileSize: string;
    href: string;
  }[];
}

export interface AnnualReportShowcase {
  fiscalYear: FiscalYearKey;
  themeTitle: string;
  subtitle: string;
  releaseDate: string;
  isoDate: string;
  coverImage: string;
  coverAlt: string;
  pageCount: string;
  fileSize: string;
  fullReportHref: string;
  mgt7ReturnHref: string;
  standaloneAccountsHref: string;
  keyPerformanceMetrics: {
    metric: string;
    value: string;
    growth: string;
    barPercentage: number;
  }[];
}

export interface FinancialReportsPageData {
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
    latestReleaseBadge: string;
    latestReleaseTitle: string;
    latestReleaseHref: string;
  };
  fiscalYears: FiscalYearKey[];
  annualReports: Record<FiscalYearKey, AnnualReportShowcase>;
  quarterlyMatrix: Record<FiscalYearKey, QuarterlyPack[]>;
  subsidiaryFinancials: {
    entityName: string;
    spvRole: string;
    latestAuditStatus: string;
    reportTitle: string;
    fileSize: string;
    href: string;
  }[];
}

export const FINANCIAL_REPORTS_DATA: FinancialReportsPageData = {
  seo: {
    title:
      "Financial Reports, Quarterly Results & Annual Returns | Pingaksh Renewables",
    description:
      "Explore Pingaksh Group’s Integrated Annual Reports, Q1–Q4 Quarterly Financial Presentations, Audited Consolidated Balance Sheets, and Form MGT-7 Annual Returns.",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Investor Relations", href: "/investors" },
    {
      label: "Financial Reports & Annual Returns",
      href: "/investors/financial-reports",
    },
  ],
  hero: {
    title: "Financial Reports & Annual Returns",
    subtitle:
      "Comprehensive repository of audited consolidated financial statements, quarterly operational reviews, and statutory annual returns across Pingaksh Group and its operating SPVs.",
    backgroundImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85",
    backgroundAlt:
      "Pingaksh Group Corporate Headquarters and Financial Disclosures",
    latestReleaseBadge: "Latest Release · 15 Oct 2026",
    latestReleaseTitle:
      "Q2 & H1 FY 2026–27 Financial Presentation & Unaudited Results",
    latestReleaseHref: "#quarterly-results-matrix",
  },
  fiscalYears: ["FY 2026-27", "FY 2025-26", "FY 2024-25"],
  annualReports: {
    "FY 2026-27": {
      fiscalYear: "FY 2026-27",
      themeTitle: "Scaling Clean Baseload & Bio-Refining",
      subtitle:
        "Interim Half-Yearly Consolidated Review covering 30.60 MW Sarju Hydro Cascade & 250 KLPD Anhydrous Ethanol Operations.",
      releaseDate: "15 October 2026",
      isoDate: "2026-10-15",
      coverImage:
        "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=900&q=85",
      coverAlt: "Pingaksh Renewables FY 2026-27 Interim Financial Review Cover",
      pageCount: "94 Pages",
      fileSize: "4.8 MB PDF",
      fullReportHref: "/uploads/investors/pingaksh-h1-fy27-interim-report.pdf",
      mgt7ReturnHref: "/uploads/investors/pingaksh-mgt7-fy26.pdf",
      standaloneAccountsHref:
        "/uploads/investors/pingaksh-standalone-h1-fy27.pdf",
      keyPerformanceMetrics: [
        {
          metric: "Plant Availability (Hydro & Bio-Energy)",
          value: "99.2%",
          growth: "+1.4% YoY",
          barPercentage: 96,
        },
        {
          metric: "Long-Term PPA & OMC Off-Take Visibility",
          value: "100%",
          growth: "Contracted",
          barPercentage: 100,
        },
        {
          metric: "EBITDA Margin Stability Index",
          value: "34.8%",
          growth: "+210 bps",
          barPercentage: 82,
        },
      ],
    },
    "FY 2025-26": {
      fiscalYear: "FY 2025-26",
      themeTitle: "Engineering Circularity & Grid Resilience",
      subtitle:
        "Integrated Annual Report & Audited Consolidated Financial Statements for the Fiscal Year ended March 31, 2026.",
      releaseDate: "28 May 2026",
      isoDate: "2026-05-28",
      coverImage:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=85",
      coverAlt: "Pingaksh Renewables FY 2025-26 Integrated Annual Report Cover",
      pageCount: "186 Pages",
      fileSize: "8.4 MB PDF",
      fullReportHref: "/uploads/investors/pingaksh-annual-report-fy26.pdf",
      mgt7ReturnHref: "/uploads/investors/pingaksh-mgt7-fy26.pdf",
      standaloneAccountsHref: "/uploads/investors/pingaksh-standalone-fy26.pdf",
      keyPerformanceMetrics: [
        {
          metric: "Plant Availability (Hydro & Bio-Energy)",
          value: "97.8%",
          growth: "+1.9% YoY",
          barPercentage: 92,
        },
        {
          metric: "Zero-Liquid Discharge & Co-Product Recovery",
          value: "100%",
          growth: "DDGS + CO₂",
          barPercentage: 100,
        },
        {
          metric: "EBITDA Margin Stability Index",
          value: "32.7%",
          growth: "+185 bps",
          barPercentage: 76,
        },
      ],
    },
    "FY 2024-25": {
      fiscalYear: "FY 2024-25",
      themeTitle: "The Pingaksh Group Transformation",
      subtitle:
        "Audited Consolidated Balance Sheet, Directors’ Report & Corporate Governance Disclosures for FY 2024–25.",
      releaseDate: "19 May 2025",
      isoDate: "2025-05-19",
      coverImage:
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=85",
      coverAlt: "Pingaksh Renewables FY 2024-25 Annual Report Cover",
      pageCount: "162 Pages",
      fileSize: "6.7 MB PDF",
      fullReportHref: "/uploads/investors/pingaksh-annual-report-fy25.pdf",
      mgt7ReturnHref: "/uploads/investors/pingaksh-mgt7-fy25.pdf",
      standaloneAccountsHref: "/uploads/investors/pingaksh-standalone-fy25.pdf",
      keyPerformanceMetrics: [
        {
          metric: "Commissioned Hydro Cascade Uptime",
          value: "96.4%",
          growth: "Sarju II & III",
          barPercentage: 88,
        },
        {
          metric: "Debt Service Coverage Ratio (DSCR)",
          value: "1.82x",
          growth: "Strong Cushion",
          barPercentage: 84,
        },
        {
          metric: "EBITDA Margin Stability Index",
          value: "30.8%",
          growth: "Baseline",
          barPercentage: 70,
        },
      ],
    },
  },
  quarterlyMatrix: {
    "FY 2026-27": [
      {
        quarter: "Q2",
        periodEnded: "Quarter & Half-Year Ended Sep 30, 2026",
        releaseDate: "15 Oct, 2026",
        isoDate: "2026-10-15",
        status: "Published",
        highlights: [
          { label: "Peak Monsoon Hydro PLF", value: "88.4%" },
          { label: "Ethanol OMC Off-Take", value: "100% Allocated" },
        ],
        documents: [
          {
            id: "fy27-q2-pres",
            type: "Investor Presentation",
            title:
              "2026 – 2027 Financial Presentation – Q2 & H1 Operational Results",
            fileSize: "3.4 MB",
            href: "/uploads/investors/fy27-q2-presentation.pdf",
          },
          {
            id: "fy27-q2-stmt",
            type: "Financial Statement",
            title:
              "Unaudited Consolidated & Standalone Financial Results – Q2 FY27",
            fileSize: "1.6 MB",
            href: "/uploads/investors/fy27-q2-results.pdf",
          },
          {
            id: "fy27-q2-aud",
            type: "Auditor Review",
            title:
              "Independent Statutory Auditor’s Limited Review Report – H1 FY27",
            fileSize: "0.9 MB",
            href: "/uploads/investors/fy27-q2-auditor-review.pdf",
          },
          {
            id: "fy27-q2-pr",
            type: "Press Release",
            title:
              "Media Release: Q2 FY 2026–27 Operational & Financial Highlights",
            fileSize: "0.6 MB",
            href: "/media/press-releases",
          },
        ],
      },
      {
        quarter: "Q1",
        periodEnded: "Quarter Ended Jun 30, 2026",
        releaseDate: "17 Jul, 2026",
        isoDate: "2026-07-17",
        status: "Published",
        highlights: [
          { label: "Grid Availability", value: "99.4%" },
          { label: "DDGS & CO₂ Recovery", value: "Optimal Run-Rate" },
        ],
        documents: [
          {
            id: "fy27-q1-pres",
            type: "Investor Presentation",
            title: "2026 – 2027 Financial Presentation – Q1 Results",
            fileSize: "2.9 MB",
            href: "/uploads/investors/fy27-q1-presentation.pdf",
          },
          {
            id: "fy27-q1-stmt",
            type: "Financial Statement",
            title:
              "Unaudited Consolidated Financial Results for Q1 ended June 30, 2026",
            fileSize: "1.4 MB",
            href: "/uploads/investors/fy27-q1-results.pdf",
          },
          {
            id: "fy27-q1-aud",
            type: "Auditor Review",
            title: "Statutory Auditor’s Limited Review Report – Q1 FY27",
            fileSize: "0.8 MB",
            href: "/uploads/investors/fy27-q1-auditor-review.pdf",
          },
        ],
      },
    ],
    "FY 2025-26": [
      {
        quarter: "Q4",
        periodEnded: "Quarter & Full Year Ended Mar 31, 2026",
        releaseDate: "24 Apr, 2026",
        isoDate: "2026-04-24",
        status: "Published",
        highlights: [
          { label: "Annual Audit Opinion", value: "Unqualified (Clean)" },
          { label: "Cumulative CO₂ Saved", value: "217,800+ MT" },
        ],
        documents: [
          {
            id: "fy26-q4-pres",
            type: "Investor Presentation",
            title:
              "2025 – 2026 Financial Presentation – Q4 & Full Year Results",
            fileSize: "4.1 MB",
            href: "/uploads/investors/fy26-q4-presentation.pdf",
          },
          {
            id: "fy26-q4-stmt",
            type: "Financial Statement",
            title:
              "Audited Financial Results for Q4 & Year ended March 31, 2026",
            fileSize: "2.2 MB",
            href: "/uploads/investors/fy26-q4-results.pdf",
          },
        ],
      },
      {
        quarter: "Q3",
        periodEnded: "Quarter Ended Dec 31, 2025",
        releaseDate: "19 Jan, 2026",
        isoDate: "2026-01-19",
        status: "Published",
        highlights: [
          { label: "Ethanol Distillation", value: "250 KLPD Rated" },
          { label: "ZLD Compliance", value: "100% Verified" },
        ],
        documents: [
          {
            id: "fy26-q3-pres",
            type: "Investor Presentation",
            title: "2025 – 2026 Financial Presentation – Q3 Results",
            fileSize: "3.1 MB",
            href: "/uploads/investors/fy26-q3-presentation.pdf",
          },
          {
            id: "fy26-q3-stmt",
            type: "Financial Statement",
            title: "Unaudited Financial Results for Q3 ended December 31, 2025",
            fileSize: "1.5 MB",
            href: "/uploads/investors/fy26-q3-results.pdf",
          },
        ],
      },
    ],
    "FY 2024-25": [
      {
        quarter: "Q4",
        periodEnded: "Quarter & Full Year Ended Mar 31, 2025",
        releaseDate: "28 Apr, 2025",
        isoDate: "2025-04-28",
        status: "Published",
        highlights: [
          { label: "Hydro Operations", value: "Sarju II & III" },
          { label: "Statutory Filing", value: "ROC Compliant" },
        ],
        documents: [
          {
            id: "fy25-q4-pres",
            type: "Investor Presentation",
            title: "2024 – 2025 Financial Presentation – Q4 & Annual Review",
            fileSize: "3.8 MB",
            href: "/uploads/investors/fy25-q4-presentation.pdf",
          },
          {
            id: "fy25-q4-stmt",
            type: "Financial Statement",
            title: "Audited Consolidated Financial Statements – FY 2024–25",
            fileSize: "2.4 MB",
            href: "/uploads/investors/fy25-q4-results.pdf",
          },
        ],
      },
    ],
  },
  subsidiaryFinancials: [
    {
      entityName: "Uttar Bharat Hydro Power Pvt. Ltd. (UBHP)",
      spvRole: "Hydroelectric Generation SPV (Sarju I, II & III — 30.60 MW)",
      latestAuditStatus: "FY 2025–26 Audited Balance Sheet & P&L",
      reportTitle:
        "UBHP Standalone Audited Financial Statements & Independent Auditor’s Report",
      fileSize: "PDF · 3.2 MB",
      href: "/uploads/investors/ubhp-audited-financials-fy26.pdf",
    },
    {
      entityName: "Pingaksh Beverages Pvt. Ltd. (PBPL)",
      spvRole: "Green Fuels & Bio-Refinery SPV (250 KLPD Ethanol, DDGS & CO₂)",
      latestAuditStatus: "FY 2025–26 Audited Balance Sheet & P&L",
      reportTitle:
        "PBPL Standalone Audited Financial Statements & Cost Audit Report",
      fileSize: "PDF · 3.6 MB",
      href: "/uploads/investors/pbpl-audited-financials-fy26.pdf",
    },
    {
      entityName: "Pingaksh Farms & Agro-Energy Division",
      spvRole: "Feedstock Aggregation & High-Yield Napier Grass Biomass",
      latestAuditStatus: "FY 2025–26 Operational Statement",
      reportTitle:
        "Agro-Biomass Division Financial Summary & Procurement Audit",
      fileSize: "PDF · 1.8 MB",
      href: "/uploads/investors/pingaksh-farms-summary-fy26.pdf",
    },
  ],
};

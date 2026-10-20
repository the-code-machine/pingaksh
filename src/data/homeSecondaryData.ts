export interface WhoWeAreGatewayLink {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  badge: string;
}

export interface FoundationSlide {
  id: string;
  eraTag: string;
  title: string;
  caption: string;
  imageUrl: string;
  imageAlt: string;
}

export interface AnnouncementItem {
  id: string;
  category: string;
  date: string;
  isoDate: string;
  headline: string;
  summary: string;
  href: string;
  partnerNames: { primary: string; secondary: string };
  visualBadge: string;
  imageUrl: string;
  imageAlt: string;
}

export interface InvestorNotice {
  id: string;
  date: string;
  isoDate: string;
  referenceCode: string;
  title: string;
  href: string;
}

export interface InvestorDocument {
  id: string;
  fiscalYear: string;
  title: string;
  releaseDate: string;
  fileSize: string;
  href: string;
}

export interface MarketTrackerCard {
  id: string;
  exchange: string;
  asOfDate: string;
  price: string;
  change: string;
  isPositive: boolean;
  volumeLabel: string;
  volumeValue: string;
}

export const HOME_SECONDARY_DATA = {
  // =================================================================
  // 1. CORPORATE FOUNDATION & "WHO WE ARE" GATEWAY SECTION
  // Focuses purely on UBHP Heritage, Founders, & 6+2 Board Governance
  // =================================================================
  foundationWhoWeAre: {
    eyebrow: "Our Foundation & Corporate Identity",
    title: "Built on Generational Vision & Institutional Governance",
    description:
      "Founded under the visionary leadership of Mr. Naresh Goel alongside second-generation directors Mr. Amul Goel and Mr. Aadish Goel, Pingaksh Group has evolved from Uttar Bharat Hydro Power (UBHP) into a multi-entity industrial conglomerate governed by an experienced board of directors.",
    primaryCta: {
      label: "Explore Who We Are",
      href: "/who-we-are",
      title: "Visit Pingaksh Group Corporate Overview and Who We Are Page",
    },
    secondaryCta: {
      label: "Board of Directors",
      href: "/who-we-are/board-of-directors",
      title:
        "Meet our 6 Parent Directors and 2 Subsidiary Additional Directors",
    },
    gatewayLinks: [
      {
        id: "corporate-overview",
        title: "Corporate Overview",
        subtitle: "Institutional transition from UBHP to Pingaksh Group",
        href: "/who-we-are/corporate-overview",
        badge: "Identity",
      },
      {
        id: "heritage-timeline",
        title: "Our Heritage & Growth Timeline",
        subtitle:
          "Horizontal milestone scrubber from inception to commissioning",
        href: "/who-we-are/heritage-timeline",
        badge: "Milestones",
      },
      {
        id: "vision-mission",
        title: "Vision, Mission & Core Values",
        subtitle: "Ethical codes, operational integrity & excellence standards",
        href: "/who-we-are/vision-mission",
        badge: "Ethos",
      },
      {
        id: "board-leadership",
        title: "Leadership & Group Structure",
        subtitle:
          "6 Parent Board Directors & 2 Subsidiary Additional Directors",
        href: "/who-we-are/board-of-directors",
        badge: "6 + 2 Board",
      },
    ] as WhoWeAreGatewayLink[],
    slides: [
      {
        id: "slide-ubhp-origins",
        eraTag: "Foundation Era · UBHP",
        title: "Engineering Resilience in Complex Terrains",
        caption:
          "Starting with Uttar Bharat Hydro Power Pvt. Ltd., our civil and electro-mechanical teams established a proven track record of executing capital-intensive infrastructure in high-altitude geographies.",
        imageUrl:
          "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/P9090483_4dece626.jpg",
        imageAlt:
          "Pingaksh Group Civil Engineering and Infrastructure Heritage from UBHP Foundation Era",
      },
      {
        id: "slide-leadership-governance",
        eraTag: "Multi-Generational Leadership",
        title: "Guided by Visionary Promoters & Independent Directors",
        caption:
          "Combining decades of industrial stewardship by Mr. Naresh Goel with modern capital allocation and execution led by Mr. Amul Goel, Mr. Aadish Goel, and our independent board committees.",
        imageUrl:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
        imageAlt:
          "Pingaksh Group Corporate Headquarters and Institutional Board Governance",
      },
      {
        id: "slide-group-structure",
        eraTag: "Conglomerate Architecture",
        title: "Ring-Fenced SPVs & Disciplined Project Execution",
        caption:
          "Structured across specialized parent and subsidiary entities with dedicated audit, nomination, and risk-management oversight.",
        imageUrl:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85",
        imageAlt:
          "Pingaksh Renewables Corporate Governance and Subsidiary SPV Structure",
      },
    ] as FoundationSlide[],
  },

  // =================================================================
  // 2. CORPORATE ANNOUNCEMENTS SECTION
  // Reimagined Editorial Layout with Partner Showcase & News Switcher
  // =================================================================
  announcementsSection: {
    eyebrow: "Corporate Communications & Press",
    sectionTitle: "Announcements",
    allPressHref: "/media/press-releases",
    allPressLabel: "View All Announcements",
    items: [
      {
        id: "ann-grid-synchronization",
        category: "PINGAKSH COMMUNICATION",
        date: "14 OCT, 2026",
        isoDate: "2026-10-14",
        headline:
          "Pingaksh Group and State Transmission Utility execute long-term Power Purchase & Grid Connectivity Agreement for upcoming hydro cascade expansion",
        summary:
          "Strategic bilateral framework secures dedicated evacuation corridors and long-term tariff certainty for Uttar Bharat Hydro Power (UBHP) generation assets.",
        href: "/media/press-releases/grid-connectivity-agreement-2026",
        partnerNames: {
          primary: "PINGAKSH GROUP",
          secondary: "STATE GRID CORP",
        },
        visualBadge: "Strategic Infrastructure Pact",
        imageUrl:
          "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
        imageAlt:
          "Pingaksh Group and State Transmission Utility Strategic Grid Connectivity Agreement",
      },
      {
        id: "ann-omc-supply-allocation",
        category: "CORPORATE FILING",
        date: "28 SEP, 2026",
        isoDate: "2026-09-28",
        headline:
          "Pingaksh Beverages Pvt. Ltd. (PBPL) secures multi-quarter supply allocation with Public Sector Oil Marketing Companies (OMCs) for ESY 2026–27",
        summary:
          "Long-term off-take contract strengthens order-book visibility and institutional cashflows across regional blending depots.",
        href: "/media/press-releases/omc-supply-allocation-2026",
        partnerNames: {
          primary: "PINGAKSH PBPL",
          secondary: "PSU OMC CONSORTIUM",
        },
        visualBadge: "Off-Take Contract",
        imageUrl:
          "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
        imageAlt:
          "Pingaksh Beverages PBPL Long-Term Off-Take Allocation with Public Sector OMCs",
      },
      {
        id: "ann-board-expansion",
        category: "BOARD & GOVERNANCE",
        date: "10 AUG, 2026",
        isoDate: "2026-08-10",
        headline:
          "Pingaksh Renewables reconstitutes Audit & Risk Management Committees; inducts Independent Directors to align with listed-grade governance norms",
        summary:
          "Board expansion reinforces internal financial controls, statutory audit transparency, and subsidiary oversight across group SPVs.",
        href: "/who-we-are/board-of-directors",
        partnerNames: {
          primary: "PINGAKSH BOARD",
          secondary: "STATUTORY GOVERNANCE",
        },
        visualBadge: "Corporate Governance",
        imageUrl:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
        imageAlt:
          "Pingaksh Renewables Board of Directors and Audit Committee Governance Announcement",
      },
    ] as AnnouncementItem[],
  },

  // =================================================================
  // 3. INVESTORS & STATUTORY COMPLIANCE SECTION
  // Structured with Fiscal Year Filter, Statutory Notices, & Market Cards
  // =================================================================
  investorsSection: {
    eyebrow: "Shareholder Value & Regulatory Disclosures",
    sectionTitle: "Investors & Governance",
    noticesHeading: "Statutory Notices & Filings",
    noticesCta: {
      label: "All Statutory Filings",
      href: "/investors/statutory-filings",
    },
    documentsHeading: "Financial Reports & Annual Returns",
    documentsCta: {
      label: "Open Document Repository",
      href: "/investors/financial-reports",
    },
    fiscalYears: ["FY 2026-27", "FY 2025-26", "FY 2024-25"],
    notices: [
      {
        id: "notice-1",
        date: "OCT 12, 2026",
        isoDate: "2026-10-12",
        referenceCode: "MCA/ROC/2026-27/Q2",
        title:
          "CFO Certificate on Debt Service Coverage & Commercial Obligations for the quarter ended September 30, 2026",
        href: "/investors/statutory-filings#cfo-certificate-q2",
      },
      {
        id: "notice-2",
        date: "SEP 29, 2026",
        isoDate: "2026-09-29",
        referenceCode: "AGM/PINGAKSH/2026/09",
        title:
          "Outcome of Annual General Meeting & Scrutinizer’s Report pursuant to Companies Act, 2013 and Secretarial Standards",
        href: "/investors/statutory-filings#agm-outcome-2026",
      },
      {
        id: "notice-3",
        date: "AUG 18, 2026",
        isoDate: "2026-08-18",
        referenceCode: "GOV/COMM/2026-27/04",
        title:
          "Constitution of Audit, Nomination & Remuneration, and Corporate Social Responsibility (CSR) Board Committees",
        href: "/investors/corporate-governance",
      },
    ] as InvestorNotice[],
    documents: [
      {
        id: "doc-1",
        fiscalYear: "FY 2026-27",
        title:
          "2026 – 2027 Unaudited Financial Presentation – H1 & Q2 Operational Review",
        releaseDate: "15 October, 2026",
        fileSize: "PDF · 3.4 MB",
        href: "/investors/financial-reports#fy27-q2",
      },
      {
        id: "doc-2",
        fiscalYear: "FY 2026-27",
        title:
          "2026 – 2027 Q1 Interim Financial Statements & Independent Auditor’s Review",
        releaseDate: "22 July, 2026",
        fileSize: "PDF · 2.8 MB",
        href: "/investors/financial-reports#fy27-q1",
      },
      {
        id: "doc-3",
        fiscalYear: "FY 2025-26",
        title:
          "2025 – 2026 Integrated Annual Report & Audited Consolidated Balance Sheet",
        releaseDate: "28 May, 2026",
        fileSize: "PDF · 6.1 MB",
        href: "/investors/financial-reports#fy26-ar",
      },
      {
        id: "doc-4",
        fiscalYear: "FY 2025-26",
        title:
          "Form MGT-7 Annual Return & Statutory Directors’ Report (UBHP & PBPL)",
        releaseDate: "30 April, 2026",
        fileSize: "PDF · 1.9 MB",
        href: "/investors/financial-reports#fy26-mgt7",
      },
      {
        id: "doc-5",
        fiscalYear: "FY 2024-25",
        title:
          "2024 – 2025 Audited Financial Statements & Credit Rating Rationale",
        releaseDate: "19 May, 2025",
        fileSize: "PDF · 4.7 MB",
        href: "/investors/financial-reports#fy25-ar",
      },
    ] as InvestorDocument[],
    marketTrackers: [
      {
        id: "tracker-nse",
        exchange: "NSE (Pingaksh Benchmark)",
        asOfDate: "As on Oct 16, 2026 | 15:59 IST",
        price: "₹1,198.70",
        change: "+24.10 (+2.05%)",
        isPositive: true,
        volumeLabel: "VOLUME",
        volumeValue: "14,82,450",
      },
      {
        id: "tracker-bse",
        exchange: "BSE (Sectoral Index)",
        asOfDate: "As on Oct 16, 2026 | 15:59 IST",
        price: "₹1,196.45",
        change: "+22.85 (+1.95%)",
        isPositive: true,
        volumeLabel: "VOLUME",
        volumeValue: "4,19,820",
      },
    ] as MarketTrackerCard[],
  },
};

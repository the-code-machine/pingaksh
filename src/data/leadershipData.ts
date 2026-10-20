// src/data/leadershipData.ts

export interface DirectorProfile {
  slug: string;
  name: string;
  designation: string;
  boardCategory:
    | "Promoter & Executive"
    | "Executive Director"
    | "Independent Director";
  isFounder?: boolean;
  dinNumber: string;
  appointedSince: string;
  qualifications: string[];
  almaMater: string;
  portraitImage: string;
  portraitAlt: string;
  shortSummary: string;
  executiveQuote: string;
  biographyParagraphs: string[];
  keyResponsibilities: string[];
  committees: {
    name: string;
    role: "Chairperson" | "Member";
  }[];
  directorshipsAndAffiliations: string[];
}

export interface LeadershipPageData {
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
    boardSummaryStat: string;
  };
  directors: DirectorProfile[];
}

export const LEADERSHIP_DATA: LeadershipPageData = {
  seo: {
    title: "Board of Directors & Leadership | Pingaksh Renewables",
    description:
      "Meet the Board of Directors steering Pingaksh Renewables (Pingaksh Group)—combining decades of hydroelectric engineering, bio-refinery execution, international business strategy, and corporate governance.",
    canonicalUrl: "https://pingaksh.com/who-we-are/board-of-directors",
  },

  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Who We Are", href: "/who-we-are" },
    { label: "Board of Directors", href: "/who-we-are/board-of-directors" },
  ],

  hero: {
    title: "Board of Directors",
    subtitle:
      "Steered by an experienced 6+2 Board architecture uniting industrial execution, international capital discipline, and independent regulatory oversight.",
    boardSummaryStat:
      "6 Executive & Promoter Directors • 2 Independent Non-Executive Advisors",
  },

  directors: [
    {
      slug: "naresh-goel",
      name: "Mr. Naresh Goel",
      designation: "Founder, Chairman & Managing Director",
      boardCategory: "Promoter & Executive",
      isFounder: true,
      dinNumber: "DIN: 00218490",
      appointedSince: "2008",
      qualifications: [
        "B.Com (Hons.), Corporate Finance & Industrial Administration",
        "30+ Years in Core Infrastructure & Renewable Power",
      ],
      almaMater: "University of Delhi",
      portraitImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
      portraitAlt:
        "Mr. Naresh Goel - Founder, Chairman & Managing Director of Pingaksh Group",
      shortSummary:
        "Architect of the Pingaksh Group, leading its evolution from Himalayan run-of-the-river hydro cascades (UBHP) into an integrated clean energy and grain-based bio-ethanol conglomerate.",
      executiveQuote:
        "We did not begin in boardrooms; we began in the steep gorges of the Sarju River—proving that utility-scale clean energy could be engineered in complete harmony with nature.",
      biographyParagraphs: [
        "Mr. Naresh Goel is the Founder, Promoter, and Chairman of the Pingaksh Group (formerly Uttar Bharat Hydro Power Private Limited). With over three decades of hands-on industrial leadership, he spearheaded the Group's entry into high-head, run-of-the-river hydroelectric power generation in the challenging geological terrain of Bageshwar, Uttarakhand.",
        "Under his direct supervision, the Group commissioned the Sarju River Cascade—comprising Sarju-I (7.5 MW), Sarju-II (15 MW), and Sarju-III (10.5 MW)—establishing an industry benchmark for low-submergence civil tunneling, electro-mechanical reliability, and synchronous grid evacuation to UPCL.",
        "Recognizing India's sovereign mandate for biofuel self-reliance and rural agricultural upliftment, Mr. Goel architected the Group's diversification into 250–350 KLPD Zero-Liquid-Discharge (ZLD) grain-based bio-ethanol distillation, high-protein DDGS animal nutrition, and regenerative Napier grass cultivation.",
      ],
      keyResponsibilities: [
        "Long-term capital allocation and multi-decade infrastructure strategy",
        "Oversight of the 30.6 MW+ Sarju Hydroelectric Cascade in Uttarakhand",
        "Greenfield execution of the 250–350 KLPD grain-based ethanol bio-refinery",
        "Rural farmer integration and MSME enterprise empowerment initiatives",
      ],
      committees: [
        { name: "Executive Capital & Project Committee", role: "Chairperson" },
        {
          name: "Corporate Social Responsibility (CSR) Committee",
          role: "Chairperson",
        },
      ],
      directorshipsAndAffiliations: [
        "Uttar Bharat Hydro Power Private Limited (UBHP)",
        "Pingaksh Bio-Energy & Green Fuels Limited",
        "Pingaksh Agro & Napier Biomass Farms",
      ],
    },
    {
      slug: "amul-goel",
      name: "Mr. Amul Goel",
      designation: "Executive Director — Strategy & Bio-Energy",
      boardCategory: "Promoter & Executive",
      dinNumber: "DIN: 07841205",
      appointedSince: "2018",
      qualifications: [
        "MSc in International Business",
        "B.Sc. in Business & Management",
      ],
      almaMater: "University of Manchester, United Kingdom",
      portraitImage:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85",
      portraitAlt: "Mr. Amul Goel - Executive Director of Pingaksh Renewables",
      shortSummary:
        "Spearheads international technology partnerships, 250 KLPD ethanol commercial operations, OMC supply-chain integration, and institutional capital markets.",
      executiveQuote:
        "By combining international operational discipline with India's E20 clean-fuel transition, we are building circular bio-refineries where every byproduct creates measurable economic value.",
      biographyParagraphs: [
        "Mr. Amul Goel serves as Executive Director on the Board of Pingaksh Renewables, where he leads corporate strategy, bio-refinery commercialization, and global technology partnerships. Holding an MSc in International Business from the University of Manchester, UK, he brings modern institutional analytics and supply-chain rigor to the Group.",
        "He has played a central role in scaling Pingaksh's grain-based ethanol division—structuring long-term offtake agreements with national Oil Marketing Companies (OMCs), optimizing regional non-food grain procurement networks across northern India, and establishing high-protein DDGS distribution channels for the dairy and poultry sectors.",
        "In addition to commercial operations, Mr. Amul Goel drives the Group's digital transformation, integrating automated SCADA telemetry across hydro powerhouses and real-time carbon accounting dashboards.",
      ],
      keyResponsibilities: [
        "Commercial operations of the 250 KLPD E20 Ethanol & DDGS division",
        "Long-term supply agreements with PSU Oil Marketing Companies (OMCs)",
        "International equipment procurement and SCADA digital modernization",
        "Institutional investor relations and green debt structuring",
      ],
      committees: [
        { name: "Executive Capital & Project Committee", role: "Member" },
        { name: "Risk Management & ESG Committee", role: "Chairperson" },
      ],
      directorshipsAndAffiliations: [
        "Pingaksh Bio-Energy & Green Fuels Limited",
        "Uttar Bharat Hydro Power Private Limited",
        "All India Distillers' Association (Executive Member)",
      ],
    },
    {
      slug: "aadish-goel",
      name: "Mr. Aadish Goel",
      designation: "Executive Director — Corporate Governance & Legal",
      boardCategory: "Promoter & Executive",
      dinNumber: "DIN: 08394112",
      appointedSince: "2020",
      qualifications: [
        "LLM in International Business & Corporate Law",
        "LL.B. (Hons.)",
      ],
      almaMater: "King's College London, United Kingdom",
      portraitImage:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
      portraitAlt:
        "Mr. Aadish Goel - Executive Director of Pingaksh Renewables",
      shortSummary:
        "Leads regulatory compliance, Power Purchase Agreements (PPAs), environmental clearances, and corporate governance across all Group entities.",
      executiveQuote:
        "Enduring infrastructure requires an ironclad regulatory and ethical foundation. Every megawatt and kiloliter we produce is backed by transparent fiduciary governance.",
      biographyParagraphs: [
        "Mr. Aadish Goel is an Executive Director of the Pingaksh Group, overseeing corporate law, regulatory affairs, contract structuring, and institutional governance. He holds a Master of Laws (LLM) in Business Law from King's College London, bringing international legal scholarship to India's regulated infrastructure sector.",
        "He leads the structuring and negotiation of long-term Power Purchase Agreements (PPAs) with state electricity distribution companies, tariff petitions before Electricity Regulatory Commissions (UERC), and environmental compliance under MoEFCC and CPCB frameworks.",
        "Mr. Aadish Goel also architected the Group's 6+2 Board Governance Charter, ensuring strict audit transparency, vendor ethics, and statutory compliance across all operating sites in Uttarakhand and Uttar Pradesh.",
      ],
      keyResponsibilities: [
        "Power Purchase Agreements (PPAs) and UERC regulatory tariff frameworks",
        "Statutory environmental clearances (MoEFCC, CPCB & ZLD compliance)",
        "Corporate governance charter, internal audit, and legal risk mitigation",
        "Land acquisition compliance and community rehabilitation frameworks",
      ],
      committees: [
        {
          name: "Stakeholders Relationship & Governance Committee",
          role: "Chairperson",
        },
        { name: "Audit & Statutory Compliance Committee", role: "Member" },
      ],
      directorshipsAndAffiliations: [
        "Uttar Bharat Hydro Power Private Limited",
        "Pingaksh Renewables Corporate Services",
        "International Bar Association — Energy & Natural Resources Section",
      ],
    },
    {
      slug: "rajeshwar-prasad-sharma",
      name: "Er. Rajeshwar Prasad Sharma",
      designation: "Whole-Time Director — Hydro Engineering & Projects",
      boardCategory: "Executive Director",
      dinNumber: "DIN: 05129834",
      appointedSince: "2014",
      qualifications: [
        "M.Tech in Water Resources & Hydroelectric Engineering",
        "B.E. in Civil Engineering",
      ],
      almaMater: "IIT Roorkee",
      portraitImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=85",
      portraitAlt:
        "Er. Rajeshwar Prasad Sharma - Whole-Time Director of Hydro Engineering",
      shortSummary:
        "Veteran Himalayan hydro civil engineer overseeing headrace tunneling, penstock integrity, and horizontal Francis turbine operations across Sarju I, II, and III.",
      executiveQuote:
        "Himalayan geology demands humility and precision. Our high-head cascades are designed for a 50-year civil lifecycle with zero ecological submergence.",
      biographyParagraphs: [
        "Er. Rajeshwar Prasad Sharma brings over 34 years of specialized civil and hydro-mechanical engineering experience in the Indian Himalayas. An alumnus of IIT Roorkee, he has supervised the design, rock tunneling, and commissioning of multiple run-of-the-river hydroelectric stations across Uttarakhand and Himachal Pradesh.",
        "At Pingaksh Group, he serves as Whole-Time Director (Technical), managing the civil and electro-mechanical integrity of the Sarju cascade in Bageshwar district—including desilting chambers, high-pressure steel penstocks (up to 155m net head), and 33kV/132kV switchyard evacuation infrastructure.",
      ],
      keyResponsibilities: [
        "O&M reliability across Sarju-I, Sarju-II, and Sarju-III powerhouses",
        "Geological slope stabilization and headrace tunnel engineering",
        "Hydro-mechanical safety audits and monsoon flood-routing protocols",
      ],
      committees: [
        { name: "Executive Capital & Project Committee", role: "Member" },
        { name: "Operational Safety & EHS Committee", role: "Chairperson" },
      ],
      directorshipsAndAffiliations: [
        "Uttar Bharat Hydro Power Private Limited",
        "Fellow, Institution of Engineers (India)",
      ],
    },
    {
      slug: "dr-arvind-deshmukh",
      name: "Dr. Arvind Deshmukh",
      designation: "Non-Executive Independent Director",
      boardCategory: "Independent Director",
      dinNumber: "DIN: 03190452",
      appointedSince: "2022",
      qualifications: [
        "Ph.D. in Chemical & Bioprocess Engineering",
        "B.Tech in Chemical Engineering",
      ],
      almaMater: "Institute of Chemical Technology (ICT), Mumbai",
      portraitImage:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
      portraitAlt: "Dr. Arvind Deshmukh - Non-Executive Independent Director",
      shortSummary:
        "Specialist in multi-pressure grain distillation, enzymatic fermentation, and Zero-Liquid-Discharge (ZLD) bio-refinery process engineering.",
      executiveQuote:
        "Modern bio-refineries are precision chemical ecosystems capable of achieving 100% water circularity while supplying high-octane green fuels.",
      biographyParagraphs: [
        "Dr. Arvind Deshmukh serves as an Independent Director on the Board of Pingaksh Renewables. With a doctorate in Bioprocess Engineering from ICT Mumbai and three decades of industrial advisory experience, he guides the technical audit of the Group's grain-based ethanol and bio-energy plants.",
        "He provides independent oversight on molecular sieve dehydration efficiency, Multi-Effect Evaporator (MEE) Zero-Liquid-Discharge systems, and high-protein DDGS dryer optimization.",
      ],
      keyResponsibilities: [
        "Independent technical review of 250–350 KLPD ethanol process yields",
        "Environmental audit of Zero-Liquid-Discharge (ZLD) water loops",
        "R&D evaluation for 2G cellulosic biomass and Napier grass feedstocks",
      ],
      committees: [
        { name: "Risk Management & ESG Committee", role: "Member" },
        { name: "Audit & Statutory Compliance Committee", role: "Member" },
      ],
      directorshipsAndAffiliations: [
        "Independent Technical Advisor — National Bio-Energy Mission",
        "Member, Indian Institute of Chemical Engineers (IIChE)",
      ],
    },
    {
      slug: "meera-sundaram",
      name: "Ms. Meera Sundaram, FCA",
      designation: "Non-Executive Independent Director",
      boardCategory: "Independent Director",
      dinNumber: "DIN: 06482910",
      appointedSince: "2023",
      qualifications: [
        "Fellow Chartered Accountant (FCA) — ICAI",
        "Certified Infrastructure & ESG Auditor",
      ],
      almaMater: "Institute of Chartered Accountants of India (ICAI)",
      portraitImage:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85",
      portraitAlt: "Ms. Meera Sundaram - Non-Executive Independent Director",
      shortSummary:
        "Chairs the Audit Committee, bringing 26 years of expertise in infrastructure project finance, statutory audit, and SEBI/BRSR sustainability reporting.",
      executiveQuote:
        "Disciplined balance-sheet stewardship and transparent ESG reporting are the cornerstones of institutional investor confidence.",
      biographyParagraphs: [
        "Ms. Meera Sundaram is a Fellow Member of the Institute of Chartered Accountants of India (FCA) with over 26 years of experience in infrastructure project finance, power-sector taxation, and corporate governance.",
        "As Chairperson of the Audit & Statutory Compliance Committee at Pingaksh Renewables, she oversees internal financial controls, green financing covenants, and BRSR-aligned sustainability disclosures.",
      ],
      keyResponsibilities: [
        "Chairperson of the Board Audit & Statutory Compliance Committee",
        "Oversight of internal financial controls and project debt covenants",
        "Review of related-party transactions and statutory ESG disclosures",
      ],
      committees: [
        { name: "Audit & Statutory Compliance Committee", role: "Chairperson" },
        { name: "Nomination & Remuneration Committee", role: "Chairperson" },
      ],
      directorshipsAndAffiliations: [
        "Fellow, Institute of Chartered Accountants of India (ICAI)",
        "Certified Independent Director — IICA Ministry of Corporate Affairs",
      ],
    },
  ],
};

export function getDirectorBySlug(slug: string): DirectorProfile | undefined {
  return LEADERSHIP_DATA.directors.find((d) => d.slug === slug);
}

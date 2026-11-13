// src/data/leadershipData.ts

export interface DirectorProfile {
  slug: string;
  name: string;
  designation: string;
  entity?: "PRL" | "PBPL";
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
  /** Optional CSS object-position override (e.g., waist-up crop for Aadish Goel) */
  portraitObjectPosition?: string;
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

export interface SubsidiaryBoardMemberLink {
  name: string;
  designation: string;
  slug: string;
  href: string;
  isPrimarySubsidiaryProfile?: boolean;
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
  /** All 7 profiles (6 PRL + 1 PBPL) so /who-we-are/leadership/[slug] resolves all of them */
  directors: DirectorProfile[];
  /** Filtered 6 directors of Pingaksh Renewables Limited (PRL) */
  prlDirectors: DirectorProfile[];
  /** Subsidiary Section: Pingaksh Beverages Private Limited (PBPL) */
  subsidiaryBoards: {
    companyName: string;
    shortName: string;
    description: string;
    featuredDirector: DirectorProfile;
    otherDirectors: SubsidiaryBoardMemberLink[];
  }[];
}

const ALL_DIRECTORS: DirectorProfile[] = [
  // ==========================================================================
  // 1. NARESH GOEL (PRL - Chairman & Managing Director)
  // ==========================================================================
  {
    slug: "naresh-goel",
    name: "Naresh Goel",
    designation: "Chairman & Managing Director, Pingaksh Renewables Limited",
    entity: "PRL",
    boardCategory: "Promoter & Executive",
    isFounder: true,
    dinNumber: "DIN: 00218490",
    appointedSince: "2006",
    qualifications: [
      "Founder & Promoter, Pingaksh Group",
      "Chairman of GEDA under Indian Federation of Green Energy (IFGE)",
    ],
    almaMater: "",
    portraitImage:
      "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/directors/director_89bec1ff20800c2f_1792514583.png",
    portraitAlt:
      "Naresh Goel - Chairman & Managing Director, Pingaksh Renewables Limited",
    shortSummary:
      "Naresh Goel is the founder and driving force behind the Pingaksh Group. Under his leadership, the Group has become a diversified enterprise spanning renewable energy, biofuels, finance and agriculture.",
    executiveQuote:
      "Our leadership is guided by long-term value creation, environmental responsibility and disciplined capital deployment to establish Pingaksh Renewables as one of India's leading names in renewable energy, clean fuels and sustainable materials.",
    biographyParagraphs: [
      "Naresh Goel is the founder and driving force behind the Pingaksh Group. Under his leadership, the Group has become a diversified enterprise spanning renewable energy, biofuels, finance and agriculture.",
      "He backed India's renewable energy sector long before green energy became mainstream. In 2006, the Group took over Uttar Bharat Hydro Power and committed to greenfield run-of-river hydropower on the Sarju river in Uttarakhand. Its first project was commissioned in 2014. At the time, few private developers were willing to take on the long gestation, difficult terrain and execution risk of Himalayan hydro. That early conviction is the foundation on which Pingaksh Renewables is built today.",
      "He brings deep experience in conceiving and building capital-intensive infrastructure, from project structuring and financing to execution in demanding environments. He applied the same foresight to biofuels. He chose to set up grain-based ethanol capacity in Rajasthan while most investment was concentrated in other states, a decision that helped catalyse further investment in the region. He is also Chairman of GEDA under the Indian Federation of Green Energy (IFGE), an industry platform that works with policymakers on shaping India's ethanol programme.",
      "His core strengths are corporate finance and planning, investor relations, risk management and taxation strategy. He is a firm believer in diversification as a source of resilience, and has deliberately spread the Group's exposure across complementary sectors. His leadership is guided by long-term value creation, environmental responsibility and disciplined capital deployment. His vision is to establish Pingaksh Renewables as one of India's leading names in renewable energy, clean fuels and sustainable materials.",
      "He has been recognised by several organisations for his contribution to industry, including the Bharat Vibhushan Samman Puraskar (2015), the Rajiv Gandhi Samman Puraskar (2015), the Asia Gold Star Award (2015) and the Indian Achiever Award for Business Excellence (2016).",
    ],
    keyResponsibilities: [
      "Corporate finance and planning, investor relations, risk management and taxation strategy",
      "Conceiving, structuring, financing and executing capital-intensive renewable energy and biofuel infrastructure",
      "Guiding long-term capital deployment across renewable energy, biofuels, finance and agriculture",
    ],
    committees: [
      { name: "Executive Capital & Project Committee", role: "Chairperson" },
      {
        name: "Corporate Social Responsibility (CSR) Committee",
        role: "Member",
      },
    ],
    directorshipsAndAffiliations: [
      "Pingaksh Renewables Limited (Chairman & Managing Director)",
      "Pingaksh Beverages Private Limited (Director)",
      "Pingaksh Renewables Limited (PRL)",
      "Chairman of GEDA, Indian Federation of Green Energy (IFGE)",
    ],
  },

  // ==========================================================================
  // 2. AMUL GOEL (PRL - Director)
  // ==========================================================================
  {
    slug: "amul-goel",
    name: "Amul Goel",
    designation: "Director, Pingaksh Renewables Limited",
    entity: "PRL",
    boardCategory: "Promoter & Executive",
    dinNumber: "DIN: 07841205",
    appointedSince: "2018",
    qualifications: ["Master's degree (MSc) in International Business"],
    almaMater: "University of Manchester",
    portraitImage:
      "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/directors/director_ab97bf037f6e7992_1794591539.jpg",
    portraitAlt: "Amul Goel - Director, Pingaksh Renewables Limited",
    shortSummary:
      "Amul Goel is a Director at the Pingaksh Group and a key architect of its growth across renewable energy, biofuels, finance and agriculture, combining a global business perspective with hands-on experience in project development, corporate finance and capital markets.",
    executiveQuote:
      "Every investment is backed by a complete financial outlay and a clear risk-mitigation framework before capital is committed—keeping our expansion ambitious and de-risked at the same time.",
    biographyParagraphs: [
      "Amul Goel is a Director at the Pingaksh Group and a key architect of its growth across renewable energy, biofuels, finance and agriculture. He holds a Master's degree (MSc) in International Business from the University of Manchester. He combines a global business perspective with hands-on experience in project development, corporate finance and capital markets.",
      "At the Group, he identifies new sectors for investment and turns ideas into bankable projects. He leads the process from sector research and opportunity assessment through detailed financial planning and structuring. Every investment is backed by a complete financial outlay and a clear risk-mitigation framework before capital is committed. This disciplined, research-first approach keeps the Group's expansion ambitious and de-risked at the same time.",
      "The Group's entry into ethanol shows this approach in practice. Most new grain-based capacity was concentrated in a few states. After in-depth study of feedstock availability, offtake, logistics and policy, he championed setting up the Group's distillery in Rajasthan instead. The result was a large-scale grain-based ethanol plant at Bundi supplying the national Ethanol Blended Petrol programme. It gave the Group a new vertical and also proved to be a well-insulated investment, because the risks had been mapped and addressed before construction began.",
      "His strengths in financial modelling, business development and investor engagement put him at the centre of the Group's strategic investments and its next phase of growth.",
    ],
    keyResponsibilities: [
      "Sector research, opportunity assessment, financial modelling and project structuring",
      "Turning new clean-energy and biofuel opportunities into bankable, de-risked projects",
      "Leading business development, capital markets execution and investor engagement",
    ],
    committees: [
      { name: "Executive Capital & Project Committee", role: "Member" },
      { name: "Risk Management & Strategy Committee", role: "Chairperson" },
    ],
    directorshipsAndAffiliations: [
      "Pingaksh Renewables Limited (Director)",
      "Pingaksh Beverages Private Limited (Director)",
      "Pingaksh Renewables Limited",
    ],
  },

  // ==========================================================================
  // 3. SUMAN GOEL (PRL - Director)
  // ==========================================================================
  {
    slug: "suman-goel",
    name: "Suman Goel",
    designation: "Director, Pingaksh Renewables Limited",
    entity: "PRL",
    boardCategory: "Promoter & Executive",
    dinNumber: "DIN: 00218530",
    appointedSince: "2010",
    qualifications: [
      "Corporate Social Responsibility & Community Stewardship",
      "Environmental & Social Governance Leadership",
    ],
    almaMater: "Pingaksh Group",
    portraitImage: "/images/leadership/suman-goel.jpg",
    portraitAlt: "Suman Goel - Director, Pingaksh Renewables Limited",
    shortSummary:
      "Suman Goel is a Director at the Pingaksh Group and the custodian of its social and community commitments, leading Corporate Social Responsibility policy and overall environmental stewardship.",
    executiveQuote:
      "Responsible business is a shared commitment to the communities that host our operations—ensuring that social responsibility, environmental care and ethical conduct remain central to how we grow.",
    biographyParagraphs: [
      "Suman Goel is a Director at the Pingaksh Group and the custodian of its social and community commitments. She leads the Group's Corporate Social Responsibility policy. She also provides overall stewardship to ensure the company grows in a way that benefits the people and environment around its operations.",
      "Her stewardship is most visible around the Group's operating ecosystem. Under her guidance, the company has carried out a range of initiatives with these communities:",
      "Health, sanitation and water: toilet construction in Timlabagad and Parmati villages, water supply schemes in Dodilla and Basey villages, and health care camps for local residents.",
      "Community development: the Santosh Devi Garib Kanya Vivah Yojna, which supports the weddings of girls from socially and economically disadvantaged families; community lodges at Kaflani and Rithabagad; a cremation ground at Dodilla; and temples at Barug and Kanuti villages.",
      "Pandemic relief: contributions to NGOs, hospitals and government relief funds during COVID-19, along with masks, sanitisers, rations and medical equipment for healthcare workers and villagers.",
      "Environmental responsibility: consistently maintaining mandatory downstream river flows at the project's diversion structures, in full compliance with National Green Tribunal requirements.",
      "Her approach treats responsible business as a shared commitment to the communities that host the Group's operations. As the Group grows into ethanol, biofuels and other clean-energy businesses, she continues to make sure that social responsibility, environmental care and ethical conduct remain central to how the company operates.",
    ],
    keyResponsibilities: [
      "Leading the Group's Corporate Social Responsibility (CSR) policy and community development programmes",
      "Overseeing health, sanitation, water supply and rural infrastructure initiatives around operating sites",
      "Ensuring environmental compliance, including mandatory ecological river flows in line with NGT norms",
    ],
    committees: [
      {
        name: "Corporate Social Responsibility (CSR) Committee",
        role: "Chairperson",
      },
      {
        name: "Stakeholders Relationship & ESG Committee",
        role: "Member",
      },
    ],
    directorshipsAndAffiliations: [
      "Pingaksh Renewables Limited (Director)",
      "Pingaksh Beverages Private Limited (Director)",
      "Santosh Devi Charitable & Community Initiatives",
    ],
  },

  // ==========================================================================
  // 4. SUBODH KUMAR (PRL - Independent Director)
  // ==========================================================================
  {
    slug: "subodh-kumar",
    name: "Subodh Kumar",
    designation: "Independent Director, Pingaksh Renewables Limited",
    entity: "PRL",
    boardCategory: "Independent Director",
    dinNumber: "Independent Board Member",
    appointedSince: "2024",
    qualifications: [
      "B.Tech in Electrical Engineering — IIT (BHU), Varanasi",
      "Postgraduate Degree in Management — MDI, Gurgaon",
    ],
    almaMater: "IIT (BHU), Varanasi & MDI, Gurgaon",
    portraitImage:
      "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/directors/WhatsApp_Image_2026-11-07_at_21_35_36_4306dcbd.jpg",
    portraitAlt:
      "Subodh Kumar - Independent Director, Pingaksh Renewables Limited",
    shortSummary:
      "Former Executive Director (Petrochemicals, Alternate Energy & Sustainable Development) of Indian Oil Corporation Limited and Senior Consultant at the Centre for High Technology, Ministry of Petroleum and Natural Gas, with over 40 years of energy sector experience.",
    executiveQuote:
      "Scaling indigenous biofuels, compressed biogas and clean energy pathways is central to India's long-term energy security and industrial decarbonisation.",
    biographyParagraphs: [
      "Subodh Kumar is the former Executive Director (Petrochemicals, Alternate Energy & Sustainable Development) of Indian Oil Corporation Limited, a Fortune Global 500 company and Maharatna Public Sector Enterprise of the Government of India. He currently serves as Senior Consultant at the Centre for High Technology, Ministry of Petroleum and Natural Gas.",
      "He has more than 40 years of experience in the downstream hydrocarbon sector, spanning petroleum products and LPG, petrochemicals, biofuels (ethanol, biodiesel and compressed biogas), solar and wind, carbon capture (CCUS), battery storage, green hydrogen and nuclear energy. He worked closely with the Ministry of Petroleum and Natural Gas on drafting the National Policy on Biofuels 2018 and on conceiving and launching the SATAT programme to promote compressed biogas in India.",
      "He has advised the Asian Development Bank, UNIDO, the Ministry of New and Renewable Energy, Tata Projects, GERMI and MAHAPREIT as a bioenergy expert. He has served on the boards of several clean energy companies, including NPCIL–IndianOil Nuclear Energy Corporation Limited, IndianOil–CREDA Biofuels Limited and IndianOil Panipat Power Consortium Limited, and was CEO and Director of IOT Biogas Private Limited. He is Advisor to the National Committee of IFGE and Convenor of its Biomass, Biochar and Carbon Management Forums.",
      "He holds a B.Tech in Electrical Engineering from IIT (BHU), Varanasi, and a postgraduate degree in Management from MDI, Gurgaon.",
    ],
    keyResponsibilities: [
      "Independent board oversight on biofuels, alternate energy, CCUS and sustainable development strategy",
      "Technical and policy guidance on grain-based ethanol, compressed biogas and downstream energy transition",
      "Advising on national regulatory frameworks and long-term technology roadmaps",
    ],
    committees: [
      { name: "Audit & Risk Management Committee", role: "Member" },
      {
        name: "Technical & Clean Energy Advisory Committee",
        role: "Chairperson",
      },
    ],
    directorshipsAndAffiliations: [
      "Pingaksh Renewables Limited (Independent Director)",
      "Senior Consultant, Centre for High Technology (MoPNG)",
      "Former Executive Director, Indian Oil Corporation Limited (IOCL)",
      "Advisor to the National Committee of IFGE",
    ],
  },

  // ==========================================================================
  // 5. CHINTAN SHAH (PRL - Independent Director)
  // ==========================================================================
  {
    slug: "chintan-shah",
    name: "Chintan Shah",
    designation: "Independent Director, Pingaksh Renewables Limited",
    entity: "PRL",
    boardCategory: "Independent Director",
    dinNumber: "Independent Board Member",
    appointedSince: "2024",
    qualifications: ["Bachelor's Degree in Chemical Engineering"],
    almaMater: "The Maharaja Sayajirao University of Baroda, Vadodara",
    portraitImage:
      "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/directors/WhatsApp_Image_2026-11-07_at_18_23_37_7cb5bfbd.jpg",
    portraitAlt:
      "Chintan Shah - Independent Director, Pingaksh Renewables Limited",
    shortSummary:
      "Former Director (Technical) at IREDA and Principal Advisor at NSEFI, bringing three decades of experience across India's renewable energy value chain spanning hydro, solar, wind, biomass, project financing and policy formulation.",
    executiveQuote:
      "Robust technical appraisal and disciplined green financing are the twin pillars required to scale India's renewable energy and industrial decarbonisation infrastructure.",
    biographyParagraphs: [
      "Chintan Shah has three decades of experience across India's renewable energy value chain, spanning solar, wind, storage, manufacturing, financing, R&D and policy formulation.",
      "He served as Director (Technical) at the Indian Renewable Energy Development Agency (IREDA), the Government of India's specialised renewable energy financier, from March 2018 to March 2023. In this role he led the appraisal, financing, policy formulation, planning and monitoring of renewable energy projects across wind, small, medium and large hydro, biomass, cogeneration, solar, biogas, waste-to-energy and energy efficiency.",
      "Before IREDA, he spent about seventeen years with Suzlon. He began his career as a Research Associate at TERI in 1996, joined Suzlon as General Manager in 2001, and rose to President before moving to IREDA in February 2018. In 2023, he joined the National Solar Energy Federation of India (NSEFI) as Principal Advisor, guiding its policy advocacy across the renewable energy value chain, including manufacturing and industrial decarbonisation.",
      "He holds a Bachelor's degree in Chemical Engineering from The Maharaja Sayajirao University of Baroda, Vadodara.",
    ],
    keyResponsibilities: [
      "Independent oversight on project appraisal, green financing and technical execution across hydro and renewables",
      "Strategic guidance on renewable energy policy, cogeneration, biomass and waste-to-energy initiatives",
      "Advising on institutional project monitoring and capital structuring",
    ],
    committees: [
      { name: "Audit & Project Finance Committee", role: "Chairperson" },
      { name: "Nomination & Remuneration Committee", role: "Member" },
    ],
    directorshipsAndAffiliations: [
      "Pingaksh Renewables Limited (Independent Director)",
      "Principal Advisor, National Solar Energy Federation of India (NSEFI)",
      "Former Director (Technical), IREDA",
      "Former President, Suzlon Energy",
    ],
  },

  // ==========================================================================
  // 6. VAIBHAV DANGE (PRL - Independent Director)
  // ==========================================================================
  {
    slug: "vaibhav-dange",
    name: "Vaibhav Dange",
    designation: "Independent Director, Pingaksh Renewables Limited",
    entity: "PRL",
    boardCategory: "Independent Director",
    dinNumber: "Independent Board Member",
    appointedSince: "2024",
    qualifications: [
      "Public Policy, Infrastructure Financing & Governance Expert",
      "Co-founder & CEO, Build India Foundation | Founder Director, IFGE",
    ],
    almaMater: "IIM Nagpur (Former Member, Board of Governors)",
    portraitImage:
      "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/directors/WhatsApp_Image_2026-11-06_at_17_08_41_debd5b9e.jpg",
    portraitAlt:
      "Vaibhav Dange - Independent Director, Pingaksh Renewables Limited",
    shortSummary:
      "Public policy and infrastructure expert with over 27 years of experience across infrastructure development, governance, economic policy, sustainable mobility and green energy; Co-founder & CEO of Build India Foundation and Founder Director of IFGE.",
    executiveQuote:
      "Aligning public-private infrastructure execution with forward-looking bioenergy and sustainable mobility policies is vital to building a self-reliant India.",
    biographyParagraphs: [
      "Vaibhav Dange is a public policy and infrastructure expert with over 27 years of experience across infrastructure development, governance, economic policy, investment promotion, sustainable mobility and green energy. He is Co-founder and CEO of Build India Foundation, a think tank focused on infrastructure, sustainable mobility and bioenergy policy. He is also Founder Director of the Indian Federation of Green Energy (IFGE).",
      "From 2014, he served for five years as Private Secretary to Shri Nitin Gadkari, Union Minister for Road Transport and Highways. He then spent five more years as an Advisor associated with the Ministry and the National Highways Authority of India (NHAI). His work there covered infrastructure financing, public-private partnerships, revival of stalled projects and electronic toll collection. Earlier, as Deputy Director at FICCI, he worked on state investment promotion initiatives including Vibrant Gujarat, Destination Madhya Pradesh and Resurgent Rajasthan. He also helped expand the Centre for Bharatiya Management Development to more than 13 locations.",
      "He has served on the Board of Governors of IIM Nagpur, where he chaired its Building Committee. He conceived and anchored Build India, a documentary series on Discovery Channel, and has co-authored two books on infrastructure and governance. His recognitions include the IEBF Excellence Award 2019, presented at the House of Lords, London, and Network18's Green Ribbon Champion Award for Fostering Sustainable Infrastructure.",
    ],
    keyResponsibilities: [
      "Independent governance oversight on public policy, infrastructure financing and public-private partnerships",
      "Strategic advisory on sustainable mobility, national bioenergy policy and state investment frameworks",
      "Guiding institutional governance and stakeholder engagement",
    ],
    committees: [
      {
        name: "Stakeholders Relationship & Governance Committee",
        role: "Chairperson",
      },
      {
        name: "Corporate Social Responsibility (CSR) Committee",
        role: "Member",
      },
    ],
    directorshipsAndAffiliations: [
      "Pingaksh Renewables Limited (Independent Director)",
      "Co-founder & CEO, Build India Foundation",
      "Founder Director, Indian Federation of Green Energy (IFGE)",
      "Former Member, Board of Governors, IIM Nagpur",
    ],
  },

  // ==========================================================================
  // 7. AADISH GOEL (Subsidiary: Pingaksh Beverages Private Limited - Director)
  // ==========================================================================
  {
    slug: "aadish-goel",
    name: "Aadish Goel",
    designation: "Director, Pingaksh Beverages Private Limited",
    entity: "PBPL",
    boardCategory: "Promoter & Executive",
    dinNumber: "DIN: 08394112",
    appointedSince: "2020",
    qualifications: ["LLM in Business Law"],
    almaMater: "King's College London",
    portraitImage:
      "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/directors/director_73ed40c93a91ff49_1794590817.webp",
    portraitAlt: "Aadish Goel - Director, Pingaksh Beverages Private Limited",
    // Waist-up framing hint for UI components rendering Aadish's portrait
    portraitObjectPosition: "object-top",
    shortSummary:
      "Aadish Goel is a Director on the board of Pingaksh Beverages Private Limited, the Group's grain-based ethanol subsidiary, combining an LLM in Business Law from King's College London with hands-on operational leadership of the ethanol distillery.",
    executiveQuote:
      "Combining rigorous legal and contractual oversight with hands-on plant operations ensures our obligations are clearly defined, risks are mitigated, and on-ground execution remains seamless.",
    biographyParagraphs: [
      "Aadish Goel is a Director and serves on the board of Pingaksh Beverages Private Limited, the Group's grain-based ethanol subsidiary. He holds an LLM in Business Law from King's College London. He brings a strong grounding in commercial law, contracts and corporate governance to the Group's leadership.",
      "His legal training shapes how the Group does business. He oversees the drafting, review and negotiation of key commercial agreements, including supply and offtake contracts, EPC and vendor arrangements, and partnership agreements. His focus is on making sure the Group's interests are protected and its obligations clearly defined. This careful approach to contracting helps the Group anticipate disputes, reduce legal and contractual risk, and maintain regulatory compliance across its businesses.",
      "He also oversees the day-to-day operations of the Group's ethanol distillery. He works closely with the plant leadership team on production, compliance and stakeholder coordination. Combining legal oversight with operational responsibility gives him a hands-on understanding of how contractual, regulatory and on-ground realities affect one another.",
    ],
    keyResponsibilities: [
      "Drafting, review and negotiation of supply, offtake, EPC, vendor and partnership agreements",
      "Day-to-day operational oversight of the Group's grain-based ethanol distillery alongside plant leadership",
      "Ensuring regulatory compliance, risk mitigation and stakeholder coordination across operations",
    ],
    committees: [
      {
        name: "Legal, Contracting & Compliance Committee (PBPL)",
        role: "Chairperson",
      },
      {
        name: "Distillery Operations & Execution Committee",
        role: "Chairperson",
      },
    ],
    directorshipsAndAffiliations: [
      "Pingaksh Beverages Private Limited (Director)",
      "Pingaksh Group Entities",
    ],
  },
];

export const LEADERSHIP_DATA: LeadershipPageData = {
  seo: {
    title: "Board of Directors | Pingaksh Renewables Limited",
    description:
      "Meet the Board of Directors of Pingaksh Renewables Limited and its subsidiary Pingaksh Beverages Private Limited—leaders across hydropower, grain-based ethanol, corporate finance, and public policy.",
    canonicalUrl: "https://pingaksh.com/who-we-are/leadership",
  },

  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Who We Are", href: "/who-we-are" },
    { label: "Board of Directors", href: "/who-we-are/leadership" },
  ],

  hero: {
    title: "Board of Directors",
    subtitle:
      "Our leadership combines deep infrastructure execution with distinguished independent oversight across renewable energy, biofuels, corporate finance, and public policy.",
    boardSummaryStat:
      "6 Directors in Pingaksh Renewables Limited • Subsidiary Leadership in Pingaksh Beverages Private Limited",
  },

  // All 7 profiles so dynamic route /who-we-are/leadership/[slug] works for every director including Aadish Goel
  directors: ALL_DIRECTORS,

  // The 6 Directors of Pingaksh Renewables Limited (PRL)
  prlDirectors: ALL_DIRECTORS.filter((d) => d.entity === "PRL"),

  // Subsidiary Board Section (Pingaksh Beverages Private Limited - PBPL)
  subsidiaryBoards: [
    {
      companyName: "Pingaksh Beverages Private Limited",
      shortName: "PBPL",
      description:
        "The Group's grain-based ethanol subsidiary operating our large-scale ethanol distillery supplying the national Ethanol Blended Petrol (EBP) programme.",
      featuredDirector: ALL_DIRECTORS.find((d) => d.slug === "aadish-goel")!,
      otherDirectors: [
        {
          name: "Naresh Goel",
          designation: "Director",
          slug: "naresh-goel",
          href: "/who-we-are/leadership/naresh-goel",
        },
        {
          name: "Amul Goel",
          designation: "Director",
          slug: "amul-goel",
          href: "/who-we-are/leadership/amul-goel",
        },
        {
          name: "Suman Goel",
          designation: "Director",
          slug: "suman-goel",
          href: "/who-we-are/leadership/suman-goel",
        },
      ],
    },
  ],
};

export function getDirectorBySlug(slug: string): DirectorProfile | undefined {
  return LEADERSHIP_DATA.directors.find((d) => d.slug === slug);
}

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
    title: "Board of Directors | Pingaksh Group",
    description:
      "The Board of Directors at Pingaksh Group brings together decades of expertise across renewable energy, finance, agriculture, and corporate governance.",
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
      "Our leadership team combines deep industrial experience with strong corporate governance to drive sustainable, long-term growth.",
    boardSummaryStat: "Executive Promoters • Independent Advisory Oversight",
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
        "Corporate Leadership & Industrial Administration",
        "Decades of experience in Infrastructure & Renewables",
      ],
      almaMater: "University of Delhi",
      portraitImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
      portraitAlt:
        "Mr. Naresh Goel - Founder, Chairman & Managing Director of Pingaksh Group",
      shortSummary:
        "Visionary entrepreneur and dynamic leader steering the Pingaksh Group's diversified growth across renewable energy, finance, and agriculture.",
      executiveQuote:
        "Our leadership philosophy emphasizes operational excellence, inclusive growth, and innovation-driven transformation to create long-term value that benefits both people and the planet.",
      biographyParagraphs: [
        "Mr. Naresh Goel is a visionary entrepreneur and dynamic leader steering the Pingaksh Group's diversified growth across multiple sectors. With an exceptional ability to integrate innovation, sustainability, and strategic foresight, he has built a business ecosystem that spans renewable energy, finance, and agriculture.",
        "Under his guidance, the Group has consistently expanded its footprint through forward-thinking initiatives that promote clean energy, empower small enterprises, and advance sustainable agricultural practices. His leadership is united by a commitment to long-term value creation and environmental responsibility.",
        "Mr. Goel's unwavering dedication to progress continues to propel the Pingaksh Group toward a brighter, greener, and more resilient future, ensuring that capital deployment aligns strictly with the Group's core operational integrity.",
      ],
      keyResponsibilities: [
        "Strategic direction and long-term capital allocation for the Group",
        "Oversight of multi-sector expansion in renewables, finance, and agriculture",
        "Ensuring operational excellence and inclusive growth across entities",
      ],
      committees: [
        { name: "Executive Capital & Project Committee", role: "Chairperson" },
        {
          name: "Corporate Social Responsibility (CSR) Committee",
          role: "Chairperson",
        },
      ],
      directorshipsAndAffiliations: [
        "Pingaksh Group Entities (Founder & Promoter)",
        "Uttar Bharat Hydro Power Private Limited (UBHP)",
      ],
    },
    {
      slug: "amul-goel",
      name: "Mr. Amul Goel",
      designation: "Director",
      boardCategory: "Promoter & Executive",
      dinNumber: "DIN: 07841205",
      appointedSince: "2018",
      qualifications: ["MSc in International Business"],
      almaMater: "University of Manchester, United Kingdom",
      portraitImage:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85",
      portraitAlt: "Mr. Amul Goel - Director at Pingaksh Group",
      shortSummary:
        "Drives strategic initiatives and expansion efforts across the group's diverse industries by applying international business dynamics to local markets.",
      executiveQuote:
        "We are committed to a forward-thinking approach that ensures the Pingaksh Group continues to thrive and lead in our core sectors.",
      biographyParagraphs: [
        "Mr. Amul Goel is a distinguished Director at the Pingaksh Group, bringing a wealth of expertise and a global perspective to the organization's leadership team. He holds a Master's degree in International Business (MSc) from the prestigious University of Manchester.",
        "He combines academic excellence with practical experience to drive strategic initiatives across the group's diverse industries. His deep understanding of global markets and international business dynamics positions him as a key player in the group's expansion and innovation efforts.",
        "Mr. Goel's commitment to excellence ensures that the Pingaksh Group continues to lead in sectors ranging from renewable energy to finance and agriculture, fostering sustainable growth and advancing the group's corporate vision.",
      ],
      keyResponsibilities: [
        "Implementation of strategic initiatives across diverse business verticals",
        "Applying global market analytics to domestic operational expansion",
        "Managing international technology partnerships and commercial operations",
      ],
      committees: [
        { name: "Executive Capital & Project Committee", role: "Member" },
        { name: "Risk Management & ESG Committee", role: "Chairperson" },
      ],
      directorshipsAndAffiliations: [
        "Pingaksh Group Entities",
        "Uttar Bharat Hydro Power Private Limited",
      ],
    },
    {
      slug: "aadish-goel",
      name: "Mr. Aadish Goel",
      designation: "Director",
      boardCategory: "Promoter & Executive",
      dinNumber: "DIN: 08394112",
      appointedSince: "2020",
      qualifications: ["LLM in Business Law"],
      almaMater: "King's College London, United Kingdom",
      portraitImage:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
      portraitAlt: "Mr. Aadish Goel - Director at Pingaksh Group",
      shortSummary:
        "Strengthens the organization’s leadership through profound expertise in business law, legal frameworks, and corporate governance.",
      executiveQuote:
        "Navigating the complexities of diverse industries requires strict adherence to compliance and a commitment to ethical business practices.",
      biographyParagraphs: [
        "Mr. Aadish Goel is a distinguished Director at the Pingaksh Group, whose expertise in business law significantly strengthens the organization's corporate structure. He holds an LLM degree in Business Law from the prestigious King's College London.",
        "He brings a profound understanding of legal frameworks and corporate governance to the group. His legal acumen and strategic insights are vital in navigating the complexities of the group's diverse industries, ensuring regulatory compliance and fostering ethical business practices.",
        "Mr. Goel's role is pivotal in guiding the group toward achieving its vision of sustainable growth while maintaining the highest standards of legal, environmental, and corporate integrity.",
      ],
      keyResponsibilities: [
        "Oversight of corporate governance and legal frameworks",
        "Management of statutory compliance and regulatory affairs",
        "Structuring of contracts, agreements, and ethical business policies",
      ],
      committees: [
        {
          name: "Stakeholders Relationship & Governance Committee",
          role: "Chairperson",
        },
        { name: "Audit & Statutory Compliance Committee", role: "Member" },
      ],
      directorshipsAndAffiliations: [
        "Pingaksh Group Entities",
        "Uttar Bharat Hydro Power Private Limited",
      ],
    },
  ],
};

export function getDirectorBySlug(slug: string): DirectorProfile | undefined {
  return LEADERSHIP_DATA.directors.find((d) => d.slug === slug);
}

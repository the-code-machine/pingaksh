export interface PressReleaseItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category:
    | "Hydro Power"
    | "Bio-Energy & Fuels"
    | "Corporate & Governance"
    | "Sustainability & CSR";
  releaseCode: string;
  date: string;
  isoDate: string;
  year: string;
  location: string;
  imageUrl: string;
  imageAlt: string;
  redirectHref: string;
  pdfDownloadHref?: string;
  isFeatured?: boolean;
  tags: string[];
}

export interface PressReleasesPageData {
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
  categories: string[];
  years: string[];
  mediaContact: {
    deskName: string;
    spokespersonRole: string;
    email: string;
    phone: string;
    note: string;
  };
  releases: PressReleaseItem[];
}

export const PRESS_RELEASES_DATA: PressReleasesPageData = {
  seo: {
    title: "Press Releases & Corporate Announcements | Pingaksh Group",
    description:
      "Search and read official press releases, project commissioning updates, statutory filings, and board announcements from Pingaksh Group (UBHP & PBPL).",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Media & Insights", href: "/media" },
    { label: "Press Releases & Announcements", href: "/media/press-releases" },
  ],
  hero: {
    title: "Press Releases & Announcements",
    subtitle: "Official Dispatches & Statutory Disclosures",
    leadText:
      "Access our archive of corporate communications, regulatory filings, infrastructure project updates, and governance announcements across Pingaksh Group entities.",
    backgroundImage:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=85",
    backgroundAlt:
      "Pingaksh Group Corporate Communications and Press Release Archive",
  },
  categories: [
    "All",
    "Hydro Power",
    "Bio-Energy & Fuels",
    "Corporate & Governance",
    "Sustainability & CSR",
  ],
  years: ["All Years", "2026", "2023", "2016", "2014"],
  mediaContact: {
    deskName: "Corporate Communications & Media Relations",
    spokespersonRole: "Head — Institutional Communications, Pingaksh Group",
    email: "media@pingakshrenewables.com",
    phone: "+91 (11) 2345-6744",
    note: "For statutory documents, high-resolution plant photography, or media inquiries regarding corporate operations.",
  },
  releases: [
    {
      id: "pr-2026-bundi-ethanol-plant",
      slug: "300-klpd-grain-based-ethanol-plant-at-bundi",
      title:
        "Pingaksh Beverages proposes 300 KLPD Grain-Based Ethanol manufacturing plant in District Bundi",
      excerpt:
        "Pingaksh Beverages Private Limited has proposed the installation of a 300 KLPD grain-based ethanol manufacturing plant at Village Ladpur, Tehsil Talera in Rajasthan to scale clean fuel production.",
      category: "Bio-Energy & Fuels",
      releaseCode: "PR/PBPL/2026/031",
      date: "27 March 2026",
      isoDate: "2026-03-27",
      year: "2026",
      location: "Bundi, Rajasthan",
      imageUrl:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
      imageAlt:
        "Pingaksh Beverages 300 KLPD Grain-Based Bio-Ethanol Distillery construction",
      redirectHref:
        "https://projectxindia.com/2026/03/27/300-klpd-grain-based-ethanol-plant-at-bundi/",
      isFeatured: true,
      tags: ["PBPL", "300 KLPD", "Ethanol", "Rajasthan"],
    },
    {
      id: "pr-2026-bundi-cogeneration",
      slug: "cogeneration-power-plant-at-bundi",
      title:
        "Pingaksh Beverages to install 6.5 MW Cogeneration Power Plant for bio-refinery operations",
      excerpt:
        "Alongside its ethanol expansion, Pingaksh Beverages has proposed the installation of a 6.5 MW cogeneration power plant at Village Ladpur, Rajasthan, to ensure self-reliant power supply for its distillation columns.",
      category: "Bio-Energy & Fuels",
      releaseCode: "PR/PBPL/2026/032",
      date: "28 March 2026",
      isoDate: "2026-03-28",
      year: "2026",
      location: "Bundi, Rajasthan",
      imageUrl:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
      imageAlt: "6.5 MW Cogeneration Power Plant integration",
      redirectHref:
        "https://projectxindia.com/2026/03/28/cogeneration-power-plant-at-bundi/",
      tags: ["PBPL", "Cogeneration", "6.5 MW", "Power Plant"],
    },
    {
      id: "pr-2023-uerc-petition",
      slug: "ubhp-uerc-deemed-generation-sarju-ii",
      title:
        "UBHP files statutory petition with UERC for deemed generation claims on 12.6 MW Sarju II Hydro Project",
      excerpt:
        "Uttar Bharat Hydro Power Private Limited has filed a petition under Section 86(1)(e) and 86(1)(f) claiming deemed generation in respect of the 12.6 MW Sarju II Small Hydro Power Project before the Uttarakhand Electricity Regulatory Commission.",
      category: "Corporate & Governance",
      releaseCode: "PR/UBHP/2023/104",
      date: "16 October 2023",
      isoDate: "2023-10-16",
      year: "2023",
      location: "Dehradun, Uttarakhand",
      imageUrl:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85",
      imageAlt: "Legal and statutory regulatory compliance documentation",
      redirectHref: "https://uerc.uk.gov.in/document-category/2023-en/",
      tags: [
        "UBHP",
        "UERC",
        "Regulatory Filing",
        "Sarju II",
        "Deemed Generation",
      ],
    },
    {
      id: "pr-2016-sarju-cascade-operations",
      slug: "commissioning-sarju-hydro-cascade",
      title:
        "Operational Milestone: UBHP commissions Sarju II (12.60 MW) and Sarju III (10.50 MW) Run-of-the-River Projects",
      excerpt:
        "Uttar Bharat Hydro Power confirms operational status of the Sarju II (3 x 4200 KW) and Sarju III (3 x 3600 KW) horizontal Francis turbine stations, feeding baseload electricity to the Uttarakhand grid.",
      category: "Hydro Power",
      releaseCode: "PR/UBHP/2016/055",
      date: "25 May 2016",
      isoDate: "2016-05-25",
      year: "2016",
      location: "Bageshwar, Uttarakhand",
      imageUrl:
        "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=85",
      imageAlt: "Sarju River hydro project operations and turbine hall",
      redirectHref: "https://ubhp.in/projects/",
      tags: [
        "Sarju Cascade",
        "Hydro Power",
        "Commissioning",
        "Grid Operations",
      ],
    },
  ],
};

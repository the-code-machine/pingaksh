export interface OfficeLocation {
  id: string;
  category: "corporate" | "hydro" | "bioenergy" | "agro";
  categoryLabel: string;
  entityName: string;
  title: string;
  badge: string;
  addressLines: string[];
  cityStatePin: string;
  phone: string;
  secondaryPhone?: string;
  email: string;
  operatingHours: string;
  coordinatesLabel: string;
  mapEmbedUrl: string;
  googleMapsDirectUrl: string;
  imageUrl: string;
  imageAlt: string;
  keyFunctions: string[];
}

export interface DepartmentDesk {
  id: string;
  department: string;
  contactRole: string;
  email: string;
  phone: string;
  scope: string;
}

export interface ContactOfficesPageData {
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
  statutoryIdentity: {
    parentEntity: string;
    hydroSpv: string;
    biofuelSpv: string;
    complianceNote: string;
  };
  categories: { id: string; label: string }[];
  offices: OfficeLocation[];
  departmentDesks: DepartmentDesk[];
  inquirySubjects: string[];
}

export const CONTACT_OFFICES_DATA: ContactOfficesPageData = {
  seo: {
    title: "Corporate, Registered & Plant Offices | Pingaksh Renewables",
    description:
      "Official directory of Pingaksh Group’s Corporate & Registered Offices, UBHP Sarju I, II, III Hydro Powerhouses in Bageshwar, and PBPL 250 KLPD Ethanol Distillery.",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Contact & Partners", href: "/contact" },
    { label: "Corporate & Registered Offices", href: "/contact/offices" },
  ],
  hero: {
    title: "Corporate & Plant Locations",
    subtitle: "Integrated Command Across Executive Hubs & Operating Sites",
    leadText:
      "Connect directly with our corporate secretariats, investor relations desk, Himalayan hydroelectric powerhouses, and grain bio-refinery complexes.",
    backgroundImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85",
    backgroundAlt:
      "Pingaksh Renewables Corporate Headquarters and Operations Network",
  },
  statutoryIdentity: {
    parentEntity: "Pingaksh Renewables Pvt. Ltd. (Pingaksh Group)",
    hydroSpv: "Uttar Bharat Hydro Power Pvt. Ltd. (UBHP)",
    biofuelSpv: "Pingaksh Beverages Pvt. Ltd. (PBPL)",
    complianceNote:
      "All official statutory notices, regulatory filings, and legal correspondence should be addressed to the Company Secretary at the Registered Office.",
  },
  categories: [
    { id: "all", label: "All Locations (5)" },
    { id: "corporate", label: "Corporate & Registered" },
    { id: "hydro", label: "Hydro Powerhouses (UBHP)" },
    { id: "bioenergy", label: "Ethanol Distillery (PBPL)" },
    { id: "agro", label: "Pingaksh Farms" },
  ],
  offices: [
    {
      id: "corporate-hq",
      category: "corporate",
      categoryLabel: "Corporate Headquarters",
      entityName: "Pingaksh Group · Executive Secretariat",
      title: "New Delhi Corporate Office",
      badge: "Primary Executive Hub",
      addressLines: [
        "Pingaksh Corporate Tower, Level 8, Commercial Complex",
        "Connaught Place / Central Business District",
      ],
      cityStatePin: "New Delhi – 110001, India",
      phone: "+91 (11) 2345-6789",
      secondaryPhone: "+91 (11) 2345-6790",
      email: "corporate@pingakshrenewables.com",
      operatingHours: "Mon – Sat: 09:30 AM – 06:30 PM IST",
      coordinatesLabel: "28.6315° N, 77.2167° E",
      mapEmbedUrl:
        "https://www.google.com/maps?q=Connaught+Place,New+Delhi,India&output=embed",
      googleMapsDirectUrl:
        "https://maps.google.com/?q=Connaught+Place,New+Delhi,India",
      imageUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Pingaksh Group Corporate Headquarters in New Delhi",
      keyFunctions: [
        "Board of Directors & Promoter Secretariat",
        "Corporate Finance, Treasury & Investor Relations",
        "Central EPC Procurement & OMC Tender Cell",
      ],
    },
    {
      id: "registered-office-uk",
      category: "corporate",
      categoryLabel: "Registered & Regional Office",
      entityName: "Uttar Bharat Hydro Power Pvt. Ltd. (UBHP)",
      title: "Dehradun Registered & Liaison Office",
      badge: "Statutory Office",
      addressLines: [
        "UBHP House, Rajpur Road Institutional Corridor",
        "Near State Power Transmission Directorate",
      ],
      cityStatePin: "Dehradun, Uttarakhand – 248001, India",
      phone: "+91 (135) 274-5600",
      email: "secretarial@pingakshrenewables.com",
      operatingHours: "Mon – Sat: 09:30 AM – 06:00 PM IST",
      coordinatesLabel: "30.3398° N, 78.0644° E",
      mapEmbedUrl:
        "https://www.google.com/maps?q=Rajpur+Road,Dehradun,Uttarakhand,India&output=embed",
      googleMapsDirectUrl:
        "https://maps.google.com/?q=Rajpur+Road,Dehradun,Uttarakhand,India",
      imageUrl:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      imageAlt:
        "UBHP Registered and State Liaison Office in Dehradun, Uttarakhand",
      keyFunctions: [
        "Statutory ROC Filings & Company Secretary Desk",
        "UPCL / PTCUL State Grid Evacuation Coordination",
        "Ministry of Environment & Forest Clearances",
      ],
    },
    {
      id: "sarju-hydro-complex",
      category: "hydro",
      categoryLabel: "Hydroelectric Generation Complex",
      entityName: "UBHP · Sarju I, II & III Cascade (30.60 MW)",
      title: "Bageshwar Hydro Powerhouse & Site Office",
      badge: "24×7 Grid Plant",
      addressLines: [
        "Sarju Cascade Project Complex, Tehsil Kapkot",
        "Sarju River Valley, District Bageshwar",
      ],
      cityStatePin: "Bageshwar, Uttarakhand – 263632, India",
      phone: "+91 (5963) 222-410",
      email: "hydro.ops@pingakshrenewables.com",
      operatingHours: "24×7 Continuous Shift Operations (SCADA)",
      coordinatesLabel: "29.9419° N, 79.9032° E",
      mapEmbedUrl:
        "https://www.google.com/maps?q=Kapkot,Bageshwar,Uttarakhand,India&output=embed",
      googleMapsDirectUrl:
        "https://maps.google.com/?q=Kapkot,Bageshwar,Uttarakhand,India",
      imageUrl:
        "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=1200&q=80",
      imageAlt:
        "Sarju I, II, III Run-of-the-River Hydroelectric Plant in Kapkot, Bageshwar",
      keyFunctions: [
        "Sarju III (10.50 MW) & Sarju II (12.60 MW) Generation Switchyard",
        "Sarju I (7.50 MW) Upstream Civil & Electro-Mechanical Execution",
        "Catchment Ecology & Local Community CSR Cell",
      ],
    },
    {
      id: "pbpl-ethanol-distillery",
      category: "bioenergy",
      categoryLabel: "Green Fuels & Circular Bio-Refinery",
      entityName: "Pingaksh Beverages Pvt. Ltd. (PBPL)",
      title: "250 KLPD Grain Bio-Ethanol & ZLD Complex",
      badge: "E20 Bio-Refinery",
      addressLines: [
        "PBPL Industrial Bio-Energy Park, Agro-Industrial Growth Center",
        "NH- Corridor, Northern Industrial Belt",
      ],
      cityStatePin: "Northern Industrial Zone, India",
      phone: "+91 (11) 2345-6800",
      email: "biofuels@pingakshrenewables.com",
      operatingHours: "24×7 Automated Distillation & OMC Dispatch",
      coordinatesLabel: "29.1492° N, 75.7217° E",
      mapEmbedUrl:
        "https://www.google.com/maps?q=Uttarakhand+Industrial+Area,India&output=embed",
      googleMapsDirectUrl:
        "https://maps.google.com/?q=Uttarakhand+Industrial+Area,India",
      imageUrl:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      imageAlt:
        "Pingaksh Beverages 250 KLPD Grain-Based Bio-Ethanol Distillery",
      keyFunctions: [
        "250–350 KLPD Fuel-Grade Ethanol Distillation (E20)",
        "High-Protein DDGS Drying & Bulk Dispatch Terminal",
        "Food-Grade Liquid CO₂ Bottling & 100% ZLD Plant",
      ],
    },
    {
      id: "pingaksh-farms-hub",
      category: "agro",
      categoryLabel: "Sustainable Biomass & Agro Division",
      entityName: "Pingaksh Farms",
      title: "Napier Grass & Rural Feedstock Aggregation Hub",
      badge: "Agro-Biomass",
      addressLines: [
        "Pingaksh Integrated Agro-Energy Estates",
        "Rural Feedstock & Farmer Collection Zone",
      ],
      cityStatePin: "Uttarakhand & Adjoining Agrarian Belt, India",
      phone: "+91 (11) 2345-6855",
      email: "farms@pingakshrenewables.com",
      operatingHours: "Mon – Sat: 08:00 AM – 06:00 PM IST",
      coordinatesLabel: "29.2104° N, 78.9619° E",
      mapEmbedUrl:
        "https://www.google.com/maps?q=Kashipur,Uttarakhand,India&output=embed",
      googleMapsDirectUrl:
        "https://maps.google.com/?q=Kashipur,Uttarakhand,India",
      imageUrl:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Pingaksh Farms Napier Grass Cultivation and Feedstock Hub",
      keyFunctions: [
        "High-Yield Napier Grass Bio-Crop Cultivation",
        "Direct Farmer Non-Food Grain Procurement",
        "Organic Soil Amendment & Rural Extension Services",
      ],
    },
  ],
  departmentDesks: [
    {
      id: "desk-investors",
      department: "Investor Relations & Secretarial",
      contactRole: "Company Secretary & Compliance Officer",
      email: "investors@pingakshrenewables.com",
      phone: "+91 (11) 2345-6711",
      scope:
        "Annual returns, statutory filings, debenture/lender disclosures & governance.",
    },
    {
      id: "desk-procurement",
      department: "EPC, Grain & Vendor Procurement",
      contactRole: "Head — Supply Chain & Contracts",
      email: "procurement@pingakshrenewables.com",
      phone: "+91 (11) 2345-6722",
      scope:
        "Vendor portal access codes, grain tenders, hydro spares & logistics.",
    },
    {
      id: "desk-commercial",
      department: "OMC Ethanol, DDGS & CO₂ Sales",
      contactRole: "VP — Commercial & Off-Take",
      email: "commercial@pingakshrenewables.com",
      phone: "+91 (11) 2345-6733",
      scope:
        "E20 ethanol depot allocations, bulk DDGS nutrition & liquid CO₂ off-take.",
    },
    {
      id: "desk-media",
      department: "Corporate Communications & ESG",
      contactRole: "Public Relations & Sustainability Desk",
      email: "media@pingakshrenewables.com",
      phone: "+91 (11) 2345-6744",
      scope:
        "Press releases, carbon offset verification & CSR community inquiries.",
    },
  ],
  inquirySubjects: [
    "Institutional / Investor Relations Inquiry",
    "OMC Bio-Ethanol / DDGS / CO₂ Commercial Off-Take",
    "Hydro Power Grid & PPA Coordination",
    "Vendor Empanelment & Portal Access Request",
    "Media, Press & Sustainability Inquiry",
    "General Corporate Correspondence",
  ],
};

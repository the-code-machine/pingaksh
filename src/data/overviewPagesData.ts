export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface HeroSlideImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface OverviewStat {
  value: string;
  unit: string;
  label: string;
}

export interface SubSectionCard {
  id: string;
  badge: string;
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
  ctaLabel?: string;
  featuredSpan?: boolean; // Makes first/featured card span wider on desktop
}

export interface OverviewPageData {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  breadcrumbs: BreadcrumbItem[];
  hero: {
    eyebrow: string;
    title: string; // Rendered as primary H1 for On-Page SEO
    subtitle: string;
    images: HeroSlideImage[];
  };
  introSection: {
    mottoTag: string;
    headline: string;
    paragraphs: string[];
    stats: OverviewStat[];
  };
  philosophyBanner: {
    badge: string;
    title: string;
    paragraphs: string[];
    backgroundImage: string;
    backgroundAlt: string;
    highlightMetric: { value: string; label: string };
  };
  subSectionsGrid: {
    eyebrow: string;
    sectionTitle: string;
    sectionSubtitle: string;
    cards: SubSectionCard[];
  };
}

// ============================================================================
// PRE-BUILT OVERVIEW DATA OBJECTS (Pass any of these to <OverviewPageTemplate />)
// ============================================================================
export const OVERVIEW_PAGES_DATA: Record<string, OverviewPageData> = {
  "who-we-are": {
    slug: "who-we-are",
    seoTitle: "Who We Are | Pingaksh Renewables (Formerly UBHP)",
    seoDescription:
      "Explore Pingaksh Group’s evolution from Uttar Bharat Hydro Power (UBHP) to a diversified clean energy conglomerate led by visionary founders and a 6+2 Board.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Who We Are", href: "/who-we-are" },
    ],
    hero: {
      eyebrow: "Pingaksh Group · Corporate Identity",
      title: "Who We Are",
      subtitle:
        "From pioneering Himalayan hydroelectric cascades as UBHP to scaling next-generation industrial infrastructure across India.",
      images: [
        {
          url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=85",
          alt: "Pingaksh Group Civil and Hydroelectric Engineering Operations",
          caption: "Engineering Excellence in High-Altitude Terrains",
        },
        {
          url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85",
          alt: "Pingaksh Renewables Corporate Governance and Headquarters",
          caption: "Institutional Governance & Multi-Entity Architecture",
        },
        {
          url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=85",
          alt: "Pingaksh Group Clean Energy Infrastructure Across India",
          caption: "Powering India’s Sustainable Industrial Future",
        },
      ],
    },
    introSection: {
      mottoTag: "“Empowering Excellence”",
      headline:
        "Pingaksh Renewables is an integrated clean-infrastructure enterprise engineering resilient energy and industrial assets for India.",
      paragraphs: [
        "Rooted in the Sanskrit term ‘Pingaksh’—symbolizing a sacred, far-seeing force—our group began its journey as Uttar Bharat Hydro Power Pvt. Ltd. (UBHP), executing complex run-of-the-river hydroelectric projects in the Himalayan river valleys of Uttarakhand.",
        "Guided by visionary founder Mr. Naresh Goel alongside directors Mr. Amul Goel and Mr. Aadish Goel, we have expanded from pure-play hydro generation into green biofuels, circular agro-processing, and ring-fenced Special Purpose Vehicles (SPVs) backed by listed-grade corporate governance.",
      ],
      stats: [
        { value: "2014", unit: "COD Era", label: "First Hydro Commissioning" },
        {
          value: "6 + 2",
          unit: "Directors",
          label: "Parent & Subsidiary Boards",
        },
        {
          value: "4+",
          unit: "Verticals",
          label: "Hydro, Biofuels, DDGS & Agro",
        },
        {
          value: "100%",
          unit: "Compliance",
          label: "ISO & Statutory Governance",
        },
      ],
    },
    philosophyBanner: {
      badge: "Our Founding Philosophy",
      title: "What Strengthens India’s Energy Security Strengthens Pingaksh",
      paragraphs: [
        "Every infrastructure asset we commission is designed to solve a structural national priority—whether supplying peaking hydroelectric power to the northern grid, substituting imported fossil crude through indigenous E20 grain ethanol, or fortifying rural farm incomes.",
        "We combine generational promoter commitment with independent board oversight, ensuring long-term value creation for lenders, off-take partners, and rural communities alike.",
      ],
      backgroundImage:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85",
      backgroundAlt:
        "Himalayan River Valley and Sustainable Infrastructure Philosophy of Pingaksh Group",
      highlightMetric: {
        value: "Zero Compromise",
        label: "On Environmental & Statutory Integrity",
      },
    },
    subSectionsGrid: {
      eyebrow: "Explore Who We Are",
      sectionTitle: "Corporate Pillars & Leadership",
      sectionSubtitle:
        "Navigate directly to our institutional history, milestone timeline, core values, and board of directors.",
      cards: [
        // {
        //   id: "corporate-overview",
        //   badge: "01 · Institutional Evolution",
        //   title: "Corporate Overview (UBHP to Pingaksh)",
        //   description:
        //     "Trace our strategic transformation from Uttar Bharat Hydro Power into a multi-vertical renewable energy and bio-refining group.",
        //   href: "/who-we-are/corporate-overview",
        //   imageUrl:
        //     "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=1200&q=80",
        //   imageAlt: "UBHP to Pingaksh Renewables Corporate Overview",
        //   ctaLabel: "Read Overview",
        //   featuredSpan: true,
        // },
        {
          id: "heritage-timeline",
          badge: "01 · Interactive Scrubber",
          title: "Our Heritage & Growth Timeline",
          description:
            "Explore our horizontal milestone scrubber documenting groundbreaking to commercial operation dates (COD) across Sarju I, II, III and PBPL.",
          href: "/who-we-are/heritage-timeline",
          imageUrl:
            "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Pingaksh Group Interactive Heritage and Growth Timeline",
          ctaLabel: "Launch Timeline",
          featuredSpan: true,
        },
        {
          id: "vision-mission",
          badge: "02 · Guiding Ethos",
          title: "Vision, Mission & Core Values",
          description:
            "Discover the operational principles, safety benchmarks, and environmental stewardship commitments that govern every plant.",
          href: "/who-we-are/vision-mission",
          imageUrl:
            "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Pingaksh Renewables Vision, Mission and Core Values",
          ctaLabel: "Explore Ethos",
        },
        {
          id: "board-of-directors",
          badge: "03 · Parent Governance",
          title: "Leadership & Board of Directors",
          description:
            "Meet our 6 Parent Board Directors—including Executive Promoters and Independent Directors heading our statutory committees.",
          href: "/who-we-are/board-of-directors",
          imageUrl:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Pingaksh Group Leadership and 6 Parent Board of Directors",
          ctaLabel: "Meet the Board",
        },
        {
          id: "subsidiary-leadership",
          badge: "04 · SPV Architecture",
          title: "Subsidiary Leadership & Group Structure",
          description:
            "Inspect our ring-fenced Special Purpose Vehicles (UBHP, PBPL, Pingaksh Farms) and our 2 Subsidiary Additional Directors.",
          href: "/who-we-are/subsidiary-leadership",
          imageUrl:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Pingaksh Subsidiary Leadership and SPV Group Structure",
          ctaLabel: "View Group Structure",
        },
      ],
    },
  },

  "our-businesses": {
    slug: "our-businesses",
    seoTitle: "Our Businesses | Hydro Power, Bio-Fuels & Circular Economy",
    seoDescription:
      "Discover Pingaksh Group’s operating verticals: Sarju I, II, III Run-of-the-River Hydro Power, Grain-Based Ethanol Distillery, DDGS, and CO2 recovery.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Our Businesses", href: "/our-businesses" },
    ],
    hero: {
      eyebrow: "Operating Verticals & Infrastructure",
      title: "Our Businesses",
      subtitle:
        "Synergistic clean-energy platforms spanning Himalayan hydroelectric cascades, biofuel distillation, and circular co-product recovery.",
      images: [
        {
          url: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=2000&q=85",
          alt: "Sarju I, II, III Hydroelectric Power Stations",
          caption: "Run-of-the-River Hydroelectric Generation (Sarju Cascade)",
        },
        {
          url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=85",
          alt: "Pingaksh Beverages Grain Distillery Infrastructure",
          caption: "Automated Bio-Refining & Process Engineering",
        },
      ],
    },
    introSection: {
      mottoTag: "“Engineered for Circularity”",
      headline:
        "Diversified across baseload renewable electricity, green mobility fuels, and industrial carbon valorization.",
      paragraphs: [
        "Each business vertical within Pingaksh Group is engineered to operate with high plant load factors, long-term off-take security, and closed-loop resource efficiency.",
      ],
      stats: [
        {
          value: "30.60",
          unit: "MW",
          label: "Sarju I, II & III Hydro Cascade",
        },
        {
          value: "Francis",
          unit: "Turbines",
          label: "Horizontal Electro-Mechanical",
        },
        {
          value: "DDGS",
          unit: "+ CO₂",
          label: "Value-Added Circular Co-Products",
        },
        { value: "4", unit: "Entities", label: "Dedicated Operating SPVs" },
      ],
    },
    philosophyBanner: {
      badge: "Operational Synergy",
      title: "Integrated Clean-Tech Engineering Across Power & Fuels",
      paragraphs: [
        "By combining long-concession hydroelectric generation assets with high-turnover biofuel and circular by-product streams, Pingaksh Group balances stable annuity cashflows with rapid industrial scale.",
      ],
      backgroundImage:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1920&q=85",
      backgroundAlt:
        "Pingaksh Group Clean Energy Transmission and Industrial Operations",
      highlightMetric: {
        value: "24×7",
        label: "Automated Plant Telemetry & Quality Control",
      },
    },
    subSectionsGrid: {
      eyebrow: "Business Verticals",
      sectionTitle: "Explore Our Operating Divisions",
      sectionSubtitle:
        "Select any division to inspect interactive SVG process workflows and technical plant matrices.",
      cards: [
        {
          id: "hydro-power",
          badge: "01 · Clean Grid Power",
          title: "Hydro Power Generation (Sarju I, II, III)",
          description:
            "30.60 MW cumulative run-of-the-river hydroelectric cascade in Bageshwar, Uttarakhand utilizing Horizontal Francis Turbines.",
          href: "/our-businesses/hydro-power",
          imageUrl:
            "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Sarju I, II, III Hydro Power Generation Plant",
          ctaLabel: "Inspect Hydro Specs",
          featuredSpan: true,
        },
        {
          id: "green-fuels",
          badge: "02 · Bio-Refining",
          title: "Green Fuels & Bio-Energy (PBPL)",
          description:
            "State-of-the-art grain-based ethanol distillation facility supporting national E20 fuel blending mandates with PSU Oil Marketing Companies.",
          href: "/our-businesses/green-fuels-ethanol",
          imageUrl:
            "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Pingaksh Green Fuels Bio-Ethanol Distillery",
          ctaLabel: "View Process Workflow",
        },
        {
          id: "circular-economy",
          badge: "03 · Zero-Waste Recovery",
          title: "By-Products & Circular Economy",
          description:
            "High-protein DDGS animal feed drying, fermentation CO₂ scrubbing, food-grade liquid CO₂ bottling, and dry ice manufacturing.",
          href: "/our-businesses/circular-economy",
          imageUrl:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "DDGS and CO2 Bottling Circular Economy",
          ctaLabel: "Explore Co-Products",
        },
        {
          id: "subsidiaries-spvs",
          badge: "04 · Group Entities",
          title: "Subsidiaries, SPVs & Pingaksh Farms",
          description:
            "Special Purpose Vehicles (UBHP, PBPL) and Napier grass bio-energy cultivation at Pingaksh Farms.",
          href: "/our-businesses/subsidiaries-spvs",
          imageUrl:
            "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Pingaksh Group Subsidiaries and Pingaksh Farms",
          ctaLabel: "View SPV Portfolio",
        },
      ],
    },
  },
  contact: {
    slug: "contact",
    seoTitle:
      "Contact & Partner Ecosystem | Pingaksh Renewables (Pingaksh Group)",
    seoDescription:
      "Connect with Pingaksh Group’s Corporate & Registered Offices, access the password-protected Vendor Registration Portal, or explore engineering career opportunities.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Contact & Partners", href: "/contact" },
    ],
    hero: {
      eyebrow: "Institutional Communications & Partner Desk",
      title: "Contact & Partners",
      subtitle:
        "Direct channels to our Corporate Headquarters, Himalayan hydro powerhouses, bio-refinery plant operations, and encrypted supplier onboarding.",
      images: [
        {
          url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85",
          alt: "Pingaksh Group Corporate Headquarters and Institutional Offices",
          caption:
            "Corporate & Registered Headquarters · New Delhi & Uttarakhand",
        },
        {
          url: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=2000&q=85",
          alt: "UBHP Sarju Cascade Hydroelectric Project Site Offices in Bageshwar",
          caption: "Sarju I, II & III Hydro Operations Desk · Bageshwar, UK",
        },
        {
          url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=85",
          alt: "Pingaksh Beverages PBPL Bio-Ethanol Distillery Operations Complex",
          caption: "250 KLPD Bio-Refinery & Procurement Complex",
        },
      ],
    },
    introSection: {
      mottoTag: "“Transparent Institutional Access”",
      headline:
        "Seamless coordination for grid authorities, OMC off-take partners, EPC vendors, and institutional stakeholders.",
      paragraphs: [
        "Whether you are a Public Sector Oil Marketing Company (OMC) coordinating anhydrous ethanol dispatches, a state transmission utility managing hydro evacuation, or an industrial supplier seeking vendor empanelment, our dedicated corporate desks ensure rapid, structured responses.",
        "Our operations are anchored between our Corporate & Registered Offices in New Delhi and Dehradun, our Himalayan hydro cascades in District Bageshwar (Uttarakhand), and our automated grain distillery complex.",
      ],
      stats: [
        { value: "4+", unit: "Locations", label: "Corporate & Plant Sites" },
        {
          value: "24×7",
          unit: "SCADA Desk",
          label: "Plant Telemetry & Dispatch",
        },
        {
          value: "Gated",
          unit: "e-Portal",
          label: "Encrypted Vendor Onboarding",
        },
        { value: "ISO", unit: "Certified", label: "9001 & 14001 Operations" },
      ],
    },
    philosophyBanner: {
      badge: "Supply Chain & Governance Ethics",
      title: "Built on Long-Term Partnerships & Zero-Tolerance Compliance",
      paragraphs: [
        "Pingaksh Group’s procurement and contracting ecosystem operates on strict meritocracy, digital audit trails, and statutory transparency. All EPC contractors, grain suppliers, and logistics partners undergo standardized KYC, GST, and HSE pre-qualification.",
        "We also maintain a dedicated Vigilance & Ethics reporting channel to safeguard institutional integrity across every Special Purpose Vehicle.",
      ],
      backgroundImage:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=85",
      backgroundAlt:
        "Pingaksh Group Corporate Governance and Partner Ecosystem",
      highlightMetric: {
        value: "100% Digital",
        label: "Vendor KYC, GST & Compliance Verification",
      },
    },
    subSectionsGrid: {
      eyebrow: "Connect With Pingaksh Group",
      sectionTitle: "Offices, Vendor Portal & Careers",
      sectionSubtitle:
        "Select a dedicated channel below to access our directory of offices, submit vendor credentials, or apply for engineering roles.",
      cards: [
        {
          id: "corporate-offices",
          badge: "01 · Global & Site Directory",
          title: "Corporate & Registered Offices",
          description:
            "Complete directory of Pingaksh Group’s Corporate Headquarters, Registered Office, UBHP Sarju I–III Hydro Site Offices, and PBPL Distillery Complex.",
          href: "/contact/offices",
          imageUrl:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Pingaksh Group Corporate and Registered Offices Directory",
          ctaLabel: "View Office Directory",
          featuredSpan: true,
        },
        {
          id: "vendor-portal",
          badge: "02 · Password Protected",
          title: "Vendor Registration Portal",
          description:
            "Authorized onboarding gateway for EPC contractors, grain aggregators, and industrial suppliers to upload GST, PAN, and technical capability profiles.",
          href: "/contact/vendor-portal",
          imageUrl:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
          imageAlt:
            "Pingaksh Group Password-Protected Vendor Registration Portal",
          ctaLabel: "Unlock Vendor Portal",
        },
        {
          id: "career-inquiries",
          badge: "03 · Human Capital",
          title: "Career Inquiries & Engineering Roles",
          description:
            "Join our hydro-mechanical, chemical distillation, environmental safety, and corporate finance teams driving India’s clean energy transition.",
          href: "/contact/careers",
          imageUrl:
            "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
          imageAlt:
            "Careers and Engineering Opportunities at Pingaksh Renewables",
          ctaLabel: "Explore Careers",
        },
      ],
    },
  },
  media: {
    slug: "media",
    seoTitle:
      "Media & Insights | Press Releases, Gallery & Awards | Pingaksh Group",
    seoDescription:
      "Explore official corporate announcements, press releases, project operations gallery, and ISO/safety citations from Pingaksh Renewables (UBHP & PBPL).",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Media & Insights", href: "/media" },
    ],
    hero: {
      eyebrow: "Corporate Communications & Newsroom",
      title: "Media & Insights",
      subtitle:
        "Official press dispatches, commissioning milestones, high-resolution site documentation, and institutional recognition across our clean-energy portfolio.",
      images: [
        {
          url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=85",
          alt: "Pingaksh Group High-Voltage Grid Synchronization and Press Briefing",
          caption: "Grid Synchronization & Strategic Infrastructure Dispatches",
        },
        {
          url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=85",
          alt: "Pingaksh Beverages 250 KLPD Bio-Refinery Operations Media Coverage",
          caption: "E20 Bio-Refinery & Circular Economy Milestones",
        },
        {
          url: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=2000&q=85",
          alt: "UBHP Sarju Hydroelectric Cascade Operations in Uttarakhand",
          caption: "Himalayan Hydro Operations & Catchment Stewardship",
        },
      ],
    },
    introSection: {
      mottoTag: "“Verified Institutional Reporting”",
      headline:
        "Documenting our engineering milestones, regulatory filings, and operational progress across India.",
      paragraphs: [
        "The Pingaksh Group Media & Insights desk serves as the central archive for journalists, industry analysts, institutional lenders, and public stakeholders tracking our run-of-the-river hydroelectric cascades and bio-ethanol operations.",
        "From long-term Power Purchase Agreements (PPAs) and OMC ethanol supply allocations to high-resolution plant photography and ISO accreditations, every publication reflects our commitment to transparent corporate disclosure.",
      ],
      stats: [
        { value: "25+", unit: "Dispatches", label: "Official Press Releases" },
        { value: "4", unit: "Entities", label: "Covered Group SPVs" },
        {
          value: "ISO",
          unit: "9001 & 14001",
          label: "Quality & Eco Citations",
        },
        {
          value: "HD",
          unit: "Visual Archive",
          label: "Site & Turbine Photography",
        },
      ],
    },
    philosophyBanner: {
      badge: "Media Relations & Disclosure Policy",
      title: "Timely, Accurate & Verifiable Corporate Communications",
      paragraphs: [
        "All material operational developments—including commercial operation dates (COD), capacity expansions, board reconstitutions, and strategic off-take contracts—are published simultaneously for public and institutional access.",
        "Members of the press and research analysts may contact our Corporate Communications desk for official media kits, executive biographies, and high-resolution plant assets.",
      ],
      backgroundImage:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85",
      backgroundAlt: "Pingaksh Group Corporate Communications and Media Center",
      highlightMetric: {
        value: "media@pingakshrenewables.com",
        label: "Official Press & Analyst Desk",
      },
    },
    subSectionsGrid: {
      eyebrow: "Explore Media & Insights",
      sectionTitle: "Newsroom, Visual Archive & Accreditations",
      sectionSubtitle:
        "Navigate to our searchable press release archive, site progress masonry gallery, or statutory certifications.",
      cards: [
        {
          id: "press-releases",
          badge: "01 · Official Newsroom",
          title: "Press Releases & Announcements",
          description:
            "Searchable archive of official corporate announcements, OMC off-take allocations, hydro grid pacts, and board disclosures.",
          href: "/media/press-releases",
          imageUrl:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Pingaksh Group Press Releases and Corporate Announcements",
          ctaLabel: "Browse Press Archive",
          featuredSpan: true,
        },
        {
          id: "project-gallery",
          badge: "02 · Visual Documentation",
          title: "Project Gallery (Site Progress & Operations)",
          description:
            "High-impact masonry photography showcasing Sarju I–III Francis turbines, 250 KLPD distillation columns, and Pingaksh Farms.",
          href: "/media/project-gallery",
          imageUrl:
            "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Pingaksh Renewables Project Gallery and Plant Photography",
          ctaLabel: "Open Visual Gallery",
        },
        {
          id: "certifications-awards",
          badge: "03 · Quality & Recognition",
          title: "Certifications & Awards",
          description:
            "Inspect our ISO 9001, ISO 14001, OHSAS safety accreditations, Zero-Liquid-Discharge compliance, and industry citations.",
          href: "/media/certifications-awards",
          imageUrl:
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
          imageAlt:
            "Pingaksh Renewables Certifications, ISO Standards and Awards",
          ctaLabel: "View Accreditations",
        },
      ],
    },
  },

  // ============================================================================
  // SUSTAINABILITY & IMPACT OVERVIEW DATA
  // ============================================================================
  sustainability: {
    slug: "sustainability",
    seoTitle: "Sustainability & Ecological Impact | Pingaksh Renewables",
    seoDescription:
      "Explore Pingaksh Group's ESG framework: 100% Zero-Liquid Discharge (ZLD), real-time carbon offset telemetry, Himalayan watershed afforestation, and E20 fuel transition.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Sustainability & Impact", href: "/sustainability" },
    ],
    hero: {
      eyebrow: "Environmental, Social & Governance (ESG)",
      title: "Sustainability & Impact",
      subtitle:
        "Rigorous ecological stewardship integrating Zero-Liquid Discharge bio-refining, Himalayan river conservation, and verified carbon displacement.",
      images: [
        {
          url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2000&q=85",
          alt: "Clean Energy and Ecological Landscape at Pingaksh Renewables",
          caption: "Ecological Equilibrium Across Hydro & Bio-Energy Assets",
        },
        {
          url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85",
          alt: "Himalayan Sarju River Watershed Conservation",
          caption:
            "Himalayan Watershed Flow Conservation · Bageshwar, Uttarakhand",
        },
        {
          url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85",
          alt: "Closed-Loop Resource Recovery and Zero-Waste Bio-Processing",
          caption: "100% ZLD Water Recovery & Secondary Resource Valorization",
        },
      ],
    },
    introSection: {
      mottoTag: "“Ecological Balance by Design”",
      headline:
        "Embedding clean-tech circularity into every unit of baseload electricity generated and every liter of green biofuel distilled.",
      paragraphs: [
        "At Pingaksh Renewables, sustainability is not an afterthought or an offsetting exercise—it dictates our fundamental site planning and mechanical architecture. Our Run-of-the-River hydro generation in District Bageshwar returns 100% of diverted river flow back into the Sarju stream without reservoir submergence.",
        "Similarly, our grain-based bio-refinery operates on an absolute Zero-Liquid Discharge (ZLD) regimen using multi-effect evaporators, condensate polishing units, and zero-waste spent wash conversion into high-protein DDGS animal feed and food-grade liquefied CO₂.",
      ],
      stats: [
        { value: "100%", unit: "ZLD Status", label: "Zero-Liquid Discharge" },
        { value: "0", unit: "Submergence", label: "Himalayan Land Submerged" },
        { value: "600+", unit: "MT / Day", label: "Daily CO₂ Displaced" },
        { value: ">95%", unit: "Recycled", label: "Process Water Circularity" },
      ],
    },
    philosophyBanner: {
      badge: "Catchment & Circularity Mandate",
      title: "Preserving Natural Waterways While Supplying India's Clean Grid",
      paragraphs: [
        "By enforcing strict environmental flow (e-Flow) regimes at our Sarju diversion weirs and coupling bio-ethanol distillation with multi-stage waste-heat recovery, Pingaksh sets new benchmarks for responsible private-sector infrastructure.",
        "Our green-belt afforestation drives with local Van Panchayats in Uttarakhand protect fragile slope ecology against monsoon erosion, ensuring long-term community water security.",
      ],
      backgroundImage:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1920&q=85",
      backgroundAlt: "Pingaksh Clean Energy Catchment Conservation",
      highlightMetric: {
        value: "Verified CPCB",
        label: "Zero Industrial Effluent Discharge Standard",
      },
    },
    subSectionsGrid: {
      eyebrow: "Pillars of Impact",
      sectionTitle: "Explore Sustainability Portfolios",
      sectionSubtitle:
        "Inspect our live algorithmic emission models, life-cycle carbon comparisons, and closed-loop effluent recycling systems.",
      cards: [
        {
          id: "carbon-dashboard",
          badge: "01 · Real-Time Telemetry",
          title: "Live Carbon Offset Dashboard",
          description:
            "Mathematical emission accounting engine displaying real-time daily, monthly, and cumulative greenhouse gas reduction across all assets.",
          href: "/sustainability/carbon-dashboard",
          imageUrl:
            "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Live Carbon Offset Telemetry Dashboard",
          ctaLabel: "Launch Live Ticker",
          featuredSpan: true,
        },
        {
          id: "hydro-vs-coal",
          badge: "02 · Baseline Modeling",
          title: "Hydro vs. Coal Emission Comparison",
          description:
            "Quantitative thermal grid displacement metrics: evaluating life-cycle gram CO₂ equivalent per kilowatt-hour generated.",
          href: "/sustainability/hydro-vs-coal",
          imageUrl:
            "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Hydro vs Coal Emission Lifecycle Comparison",
          ctaLabel: "Compare Footprint",
        },
        {
          id: "e20-ethanol-impact",
          badge: "03 · Green Mobility",
          title: "E20 Ethanol vs. Pure Petrol Impact",
          description:
            "Comparative vehicular tailpipe analysis: analyzing carbon monoxide, hydrocarbon cuts, and fossil crude import substitution.",
          href: "/sustainability/e20-ethanol-impact",
          imageUrl:
            "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "E20 Ethanol vs Pure Petrol Carbon Comparison",
          ctaLabel: "View Fuel Impact",
        },
        {
          id: "zero-liquid-discharge",
          badge: "04 · Water Conservation",
          title: "Zero-Liquid Discharge & Ecological Balance",
          description:
            "Multi-Effect Evaporator (MEE) technology, CPU water recycling, and upstream Himalayan catchment afforestation around Sarju I–III.",
          href: "/sustainability/zero-liquid-discharge",
          imageUrl:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Zero-Liquid Discharge and Ecological Conservation",
          ctaLabel: "Inspect ZLD System",
        },
      ],
    },
  },

  // ============================================================================
  // INVESTOR RELATIONS & GOVERNANCE OVERVIEW DATA
  // ============================================================================
  investors: {
    slug: "investors",
    seoTitle: "Investor Relations & Corporate Governance | Pingaksh Renewables",
    seoDescription:
      "Access Pingaksh Group investor disclosures: financial presentations, audited annual returns, board committee charters, and statutory ROC filings.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Investor Relations", href: "/investors" },
    ],
    hero: {
      eyebrow: "Shareholder Value & Capital Governance",
      title: "Investor Relations",
      subtitle:
        "Disciplined financial stewardship, long-term PPA off-take visibility, and institutional governance aligned with listed-market standards.",
      images: [
        {
          url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85",
          alt: "Pingaksh Group Corporate Governance and Capital Management",
          caption: "Institutional Capital Allocation & Financial Prudence",
        },
        {
          url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=85",
          alt: "Financial Review and Board Committee Disclosures",
          caption: "Audited Financial Presentations & Statutory Filings",
        },
        {
          url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85",
          alt: "Boardroom Corporate Governance at Pingaksh Group",
          caption:
            "Board Independence, Risk Oversight & Statutory Transparency",
        },
      ],
    },
    introSection: {
      mottoTag: "“Capital Discipline & Integrity”",
      headline:
        "Delivering robust annuity cashflows through high-availability clean power assets and diversified circular bio-refining.",
      paragraphs: [
        "Pingaksh Group structures each operating platform under clear corporate governance principles. Our hydroelectric capacity benefits from 35-year concession frameworks and long-term state utility Power Purchase Agreements (PPAs) that insulate earnings from fuel volatility.",
        "Complementing our baseline generation, our green biofuels arm secures continuous multi-quarter off-take with public sector Oil Marketing Companies, providing diversified cash generation overseen by independent board committees and certified audit controls.",
      ],
      stats: [
        { value: "35 Yrs", unit: "Concession", label: "Hydro PPA Frameworks" },
        {
          value: "AAA / A+",
          unit: "Rating Desk",
          label: "Debt Service Profile",
        },
        { value: "6 + 2", unit: "Directors", label: "Parent & SPV Governance" },
        {
          value: "SEBI / MCA",
          unit: "Aligned",
          label: "Listed-Grade Disclosures",
        },
      ],
    },
    philosophyBanner: {
      badge: "Governance & Fiduciary Charter",
      title: "Upholding Transparent Disclosure and Fiduciary Responsibility",
      paragraphs: [
        "We are committed to maintaining open, audited communication channels with our lenders, rating agencies, institutional partners, and future capital-market participants.",
        "Our Audit Committee, Stakeholder Relationship Committee, and Nomination & Remuneration Committee operate with defined oversight charters to protect enterprise value.",
      ],
      backgroundImage:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=85",
      backgroundAlt: "Pingaksh Group Fiduciary Corporate Governance",
      highlightMetric: {
        value: "Unqualified",
        label: "Clean Statutory Audit Opinion Across Group SPVs",
      },
    },
    subSectionsGrid: {
      eyebrow: "Investor Portals",
      sectionTitle: "Disclosures & Financial Portfolios",
      sectionSubtitle:
        "Select a section below to review filterable annual returns, monitor benchmark tracking, or inspect board committee compositions.",
      cards: [
        {
          id: "financial-reports",
          badge: "01 · Audited Accounts",
          title: "Financial Reports & Annual Returns",
          description:
            "Filterable document repository: audited consolidated balance sheets, quarterly investor presentations, and Form MGT-7 filings.",
          href: "/investors/financial-reports",
          imageUrl:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Pingaksh Group Financial Reports and Balance Sheets",
          ctaLabel: "View Document Archive",
          featuredSpan: true,
        },
        // {
        //   id: "corporate-governance",
        //   badge: "02 · Board Charters",
        //   title: "Corporate Governance & Committees",
        //   description:
        //     "Charter mandates, terms of reference, and membership rosters for Audit, Nomination & Remuneration, and CSR Committees.",
        //   href: "/investors/corporate-governance",
        //   imageUrl:
        //     "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        //   imageAlt: "Corporate Governance Charters and Board Oversight",
        //   ctaLabel: "Inspect Governance",
        // },
        {
          id: "statutory-filings",
          badge: "02 · ROC & Compliance",
          title: "Disclaimers & Statutory Filings",
          description:
            "Statutory disclosures under the Companies Act, 2013, environmental compliance certificates, and credit rating rationales.",
          href: "/investors/statutory-filings",
          imageUrl:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
          imageAlt: "Statutory ROC Filings and Disclaimers",
          ctaLabel: "Browse Filings",
        },
        // {
        //   id: "stock-tracker",
        //   badge: "04 · Market Benchmarking",
        //   title: "Stock Price & Market Tracker",
        //   description:
        //     "Benchmark sectoral metrics, simulated NSE equity telemetry, trading volume trends, and valuation indicators.",
        //   href: "/investors/stock-tracker",
        //   imageUrl:
        //     "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
        //   imageAlt: "Pingaksh Market Benchmarks and Share Performance Tracker",
        //   ctaLabel: "Track Market Data",
        // },
      ],
    },
  },
};

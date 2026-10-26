export type MediaType = "image" | "video";

export type GalleryCategory =
  | "All"
  | "Hydro Power (UBHP)"
  | "Bio-Refinery (PBPL)"
  | "Circular Economy & ZLD"
  | "Agro & CSR";

export interface GalleryMediaItem {
  id: string;
  type: MediaType;
  category: Exclude<GalleryCategory, "All">;
  title: string;
  caption: string;
  location: string;
  dateLabel: string;
  isoDate: string;
  assetCode: string;
  thumbnailUrl: string;
  mediaUrl: string; // Full-res image URL or MP4 video stream URL
  videoDuration?: string;
  altText: string;
  technicalSpecs?: string;
  featuredSpan?: "wide" | "tall" | "standard"; // Controls masonry grid span
}

export interface ProjectGalleryPageData {
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
  spotlightReel: {
    badge: string;
    title: string;
    description: string;
    videoUrl: string;
    posterUrl: string;
    duration: string;
    location: string;
    metrics: { label: string; value: string }[];
  };
  categories: GalleryCategory[];
  mediaTypes: { id: "all" | "image" | "video"; label: string }[];
  items: GalleryMediaItem[];
}

export const PROJECT_GALLERY_DATA: ProjectGalleryPageData = {
  seo: {
    title:
      "Project Gallery | Plant Operations & Video Archive | Pingaksh Renewables",
    description:
      "Explore high-resolution site photography and operational videos of Pingaksh Group’s Sarju I, II, III Hydroelectric Powerhouses, 250 KLPD Ethanol Distillery, and ZLD systems.",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Media & Insights", href: "/media" },
    { label: "Project Gallery", href: "/media/project-gallery" },
  ],
  hero: {
    title: "Project & Operations Gallery",
    subtitle: "Visual Archive of Our Clean-Energy Infrastructure",
    leadText:
      "Inspect high-definition photography and operational footage across our Himalayan run-of-the-river hydroelectric cascades, automated grain distillation columns, and zero-liquid-discharge recovery units.",
    backgroundImage:
      "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=2000&q=85",
    backgroundAlt:
      "Pingaksh Group Sarju Hydroelectric Dam and Turbine Operations Visual Archive",
  },
  spotlightReel: {
    badge: "Featured Operations Film",
    title: "Inside Pingaksh: From Himalayan Currents to E20 Bio-Refining",
    description:
      "Experience how Uttar Bharat Hydro Power (Sarju I, II & III) and Pingaksh Beverages (250 KLPD Bio-Ethanol) operate 24×7 with automated SCADA telemetry and 100% closed-loop environmental compliance.",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-large-dam-and-reservoir-41566-large.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=1800&q=85",
    duration: "02:45 MIN",
    location: "Bageshwar (UK) & Northern Industrial Corridor",
    metrics: [
      { label: "Hydro Cascade", value: "30.60 MW" },
      { label: "Bio-Ethanol Plant", value: "250 KLPD" },
      { label: "Effluent Standard", value: "100% ZLD" },
    ],
  },
  categories: [
    "All",
    "Hydro Power (UBHP)",
    "Bio-Refinery (PBPL)",
    "Circular Economy & ZLD",
    "Agro & CSR",
  ],
  mediaTypes: [
    { id: "all", label: "All Media" },
    { id: "image", label: "Photographs" },
    { id: "video", label: "Video Footage" },
  ],
  items: [
    {
      id: "gal-sarju-ii-spillway-video",
      type: "video",
      category: "Hydro Power (UBHP)",
      title: "Sarju II Weir & High-Head Desilting Basin in Monsoon Flow",
      caption:
        "Aerial operational footage of the Sarju II diversion weir and intake gates managing peak Himalayan river discharge in Tehsil Kapkot, Bageshwar.",
      location: "Kapkot, District Bageshwar (UK)",
      dateLabel: "August 2026",
      isoDate: "2026-08-18",
      assetCode: "VID-UBHP-101",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=1200&q=85",
      mediaUrl:
        "https://assets.mixkit.co/videos/preview/mixkit-water-flowing-down-a-river-dam-41565-large.mp4",
      videoDuration: "01:18",
      altText: "Sarju II Hydroelectric Weir and Spillway Operational Video",
      technicalSpecs: "Rated Head: 155.0 m | Capacity: 12.60 MW (3 × 4,200 kW)",
      featuredSpan: "wide",
    },
    {
      id: "gal-francis-turbine-hall",
      type: "image",
      category: "Hydro Power (UBHP)",
      title: "Horizontal Axis Francis Turbine Hall — Sarju III Powerhouse",
      caption:
        "Inside the machine hall housing three 3,600 kW Horizontal Francis generating units synchronized with the UPCL grid since July 2014.",
      location: "Sarju III Powerhouse, Bageshwar",
      dateLabel: "July 2026",
      isoDate: "2026-07-11",
      assetCode: "IMG-UBHP-102",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=85",
      mediaUrl:
        "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=2000&q=90",
      altText:
        "Horizontal Francis Turbine Generator Hall at Sarju III Hydro Plant",
      technicalSpecs:
        "Net Head: 51.85 m | Discharge: 6.73 cumecs | COD: 11.07.2014",
      featuredSpan: "standard",
    },
    {
      id: "gal-pbpl-distillation-columns",
      type: "image",
      category: "Bio-Refinery (PBPL)",
      title: "Multi-Pressure Grain Distillation & Molecular Sieve Dehydration",
      caption:
        "Automated stainless-steel distillation columns producing fuel-grade anhydrous ethanol (99.8% purity) for national E20 petrol blending.",
      location: "PBPL Bio-Refinery Complex",
      dateLabel: "September 2026",
      isoDate: "2026-09-22",
      assetCode: "IMG-PBPL-201",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
      mediaUrl:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=90",
      altText: "Pingaksh Beverages 250 KLPD Grain Ethanol Distillation Columns",
      technicalSpecs: "Capacity: 250 KLPD | Grade: BIS IS 15464 Anhydrous",
      featuredSpan: "standard",
    },
    {
      id: "gal-scada-telemetry-video",
      type: "video",
      category: "Bio-Refinery (PBPL)",
      title: "DCS / SCADA Automated Process Control & OMC Dispatch Terminal",
      caption:
        "Real-time distributed control systems monitoring fermentation kinetics, steam economy, and automated tanker-lorry ethanol loading bays.",
      location: "PBPL Central Control Room",
      dateLabel: "October 2026",
      isoDate: "2026-10-04",
      assetCode: "VID-PBPL-204",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=85",
      mediaUrl:
        "https://assets.mixkit.co/videos/preview/mixkit-industrial-plant-pipes-and-valves-42645-large.mp4",
      videoDuration: "00:54",
      altText: "Automated SCADA Control Room and Ethanol Dispatch Footage",
      technicalSpecs: "PLC/DCS Architecture | 24×7 Automated Telemetry",
      featuredSpan: "wide",
    },
    {
      id: "gal-switchyard-evacuation",
      type: "image",
      category: "Hydro Power (UBHP)",
      title: "33/132 kV Outdoor Switchyard & Transmission Line Bay",
      caption:
        "High-voltage step-up transformers and circuit breakers evacuating clean peaking power from the Sarju cascade to the state grid.",
      location: "Bageshwar Switchyard, UK",
      dateLabel: "June 2026",
      isoDate: "2026-06-14",
      assetCode: "IMG-UBHP-108",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=85",
      mediaUrl:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=90",
      altText: "High-Voltage Switchyard Evacuating Hydro Power from UBHP",
      technicalSpecs:
        "Grid Availability: >99.2% | Protection: Numerical Relays",
      featuredSpan: "standard",
    },
    {
      id: "gal-ddgs-rotary-dryer",
      type: "image",
      category: "Circular Economy & ZLD",
      title: "High-Protein DDGS Decanter & Rotary Tube Bundle Dryer",
      caption:
        "Valorizing spent grain mash into nutrient-rich Distillers Dried Grains with Solubles (DDGS) for poultry and cattle feed markets.",
      location: "PBPL Co-Product Recovery Unit",
      dateLabel: "May 2026",
      isoDate: "2026-05-29",
      assetCode: "IMG-CIRC-301",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
      mediaUrl:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=90",
      altText: "High-Protein DDGS Recovery and Circular Economy Operations",
      technicalSpecs: "Crude Protein: 28%–32% | Moisture: <10% w/w",
      featuredSpan: "standard",
    },
    {
      id: "gal-zld-evaporator-plant",
      type: "image",
      category: "Circular Economy & ZLD",
      title: "Multi-Effect Evaporator (MEE) & CPU Zero-Liquid Discharge",
      caption:
        "Closed-loop condensate polishing unit (CPU) recycling over 95% of process water back into cooling towers and fermentation.",
      location: "PBPL Environmental Block",
      dateLabel: "April 2026",
      isoDate: "2026-04-20",
      assetCode: "IMG-CIRC-305",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=85",
      mediaUrl:
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2000&q=90",
      altText:
        "Zero Liquid Discharge Multi-Effect Evaporator Plant at Pingaksh",
      technicalSpecs: "Compliance: 100% CPCB ZLD | CO₂ Liquefaction Integrated",
      featuredSpan: "standard",
    },
    {
      id: "gal-napier-farms-video",
      type: "video",
      category: "Agro & CSR",
      title: "Pingaksh Farms: Napier Grass Cultivation & Catchment Green-Belt",
      caption:
        "Sustainable biomass cultivation and Himalayan slope afforestation initiatives supporting rural livelihoods and watershed health.",
      location: "Uttarakhand Agrarian & Catchment Belt",
      dateLabel: "March 2026",
      isoDate: "2026-03-15",
      assetCode: "VID-AGRO-401",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=85",
      mediaUrl:
        "https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-green-agricultural-fields-41443-large.mp4",
      videoDuration: "01:05",
      altText: "Pingaksh Farms Napier Grass Biomass Cultivation Drone Video",
      technicalSpecs: "Feedstock: High-Yield Napier & Local Non-Food Grains",
      featuredSpan: "wide",
    },
    {
      id: "gal-sarju-i-tunneling",
      type: "image",
      category: "Hydro Power (UBHP)",
      title: "Sarju I (7.50 MW) Upstream Civil Headrace & Penstock Alignment",
      caption:
        "High-gradient civil engineering works for the 160-meter design head Sarju I upstream run-of-the-river scheme.",
      location: "Upper Sarju Basin, Bageshwar",
      dateLabel: "February 2026",
      isoDate: "2026-02-10",
      assetCode: "IMG-UBHP-112",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85",
      mediaUrl:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=90",
      altText: "Sarju I Upstream Hydroelectric Civil Engineering and Penstock",
      technicalSpecs: "Design Head: 160.0 m | Units: 2 × 3,750 kW Francis",
      featuredSpan: "standard",
    },
  ],
};

"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Image as ImageIcon,
  Film,
  Search,
  X,
  MapPin,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Cpu,
  Download,
  ArrowUpRight,
} from "lucide-react";
import type {
  ProjectGalleryPageData,
  GalleryCategory,
  GalleryMediaItem,
} from "@/data/projectGalleryData";

interface ProjectGalleryViewProps {
  data: ProjectGalleryPageData;
}

export default function ProjectGalleryView({ data }: ProjectGalleryViewProps) {
  const { breadcrumbs, hero, spotlightReel, categories, mediaTypes, items } =
    data;

  // =================================================================
  // 1. FILTER & SEARCH STATE
  // =================================================================
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategory>("All");
  const [selectedType, setSelectedType] = useState<"all" | "image" | "video">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  // =================================================================
  // 2. LIGHTBOX MODAL STATE (Supports Both Images & HTML5 Video)
  // =================================================================
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(
    null,
  );
  const [spotlightModalOpen, setSpotlightModalOpen] = useState<boolean>(false);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCat =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesType = selectedType === "all" || item.type === selectedType;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.caption.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.assetCode.toLowerCase().includes(q) ||
        (item.technicalSpecs && item.technicalSpecs.toLowerCase().includes(q));

      return matchesCat && matchesType && matchesQuery;
    });
  }, [items, selectedCategory, selectedType, searchQuery]);

  // Lightbox Navigation Handlers
  const closeLightbox = useCallback(() => {
    setActiveLightboxIndex(null);
    setSpotlightModalOpen(false);
  }, []);

  const showNextItem = useCallback(() => {
    if (activeLightboxIndex === null || filteredItems.length === 0) return;
    setActiveLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredItems.length : null,
    );
  }, [activeLightboxIndex, filteredItems.length]);

  const showPrevItem = useCallback(() => {
    if (activeLightboxIndex === null || filteredItems.length === 0) return;
    setActiveLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredItems.length) % filteredItems.length
        : null,
    );
  }, [activeLightboxIndex, filteredItems.length]);

  // Keyboard navigation for Lightbox (Esc, Left, Right)
  useEffect(() => {
    if (activeLightboxIndex === null && !spotlightModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNextItem();
      if (e.key === "ArrowLeft") showPrevItem();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeLightboxIndex,
    spotlightModalOpen,
    closeLightbox,
    showNextItem,
    showPrevItem,
  ]);

  const activeLightboxItem: GalleryMediaItem | null =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  // On-Page SEO JSON-LD: BreadcrumbList + ImageGallery & VideoObject Schema
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: crumb.label,
          item: `https://www.pingakshrenewables.com${crumb.href}`,
        })),
      },
      {
        "@type": "ImageGallery",
        name: data.seo.title,
        description: data.seo.description,
        url: "https://www.pingakshrenewables.com/media/project-gallery",
        associatedMedia: items.map((media) => ({
          "@type": media.type === "video" ? "VideoObject" : "ImageObject",
          name: media.title,
          description: media.caption,
          contentUrl: media.mediaUrl,
          thumbnailUrl: media.thumbnailUrl,
          uploadDate: media.isoDate,
          contentLocation: {
            "@type": "Place",
            name: media.location,
          },
        })),
      },
    ],
  };

  return (
    <article className="w-full bg-sand-50 text-pingaksh-navy selection:bg-pingaksh-terracotta selection:text-white">
      {/* Inject JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* =====================================================================
          1. ARCHITECTURAL HERO HEADER (With Safe Top Clearance for Fixed Navbar)
      ===================================================================== */}
      <header className="relative w-full min-h-[54vh] bg-pingaksh-navy text-white flex flex-col justify-end overflow-hidden pt-36 pb-16 sm:pb-20">
        <figure className="absolute inset-0 m-0">
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
            src={hero.backgroundImage}
            alt={hero.backgroundAlt}
            width={2000}
            height={1000}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-950 via-pingaksh-navy/80 to-navy-950/65"
          />
        </figure>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center flex-wrap gap-2 text-xs text-sand-200/80">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <li key={crumb.href} className="flex items-center gap-2">
                    {isLast ? (
                      <span
                        aria-current="page"
                        className="text-pingaksh-sand font-semibold"
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <>
                        <Link
                          href={crumb.href}
                          title={`Navigate to ${crumb.label}`}
                          className="hover:text-white transition-colors"
                        >
                          {crumb.label}
                        </Link>
                        <ChevronRight
                          className="w-3.5 h-3.5 opacity-50"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-t border-white/15 pt-8">
            <div className="lg:col-span-7">
              <h1 className="font-logo text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-wide">
                {hero.title}
              </h1>
              <p className="font-logo text-lg sm:text-2xl text-pingaksh-sand mt-3">
                {hero.subtitle}
              </p>
            </div>
            <div className="lg:col-span-5">
              <p className="font-body text-sm sm:text-base text-sand-100/85 leading-relaxed">
                {hero.leadText}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          2. FEATURED OPERATIONS FILM SHOWCASE (Reliance-Style Cinema Banner)
      ===================================================================== */}
      <section
        aria-labelledby="spotlight-film-heading"
        className="pt-14 sm:pt-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10"
      >
        <div className="rounded-3xl bg-pingaksh-navy text-white overflow-hidden shadow-2xl border border-sand-300 grid grid-cols-1 lg:grid-cols-12">
          {/* Left Video Preview Frame (Cols 1-7) */}
          <div
            onClick={() => setSpotlightModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                setSpotlightModalOpen(true);
            }}
            aria-label={`Play Featured Operations Film: ${spotlightReel.title}`}
            className="lg:col-span-7 relative min-h-[320px] sm:min-h-[440px] bg-navy-950 overflow-hidden group cursor-pointer"
          >
            <video
              src={spotlightReel.videoUrl}
              poster={spotlightReel.posterUrl}
              muted
              loop
              playsInline
              autoPlay
              className="w-full h-full object-cover object-center opacity-75 group-hover:scale-105 transition-transform duration-700"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent"
            />

            {/* Center Pulsing Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-pingaksh-terracotta/95 group-hover:bg-pingaksh-sand text-white group-hover:text-pingaksh-navy flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 ring-8 ring-white/15">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
            </div>

            <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-xs text-sand-100">
              <span className="inline-flex items-center gap-1.5 font-semibold bg-navy-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                <Film className="w-3.5 h-3.5 text-pingaksh-sand" />
                Click to Watch Full Operations Reel ({spotlightReel.duration})
              </span>
              <span className="hidden sm:inline font-mono text-[11px] text-pingaksh-sand">
                HD 1080P · TELEMETRY
              </span>
            </div>
          </div>

          {/* Right Film Details & Metrics (Cols 8-12) */}
          <div className="lg:col-span-5 p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-pingaksh-terracotta text-white text-[11px] font-bold uppercase tracking-wider">
                {spotlightReel.badge}
              </span>

              <h2
                id="spotlight-film-heading"
                className="font-logo text-2xl sm:text-3xl lg:text-4xl text-white leading-snug"
              >
                {spotlightReel.title}
              </h2>

              <p className="text-xs sm:text-sm text-sand-100/85 leading-relaxed">
                {spotlightReel.description}
              </p>
            </div>

            {/* 3-Metric Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/15">
              {spotlightReel.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <span className="block text-[10px] uppercase tracking-wider text-sand-300">
                    {m.label}
                  </span>
                  <span className="font-logo text-base sm:text-lg font-bold text-pingaksh-sand mt-0.5 block">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSpotlightModalOpen(true)}
              className="w-full py-3.5 px-6 rounded-full bg-pingaksh-sand hover:bg-sand-300 text-pingaksh-navy font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Theatre Mode ({spotlightReel.duration})</span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. STICKY FILTER & SEARCH BAR (Category + Media Type + Keyword)
      ===================================================================== */}
      <section
        aria-label="Filter Project Gallery"
        className="sticky top-0 z-20 bg-sand-50/95 backdrop-blur-md border-b border-sand-300 mt-14 sm:mt-20 py-4"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div
            role="tablist"
            aria-label="Filter Gallery by Business Vertical"
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1"
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActiveLightboxIndex(null);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-pingaksh-navy text-pingaksh-sand shadow-sm"
                      : "bg-white hover:bg-sand-200 text-navy-700 border border-sand-300"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Right: Media Type Toggle (All / Photos / Videos) + Keyword Input */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            {/* Media Type Segmented Control */}
            <div
              role="group"
              aria-label="Filter by Media Type"
              className="inline-flex rounded-xl bg-sand-200/80 p-1 border border-sand-300"
            >
              {mediaTypes.map((t) => {
                const active = selectedType === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setSelectedType(t.id);
                      setActiveLightboxIndex(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      active
                        ? "bg-pingaksh-terracotta text-white shadow-2xs"
                        : "text-navy-700 hover:text-pingaksh-navy"
                    }`}
                  >
                    {t.id === "image" && <ImageIcon className="w-3.5 h-3.5" />}
                    {t.id === "video" && <Film className="w-3.5 h-3.5" />}
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Keyword Search Box */}
            <div className="relative flex-1 sm:w-64">
              <Search
                className="w-3.5 h-3.5 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveLightboxIndex(null);
                }}
                placeholder="Search turbine, KLPD, ZLD..."
                aria-label="Search gallery items"
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-sand-300 text-xs text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-navy-400 hover:text-pingaksh-navy cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. HIGH-IMPACT MASONRY PHOTOGRAPHY & VIDEO GRID
      ===================================================================== */}
      <section
        aria-label="Plant Operations Visual Grid"
        className="py-14 sm:py-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10"
      >
        {filteredItems.length === 0 ? (
          <div className="rounded-3xl bg-white border border-sand-300 p-12 text-center max-w-lg mx-auto space-y-4">
            <ImageIcon className="w-10 h-10 text-pingaksh-terracotta mx-auto opacity-80" />
            <h3 className="font-logo text-2xl text-pingaksh-navy">
              No Matching Visual Assets Found
            </h3>
            <p className="text-xs sm:text-sm text-navy-600">
              Try clearing your search keyword or switching to &ldquo;All&rdquo;
              categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedType("all");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-full bg-pingaksh-navy text-pingaksh-sand text-xs font-semibold cursor-pointer"
            >
              Reset Gallery Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[360px]">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => {
                // Dynamic Masonry Column Span on Desktop
                const spanClass =
                  item.featuredSpan === "wide"
                    ? "lg:col-span-8"
                    : "lg:col-span-4";

                return (
                  <motion.figure
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.35, delay: idx * 0.03 }}
                    onClick={() => setActiveLightboxIndex(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        setActiveLightboxIndex(idx);
                    }}
                    aria-label={`Open ${item.type}: ${item.title}`}
                    className={`${spanClass} group relative m-0 rounded-3xl overflow-hidden bg-pingaksh-navy border border-sand-300 shadow-md hover:shadow-2xl cursor-pointer flex flex-col justify-between`}
                  >
                    {/* Media Layer: Image or Muted Hover-Play Video */}
                    {item.type === "video" ? (
                      <video
                        src={item.mediaUrl}
                        poster={item.thumbnailUrl}
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-85"
                      />
                    ) : (
                      <img
                        src={item.thumbnailUrl}
                        alt={item.altText}
                        width={1000}
                        height={700}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-90"
                      />
                    )}

                    {/* Multi-Stop Corporate Navy Gradient Overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/15 group-hover:from-pingaksh-navy/95 transition-colors duration-300"
                    />

                    {/* Top Row: Category Badge + Media Type Indicator */}
                    <div className="relative z-10 p-5 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-navy-950/80 backdrop-blur-md border border-white/15 text-pingaksh-sand text-[10.5px] font-bold uppercase tracking-wider">
                        {item.category}
                      </span>

                      <div className="flex items-center gap-2">
                        {item.type === "video" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pingaksh-terracotta text-white text-[11px] font-bold shadow-md">
                            <Play className="w-3 h-3 fill-current" />
                            <span>{item.videoDuration}</span>
                          </span>
                        ) : (
                          <span className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-pingaksh-sand text-white group-hover:text-pingaksh-navy backdrop-blur-md flex items-center justify-center transition-colors">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Center Play Icon for Videos */}
                    {item.type === "video" && (
                      <div className="relative z-10 my-auto flex items-center justify-center pointer-events-none">
                        <div className="w-14 h-14 rounded-full bg-white/20 group-hover:bg-pingaksh-terracotta backdrop-blur-md text-white flex items-center justify-center border border-white/30 transition-all duration-300 group-hover:scale-110">
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Bottom Caption & Technical Telemetry Strip */}
                    <figcaption className="relative z-10 p-6 space-y-2">
                      <div className="flex items-center gap-3 text-[11px] text-sand-200/85 font-medium">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-pingaksh-sand" />
                          {item.location}
                        </span>
                        <span>·</span>
                        <span className="font-mono text-[10px] text-pingaksh-sand">
                          {item.assetCode}
                        </span>
                      </div>

                      <h3 className="font-logo text-xl sm:text-2xl text-white group-hover:text-pingaksh-sand transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-sand-100/80 line-clamp-2 leading-relaxed">
                        {item.caption}
                      </p>

                      {item.technicalSpecs && (
                        <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono text-pingaksh-sand">
                          <Cpu className="w-3.5 h-3.5 text-pingaksh-terracotta shrink-0" />
                          <span className="truncate">
                            {item.technicalSpecs}
                          </span>
                        </div>
                      )}
                    </figcaption>
                  </motion.figure>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* =====================================================================
          5. FULL-SCREEN CINEMA LIGHTBOX MODAL (Images & Video Player)
      ===================================================================== */}
      <AnimatePresence>
        {(activeLightboxItem || spotlightModalOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Media Lightbox Viewer"
            className="fixed top-0 left-0 w-screen h-dvh bg-navy-950/95 backdrop-blur-lg z-50 flex flex-col justify-between p-4 sm:p-8 overflow-y-auto"
          >
            {/* Top Modal Bar */}
            <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between gap-4 border-b border-white/10 pb-4 shrink-0">
              <div className="flex items-center gap-3 text-xs text-sand-200">
                <span className="px-3 py-1 rounded-full bg-pingaksh-terracotta text-white font-bold uppercase tracking-wider">
                  {spotlightModalOpen
                    ? spotlightReel.badge
                    : activeLightboxItem?.category}
                </span>
                {activeLightboxItem && (
                  <span className="font-mono text-pingaksh-sand">
                    {activeLightboxItem.assetCode} ·{" "}
                    {(activeLightboxIndex ?? 0) + 1} of {filteredItems.length}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close Media Viewer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-pingaksh-terracotta text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Center Media Stage */}
            <div className="max-w-6xl w-full mx-auto my-auto py-6 relative flex items-center justify-center">
              {/* Prev Button (Only for Grid Items) */}
              {!spotlightModalOpen && filteredItems.length > 1 && (
                <button
                  type="button"
                  onClick={showPrevItem}
                  aria-label="Previous Media Item"
                  className="hidden sm:flex absolute -left-14 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-pingaksh-sand text-white hover:text-pingaksh-navy items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Active Image or Video Player */}
              <div className="w-full rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl">
                {spotlightModalOpen ? (
                  <video
                    src={spotlightReel.videoUrl}
                    poster={spotlightReel.posterUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full max-h-[70vh] object-contain mx-auto"
                  />
                ) : activeLightboxItem?.type === "video" ? (
                  <video
                    key={activeLightboxItem.mediaUrl}
                    src={activeLightboxItem.mediaUrl}
                    poster={activeLightboxItem.thumbnailUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full max-h-[68vh] object-contain mx-auto"
                  />
                ) : (
                  activeLightboxItem && (
                    <img
                      key={activeLightboxItem.mediaUrl}
                      src={activeLightboxItem.mediaUrl}
                      alt={activeLightboxItem.altText}
                      className="w-full max-h-[68vh] object-contain mx-auto"
                    />
                  )
                )}
              </div>

              {/* Next Button (Only for Grid Items) */}
              {!spotlightModalOpen && filteredItems.length > 1 && (
                <button
                  type="button"
                  onClick={showNextItem}
                  aria-label="Next Media Item"
                  className="hidden sm:flex absolute -right-14 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-pingaksh-sand text-white hover:text-pingaksh-navy items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Caption & Telemetry Metadata Bar */}
            <div className="max-w-6xl w-full mx-auto pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white shrink-0">
              <div className="space-y-1 max-w-3xl">
                <h3 className="font-logo text-xl sm:text-2xl text-pingaksh-sand">
                  {spotlightModalOpen
                    ? spotlightReel.title
                    : activeLightboxItem?.title}
                </h3>
                <p className="text-xs sm:text-sm text-sand-100/85">
                  {spotlightModalOpen
                    ? spotlightReel.description
                    : activeLightboxItem?.caption}
                </p>
              </div>

              {!spotlightModalOpen && activeLightboxItem && (
                <div className="flex items-center gap-3 shrink-0">
                  {activeLightboxItem.technicalSpecs && (
                    <span className="px-3.5 py-2 rounded-xl bg-white/10 text-xs font-mono text-pingaksh-sand">
                      {activeLightboxItem.technicalSpecs}
                    </span>
                  )}
                  <a
                    href={activeLightboxItem.mediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pingaksh-terracotta hover:bg-terracotta-600 text-white text-xs font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Original File</span>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

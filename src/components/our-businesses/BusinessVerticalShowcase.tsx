"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
} from "lucide-react";
import {
  BUSINESS_VERTICALS_DATA,
  type BusinessVerticalData,
} from "@/data/businessVerticalsData";

interface BusinessVerticalShowcaseProps {
  business: BusinessVerticalData;
}

const SECTION_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "operating-assets", label: "Assets & Specifications" },
  { id: "telemetry-graphs", label: "Performance & Telemetry" },
  { id: "media-gallery", label: "Site Media & Video" },
  { id: "division-timeline", label: "Milestones" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function BusinessVerticalShowcase({
  business,
}: BusinessVerticalShowcaseProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(0);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(
    business.timeline.milestones.length - 1,
  );

  const selectedUnit = business.plantUnits[selectedUnitIndex];
  const currentMedia = business.mediaGallery.slides[activeMediaIndex];
  const otherBusinesses = BUSINESS_VERTICALS_DATA.filter(
    (b) => b.slug !== business.slug,
  );

  // Scroll spy for sticky sub-navigation
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY + 220;
      for (const sec of SECTION_LINKS) {
        const el = document.getElementById(sec.id);
        if (el) {
          if (
            offset >= el.offsetTop &&
            offset < el.offsetTop + el.offsetHeight
          ) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <article className="bg-background-warm text-pingaksh-navy">
      {/* =====================================================================
          1. HERO BANNER (Video / Image Background + Key Operational Metrics)
      ===================================================================== */}
      <header className="relative bg-pingaksh-navy text-white pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden border-b border-white/10">
        {/* Background Media */}
        <div className="absolute inset-0 z-0">
          {business.hero.heroVideoUrl ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={business.hero.heroImage}
              className="w-full h-full object-cover opacity-30"
            >
              <source src={business.hero.heroVideoUrl} type="video/mp4" />
            </video>
          ) : (
            <motion.img
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "easeOut" }}
              src={business.hero.heroImage}
              alt={business.hero.heroImageAlt}
              width={2000}
              height={1100}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/30 via-pingaksh-navy/85 to-navy-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/20" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center flex-wrap gap-2 text-xs text-sand-200/75 pb-8 border-b border-white/10"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
            <Link
              href="/our-businesses"
              className="hover:text-white transition-colors"
            >
              Our Businesses
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
            <span
              aria-current="page"
              className="text-pingaksh-sand font-medium"
            >
              {business.name}
            </span>
          </nav>

          {/* Title & Subtitle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-10 lg:pt-14">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="lg:col-span-8"
            >
              <span className="text-xs font-medium text-pingaksh-sand tracking-wide">
                {business.legalEntity}
              </span>
              <h1 className="font-logo text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.08] mt-2">
                {business.hero.title}
              </h1>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.1}
              className="lg:col-span-4 lg:border-l lg:border-white/15 lg:pl-8"
            >
              <p className="text-sm sm:text-base text-sand-100/90 leading-relaxed">
                {business.hero.subtitle}
              </p>
            </motion.div>
          </div>

          {/* 4-Column Operational KPI Strip */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.2}
            className="grid grid-cols-2 lg:grid-cols-4 border border-white/15 bg-navy-950/60 backdrop-blur-xs divide-y lg:divide-y-0 divide-x divide-white/15 mt-14"
          >
            {business.hero.keyMetrics.map((m, idx) => (
              <div key={idx} className="p-5 sm:p-6">
                <span className="block text-xs text-sand-300">{m.label}</span>
                <span className="block font-logo text-3xl sm:text-4xl text-white mt-2">
                  {m.value}
                </span>
                <span className="block text-xs text-pingaksh-sand mt-1">
                  {m.unit}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* =====================================================================
          2. STICKY SUB-NAVIGATION BAR (Synced with Smart Auto-Hide Navbar)
      ===================================================================== */}
      <div
        style={{ top: "var(--navbar-offset, 0px)" }}
        className="sticky z-40 bg-navy-950 text-white border-b border-white/10 transition-[top] duration-300 ease-in-out"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="flex items-center">
            {SECTION_LINKS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={`px-4 sm:px-5 py-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                    isActive
                      ? "border-pingaksh-sand text-pingaksh-sand bg-white/5"
                      : "border-transparent text-sand-200/75 hover:text-white"
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </div>

          <span className="hidden xl:block text-xs text-sand-300 font-medium">
            {business.shortName}
          </span>
        </div>
      </div>

      {/* =====================================================================
          3. EXECUTIVE OVERVIEW & OPERATIONAL PILLARS
      ===================================================================== */}
      <section
        id="overview"
        className="py-16 lg:py-24 border-b border-sand-300 bg-white"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="lg:col-span-7 space-y-6"
            >
              <h2 className="font-logo text-3xl sm:text-4xl text-pingaksh-navy leading-[1.2]">
                {business.overview.headline}
              </h2>
              <p className="text-base text-navy-800 font-medium leading-relaxed">
                {business.overview.leadParagraph}
              </p>
              <p className="text-sm sm:text-base text-navy-600 leading-relaxed">
                {business.overview.bodyParagraph}
              </p>
            </motion.div>

            {/* Right Column: Structured Operational Pillars */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={0.12}
              className="lg:col-span-5 border border-sand-300 bg-sand-50 divide-y divide-sand-300"
            >
              {business.overview.highlights.map((item, idx) => (
                <div key={idx} className="p-6 sm:p-7">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold text-pingaksh-navy">
                      {item.title}
                    </h3>
                    <span className="font-logo text-sm text-pingaksh-terracotta">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-navy-700 mt-2 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. INTERACTIVE PLANT ASSETS & TECHNICAL SPECIFICATIONS MATRIX
      ===================================================================== */}
      <section
        id="operating-assets"
        className="py-16 lg:py-24 border-b border-sand-300 bg-background-warm"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl pb-10">
            <h2 className="font-logo text-3xl sm:text-4xl text-pingaksh-navy">
              {business.assetsHeading}
            </h2>
            <p className="text-sm sm:text-base text-navy-600 mt-2">
              {business.assetsDescription}
            </p>
          </div>

          {/* Unit Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-sand-300 bg-white divide-y md:divide-y-0 md:divide-x divide-sand-300">
            {business.plantUnits.map((unit, idx) => {
              const isSelected = selectedUnitIndex === idx;
              return (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => setSelectedUnitIndex(idx)}
                  className={`p-5 sm:p-6 text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-pingaksh-navy text-white"
                      : "bg-white text-pingaksh-navy hover:bg-sand-100/70"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={
                        isSelected
                          ? "text-pingaksh-sand font-semibold"
                          : "text-pingaksh-terracotta font-semibold"
                      }
                    >
                      Unit 0{idx + 1}
                    </span>
                    <span
                      className={isSelected ? "text-sand-200" : "text-navy-500"}
                    >
                      {unit.capacity}
                    </span>
                  </div>
                  <h3 className="font-logo text-xl mt-2">{unit.name}</h3>
                </button>
              );
            })}
          </div>

          {/* Selected Unit Detail Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedUnit.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 border-x border-b border-sand-300 bg-white"
            >
              {/* Left Unit Image & Summary */}
              <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-sand-300 flex flex-col justify-between">
                <div className="relative aspect-[16/10] bg-navy-950 overflow-hidden">
                  <img
                    src={selectedUnit.image}
                    alt={selectedUnit.imageAlt}
                    width={900}
                    height={560}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-4 left-4 px-3 py-1 bg-pingaksh-navy/90 text-pingaksh-sand text-xs font-medium">
                    {selectedUnit.status}
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-3">
                  <span className="text-xs font-semibold text-pingaksh-terracotta">
                    {selectedUnit.location}
                  </span>
                  <h3 className="font-logo text-2xl text-pingaksh-navy">
                    {selectedUnit.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-navy-700 leading-relaxed">
                    {selectedUnit.summary}
                  </p>
                </div>
              </div>

              {/* Right Engineering Specifications Table */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-sand-300">
                    <h4 className="font-logo text-xl text-pingaksh-navy">
                      Engineering & Process Specifications
                    </h4>
                    <span className="text-xs font-semibold text-navy-500">
                      Audited Datasheet
                    </span>
                  </div>

                  <dl className="divide-y divide-sand-200 mt-2">
                    {selectedUnit.technicalSpecs.map((spec) => (
                      <div
                        key={spec.parameter}
                        className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs sm:text-sm"
                      >
                        <dt className="sm:col-span-5 font-medium text-navy-600">
                          {spec.parameter}
                        </dt>
                        <dd className="sm:col-span-7 font-semibold text-pingaksh-navy">
                          {spec.specification}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-6 pt-4 border-t border-sand-200 flex items-center justify-between text-xs text-navy-500">
                  <span>Entity: {business.legalEntity}</span>
                  <span>ISO 9001 • ISO 14001 Certified</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =====================================================================
          5. PERFORMANCE TELEMETRY & ANIMATED GRAPHS
      ===================================================================== */}
      <section
        id="telemetry-graphs"
        className="py-16 lg:py-24 bg-pingaksh-navy text-white border-b border-white/10"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl pb-12">
            <h2 className="font-logo text-3xl sm:text-4xl text-white">
              {business.telemetry.heading}
            </h2>
            <p className="text-sm sm:text-base text-sand-200/80 mt-2">
              {business.telemetry.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left: Animated Multi-Year Telemetry Bar Graph */}
            <div className="lg:col-span-7 bg-navy-950/70 border border-white/15 p-6 sm:p-8 flex flex-col justify-between">
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-6 border-b border-white/10">
                <h3 className="font-logo text-xl text-white">
                  {business.telemetry.chartTitle}
                </h3>
                <span className="text-xs text-pingaksh-sand">
                  Unit: {business.telemetry.chartUnit}
                </span>
              </div>

              {/* Custom Animated Vertical Bar Graph */}
              <div className="grid grid-cols-5 gap-3 sm:gap-6 items-end h-64 pt-8 pb-4 border-b border-white/15">
                {business.telemetry.series.map((point, idx) => {
                  const heightPercent = Math.min(
                    100,
                    Math.round(
                      (point.value / business.telemetry.maxScale) * 100,
                    ),
                  );
                  return (
                    <div
                      key={point.year}
                      className="h-full flex flex-col justify-end items-center group"
                    >
                      <span className="text-[11px] sm:text-xs font-bold text-pingaksh-sand mb-2">
                        {point.displayValue}
                      </span>

                      <div className="w-full max-w-[56px] h-44 bg-white/5 flex items-end overflow-hidden border border-white/10">
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${heightPercent}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.85,
                            delay: idx * 0.1,
                            ease: "easeOut",
                          }}
                          className="w-full bg-gradient-to-t from-pingaksh-terracotta to-pingaksh-sand"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* X-Axis Labels & Notes */}
              <div className="grid grid-cols-5 gap-3 sm:gap-6 pt-3 text-center">
                {business.telemetry.series.map((point) => (
                  <div key={point.year}>
                    <span className="block text-xs font-semibold text-white">
                      {point.year}
                    </span>
                    <span className="hidden sm:block text-[10px] text-sand-300/75 mt-0.5 line-clamp-1">
                      {point.benchmarkNote}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Operational Efficiency & Circularity Progress Bars */}
            <div className="lg:col-span-5 bg-navy-950/70 border border-white/15 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="pb-4 border-b border-white/10">
                <h3 className="font-logo text-xl text-white">
                  Efficiency & Compliance Benchmarks
                </h3>
                <p className="text-xs text-sand-300 mt-1">
                  Real-time plant performance against regulatory and design
                  norms
                </p>
              </div>

              <div className="space-y-6 flex-1 flex flex-col justify-center">
                {business.telemetry.efficiencyBenchmarks.map((bench, idx) => (
                  <div key={bench.label} className="space-y-2">
                    <div className="flex items-baseline justify-between text-xs sm:text-sm">
                      <span className="font-medium text-white">
                        {bench.label}
                      </span>
                      <span className="font-logo text-xl text-pingaksh-sand">
                        {bench.valueText}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bench.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.12 }}
                        className="h-full bg-pingaksh-sand"
                      />
                    </div>

                    <p className="text-xs text-sand-200/75">{bench.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. INTERACTIVE SITE MEDIA & VIDEO SLIDER
      ===================================================================== */}
      <section
        id="media-gallery"
        className="py-16 lg:py-24 bg-white border-b border-sand-300"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-10 gap-4">
            <div>
              <h2 className="font-logo text-3xl sm:text-4xl text-pingaksh-navy">
                {business.mediaGallery.heading}
              </h2>
              <p className="text-sm text-navy-600 mt-1">
                {business.mediaGallery.subheading}
              </p>
            </div>

            {/* Slide Prev/Next Controls */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-navy-500 mr-2">
                0{activeMediaIndex + 1} / 0{business.mediaGallery.slides.length}
              </span>
              <button
                type="button"
                aria-label="Previous Media Slide"
                onClick={() =>
                  setActiveMediaIndex((prev) =>
                    prev === 0
                      ? business.mediaGallery.slides.length - 1
                      : prev - 1,
                  )
                }
                className="w-10 h-10 border border-sand-300 hover:border-pingaksh-navy flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next Media Slide"
                onClick={() =>
                  setActiveMediaIndex((prev) =>
                    prev === business.mediaGallery.slides.length - 1
                      ? 0
                      : prev + 1,
                  )
                }
                className="w-10 h-10 border border-sand-300 hover:border-pingaksh-navy flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Active Media Stage */}
          <div className="border border-sand-300 bg-navy-950 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMedia.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12"
              >
                <div className="lg:col-span-8 relative aspect-[16/9] bg-black overflow-hidden">
                  {currentMedia.type === "video" ? (
                    <video
                      src={currentMedia.src}
                      poster={currentMedia.posterUrl}
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={currentMedia.src}
                      alt={currentMedia.title}
                      width={1400}
                      height={780}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Caption Sidebar */}
                <div className="lg:col-span-4 p-6 sm:p-8 lg:p-10 bg-pingaksh-navy text-white flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="inline-block px-3 py-1 bg-white/10 text-pingaksh-sand text-xs font-medium">
                      {currentMedia.locationTag}
                    </span>
                    <h3 className="font-logo text-2xl text-white">
                      {currentMedia.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-sand-200/85 leading-relaxed">
                      {currentMedia.caption}
                    </p>
                  </div>

                  {/* Thumbnail Selector Strip */}
                  <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-2.5">
                    {business.mediaGallery.slides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveMediaIndex(idx)}
                        className={`relative aspect-video overflow-hidden border-2 transition-all cursor-pointer ${
                          activeMediaIndex === idx
                            ? "border-pingaksh-sand opacity-100"
                            : "border-transparent opacity-50 hover:opacity-80"
                        }`}
                      >
                        <img
                          src={slide.posterUrl || slide.src}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                        {slide.type === "video" && (
                          <span className="absolute inset-0 flex items-center justify-center bg-navy-950/50">
                            <Play className="w-3.5 h-3.5 text-white fill-white" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. DIVISION MILESTONE TIMELINE SCRUBBER
      ===================================================================== */}
      <section
        id="division-timeline"
        className="py-16 lg:py-24 bg-sand-100/70 border-b border-sand-300"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-10 gap-4">
            <h2 className="font-logo text-3xl sm:text-4xl text-pingaksh-navy">
              {business.timeline.heading}
            </h2>
            <Link
              href="/who-we-are/heritage-timeline"
              className="text-xs font-semibold text-pingaksh-terracotta hover:underline inline-flex items-center gap-1.5"
            >
              <span>View Full Group Archival Timeline (2008–2026)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Horizontal Year Scrubber */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border border-sand-300 bg-white divide-y sm:divide-y-0 sm:divide-x divide-sand-300">
            {business.timeline.milestones.map((m, idx) => {
              const isCurrent = activeTimelineIndex === idx;
              return (
                <button
                  key={m.year}
                  type="button"
                  onClick={() => setActiveTimelineIndex(idx)}
                  className={`p-5 text-left transition-colors cursor-pointer ${
                    isCurrent
                      ? "bg-pingaksh-navy text-white"
                      : "hover:bg-sand-50 text-pingaksh-navy"
                  }`}
                >
                  <span
                    className={`font-logo text-3xl block ${
                      isCurrent ? "text-pingaksh-sand" : "text-pingaksh-navy"
                    }`}
                  >
                    {m.year}
                  </span>
                  <span
                    className={`text-xs font-medium mt-1 block line-clamp-1 ${
                      isCurrent ? "text-sand-200" : "text-navy-600"
                    }`}
                  >
                    {m.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={business.timeline.milestones[activeTimelineIndex].year}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="border-x border-b border-sand-300 bg-white p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-sand-200 pb-4 lg:pb-0">
                <span className="font-logo text-5xl sm:text-6xl text-pingaksh-terracotta">
                  {business.timeline.milestones[activeTimelineIndex].year}
                </span>
                <span className="block text-xs font-bold text-pingaksh-navy mt-1">
                  {business.timeline.milestones[activeTimelineIndex].metric}
                </span>
              </div>

              <div className="lg:col-span-9 space-y-2">
                <h3 className="font-logo text-2xl text-pingaksh-navy">
                  {business.timeline.milestones[activeTimelineIndex].title}
                </h3>
                <p className="text-sm sm:text-base text-navy-700 leading-relaxed">
                  {
                    business.timeline.milestones[activeTimelineIndex]
                      .description
                  }
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =====================================================================
          8. CROSS-BUSINESS VERTICAL SWITCHER
      ===================================================================== */}
      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <h2 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy pb-6">
            Explore Other Pingaksh Business Verticals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherBusinesses.map((other) => (
              <Link
                key={other.slug}
                href={`/our-businesses/${other.slug}`}
                className="group border border-sand-300 hover:border-pingaksh-navy p-6 sm:p-8 flex items-center justify-between gap-6 transition-colors"
              >
                <div>
                  <span className="text-xs font-semibold text-pingaksh-terracotta">
                    {other.legalEntity}
                  </span>
                  <h3 className="font-logo text-2xl text-pingaksh-navy group-hover:text-pingaksh-terracotta transition-colors mt-1">
                    {other.name}
                  </h3>
                  <p className="text-xs text-navy-600 mt-2 line-clamp-2">
                    {other.hero.subtitle}
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-navy-400 group-hover:text-pingaksh-terracotta shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

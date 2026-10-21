"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles,
  MapPin,
} from "lucide-react";
import {
  BUSINESS_VERTICALS_DATA,
  type BusinessVerticalData,
} from "@/data/businessVerticalsData";

interface BusinessVerticalShowcaseProps {
  business: BusinessVerticalData;
}

const SECTION_LINKS = [
  { id: "overview", label: "Executive Overview" },
  { id: "operating-assets", label: "Assets & Specifications" },
  { id: "telemetry-graphs", label: "Performance & Telemetry" },
  { id: "media-gallery", label: "Site Media & Operations" },
  { id: "division-timeline", label: "Commissioning Milestones" },
];

// Enterprise Deceleration Curve
const enterpriseEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay,
      ease: enterpriseEase,
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export default function BusinessVerticalShowcase({
  business,
}: BusinessVerticalShowcaseProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(0);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isMediaPaused, setIsMediaPaused] = useState(false);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(
    business.timeline.milestones.length - 1,
  );

  const selectedUnit = business.plantUnits[selectedUnitIndex];
  const currentMedia = business.mediaGallery.slides[activeMediaIndex];
  const otherBusinesses = BUSINESS_VERTICALS_DATA.filter(
    (b) => b.slug !== business.slug,
  );

  // Auto-advance Media Gallery if current slide is an image
  const nextMediaSlide = useCallback(() => {
    setActiveMediaIndex((prev) =>
      prev === business.mediaGallery.slides.length - 1 ? 0 : prev + 1,
    );
  }, [business.mediaGallery.slides.length]);

  useEffect(() => {
    if (isMediaPaused || currentMedia.type === "video") return;
    const timer = setInterval(nextMediaSlide, 6000);
    return () => clearInterval(timer);
  }, [isMediaPaused, currentMedia.type, nextMediaSlide]);

  // Scroll spy for sticky sub-navigation
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY + 240;
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
    <article className="bg-sand-100 text-pingaksh-navy overflow-hidden">
      {/* =====================================================================
          1. CINEMATIC HERO BANNER
      ===================================================================== */}
      <header className="relative bg-pingaksh-navy text-white pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden border-b border-white/10">
        {/* Background Media with Continuous Ken Burns Effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {business.hero.heroVideoUrl ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={business.hero.heroImage}
              className="w-full h-full object-cover opacity-35 scale-105"
            >
              <source src={business.hero.heroVideoUrl} type="video/mp4" />
            </video>
          ) : (
            <motion.img
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              src={business.hero.heroImage}
              alt={business.hero.heroImageAlt}
              width={2000}
              height={1100}
              className="w-full h-full object-cover"
            />
          )}
          {/* Crisp Enterprise Directional Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-pingaksh-navy/80 to-navy-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Breadcrumbs */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: enterpriseEase }}
            aria-label="Breadcrumb"
            className="flex items-center flex-wrap gap-2 text-xs text-sand-200/75 pb-8 border-b border-white/15"
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
              className="text-pingaksh-sand font-semibold"
            >
              {business.name}
            </span>
          </motion.nav>

          {/* Title & Subtitle Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pt-12 lg:pt-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="lg:col-span-8 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 border border-white/15 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-pingaksh-sand" />
                <span className="font-tagline text-[10px] font-bold uppercase tracking-[0.18em] text-pingaksh-sand">
                  {business.legalEntity}
                </span>
              </div>

              <h1 className="font-logo text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] text-white leading-[1.08] tracking-wide">
                {business.hero.title}
              </h1>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.15}
              className="lg:col-span-4 lg:border-l-2 lg:border-pingaksh-terracotta lg:pl-8"
            >
              <p className="font-body text-sm sm:text-base text-sand-100/90 leading-relaxed">
                {business.hero.subtitle}
              </p>
            </motion.div>
          </div>

          {/* 4-Column Operational KPI Strip with Staggered Entrance */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 rounded-xl overflow-hidden border border-white/15 bg-navy-950/75 backdrop-blur-md divide-y lg:divide-y-0 divide-x divide-white/15 mt-16 shadow-2xl"
          >
            {business.hero.keyMetrics.map((m, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="p-6 sm:p-8 group hover:bg-white/5 transition-colors duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-pingaksh-terracotta to-pingaksh-sand opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="block font-tagline text-[10px] uppercase tracking-[0.15em] text-sand-300/80 font-bold">
                  {m.label}
                </span>
                <span className="block font-logo text-3xl sm:text-4xl lg:text-5xl text-white mt-3 group-hover:text-pingaksh-sand transition-colors">
                  {m.value}
                </span>
                <span className="inline-block font-body text-xs text-pingaksh-sand/90 mt-2 font-medium">
                  {m.unit}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* =====================================================================
          2. STICKY SUB-NAVIGATION BAR (With Fluid layoutId Active Bar)
      ===================================================================== */}
      <div
        style={{ top: "var(--navbar-offset, 0px)" }}
        className="sticky z-40 bg-navy-950/95 backdrop-blur-md text-white border-b border-white/10 transition-[top] duration-300 ease-in-out shadow-lg"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-1">
            {SECTION_LINKS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={`relative px-4 sm:px-6 py-4 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? "text-pingaksh-sand"
                      : "text-sand-200/70 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{sec.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="subnav-active-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-pingaksh-terracotta"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden xl:flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-tagline text-[11px] uppercase tracking-wider text-sand-200 font-semibold">
              {business.shortName}
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. EXECUTIVE OVERVIEW & OPERATIONAL PILLARS
      ===================================================================== */}
      <section
        id="overview"
        className="py-20 lg:py-32 border-b border-sand-300 bg-white relative"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Narrative */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="lg:col-span-7 space-y-6 lg:sticky lg:top-40"
            >
              <div className="inline-flex items-center gap-2 font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-terracotta font-bold">
                <Layers className="w-4 h-4" />
                <span>Strategic Mandate</span>
              </div>

              <h2 className="font-logo text-3xl sm:text-4xl lg:text-5xl text-pingaksh-navy leading-[1.15]">
                {business.overview.headline}
              </h2>

              <p className="font-body text-base sm:text-lg text-navy-800 font-medium leading-relaxed pt-2">
                {business.overview.leadParagraph}
              </p>

              <p className="font-body text-sm sm:text-base text-navy-600 leading-relaxed">
                {business.overview.bodyParagraph}
              </p>

              <div className="pt-6 border-t border-sand-200 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-sand-50 border border-sand-200">
                  <span className="block font-tagline text-[10px] uppercase tracking-wider text-navy-500">
                    Compliance
                  </span>
                  <span className="font-body text-xs sm:text-sm font-bold text-pingaksh-navy mt-1 block">
                    100% Statutory
                  </span>
                </div>
                <div className="p-4 rounded-lg bg-sand-50 border border-sand-200">
                  <span className="block font-tagline text-[10px] uppercase tracking-wider text-navy-500">
                    Telemetry
                  </span>
                  <span className="font-body text-xs sm:text-sm font-bold text-pingaksh-navy mt-1 block">
                    24/7 SCADA Linked
                  </span>
                </div>
                <div className="p-4 rounded-lg bg-sand-50 border border-sand-200 col-span-2 sm:col-span-1">
                  <span className="block font-tagline text-[10px] uppercase tracking-wider text-navy-500">
                    Certification
                  </span>
                  <span className="font-body text-xs sm:text-sm font-bold text-pingaksh-navy mt-1 block">
                    ISO 9001 & 14001
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Interactive Operational Pillars */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-5 space-y-4"
            >
              {business.overview.highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="group relative p-7 sm:p-8 rounded-xl bg-sand-50 hover:bg-pingaksh-navy border border-sand-300 hover:border-pingaksh-navy transition-all duration-500 shadow-xs hover:shadow-xl overflow-hidden"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-logo text-xl text-pingaksh-navy group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <span className="font-logo text-2xl text-pingaksh-terracotta group-hover:text-pingaksh-sand transition-colors shrink-0">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-navy-700 group-hover:text-sand-100/90 mt-3 leading-relaxed transition-colors">
                    {item.detail}
                  </p>
                </motion.div>
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
        className="py-20 lg:py-32 border-b border-sand-300 bg-sand-100"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row lg:items-end justify-between pb-12 gap-6"
          >
            <div className="max-w-3xl">
              <span className="font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-terracotta font-bold">
                Engineering Infrastructure
              </span>
              <h2 className="font-logo text-3xl sm:text-5xl text-pingaksh-navy mt-2">
                {business.assetsHeading}
              </h2>
              <p className="font-body text-sm sm:text-base text-navy-600 mt-3">
                {business.assetsDescription}
              </p>
            </div>

            <div className="text-xs font-medium text-navy-600 bg-white px-4 py-2.5 rounded-md border border-sand-300 shrink-0">
              Select an operational unit below to inspect its technical matrix
            </div>
          </motion.div>

          {/* Unit Selector Tabs with Animated Indicator */}
          <div className="grid grid-cols-1 md:grid-cols-3 rounded-t-xl overflow-hidden border border-sand-300 bg-white divide-y md:divide-y-0 md:divide-x divide-sand-300">
            {business.plantUnits.map((unit, idx) => {
              const isSelected = selectedUnitIndex === idx;
              return (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => setSelectedUnitIndex(idx)}
                  className={`relative p-6 sm:p-7 text-left transition-all duration-300 cursor-pointer group ${
                    isSelected
                      ? "bg-pingaksh-navy text-white"
                      : "bg-white text-pingaksh-navy hover:bg-sand-50"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="active-unit-top-bar"
                      className="absolute top-0 left-0 right-0 h-1 bg-pingaksh-terracotta"
                    />
                  )}
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-tagline uppercase tracking-wider font-bold ${
                        isSelected
                          ? "text-pingaksh-sand"
                          : "text-pingaksh-terracotta"
                      }`}
                    >
                      Asset 0{idx + 1}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                        isSelected
                          ? "bg-white/15 text-white"
                          : "bg-sand-200 text-pingaksh-navy"
                      }`}
                    >
                      {unit.capacity}
                    </span>
                  </div>
                  <h3 className="font-logo text-xl sm:text-2xl mt-2.5">
                    {unit.name}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Selected Unit Detail Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedUnit.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: enterpriseEase }}
              className="grid grid-cols-1 lg:grid-cols-12 rounded-b-xl border-x border-b border-sand-300 bg-white shadow-xl overflow-hidden"
            >
              {/* Left Unit Image & Summary */}
              <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-sand-300 flex flex-col justify-between bg-sand-50/50">
                <div className="relative aspect-[16/10] bg-navy-950 overflow-hidden group">
                  <motion.img
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    src={selectedUnit.image}
                    alt={selectedUnit.imageAlt}
                    width={900}
                    height={560}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/90 text-white text-xs font-semibold shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {selectedUnit.status}
                  </span>
                </div>

                <div className="p-7 sm:p-9 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pingaksh-terracotta">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{selectedUnit.location}</span>
                    </div>
                    <h3 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy">
                      {selectedUnit.name}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-navy-700 leading-relaxed">
                      {selectedUnit.summary}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-sand-200 flex items-center justify-between text-xs text-navy-500">
                    <span>Grid Synchronization</span>
                    <span className="font-semibold text-pingaksh-navy">
                      Active & Monitored
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Engineering Specifications Table */}
              <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-sand-300">
                    <div>
                      <h4 className="font-logo text-2xl text-pingaksh-navy">
                        Technical & Process Specifications
                      </h4>
                      <p className="text-xs text-navy-500 mt-0.5">
                        Verified electro-mechanical and civil parameters
                      </p>
                    </div>
                    <span className="font-tagline text-[10px] uppercase tracking-widest px-3 py-1 rounded bg-sand-200 text-pingaksh-navy font-bold">
                      Audited Datasheet
                    </span>
                  </div>

                  <dl className="divide-y divide-sand-200 mt-2">
                    {selectedUnit.technicalSpecs.map((spec, i) => (
                      <motion.div
                        key={spec.parameter}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs sm:text-sm hover:bg-sand-50/80 px-2 -mx-2 rounded transition-colors"
                      >
                        <dt className="sm:col-span-5 font-medium text-navy-600">
                          {spec.parameter}
                        </dt>
                        <dd className="sm:col-span-7 font-bold text-pingaksh-navy">
                          {spec.specification}
                        </dd>
                      </motion.div>
                    ))}
                  </dl>
                </div>

                <div className="mt-8 pt-5 border-t border-sand-200 flex flex-wrap items-center justify-between gap-4 text-xs text-navy-500">
                  <span>Operating Entity: {business.legalEntity}</span>
                  <span className="font-semibold text-pingaksh-terracotta">
                    ISO 9001 • ISO 14001 Certified
                  </span>
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
        className="py-20 lg:py-32 bg-pingaksh-navy text-white border-b border-white/10 relative overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-3xl pb-14"
          >
            <div className="inline-flex items-center gap-2 font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-sand font-bold mb-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Operational Telemetry</span>
            </div>
            <h2 className="font-logo text-3xl sm:text-5xl text-white">
              {business.telemetry.heading}
            </h2>
            <p className="font-body text-sm sm:text-base text-sand-200/80 mt-3">
              {business.telemetry.subheading}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left: Animated Multi-Year Telemetry Bar Graph */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="lg:col-span-7 rounded-xl bg-navy-950/80 border border-white/15 p-7 sm:p-10 flex flex-col justify-between shadow-2xl"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-6 border-b border-white/10">
                <div>
                  <h3 className="font-logo text-2xl text-white">
                    {business.telemetry.chartTitle}
                  </h3>
                  <p className="text-xs text-sand-300/70 mt-1">
                    Historical output & operational ramp-up trajectory
                  </p>
                </div>
                <span className="font-tagline text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-white/10 text-pingaksh-sand">
                  Unit: {business.telemetry.chartUnit}
                </span>
              </div>

              {/* Custom Animated Vertical Bar Graph with Gridlines */}
              <div className="relative h-72 pt-10 pb-4 border-b border-white/15 flex items-end">
                {/* Background Horizontal Reference Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pt-10 pb-4 opacity-15">
                  <div className="border-b border-dashed border-white w-full" />
                  <div className="border-b border-dashed border-white w-full" />
                  <div className="border-b border-dashed border-white w-full" />
                  <div className="border-b border-dashed border-white w-full" />
                </div>

                <div className="relative z-10 grid grid-cols-5 gap-4 sm:gap-8 items-end w-full h-full">
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
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                          className="text-xs sm:text-sm font-bold text-pingaksh-sand mb-2.5 group-hover:scale-110 transition-transform"
                        >
                          {point.displayValue}
                        </motion.span>

                        <div className="w-full max-w-[64px] h-48 bg-white/5 rounded-t-md flex items-end overflow-hidden border border-white/10 p-1">
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${heightPercent}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1.1,
                              delay: idx * 0.12,
                              ease: enterpriseEase,
                            }}
                            className="w-full rounded-t-xs bg-gradient-to-t from-pingaksh-terracotta via-pingaksh-terracotta to-pingaksh-sand group-hover:brightness-110 transition-all"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* X-Axis Labels & Notes */}
              <div className="grid grid-cols-5 gap-4 sm:gap-8 pt-4 text-center">
                {business.telemetry.series.map((point) => (
                  <div key={point.year}>
                    <span className="block text-xs sm:text-sm font-bold text-white">
                      {point.year}
                    </span>
                    <span className="hidden sm:block text-[11px] text-sand-300/70 mt-1 line-clamp-1">
                      {point.benchmarkNote}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Operational Efficiency & Circularity Progress Bars */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={0.15}
              className="lg:col-span-5 rounded-xl bg-navy-950/80 border border-white/15 p-7 sm:p-10 flex flex-col justify-between space-y-8 shadow-2xl"
            >
              <div className="pb-5 border-b border-white/10">
                <h3 className="font-logo text-2xl text-white">
                  Efficiency & Compliance Benchmarks
                </h3>
                <p className="text-xs text-sand-300/80 mt-1.5">
                  Audited plant performance against statutory norms
                </p>
              </div>

              <div className="space-y-7 flex-1 flex flex-col justify-center">
                {business.telemetry.efficiencyBenchmarks.map((bench, idx) => (
                  <div key={bench.label} className="space-y-2.5">
                    <div className="flex items-baseline justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-white">
                        {bench.label}
                      </span>
                      <span className="font-logo text-2xl text-pingaksh-sand">
                        {bench.valueText}
                      </span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bench.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.1,
                          delay: 0.2 + idx * 0.15,
                          ease: enterpriseEase,
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-pingaksh-terracotta to-pingaksh-sand"
                      />
                    </div>

                    <p className="text-xs text-sand-200/70 leading-relaxed">
                      {bench.note}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. INTERACTIVE SITE MEDIA & VIDEO SLIDER (With Auto-Progress)
      ===================================================================== */}
      <section
        id="media-gallery"
        onMouseEnter={() => setIsMediaPaused(true)}
        onMouseLeave={() => setIsMediaPaused(false)}
        className="py-20 lg:py-32 bg-white border-b border-sand-300"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-end justify-between pb-12 gap-6"
          >
            <div>
              <span className="font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-terracotta font-bold">
                Visual Documentation
              </span>
              <h2 className="font-logo text-3xl sm:text-5xl text-pingaksh-navy mt-2">
                {business.mediaGallery.heading}
              </h2>
              <p className="font-body text-sm sm:text-base text-navy-600 mt-2">
                {business.mediaGallery.subheading}
              </p>
            </div>

            {/* Slide Prev/Next Controls */}
            <div className="flex items-center gap-3">
              <span className="font-tagline text-xs font-bold text-navy-500 mr-2">
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
                className="w-11 h-11 rounded-md border border-sand-300 hover:bg-pingaksh-navy hover:text-white hover:border-pingaksh-navy flex items-center justify-center transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next Media Slide"
                onClick={nextMediaSlide}
                className="w-11 h-11 rounded-md border border-sand-300 hover:bg-pingaksh-navy hover:text-white hover:border-pingaksh-navy flex items-center justify-center transition-all cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Main Active Media Stage */}
          <div className="rounded-xl border border-sand-300 bg-navy-950 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left 8 Cols: Visual Stage */}
              <div className="lg:col-span-8 relative aspect-[16/9] bg-black overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMedia.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {currentMedia.type === "video" ? (
                      <video
                        src={currentMedia.src}
                        poster={currentMedia.posterUrl}
                        controls
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <motion.img
                        initial={{ scale: 1.08 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 6, ease: "easeOut" }}
                        src={currentMedia.src}
                        alt={currentMedia.title}
                        width={1400}
                        height={780}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Auto-advance progress bar at bottom of image */}
                {currentMedia.type !== "video" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
                    <motion.div
                      key={`media-prog-${currentMedia.id}-${isMediaPaused}`}
                      initial={{ width: "0%" }}
                      animate={{ width: isMediaPaused ? "0%" : "100%" }}
                      transition={{
                        duration: isMediaPaused ? 0 : 6,
                        ease: "linear",
                      }}
                      className="h-full bg-pingaksh-terracotta"
                    />
                  </div>
                )}
              </div>

              {/* Right 4 Cols: Caption Sidebar & Thumbnails */}
              <div className="lg:col-span-4 p-7 sm:p-10 bg-pingaksh-navy text-white flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMedia.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: enterpriseEase }}
                    className="space-y-4"
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/10 text-pingaksh-sand font-tagline text-[10px] uppercase tracking-wider font-bold">
                      <MapPin className="w-3 h-3" />
                      {currentMedia.locationTag}
                    </span>
                    <h3 className="font-logo text-2xl sm:text-3xl text-white leading-snug">
                      {currentMedia.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-sand-200/85 leading-relaxed">
                      {currentMedia.caption}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Thumbnail Selector Strip */}
                <div className="pt-8 mt-8 border-t border-white/15">
                  <span className="block font-tagline text-[10px] uppercase tracking-widest text-sand-300/70 mb-3">
                    Select Media Feed
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {business.mediaGallery.slides.map((slide, idx) => {
                      const isActive = activeMediaIndex === idx;
                      return (
                        <button
                          key={slide.id}
                          type="button"
                          onClick={() => setActiveMediaIndex(idx)}
                          className={`relative aspect-video rounded overflow-hidden border-2 transition-all cursor-pointer ${
                            isActive
                              ? "border-pingaksh-sand scale-105 shadow-md opacity-100"
                              : "border-transparent opacity-50 hover:opacity-85"
                          }`}
                        >
                          <img
                            src={slide.posterUrl || slide.src}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                          />
                          {slide.type === "video" && (
                            <span className="absolute inset-0 flex items-center justify-center bg-navy-950/50">
                              <Play className="w-4 h-4 text-white fill-white" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. DIVISION MILESTONE TIMELINE SCRUBBER
      ===================================================================== */}
      <section
        id="division-timeline"
        className="py-20 lg:py-32 bg-sand-100 border-b border-sand-300"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-end justify-between pb-12 gap-4"
          >
            <div>
              <span className="font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-terracotta font-bold">
                Chronological Execution
              </span>
              <h2 className="font-logo text-3xl sm:text-5xl text-pingaksh-navy mt-2">
                {business.timeline.heading}
              </h2>
            </div>
            <Link
              href="/who-we-are/heritage-timeline"
              className="text-xs sm:text-sm font-bold text-pingaksh-terracotta hover:text-pingaksh-navy transition-colors inline-flex items-center gap-1.5 group"
            >
              <span>Explore Full Corporate Timeline</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Horizontal Year Scrubber */}
          <div className="grid grid-cols-2 sm:grid-cols-4 rounded-t-xl overflow-hidden border border-sand-300 bg-white divide-y sm:divide-y-0 sm:divide-x divide-sand-300">
            {business.timeline.milestones.map((m, idx) => {
              const isCurrent = activeTimelineIndex === idx;
              return (
                <button
                  key={m.year}
                  type="button"
                  onClick={() => setActiveTimelineIndex(idx)}
                  className={`relative p-6 text-left transition-colors cursor-pointer ${
                    isCurrent
                      ? "bg-pingaksh-navy text-white"
                      : "hover:bg-sand-50 text-pingaksh-navy"
                  }`}
                >
                  {isCurrent && (
                    <motion.div
                      layoutId="timeline-active-pill"
                      className="absolute top-0 left-0 right-0 h-1 bg-pingaksh-terracotta"
                    />
                  )}
                  <span
                    className={`font-logo text-3xl sm:text-4xl block ${
                      isCurrent ? "text-pingaksh-sand" : "text-pingaksh-navy"
                    }`}
                  >
                    {m.year}
                  </span>
                  <span
                    className={`font-body text-xs font-semibold mt-1.5 block line-clamp-1 ${
                      isCurrent ? "text-sand-100" : "text-navy-600"
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: enterpriseEase }}
              className="rounded-b-xl border-x border-b border-sand-300 bg-white p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-lg"
            >
              <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-sand-200 pb-6 lg:pb-0 lg:pr-8">
                <span className="font-tagline text-[10px] uppercase tracking-widest text-navy-400 font-bold block mb-1">
                  Milestone Year
                </span>
                <span className="font-logo text-6xl sm:text-7xl text-pingaksh-terracotta leading-none">
                  {business.timeline.milestones[activeTimelineIndex].year}
                </span>
                <div className="mt-4 inline-block px-3 py-1 rounded bg-sand-100 border border-sand-300 text-xs font-bold text-pingaksh-navy">
                  {business.timeline.milestones[activeTimelineIndex].metric}
                </div>
              </div>

              <div className="lg:col-span-8 space-y-3">
                <h3 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy">
                  {business.timeline.milestones[activeTimelineIndex].title}
                </h3>
                <p className="font-body text-sm sm:text-base text-navy-700 leading-relaxed">
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
          8. CINEMATIC CROSS-BUSINESS VERTICAL PORTALS
      ===================================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="pb-10">
            <span className="font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-terracotta font-bold">
              Integrated Conglomerate
            </span>
            <h2 className="font-logo text-3xl sm:text-4xl text-pingaksh-navy mt-1">
              Explore Other Pingaksh Business Verticals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherBusinesses.map((other) => (
              <Link
                key={other.slug}
                href={`/our-businesses/${other.slug}`}
                className="group relative rounded-xl overflow-hidden min-h-[280px] flex flex-col justify-end p-8 sm:p-10 border border-sand-300 shadow-lg"
              >
                <img
                  src={other.hero.heroImage}
                  alt={other.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/20 group-hover:via-navy-950/65 transition-colors" />

                <div className="relative z-10 flex items-end justify-between gap-6">
                  <div className="space-y-2 max-w-lg">
                    <span className="font-tagline text-[10px] uppercase tracking-widest text-pingaksh-sand font-bold block">
                      {other.legalEntity}
                    </span>
                    <h3 className="font-logo text-2xl sm:text-3xl text-white group-hover:text-pingaksh-sand transition-colors">
                      {other.name}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-sand-100/85 line-clamp-2">
                      {other.hero.subtitle}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-full bg-white/10 group-hover:bg-pingaksh-terracotta text-white flex items-center justify-center shrink-0 transition-all backdrop-blur-sm">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

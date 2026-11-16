"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  CheckCircle2,
  ShieldCheck,
  Layers,
  MapPin,
} from "lucide-react";
import {
  BUSINESS_VERTICALS_DATA,
  type BusinessVerticalData,
} from "@/data/businessVerticalsData";
import { useCarbonTelemetry } from "@/context/CarbonTelemetryContext";

interface BusinessVerticalShowcaseProps {
  business: BusinessVerticalData;
}

const SECTION_LINKS = [
  { id: "overview", label: "Executive Overview" },
  { id: "operating-assets", label: "Assets & Specifications" },
  { id: "process-architecture", label: "Process & SCADA Flow" },
  { id: "media-gallery", label: "Site Media & Operations" },
];

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
  // =========================================================================
  // 1. LIVE ADMIN API TELEMETRY (Replaces static KPI numbers)
  // =========================================================================
  const {
    hydroEnergyGeneratedGwh,
    ethanolCarbonSavedTonnes,
    totalCarbonSavedTonnes,
    formatIndianNumber,
  } = useCarbonTelemetry();

  // Determine which specific metric belongs to this vertical page
  const isHydroVertical = business.slug === "hydro-energy-cascade";

  const [activeSection, setActiveSection] = useState("overview");
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(0);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isMediaPaused, setIsMediaPaused] = useState(false);

  // SCADA Process Flow
  const [activeProcessId, setActiveProcessId] = useState(
    business.processSystems[0]?.id || "",
  );
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const [autoCycleFlow, setAutoCycleFlow] = useState(true);

  useEffect(() => {
    if (business.processSystems.length > 0) {
      setActiveProcessId(business.processSystems[0].id);
      setSelectedStepIndex(0);
    }
  }, [business.slug, business.processSystems]);

  const currentProcess =
    business.processSystems.find((sys) => sys.id === activeProcessId) ||
    business.processSystems[0];

  const activeStep =
    currentProcess?.steps[selectedStepIndex] || currentProcess?.steps[0];

  const handleProcessSwitch = (sysId: string) => {
    setActiveProcessId(sysId);
    setSelectedStepIndex(0);
  };

  useEffect(() => {
    if (!autoCycleFlow || !currentProcess) return;
    const timer = setInterval(() => {
      setSelectedStepIndex((prev) =>
        prev === currentProcess.steps.length - 1 ? 0 : prev + 1,
      );
    }, 5500);
    return () => clearInterval(timer);
  }, [autoCycleFlow, currentProcess]);

  const selectedUnit = business.plantUnits[selectedUnitIndex];
  const currentMedia = business.mediaGallery.slides[activeMediaIndex];

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
              className="w-full h-full object-cover opacity-50"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-pingaksh-navy/80 to-navy-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
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

          {/* 4-Column Operational KPI Strip (Connected to API) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 rounded-xl overflow-hidden border border-white/15 bg-navy-950/75 backdrop-blur-md divide-y lg:divide-y-0 divide-x divide-white/15 mt-16 shadow-2xl"
          >
            {/* 1. Core Production Metric (Capacity) */}
            <motion.div
              variants={fadeUp}
              className="p-6 sm:p-8 group hover:bg-white/5 transition-colors duration-300 relative overflow-hidden"
            >
              <span className="block font-tagline text-[10px] uppercase tracking-[0.15em] text-sand-300/80 font-bold">
                {business.hero.keyMetrics[0].label}
              </span>
              <span className="block font-logo text-3xl sm:text-4xl lg:text-5xl text-white mt-3 group-hover:text-pingaksh-sand transition-colors">
                {business.hero.keyMetrics[0].value}
              </span>
              <span className="inline-block font-body text-xs text-pingaksh-sand/90 mt-2 font-medium">
                {business.hero.keyMetrics[0].unit}
              </span>
            </motion.div>

            {/* 2. LIVE Metric: Generated GWh or Ethanol Offset */}
            <motion.div
              variants={fadeUp}
              className="p-6 sm:p-8 group hover:bg-white/5 transition-colors duration-300 relative overflow-hidden"
            >
              <span className="block font-tagline text-[10px] uppercase tracking-[0.15em] text-sand-300/80 font-bold">
                {isHydroVertical
                  ? "Energy Generated (API)"
                  : "Tailpipe CO₂ Offset (API)"}
              </span>
              <span className="block font-logo text-3xl sm:text-4xl lg:text-5xl text-white mt-3 group-hover:text-pingaksh-sand transition-colors">
                {isHydroVertical
                  ? formatIndianNumber(hydroEnergyGeneratedGwh, 2)
                  : formatIndianNumber(ethanolCarbonSavedTonnes, 0)}
              </span>
              <span className="inline-block font-body text-xs text-pingaksh-sand/90 mt-2 font-medium">
                {isHydroVertical ? "GWh" : "Tonnes CO₂"}
              </span>
            </motion.div>

            {/* 3. ESG / Compliance Metric (ZLD) */}
            <motion.div
              variants={fadeUp}
              className="p-6 sm:p-8 group hover:bg-white/5 transition-colors duration-300 relative overflow-hidden"
            >
              <span className="block font-tagline text-[10px] uppercase tracking-[0.15em] text-sand-300/80 font-bold">
                {business.hero.keyMetrics[2].label}
              </span>
              <span className="block font-logo text-3xl sm:text-4xl lg:text-5xl text-white mt-3 group-hover:text-pingaksh-sand transition-colors">
                {business.hero.keyMetrics[2].value}
              </span>
              <span className="inline-block font-body text-xs text-pingaksh-sand/90 mt-2 font-medium">
                {business.hero.keyMetrics[2].unit}
              </span>
            </motion.div>

            {/* 4. LIVE Global Metric: Total Group Carbon Offset */}
            <motion.div
              variants={fadeUp}
              className="p-6 sm:p-8 group hover:bg-white/5 transition-colors duration-300 relative overflow-hidden"
            >
              <span className="block font-tagline text-[10px] uppercase tracking-[0.15em] text-sand-300/80 font-bold text-emerald-400">
                Total Group CO₂ Displaced
              </span>
              <span className="block font-logo text-3xl sm:text-4xl lg:text-5xl text-emerald-400 mt-3 group-hover:text-pingaksh-sand transition-colors">
                {formatIndianNumber(totalCarbonSavedTonnes, 0)}
              </span>
              <span className="inline-block font-body text-xs text-pingaksh-sand/90 mt-2 font-medium">
                Total Tonnes Saved Globally
              </span>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* =====================================================================
          2. STICKY SUB-NAVIGATION BAR
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
                    fully complied
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
              </div>
            </motion.div>

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

          <div
            className={`grid grid-cols-1 md:grid-cols-${Math.min(
              business.plantUnits.length,
              3,
            )} rounded-t-xl overflow-hidden border border-sand-300 bg-white divide-y md:divide-y-0 md:divide-x divide-sand-300`}
          >
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

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedUnit.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: enterpriseEase }}
              className="grid grid-cols-1 lg:grid-cols-12 rounded-b-xl border-x border-b border-sand-300 bg-white shadow-xl overflow-hidden"
            >
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
                </div>
              </div>

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
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =====================================================================
          5. INTERACTIVE SCADA FLOW & PROCESS ARCHITECTURE
      ===================================================================== */}
      {currentProcess && activeStep && (
        <section
          id="process-architecture"
          className="py-20 lg:py-28 border-b border-sand-300 bg-white"
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-10 border-b border-sand-300 gap-6">
              <div>
                <span className="font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-terracotta font-bold">
                  Interactive SCADA Flow &amp; Video Telemetry
                </span>
                <h2 className="font-logo text-3xl sm:text-5xl text-pingaksh-navy mt-2">
                  Process Architecture &amp; Carbon Flow
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {business.processSystems.length > 1 && (
                  <div className="flex rounded-lg p-1 border border-sand-300 bg-sand-100 shadow-xs">
                    {business.processSystems.map((sys) => {
                      const isActive = sys.id === activeProcessId;
                      return (
                        <button
                          key={sys.id}
                          type="button"
                          onClick={() => handleProcessSwitch(sys.id)}
                          className={`relative px-4 py-2.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                            isActive
                              ? "text-white"
                              : "text-pingaksh-navy hover:text-pingaksh-terracotta"
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="process-system-pill"
                              className="absolute inset-0 bg-pingaksh-navy rounded-md"
                              transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 30,
                              }}
                            />
                          )}
                          <span className="relative z-10">{sys.tabLabel}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setAutoCycleFlow((prev) => !prev)}
                  className={`px-4 py-3 rounded-lg border text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                    autoCycleFlow
                      ? "bg-pingaksh-terracotta text-white border-pingaksh-terracotta"
                      : "bg-white text-pingaksh-navy border-sand-300 hover:border-pingaksh-navy"
                  }`}
                >
                  {autoCycleFlow ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Auto-Stepping Flow</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Paused (Click Any Stage)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentProcess.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: enterpriseEase }}
                className="pt-10 space-y-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentProcess.steps.map((step, idx) => {
                    const isSelected = selectedStepIndex === idx;
                    const badgeTone =
                      step.branchCategory === "co2-branch"
                        ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/30"
                        : step.branchCategory === "byproduct-branch"
                          ? "bg-pingaksh-terracotta/15 text-pingaksh-terracotta border-pingaksh-terracotta/30"
                          : "bg-sand-200 text-pingaksh-navy border-sand-300";

                    return (
                      <button
                        key={step.stepNumber}
                        type="button"
                        onClick={() => {
                          setSelectedStepIndex(idx);
                          setAutoCycleFlow(false);
                        }}
                        className={`group relative text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                          isSelected
                            ? "bg-pingaksh-navy text-white border-pingaksh-navy shadow-xl scale-[1.02]"
                            : "bg-sand-50 text-pingaksh-navy border-sand-300 hover:border-pingaksh-navy"
                        }`}
                      >
                        {isSelected && autoCycleFlow && (
                          <motion.div
                            key={`step-prog-${step.stepNumber}`}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 5.5, ease: "linear" }}
                            className="absolute top-0 left-0 h-1 bg-pingaksh-terracotta"
                          />
                        )}

                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`font-logo text-2xl ${
                                isSelected
                                  ? "text-pingaksh-sand"
                                  : "text-pingaksh-terracotta"
                              }`}
                            >
                              {step.stepNumber}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${
                                isSelected
                                  ? "bg-white/10 text-pingaksh-sand border-white/20"
                                  : badgeTone
                              }`}
                            >
                              {step.branchCategory === "co2-branch"
                                ? "Carbon Capture"
                                : step.branchCategory === "byproduct-branch"
                                  ? "Circular Loop"
                                  : "Primary Stream"}
                            </span>
                          </div>

                          <h4 className="font-bold text-sm mt-3 leading-snug">
                            {step.stageTitle}
                          </h4>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-2xl border border-sand-300 bg-pingaksh-navy text-white overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-12 p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep.stepNumber}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 16 }}
                        transition={{ duration: 0.35, ease: enterpriseEase }}
                        className="space-y-5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-sand font-bold">
                            Stage {activeStep.stepNumber} ·{" "}
                            {activeStep.subLabel}
                          </span>
                        </div>
                        <h3 className="font-logo text-2xl sm:text-4xl text-white leading-snug">
                          {activeStep.stageTitle}
                        </h3>
                        <p className="font-body text-sm sm:text-base text-sand-100/90 leading-relaxed">
                          {activeStep.technicalDescription}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <span className="block font-tagline text-[10px] uppercase tracking-wider text-sand-300">
                              Stage Output Benchmark
                            </span>
                            <span className="font-logo text-xl text-pingaksh-sand mt-1 block">
                              {activeStep.keyOutputMetric}
                            </span>
                          </div>
                          <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-400/25">
                            <span className="block font-tagline text-[10px] uppercase tracking-wider text-emerald-300">
                              Carbon &amp; Circularity Note
                            </span>
                            <span className="font-body text-xs text-white font-medium mt-1 block leading-snug">
                              {activeStep.carbonImpactNote}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* =====================================================================
          7. INTERACTIVE SITE MEDIA & VIDEO SLIDER
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
                className="w-11 h-11 rounded-md border border-sand-300 hover:bg-pingaksh-navy hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next Media Slide"
                onClick={nextMediaSlide}
                className="w-11 h-11 rounded-md border border-sand-300 hover:bg-pingaksh-navy hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <div className="rounded-xl border border-sand-300 bg-navy-950 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
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
    </article>
  );
}

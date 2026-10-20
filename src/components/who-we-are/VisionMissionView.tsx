"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass,
  Target,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Leaf,
  Mountain,
  Droplets,
  Award,
  CheckCircle2,
  Quote,
  Globe2,
  Scale,
  Zap,
} from "lucide-react";
import {
  VISION_MISSION_DATA,
  type CoreValueItem,
} from "@/data/visionMissionData";

// Reusable scroll-reveal variants matching Pingaksh motion architecture
const fadeUpVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function VisionMissionView() {
  const data = VISION_MISSION_DATA;
  const [activeSection, setActiveSection] = useState<string>(
    data.sectionNav[0].id,
  );
  const [selectedValue, setSelectedValue] = useState<CoreValueItem>(
    data.coreValues.items[0],
  );

  // Scroll spy for the Sticky Section Compass Bar
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 240;
      for (const item of data.sectionNav) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [data.sectionNav]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -140;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <article className="bg-background-warm text-pingaksh-navy overflow-x-hidden">
      {/* =====================================================================
          1. HERO BANNER (Corporate Navy + Ken Burns Zoom + Breadcrumbs)
      ===================================================================== */}
      <header className="relative min-h-[78vh] pt-32 pb-16 lg:pt-40 lg:pb-24 flex flex-col justify-between bg-pingaksh-navy text-white overflow-hidden">
        {/* Background Image with Slow Ken Burns Scale */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src={data.hero.backgroundImage}
            alt={data.hero.backgroundImageAlt}
            width={2000}
            height={1125}
            className="w-full h-full object-cover object-center "
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/45 via-pingaksh-navy/85 to-pingaksh-navy/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/30" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full">
          {/* Visible Breadcrumb Trail */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center flex-wrap gap-2 text-xs text-sand-200/80 pb-6 border-b border-white/15"
          >
            {data.breadcrumbs.map((crumb, idx) => {
              const isLast = idx === data.breadcrumbs.length - 1;
              return (
                <React.Fragment key={crumb.href}>
                  {isLast ? (
                    <span
                      aria-current="page"
                      className="text-pingaksh-sand font-semibold"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                  {!isLast && (
                    <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Main Hero Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pt-10 lg:pt-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUpVariant}
              custom={0.05}
              className="lg:col-span-8 space-y-5"
            >
              {/* Unique Page H1 */}
              <h1 className="font-logo text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] leading-[1.08] tracking-tight text-white">
                {data.hero.title}{" "}
                <span className="block text-pingaksh-sand mt-1">
                  {data.hero.highlightedTitle}
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUpVariant}
              custom={0.2}
              className="lg:col-span-4 lg:border-l lg:border-white/20 lg:pl-8 space-y-4"
            >
              <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-terracotta-400">
                {data.hero.sanskritBadge}
              </span>
              <p className="font-body text-sm sm:text-base text-sand-100/90 leading-relaxed">
                {data.hero.subtitle}
              </p>
            </motion.div>
          </div>

          {/* Bottom Hero Metric Strip */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            custom={0.35}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-14 pt-8 border-t border-white/15"
          >
            {data.hero.quickStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-xl p-4 sm:p-5 backdrop-blur-xs"
              >
                <span className="block text-[11px] font-tagline uppercase tracking-[0.18em] text-sand-300">
                  {stat.label}
                </span>
                <span className="block font-logo text-2xl sm:text-3xl text-white mt-1.5">
                  {stat.value}
                </span>
                <span className="block text-xs text-sand-200/75 mt-1">
                  {stat.subtext}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* =====================================================================
          2. STICKY SECTION COMPASS BAR (Syncs with --navbar-offset)
      ===================================================================== */}
      <div
        style={{ top: "var(--navbar-offset, 0px)" }}
        className="sticky z-40 bg-navy-950/95 backdrop-blur-md border-b border-white/10 transition-[top] duration-300 ease-in-out"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <nav
            aria-label="Page Sections"
            className="flex items-center justify-between overflow-x-auto no-scrollbar py-3 gap-2"
          >
            <div className="flex items-center gap-1.5 sm:gap-3">
              {data.sectionNav.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? "bg-pingaksh-sand text-pingaksh-navy shadow-sm"
                        : "text-sand-200/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-bold ${
                        isActive ? "text-pingaksh-terracotta" : "opacity-60"
                      }`}
                    >
                      {sec.code}
                    </span>
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>

            <Link
              href="/who-we-are/heritage-timeline"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-pingaksh-sand hover:text-white transition-colors shrink-0 pl-4"
            >
              <span>View 2008–2026 Timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </nav>
        </div>
      </div>

      {/* =====================================================================
          3. SECTION 01: SANSKRIT ETYMOLOGY & INSTITUTIONAL MANIFESTO
      ===================================================================== */}
      <section
        id="ethos-origin"
        className="relative py-20 lg:py-28 bg-sand-gradient border-b border-sand-300 overflow-hidden"
      >
        {/* Subtle Watermark Sanskrit Typography */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-10 top-8 text-[140px] sm:text-[220px] lg:text-[280px] font-logo text-pingaksh-navy/[0.04] leading-none"
        >
          {data.etymologyManifesto.sanskritWord}
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Sanskrit Badge & Origin Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUpVariant}
              className="lg:col-span-5"
            >
              <div className="rounded-2xl bg-pingaksh-navy text-white p-8 sm:p-10 shadow-2xl border border-navy-700 relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-40 h-40 rounded-full bg-pingaksh-terracotta/20 blur-2xl pointer-events-none" />

                <span className="font-tagline text-[11px] uppercase tracking-[0.22em] text-pingaksh-sand font-semibold">
                  {data.etymologyManifesto.eyebrow}
                </span>

                <div className="mt-6 flex items-baseline gap-4">
                  <span className="font-logo text-5xl sm:text-6xl text-pingaksh-sand">
                    {data.etymologyManifesto.sanskritWord}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-sand-300">
                    Sanskrit Root
                  </span>
                </div>

                <p className="text-xs font-semibold tracking-wider uppercase text-terracotta-400 mt-3">
                  {data.etymologyManifesto.phonetic}
                </p>

                <hr className="my-6 border-white/15" />

                <blockquote className="space-y-3">
                  <Quote className="w-7 h-7 text-pingaksh-sand opacity-80" />
                  <p className="font-logo text-lg sm:text-xl text-white leading-relaxed italic">
                    &ldquo;{data.etymologyManifesto.keyQuote}&rdquo;
                  </p>
                  <footer className="text-xs text-sand-300 font-semibold tracking-wider uppercase pt-1">
                    — {data.etymologyManifesto.quoteAttribution}
                  </footer>
                </blockquote>
              </div>
            </motion.div>

            {/* Right Column: Editorial Narrative */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUpVariant}
              custom={0.15}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-pingaksh-terracotta">
                <span className="w-8 h-[2px] bg-pingaksh-terracotta" />
                <span>Tradition Perfected by Engineering</span>
              </div>

              <h2 className="font-logo text-3xl sm:text-4xl lg:text-[42px] text-pingaksh-navy leading-[1.18]">
                {data.etymologyManifesto.headline}
              </h2>

              <p className="text-base sm:text-lg text-navy-800 font-medium leading-relaxed">
                {data.etymologyManifesto.leadParagraph}
              </p>

              <p className="text-sm sm:text-base text-navy-600 leading-relaxed">
                {data.etymologyManifesto.bodyParagraph}
              </p>

              {/* 3 Mini Pillar Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-white/80 border border-sand-300 flex items-start gap-3">
                  <Mountain className="w-5 h-5 text-pingaksh-terracotta shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-pingaksh-navy">
                      Himalayan Hydro
                    </h3>
                    <p className="text-xs text-navy-600 mt-0.5">
                      Zero-submergence run-of-the-river cascades
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/80 border border-sand-300 flex items-start gap-3">
                  <Droplets className="w-5 h-5 text-pingaksh-terracotta shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-pingaksh-navy">
                      Green Bio-Fuels
                    </h3>
                    <p className="text-xs text-navy-600 mt-0.5">
                      Grain-to-ethanol E20 blending & ZLD plants
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/80 border border-sand-300 flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-pingaksh-terracotta shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-pingaksh-navy">
                      Bio-Circularity
                    </h3>
                    <p className="text-xs text-navy-600 mt-0.5">
                      DDGS nutrition, Napier biomass & CO₂ capture
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. SECTION 02: OUR VISION (Architectural Monolith Showcase)
      ===================================================================== */}
      <section
        id="our-vision"
        className="py-20 lg:py-28 bg-background-warm border-b border-sand-300"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Top Vision Banner Card */}
          <div className="rounded-3xl bg-corporate-gradient text-white overflow-hidden shadow-2xl border border-navy-800">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Content Column */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUpVariant}
                className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between space-y-8"
              >
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-pingaksh-sand/30">
                    <Compass className="w-4 h-4 text-pingaksh-sand" />
                    <span className="font-tagline text-xs font-bold uppercase tracking-[0.2em] text-pingaksh-sand">
                      {data.visionSection.code} • {data.visionSection.label}
                    </span>
                  </div>

                  <h2 className="font-logo text-2xl sm:text-3xl lg:text-4xl text-white leading-[1.22]">
                    {data.visionSection.headline}
                  </h2>

                  <p className="text-sm sm:text-base text-sand-100/90 leading-relaxed">
                    {data.visionSection.statement}
                  </p>
                </div>
              </motion.div>

              {/* Right Image Column with Hover Zoom */}
              <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full overflow-hidden group">
                <img
                  src={data.visionSection.image}
                  alt={data.visionSection.imageAlt}
                  width={900}
                  height={700}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent lg:bg-gradient-to-r lg:from-navy-950/80 lg:via-transparent lg:to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-navy-950/85 backdrop-blur-md border border-white/15">
                  <span className="text-[10px] font-tagline uppercase tracking-[0.2em] text-pingaksh-sand">
                    Vision Horizon • 2030
                  </span>
                  <p className="text-xs text-white font-medium mt-1">
                    Synchronizing dispatchable hydro megawatts with low-carbon
                    bio-refinery fuels across northern India.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Strategic Vision Horizons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {data.visionSection.horizons.map((horizon, index) => (
              <motion.div
                key={horizon.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUpVariant}
                custom={index * 0.12}
                className="group rounded-2xl bg-white p-7 border border-sand-300 hover:border-pingaksh-navy shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-sand-200">
                    <span className="text-xs font-bold uppercase tracking-widest text-pingaksh-terracotta">
                      {horizon.code}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-sand-100 text-pingaksh-navy text-[11px] font-bold">
                      {horizon.metricLabel}
                    </span>
                  </div>

                  <div className="mt-5">
                    <span className="font-logo text-3xl text-pingaksh-navy">
                      {horizon.metric}
                    </span>
                    <h3 className="text-lg font-bold text-pingaksh-navy mt-2 group-hover:text-pingaksh-terracotta transition-colors">
                      {horizon.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-navy-600 mt-2.5 leading-relaxed">
                      {horizon.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. SECTION 03: OUR MISSION (Solar Terracotta & Warm Sand Architecture)
      ===================================================================== */}
      <section
        id="our-mission"
        className="py-20 lg:py-28 bg-pingaksh-sand/50 border-b border-sand-300"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="rounded-3xl bg-white border border-sand-300 overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Image Column (Reversed from Vision for visual rhythm) */}
              <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full overflow-hidden group order-2 lg:order-1">
                <img
                  src={data.missionSection.image}
                  alt={data.missionSection.imageAlt}
                  width={900}
                  height={700}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pingaksh-navy/90 via-pingaksh-navy/25 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-pingaksh-terracotta text-white shadow-lg">
                  <span className="text-[10px] font-tagline uppercase tracking-[0.2em] text-sand-100">
                    Steadfast Standard
                  </span>
                  <p className="text-xs font-medium mt-1">
                    Every engineering blueprint is measured against safety,
                    ecological preservation, and community value.
                  </p>
                </div>
              </div>

              {/* Right Mission Statement Column */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUpVariant}
                className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between space-y-8 order-1 lg:order-2"
              >
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-terracotta-50 border border-terracotta-200">
                    <Target className="w-4 h-4 text-pingaksh-terracotta" />
                    <span className="font-tagline text-xs font-bold uppercase tracking-[0.2em] text-pingaksh-terracotta">
                      {data.missionSection.code} • {data.missionSection.label}
                    </span>
                  </div>

                  <h2 className="font-logo text-2xl sm:text-3xl lg:text-4xl text-pingaksh-navy leading-[1.22]">
                    {data.missionSection.headline}
                  </h2>

                  <p className="text-sm sm:text-base text-navy-700 leading-relaxed">
                    {data.missionSection.statement}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-sand-100 border border-sand-300 flex items-start gap-3.5">
                  <Award className="w-5 h-5 text-pingaksh-terracotta shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-pingaksh-navy font-medium leading-relaxed">
                    {data.missionSection.subtext}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 3 Mission Execution Commitments */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {data.missionSection.commitments.map((commitment, index) => (
              <motion.div
                key={commitment.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUpVariant}
                custom={index * 0.12}
                className="group rounded-2xl bg-pingaksh-navy text-white p-7 border border-navy-800 hover:border-pingaksh-terracotta shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-xs font-bold uppercase tracking-widest text-pingaksh-sand">
                      {commitment.code}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/10 text-sand-200 text-[11px] font-semibold">
                      {commitment.metricLabel}
                    </span>
                  </div>

                  <div className="mt-5">
                    <span className="font-logo text-3xl text-pingaksh-sand">
                      {commitment.metric}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">
                      {commitment.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-sand-200/85 mt-2.5 leading-relaxed">
                      {commitment.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. SECTION 04: INTERACTIVE 6-PILLAR CORE VALUES MATRIX
      ===================================================================== */}
      <section
        id="core-values"
        className="py-20 lg:py-28 bg-background-warm border-b border-sand-300"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="max-w-3xl space-y-3"
          >
            <h2 className="font-logo text-3xl sm:text-4xl lg:text-5xl text-pingaksh-navy">
              {data.coreValues.headline}
            </h2>
            <p className="text-sm sm:text-base text-navy-600 leading-relaxed">
              {data.coreValues.description}
            </p>
          </motion.div>

          {/* Interactive Split-Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-stretch">
            {/* Left Selector Column (6 Value Pills) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-2.5">
              {data.coreValues.items.map((item) => {
                const isSelected = selectedValue.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedValue(item)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-pingaksh-navy text-white border-pingaksh-navy shadow-lg"
                        : "bg-white hover:bg-sand-100/70 text-pingaksh-navy border-sand-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-logo text-2xl ${
                          isSelected
                            ? "text-pingaksh-sand"
                            : "text-pingaksh-terracotta"
                        }`}
                      >
                        {item.number}
                      </span>
                      <div>
                        <span
                          className={`block text-[10px] uppercase tracking-[0.18em] font-semibold ${
                            isSelected ? "text-sand-300" : "text-navy-500"
                          }`}
                        >
                          {item.sanskritConcept} • {item.sanskritMeaning}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold mt-0.5">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected
                          ? "text-pingaksh-sand translate-x-1"
                          : "text-navy-400"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Animated Showcase Panel */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedValue.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="h-full rounded-3xl bg-white border border-sand-300 shadow-xl overflow-hidden flex flex-col justify-between"
                >
                  {/* Top Image Banner */}
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <img
                      src={selectedValue.image}
                      alt={selectedValue.imageAlt}
                      width={1000}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pingaksh-navy via-pingaksh-navy/40 to-transparent" />

                    <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                      <span className="px-3.5 py-1.5 rounded-full bg-pingaksh-navy/90 backdrop-blur-md text-pingaksh-sand text-xs font-bold tracking-wider uppercase border border-white/15">
                        Pillar {selectedValue.number} / 06
                      </span>
                      <span className="px-3.5 py-1.5 rounded-full bg-pingaksh-terracotta text-white text-xs font-semibold">
                        {selectedValue.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-6 right-6 text-white">
                      <span className="text-xs uppercase tracking-[0.2em] text-pingaksh-sand font-semibold">
                        {selectedValue.sanskritConcept} (
                        {selectedValue.sanskritMeaning})
                      </span>
                      <h3 className="font-logo text-2xl sm:text-3xl mt-1">
                        {selectedValue.title}
                      </h3>
                    </div>
                  </div>

                  {/* Bottom Details Body */}
                  <div className="p-6 sm:p-8 lg:p-10 space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <p className="text-sm sm:text-base font-bold text-pingaksh-terracotta">
                        {selectedValue.subtitle}
                      </p>
                      <p className="text-sm sm:text-base text-navy-700 leading-relaxed">
                        {selectedValue.description}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-sand-100 border border-sand-300">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-pingaksh-terracotta">
                        On-Ground Verification & Proof
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-pingaksh-navy mt-1">
                        {selectedValue.operationalProof}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. SECTION 05: NATIONAL 2030 CHARTER & GENERATIONAL STEWARDSHIP
      ===================================================================== */}
      <section
        id="national-charter"
        className="py-20 lg:py-28 bg-corporate-gradient text-white"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-20">
          {/* Part A: Alignment with India's 2030 Climate & Biofuel Mandates */}
          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="max-w-3xl space-y-3"
            >
              <h2 className="font-logo text-3xl sm:text-4xl lg:text-5xl text-white">
                {data.nationalCharter.headline}
              </h2>
              <p className="text-sm sm:text-base text-sand-200/85 leading-relaxed">
                {data.nationalCharter.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
              {data.nationalCharter.mandates.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpVariant}
                  custom={idx * 0.12}
                  className="rounded-2xl bg-white/5 border border-white/15 p-7 backdrop-blur-xs flex flex-col justify-between hover:bg-white/[0.08] transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-3 py-1 rounded-full bg-pingaksh-terracotta text-white font-semibold">
                        {item.targetYear}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      {item.mandate}
                    </h3>

                    <div className="py-4 border-y border-white/10">
                      <span className="block font-logo text-3xl sm:text-4xl text-pingaksh-sand">
                        {item.headlineMetric}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-sand-300">
                        {item.unit}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-sand-100/85 leading-relaxed">
                      {item.pingakshContribution}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Part B: Generational Leadership Philosophy */}
          <div className="pt-12 border-t border-white/15">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="max-w-3xl space-y-3"
            >
              <h2 className="font-logo text-3xl sm:text-4xl text-white">
                {data.leadershipPhilosophy.headline}
              </h2>
              <p className="text-sm sm:text-base text-sand-200/85 leading-relaxed">
                {data.leadershipPhilosophy.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
              {data.leadershipPhilosophy.leaders.map((leader, idx) => (
                <motion.div
                  key={leader.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpVariant}
                  custom={idx * 0.14}
                  className="rounded-2xl bg-pingaksh-sand text-pingaksh-navy p-7 shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3 pb-4 border-b border-sand-300">
                      <div>
                        <h3 className="font-logo text-2xl text-pingaksh-navy">
                          {leader.name}
                        </h3>
                        <p className="text-xs font-bold text-pingaksh-terracotta uppercase tracking-wider mt-0.5">
                          {leader.role}
                        </p>
                        <p className="text-[11px] text-navy-600 mt-1">
                          {leader.credentials}
                        </p>
                      </div>
                      {idx === 0 ? (
                        <Compass className="w-6 h-6 text-pingaksh-terracotta shrink-0" />
                      ) : idx === 1 ? (
                        <Globe2 className="w-6 h-6 text-pingaksh-terracotta shrink-0" />
                      ) : (
                        <Scale className="w-6 h-6 text-pingaksh-terracotta shrink-0" />
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-navy-500">
                        Core Stewardship Focus
                      </span>
                      <p className="text-sm font-bold text-pingaksh-navy mt-0.5">
                        {leader.pillarFocus}
                      </p>
                    </div>

                    <blockquote className="text-xs sm:text-sm text-navy-800 italic leading-relaxed bg-white/70 p-4 rounded-xl border border-sand-300">
                      &ldquo;{leader.ethosStatement}&rdquo;
                    </blockquote>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-6 pt-3 border-t border-sand-300">
                    {leader.traits.map((trait) => (
                      <span
                        key={trait}
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-pingaksh-navy text-pingaksh-sand"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. BOTTOM EDITORIAL CTA BANNER
      ===================================================================== */}
      <section className="py-16 lg:py-20 bg-sand-100 border-t border-sand-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="rounded-3xl bg-pingaksh-navy text-white p-8 sm:p-12 lg:p-14 shadow-2xl border border-navy-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-2.5">
              <h2 className="font-logo text-2xl sm:text-3xl lg:text-4xl text-white">
                {data.ctaBanner.headline}
              </h2>
              <p className="text-xs sm:text-sm text-sand-200/85 leading-relaxed">
                {data.ctaBanner.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                href={data.ctaBanner.primaryCta.href}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-pingaksh-sand hover:bg-sand-300 text-pingaksh-navy font-semibold text-xs sm:text-sm transition-all shadow-md"
              >
                <span>{data.ctaBanner.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={data.ctaBanner.secondaryCta.href}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm transition-all"
              >
                <span>{data.ctaBanner.secondaryCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, HeartHandshake, Leaf } from "lucide-react";
import { HOME_SECTIONS_DATA } from "@/data/homeSectionsData";

// Premium Enterprise Easing Curve (Smooth deceleration)
const transitionEase = [0.22, 1, 0.36, 1] as const;

export default function HomeCoreSections() {
  const { ethosSection, businessesSection, stewardshipSection } =
    HOME_SECTIONS_DATA;

  const [activeBizIndex, setActiveBizIndex] = useState(0);
  const activeBusiness = businessesSection.verticals[activeBizIndex];

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isStewardshipPaused, setIsStewardshipPaused] = useState(false);

  const nextStewardshipSlide = useCallback(() => {
    setActiveSlideIndex(
      (prev) => (prev + 1) % stewardshipSection.slides.length,
    );
  }, [stewardshipSection.slides.length]);

  useEffect(() => {
    if (isStewardshipPaused) return;
    const interval = setInterval(nextStewardshipSlide, 6000);
    return () => clearInterval(interval);
  }, [isStewardshipPaused, nextStewardshipSlide]);

  const currentStewardshipSlide = stewardshipSection.slides[activeSlideIndex];

  return (
    <div className="w-full overflow-hidden bg-sand-100">
      {/* =====================================================================
          SECTION 1: ETHOS & CARBON IMPACT BENTO 
      ===================================================================== */}
      <section
        aria-labelledby="ethos-section-heading"
        className="relative bg-sand-100 text-pingaksh-navy py-24 sm:py-32 border-b border-sand-300"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Typography Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: transitionEase }}
              className="lg:col-span-6 space-y-5"
            >
              <div
                aria-hidden="true"
                className="font-logo text-7xl sm:text-8xl xl:text-[112px] font-extrabold leading-none tracking-tight select-none bg-cover bg-center bg-clip-text text-transparent drop-shadow-sm"
                style={{
                  backgroundImage: `url('${ethosSection.clipBackgroundImage}')`,
                }}
              >
                {ethosSection.clippedWord}
              </div>

              <h2
                id="ethos-section-heading"
                className="font-logo text-3xl sm:text-4xl lg:text-5xl text-pingaksh-navy leading-[1.15] tracking-wide pt-2"
              >
                {ethosSection.headline}
              </h2>
            </motion.div>

            {/* Right: Narrative Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: transitionEase }}
              className="lg:col-span-6 space-y-8"
            >
              <p className="font-body text-base sm:text-lg text-navy-800 leading-relaxed max-w-2xl">
                {ethosSection.leadParagraph}
              </p>

              <blockquote className="p-7 rounded-lg bg-white/60 border-l-[6px] border-pingaksh-navy text-pingaksh-navy shadow-sm">
                <p className="font-body text-base sm:text-lg italic font-medium leading-relaxed">
                  {ethosSection.quote}
                </p>
                <footer className="mt-4 font-tagline text-xs uppercase tracking-[0.15em] text-navy-600 font-bold">
                  — {ethosSection.quoteAuthor}
                </footer>
              </blockquote>
            </motion.div>
          </div>

          {/* Staggered Bento Grid */}
          <div
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
          >
            {ethosSection.impactStats.map((stat, idx) => (
              <motion.article
                key={stat.id}
                role="listitem"
                custom={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.1,
                  ease: transitionEase,
                }}
                className="group relative rounded-xl bg-white p-8 border border-sand-300 hover:border-pingaksh-navy transition-colors duration-500 shadow-sm flex flex-col justify-between"
              >
                <div className="flex items-baseline justify-between gap-2 mb-6">
                  <span className="font-logo text-4xl sm:text-5xl font-bold text-pingaksh-navy transition-colors duration-500">
                    {stat.value}
                  </span>
                  <span className="font-tagline text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded bg-sand-200 text-pingaksh-navy">
                    {stat.unit}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-pingaksh-navy">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-navy-600 mt-2 leading-relaxed">
                    {stat.subtext}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: RELIANCE-STYLE SPLIT BUSINESSES SHOWCASE (NO RED ACCENTS)
      ===================================================================== */}
      <section
        aria-labelledby="businesses-section-heading"
        className="relative min-h-[780px] lg:min-h-[840px] bg-pingaksh-navy text-white py-24 sm:py-32 overflow-hidden flex items-center"
      >
        {/* Full-Bleed Background Image Crossfade */}
        <AnimatePresence mode="sync">
          <motion.figure
            key={activeBusiness.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: transitionEase }}
            className="absolute inset-0 m-0"
          >
            <img
              src={activeBusiness.backgroundImage}
              alt={activeBusiness.imageAlt}
              className="w-full h-full object-cover object-center"
            />
            {/* Multi-layered Navy Scrim matching Reliance depth */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-pingaksh-navy/80 to-navy-950/70"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-navy-950/40"
            />
          </motion.figure>
        </AnimatePresence>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full">
          {/* Split Grid: Left Narrative (6 Cols) | Right Minimal Line Tabs (4 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* LEFT COLUMN: Active Business Narrative */}
            <div className="lg:col-span-6 space-y-8">
              {/* Eyebrow with Warm Sand Droplet/Flame Indicator */}
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="w-2.5 h-4 rounded-tl-full rounded-br-full bg-pingaksh-sand inline-block rotate-12"
                />
                <span
                  id="businesses-section-heading"
                  className="font-tagline text-xs sm:text-sm uppercase tracking-[0.18em] text-white font-bold"
                >
                  {businessesSection.eyebrow}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBusiness.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45, ease: transitionEase }}
                  className="space-y-7"
                >
                  {/* Large Serif Business Title */}
                  <div className="space-y-4">
                    <h3 className="font-logo text-4xl sm:text-6xl lg:text-[64px] text-white tracking-wide leading-[1.08]">
                      {activeBusiness.title}
                    </h3>

                    <div className="space-y-4 pt-2 max-w-xl">
                      <p className="font-body text-sm sm:text-base text-sand-100/90 leading-relaxed">
                        {activeBusiness.description}
                      </p>
                      <p className="font-body text-sm sm:text-base text-sand-100/80 leading-relaxed">
                        {activeBusiness.secondaryDescription}
                      </p>
                    </div>
                  </div>

                  {/* Subtle Key Specs Row */}
                  {activeBusiness.keySpecs &&
                    activeBusiness.keySpecs.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/15 max-w-xl">
                        {activeBusiness.keySpecs.map((spec, idx) => (
                          <div key={idx}>
                            <span className="block font-tagline text-[10px] uppercase tracking-widest text-sand-200/60 mb-1">
                              {spec.parameter}
                            </span>
                            <span className="block text-xs sm:text-sm font-bold text-pingaksh-sand tracking-wide">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                  {/* Reliance-Style Outlined Pill Button ("read more ->") */}
                  <div className="pt-2">
                    <Link
                      href={activeBusiness.ctaHref}
                      className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-pingaksh-sand/70 hover:border-pingaksh-sand hover:bg-pingaksh-sand text-white hover:text-pingaksh-navy text-xs sm:text-sm font-medium transition-all duration-300 group"
                    >
                      <span>{activeBusiness.ctaText || "read more"}</span>
                      <ArrowRight className="w-4 h-4 text-pingaksh-sand group-hover:text-pingaksh-navy group-hover:translate-x-1 transition-all duration-300" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: Reliance-Style Clean Vertical Line Navigation */}
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-center">
              <div
                role="tablist"
                aria-label="Pingaksh Business Verticals"
                className="flex flex-col"
              >
                {businessesSection.verticals.map((vertical, index) => {
                  const isSelected = index === activeBizIndex;
                  return (
                    <button
                      key={vertical.id}
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveBizIndex(index)}
                      className="relative w-full text-left py-5 border-b border-white/25 transition-all duration-300 cursor-pointer group focus:outline-none"
                    >
                      <span
                        className={`block font-tagline text-xs sm:text-sm uppercase tracking-[0.14em] transition-colors duration-300 ${
                          isSelected
                            ? "text-white font-bold"
                            : "text-white/70 group-hover:text-white font-medium"
                        }`}
                      >
                        {vertical.shortTitle}
                      </span>

                      {/* Warm Sand Active Bottom Indicator Line */}
                      {isSelected && (
                        <motion.div
                          layoutId="pingakshActiveBizLine"
                          transition={{ duration: 0.35, ease: transitionEase }}
                          className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-pingaksh-sand"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: ECOLOGICAL & COMMUNITY STEWARDSHIP 
      ===================================================================== */}
      {/* =====================================================================
          SECTION 3: CORPORATE SOCIAL RESPONSIBILITY (CSR) INITIATIVES
      ===================================================================== */}
      <section
        aria-labelledby="csr-section-heading"
        onMouseEnter={() => setIsStewardshipPaused(true)}
        onMouseLeave={() => setIsStewardshipPaused(false)}
        className="bg-sand-200 py-24 sm:py-32 text-pingaksh-navy"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: transitionEase }}
            className="rounded-xl bg-white shadow-xl border border-sand-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Left Narrative: CSR Mandate & Grassroots Execution */}
            <div className="lg:col-span-5 p-10 sm:p-14 flex flex-col justify-between bg-white relative z-10">
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4 border-b border-sand-200 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-pingaksh-navy text-pingaksh-sand flex items-center justify-center shrink-0">
                      <HeartHandshake className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block font-tagline text-[10px] uppercase tracking-[0.18em] text-navy-500 font-bold">
                        Section 135 · CSR Mandate
                      </span>
                      <h2
                        id="csr-section-heading"
                        className="font-logo text-2xl sm:text-3xl text-pingaksh-navy"
                      >
                        {stewardshipSection.title}
                      </h2>
                    </div>
                  </div>
                </div>

                <h3 className="font-logo text-xl sm:text-2xl font-bold text-pingaksh-navy leading-snug">
                  {stewardshipSection.subtitle}
                </h3>

                <p className="font-body text-sm sm:text-base text-navy-700 leading-relaxed">
                  {stewardshipSection.description}
                </p>

                <ul className="space-y-4 pt-2" aria-label="CSR Focus Pillars">
                  {stewardshipSection.highlights.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-pingaksh-navy shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-navy-800 font-medium leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-10 mt-10 border-t border-sand-200 space-y-8">
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={stewardshipSection.primaryCta.href}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-pingaksh-navy hover:bg-navy-800 text-pingaksh-sand text-sm font-semibold transition-all"
                  >
                    <span>{stewardshipSection.primaryCta.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href={stewardshipSection.secondaryCta.href}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border-2 border-pingaksh-navy hover:bg-pingaksh-navy hover:text-white text-pingaksh-navy text-sm font-bold transition-colors"
                  >
                    <span>{stewardshipSection.secondaryCta.label}</span>
                  </Link>
                </div>

                {/* Slide Progress Indicators */}
                <div
                  role="tablist"
                  aria-label="CSR Initiative Highlights"
                  className="flex items-center gap-3"
                >
                  {stewardshipSection.slides.map((slide, idx) => {
                    const isActive = idx === activeSlideIndex;
                    return (
                      <button
                        key={slide.id}
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`View CSR Slide: ${slide.title}`}
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`relative h-2 w-16 overflow-hidden rounded-full cursor-pointer transition-colors duration-300 ${
                          isActive
                            ? "bg-sand-300"
                            : "bg-sand-100 hover:bg-sand-200"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            key={`progress-${slide.id}-${isStewardshipPaused}`}
                            initial={{ width: "0%" }}
                            animate={{
                              width: isStewardshipPaused ? "0%" : "100%",
                            }}
                            transition={{
                              duration: isStewardshipPaused ? 0 : 6,
                              ease: "linear",
                            }}
                            className="absolute top-0 left-0 h-full bg-pingaksh-navy"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Cinematic CSR Field Impact Showcase */}
            <div className="lg:col-span-7 relative min-h-[500px] sm:min-h-[600px] bg-navy-950 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStewardshipSlide.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 6, ease: "easeOut" }}
                    src={currentStewardshipSlide.imageUrl}
                    alt={currentStewardshipSlide.imageAlt}
                    className="w-full h-full object-cover origin-bottom-right"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2,
                        ease: transitionEase,
                      }}
                      className="space-y-3 max-w-xl"
                    >
                      <span className="inline-block px-3 py-1 rounded bg-white/10 backdrop-blur-sm border border-pingaksh-sand/30 font-tagline text-[10px] uppercase tracking-[0.2em] text-pingaksh-sand font-bold">
                        {currentStewardshipSlide.category}
                      </span>
                      <h4 className="font-logo text-3xl sm:text-4xl text-white tracking-wide">
                        {currentStewardshipSlide.title}
                      </h4>
                      <p className="font-body text-sm sm:text-base text-sand-100/90 leading-relaxed">
                        {currentStewardshipSlide.caption}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

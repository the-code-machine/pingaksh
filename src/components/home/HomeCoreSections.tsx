"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Droplets,
  Flame,
  Layers,
  Leaf,
  Recycle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { HOME_SECTIONS_DATA } from "@/data/homeSectionsData";

export default function HomeCoreSections() {
  const { ethosSection, businessesSection, stewardshipSection } =
    HOME_SECTIONS_DATA;

  // State for Section 2: Active Business Vertical
  const [activeBizIndex, setActiveBizIndex] = useState(0);
  const activeBusiness = businessesSection.verticals[activeBizIndex];

  // State for Section 3: Auto-Transitioning Stewardship Image Carousel
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isStewardshipPaused, setIsStewardshipPaused] = useState(false);

  const nextStewardshipSlide = useCallback(() => {
    setActiveSlideIndex(
      (prev) => (prev + 1) % stewardshipSection.slides.length,
    );
  }, [stewardshipSection.slides.length]);

  useEffect(() => {
    if (isStewardshipPaused) return;
    const interval = setInterval(nextStewardshipSlide, 1500);
    return () => clearInterval(interval);
  }, [isStewardshipPaused, nextStewardshipSlide]);

  const currentStewardshipSlide = stewardshipSection.slides[activeSlideIndex];

  return (
    <div className="w-full overflow-hidden">
      {/* =====================================================================
          SECTION 1: ETHOS & CARBON IMPACT BENTO (Replaces RIL "WE CARE")
          Uses Warm Sand Surface + Image-Clipped "SUSTAIN" Typography + Bento Grid
      ===================================================================== */}
      <section
        aria-labelledby="ethos-section-heading"
        className="relative bg-sand-100 text-pingaksh-navy py-20 sm:py-28 border-b border-sand-300"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Top Split: Clipped Wordmark + Sanskrit Heritage Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left (Cols 1-6): Nature-Clipped Display Wordmark */}
            <div className="lg:col-span-6 space-y-4">
              {/* Image-Clipped Display Typography ("SUSTAIN") */}
              <div
                aria-hidden="true"
                className="font-logo text-6xl sm:text-8xl xl:text-[108px] font-extrabold leading-none tracking-tight select-none bg-cover bg-center bg-clip-text text-transparent drop-shadow-xs"
                style={{
                  backgroundImage: `url('${ethosSection.clipBackgroundImage}')`,
                }}
              >
                {ethosSection.clippedWord}
              </div>

              <h2
                id="ethos-section-heading"
                className="font-logo text-2xl sm:text-3xl lg:text-4xl text-pingaksh-navy leading-snug tracking-wide pt-1"
              >
                {ethosSection.headline}
              </h2>
            </div>

            {/* Right (Cols 7-12): Heritage Story & Founder Quote Card */}
            <div className="lg:col-span-6 space-y-6">
              <p className="font-body text-sm sm:text-base text-navy-800 leading-relaxed">
                {ethosSection.leadParagraph}
              </p>

              <blockquote className="p-6 rounded-2xl bg-pingaksh-sand/70 border-l-4 border-pingaksh-terracotta text-pingaksh-navy shadow-xs">
                <p className="font-body text-sm sm:text-base italic font-medium leading-relaxed">
                  {ethosSection.quote}
                </p>
                <footer className="mt-3 font-tagline text-xs uppercase tracking-wider text-pingaksh-terracotta font-semibold">
                  — {ethosSection.quoteAuthor}
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Bottom 4-Card Live Metric Bento Grid */}
          <div
            role="list"
            aria-label="Pingaksh Renewables Key Operational & Carbon Impact Metrics"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14"
          >
            {ethosSection.impactStats.map((stat, idx) => (
              <motion.article
                key={stat.id}
                role="listitem"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative rounded-2xl bg-white p-6 sm:p-7 border border-sand-300 hover:border-pingaksh-terracotta transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-logo text-3xl sm:text-4xl font-bold text-pingaksh-navy group-hover:text-pingaksh-terracotta transition-colors">
                      {stat.value}
                    </span>
                    <span className="font-tagline text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sand-200 text-pingaksh-navy">
                      {stat.unit}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-pingaksh-navy mt-4">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-navy-600 mt-1.5 leading-relaxed">
                    {stat.subtext}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: INTERACTIVE BUSINESSES & PLANT SPEC MATRIX
          (Custom Left Vertical Selector + Right Engineering Matrix)
      ===================================================================== */}
      <section
        aria-labelledby="businesses-section-heading"
        className="relative min-h-[780px] bg-pingaksh-navy text-white py-20 sm:py-28 overflow-hidden flex items-center"
      >
        {/* Dynamic Cross-Fading Background Image per Business Vertical */}
        <AnimatePresence mode="sync">
          <motion.figure
            key={activeBusiness.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 m-0"
          >
            <img
              src={activeBusiness.backgroundImage}
              alt={activeBusiness.imageAlt}
              width={1800}
              height={1000}
              loading="lazy"
              className="w-full h-full object-cover object-center opacity-100"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-navy-950 via-pingaksh-navy/50 to-navy-950/40"
            />
          </motion.figure>
        </AnimatePresence>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full">
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <h2
              id="businesses-section-heading"
              className="font-logo text-3xl sm:text-5xl text-white mt-2 tracking-wide"
            >
              {businessesSection.sectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-sand-200/85 mt-3">
              {businessesSection.sectionSubtitle}
            </p>
          </div>

          {/* Interactive 12-Column Grid: Left Selector Rail (4 Cols) + Right Spec Matrix (8 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Vertical Business Selector Tabs */}
            <div
              role="tablist"
              aria-label="Pingaksh Group Business Verticals"
              className="lg:col-span-4 flex flex-col space-y-3"
            >
              {businessesSection.verticals.map((vertical, index) => {
                const isSelected = index === activeBizIndex;
                return (
                  <button
                    key={vertical.id}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`biz-panel-${vertical.id}`}
                    onClick={() => setActiveBizIndex(index)}
                    className={`w-full text-left p-5 rounded-xl transition-all duration-250 cursor-pointer border flex items-center justify-between group ${
                      isSelected
                        ? "bg-pingaksh-sand text-pingaksh-navy border-pingaksh-sand shadow-lg"
                        : "bg-white/5 hover:bg-white/10 text-white border-white/15"
                    }`}
                  >
                    <div>
                      <span
                        className={`block font-tagline text-[11px] uppercase tracking-widest ${
                          isSelected
                            ? "text-pingaksh-terracotta font-bold"
                            : "text-sand-300/80"
                        }`}
                      >
                        {vertical.entityName}
                      </span>
                      <span className="block text-base sm:text-lg font-bold mt-1">
                        {vertical.shortTitle}
                      </span>
                    </div>

                    <ArrowRight
                      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                        isSelected
                          ? "text-pingaksh-terracotta translate-x-1"
                          : "text-white/50 group-hover:translate-x-1"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Column: Active Business Content + Plant Spec Matrix */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBusiness.id}
                  id={`biz-panel-${activeBusiness.id}`}
                  role="tabpanel"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="rounded-2xl bg-navy-950/80 backdrop-blur-md border border-white/15 p-6 sm:p-9 space-y-7 shadow-2xl"
                >
                  <div className="space-y-3">
                    <h3 className="font-logo text-2xl sm:text-4xl text-pingaksh-sand tracking-wide">
                      {activeBusiness.title}
                    </h3>

                    <p className="text-sm sm:text-base text-sand-100/95 leading-relaxed">
                      {activeBusiness.description}
                    </p>
                    <p className="text-xs sm:text-sm text-sand-200/75 leading-relaxed">
                      {activeBusiness.secondaryDescription}
                    </p>
                  </div>

                  {/* Technical Specification Cards (2x2 Grid) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {activeBusiness.keySpecs.map((spec, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between"
                      >
                        <span className="text-[11px] uppercase tracking-wider text-sand-300">
                          {spec.parameter}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-white mt-1">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Conditional Sub-Projects Table (Rendered for Sarju I, II, III Hydro) */}
                  {activeBusiness.subProjects && (
                    <div className="overflow-x-auto rounded-xl border border-white/15">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-white/10 text-pingaksh-sand uppercase tracking-wider">
                            <th className="py-3 px-4 font-semibold">Project</th>
                            <th className="py-3 px-4 font-semibold">
                              Capacity
                            </th>
                            <th className="py-3 px-4 font-semibold">Turbine</th>
                            <th className="py-3 px-4 font-semibold">
                              Head / Flow
                            </th>
                            <th className="py-3 px-4 font-semibold">
                              Status / COD
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-sand-100">
                          {activeBusiness.subProjects.map((proj) => (
                            <tr
                              key={proj.name}
                              className="hover:bg-white/5 transition-colors"
                            >
                              <td className="py-3 px-4 font-bold text-white">
                                {proj.name}
                              </td>
                              <td className="py-3 px-4">{proj.capacity}</td>
                              <td className="py-3 px-4">{proj.turbine}</td>
                              <td className="py-3 px-4">
                                {proj.head} · {proj.discharge}
                              </td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium">
                                  {proj.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Bottom CTA */}
                  <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
                    <Link
                      href={activeBusiness.ctaHref}
                      title={`${activeBusiness.ctaText} - ${activeBusiness.title}`}
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-pingaksh-terracotta hover:bg-terracotta-600 text-white text-xs sm:text-sm font-semibold transition-all shadow-md group"
                    >
                      <span>{activeBusiness.ctaText}</span>
                      <ArrowRight
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </Link>

                    <span className="text-xs text-sand-200/70">
                      ISO 9001 · ISO 14001 · Statutory Compliant
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: ECOLOGICAL & COMMUNITY STEWARDSHIP (Replaces RIL Foundation)
          Features Automatic Multi-Image Slideshow Transition Every 4.5 Seconds
      ===================================================================== */}
      <section
        aria-labelledby="stewardship-section-heading"
        onMouseEnter={() => setIsStewardshipPaused(true)}
        onMouseLeave={() => setIsStewardshipPaused(false)}
        className="bg-sand-200 py-20 sm:py-28 text-pingaksh-navy"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Elevated Split Showcase Container */}
          <div className="rounded-3xl bg-white shadow-2xl border border-sand-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Left Narrative & Pillar Controls (Cols 1-5) */}
            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-white">
              <div className="space-y-5">
                {/* Brand Emblem + Stewardship Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pingaksh-navy text-pingaksh-sand flex items-center justify-center shrink-0">
                    <Leaf className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2
                      id="stewardship-section-heading"
                      className="font-logo text-xl sm:text-2xl text-pingaksh-navy"
                    >
                      {stewardshipSection.title}
                    </h2>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-pingaksh-navy leading-snug">
                  {stewardshipSection.subtitle}
                </h3>

                <p className="text-xs sm:text-sm text-navy-700 leading-relaxed">
                  {stewardshipSection.description}
                </p>

                {/* Bullet Checkmarks */}
                <ul className="space-y-2.5 pt-2">
                  {stewardshipSection.highlights.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-navy-800 font-medium"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-pingaksh-terracotta shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons & Slide Selector Dots */}
              <div className="pt-8 mt-8 border-t border-sand-200 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={stewardshipSection.primaryCta.href}
                    title={stewardshipSection.primaryCta.title}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pingaksh-navy hover:bg-navy-800 text-pingaksh-sand text-xs sm:text-sm font-semibold transition-all"
                  >
                    <span>{stewardshipSection.primaryCta.label}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>

                  <Link
                    href={stewardshipSection.secondaryCta.href}
                    title={stewardshipSection.secondaryCta.title}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-pingaksh-navy/30 hover:border-pingaksh-terracotta text-pingaksh-navy hover:text-pingaksh-terracotta text-xs sm:text-sm font-semibold transition-colors"
                  >
                    <span>{stewardshipSection.secondaryCta.label}</span>
                  </Link>
                </div>

                {/* Interactive Slide Selector Pills */}
                <div
                  role="tablist"
                  aria-label="Stewardship Visual Highlights"
                  className="flex items-center gap-2"
                >
                  {stewardshipSection.slides.map((slide, idx) => {
                    const isCurrent = idx === activeSlideIndex;
                    return (
                      <button
                        key={slide.id}
                        role="tab"
                        aria-selected={isCurrent}
                        aria-label={`View ${slide.category}`}
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          isCurrent
                            ? "w-10 bg-pingaksh-terracotta"
                            : "w-2.5 bg-sand-300 hover:bg-sand-400"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Auto-Transitioning Visual Showcase (Cols 6-12) */}
            <div className="lg:col-span-7 relative min-h-[420px] sm:min-h-[540px] bg-pingaksh-navy overflow-hidden">
              <AnimatePresence mode="sync">
                <motion.figure
                  key={currentStewardshipSlide.id}
                  initial={{ opacity: 0, scale: 1.07 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.9, ease: "easeInOut" },
                    scale: { duration: 5, ease: "easeOut" },
                  }}
                  className="absolute inset-0 w-full h-full m-0"
                >
                  <img
                    src={currentStewardshipSlide.imageUrl}
                    alt={currentStewardshipSlide.imageAlt}
                    width={1400}
                    height={900}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Bottom Gradient for Caption Readability */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/35 to-transparent"
                  />
                </motion.figure>
              </AnimatePresence>

              {/* Floating Top-Right Metric Pill */}

              {/* Animated Bottom Glass Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStewardshipSlide.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-2 max-w-2xl"
                  >
                    <span className="font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-sand">
                      {currentStewardshipSlide.category}
                    </span>
                    <h4 className="font-logo text-2xl sm:text-3xl text-white">
                      {currentStewardshipSlide.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-sand-100/90 leading-relaxed">
                      {currentStewardshipSlide.caption}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

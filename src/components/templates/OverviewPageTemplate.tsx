"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Compass,
  Home,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { OverviewPageData } from "@/data/overviewPagesData";

interface OverviewPageTemplateProps {
  data: OverviewPageData;
}

export default function OverviewPageTemplate({
  data,
}: OverviewPageTemplateProps) {
  const { breadcrumbs, hero, introSection, philosophyBanner, subSectionsGrid } =
    data;

  // =================================================================
  // 1. AUTO-CYCLING HERO IMAGE STATE
  // =================================================================
  const [heroImgIdx, setHeroImgIdx] = useState(0);

  const nextHeroImage = useCallback(() => {
    setHeroImgIdx((prev) => (prev + 1) % hero.images.length);
  }, [hero.images.length]);

  useEffect(() => {
    if (hero.images.length <= 1) return;
    const timer = setInterval(nextHeroImage, 5000);
    return () => clearInterval(timer);
  }, [hero.images.length, nextHeroImage]);

  const activeHeroImage = hero.images[heroImgIdx];

  // =================================================================
  // 2. SEO JSON-LD BREADCRUMB SCHEMA
  // =================================================================
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `https://www.pingakshrenewables.com${crumb.href}`,
    })),
  };

  return (
    <article className="w-full bg-background text-pingaksh-navy overflow-hidden">
      {/* Inject Breadcrumb JSON-LD for Google Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* =====================================================================
          SECTION 1: OVERVIEW HERO WITH AUTO-CHANGING IMAGES & KEN BURNS ZOOM
      ===================================================================== */}
      <header className="relative w-full h-[72vh] min-h-[540px] max-h-[760px] bg-pingaksh-navy text-white overflow-hidden flex items-end">
        <AnimatePresence mode="sync">
          <motion.figure
            key={activeHeroImage.url}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full m-0 overflow-hidden"
          >
            {/* Continuous Zoom-In / Zoom-Out Motion */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.12 }}
              transition={{
                duration: 9,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="w-full h-full"
            >
              <img
                src={activeHeroImage.url}
                alt={activeHeroImage.alt}
                width={2000}
                height={1100}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>

            {/* Readability Gradient Overlays */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-pingaksh-navy/70 to-navy-950/30"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-navy-950/60"
            />
          </motion.figure>
        </AnimatePresence>

        {/* Foreground Hero Title & Image Switcher Indicators */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full pb-12 sm:pb-16 pt-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl space-y-4"
            >
              {/* Primary Page H1 for On-Page SEO */}
              <h1 className="font-logo text-4xl sm:text-6xl lg:text-7xl text-white tracking-wide leading-[1.08]">
                {hero.title}
              </h1>

              <p className="font-body text-sm sm:text-lg text-sand-100/90 max-w-2xl leading-relaxed">
                {hero.subtitle}
              </p>
            </motion.div>

            {/* Right: Hero Image Slide Controls & Caption */}
            {hero.images.length > 1 && (
              <div className="flex flex-col items-start lg:items-end gap-2.5 shrink-0">
                {activeHeroImage.caption && (
                  <span className="text-xs font-medium text-sand-200/85 bg-navy-950/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10">
                    {activeHeroImage.caption}
                  </span>
                )}
                <div
                  role="tablist"
                  aria-label="Hero Background Views"
                  className="flex items-center gap-2"
                >
                  {hero.images.map((img, i) => (
                    <button
                      key={img.url}
                      type="button"
                      role="tab"
                      aria-selected={i === heroImgIdx}
                      aria-label={`View background ${i + 1}: ${img.alt}`}
                      onClick={() => setHeroImgIdx(i)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        i === heroImgIdx
                          ? "w-10 bg-pingaksh-sand"
                          : "w-2.5 bg-white/35 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* =====================================================================
          SECTION 2: BREADCRUMB BAR & SUB-SECTION QUICK NAVIGATION STRIP
      ===================================================================== */}
      <div className="bg-sand-100 border-b border-sand-300 sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Semantic Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center">
            <ol className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm font-medium text-navy-700">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <li key={crumb.href} className="flex items-center gap-1.5">
                    {idx === 0 && (
                      <Home
                        className="w-3.5 h-3.5 text-pingaksh-terracotta"
                        aria-hidden="true"
                      />
                    )}
                    {isLast ? (
                      <span
                        aria-current="page"
                        className="font-bold text-pingaksh-navy"
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <>
                        <Link
                          href={crumb.href}
                          title={`Navigate to ${crumb.label}`}
                          className="hover:text-pingaksh-terracotta transition-colors"
                        >
                          {crumb.label}
                        </Link>
                        <ChevronRight
                          className="w-3.5 h-3.5 text-navy-400"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Sub-Section Quick-Jump Pills */}
          {/* <nav
            aria-label="Sub-section quick links"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-pingaksh-terracotta shrink-0 mr-1 hidden sm:inline">
              In This Section:
            </span>
            {subSectionsGrid.cards.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                title={`Go to ${card.title}`}
                className="shrink-0 px-3 py-1 rounded-full bg-white hover:bg-pingaksh-navy text-pingaksh-navy hover:text-pingaksh-sand border border-sand-300 text-xs font-semibold transition-colors"
              >
                {card.title.split(" (")[0]}
              </Link>
            ))}
          </nav> */}
        </div>
      </div>

      {/* =====================================================================
          SECTION 3: EDITORIAL NARRATIVE & KEY METRICS BENTO (Scroll Reveal)
          Replaces centered RIL text with an asymmetric 12-column executive layout
      ===================================================================== */}
      <section
        aria-labelledby="overview-intro-heading"
        className="py-20 sm:py-28 bg-white"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column (Cols 1-5): Motto Tag & High-Contrast Statement */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-5 space-y-4 lg:sticky lg:top-36"
            >
              <span className="font-logo text-2xl sm:text-3xl text-pingaksh-terracotta block">
                {introSection.mottoTag}
              </span>
              <h2
                id="overview-intro-heading"
                className="font-logo text-2xl sm:text-4xl text-pingaksh-navy leading-snug"
              >
                {introSection.headline}
              </h2>
              <div className="h-1 w-20 bg-pingaksh-terracotta rounded-full pt-1" />
            </motion.div>

            {/* Right Column (Cols 6-12): Editorial Paragraphs + 4-Metric Grid */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="space-y-5 text-sm sm:text-base text-navy-700 leading-relaxed">
                {introSection.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* 4-Card Key Metric Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {introSection.stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="p-5 rounded-2xl bg-sand-50 border border-sand-300 flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-logo text-2xl sm:text-3xl font-bold text-pingaksh-navy block">
                        {stat.value}
                      </span>
                      <span className="font-tagline text-[10px] uppercase tracking-widest text-pingaksh-terracotta font-bold">
                        {stat.unit}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-navy-700 mt-3 block">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: PARALLAX CORPORATE PHILOSOPHY BANNER (Scroll Reveal)
          Reimagines the RIL Flag Card into a full-bleed architectural showcase
      ===================================================================== */}
      <section
        aria-labelledby="philosophy-banner-heading"
        className="relative py-20 sm:py-28 bg-pingaksh-navy overflow-hidden"
      >
        {/* Background Visual */}
        <figure className="absolute inset-0 m-0">
          <img
            src={philosophyBanner.backgroundImage}
            alt={philosophyBanner.backgroundAlt}
            width={1920}
            height={900}
            loading="lazy"
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-navy-950 via-pingaksh-navy/80 to-transparent"
          />
        </figure>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl rounded-3xl bg-white/95 backdrop-blur-md text-pingaksh-navy p-8 sm:p-12 lg:p-14 shadow-2xl border border-sand-300 space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pingaksh-terracotta text-white text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                {philosophyBanner.badge}
              </span>

              <div className="text-right">
                <span className="block text-xs font-bold uppercase tracking-wider text-pingaksh-terracotta">
                  {philosophyBanner.highlightMetric.value}
                </span>
                <span className="block text-[11px] text-navy-600">
                  {philosophyBanner.highlightMetric.label}
                </span>
              </div>
            </div>

            <h2
              id="philosophy-banner-heading"
              className="font-logo text-2xl sm:text-4xl text-pingaksh-navy leading-snug"
            >
              {philosophyBanner.title}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-navy-700 leading-relaxed">
              {philosophyBanner.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: SUB-SECTION NAVIGATION IMAGE CARDS WITH HOVER ZOOM
          Features smooth image zoom on hover + staggered scroll reveal
      ===================================================================== */}
      <section
        aria-labelledby="subsections-grid-heading"
        className="py-20 sm:py-28 bg-sand-100 border-t border-sand-300"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-14"
          >
            <h2
              id="subsections-grid-heading"
              className="font-logo text-3xl sm:text-5xl text-pingaksh-navy mt-2 tracking-wide"
            >
              {subSectionsGrid.sectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-navy-700 mt-3">
              {subSectionsGrid.sectionSubtitle}
            </p>
          </motion.div>

          {/* Bento Image Cards with Zoom-on-Hover & Scroll-Reveal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
            {subSectionsGrid.cards.map((card, idx) => {
              // Featured cards span 12 or 7 cols on desktop; standard cards span 6 or 5 cols
              const colSpanClass = card.featuredSpan
                ? "lg:col-span-12"
                : "lg:col-span-6";

              return (
                <motion.article
                  key={card.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: "easeOut",
                  }}
                  className={`${colSpanClass} group relative rounded-3xl overflow-hidden bg-pingaksh-navy shadow-lg hover:shadow-2xl border border-sand-300 min-h-[360px] sm:min-h-[420px] flex flex-col justify-end`}
                >
                  {/* Background Image with Smooth Hover Zoom Effect */}
                  <figure className="absolute inset-0 w-full h-full m-0 overflow-hidden">
                    <img
                      src={card.imageUrl}
                      alt={card.imageAlt}
                      width={1200}
                      height={750}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Multi-Stop Corporate Navy & Terracotta Hover Gradient */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/65 to-navy-950/15 group-hover:from-pingaksh-navy/95 transition-colors duration-500"
                    />
                  </figure>

                  {/* Top Badge & Floating Corner Arrow */}
                  <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between mb-auto">
                    <span className="px-3.5 py-1.5 rounded-full bg-navy-950/75 backdrop-blur-md border border-pingaksh-sand/30 text-pingaksh-sand font-tagline text-[11px] uppercase tracking-wider">
                      {card.badge}
                    </span>

                    <span className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-pingaksh-terracotta text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 group-hover:scale-105">
                      <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                    </span>
                  </div>

                  {/* Bottom Content & Pill Explore Button */}
                  <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div className="max-w-2xl space-y-2.5">
                      <h3 className="font-logo text-2xl sm:text-3xl lg:text-4xl text-white group-hover:text-pingaksh-sand transition-colors">
                        <Link
                          href={card.href}
                          title={`Explore ${card.title} at Pingaksh Renewables`}
                          className="focus:outline-none after:absolute after:inset-0"
                        >
                          {card.title}
                        </Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-sand-100/90 leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    {/* RIL-Inspired Pill Explore CTA */}
                    <div className="shrink-0">
                      <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-pingaksh-sand/60 group-hover:bg-pingaksh-sand group-hover:text-pingaksh-navy text-white text-xs sm:text-sm font-semibold transition-all duration-300">
                        <span>{card.ctaLabel || "explore"}</span>
                        <ArrowRight
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </article>
  );
}

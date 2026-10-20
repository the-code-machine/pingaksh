"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import type { HeritageTimelinePageData } from "@/data/heritageTimelineData";

interface HeritageTimelineViewProps {
  data: HeritageTimelinePageData;
}

export default function HeritageTimelineView({
  data,
}: HeritageTimelineViewProps) {
  const { breadcrumbs, hero, prologue, milestones } = data;
  const [activeYearId, setActiveYearId] = useState<string>(milestones[0].id);
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll progress bar along the central archival spine
  const { scrollYProgress } = useScroll({
    target: timelineContainerRef,
    offset: ["start 20%", "end 80%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  // Track which era section is currently in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveYearId(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0.1 },
    );

    milestones.forEach((m) => {
      const el = document.getElementById(m.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [milestones]);

  const scrollToMilestone = (id: string) => {
    setActiveYearId(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -150; // Account for fixed navbar + sticky year scrubber
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const activeIndex = milestones.findIndex((m) => m.id === activeYearId);

  const handleStep = (direction: "prev" | "next") => {
    const nextIdx =
      direction === "next"
        ? Math.min(activeIndex + 1, milestones.length - 1)
        : Math.max(activeIndex - 1, 0);
    scrollToMilestone(milestones[nextIdx].id);
  };

  // On-Page SEO JSON-LD: BreadcrumbList + Historical ItemList Schema
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
        "@type": "ItemList",
        name: "Pingaksh Group (UBHP) Corporate History & Commissioning Timeline",
        itemListElement: milestones.map((m, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: `${m.year} — ${m.headline}`,
          description: m.narrative[0],
        })),
      },
    ],
  };

  return (
    <article className="w-full bg-sand-50 text-pingaksh-navy selection:bg-pingaksh-terracotta selection:text-white">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* =====================================================================
          1. EDITORIAL ARCHIVAL HERO (Reliance "Our History" Aesthetic)
      ===================================================================== */}
      <header className="relative w-full min-h-[68vh] bg-pingaksh-navy text-white flex flex-col justify-end overflow-hidden pt-32 pb-16 sm:pb-24">
        <figure className="absolute inset-0 m-0">
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
            src={hero.backgroundImage}
            alt={hero.backgroundAlt}
            width={2000}
            height={1100}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-950 via-pingaksh-navy/75 to-navy-950/60"
          />
        </figure>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full">
          {/* Minimalist Breadcrumb Trail */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center flex-wrap gap-2 text-xs text-sand-200/80">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <li key={crumb.href} className="flex items-center gap-2">
                    {isLast ? (
                      <span
                        aria-current="page"
                        className="text-pingaksh-sand font-medium"
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <>
                        <Link
                          href={crumb.href}
                          title={`Go to ${crumb.label}`}
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-t border-white/15 pt-10">
            <div className="lg:col-span-7">
              <h1 className="font-logo text-5xl sm:text-7xl lg:text-[84px] text-white leading-[0.98] tracking-wide">
                {hero.title}
              </h1>
              <p className="font-logo text-xl sm:text-2xl text-pingaksh-sand mt-4">
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
          2. STICKY HORIZONTAL YEAR SCRUBBER (Interactive Decade Bar)
      ===================================================================== */}
      <div
        style={{ top: "var(--navbar-offset, 0px)" }}
        className="sticky  z-30 bg-navy-950/95 backdrop-blur-md text-white border-b border-white/10 shadow-lg"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
          {/* Horizontal Year Track */}
          <nav
            aria-label="Historical Timeline Years"
            className="flex items-center gap-1 sm:gap-3 overflow-x-auto no-scrollbar py-2 flex-1"
          >
            {milestones.map((item, index) => {
              const isActive = item.id === activeYearId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToMilestone(item.id)}
                  aria-current={isActive ? "step" : undefined}
                  className="group relative px-3.5 sm:px-5 py-2 flex items-center gap-3 cursor-pointer shrink-0 focus:outline-none"
                >
                  {/* Connecting horizontal line between years */}
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="hidden sm:block w-6 h-px bg-white/20 -ml-4 mr-1"
                    />
                  )}

                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-pingaksh-terracotta scale-125 ring-4 ring-pingaksh-terracotta/30"
                        : "bg-white/30 group-hover:bg-pingaksh-sand"
                    }`}
                  />

                  <div className="text-left">
                    <span
                      className={`font-logo text-base sm:text-xl block leading-none transition-colors ${
                        isActive
                          ? "text-pingaksh-sand font-bold"
                          : "text-white/60 group-hover:text-white"
                      }`}
                    >
                      {item.year}
                    </span>
                    <span className="hidden md:block text-[10px] text-sand-200/60 truncate max-w-[110px] mt-0.5">
                      {item.eraTitle}
                    </span>
                  </div>

                  {/* Active bottom bar */}
                  {isActive && (
                    <motion.span
                      layoutId="activeYearIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-pingaksh-terracotta"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Scrubber Prev / Next Step Buttons */}
          <div className="hidden sm:flex items-center gap-2 shrink-0 pl-4 border-l border-white/10">
            <span className="text-xs text-sand-200/70 mr-2 font-mono">
              0{activeIndex + 1} / 0{milestones.length}
            </span>
            <button
              type="button"
              onClick={() => handleStep("prev")}
              disabled={activeIndex === 0}
              aria-label="Previous Historical Era"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-pingaksh-sand hover:text-pingaksh-navy disabled:opacity-30 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => handleStep("next")}
              disabled={activeIndex === milestones.length - 1}
              aria-label="Next Historical Era"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-pingaksh-sand hover:text-pingaksh-navy disabled:opacity-30 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. FOUNDER'S ARCHIVAL PROLOGUE QUOTE
      ===================================================================== */}
      <section
        aria-label="Founder Historical Prologue"
        className="py-16 sm:py-24 bg-pingaksh-sand/40 border-b border-sand-300"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 text-center space-y-6">
          <blockquote className="font-logo text-2xl sm:text-4xl text-pingaksh-navy leading-relaxed">
            “{prologue.statement}”
          </blockquote>
          <div className="pt-2">
            <cite className="not-italic font-bold text-sm uppercase tracking-widest text-pingaksh-terracotta block">
              {prologue.author}
            </cite>
            <span className="text-xs text-navy-600 mt-0.5 block">
              {prologue.role}
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. MAIN CHRONOLOGICAL ARCHIVE (Alternating Editorial Spreads)
      ===================================================================== */}
      <div
        ref={timelineContainerRef}
        className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-32"
      >
        {/* Central Vertical Timeline Spine (Desktop) */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-sand-300"
        >
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="w-full h-full bg-pingaksh-terracotta"
          />
        </div>

        <div className="space-y-28 sm:space-y-40">
          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;

            return (
              <section
                key={milestone.id}
                id={milestone.id}
                aria-labelledby={`heading-${milestone.id}`}
                className="relative scroll-mt-40"
              >
                {/* Central Spine Node Marker (Desktop) */}
                <div
                  aria-hidden="true"
                  className="hidden lg:flex absolute top-12 left-1/2 -translate-x-1/2 z-20 w-11 h-11 rounded-full bg-sand-50 border-2 border-pingaksh-terracotta items-center justify-center shadow-md"
                >
                  <span className="w-3 h-3 rounded-full bg-pingaksh-navy" />
                </div>

                {/* Giant Background Watermark Year Numeral */}
                <div
                  aria-hidden="true"
                  className={`font-logo text-[110px] sm:text-[180px] lg:text-[230px] leading-none text-sand-200/70 select-none pointer-events-none -mb-10 sm:-mb-16 ${
                    isEven ? "text-left" : "lg:text-right"
                  }`}
                >
                  {milestone.year}
                </div>

                {/* 12-Column Editorial Spread */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                  {/* STORY COLUMN (Alternates Left / Right) */}
                  <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`lg:col-span-5 space-y-6 ${
                      isEven
                        ? "lg:col-start-1 lg:pr-6"
                        : "lg:col-start-8 lg:pl-6 lg:order-2"
                    }`}
                  >
                    {/* Date & Location Stamp */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-widest text-pingaksh-terracotta border-b border-sand-300 pb-3">
                      <time dateTime={milestone.isoDate}>
                        {milestone.dateStamp}
                      </time>
                      <span className="text-sand-400">·</span>
                      <span className="inline-flex items-center gap-1 text-navy-600 font-normal normal-case tracking-normal">
                        <MapPin className="w-3.5 h-3.5 text-pingaksh-terracotta" />
                        {milestone.location}
                      </span>
                    </div>

                    {/* Era Headline */}
                    <h2
                      id={`heading-${milestone.id}`}
                      className="font-logo text-2xl sm:text-4xl text-pingaksh-navy leading-snug"
                    >
                      {milestone.headline}
                    </h2>

                    {/* Editorial Narrative Paragraphs */}
                    <div className="space-y-4 font-body text-sm sm:text-base text-navy-800 leading-relaxed">
                      {milestone.narrative.map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>

                    {/* Key Engineering Callout Block */}
                    <div className="pt-4 border-t border-sand-300 flex items-baseline gap-6">
                      <div>
                        <span className="font-logo text-3xl sm:text-4xl font-bold text-pingaksh-terracotta block">
                          {milestone.keyFigure.number}
                        </span>
                        <span className="text-xs font-semibold text-navy-700 mt-1 block">
                          {milestone.keyFigure.label}
                        </span>
                      </div>
                    </div>

                    {/* Archival Technical Footnote */}
                    {milestone.archivalNote && (
                      <p className="text-xs text-navy-600 bg-sand-200/60 border-l-2 border-pingaksh-navy pl-3.5 py-2 italic">
                        {milestone.archivalNote}
                      </p>
                    )}
                  </motion.div>

                  {/* PHOTOGRAPHIC SPREAD COLUMN (Alternates Right / Left) */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                    className={`lg:col-span-6 ${
                      isEven ? "lg:col-start-7" : "lg:col-start-1 lg:order-1"
                    }`}
                  >
                    <div className="relative">
                      {/* Primary Historical Photograph */}
                      <figure className="group relative overflow-hidden bg-pingaksh-navy shadow-2xl border border-sand-300">
                        <div className="aspect-[16/10] overflow-hidden">
                          <img
                            src={milestone.primaryImage.url}
                            alt={milestone.primaryImage.alt}
                            width={1200}
                            height={750}
                            loading="lazy"
                            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        </div>
                        <figcaption className="p-4 sm:px-6 bg-white border-t border-sand-200 flex items-center justify-between gap-4 text-xs text-navy-700">
                          <span>{milestone.primaryImage.caption}</span>
                          <span className="font-mono text-[11px] font-bold text-pingaksh-terracotta shrink-0">
                            [{milestone.year}]
                          </span>
                        </figcaption>
                      </figure>

                      {/* Optional Secondary Overlapping Archival Frame */}
                      {milestone.secondaryImage && (
                        <motion.figure
                          initial={{ opacity: 0, x: isEven ? 24 : -24 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.25 }}
                          className={`mt-6 sm:mt-0 sm:w-72 lg:w-80 bg-white p-3 shadow-xl border border-sand-300 sm:absolute sm:-bottom-12 ${
                            isEven ? "sm:-left-10" : "sm:-right-10"
                          }`}
                        >
                          <div className="aspect-[4/3] overflow-hidden bg-pingaksh-navy">
                            <img
                              src={milestone.secondaryImage.url}
                              alt={milestone.secondaryImage.alt}
                              width={600}
                              height={450}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <figcaption className="pt-2.5 text-[11px] text-navy-700 leading-snug">
                            {milestone.secondaryImage.caption}
                          </figcaption>
                        </motion.figure>
                      )}
                    </div>
                  </motion.div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          5. NEXT CHAPTER CONTINUATION FOOTER (Routes to Leadership / Overview)
      ===================================================================== */}
    </article>
  );
}

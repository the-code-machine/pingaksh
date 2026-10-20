"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Zap,
  Droplets,
  Recycle,
} from "lucide-react";

interface HeroSlide {
  id: string;
  badge: string;
  headline: string;
  subheadline: string;
  imageUrl: string;
  imageAlt: string;
  statLabel: string;
  statValue: string;
  primaryCta: { label: string; href: string; title: string };
  secondaryCta: { label: string; href: string; title: string };
  icon: React.ElementType;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "hydro-power",
    badge: "Run-of-the-River Hydroelectric Infrastructure",
    headline: "Harnessing Himalayan Currents for Clean Grid Power",
    subheadline:
      "Operating Sarju I, II & III hydro power projects with high-efficiency Francis Turbines, delivering zero-emission baseload electricity across Northern India.",
    imageUrl:
      "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=2000&q=85",
    imageAlt:
      "Pingaksh Renewables Sarju Run-of-the-River Hydroelectric Power Dam and Turbine Infrastructure",
    statLabel: "Operational Hydro Assets",
    statValue: "Sarju I, II & III",
    primaryCta: {
      label: "Explore Hydro Projects",
      href: "/our-businesses/hydro-power",
      title: "View Sarju I, II, and III Hydroelectric Power Specifications",
    },
    secondaryCta: {
      label: "Our Heritage Timeline",
      href: "/who-we-are/heritage-timeline",
      title: "Explore UBHP to Pingaksh Renewables Milestone Timeline",
    },
    icon: Droplets,
  },
  {
    id: "ethanol-bioenergy",
    badge: "Green Fuels & E20 Bio-Energy",
    headline: "250 KLPD Grain-Based Bio-Ethanol Distillery",
    subheadline:
      "Accelerating India's E20 fuel blending mandate through state-of-the-art grain distillation, reducing crude oil imports and vehicular tailpipe emissions.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=85",
    imageAlt:
      "Pingaksh Group 250 KLPD Grain-Based Bio-Ethanol Distillery Plant and Processing Columns",
    statLabel: "Bio-Ethanol Capacity",
    statValue: "250 KLPD (E20)",
    primaryCta: {
      label: "Green Fuels & Bio-Energy",
      href: "/our-businesses/green-fuels-ethanol",
      title: "Learn about our 250 KLPD Grain-Based Ethanol Distillery",
    },
    secondaryCta: {
      label: "E20 Emission Impact",
      href: "/sustainability/e20-ethanol-impact",
      title: "Compare E20 Ethanol vs Pure Petrol Carbon Emissions",
    },
    icon: Zap,
  },
  {
    id: "circular-economy",
    badge: "100% Zero-Liquid Discharge & Circular Economy",
    headline: "Turning Every By-Product into Sustainable Value",
    subheadline:
      "Integrating high-protein DDGS animal nutrition, industrial CO₂ capture & dry ice bottling, and 100% water recycling across all plant operations.",
    imageUrl:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2000&q=85",
    imageAlt:
      "Pingaksh Renewables Sustainable Clean Energy Landscape and Circular Economy Operations",
    statLabel: "Effluent Compliance",
    statValue: "100% ZLD Plant",
    primaryCta: {
      label: "Circular Economy Model",
      href: "/our-businesses/circular-economy",
      title: "Discover DDGS and CO2 Bottling Circular Economy Operations",
    },
    secondaryCta: {
      label: "Live Carbon Dashboard",
      href: "/sustainability/carbon-dashboard",
      title: "Open Real-Time CO2 Offset and Sustainability Ticker",
    },
    icon: Recycle,
  },
];

const SLIDE_DURATION_MS = 6500;

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
    );
  }, []);

  // Automatic slide changing timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const activeSlide = HERO_SLIDES[currentIndex];
  const ActiveIcon = activeSlide.icon;

  return (
    <section
      aria-label="Pingaksh Renewables Corporate Highlights"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-screen h-screen min-h-[700px] overflow-hidden bg-pingaksh-navy select-none"
    >
      {/* =========================================================
          1. SEO PRIMARY H1 (Crawlable by Search Engines at all times)
      ========================================================= */}
      <h1 className="sr-only">
        Pingaksh Renewables (Pingaksh Group) — Run-of-the-River Hydroelectric
        Power (Sarju I, II, III) &amp; 250 KLPD Grain-Based Bio-Ethanol
        Distillery in India
      </h1>

      {/* =========================================================
          2. FULL-SCREEN BACKGROUND IMAGE CROSS-FADE + PERMANENT KEN BURNS ZOOM
      ========================================================= */}
      <AnimatePresence mode="sync">
        <motion.figure
          key={activeSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2, ease: "easeInOut" },
          }}
          className="absolute inset-0 w-full h-full m-0 overflow-hidden"
        >
          {/* Permanent looping zoom-in and zoom-out illusion */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.12 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="w-full h-full"
          >
            <img
              src={activeSlide.imageUrl}
              alt={activeSlide.imageAlt}
              width={2000}
              height={1125}
              loading={currentIndex === 0 ? "eager" : "lazy"}
              fetchPriority={currentIndex === 0 ? "high" : "auto"}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          {/* Multi-Layer Corporate Readability Overlays (Ensures Navbar & Text Contrast) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-pingaksh-navy/75 to-navy-950/35 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/60 pointer-events-none"
          />
        </motion.figure>
      </AnimatePresence>

      {/* =========================================================
          3. FOREGROUND TEXT & CTA CONTENT (Positioned below fixed Navbar)
      ========================================================= */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-full flex flex-col justify-between pt-36 sm:pt-40 pb-10 sm:pb-14">
        {/* Center-Left Animated Slide Copy */}
        <div className="my-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="space-y-5 sm:space-y-6"
            >
              {/* Pill Tagline Badge */}

              {/* Visual Display Headline (Uses h2 so H1 stays unique for SEO) */}
              <h2 className="font-logo text-3xl sm:text-5xl lg:text-6xl xl:text-[64px] text-white leading-[1.1] tracking-wide">
                {activeSlide.headline}
              </h2>

              {/* Body Description */}
              <p className="font-body text-sm sm:text-base lg:text-lg text-sand-100/90 max-w-2xl leading-relaxed">
                {activeSlide.subheadline}
              </p>

              {/* RIL-Inspired Pill Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
                <Link
                  href={activeSlide.primaryCta.href}
                  title={activeSlide.primaryCta.title}
                  className="inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 rounded-full bg-pingaksh-terracotta hover:bg-terracotta-600 text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-lg group"
                >
                  <span>{activeSlide.primaryCta.label}</span>
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  href={activeSlide.secondaryCta.href}
                  title={activeSlide.secondaryCta.title}
                  className="inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 rounded-full bg-white/10 hover:bg-pingaksh-sand text-white hover:text-pingaksh-navy backdrop-blur-sm border border-pingaksh-sand/50 font-semibold text-xs sm:text-sm transition-all duration-200 group"
                >
                  <span>{activeSlide.secondaryCta.label}</span>
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* =========================================================
            4. BOTTOM SLIDE PROGRESS INDICATORS & CONTROLS
        ========================================================= */}
        <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Interactive Slide Tabs with Progress Bar */}
          <div
            role="tablist"
            aria-label="Select Hero Highlight Slide"
            className="grid grid-cols-3 gap-3 sm:gap-6 w-full sm:w-auto flex-1 max-w-2xl"
          >
            {HERO_SLIDES.map((slide, index) => {
              const isCurrent = index === currentIndex;
              return (
                <button
                  key={slide.id}
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`Show slide ${index + 1}: ${slide.statValue}`}
                  onClick={() => setCurrentIndex(index)}
                  className="text-left group cursor-pointer focus:outline-none"
                >
                  {/* Animated Progress Track */}
                  <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden mb-2.5">
                    {isCurrent && (
                      <motion.div
                        key={`progress-${slide.id}-${isPaused}`}
                        initial={{ width: "0%" }}
                        animate={{ width: isPaused ? "0%" : "100%" }}
                        transition={{
                          duration: isPaused ? 0 : SLIDE_DURATION_MS / 1000,
                          ease: "linear",
                        }}
                        className="h-full bg-pingaksh-sand"
                      />
                    )}
                  </div>

                  <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-sand-200/70 group-hover:text-sand-200 transition-colors truncate">
                    0{index + 1}. {slide.statLabel}
                  </span>
                  <span
                    className={`block text-xs sm:text-sm font-bold mt-0.5 truncate transition-colors ${
                      isCurrent
                        ? "text-pingaksh-sand"
                        : "text-white/75 group-hover:text-white"
                    }`}
                  >
                    {slide.statValue}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Live Sustainability Badge + Prev/Next Arrows */}
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
            <Link
              href="/sustainability/carbon-dashboard"
              title="Open Live Carbon Offset Ticker"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-navy-950/70 backdrop-blur-md border border-white/15 hover:border-emerald-400/50 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Leaf
                className="w-3.5 h-3.5 text-emerald-400"
                aria-hidden="true"
              />
              <span className="text-xs font-medium text-sand-100">
                Live CO₂ Offset Active
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous Hero Slide"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-pingaksh-sand text-white hover:text-pingaksh-navy border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next Hero Slide"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-pingaksh-sand text-white hover:text-pingaksh-navy border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

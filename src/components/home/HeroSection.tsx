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
    badge: "Clean Hydroelectric Generation",
    headline: "Harnessing Himalayan Runoff for Baselaod Green Power",
    subheadline:
      "Operating utility-scale run-of-the-river hydro assets across the Sarju basin, feeding reliable, zero-emission electricity directly into the Northern Regional Grid.",
    imageUrl:
      "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/_MG_3694_9f3b157b.webp",
    imageAlt:
      "Pingaksh Renewables Sarju Run-of-the-River Hydroelectric Power Dam and Turbine Infrastructure",
    statLabel: "Operational Hydro",
    statValue: "Sarju I, II & III",
    primaryCta: {
      label: "Explore Hydro Assets",
      href: "/our-businesses/hydro-power",
      title: "View Sarju I, II, and III Hydroelectric Power Specifications",
    },
    secondaryCta: {
      label: "Company Heritage",
      href: "/who-we-are/heritage-timeline",
      title: "Explore UBHP to Pingaksh Renewables Milestone Timeline",
    },
    icon: Droplets,
  },
  {
    id: "ethanol-bioenergy",
    badge: "Sustainable Bio-Energy & Green Mobility",
    headline: "Pioneering India's Biofuel Independence",
    subheadline:
      "Empowering national fuel self-reliance through our modern 250 KLPD grain-based distillery, accelerating the national E20 mandate while displacing crude oil imports.",
    imageUrl:
      "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/_MG_3176_f4afd809.webp",
    imageAlt:
      "Pingaksh Group 250 KLPD Grain-Based Bio-Ethanol Distillery Plant and Processing Columns",
    statLabel: "Bio-Ethanol Capacity",
    statValue: "250 KLPD (E20)",
    primaryCta: {
      label: "Explore Green Fuels",
      href: "/our-businesses/green-fuels-ethanol",
      title: "Learn about our 250 KLPD Grain-Based Ethanol Distillery",
    },
    secondaryCta: {
      label: "Lifecycle Carbon Impact",
      href: "/sustainability/e20-ethanol-impact",
      title: "Compare E20 Ethanol vs Pure Petrol Carbon Emissions",
    },
    icon: Zap,
  },
  {
    id: "circular-economy",
    badge: "Resource Efficiency & Zero-Waste",
    headline: "Engineering a Closed-Loop Bio-Industrial Ecosystem",
    subheadline:
      "Extracting full commercial value across the lifecycle with high-protein DDGS animal feed, industrial CO₂ liquefaction, and complete Zero-Liquid Discharge compliance.",
    imageUrl:
      "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/_MG_3649_1fe1a60c.webp",
    imageAlt:
      "Pingaksh Renewables Sustainable Clean Energy Landscape and Circular Economy Operations",
    statLabel: "Environmental Standard",
    statValue: "100% ZLD Mandate",
    primaryCta: {
      label: "Circular Economy",
      href: "/our-businesses/circular-economy",
      title: "Discover DDGS and CO2 Bottling Circular Economy Operations",
    },
    secondaryCta: {
      label: "Sustainability Dashboard",
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
          {/* Crisp Enterprise Vignette (Clear visuals on right, high contrast text on left) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-transparent pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-navy-950/60 pointer-events-none"
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

              {/* Visual Display Headline (Retains your requested font) */}
              <h2 className="font-logo text-3xl sm:text-5xl lg:text-6xl xl:text-[62px] text-white leading-[1.12] tracking-wide">
                {activeSlide.headline}
              </h2>

              {/* Enterprise Structured Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  href={activeSlide.primaryCta.href}
                  title={activeSlide.primaryCta.title}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md bg-pingaksh-terracotta hover:bg-terracotta-600 text-white font-medium text-xs sm:text-sm transition-all duration-200 shadow-md group"
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
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 font-medium text-xs sm:text-sm transition-all duration-200 group"
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
      </div>
    </section>
  );
}

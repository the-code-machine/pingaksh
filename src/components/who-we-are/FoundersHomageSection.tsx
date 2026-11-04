"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import {
  FOUNDERS_HOMAGE_DATA,
  type FoundersHomageData,
} from "@/data/foundersHomageData";

const transitionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface FoundersHomageSectionProps {
  data?: FoundersHomageData;
}

export default function FoundersHomageSection({
  data = FOUNDERS_HOMAGE_DATA,
}: FoundersHomageSectionProps) {
  const { memorialTribute, torchbearerSpotlight } = data;

  return (
    <section
      aria-labelledby="founders-homage-heading"
      className="w-full bg-sand-100 text-pingaksh-navy py-20 sm:py-28 border-b border-sand-300 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-20 sm:space-y-28">
        {/* ===================================================================
            PART 1: MEMORIAL HOMAGE TO LATE SHRI HANS RAJ GOEL & SMT. SANTOSH DEVI
        =================================================================== */}
        <div className="max-w-5xl mx-auto">
          {/* Top Ornamental Crest & Centered Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: transitionEase }}
            className="text-center space-y-3 mb-12 sm:mb-14"
          >
            <span className="block font-tagline text-xs uppercase tracking-[0.22em] text-pingaksh-terracotta font-bold">
              {memorialTribute.sectionEyebrow}
            </span>

            <h2
              id="founders-homage-heading"
              className="font-logo text-4xl sm:text-5xl lg:text-6xl text-pingaksh-navy tracking-wide"
            >
              {memorialTribute.heading}
            </h2>
          </motion.div>

          {/* Dual Memorial Portrait Frame (Styled after Reference Image) */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: transitionEase }}
            className="rounded-3xl bg-white border-2 border-sand-300 shadow-2xl overflow-hidden p-6 sm:p-10 lg:p-12"
          >
            {/* Framed Side-by-Side Portraits */}
            <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 rounded-2xl overflow-hidden border border-sand-300 shadow-lg bg-navy-950">
              {memorialTribute.honorees.map((person, idx) => (
                <figure
                  key={person.id}
                  className={`relative aspect-[4/5] m-0 overflow-hidden group ${
                    idx === 0 ? "sm:border-r border-white/15" : ""
                  }`}
                >
                  <img
                    src={person.portraitUrl}
                    alt={person.portraitAlt}
                    width={600}
                    height={750}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-103"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/15 to-transparent"
                  />
                  <figcaption className="absolute bottom-0 inset-x-0 p-5 text-center">
                    <span className="block font-tagline text-[10px] uppercase tracking-[0.18em] text-pingaksh-sand font-semibold">
                      {person.titleTag}
                    </span>
                    <strong className="font-logo text-xl sm:text-2xl text-white mt-0.5 block">
                      {person.name}
                    </strong>
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* Tribute Typography Block */}
            <div className="max-w-3xl mx-auto mt-10 sm:mt-12 text-center space-y-5">
              <p className="font-logo text-xl sm:text-2xl text-pingaksh-navy leading-relaxed">
                {memorialTribute.leadTribute}
              </p>

              <div
                aria-hidden="true"
                className="w-20 h-[2px] bg-pingaksh-terracotta mx-auto"
              />

              <p className="font-body text-sm sm:text-base text-navy-700 leading-relaxed">
                {memorialTribute.bodyTribute}
              </p>
            </div>

            {/* 3 Foundational Values Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 pt-10 border-t border-sand-200">
              {memorialTribute.guidingPillars.map((pillar, idx) => (
                <div
                  key={pillar.title}
                  className="p-5 rounded-2xl bg-sand-50 border border-sand-200 text-left"
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-logo text-lg text-pingaksh-navy font-bold">
                      {pillar.title}
                    </h3>
                    <span className="font-logo text-sm text-pingaksh-terracotta font-bold">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs text-navy-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ===================================================================
            PART 2: TORCHBEARER SPOTLIGHT — MR. NARESH GOEL
        =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: transitionEase }}
          className="rounded-3xl bg-pingaksh-navy text-white border border-white/10 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Left Portrait Column (Cols 1-5) */}
          <figure className="lg:col-span-5 relative aspect-[4/4.8] lg:aspect-auto m-0 bg-navy-950 overflow-hidden">
            <img
              src={torchbearerSpotlight.portraitUrl}
              alt={torchbearerSpotlight.portraitAlt}
              width={800}
              height={960}
              className="w-full h-full object-cover object-top"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent lg:hidden"
            />
          </figure>

          {/* Right Narrative Column (Cols 6-12) */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="border-b border-white/15 pb-5">
                <span className="font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-sand font-bold block">
                  {torchbearerSpotlight.eyebrow}
                </span>
                <h3 className="font-logo text-3xl sm:text-5xl text-white mt-2">
                  {torchbearerSpotlight.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-pingaksh-sand/90 mt-1">
                  {torchbearerSpotlight.designation}
                </p>
              </div>

              <p className="font-body text-sm sm:text-base text-sand-100/95 leading-relaxed">
                {torchbearerSpotlight.leadParagraph}
              </p>

              <p className="font-body text-sm sm:text-base text-sand-200/80 leading-relaxed">
                {torchbearerSpotlight.secondaryParagraph}
              </p>

              <blockquote className="p-6 rounded-2xl bg-white/5 border-l-4 border-pingaksh-sand text-pingaksh-sand font-logo text-lg sm:text-xl leading-relaxed">
                &ldquo;{torchbearerSpotlight.visionQuote}&rdquo;
              </blockquote>
            </div>

            <div className="pt-4 border-t border-white/15 flex items-center justify-between">
              <span className="text-xs font-mono text-sand-200/70">
                Pingaksh Group · Leadership Continuum
              </span>

              <Link
                href={torchbearerSpotlight.ctaHref}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pingaksh-sand hover:bg-white text-pingaksh-navy text-xs sm:text-sm font-bold transition-all"
              >
                <span>{torchbearerSpotlight.ctaLabel}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

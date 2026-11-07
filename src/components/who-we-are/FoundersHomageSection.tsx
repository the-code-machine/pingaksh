"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
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
        {/* =========================================================
            PART 1: MEMORIAL HOMAGE TO FOUNDERS
        ========================================================= */}

        <div className="max-w-5xl mx-auto">
          {/* Centered Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              ease: transitionEase,
            }}
            className="text-center space-y-3 mb-12 sm:mb-14"
          >
            <span className="block font-tagline text-xs uppercase tracking-[0.22em] text-pingaksh-terracotta font-bold">
              {memorialTribute.sectionEyebrow}
            </span>
          </motion.div>

          {/* Single Combined Memorial Image */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: transitionEase,
            }}
            className="rounded-3xl bg-white border-2 border-sand-300 shadow-2xl overflow-hidden p-6 sm:p-10 lg:p-12"
          >
            <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-sand-300 shadow-lg bg-navy-950">
              <img
                src="https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/uploads/media/ChatGPT_Image_Nov_7__2026__05_18_31_PM_26996a58.png"
                alt="Late Shri Hans Raj Goel and Smt. Santosh Devi"
                width={1200}
                height={900}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
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

        {/* Memorial Section Heading */}
        <h2
          id="founders-homage-heading"
          className="font-logo text-4xl sm:text-5xl lg:text-6xl text-pingaksh-navy text-center tracking-wide"
        >
          {memorialTribute.heading}
        </h2>

        {/* =========================================================
            PART 2: TORCHBEARER SPOTLIGHT — MR. NARESH GOEL
        ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.8,
            ease: transitionEase,
          }}
          className="rounded-3xl bg-pingaksh-navy text-white border border-white/10 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Left Portrait Column */}
          <figure className="lg:col-span-5 relative aspect-[4/4.8] lg:aspect-auto m-0 bg-navy-950 overflow-hidden">
            <img
              src={torchbearerSpotlight.portraitUrl}
              alt={torchbearerSpotlight.portraitAlt}
              width={800}
              height={960}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent lg:hidden"
            />
          </figure>

          {/* Right Narrative Column */}
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

            {/* Footer and CTA */}
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

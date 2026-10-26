"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  FileText,
  Users,
} from "lucide-react";
import { HOME_SECONDARY_DATA } from "@/data/homeSecondaryData";

// Premium Enterprise Easing Curve (Smooth deceleration)
const transitionEase = [0.22, 1, 0.36, 1] as const;

export default function HomeCorporateSections() {
  const { foundationWhoWeAre, announcementsSection, investorsSection } =
    HOME_SECONDARY_DATA;

  // =================================================================
  // STATE 1: Auto-Cycling Slideshow for Foundation / Who We Are Section
  // =================================================================
  const [foundationSlideIdx, setFoundationSlideIdx] = useState(0);
  const [pauseFoundation, setPauseFoundation] = useState(false);

  const nextFoundationSlide = useCallback(() => {
    setFoundationSlideIdx(
      (prev) => (prev + 1) % foundationWhoWeAre.slides.length,
    );
  }, [foundationWhoWeAre.slides.length]);

  // FIX: Slowed to 6 seconds for readable, corporate pacing
  useEffect(() => {
    if (pauseFoundation) return;
    const timer = setInterval(nextFoundationSlide, 6000);
    return () => clearInterval(timer);
  }, [pauseFoundation, nextFoundationSlide]);

  const activeFoundationSlide = foundationWhoWeAre.slides[foundationSlideIdx];

  // =================================================================
  // STATE 2: Active Corporate Announcement Switcher
  // =================================================================
  const [activeAnnouncementIdx, setActiveAnnouncementIdx] = useState(0);
  const activeAnnouncement = announcementsSection.items[activeAnnouncementIdx];

  // =================================================================
  // STATE 3: Investor Document Fiscal Year Filter
  // =================================================================
  const [selectedFy, setSelectedFy] = useState<string>("ALL");

  const filteredDocuments =
    selectedFy === "ALL"
      ? investorsSection.documents.slice(0, 3)
      : investorsSection.documents.filter(
          (doc) => doc.fiscalYear === selectedFy,
        );

  return (
    <div className="w-full overflow-hidden">
      {/* =====================================================================
          SECTION 1: CORPORATE FOUNDATION -> "WHO WE ARE" GATEWAY
      ===================================================================== */}

      {/* =====================================================================
          SECTION 2: INVESTORS & STATUTORY GOVERNANCE SECTION
      ===================================================================== */}
      <section
        aria-labelledby="investors-section-heading"
        className="bg-pingaksh-navy text-white py-24 sm:py-32 border-t border-white/10 relative"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-white/15">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: transitionEase }}
            >
              <h2
                id="investors-section-heading"
                className="font-logo text-4xl sm:text-6xl text-white tracking-wide"
              >
                {investorsSection.sectionTitle}
              </h2>
            </motion.div>

            {/* Interactive Fiscal Year Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: transitionEase }}
              className="flex flex-wrap items-center gap-2"
            >
              <button
                onClick={() => setSelectedFy("ALL")}
                className={`px-5 py-2.5 rounded-md text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedFy === "ALL"
                    ? "bg-pingaksh-sand text-pingaksh-navy shadow-md"
                    : "bg-white/5 hover:bg-white/10 border border-white/10 text-sand-100"
                }`}
              >
                Latest Releases
              </button>
              {investorsSection.fiscalYears.map((fy) => (
                <button
                  key={fy}
                  onClick={() => setSelectedFy(fy)}
                  className={`px-5 py-2.5 rounded-md text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    selectedFy === fy
                      ? "bg-pingaksh-sand text-pingaksh-navy shadow-md"
                      : "bg-white/5 hover:bg-white/10 border border-white/10 text-sand-100"
                  }`}
                >
                  {fy}
                </button>
              ))}
            </motion.div>
          </div>

          {/* 3-Column Corporate Investor Layout with Staggered Entrance */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pt-14">
            {/* Column 1: Statutory Notices */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: transitionEase }}
              className="lg:col-span-4 lg:border-r lg:border-white/15 lg:pr-8 flex flex-col justify-between space-y-8"
            >
              <div className="space-y-8">
                <h3 className="font-logo text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  {investorsSection.noticesHeading}
                </h3>

                <ul className="space-y-6">
                  {investorsSection.notices.map((notice) => (
                    <li
                      key={notice.id}
                      className="group border-b border-white/10 pb-6 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-center justify-between font-tagline text-[10px] font-bold tracking-widest uppercase text-pingaksh-sand mb-2.5">
                        <time dateTime={notice.isoDate}>{notice.date}</time>
                        <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-sand-200">
                          {notice.referenceCode}
                        </span>
                      </div>
                      <Link
                        href={notice.href}
                        className="font-body text-sm sm:text-base text-sand-100/90 group-hover:text-pingaksh-sand transition-colors leading-relaxed block"
                      >
                        {notice.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={investorsSection.noticesCta.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-pingaksh-sand/30 hover:border-pingaksh-sand hover:bg-pingaksh-sand text-white hover:text-pingaksh-navy text-sm font-semibold transition-all self-start"
              >
                <span>{investorsSection.noticesCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Column 2: Investor Documents */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: transitionEase }}
              className="lg:col-span-4 lg:px-4 flex flex-col justify-between space-y-8"
            >
              <div className="space-y-8">
                <h3 className="font-logo text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  {investorsSection.documentsHeading}
                </h3>

                <div className="space-y-4">
                  {filteredDocuments.map((doc) => (
                    <Link
                      key={doc.id}
                      href={doc.href}
                      className="group flex items-start gap-4 p-5 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 hover:border-pingaksh-sand/40 transition-all"
                    >
                      <div className="w-12 h-14 rounded bg-pingaksh-terracotta/90 text-white flex flex-col items-center justify-center shrink-0 shadow-md">
                        <FileText className="w-5 h-5" />
                        <span className="text-[9px] font-bold uppercase mt-1">
                          PDF
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="font-tagline text-[10px] font-bold uppercase tracking-widest text-pingaksh-sand block mb-1">
                          {doc.fiscalYear}{" "}
                          <span className="opacity-50 px-1">|</span>{" "}
                          {doc.fileSize}
                        </span>
                        <h4 className="font-body text-sm font-semibold text-white group-hover:text-pingaksh-sand transition-colors leading-snug">
                          {doc.title}
                        </h4>
                        <span className="block font-body text-xs text-sand-200/60 mt-1.5">
                          Released: {doc.releaseDate}
                        </span>
                      </div>
                      <Download className="w-4 h-4 text-sand-300/50 group-hover:text-white shrink-0 mt-1 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href={investorsSection.documentsCta.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-pingaksh-sand/30 hover:border-pingaksh-sand hover:bg-pingaksh-sand text-white hover:text-pingaksh-navy text-sm font-semibold transition-all self-start"
              >
                <span>{investorsSection.documentsCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Column 3: Market Benchmark Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.3, ease: transitionEase }}
              className="lg:col-span-4 space-y-6"
            >
              {investorsSection.marketTrackers.map((tracker) => (
                <div
                  key={tracker.id}
                  className="rounded-xl bg-navy-950/60 backdrop-blur-sm border border-white/15 p-7 space-y-5 shadow-lg hover:border-white/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-logo text-xl sm:text-2xl font-bold text-white tracking-wide">
                        {tracker.exchange}
                      </h4>
                      <p className="font-body text-[11px] text-sand-200/60 mt-1">
                        {tracker.asOfDate}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 font-tagline text-[10px] font-bold uppercase tracking-wider">
                      Active
                    </span>
                  </div>

                  <div className="py-3">
                    <svg
                      viewBox="0 0 240 56"
                      fill="none"
                      className="w-full h-12"
                    >
                      <path
                        d="M4 44L45 36L85 40L128 24L170 28L215 10L236 14"
                        stroke="#34d399"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M224 8L236 14L228 24"
                        stroke="#34d399"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-baseline justify-between flex-wrap gap-2">
                    <div>
                      <span className="font-logo text-2xl sm:text-3xl font-bold text-white tracking-wide">
                        {tracker.price}
                      </span>
                      <span className="ml-2 font-body text-sm font-semibold text-emerald-400">
                        ↑ {tracker.change}
                      </span>
                    </div>
                    <div className="text-right font-body text-xs text-sand-200/70">
                      <span className="uppercase tracking-wide">
                        {tracker.volumeLabel}:{" "}
                      </span>
                      <strong className="text-white ml-1">
                        {tracker.volumeValue}
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

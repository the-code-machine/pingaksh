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
      <section
        aria-labelledby="foundation-whoweare-heading"
        onMouseEnter={() => setPauseFoundation(true)}
        onMouseLeave={() => setPauseFoundation(false)}
        className="bg-sand-100 py-24 sm:py-32 border-t border-sand-300 text-pingaksh-navy"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: transitionEase }}
            className="rounded-xl bg-white border border-sand-300 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Left (Cols 1-6): Auto-Transitioning Visual Heritage Gallery */}
            <div className="lg:col-span-6 relative min-h-[500px] sm:min-h-[640px] bg-navy-950 overflow-hidden order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFoundationSlide.id}
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
                    src={activeFoundationSlide.imageUrl}
                    alt={activeFoundationSlide.imageAlt}
                    className="w-full h-full object-cover origin-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />

                  {/* Bottom Slide Caption - Staggered Reveal */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2,
                        ease: transitionEase,
                      }}
                      className="space-y-3"
                    >
                      <h3 className="font-logo text-3xl sm:text-4xl text-white tracking-wide">
                        {activeFoundationSlide.title}
                      </h3>
                      <p className="font-body text-sm sm:text-base text-sand-100/90 leading-relaxed max-w-lg">
                        {activeFoundationSlide.caption}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Top Era Pill + Slide Indicators */}
              <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 bg-navy-950/70 backdrop-blur-md px-4 py-2 rounded-md border border-white/10">
                  {foundationWhoWeAre.slides.map((s, idx) => {
                    const isActive = idx === foundationSlideIdx;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setFoundationSlideIdx(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer overflow-hidden ${
                          isActive
                            ? "w-10 bg-white/20"
                            : "w-2.5 bg-white/30 hover:bg-white/60"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: pauseFoundation ? "0%" : "100%" }}
                            transition={{
                              duration: pauseFoundation ? 0 : 6,
                              ease: "linear",
                            }}
                            className="h-full bg-pingaksh-sand"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right (Cols 7-12): Who We Are Narrative + Direct Sub-Page Cards */}
            <div className="lg:col-span-6 p-10 sm:p-14 flex flex-col justify-between order-1 lg:order-2">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-tagline uppercase tracking-[0.2em] text-pingaksh-terracotta font-bold">
                  <Users className="w-4 h-4" />
                  <span>{foundationWhoWeAre.eyebrow}</span>
                </div>

                <h2
                  id="foundation-whoweare-heading"
                  className="font-logo text-3xl sm:text-5xl text-pingaksh-navy leading-[1.15]"
                >
                  {foundationWhoWeAre.title}
                </h2>

                <p className="font-body text-sm sm:text-base text-navy-700 leading-relaxed">
                  {foundationWhoWeAre.description}
                </p>

                {/* 2x2 Direct Gateway Grid */}
                <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {foundationWhoWeAre.gatewayLinks.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: idx * 0.1,
                        ease: transitionEase,
                      }}
                    >
                      <Link
                        href={item.href}
                        className="group p-5 rounded-md bg-sand-50 hover:bg-pingaksh-navy border border-sand-300 hover:border-pingaksh-navy transition-all duration-300 flex flex-col justify-between h-full"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-tagline text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-sand-200 group-hover:bg-white/15 text-pingaksh-terracotta group-hover:text-pingaksh-sand transition-colors">
                            {item.badge}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-navy-400 group-hover:text-pingaksh-sand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>

                        <div className="mt-4">
                          <h4 className="text-base font-bold text-pingaksh-navy group-hover:text-white transition-colors">
                            {item.title}
                          </h4>
                          <p className="font-body text-xs text-navy-600 group-hover:text-sand-200/85 mt-1.5 line-clamp-2 transition-colors">
                            {item.subtitle}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Bottom CTA Buttons */}
              <div className="pt-8 mt-8 border-t border-sand-200 flex flex-wrap items-center gap-4">
                <Link
                  href={foundationWhoWeAre.primaryCta.href}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-pingaksh-terracotta hover:bg-terracotta-600 text-white text-sm font-semibold transition-all shadow-md group"
                >
                  <span>{foundationWhoWeAre.primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={foundationWhoWeAre.secondaryCta.href}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md border-2 border-pingaksh-navy hover:bg-pingaksh-navy text-pingaksh-navy hover:text-white text-sm font-bold transition-all"
                >
                  <span>{foundationWhoWeAre.secondaryCta.label}</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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

      {/* =====================================================================
          SECTION 3: CORPORATE ANNOUNCEMENTS SECTION
      ===================================================================== */}
      <section
        aria-labelledby="announcements-section-heading"
        className="bg-white py-24 sm:py-32 text-pingaksh-navy border-t-[12px] border-pingaksh-sand"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: transitionEase }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-sand-200"
          >
            <h2
              id="announcements-section-heading"
              className="font-logo text-4xl sm:text-5xl lg:text-6xl text-pingaksh-navy tracking-wide"
            >
              {announcementsSection.sectionTitle}
            </h2>
            <Link
              href={announcementsSection.allPressHref}
              className="inline-flex items-center gap-2 text-sm font-bold text-pingaksh-terracotta hover:text-pingaksh-navy transition-colors group pb-1"
            >
              <span>{announcementsSection.allPressLabel}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-14">
            {/* Left: Featured Announcement Data */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-10">
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeAnnouncement.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: transitionEase }}
                  className="space-y-6"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-sand-100 border border-sand-200 font-tagline text-[10px] font-bold uppercase tracking-widest text-pingaksh-terracotta">
                    {activeAnnouncement.visualBadge}
                  </div>

                  <h3 className="font-logo text-2xl sm:text-3xl lg:text-4xl font-bold text-pingaksh-navy leading-snug">
                    <Link
                      href={activeAnnouncement.href}
                      className="hover:text-pingaksh-terracotta transition-colors group"
                    >
                      {activeAnnouncement.headline}
                      <ArrowUpRight className="inline-block w-6 h-6 ml-2 text-pingaksh-terracotta opacity-0 -translate-y-2 -translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </h3>

                  <p className="font-body text-base text-navy-600 leading-relaxed">
                    {activeAnnouncement.summary}
                  </p>

                  <div className="pt-5 border-t border-sand-200 flex items-center gap-4 font-tagline text-[11px] font-bold tracking-widest uppercase text-navy-500">
                    <span className="text-pingaksh-terracotta">
                      {activeAnnouncement.category}
                    </span>
                    <span className="text-sand-300">|</span>
                    <time dateTime={activeAnnouncement.isoDate}>
                      {activeAnnouncement.date}
                    </time>
                  </div>
                </motion.article>
              </AnimatePresence>

              {/* Bottom Switcher Tabs */}
              <div className="space-y-3">
                <span className="block font-tagline text-[10px] font-bold uppercase tracking-widest text-navy-400">
                  Recent Releases ({announcementsSection.items.length})
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {announcementsSection.items.map((item, idx) => {
                    const isSelected = idx === activeAnnouncementIdx;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveAnnouncementIdx(idx)}
                        className={`p-4 rounded-md border text-left transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-pingaksh-navy text-white border-pingaksh-navy shadow-md scale-[1.02]"
                            : "bg-sand-50 hover:bg-sand-100 text-pingaksh-navy border-sand-200 hover:border-sand-300"
                        }`}
                      >
                        <time
                          className={`block font-tagline text-[9px] font-bold uppercase tracking-wider mb-2 ${
                            isSelected
                              ? "text-pingaksh-sand"
                              : "text-pingaksh-terracotta"
                          }`}
                        >
                          {item.date}
                        </time>
                        <span className="block font-body text-xs font-semibold line-clamp-2 leading-tight">
                          {item.visualBadge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Featured Announcement Image */}
            <div className="lg:col-span-7 h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAnnouncement.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: transitionEase }}
                  className="relative overflow-hidden rounded-xl h-full min-h-[400px] lg:min-h-[550px] bg-navy-950 shadow-xl border border-sand-200"
                >
                  <motion.img
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={activeAnnouncement.imageUrl}
                    alt={activeAnnouncement.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

                  <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                    <time className="inline-flex items-center px-4 py-2 rounded bg-white/95 text-pingaksh-navy font-tagline text-[10px] font-bold uppercase tracking-widest shadow-sm">
                      {activeAnnouncement.date}
                    </time>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

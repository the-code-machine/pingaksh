"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calendar,
  ChevronRight,
  Download,
  FileSpreadsheet,
  FileText,
  Handshake,
  Landmark,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { HOME_SECONDARY_DATA } from "@/data/homeSecondaryData";

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

  useEffect(() => {
    if (pauseFoundation) return;
    const timer = setInterval(nextFoundationSlide, 4200);
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
          Auto-transitioning visual showcase + 4 direct Who We Are sub-page cards
      ===================================================================== */}
      <section
        aria-labelledby="foundation-whoweare-heading"
        onMouseEnter={() => setPauseFoundation(true)}
        onMouseLeave={() => setPauseFoundation(false)}
        className="bg-sand-100 py-20 sm:py-28 border-t border-sand-300 text-pingaksh-navy"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="rounded-3xl bg-white border border-sand-300 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Left (Cols 1-6): Auto-Transitioning Visual Heritage Gallery */}
            <div className="lg:col-span-6 relative min-h-[420px] sm:min-h-[560px] bg-pingaksh-navy overflow-hidden order-2 lg:order-1">
              <AnimatePresence mode="sync">
                <motion.figure
                  key={activeFoundationSlide.id}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.9, ease: "easeInOut" },
                    scale: { duration: 4.5, ease: "easeOut" },
                  }}
                  className="absolute inset-0 w-full h-full m-0"
                >
                  <img
                    src={activeFoundationSlide.imageUrl}
                    alt={activeFoundationSlide.imageAlt}
                    width={1400}
                    height={950}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-transparent"
                  />
                </motion.figure>
              </AnimatePresence>

              {/* Top Era Pill + Slide Indicators */}
              <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between gap-4">
                <div
                  role="tablist"
                  aria-label="Foundation Heritage Slides"
                  className="flex items-center gap-1.5 bg-navy-950/60 backdrop-blur-md px-3 py-1.5 rounded-full"
                >
                  {foundationWhoWeAre.slides.map((s, idx) => (
                    <button
                      key={s.id}
                      role="tab"
                      aria-selected={idx === foundationSlideIdx}
                      aria-label={`Show ${s.title}`}
                      onClick={() => setFoundationSlideIdx(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === foundationSlideIdx
                          ? "w-8 bg-pingaksh-sand"
                          : "w-2 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Slide Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFoundationSlide.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    <h3 className="font-logo text-2xl sm:text-3xl text-white tracking-wide">
                      {activeFoundationSlide.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-sand-100/90 leading-relaxed">
                      {activeFoundationSlide.caption}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right (Cols 7-12): Who We Are Narrative + Direct Sub-Page Cards */}
            <div className="lg:col-span-6 p-7 sm:p-11 lg:p-14 flex flex-col justify-between order-1 lg:order-2">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-tagline uppercase tracking-[0.2em] text-pingaksh-terracotta font-bold">
                  <Users className="w-4 h-4" aria-hidden="true" />
                  <span>{foundationWhoWeAre.eyebrow}</span>
                </div>

                <h2
                  id="foundation-whoweare-heading"
                  className="font-logo text-2xl sm:text-4xl text-pingaksh-navy leading-tight"
                >
                  {foundationWhoWeAre.title}
                </h2>

                <p className="text-xs sm:text-sm text-navy-700 leading-relaxed">
                  {foundationWhoWeAre.description}
                </p>

                {/* 2x2 Direct Gateway Grid to "Who We Are" Sub-Pages */}
                <nav
                  aria-label="Who We Are Sub-Pages"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3"
                >
                  {foundationWhoWeAre.gatewayLinks.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      title={`${item.title} — ${item.subtitle}`}
                      className="group p-4 rounded-xl bg-sand-50 hover:bg-pingaksh-navy border border-sand-300 hover:border-pingaksh-navy transition-all duration-250 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sand-200 group-hover:bg-white/15 text-pingaksh-terracotta group-hover:text-pingaksh-sand transition-colors">
                          {item.badge}
                        </span>
                        <ArrowUpRight
                          className="w-4 h-4 text-navy-400 group-hover:text-pingaksh-sand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          aria-hidden="true"
                        />
                      </div>

                      <div className="mt-3">
                        <h4 className="text-sm font-bold text-pingaksh-navy group-hover:text-white transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11.5px] text-navy-600 group-hover:text-sand-200/85 mt-1 line-clamp-2 transition-colors">
                          {item.subtitle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Bottom CTA Buttons */}
              <div className="pt-7 mt-7 border-t border-sand-200 flex flex-wrap items-center gap-3.5">
                <Link
                  href={foundationWhoWeAre.primaryCta.href}
                  title={foundationWhoWeAre.primaryCta.title}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-pingaksh-terracotta hover:bg-terracotta-600 text-white text-xs sm:text-sm font-semibold transition-all shadow-md group"
                >
                  <span>{foundationWhoWeAre.primaryCta.label}</span>
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  href={foundationWhoWeAre.secondaryCta.href}
                  title={foundationWhoWeAre.secondaryCta.title}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-pingaksh-navy/30 hover:bg-pingaksh-navy text-pingaksh-navy hover:text-white text-xs sm:text-sm font-semibold transition-all"
                >
                  <span>{foundationWhoWeAre.secondaryCta.label}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =====================================================================
          SECTION 3: INVESTORS & STATUTORY GOVERNANCE SECTION
          Deep Corporate Navy + Notices + Filterable FY Reports + Market Cards
      ===================================================================== */}
      <section
        aria-labelledby="investors-section-heading"
        className="bg-pingaksh-navy text-white py-20 sm:py-28 border-t border-white/10 relative"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Top Title & Fiscal Year Filter Pills */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-white/15">
            <div>
              <h2
                id="investors-section-heading"
                className="font-logo text-4xl sm:text-6xl text-white mt-2 tracking-wide"
              >
                {investorsSection.sectionTitle}
              </h2>
            </div>

            {/* Interactive Fiscal Year Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter Investor Documents by Fiscal Year"
              className="flex flex-wrap items-center gap-2"
            >
              <button
                type="button"
                role="tab"
                aria-selected={selectedFy === "ALL"}
                onClick={() => setSelectedFy("ALL")}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedFy === "ALL"
                    ? "bg-pingaksh-sand text-pingaksh-navy shadow-md"
                    : "bg-white/10 hover:bg-white/15 text-sand-100"
                }`}
              >
                Latest Releases
              </button>
              {investorsSection.fiscalYears.map((fy) => (
                <button
                  key={fy}
                  type="button"
                  role="tab"
                  aria-selected={selectedFy === fy}
                  onClick={() => setSelectedFy(fy)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedFy === fy
                      ? "bg-pingaksh-sand text-pingaksh-navy shadow-md"
                      : "bg-white/10 hover:bg-white/15 text-sand-100"
                  }`}
                >
                  {fy}
                </button>
              ))}
            </div>
          </div>

          {/* 3-Column Corporate Investor Layout (Notices | Documents | Market Benchmark) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pt-12">
            {/* Column 1 (Cols 1-4): Statutory Notices */}
            <div className="lg:col-span-4 lg:border-r lg:border-white/15 lg:pr-8 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {investorsSection.noticesHeading}
                </h3>

                <ul className="space-y-6">
                  {investorsSection.notices.map((notice) => (
                    <li
                      key={notice.id}
                      className="group border-b border-white/10 pb-5 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-center justify-between text-xs font-bold tracking-wider text-pingaksh-sand mb-1.5">
                        <time dateTime={notice.isoDate}>{notice.date}</time>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-sand-200">
                          {notice.referenceCode}
                        </span>
                      </div>
                      <Link
                        href={notice.href}
                        title={notice.title}
                        className="text-xs sm:text-sm text-sand-100/90 group-hover:text-pingaksh-sand transition-colors leading-relaxed block"
                      >
                        {notice.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href={investorsSection.noticesCta.href}
                  title="View All Statutory Notices and Regulatory Filings"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-pingaksh-sand/50 hover:bg-pingaksh-sand text-white hover:text-pingaksh-navy text-xs font-semibold transition-all"
                >
                  <span>{investorsSection.noticesCta.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Column 2 (Cols 5-8): Investor Documents & Annual Reports */}
            <div className="lg:col-span-4 lg:px-4 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {investorsSection.documentsHeading}
                </h3>

                <div className="space-y-4">
                  {filteredDocuments.map((doc) => (
                    <Link
                      key={doc.id}
                      href={doc.href}
                      title={`Download ${doc.title}`}
                      className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pingaksh-sand/40 transition-all"
                    >
                      {/* Document Thumbnail Icon */}
                      <div className="w-12 h-14 rounded-lg bg-pingaksh-terracotta/90 text-white flex flex-col items-center justify-center shrink-0 shadow-md">
                        <FileText className="w-5 h-5" aria-hidden="true" />
                        <span className="text-[9px] font-bold uppercase mt-1">
                          PDF
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-pingaksh-sand">
                          {doc.fiscalYear} · {doc.fileSize}
                        </span>
                        <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-pingaksh-sand transition-colors mt-0.5 leading-snug">
                          {doc.title}
                        </h4>
                        <span className="block text-[11px] text-sand-200/70 mt-1">
                          Released: {doc.releaseDate}
                        </span>
                      </div>

                      <Download
                        className="w-4 h-4 text-sand-300 group-hover:text-white shrink-0 mt-1"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <Link
                  href={investorsSection.documentsCta.href}
                  title="Open Complete Investor Financial Document Repository"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-pingaksh-sand/50 hover:bg-pingaksh-sand text-white hover:text-pingaksh-navy text-xs font-semibold transition-all"
                >
                  <span>{investorsSection.documentsCta.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Column 3 (Cols 9-12): Dual Market Benchmark Cards (NSE & BSE) */}
            <div className="lg:col-span-4 space-y-5">
              {investorsSection.marketTrackers.map((tracker) => (
                <div
                  key={tracker.id}
                  className="rounded-2xl bg-navy-950/80 border border-white/20 p-6 space-y-4 shadow-xl"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-white">
                        {tracker.exchange}
                      </h4>
                      <p className="text-[11px] text-sand-200/75 mt-0.5">
                        {tracker.asOfDate}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold uppercase">
                      Active
                    </span>
                  </div>

                  {/* SVG Sparkline Trend Graphic */}
                  <div className="py-2">
                    <svg
                      viewBox="0 0 240 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="w-full h-12"
                    >
                      <path
                        d="M4 44L45 36L85 40L128 24L170 28L215 10L236 14"
                        stroke="#34d399"
                        strokeWidth="3"
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

                  <div className="pt-2 border-t border-white/10 flex items-baseline justify-between flex-wrap gap-2">
                    <div>
                      <span className="text-xl sm:text-2xl font-bold text-white">
                        {tracker.price}
                      </span>
                      <span className="ml-2 text-xs font-semibold text-emerald-400">
                        ↑ {tracker.change}
                      </span>
                    </div>
                    <div className="text-right text-[11px] text-sand-200/80">
                      <span className="uppercase">{tracker.volumeLabel}: </span>
                      <strong className="text-white">
                        {tracker.volumeValue}
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Warm Sand Accent Strip (Matches Corporate Divider) */}
        <div
          aria-hidden="true"
          className="h-3 w-full bg-gradient-to-r from-pingaksh-sand via-pingaksh-terracotta to-pingaksh-sand mt-20 -mb-20 sm:-mb-28"
        />
      </section>
      {/* =====================================================================
          SECTION 2: CORPORATE ANNOUNCEMENTS SECTION
          Editorial Headline + Partner Emblem Card + Interactive News Selector
      ===================================================================== */}
      <section
        aria-labelledby="announcements-section-heading"
        className="bg-white py-20 sm:py-28 text-pingaksh-navy border-t border-sand-200"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-sand-200">
            <div>
              <h2
                id="announcements-section-heading"
                className="font-logo text-4xl sm:text-5xl text-pingaksh-navy mt-1.5 tracking-wide"
              >
                {announcementsSection.sectionTitle}
              </h2>
            </div>

            <Link
              href={announcementsSection.allPressHref}
              title="Browse All Pingaksh Group Press Releases and Corporate Announcements"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-pingaksh-terracotta hover:text-pingaksh-navy transition-colors group"
            >
              <span>{announcementsSection.allPressLabel}</span>
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Main Featured Announcement Split (Cols 1-5 Copy | Cols 6-12 Partner Card) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-10">
            {/* Left (Cols 1-5): Featured Press Release Headline & Metadata */}
            <div className="lg:col-span-5 space-y-6">
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeAnnouncement.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sand-100 border border-sand-300 text-[11px] font-bold uppercase tracking-wider text-pingaksh-terracotta">
                    <span>{activeAnnouncement.visualBadge}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-pingaksh-navy leading-snug">
                    <Link
                      href={activeAnnouncement.href}
                      title={activeAnnouncement.headline}
                      className="hover:text-pingaksh-terracotta transition-colors inline"
                    >
                      {activeAnnouncement.headline}
                      <ArrowUpRight
                        className="inline-block w-5 h-5 ml-1.5 text-pingaksh-terracotta -mt-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-navy-600 leading-relaxed">
                    {activeAnnouncement.summary}
                  </p>

                  {/* Category & Semantic <time> Stamp */}
                  <div className="pt-4 border-t border-sand-300 flex items-center gap-3 text-xs font-bold tracking-wider uppercase text-navy-700">
                    <span className="text-pingaksh-terracotta">
                      {activeAnnouncement.category}
                    </span>
                    <span className="text-sand-400">|</span>
                    <time dateTime={activeAnnouncement.isoDate}>
                      {activeAnnouncement.date}
                    </time>
                  </div>
                </motion.article>
              </AnimatePresence>

              {/* Bottom Switcher Tabs for Recent Announcements */}
              <div className="pt-4 space-y-2">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-navy-400">
                  Recent Releases ({announcementsSection.items.length})
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {announcementsSection.items.map((item, idx) => {
                    const isSelected = idx === activeAnnouncementIdx;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveAnnouncementIdx(idx)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-pingaksh-navy text-white border-pingaksh-navy shadow-md"
                            : "bg-sand-50 hover:bg-sand-100 text-pingaksh-navy border-sand-200"
                        }`}
                      >
                        <time
                          dateTime={item.isoDate}
                          className={`block text-[10px] font-bold uppercase ${
                            isSelected
                              ? "text-pingaksh-sand"
                              : "text-pingaksh-terracotta"
                          }`}
                        >
                          {item.date}
                        </time>
                        <span className="block text-xs font-semibold mt-1 line-clamp-1">
                          {item.visualBadge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right (Cols 6-12): Elevated Partner Co-Branding & Visual Showcase Card */}
            {/* Right: Featured Announcement Image */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAnnouncement.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="relative overflow-hidden rounded-2xl aspect-[16/9] bg-pingaksh-navy"
                >
                  <img
                    src={activeAnnouncement.imageUrl}
                    alt={activeAnnouncement.imageAlt}
                    width={1200}
                    height={675}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Subtle bottom gradient for date readability */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent"
                  />

                  {/* Date Overlay */}
                  <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
                    <time
                      dateTime={activeAnnouncement.isoDate}
                      className="inline-flex items-center px-4 py-2 rounded-md bg-white/95 backdrop-blur-sm text-pingaksh-navy text-xs sm:text-sm font-bold uppercase tracking-[0.12em]"
                    >
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

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  Download,
  ArrowUpRight,
  ArrowRight,
  FileText,
} from "lucide-react";
import type {
  FinancialReportsPageData,
  FiscalYearKey,
} from "@/data/financialReportsData";

interface FinancialReportsViewProps {
  data: FinancialReportsPageData;
}

export default function FinancialReportsView({
  data,
}: FinancialReportsViewProps) {
  const {
    breadcrumbs,
    hero,
    fiscalYears,
    annualReports,
    quarterlyMatrix,
    subsidiaryFinancials,
  } = data;

  const [activeFy, setActiveFy] = useState<FiscalYearKey>(fiscalYears[0]);
  const [activeQuarterIdx, setActiveQuarterIdx] = useState<number>(0);

  const currentAnnual = annualReports[activeFy];
  const currentQuarters = quarterlyMatrix[activeFy] || [];
  const activeQuarterPack =
    currentQuarters[activeQuarterIdx] || currentQuarters[0];

  const handleFyChange = (fy: FiscalYearKey) => {
    setActiveFy(fy);
    setActiveQuarterIdx(0);
  };

  // On-Page SEO JSON-LD
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
        "@type": "CollectionPage",
        name: data.seo.title,
        description: data.seo.description,
        url: "https://www.pingakshrenewables.com/investors/financial-reports",
      },
    ],
  };

  return (
    <article className="w-full bg-sand-50 text-pingaksh-navy selection:bg-pingaksh-terracotta selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* =====================================================================
          1. EXECUTIVE HERO WITH KEN BURNS MOTION & LATEST RELEASE CALLOUT
      ===================================================================== */}
      <header className="relative w-full min-h-[60vh] bg-pingaksh-navy text-white flex flex-col justify-end overflow-hidden pt-36 pb-16 sm:pb-24">
        <figure className="absolute inset-0 m-0 overflow-hidden">
          <motion.img
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            src={hero.backgroundImage}
            alt={hero.backgroundAlt}
            width={2000}
            height={1000}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-950 via-pingaksh-navy/80 to-navy-950/60"
          />
        </figure>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center flex-wrap gap-2 text-xs text-sand-200/75">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <li key={crumb.href} className="flex items-center gap-2">
                    {isLast ? (
                      <span
                        aria-current="page"
                        className="text-pingaksh-sand font-semibold"
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <>
                        <Link
                          href={crumb.href}
                          className="hover:text-white transition-colors"
                        >
                          {crumb.label}
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end border-t border-white/15 pt-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7 space-y-4"
            >
              <h1 className="font-logo text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.04] tracking-wide">
                {hero.title}
              </h1>
              <p className="font-body text-sm sm:text-base text-sand-100/85 leading-relaxed max-w-2xl">
                {hero.subtitle}
              </p>
            </motion.div>

            {/* Right Floating Latest Release Glass Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="lg:col-span-5"
            >
              <a
                href={hero.latestReleaseHref}
                className="group block rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-pingaksh-sand/30 p-6 transition-all"
              >
                <span className="text-[11px] font-mono uppercase tracking-widest text-pingaksh-sand block">
                  {hero.latestReleaseBadge}
                </span>
                <p className="font-logo text-xl text-white mt-2 group-hover:text-pingaksh-sand transition-colors">
                  {hero.latestReleaseTitle}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-pingaksh-sand mt-4">
                  <span>Jump to Latest Filing Pack</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          2. STICKY FISCAL YEAR SELECTOR BAR
      ===================================================================== */}
      <div className="sticky top-0 z-30 bg-navy-950 text-white border-b border-white/10 shadow-lg">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
          <span className="text-xs uppercase tracking-widest text-sand-200/70 hidden sm:inline">
            Select Reporting Fiscal Year
          </span>

          <div
            role="tablist"
            aria-label="Fiscal Year Filter"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar"
          >
            {fiscalYears.map((fy) => {
              const isSelected = fy === activeFy;
              return (
                <button
                  key={fy}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleFyChange(fy)}
                  className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-pingaksh-sand text-pingaksh-navy shadow-md"
                      : "text-white/75 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {fy}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. RELIANCE-STYLE INTEGRATED ANNUAL REPORT SHOWCASE (3D Cover + Bars)
      ===================================================================== */}
      <section
        aria-labelledby="annual-report-heading"
        className="py-16 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAnnual.fiscalYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-3xl bg-white border border-sand-300 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Left (Cols 1-5): 3D Book Cover Visual Showcase */}
            <div className="lg:col-span-5 bg-pingaksh-navy p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
              <div
                aria-hidden="true"
                className="font-logo text-[120px] leading-none text-white/5 absolute -bottom-6 -right-4 select-none pointer-events-none"
              >
                {currentAnnual.fiscalYear.slice(-5)}
              </div>

              <div className="relative z-10 flex items-center justify-between text-xs text-pingaksh-sand font-mono">
                <span>INTEGRATED REPORT</span>
                <span>{currentAnnual.pageCount}</span>
              </div>

              {/* 3D Tilted Report Cover Card */}
              <motion.figure
                whileHover={{ scale: 1.03, rotateY: -4 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 my-8 mx-auto w-60 sm:w-68 aspect-[3/4] rounded-xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.75)] border-l-8 border-pingaksh-sand bg-navy-950"
              >
                <img
                  src={currentAnnual.coverImage}
                  alt={currentAnnual.coverAlt}
                  width={600}
                  height={800}
                  className="w-full h-full object-cover opacity-65"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent p-6 flex flex-col justify-between text-white">
                  <div className="border-b border-white/20 pb-3">
                    <span className="font-logo text-sm tracking-widest text-pingaksh-sand block">
                      PINGAKSH GROUP
                    </span>
                    <span className="text-[10px] text-sand-200/80 uppercase tracking-widest">
                      {currentAnnual.fiscalYear}
                    </span>
                  </div>

                  <div>
                    <p className="font-logo text-xl leading-snug text-white">
                      {currentAnnual.themeTitle}
                    </p>
                    <span className="mt-2 inline-block text-[10px] font-mono uppercase px-2 py-0.5 bg-pingaksh-terracotta text-white rounded">
                      Audited Consolidated
                    </span>
                  </div>
                </div>
              </motion.figure>

              <div className="relative z-10 text-center text-xs text-sand-200/80">
                Released on{" "}
                <time
                  dateTime={currentAnnual.isoDate}
                  className="text-white font-semibold"
                >
                  {currentAnnual.releaseDate}
                </time>
              </div>
            </div>

            {/* Right (Cols 6-12): Report Details, Animated Performance Bars & Downloads */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-sand-200 pb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-pingaksh-terracotta">
                    Annual Statutory Dossier · {currentAnnual.fiscalYear}
                  </span>
                  <span className="text-xs font-mono text-navy-500">
                    {currentAnnual.fileSize}
                  </span>
                </div>

                <h2
                  id="annual-report-heading"
                  className="font-logo text-3xl sm:text-4xl text-pingaksh-navy leading-tight"
                >
                  {currentAnnual.themeTitle}
                </h2>

                <p className="text-sm sm:text-base text-navy-700 leading-relaxed">
                  {currentAnnual.subtitle}
                </p>
              </div>

              {/* Animated Operational & Financial Highlights Bars */}
              <div className="space-y-5 bg-sand-50 p-6 rounded-2xl border border-sand-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-navy-600">
                  Key Fiscal Highlights ({currentAnnual.fiscalYear})
                </h3>

                <div className="space-y-4">
                  {currentAnnual.keyPerformanceMetrics.map((kpi, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-baseline justify-between text-xs sm:text-sm">
                        <span className="font-semibold text-pingaksh-navy">
                          {kpi.metric}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <strong className="font-logo text-lg text-pingaksh-navy">
                            {kpi.value}
                          </strong>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                            {kpi.growth}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-sand-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${kpi.barPercentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                          className="h-full bg-pingaksh-terracotta rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3-Button Download Row */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <a
                  href={currentAnnual.fullReportHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-pingaksh-terracotta hover:bg-terracotta-600 text-white text-xs sm:text-sm font-semibold transition-all shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full Report ({currentAnnual.fileSize})</span>
                </a>

                <a
                  href={currentAnnual.mgt7ReturnHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-sand-300 hover:border-pingaksh-navy hover:bg-pingaksh-navy text-pingaksh-navy hover:text-white text-xs sm:text-sm font-semibold transition-all"
                >
                  <span>Form MGT-7 Annual Return</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={currentAnnual.standaloneAccountsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-sand-300 hover:border-pingaksh-navy hover:bg-pingaksh-navy text-pingaksh-navy hover:text-white text-xs sm:text-sm font-semibold transition-all"
                >
                  <span>Standalone Balance Sheet</span>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* =====================================================================
          4. QUARTERLY FINANCIAL RESULTS MATRIX (Reliance-Style Document Thumbnails)
      ===================================================================== */}
      <section
        id="quarterly-results-matrix"
        aria-labelledby="quarterly-matrix-heading"
        className="py-20 sm:py-28 bg-pingaksh-navy text-white border-t border-white/10 scroll-mt-16"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Header & Quarter Switcher Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/15">
            <div>
              <h2
                id="quarterly-matrix-heading"
                className="font-logo text-3xl sm:text-5xl text-white"
              >
                Quarterly Financial Results ({activeFy})
              </h2>
              <p className="text-sm text-sand-200/80 mt-2">
                Select a quarter to download investor presentations, financial
                statements, and statutory auditor reviews.
              </p>
            </div>

            {/* Quarter Selector Pills (Q1, Q2, Q3, Q4) */}
            <div
              role="tablist"
              aria-label="Select Quarter"
              className="flex items-center gap-2"
            >
              {currentQuarters.map((qPack, idx) => {
                const isSelected = idx === activeQuarterIdx;
                return (
                  <button
                    key={qPack.quarter}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveQuarterIdx(idx)}
                    className={`px-6 py-3 rounded-xl font-logo text-lg tracking-wider transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-pingaksh-sand text-pingaksh-navy border-pingaksh-sand font-bold shadow-lg"
                        : "bg-white/5 hover:bg-white/10 text-white border-white/15"
                    }`}
                  >
                    {qPack.quarter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Quarter Document Grid */}
          {activeQuarterPack && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeFy}-${activeQuarterPack.quarter}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="pt-10 space-y-8"
              >
                {/* Quarter Period Meta Bar */}
                <div className="rounded-2xl bg-navy-950/90 border border-white/15 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-pingaksh-sand block">
                      Filing Period · Released {activeQuarterPack.releaseDate}
                    </span>
                    <h3 className="font-logo text-2xl text-white mt-1">
                      {activeQuarterPack.periodEnded}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    {activeQuarterPack.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs"
                      >
                        <span className="text-sand-200/70 block">
                          {h.label}
                        </span>
                        <strong className="text-pingaksh-sand text-sm">
                          {h.value}
                        </strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reliance-Style Illustrated Document Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeQuarterPack.documents.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-5 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-pingaksh-sand/50 transition-all duration-300"
                    >
                      {/* RIL-Style Folded Document Sheet Thumbnail */}
                      <div className="w-16 h-20 rounded-lg bg-gradient-to-br from-sky-400/20 via-pingaksh-sand/20 to-pingaksh-terracotta/40 border border-white/25 flex flex-col items-center justify-between p-2.5 shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-pingaksh-sand self-start">
                          {activeQuarterPack.quarter}
                        </span>
                        <FileText className="w-6 h-6 text-white opacity-90" />
                        <span className="text-[9px] font-bold uppercase bg-pingaksh-terracotta text-white px-1.5 py-0.2 rounded">
                          PDF
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-pingaksh-sand font-mono">
                          <span>{doc.type}</span>
                          <span>{doc.fileSize}</span>
                        </div>

                        <h4 className="text-base sm:text-lg font-semibold text-white group-hover:text-pingaksh-sand transition-colors leading-snug">
                          {doc.title}
                        </h4>

                        <p className="text-xs text-sand-200/70 pt-1">
                          {activeQuarterPack.releaseDate} · {activeFy}
                        </p>
                      </div>

                      <div className="w-10 h-10 rounded-full border border-white/20 group-hover:bg-pingaksh-sand group-hover:text-pingaksh-navy flex items-center justify-center shrink-0 self-center transition-colors">
                        <Download className="w-4 h-4" />
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* =====================================================================
          5. SUBSIDIARY & SPV AUDITED STANDALONE ACCOUNTS (UBHP & PBPL)
      ===================================================================== */}
      <section
        aria-labelledby="spv-accounts-heading"
        className="py-16 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10 border-b border-sand-300">
          <div>
            <h2
              id="spv-accounts-heading"
              className="font-logo text-3xl sm:text-4xl text-pingaksh-navy"
            >
              Subsidiary &amp; SPV Standalone Financial Statements
            </h2>
            <p className="text-sm text-navy-600 mt-1">
              Statutory disclosures pursuant to Section 129 &amp; 136 of the
              Companies Act, 2013 for ring-fenced group entities.
            </p>
          </div>

          <Link
            href="/investors/statutory-filings"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-pingaksh-terracotta hover:text-pingaksh-navy transition-colors"
          >
            <span>View All Statutory ROC Filings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          {subsidiaryFinancials.map((spv, i) => (
            <motion.div
              key={spv.entityName}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl bg-white border border-sand-300 hover:border-pingaksh-terracotta p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span className="inline-block font-mono text-[11px] font-bold px-2.5 py-1 rounded bg-sand-100 text-pingaksh-terracotta">
                  {spv.latestAuditStatus}
                </span>
                <h3 className="font-logo text-xl text-pingaksh-navy">
                  {spv.entityName}
                </h3>
                <p className="text-xs font-semibold text-navy-500">
                  {spv.spvRole}
                </p>
                <p className="text-xs text-navy-700 pt-2 border-t border-sand-200 leading-relaxed">
                  {spv.reportTitle}
                </p>
              </div>

              <a
                href={spv.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-sand-100 hover:bg-pingaksh-navy text-pingaksh-navy hover:text-pingaksh-sand text-xs font-bold flex items-center justify-between transition-colors"
              >
                <span>Download Standalone PDF</span>
                <span className="font-mono text-[11px]">{spv.fileSize}</span>
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </article>
  );
}

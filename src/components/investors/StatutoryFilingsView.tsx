"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  ChevronDown,
  Download,
  Search,
  X,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import type {
  StatutoryFilingsPageData,
  StatutoryCategoryKey,
} from "@/data/statutoryFilingsData";

interface StatutoryFilingsViewProps {
  data: StatutoryFilingsPageData;
}

export default function StatutoryFilingsView({
  data,
}: StatutoryFilingsViewProps) {
  const {
    breadcrumbs,
    hero,
    entityRegistry,
    categories,
    filings,
    disclaimers,
    complianceOfficer,
  } = data;

  const [selectedCategory, setSelectedCategory] =
    useState<StatutoryCategoryKey>("all");
  const [selectedEntity, setSelectedEntity] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openDisclaimerId, setOpenDisclaimerId] = useState<string>(
    disclaimers[0].id,
  );

  const filteredFilings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return filings.filter((item) => {
      const matchesCat =
        selectedCategory === "all" || item.categoryKey === selectedCategory;
      const matchesEntity =
        selectedEntity === "ALL" || item.applicableEntity === selectedEntity;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.referenceNumber.toLowerCase().includes(q) ||
        item.sectionAct.toLowerCase().includes(q) ||
        item.applicableEntity.toLowerCase().includes(q);

      return matchesCat && matchesEntity && matchesQuery;
    });
  }, [filings, selectedCategory, selectedEntity, searchQuery]);

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
        "@type": "WebPage",
        name: data.seo.title,
        description: data.seo.description,
        url: "https://www.pingakshrenewables.com/investors/statutory-filings",
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
          1. ARCHITECTURAL HERO HEADER
      ===================================================================== */}
      <header className="relative w-full min-h-[54vh] bg-pingaksh-navy text-white flex flex-col justify-end overflow-hidden pt-36 pb-16 sm:pb-20">
        <figure className="absolute inset-0 m-0 overflow-hidden">
          <motion.img
            initial={{ scale: 1.07 }}
            animate={{ scale: 1 }}
            transition={{ duration: 9, ease: "easeOut" }}
            src={hero.backgroundImage}
            alt={hero.backgroundAlt}
            width={2000}
            height={1000}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-950 via-pingaksh-navy/85 to-navy-950/65"
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl border-t border-white/15 pt-8 space-y-4"
          >
            <h1 className="font-logo text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-wide">
              {hero.title}
            </h1>
            <p className="font-body text-sm sm:text-base text-sand-100/85 leading-relaxed max-w-2xl">
              {hero.subtitle}
            </p>
          </motion.div>
        </div>
      </header>

      {/* =====================================================================
          2. CORPORATE CIN & STATUTORY ENTITY IDENTIFIER MATRIX
      ===================================================================== */}
      <section
        aria-label="Corporate Identification Numbers and Entity Registry"
        className="bg-navy-950 text-white border-b border-white/10 py-12"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {entityRegistry.map((entity, idx) => (
              <motion.div
                key={entity.cinNumber}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="font-mono text-xs text-pingaksh-sand block">
                    CIN: {entity.cinNumber}
                  </span>
                  <h2 className="font-logo text-xl text-white mt-1">
                    {entity.entityName}
                  </h2>
                  <p className="text-xs text-sand-200/75 mt-0.5">
                    {entity.role}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-1.5 text-xs text-sand-100/85">
                  <div className="flex justify-between gap-2">
                    <span className="text-sand-300/60">Jurisdiction:</span>
                    <span className="font-medium text-right">
                      {entity.registeredState}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-sand-300/60">Regulatory Status:</span>
                    <span className="font-medium text-pingaksh-sand text-right">
                      {entity.isinOrDematStatus}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. SPLIT WORKSPACE: STICKY CATEGORY SIDEBAR + SEARCHABLE FILING LEDGER
      ===================================================================== */}
      <section
        aria-labelledby="filings-repository-heading"
        className="py-16 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Sticky Sidebar (Cols 1-4): Category Navigation & Entity Filter */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="rounded-3xl bg-white border border-sand-300 p-6 sm:p-7 shadow-md space-y-6">
              <div>
                <h2
                  id="filings-repository-heading"
                  className="font-logo text-2xl text-pingaksh-navy"
                >
                  Filing Categories
                </h2>
                <p className="text-xs text-navy-500 mt-1">
                  Filter statutory disclosures by regulatory authority.
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Statutory Filing Categories"
                className="space-y-1.5"
              >
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-pingaksh-navy text-pingaksh-sand shadow-sm"
                          : "text-navy-700 hover:bg-sand-100"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`font-mono text-xs px-2 py-0.5 rounded-full ${
                          isSelected
                            ? "bg-pingaksh-terracotta text-white"
                            : "bg-sand-200 text-pingaksh-navy"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Filter by SPV Entity */}
              <div className="pt-5 border-t border-sand-200">
                <label
                  htmlFor="spv-entity-filter"
                  className="block text-xs font-bold uppercase tracking-wider text-navy-500 mb-2"
                >
                  Filter by Group Entity
                </label>
                <select
                  id="spv-entity-filter"
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-xs font-bold text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta cursor-pointer"
                >
                  <option value="ALL">All Group Entities (Consolidated)</option>
                  <option value="Pingaksh Group (Consolidated)">
                    Pingaksh Renewables (Parent)
                  </option>
                  <option value="UBHP (Hydro SPV)">
                    Uttar Bharat Hydro Power (UBHP)
                  </option>
                  <option value="PBPL (Bio-Energy SPV)">
                    Pingaksh Beverages (PBPL)
                  </option>
                </select>
              </div>
            </div>
          </aside>

          {/* Right Main Ledger (Cols 5-12): Search Bar + Animated Document Cards */}
          <div className="lg:col-span-8 space-y-6">
            {/* Search Input Bar */}
            <div className="rounded-2xl bg-white border border-sand-300 p-4 shadow-xs flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search
                  className="w-4 h-4 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Reference Code (e.g., MGT-7, AOC-4, CFO, ZLD, Section 135)..."
                  aria-label="Search Statutory Filings"
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-sand-50 border border-sand-200 text-xs sm:text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-pingaksh-navy cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <span className="text-xs font-mono text-navy-500 shrink-0 px-2">
                {filteredFilings.length} Filings
              </span>
            </div>

            {/* Filings List */}
            {filteredFilings.length === 0 ? (
              <div className="rounded-3xl bg-white border border-sand-300 p-12 text-center space-y-3">
                <p className="font-logo text-2xl text-pingaksh-navy">
                  No Statutory Filings Match Your Filter
                </p>
                <p className="text-xs text-navy-600">
                  Try clearing your search keyword or switching to &ldquo;All
                  Statutory Filings&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedEntity("ALL");
                    setSearchQuery("");
                  }}
                  className="px-5 py-2.5 rounded-full bg-pingaksh-navy text-pingaksh-sand text-xs font-semibold cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredFilings.map((filing, idx) => (
                    <motion.article
                      key={filing.id}
                      id={filing.id}
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3, delay: idx * 0.03 }}
                      className="group rounded-2xl bg-white border border-sand-300 hover:border-pingaksh-terracotta p-6 shadow-xs hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          {/* Top Meta Strip */}
                          <div className="flex flex-wrap items-center gap-2.5 text-xs">
                            <span className="font-mono font-bold px-2.5 py-0.5 rounded bg-pingaksh-navy text-pingaksh-sand">
                              {filing.referenceNumber}
                            </span>
                            <span className="font-semibold text-pingaksh-terracotta">
                              {filing.sectionAct}
                            </span>
                            <span className="text-sand-400">·</span>
                            <time
                              dateTime={filing.isoDate}
                              className="text-navy-500 font-medium"
                            >
                              {filing.filingDate}
                            </time>
                          </div>

                          {/* Filing Title */}
                          <h3 className="font-logo text-lg sm:text-xl text-pingaksh-navy group-hover:text-pingaksh-terracotta transition-colors leading-snug">
                            <a
                              href={filing.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {filing.title}
                            </a>
                          </h3>

                          {/* Bottom Entity Tag */}
                          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-navy-500">
                            <span>
                              Entity:{" "}
                              <strong className="text-pingaksh-navy">
                                {filing.applicableEntity}
                              </strong>
                            </span>
                            <span>·</span>
                            <span>{filing.fiscalYear}</span>
                          </div>
                        </div>

                        {/* Download Button */}
                        <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-sand-200">
                          <span className="font-mono text-xs text-navy-500">
                            PDF · {filing.fileSize}
                          </span>
                          <a
                            href={filing.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Download ${filing.title}`}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-sand-100 group-hover:bg-pingaksh-terracotta text-pingaksh-navy group-hover:text-white text-xs font-bold transition-colors"
                          >
                            <span>Download</span>
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. STATUTORY DISCLAIMERS & SAFE HARBOR ACCORDION + COMPLIANCE OFFICER
      ===================================================================== */}
      <section
        aria-labelledby="disclaimers-heading"
        className="py-20 sm:py-24 bg-pingaksh-navy text-white border-t border-white/10"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left (Cols 1-7): Interactive Legal Disclaimers Accordion */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2
                id="disclaimers-heading"
                className="font-logo text-3xl sm:text-4xl text-white"
              >
                Legal Disclaimers &amp; Safe Harbor Notice
              </h2>
              <p className="text-xs sm:text-sm text-sand-200/80 mt-2">
                Important statutory notices governing financial projections,
                hydrological estimates, and regulatory disclosures.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {disclaimers.map((clause) => {
                const isOpen = openDisclaimerId === clause.id;
                return (
                  <div
                    key={clause.id}
                    className="rounded-2xl bg-navy-950/80 border border-white/15 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDisclaimerId(isOpen ? "" : clause.id)
                      }
                      aria-expanded={isOpen}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                    >
                      <span className="font-logo text-lg text-pingaksh-sand">
                        {clause.heading}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-pingaksh-sand transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-xs sm:text-sm text-sand-100/85 leading-relaxed border-t border-white/10 pt-4">
                            {clause.body}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right (Cols 8-12): Nodal Compliance Officer Desk Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-sand-100 text-pingaksh-navy p-8 sm:p-10 border border-sand-300 shadow-2xl space-y-6">
              <div className="border-b border-sand-300 pb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-pingaksh-terracotta font-bold block">
                  Statutory Grievance Redressal
                </span>
                <h3 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy mt-1">
                  {complianceOfficer.name}
                </h3>
                <p className="text-xs text-navy-600 mt-1">
                  {complianceOfficer.designation}
                </p>
              </div>

              <address className="not-italic text-xs sm:text-sm text-navy-800 space-y-3 leading-relaxed">
                <p>{complianceOfficer.officeAddress}</p>
                <div className="pt-2 space-y-1.5 font-semibold">
                  <a
                    href={`mailto:${complianceOfficer.email}`}
                    className="block text-pingaksh-terracotta hover:underline"
                  >
                    Email: {complianceOfficer.email}
                  </a>
                  <a
                    href={`tel:${complianceOfficer.phone.replace(/[^+\d]/g, "")}`}
                    className="block text-pingaksh-navy hover:text-pingaksh-terracotta"
                  >
                    Telephone: {complianceOfficer.phone}
                  </a>
                </div>
              </address>

              <div className="pt-4 border-t border-sand-300 flex items-center justify-between">
                <Link
                  href="/investors/financial-reports"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-pingaksh-navy hover:text-pingaksh-terracotta"
                >
                  <span>Financial Reports Archive</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact/offices"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-pingaksh-terracotta hover:underline"
                >
                  <span>Registered Office Map</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

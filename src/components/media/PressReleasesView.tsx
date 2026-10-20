"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  X,
  Calendar,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  FileText,
  ChevronRight,
  Filter,
  Mail,
  Phone,
  Newspaper,
} from "lucide-react";
import type { PressReleasesPageData } from "@/data/pressReleasesData";

interface PressReleasesViewProps {
  data: PressReleasesPageData;
}

export default function PressReleasesView({ data }: PressReleasesViewProps) {
  const { breadcrumbs, hero, categories, years, mediaContact, releases } = data;

  // =================================================================
  // SEARCH & FILTER STATE
  // =================================================================
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All Years");

  // Filter releases by keyword, category, and year
  const filteredReleases = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return releases.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchesYear =
        selectedYear === "All Years" || item.year === selectedYear;

      const matchesKeyword =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.releaseCode.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesYear && matchesKeyword;
    });
  }, [releases, searchQuery, selectedCategory, selectedYear]);

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedYear("All Years");
  };

  const featuredRelease = releases.find((r) => r.isFeatured) || releases[0];
  const isDefaultView =
    !searchQuery.trim() &&
    selectedCategory === "All" &&
    selectedYear === "All Years";

  // On-Page SEO JSON-LD: BreadcrumbList + NewsArticle ItemList
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
        url: "https://www.pingakshrenewables.com/media/press-releases",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: releases.map((rel, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            item: {
              "@type": "NewsArticle",
              headline: rel.title,
              datePublished: rel.isoDate,
              image: rel.imageUrl,
              description: rel.excerpt,
              url: `https://www.pingakshrenewables.com${rel.redirectHref}`,
              publisher: {
                "@type": "Organization",
                name: "Pingaksh Renewables Pvt. Ltd.",
              },
            },
          })),
        },
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
          1. ARCHITECTURAL HERO HEADER (With Safe Top Clearance for Fixed Navbar)
      ===================================================================== */}
      <header className="relative w-full min-h-[54vh] bg-pingaksh-navy text-white flex flex-col justify-end overflow-hidden pt-36 pb-16 sm:pb-20">
        <figure className="absolute inset-0 m-0">
          <motion.img
            initial={{ scale: 1.07 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
            src={hero.backgroundImage}
            alt={hero.backgroundAlt}
            width={2000}
            height={1000}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-950 via-pingaksh-navy/80 to-navy-950/65"
          />
        </figure>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center flex-wrap gap-2 text-xs text-sand-200/80">
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
                          title={`Navigate to ${crumb.label}`}
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-t border-white/15 pt-8">
            <div className="lg:col-span-7">
              <h1 className="font-logo text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-wide">
                {hero.title}
              </h1>
              <p className="font-logo text-lg sm:text-2xl text-pingaksh-sand mt-3">
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
          2. KEYWORD SEARCH BAR & CATEGORY / YEAR FILTER COMMAND STRIP
      ===================================================================== */}
      <section
        aria-label="Search and Filter Press Releases"
        className="bg-white border-b border-sand-300 shadow-xs sticky top-0 z-20"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Keyword Search Input (Cols 1-5) */}
            <div className="lg:col-span-5 relative">
              <label htmlFor="press-search" className="sr-only">
                Search Press Releases by Keyword
              </label>
              <Search
                className="w-4 h-4 text-navy-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="press-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keyword (e.g., Sarju, 250 KLPD, OMC, DDGS, Board)..."
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-sand-50 border border-sand-300 text-xs sm:text-sm text-pingaksh-navy placeholder:text-navy-400 focus:outline-none focus:border-pingaksh-terracotta transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-sand-200 text-navy-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills (Cols 6-10) */}
            <div
              role="tablist"
              aria-label="Filter by Category"
              className="lg:col-span-5 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1"
            >
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? "bg-pingaksh-navy text-pingaksh-sand shadow-xs"
                        : "bg-sand-100 hover:bg-sand-200 text-navy-700"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Year Selector Dropdown (Cols 11-12) */}
            <div className="lg:col-span-2 flex items-center justify-end gap-2">
              <Filter
                className="w-4 h-4 text-pingaksh-terracotta shrink-0 hidden sm:inline"
                aria-hidden="true"
              />
              <label htmlFor="year-filter" className="sr-only">
                Filter by Year
              </label>
              <select
                id="year-filter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full lg:w-auto px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-xs font-bold text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta cursor-pointer"
              >
                {years.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Search / Filter Status Bar */}
          {!isDefaultView && (
            <div className="flex items-center justify-between pt-2 border-t border-sand-200 text-xs text-navy-600">
              <span>
                Showing <strong>{filteredReleases.length}</strong>{" "}
                {filteredReleases.length === 1 ? "release" : "releases"}
                {searchQuery ? ` matching “${searchQuery}”` : ""}
                {selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}
                {selectedYear !== "All Years" ? ` (${selectedYear})` : ""}
              </span>
              <button
                type="button"
                onClick={resetAllFilters}
                className="text-pingaksh-terracotta font-bold hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          3. FEATURED SPOTLIGHT DISPATCH (Shown when no active filters)
      ===================================================================== */}
      {isDefaultView && featuredRelease && (
        <section
          aria-labelledby="featured-release-heading"
          className="pt-14 sm:pt-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10"
        >
          <div className="rounded-3xl bg-pingaksh-navy text-white overflow-hidden shadow-2xl border border-sand-300 grid grid-cols-1 lg:grid-cols-12">
            {/* Left Image (Cols 1-6) */}
            <figure className="lg:col-span-6 relative min-h-[300px] sm:min-h-[400px] m-0 overflow-hidden group">
              <img
                src={featuredRelease.imageUrl}
                alt={featuredRelease.imageAlt}
                width={1200}
                height={800}
                loading="eager"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-pingaksh-navy/90"
              />
              <span className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-pingaksh-terracotta text-white text-xs font-bold uppercase tracking-wider shadow-md">
                Lead Dispatch · {featuredRelease.category}
              </span>
            </figure>

            {/* Right Copy & Redirect CTA (Cols 7-12) */}
            <div className="lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs text-pingaksh-sand font-medium">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-pingaksh-terracotta" />
                    <time dateTime={featuredRelease.isoDate}>
                      {featuredRelease.date}
                    </time>
                  </span>
                  <span className="text-white/30">·</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-pingaksh-terracotta" />
                    {featuredRelease.location}
                  </span>
                  <span className="text-white/30">·</span>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/10 text-sand-200">
                    {featuredRelease.releaseCode}
                  </span>
                </div>

                <h2
                  id="featured-release-heading"
                  className="font-logo text-2xl sm:text-3xl lg:text-4xl text-white leading-snug"
                >
                  <Link
                    href={featuredRelease.redirectHref}
                    title={featuredRelease.title}
                    className="hover:text-pingaksh-sand transition-colors"
                  >
                    {featuredRelease.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-sand-100/85 leading-relaxed">
                  {featuredRelease.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href={featuredRelease.redirectHref}
                  title={`Read Full Release: ${featuredRelease.title}`}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-pingaksh-sand hover:bg-sand-300 text-pingaksh-navy text-xs sm:text-sm font-bold transition-all shadow-md group"
                >
                  <span>Read Official Release</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                {featuredRelease.pdfDownloadHref && (
                  <Link
                    href={featuredRelease.pdfDownloadHref}
                    title="View Statutory Filing PDF"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sand-200 hover:text-white"
                  >
                    <FileText className="w-4 h-4 text-pingaksh-terracotta" />
                    <span>Statutory Filing PDF</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          4. PRESS RELEASE & ANNOUNCEMENT IMAGE CARDS GRID
      ===================================================================== */}
      <section
        aria-labelledby="archive-grid-heading"
        className="py-16 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10"
      >
        <div className="flex items-end justify-between mb-10 border-b border-sand-300 pb-4">
          <div>
            <h2
              id="archive-grid-heading"
              className="font-logo text-3xl sm:text-4xl text-pingaksh-navy mt-1"
            >
              All Corporate Announcements
            </h2>
          </div>
          <span className="text-xs font-semibold text-navy-600">
            {filteredReleases.length} Dispatches Available
          </span>
        </div>

        {filteredReleases.length === 0 ? (
          /* Empty Search State */
          <div className="rounded-3xl bg-white border border-sand-300 p-12 text-center max-w-xl mx-auto space-y-4">
            <Newspaper className="w-10 h-10 text-pingaksh-terracotta mx-auto opacity-80" />
            <h3 className="font-logo text-2xl text-pingaksh-navy">
              No Press Releases Match Your Search
            </h3>
            <p className="text-xs sm:text-sm text-navy-600">
              We couldn’t find any announcements matching{" "}
              <strong>“{searchQuery}”</strong> under the current filters.
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="px-6 py-2.5 rounded-full bg-pingaksh-navy text-pingaksh-sand text-xs font-semibold cursor-pointer"
            >
              Clear Search &amp; Show All Releases
            </button>
          </div>
        ) : (
          /* 3-Column Responsive Press Release Card Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="popLayout">
              {filteredReleases.map((item, idx) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="group rounded-2xl bg-white border border-sand-300 hover:border-pingaksh-terracotta shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Top Card Image with Hover Zoom & Category Badge */}
                    <figure className="relative aspect-[16/10] w-full m-0 overflow-hidden bg-pingaksh-navy">
                      <img
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        width={800}
                        height={500}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent"
                      />

                      <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full bg-navy-950/85 backdrop-blur-md text-pingaksh-sand text-[10.5px] font-bold uppercase tracking-wider border border-white/15">
                          {item.category}
                        </span>
                        <span className="px-2.5 py-0.5 rounded bg-white/90 text-pingaksh-navy font-mono text-[10px] font-bold">
                          {item.releaseCode}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-sand-100 font-medium">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-pingaksh-sand" />
                          <time dateTime={item.isoDate}>{item.date}</time>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-pingaksh-sand" />
                          {item.location}
                        </span>
                      </div>
                    </figure>

                    {/* Card Headline, Excerpt & Keyword Tags */}
                    <div className="p-6 space-y-3.5">
                      <h3 className="font-logo text-xl text-pingaksh-navy group-hover:text-pingaksh-terracotta transition-colors leading-snug line-clamp-3">
                        <Link
                          href={item.redirectHref}
                          title={`Read Announcement: ${item.title}`}
                        >
                          {item.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-navy-600 leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>

                      {/* Clickable Keyword Pills (Clicking filters by that tag) */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.slice(0, 3).map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setSearchQuery(tag)}
                            title={`Filter releases by #${tag}`}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sand-100 hover:bg-pingaksh-navy text-navy-700 hover:text-pingaksh-sand transition-colors cursor-pointer"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Direct Redirect Link + Optional PDF */}
                  <div className="px-6 py-4 bg-sand-50/70 border-t border-sand-200 flex items-center justify-between gap-3">
                    <Link
                      href={item.redirectHref}
                      title={`Open Full Release: ${item.title}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-pingaksh-terracotta group-hover:text-pingaksh-navy transition-colors"
                    >
                      <span>Read Full Announcement</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href={item.redirectHref}
                      aria-label={`Redirect to ${item.title}`}
                      className="w-8 h-8 rounded-full bg-white group-hover:bg-pingaksh-terracotta text-pingaksh-navy group-hover:text-white border border-sand-300 flex items-center justify-center transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </article>
  );
}

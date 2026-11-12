"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, ChevronRight, Building2 } from "lucide-react";
import {
  type DirectorProfile,
  type LeadershipPageData,
} from "@/data/leadershipData";

type FilterType =
  | "All"
  | "Promoter & Executive"
  | "Executive Director"
  | "Independent Director";

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function LeadershipDirectoryView({
  LEADERSHIP_DATA,
}: {
  LEADERSHIP_DATA: {
    directors: DirectorProfile[];
    prlDirectors?: DirectorProfile[];
    subsidiaryBoards?: LeadershipPageData["subsidiaryBoards"];
    seo: LeadershipPageData["seo"];
    breadcrumbs: LeadershipPageData["breadcrumbs"];
    hero: LeadershipPageData["hero"];
  };
}) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  // Main PRL Board (excludes PBPL-only director Aadish Goel so PRL shows the 6 PRL directors)
  const prlDirectorsList =
    LEADERSHIP_DATA.prlDirectors ??
    LEADERSHIP_DATA.directors.filter(
      (d) => d.entity !== "PBPL" && d.slug !== "aadish-goel",
    );

  // Pull Aadish Goel's profile for the Subsidiary (Pingaksh Beverages Private Limited) section
  const aadishDirector = LEADERSHIP_DATA.directors.find(
    (d) => d.slug === "aadish-goel",
  );

  // The other 3 PBPL Directors hyperlinked to their PRL profile pages
  const pbplLinkedDirectors = [
    {
      name: "Naresh Goel",
      designation: "Chairman & Managing Director, PRL",
      roleInSubsidiary: "Director, Pingaksh Beverages . Ltd.",
      href: "/who-we-are/board-of-directors/naresh-goel",
    },
    {
      name: "Amul Goel",
      designation: "Director, PRL",
      roleInSubsidiary: "Director, Pingaksh Beverages . Ltd.",
      href: "/who-we-are/board-of-directors/amul-goel",
    },
    {
      name: "Suman Goel",
      designation: "Director, PRL",
      roleInSubsidiary: "Director, Pingaksh Beverages . Ltd.",
      href: "/who-we-are/board-of-directors/suman-goel",
    },
  ];

  const founder = prlDirectorsList.find((d) => d.isFounder);

  const filteredDirectors: DirectorProfile[] =
    activeFilter === "All"
      ? prlDirectorsList
      : prlDirectorsList.filter((d) => d.boardCategory === activeFilter);

  const filterCategories: FilterType[] = [
    "All",
    "Promoter & Executive",
    "Independent Director",
  ];

  return (
    <main className="bg-background-warm text-pingaksh-navy">
      {/* =====================================================================
          1. ARCHITECTURAL HEADER (Navy Surface + Clean Typography)
      ===================================================================== */}
      <header className="bg-pingaksh-navy text-white pt-32 pb-16 lg:pt-40 lg:pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-sand-200/75 pb-8 border-b border-white/10"
          >
            {LEADERSHIP_DATA.breadcrumbs.map((crumb, idx) => {
              const isLast = idx === LEADERSHIP_DATA.breadcrumbs.length - 1;
              return (
                <React.Fragment key={crumb.href}>
                  {isLast ? (
                    <span
                      aria-current="page"
                      className="text-pingaksh-sand font-medium"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                  {!isLast && (
                    <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="lg:col-span-7"
            >
              <h1 className="font-logo text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
                {LEADERSHIP_DATA.hero.title}
              </h1>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              custom={0.1}
              className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-8 space-y-2"
            >
              <p className="text-sm sm:text-base text-sand-100/90 leading-relaxed">
                {LEADERSHIP_DATA.hero.subtitle}
              </p>
              <p className="text-xs text-pingaksh-sand font-medium pt-1">
                {LEADERSHIP_DATA.hero.boardSummaryStat}
              </p>
            </motion.div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          2. CHAIRMAN & FOUNDER MONOGRAPH SPOTLIGHT
      ===================================================================== */}
      {founder && (
        <section className="py-16 lg:py-24 border-b border-sand-300 bg-sand-100/60">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={revealVariants}
              className="grid grid-cols-1 lg:grid-cols-12 bg-white border border-sand-300 shadow-sm overflow-hidden"
            >
              {/* Left Portrait */}
              <div className="lg:col-span-5 relative aspect-[4/5] lg:aspect-auto overflow-hidden bg-navy-950">
                <img
                  src={founder.portraitImage}
                  alt={founder.portraitAlt}
                  width={900}
                  height={1100}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Right Editorial Statement */}
              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="pb-6 border-b border-sand-200 flex flex-wrap items-baseline justify-between gap-4">
                    <div>
                      <h2 className="font-logo text-3xl sm:text-4xl text-pingaksh-navy">
                        {founder.name}
                      </h2>
                      <p className="text-sm font-semibold text-pingaksh-terracotta mt-1">
                        {founder.designation}
                      </p>
                    </div>
                    <span className="text-xs text-navy-500 font-mono">
                      {founder.dinNumber}
                    </span>
                  </div>

                  <blockquote className="font-logo text-xl sm:text-2xl text-pingaksh-navy leading-relaxed">
                    &ldquo;{founder.executiveQuote}&rdquo;
                  </blockquote>

                  <p className="text-sm sm:text-base text-navy-700 leading-relaxed">
                    {founder.biographyParagraphs[0]}
                  </p>
                </div>

                <div className="pt-8 mt-8 border-t border-sand-200 flex items-center justify-between">
                  <span className="text-xs text-navy-500">
                    Board Tenure: Since {founder.appointedSince}
                  </span>

                  <Link
                    href={`/who-we-are/board-of-directors/${founder.slug}`}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-pingaksh-navy hover:text-pingaksh-terracotta transition-colors group"
                  >
                    <span>Read Full Executive Profile</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* =====================================================================
          3. FULL BOARD OF DIRECTORS PORTRAIT GRID (6 PRL DIRECTORS)
      ===================================================================== */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Top Bar: Heading + Category Filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-sand-300 gap-6">
            <div>
              <h2 className="font-logo text-3xl sm:text-4xl text-pingaksh-navy">
                Board Composition — Pingaksh Renewables Limited
              </h2>
              <p className="text-sm text-navy-600 mt-1">
                Select any director to view their complete biography, academic
                background, and board committee memberships.
              </p>
            </div>

            {/* Clean Architectural Filter Bar */}
            <div className="flex flex-wrap gap-1.5">
              {filterCategories.map((category) => {
                const isActive = activeFilter === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveFilter(category)}
                    className={`px-4 py-2 text-xs font-semibold transition-colors cursor-pointer border ${
                      isActive
                        ? "bg-pingaksh-navy text-white border-pingaksh-navy"
                        : "bg-white text-navy-700 border-sand-300 hover:border-pingaksh-navy"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3-Column Portrait Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
            {filteredDirectors.map((director, idx) => (
              <motion.div
                key={director.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={revealVariants}
                custom={(idx % 3) * 0.08}
              >
                <Link
                  href={`/who-we-are/board-of-directors/${director.slug}`}
                  className="group block h-full bg-white border border-sand-300 hover:border-pingaksh-navy transition-colors duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Portrait Container */}
                    <div className="relative aspect-[4/4.6] overflow-hidden bg-navy-950">
                      <img
                        src={director.portraitImage}
                        alt={director.portraitAlt}
                        width={600}
                        height={700}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                      <span className="absolute top-4 left-4 px-3 py-1 bg-pingaksh-navy/90 text-pingaksh-sand text-[11px] font-medium tracking-wide">
                        {director.boardCategory}
                      </span>
                    </div>

                    {/* Text Details */}
                    <div className="p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-logo text-2xl text-pingaksh-navy group-hover:text-pingaksh-terracotta transition-colors">
                          {director.name}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-navy-400 group-hover:text-pingaksh-terracotta group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 mt-1" />
                      </div>

                      <p className="text-xs font-semibold text-pingaksh-terracotta mt-1">
                        {director.designation}
                      </p>

                      <p className="text-xs text-navy-600 mt-4 leading-relaxed line-clamp-3">
                        {director.shortSummary}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 sm:px-7 py-4 border-t border-sand-200 flex items-center justify-between text-[11px] text-navy-500">
                    <span>{director.almaMater}</span>
                    <span className="font-semibold text-pingaksh-navy group-hover:text-pingaksh-terracotta">
                      View Profile
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. SUBSIDIARY LEADERSHIP — PINGAKSH BEVERAGES PRIVATE LIMITED (PBPL)
      ===================================================================== */}
      <section className="py-16 lg:py-24 bg-sand-200 border-t border-sand-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-sand-300 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-pingaksh-terracotta mb-2">
                <Building2 className="w-4 h-4" />
                <span>Subsidiary Board of Directors</span>
              </div>
              <h2 className="font-logo text-3xl sm:text-4xl text-pingaksh-navy">
                Pingaksh Beverages Private Limited
              </h2>
              <p className="text-sm text-navy-600 mt-1">
                Leadership overseeing the Group&apos;s grain-based ethanol
                subsidiary and distillery operations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 items-stretch">
            {/* Left: Aadish Goel Full Profile Card (Waist-Level Crop Applied) */}
            {aadishDirector && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={revealVariants}
                className="lg:col-span-5"
              >
                <Link
                  href={`/who-we-are/board-of-directors/${aadishDirector.slug}`}
                  className="group flex flex-col justify-between h-full bg-white border border-sand-300 hover:border-pingaksh-navy shadow-sm transition-all duration-300"
                >
                  <div>
                    {/* Waist-Level Crop Container for Aadish Goel */}
                    <div className="relative aspect-[4/4.3] overflow-hidden bg-navy-950">
                      <img
                        src={aadishDirector.portraitImage}
                        alt={aadishDirector.portraitAlt}
                        width={600}
                        height={700}
                        className="w-full h-full object-cover object-top scale-125 origin-top transition-transform duration-700 group-hover:scale-[1.3]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-60" />

                      <span className="absolute top-4 left-4 px-3 py-1 bg-pingaksh-terracotta text-white text-[11px] font-bold tracking-wide shadow-sm">
                        Subsidiary Director
                      </span>
                    </div>

                    <div className="p-6 sm:p-8">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy group-hover:text-pingaksh-terracotta transition-colors">
                          {aadishDirector.name}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-navy-400 group-hover:text-pingaksh-terracotta group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 mt-1" />
                      </div>

                      <p className="text-xs font-semibold text-pingaksh-terracotta mt-1">
                        {aadishDirector.designation}
                      </p>

                      <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-navy-600 bg-sand-100 px-2.5 py-1 rounded">
                        <Building2 className="w-3.5 h-3.5 text-pingaksh-terracotta" />
                        <span>Pingaksh Beverages . Ltd. (PBPL)</span>
                      </div>

                      <p className="text-xs sm:text-sm text-navy-600 mt-4 leading-relaxed">
                        {aadishDirector.shortSummary}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 sm:px-8 py-4 border-t border-sand-200 flex items-center justify-between text-xs text-navy-500 bg-sand-50/50">
                    <span>{aadishDirector.almaMater}</span>
                    <span className="font-semibold text-pingaksh-navy group-hover:text-pingaksh-terracotta">
                      Read Full Profile →
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Right: Other Directors on the PBPL Board (Hyperlinked to PRL Profiles) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={revealVariants}
              custom={0.1}
              className="lg:col-span-7 bg-white border border-sand-300 p-8 sm:p-10 lg:p-12 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="pb-6 border-b border-sand-200">
                  <span className="text-xs font-mono uppercase tracking-widest text-pingaksh-terracotta font-semibold">
                    Board of Directors • PBPL
                  </span>
                  <h3 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy mt-1">
                    Other Directors on the Subsidiary Board
                  </h3>
                  <p className="text-xs sm:text-sm text-navy-600 mt-2 leading-relaxed">
                    Along with Aadish Goel, the Board of Directors of Pingaksh
                    Beverages Private Limited comprises the following promoter
                    directors from Pingaksh Renewables Limited. Select any name
                    below to view their full profile:
                  </p>
                </div>

                {/* Hyperlinked List of Naresh Goel, Amul Goel, Suman Goel */}
                <div className="divide-y divide-sand-200 mt-4">
                  {pbplLinkedDirectors.map((member) => (
                    <Link
                      key={member.href}
                      href={member.href}
                      className="group py-5 flex items-center justify-between gap-4 hover:bg-sand-100/60 px-4 -mx-4 transition-colors"
                    >
                      <div>
                        <h4 className="font-logo text-xl sm:text-2xl text-pingaksh-navy group-hover:text-pingaksh-terracotta transition-colors">
                          {member.name}
                        </h4>
                        <p className="text-xs text-navy-600 mt-0.5">
                          {member.roleInSubsidiary} •{" "}
                          <span className="text-pingaksh-terracotta font-medium">
                            {member.designation}
                          </span>
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-pingaksh-navy group-hover:text-pingaksh-terracotta shrink-0">
                        <span>View PRL Profile</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-sand-200 flex items-center justify-between text-xs text-navy-500">
                <span>
                  Subsidiary Entity: Pingaksh Beverages Private Limited
                </span>
                <span className="font-mono text-[11px] text-pingaksh-terracotta">
                  Grain-Based Ethanol Division
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

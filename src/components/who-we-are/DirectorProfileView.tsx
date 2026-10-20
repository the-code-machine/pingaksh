"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { LEADERSHIP_DATA, type DirectorProfile } from "@/data/leadershipData";

interface DirectorProfileViewProps {
  director: DirectorProfile;
}

export default function DirectorProfileView({
  director,
}: DirectorProfileViewProps) {
  const allDirectors = LEADERSHIP_DATA.directors;
  const currentIndex = allDirectors.findIndex((d) => d.slug === director.slug);
  const prevDirector =
    currentIndex > 0
      ? allDirectors[currentIndex - 1]
      : allDirectors[allDirectors.length - 1];
  const nextDirector =
    currentIndex < allDirectors.length - 1
      ? allDirectors[currentIndex + 1]
      : allDirectors[0];

  return (
    <article className="bg-background-warm text-pingaksh-navy">
      {/* =====================================================================
          1. TOP HEADER BAR (Breadcrumbs & Back Navigation)
      ===================================================================== */}
      <header className="bg-pingaksh-navy text-white pt-32 pb-12 lg:pt-36 lg:pb-14 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center flex-wrap gap-2 text-xs text-sand-200/75"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              <Link
                href="/who-we-are"
                className="hover:text-white transition-colors"
              >
                Who We Are
              </Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              <Link
                href="/who-we-are/board-of-directors"
                className="hover:text-white transition-colors"
              >
                Board of Directors
              </Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              <span
                aria-current="page"
                className="text-pingaksh-sand font-medium"
              >
                {director.name}
              </span>
            </nav>

            <Link
              href="/who-we-are/board-of-directors"
              className="inline-flex items-center gap-2 text-xs font-semibold text-pingaksh-sand hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Board Members</span>
            </Link>
          </div>

          <div className="pt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-medium text-pingaksh-sand tracking-wide">
                {director.boardCategory} • {director.dinNumber}
              </span>
              <h1 className="font-logo text-4xl sm:text-5xl lg:text-6xl text-white mt-2">
                {director.name}
              </h1>
              <p className="text-base sm:text-lg text-sand-200 mt-2">
                {director.designation}
              </p>
            </div>

            <div className="text-xs text-sand-300 lg:text-right">
              <span className="block text-white/60">Board Appointment</span>
              <span className="font-semibold text-white">
                Since {director.appointedSince}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          2. MAIN EXECUTIVE MONOGRAPH (Sticky Portrait Left + Narrative Right)
      ===================================================================== */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Portrait & Quick Dossier */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-4 lg:sticky lg:top-28 space-y-6"
            >
              <div className="bg-white border border-sand-300 overflow-hidden shadow-sm">
                <div className="aspect-[4/4.8] bg-navy-950 overflow-hidden">
                  <img
                    src={director.portraitImage}
                    alt={director.portraitAlt}
                    width={700}
                    height={840}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Academic & Statutory Dossier */}
                <div className="p-6 space-y-5 divide-y divide-sand-200 text-xs">
                  <div>
                    <span className="block text-navy-500 font-medium">
                      Alma Mater
                    </span>
                    <span className="block text-sm font-semibold text-pingaksh-navy mt-1">
                      {director.almaMater}
                    </span>
                  </div>

                  <div className="pt-4">
                    <span className="block text-navy-500 font-medium">
                      Academic & Professional Credentials
                    </span>
                    <ul className="mt-2 space-y-1.5 text-pingaksh-navy font-medium">
                      {director.qualifications.map((q) => (
                        <li key={q}>{q}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <span className="block text-navy-500 font-medium">
                      Group Directorships & Affiliations
                    </span>
                    <ul className="mt-2 space-y-1.5 text-navy-700">
                      {director.directorshipsAndAffiliations.map((aff) => (
                        <li key={aff}>{aff}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Right Column: Biography, Quote, Responsibilities & Committees */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="lg:col-span-8 space-y-12"
            >
              {/* Executive Quote */}
              <blockquote className="p-8 sm:p-10 bg-white border-l-4 border-pingaksh-terracotta border-y border-r border-sand-300">
                <p className="font-logo text-xl sm:text-2xl lg:text-[26px] text-pingaksh-navy leading-relaxed">
                  &ldquo;{director.executiveQuote}&rdquo;
                </p>
                <footer className="mt-4 text-xs font-semibold text-pingaksh-terracotta">
                  — {director.name}, {director.designation}
                </footer>
              </blockquote>

              {/* Full Multi-Paragraph Biography */}
              <div className="space-y-5">
                <h2 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy pb-3 border-b border-sand-300">
                  Executive Biography
                </h2>
                {director.biographyParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-sm sm:text-base text-navy-800 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Key Mandate & Strategic Responsibilities */}
              <div className="space-y-5">
                <h2 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy pb-3 border-b border-sand-300">
                  Strategic Portfolio & Oversight
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {director.keyResponsibilities.map((resp, i) => (
                    <div
                      key={i}
                      className="p-5 bg-white border border-sand-300 flex items-start gap-3.5"
                    >
                      <span className="font-logo text-lg text-pingaksh-terracotta shrink-0">
                        0{i + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-pingaksh-navy font-medium leading-relaxed">
                        {resp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Board Committee Memberships */}
              <div className="space-y-5">
                <h2 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy pb-3 border-b border-sand-300">
                  Board Committee Memberships
                </h2>
                <div className="bg-white border border-sand-300 divide-y divide-sand-200">
                  {director.committees.map((comm) => (
                    <div
                      key={comm.name}
                      className="px-6 py-4 flex items-center justify-between gap-4 text-xs sm:text-sm"
                    >
                      <span className="font-semibold text-pingaksh-navy">
                        {comm.name}
                      </span>
                      <span
                        className={`px-3 py-1 text-xs font-semibold ${
                          comm.role === "Chairperson"
                            ? "bg-pingaksh-navy text-pingaksh-sand"
                            : "bg-sand-100 text-navy-700"
                        }`}
                      >
                        {comm.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. PREVIOUS / NEXT DIRECTOR PAGINATION STRIP
      ===================================================================== */}
      <section className="border-t border-sand-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-sand-300">
            <Link
              href={`/who-we-are/board-of-directors/${prevDirector.slug}`}
              className="py-8 pr-6 flex items-center justify-between group"
            >
              <div>
                <span className="text-xs text-navy-500 flex items-center gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  Previous Board Member
                </span>
                <p className="font-logo text-xl sm:text-2xl text-pingaksh-navy group-hover:text-pingaksh-terracotta transition-colors mt-1">
                  {prevDirector.name}
                </p>
                <span className="text-xs text-navy-600">
                  {prevDirector.designation}
                </span>
              </div>
            </Link>

            <Link
              href={`/who-we-are/board-of-directors/${nextDirector.slug}`}
              className="py-8 sm:pl-6 flex items-center justify-end text-right group"
            >
              <div>
                <span className="text-xs text-navy-500 flex items-center justify-end gap-1.5">
                  Next Board Member
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <p className="font-logo text-xl sm:text-2xl text-pingaksh-navy group-hover:text-pingaksh-terracotta transition-colors mt-1">
                  {nextDirector.name}
                </p>
                <span className="text-xs text-navy-600">
                  {nextDirector.designation}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

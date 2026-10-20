"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight, ArrowUpRight, ArrowLeft } from "lucide-react";
import {
  SUBSIDIARY_LEADERSHIP_DATA,
  type SubsidiaryEntityId,
} from "@/data/subsidiaryLeadershipData";

type FilterEntity = "all" | SubsidiaryEntityId;

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

export default function SubsidiaryLeadershipView() {
  const data = SUBSIDIARY_LEADERSHIP_DATA;
  const [selectedEntity, setSelectedEntity] = useState<FilterEntity>("all");

  const filteredLeaders =
    selectedEntity === "all"
      ? data.leaders
      : data.leaders.filter((l) => l.subsidiaryId === selectedEntity);

  return (
    <main className="bg-background-warm text-pingaksh-navy">
      {/* =====================================================================
          1. ARCHITECTURAL HEADER & GOVERNANCE TIER SWITCHER
      ===================================================================== */}
      <header className="bg-pingaksh-navy text-white pt-32 pb-16 lg:pt-40 lg:pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Breadcrumbs + Direct Switcher to Statutory Board */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center flex-wrap gap-2 text-xs text-sand-200/75"
            >
              {data.breadcrumbs.map((crumb, idx) => {
                const isLast = idx === data.breadcrumbs.length - 1;
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

            {/* Governance Tier Toggle Pill */}
            <div className="inline-flex border border-white/20 bg-navy-950 p-1">
              <Link
                href="/who-we-are/board-of-directors"
                className="px-3.5 py-1.5 text-xs text-sand-200 hover:text-white transition-colors"
              >
                Group Board of Directors
              </Link>
              <span className="px-3.5 py-1.5 text-xs font-semibold bg-pingaksh-sand text-pingaksh-navy">
                Subsidiary & Operating Heads
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="lg:col-span-7"
            >
              <h1 className="font-logo text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
                {data.hero.title}
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
                {data.hero.subtitle}
              </p>
              <p className="text-xs text-pingaksh-sand font-medium pt-1">
                {data.hero.summaryStat}
              </p>
            </motion.div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          2. OPERATING SUBSIDIARY ENTITIES MATRIX (Interactive Filter Cards)
      ===================================================================== */}
      <section className="py-14 lg:py-20 border-b border-sand-300 bg-sand-100/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 gap-4">
            <div>
              <h2 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy">
                Operating Entities & Special Purpose Vehicles (SPVs)
              </h2>
              <p className="text-xs sm:text-sm text-navy-600 mt-1">
                Select an operating entity below to filter its executive
                management team, or view all subsidiary leaders.
              </p>
            </div>

            {selectedEntity !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedEntity("all")}
                className="text-xs font-semibold text-pingaksh-terracotta hover:underline cursor-pointer"
              >
                Reset Filter — Show All Leaders ({data.leaders.length})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 border border-sand-300 bg-white divide-y lg:divide-y-0 lg:divide-x divide-sand-300">
            {data.entities.map((entity, idx) => {
              const isSelected = selectedEntity === entity.id;
              return (
                <button
                  key={entity.id}
                  type="button"
                  onClick={() =>
                    setSelectedEntity(isSelected ? "all" : entity.id)
                  }
                  className={`p-7 sm:p-8 text-left transition-colors cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-pingaksh-navy text-white"
                      : "bg-white text-pingaksh-navy hover:bg-sand-50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs pb-3 border-b border-current/15">
                      <span
                        className={`font-bold uppercase tracking-wider ${
                          isSelected
                            ? "text-pingaksh-sand"
                            : "text-pingaksh-terracotta"
                        }`}
                      >
                        Entity 0{idx + 1} • {entity.shortName}
                      </span>
                      <span
                        className={
                          isSelected ? "text-sand-200" : "text-navy-500"
                        }
                      >
                        {isSelected ? "Active Filter" : "Click to Filter"}
                      </span>
                    </div>

                    <h3 className="font-logo text-xl sm:text-2xl mt-4">
                      {entity.legalName}
                    </h3>

                    <p
                      className={`text-xs sm:text-sm mt-2.5 leading-relaxed ${
                        isSelected ? "text-sand-200/90" : "text-navy-600"
                      }`}
                    >
                      {entity.coreMandate}
                    </p>
                  </div>

                  <div
                    className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-semibold ${
                      isSelected
                        ? "border-white/15 text-pingaksh-sand"
                        : "border-sand-200 text-pingaksh-navy"
                    }`}
                  >
                    <span>{entity.flagshipAssetMetric}</span>
                    <span>{entity.headquarters.split(",")[0]}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. SUBSIDIARY EXECUTIVES & PLANT HEADS PORTRAIT GRID
      ===================================================================== */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-sand-300 gap-6">
            <div>
              <h2 className="font-logo text-3xl sm:text-4xl text-pingaksh-navy">
                Executive Management & Division Heads
              </h2>
              <p className="text-sm text-navy-600 mt-1">
                Select any operating leader to inspect their engineering track
                record, project commissioning history, and operational mandate.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedEntity("all")}
                className={`px-4 py-2 text-xs font-semibold border transition-colors cursor-pointer ${
                  selectedEntity === "all"
                    ? "bg-pingaksh-navy text-white border-pingaksh-navy"
                    : "bg-white text-navy-700 border-sand-300 hover:border-pingaksh-navy"
                }`}
              >
                All Subsidiaries ({data.leaders.length})
              </button>
              {data.entities.map((ent) => (
                <button
                  key={ent.id}
                  type="button"
                  onClick={() => setSelectedEntity(ent.id)}
                  className={`px-4 py-2 text-xs font-semibold border transition-colors cursor-pointer ${
                    selectedEntity === ent.id
                      ? "bg-pingaksh-navy text-white border-pingaksh-navy"
                      : "bg-white text-navy-700 border-sand-300 hover:border-pingaksh-navy"
                  }`}
                >
                  {ent.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* 3-Column Portrait Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
            {filteredLeaders.map((leader, idx) => (
              <motion.div
                key={leader.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={revealVariants}
                custom={(idx % 3) * 0.08}
              >
                <Link
                  href={`/who-we-are/subsidiary-leadership/${leader.slug}`}
                  className="group block h-full bg-white border border-sand-300 hover:border-pingaksh-navy transition-colors duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Portrait Image */}
                    <div className="relative aspect-[4/4.6] overflow-hidden bg-navy-950">
                      <img
                        src={leader.portraitImage}
                        alt={leader.portraitAlt}
                        width={600}
                        height={700}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/65 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                      <span className="absolute top-4 left-4 px-3 py-1 bg-pingaksh-navy/90 text-pingaksh-sand text-[11px] font-medium">
                        {leader.subsidiaryName.split(" (")[0]}
                      </span>

                      <span className="absolute bottom-4 left-4 px-2.5 py-1 bg-navy-950/85 text-white text-[11px] font-mono">
                        {leader.experienceYears}
                      </span>
                    </div>

                    {/* Text Details */}
                    <div className="p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-logo text-2xl text-pingaksh-navy group-hover:text-pingaksh-terracotta transition-colors">
                          {leader.name}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-navy-400 group-hover:text-pingaksh-terracotta group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 mt-1" />
                      </div>

                      <p className="text-xs font-semibold text-pingaksh-terracotta mt-1">
                        {leader.designation}
                      </p>

                      <p className="text-xs text-navy-600 mt-4 leading-relaxed line-clamp-3">
                        {leader.shortSummary}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 sm:px-7 py-4 border-t border-sand-200 flex items-center justify-between text-[11px] text-navy-500">
                    <span className="truncate pr-2">
                      {leader.operationalBase}
                    </span>
                    <span className="font-semibold text-pingaksh-navy group-hover:text-pingaksh-terracotta shrink-0">
                      View Dossier
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom Cross-Link Banner to Statutory Board of Directors */}
          <div className="mt-16 border border-sand-300 bg-white p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-pingaksh-terracotta">
                Group Fiduciary Oversight
              </span>
              <h3 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy mt-1">
                Inspect the Statutory Group Board of Directors
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 mt-1">
                View profiles of our Promoter Directors and Non-Executive
                Independent Directors governing capital allocation and statutory
                compliance.
              </p>
            </div>

            <Link
              href="/who-we-are/board-of-directors"
              className="px-6 py-3.5 bg-pingaksh-navy text-pingaksh-sand hover:bg-navy-800 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shrink-0 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>View Board of Directors</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

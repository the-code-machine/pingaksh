"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { ZERO_LIQUID_DISCHARGE_DATA } from "@/data/zeroLiquidDischargeData";

type WaterScalePreset = "1-kl" | "250-klpd" | "350-klpd" | "annual-86ml";

const fadeUp = {
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

export default function ZeroLiquidDischargeView() {
  const data = ZERO_LIQUID_DISCHARGE_DATA;

  // 1. Active ZLD Process Stage State
  const [selectedStageIdx, setSelectedStageIdx] = useState<number>(0);
  const currentStage = data.zldArchitecture.stages[selectedStageIdx];

  // 2. Water Mass-Balance Scale Preset
  const [waterScale, setWaterScale] = useState<WaterScalePreset>("250-klpd");

  const activeKlVolume =
    waterScale === "1-kl"
      ? 1
      : waterScale === "250-klpd"
        ? 250
        : waterScale === "350-klpd"
          ? 350
          : 86250; // 86.25 Million Liters Annual Output

  const sim = data.waterBalanceSimulator;

  const formatWaterVolume = (liters: number) => {
    if (liters >= 1000000) {
      return `${(liters / 1000000).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })} Million L`;
    }
    if (liters >= 1000) {
      return `${(liters / 1000).toLocaleString("en-IN", {
        maximumFractionDigits: 1,
      })} KL`;
    }
    return `${liters.toLocaleString("en-IN")} L`;
  };

  const formatSolidsMass = (kg: number) => {
    if (kg >= 1000) {
      return `${(kg / 1000).toLocaleString("en-IN", {
        maximumFractionDigits: 1,
      })} MT`;
    }
    return `${kg.toLocaleString("en-IN")} kg`;
  };

  return (
    <main className="bg-background-warm text-pingaksh-navy">
      {/* =====================================================================
          1. ARCHITECTURAL HEADER & ZLD KPI STRIP
      ===================================================================== */}
      <header className="bg-pingaksh-navy text-white pt-32 pb-16 lg:pt-40 lg:pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Breadcrumbs + Back Link */}
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

            <Link
              href="/sustainability/carbon-dashboard"
              className="inline-flex items-center gap-2 text-xs font-semibold text-pingaksh-sand hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Live Carbon Dashboard</span>
            </Link>
          </div>

          {/* Title & Subtitle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="lg:col-span-7"
            >
              <span className="text-xs font-medium text-pingaksh-sand tracking-wide">
                {data.hero.complianceStandard}
              </span>
              <h1 className="font-logo text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.08] mt-2">
                {data.hero.title}
              </h1>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.1}
              className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-8"
            >
              <p className="text-sm sm:text-base text-sand-100/90 leading-relaxed">
                {data.hero.subtitle}
              </p>
            </motion.div>
          </div>

          {/* 4-Column ZLD KPI Strip */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.2}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-white/15 bg-navy-950/80 divide-y sm:divide-y-0 sm:divide-x divide-white/15 mt-14"
          >
            {data.hero.kpis.map((kpi, idx) => (
              <div key={idx} className="p-6 flex flex-col justify-between">
                <div>
                  <span className="block text-xs text-sand-300">
                    {kpi.label}
                  </span>
                  <span className="block font-logo text-3xl sm:text-4xl text-white mt-2">
                    {kpi.value}
                  </span>
                  <span className="block text-xs text-pingaksh-sand mt-1">
                    {kpi.unit}
                  </span>
                </div>
                <span className="inline-block mt-4 pt-3 border-t border-white/10 text-xs font-semibold text-emerald-400">
                  {kpi.benchmarkNote}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* =====================================================================
          2. INTERACTIVE 6-STAGE CLOSED-LOOP ZLD ARCHITECTURE
      ===================================================================== */}
      <section className="py-16 lg:py-24 border-b border-sand-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl pb-12">
            <h2 className="font-logo text-3xl sm:text-4xl text-pingaksh-navy">
              {data.zldArchitecture.heading}
            </h2>
            <p className="text-sm sm:text-base text-navy-600 mt-2 leading-relaxed">
              {data.zldArchitecture.subheading}
            </p>
          </div>

          {/* 6-Stage Horizontal / Grid Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 border border-sand-300 bg-background-warm divide-y sm:divide-y-0 sm:divide-x divide-sand-300">
            {data.zldArchitecture.stages.map((stage, idx) => {
              const isSelected = selectedStageIdx === idx;
              return (
                <button
                  key={stage.stageNumber}
                  type="button"
                  onClick={() => setSelectedStageIdx(idx)}
                  className={`p-5 text-left transition-colors cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-pingaksh-navy text-white"
                      : "bg-white text-pingaksh-navy hover:bg-sand-100/70"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className={`font-logo text-xl ${
                          isSelected
                            ? "text-pingaksh-sand"
                            : "text-pingaksh-terracotta"
                        }`}
                      >
                        Stage {stage.stageNumber}
                      </span>
                      <ArrowRight
                        className={`w-3.5 h-3.5 ${
                          isSelected ? "text-pingaksh-sand" : "text-navy-400"
                        }`}
                      />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold mt-3 leading-snug">
                      {stage.title}
                    </h3>
                  </div>

                  <span
                    className={`block text-[11px] mt-4 pt-2 border-t font-medium ${
                      isSelected
                        ? "border-white/15 text-emerald-300"
                        : "border-sand-200 text-navy-500"
                    }`}
                  >
                    {stage.equipmentUnit}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Engineering Dossier */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.stageNumber}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
              className="border-x border-b border-sand-300 bg-background-warm p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Stage Identity & Input/Output Streams */}
              <div className="lg:col-span-5 space-y-5 border-b lg:border-b-0 lg:border-r border-sand-300 pb-6 lg:pb-0 lg:pr-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-pingaksh-terracotta">
                    Stage {currentStage.stageNumber} of 06 •{" "}
                    {currentStage.equipmentUnit}
                  </span>
                  <h3 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy mt-1.5">
                    {currentStage.title}
                  </h3>
                </div>

                <div className="bg-white border border-sand-300 divide-y divide-sand-200 text-xs">
                  <div className="p-3.5 flex justify-between gap-4">
                    <span className="text-navy-500 font-medium shrink-0">
                      Influent Stream:
                    </span>
                    <span className="font-semibold text-pingaksh-navy text-right">
                      {currentStage.inputStream}
                    </span>
                  </div>
                  <div className="p-3.5 flex justify-between gap-4">
                    <span className="text-navy-500 font-medium shrink-0">
                      Processed Output:
                    </span>
                    <span className="font-semibold text-emerald-800 text-right">
                      {currentStage.outputStream}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Engineering Description & Operating Spec */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-sand-300">
                  <span className="px-3.5 py-1.5 bg-pingaksh-navy text-pingaksh-sand text-xs font-semibold">
                    {currentStage.waterRecoveryMetric}
                  </span>
                  <span className="text-xs font-mono text-navy-600">
                    {currentStage.engineeringParameter}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-navy-800 leading-relaxed">
                  {currentStage.technicalDescription}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedStageIdx((prev) =>
                        prev === 0
                          ? data.zldArchitecture.stages.length - 1
                          : prev - 1,
                      )
                    }
                    className="text-xs font-semibold text-pingaksh-navy hover:text-pingaksh-terracotta inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous ZLD Stage</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedStageIdx((prev) =>
                        prev === data.zldArchitecture.stages.length - 1
                          ? 0
                          : prev + 1,
                      )
                    }
                    className="text-xs font-semibold text-pingaksh-navy hover:text-pingaksh-terracotta inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next ZLD Stage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =====================================================================
          3. INTERACTIVE REFINERY WATER MASS-BALANCE SIMULATOR
      ===================================================================== */}
      <section className="py-16 lg:py-24 border-b border-sand-300 bg-sand-100/70">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Header + Scale Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-10 border-b border-sand-300 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-logo text-3xl sm:text-4xl text-pingaksh-navy">
                {sim.heading}
              </h2>
              <p className="text-sm text-navy-600 mt-2">{sim.subheading}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: "1-kl", label: "Per 1 KL Ethanol" },
                  { id: "250-klpd", label: "Daily Capacity (250 KLPD)" },
                  { id: "350-klpd", label: "Expanded Capacity (350 KLPD)" },
                  { id: "annual-86ml", label: "Annual (86.25 Million L)" },
                ] as { id: WaterScalePreset; label: string }[]
              ).map((preset) => {
                const isActive = waterScale === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setWaterScale(preset.id)}
                    className={`px-4 py-2.5 text-xs font-semibold border transition-colors cursor-pointer ${
                      isActive
                        ? "bg-pingaksh-navy text-white border-pingaksh-navy"
                        : "bg-white text-pingaksh-navy border-sand-300 hover:border-pingaksh-navy"
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5-Column Mass Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 border-t border-l border-sand-300 mt-10">
            <div className="bg-white border-r border-b border-sand-300 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-pingaksh-terracotta">
                  01 • Stillage Inflow
                </span>
                <h3 className="text-sm font-bold text-pingaksh-navy mt-1">
                  Whole Spent Wash Processed
                </h3>
                <span className="block font-logo text-3xl text-pingaksh-navy tabular-nums my-4">
                  {formatWaterVolume(
                    activeKlVolume * sim.rawStillageGeneratedLitersPerKl,
                  )}
                </span>
              </div>
              <p className="text-xs text-navy-600 pt-3 border-t border-sand-200">
                100% routed to Decanters & 7-Body MEE without open lagoons.
              </p>
            </div>

            <div className="bg-white border-r border-b border-sand-300 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700">
                  02 • Closed-Loop Recycle
                </span>
                <h3 className="text-sm font-bold text-pingaksh-navy mt-1">
                  Purified Condensate Recycled
                </h3>
                <span className="block font-logo text-3xl text-emerald-700 tabular-nums my-4">
                  {formatWaterVolume(
                    activeKlVolume * sim.condensateRecycledLitersPerKl,
                  )}
                </span>
              </div>
              <p className="text-xs text-navy-600 pt-3 border-t border-sand-200">
                84.5% of process water polished via CPU RO and reused in plant.
              </p>
            </div>

            <div className="bg-white border-r border-b border-sand-300 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-pingaksh-terracotta">
                  03 • Aquifer Conservation
                </span>
                <h3 className="text-sm font-bold text-pingaksh-navy mt-1">
                  Freshwater Saved vs. Legacy Norms
                </h3>
                <span className="block font-logo text-3xl text-pingaksh-navy tabular-nums my-4">
                  {formatWaterVolume(
                    activeKlVolume *
                      sim.freshwaterSavedVsConventionalLitersPerKl,
                  )}
                </span>
              </div>
              <p className="text-xs text-navy-600 pt-3 border-t border-sand-200">
                Groundwater drawal avoided through internal condensate reuse.
              </p>
            </div>

            <div className="bg-white border-r border-b border-sand-300 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-pingaksh-terracotta">
                  04 • Nutrient Recovery
                </span>
                <h3 className="text-sm font-bold text-pingaksh-navy mt-1">
                  Organic Solids Valorized to DDGS
                </h3>
                <span className="block font-logo text-3xl text-pingaksh-navy tabular-nums my-4">
                  {formatSolidsMass(
                    activeKlVolume * sim.wetCakeSolidsRecoveredKgPerKl,
                  )}
                </span>
              </div>
              <p className="text-xs text-navy-600 pt-3 border-t border-sand-200">
                Suspended & dissolved grain solids converted into cattle feed.
              </p>
            </div>

            <div className="bg-pingaksh-navy text-white border-r border-b border-navy-800 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-pingaksh-sand">
                  05 • External Discharge
                </span>
                <h3 className="text-sm font-bold text-white mt-1">
                  Effluent Released Outside Plant
                </h3>
                <span className="block font-logo text-3xl text-emerald-400 tabular-nums my-4">
                  0.0 Liters
                </span>
              </div>
              <p className="text-xs text-sand-200/80 pt-3 border-t border-white/15">
                Verified 24×7 by CPCB online flowmeters and PTZ cameras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. WATER QUALITY ASSAY LEDGER & HYDRO STEWARDSHIP
      ===================================================================== */}
      <section className="py-16 lg:py-24 bg-pingaksh-navy text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-16">
          {/* Part A: Laboratory Water Quality Table */}
          <div>
            <div className="max-w-3xl pb-10">
              <h2 className="font-logo text-3xl sm:text-4xl text-white">
                {data.waterQualityLedger.heading}
              </h2>
              <p className="text-sm sm:text-base text-sand-200/80 mt-2">
                {data.waterQualityLedger.subheading}
              </p>
            </div>

            <div className="border border-white/15 bg-navy-950/70 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/15 bg-white/5 text-sand-300">
                    <th className="py-4 px-5 font-semibold">
                      Analytical Parameter
                    </th>
                    <th className="py-4 px-5 font-semibold text-terracotta-400">
                      Untreated Raw Stillage
                    </th>
                    <th className="py-4 px-5 font-semibold text-emerald-400">
                      Polished CPU RO Permeate
                    </th>
                    <th className="py-4 px-5 font-semibold">
                      CPCB Reuse Standard
                    </th>
                    <th className="py-4 px-5 font-semibold text-right">
                      Internal Closed-Loop Destination
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {data.waterQualityLedger.assayRows.map((row) => (
                    <tr
                      key={row.parameter}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-5 font-semibold text-white">
                        {row.parameter}
                      </td>
                      <td className="py-4 px-5 text-terracotta-300 font-mono">
                        {row.rawSpentWashInfluent}
                      </td>
                      <td className="py-4 px-5 text-emerald-400 font-bold font-mono">
                        {row.treatedCpuRoPermeate}
                      </td>
                      <td className="py-4 px-5 text-sand-200 font-mono">
                        {row.cpcbStatutoryLimit}
                      </td>
                      <td className="py-4 px-5 text-right text-sand-100">
                        {row.reuseDestination}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-pingaksh-sand mt-4">
              {data.waterQualityLedger.telemetryNote}
            </p>
          </div>

          {/* Part B: Hydroelectric Non-Consumptive Water Stewardship */}
          <div className="border border-white/15 bg-navy-950 p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/15 pb-6 lg:pb-0 lg:pr-8">
              <span className="text-xs font-semibold text-pingaksh-sand uppercase tracking-wider">
                Uttar Bharat Hydro Power (UBHP)
              </span>
              <h3 className="font-logo text-2xl sm:text-3xl text-white mt-2">
                {data.waterQualityLedger.hydroStewardshipCard.title}
              </h3>
              <span className="inline-block mt-4 px-3.5 py-1.5 bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                {data.waterQualityLedger.hydroStewardshipCard.metric}
              </span>
              <p className="text-xs sm:text-sm text-sand-200/85 mt-4 leading-relaxed">
                {data.waterQualityLedger.hydroStewardshipCard.description}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="block text-xs font-semibold text-pingaksh-sand uppercase tracking-wider">
                Sarju River Basin Ecological Safeguards
              </span>
              <div className="space-y-3">
                {data.waterQualityLedger.hydroStewardshipCard.keyControls.map(
                  (ctrl, i) => (
                    <div
                      key={i}
                      className="p-4 bg-white/5 border border-white/10 flex items-start gap-3.5 text-xs sm:text-sm text-sand-100"
                    >
                      <span className="font-logo text-pingaksh-sand shrink-0">
                        0{i + 1}
                      </span>
                      <span>{ctrl}</span>
                    </div>
                  ),
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  href="/sustainability/hydro-vs-coal"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-pingaksh-sand hover:text-white"
                >
                  <span>View Hydro vs. Coal Water Savings per MWh</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

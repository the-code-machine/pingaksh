"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight, ArrowUpRight, ArrowLeft } from "lucide-react";
import { HYDRO_VS_COAL_DATA } from "@/data/hydroVsCoalData";

type ScalePreset = "1-mwh" | "daily-cascade" | "annual-cascade" | "custom";

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

export default function HydroVsCoalView() {
  const data = HYDRO_VS_COAL_DATA;

  // Interactive Multiplier State for Pollutant Matrix
  const [scalePreset, setScalePreset] = useState<ScalePreset>("1-mwh");
  const [customMwh, setCustomMwh] = useState<number>(1000);

  const activeMwhMultiplier =
    scalePreset === "1-mwh"
      ? 1
      : scalePreset === "daily-cascade"
        ? 388.5
        : scalePreset === "annual-cascade"
          ? 141800
          : customMwh;

  // Format scaled numbers cleanly (switches kg to Metric Tonnes when >= 1,000 kg)
  const formatScaledMetric = (basePerMwh: number, unit: string) => {
    const rawTotal = basePerMwh * activeMwhMultiplier;

    if (unit === "kg" && rawTotal >= 1000) {
      return `${(rawTotal / 1000).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })} MT`;
    }
    if (unit === "Liters" && rawTotal >= 1000000) {
      return `${(rawTotal / 1000000).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })} Million L`;
    }
    return `${rawTotal.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })} ${unit}`;
  };

  // Totals for the Powerhouse Audit Table
  const totalCapacityText = "33.0 MW (8 Generating Units)";
  const totalAnnualMwh = data.cascadeLedger.rows.reduce(
    (acc, r) => acc + r.annualGenerationMwh,
    0,
  );
  const totalCoalDisplaced = data.cascadeLedger.rows.reduce(
    (acc, r) => acc + r.coalDisplacedTonnes,
    0,
  );
  const totalCeaAvoided = data.cascadeLedger.rows.reduce(
    (acc, r) => acc + r.co2AvoidedTonnesCEA,
    0,
  );
  const totalLcaAvoided = data.cascadeLedger.rows.reduce(
    (acc, r) => acc + r.lifecycleCo2AvoidedTonnes,
    0,
  );

  return (
    <main className="bg-background-warm text-pingaksh-navy">
      {/* =====================================================================
          1. ARCHITECTURAL HEADER & PER-MWH SUMMARY STRIP
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
              className="lg:col-span-8"
            >
              <h1 className="font-logo text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.08] mt-2">
                {data.hero.title}
              </h1>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.1}
              className="lg:col-span-4 lg:border-l lg:border-white/15 lg:pl-8"
            >
              <p className="text-sm sm:text-base text-sand-100/90 leading-relaxed">
                {data.hero.subtitle}
              </p>
            </motion.div>
          </div>

          {/* 4-Column Per-MWh Comparison Strip */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.2}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-white/15 bg-navy-950/80 divide-y sm:divide-y-0 sm:divide-x divide-white/15 mt-14"
          >
            {data.hero.summaryKpis.map((kpi, idx) => (
              <div key={idx} className="p-6 flex flex-col justify-between">
                <div>
                  <span className="block text-xs text-sand-300">
                    {kpi.label}
                  </span>
                  <span className="block font-logo text-2xl sm:text-3xl text-white mt-2">
                    {kpi.hydroValue}
                  </span>
                  <span className="block text-xs text-terracotta-400 mt-1 line-through">
                    {kpi.coalBaseline}
                  </span>
                </div>
                <span className="inline-block mt-4 pt-3 border-t border-white/10 text-xs font-semibold text-emerald-400">
                  {kpi.deltaBadge}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* =====================================================================
          2. CRADLE-TO-GRAVE LIFECYCLE ASSESSMENT (ISO 14040 STAGE BREAKDOWN)
      ===================================================================== */}
      <section className="py-16 lg:py-24 border-b border-sand-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pb-12 border-b border-sand-300">
            <div className="lg:col-span-8">
              <h2 className="font-logo text-3xl sm:text-4xl text-pingaksh-navy">
                {data.lcaSection.heading}
              </h2>
              <p className="text-sm sm:text-base text-navy-600 mt-2 leading-relaxed">
                {data.lcaSection.subheading}
              </p>
            </div>

            {/* Summary Intensity Box */}
            <div className="lg:col-span-4 border border-sand-300 bg-sand-50 p-6 flex items-center justify-between">
              <div>
                <span className="block text-xs text-navy-600">
                  Net Lifecycle CO₂e Avoided
                </span>
                <span className="font-logo text-3xl sm:text-4xl text-pingaksh-navy">
                  {data.lcaSection.netLcaAvoidedKgPerMwh.toLocaleString()} kg
                </span>
                <span className="block text-xs text-pingaksh-terracotta font-semibold mt-0.5">
                  Per 1 MWh Generated (1.016 MT / MWh)
                </span>
              </div>
              <div className="text-right text-xs space-y-1">
                <div className="px-2.5 py-1 bg-emerald-900 text-white font-semibold">
                  Hydro: {data.lcaSection.totalHydroLcaKgPerMwh} kg
                </div>
                <div className="px-2.5 py-1 bg-pingaksh-terracotta text-white font-semibold">
                  Coal: {data.lcaSection.totalCoalLcaKgPerMwh} kg
                </div>
              </div>
            </div>
          </div>

          {/* 4 Lifecycle Stages Comparison Rows */}
          <div className="divide-y divide-sand-300 border-x border-b border-sand-300 bg-background-warm">
            {data.lcaSection.stages.map((stage, idx) => {
              const hydroWidthPct = Math.max(
                1.5,
                Math.min(100, (stage.hydroKgCo2PerMwh / 1000) * 100),
              );
              const coalWidthPct = Math.max(
                2.5,
                Math.min(100, (stage.coalKgCo2PerMwh / 1000) * 100),
              );

              return (
                <motion.div
                  key={stage.stageCode}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={idx * 0.08}
                  className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white"
                >
                  {/* Stage Title & Scope (Cols 1-4) */}
                  <div className="lg:col-span-4 space-y-1.5">
                    <div className="flex items-center gap-2.5 text-xs">
                      <span className="font-mono font-bold text-pingaksh-terracotta">
                        {stage.stageCode}
                      </span>
                      <span className="text-navy-500">•</span>
                      <span className="text-navy-600 font-medium">
                        {stage.boundaryScope}
                      </span>
                    </div>
                    <h3 className="font-logo text-2xl text-pingaksh-navy">
                      {stage.stageName}
                    </h3>
                  </div>

                  {/* Dual Visual Bars & Engineering Notes (Cols 5-12) */}
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* UBHP Run-of-the-River Hydro Box */}
                    <div className="p-5 border border-sand-300 bg-sand-50/70 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs font-bold text-pingaksh-navy uppercase">
                            UBHP Run-of-the-River Hydro
                          </span>
                          <span className="font-logo text-2xl text-emerald-700">
                            {stage.hydroKgCo2PerMwh.toFixed(1)} kg CO₂e/MWh
                          </span>
                        </div>
                        <div className="w-full h-2 bg-sand-200 mt-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${hydroWidthPct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="h-full bg-emerald-600"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-navy-700 leading-relaxed">
                        {stage.hydroEngineeringNote}
                      </p>
                    </div>

                    {/* Thermal Coal Baseline Box */}
                    <div className="p-5 border border-sand-300 bg-white flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs font-bold text-pingaksh-terracotta uppercase">
                            Thermal Coal Baseline
                          </span>
                          <span className="font-logo text-2xl text-pingaksh-terracotta">
                            {stage.coalKgCo2PerMwh.toFixed(1)} kg CO₂e/MWh
                          </span>
                        </div>
                        <div className="w-full h-2 bg-sand-200 mt-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${coalWidthPct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="h-full bg-pingaksh-terracotta"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-navy-600 leading-relaxed">
                        {stage.coalEngineeringNote}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. INTERACTIVE MULTI-POLLUTANT & RESOURCE AVOIDANCE MATRIX
      ===================================================================== */}
      <section className="py-16 lg:py-24 border-b border-sand-300 bg-background-warm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Header + Scale Multiplier Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-10 border-b border-sand-300 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-logo text-3xl sm:text-4xl text-pingaksh-navy">
                {data.pollutantMatrix.heading}
              </h2>
              <p className="text-sm text-navy-600 mt-1">
                {data.pollutantMatrix.subheading}
              </p>
            </div>

            {/* Interactive Scale Selector */}
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: "1-mwh", label: "Per 1 MWh (1,000 kWh)" },
                  { id: "daily-cascade", label: "Daily Cascade (388.5 MWh)" },
                  {
                    id: "annual-cascade",
                    label: "Annual Cascade (141,800 MWh)",
                  },
                  { id: "custom", label: "Custom MWh" },
                ] as { id: ScalePreset; label: string }[]
              ).map((preset) => {
                const isActive = scalePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setScalePreset(preset.id)}
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

          {/* Optional Custom MWh Input Bar */}
          {scalePreset === "custom" && (
            <div className="mt-6 p-5 bg-white border border-sand-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <label
                htmlFor="custom-mwh-input"
                className="text-xs font-semibold text-pingaksh-navy"
              >
                Enter Custom Hydro Electricity Volume (in MWh) to Calculate
                Avoided Pollutants:
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="custom-mwh-input"
                  type="number"
                  min={1}
                  max={10000000}
                  value={customMwh}
                  onChange={(e) =>
                    setCustomMwh(Math.max(1, Number(e.target.value)))
                  }
                  className="px-4 py-2 border border-pingaksh-navy text-sm font-bold text-pingaksh-navy w-44 focus:outline-none"
                />
                <span className="text-xs font-semibold text-pingaksh-terracotta">
                  MWh ({(customMwh * 1000).toLocaleString("en-IN")} Units/kWh)
                </span>
              </div>
            </div>
          )}

          {/* 4-Column Pollutant Avoidance Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-sand-300 mt-8">
            {data.pollutantMatrix.metrics.map((metric, idx) => (
              <motion.div
                key={metric.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeUp}
                custom={(idx % 4) * 0.06}
                className="bg-white border-r border-b border-sand-300 p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-sand-200">
                    <span className="font-mono font-bold text-pingaksh-terracotta">
                      {metric.chemicalFormula}
                    </span>
                    <span className="text-navy-500">
                      {activeMwhMultiplier.toLocaleString("en-IN")} MWh Basis
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-pingaksh-navy mt-4">
                    {metric.pollutantName}
                  </h3>

                  <div className="my-5">
                    <span className="block text-[11px] text-navy-500 uppercase tracking-wider">
                      Net Volume Avoided
                    </span>
                    <span className="font-logo text-3xl text-pingaksh-navy tabular-nums mt-1 block">
                      {formatScaledMetric(metric.netAvoidedPerMwh, metric.unit)}
                    </span>
                  </div>

                  {/* Per-MWh Reference Comparison */}
                  <div className="p-3 bg-sand-50 border border-sand-200 text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-navy-600">Coal Intensity:</span>
                      <span className="font-semibold text-pingaksh-terracotta">
                        {metric.coalPerMwh} {metric.unit}/MWh
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-600">UBHP Hydro:</span>
                      <span className="font-semibold text-emerald-700">
                        {metric.hydroPerMwh} {metric.unit}/MWh
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-navy-600 mt-4 pt-3 border-t border-sand-200 leading-relaxed">
                  {metric.environmentalImpact}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. SARJU CASCADE POWERHOUSE-WISE ANNUAL DISPLACEMENT LEDGER
      ===================================================================== */}
      <section className="py-16 lg:py-24 bg-pingaksh-navy text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl pb-10">
            <h2 className="font-logo text-3xl sm:text-4xl text-white">
              {data.cascadeLedger.heading}
            </h2>
            <p className="text-sm sm:text-base text-sand-200/80 mt-2">
              {data.cascadeLedger.subheading}
            </p>
          </div>

          <div className="border border-white/15 bg-navy-950/70 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/15 bg-white/5 text-sand-300">
                  <th className="py-4 px-5 font-semibold">
                    Operating Powerhouse (Bageshwar, UK)
                  </th>
                  <th className="py-4 px-5 font-semibold">
                    Installed Capacity
                  </th>
                  <th className="py-4 px-5 font-semibold">Rated Net Head</th>
                  <th className="py-4 px-5 font-semibold">
                    Annual Generation (MWh)
                  </th>
                  <th className="py-4 px-5 font-semibold text-pingaksh-sand">
                    Raw Coal Unburned (MT/Yr)
                  </th>
                  <th className="py-4 px-5 font-semibold text-emerald-400">
                    Grid CO₂ Avoided (CEA MT/Yr)
                  </th>
                  <th className="py-4 px-5 font-semibold text-right text-white">
                    Full LCA CO₂e Avoided (MT/Yr)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 tabular-nums">
                {data.cascadeLedger.rows.map((row) => (
                  <tr
                    key={row.plantName}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-5 font-semibold text-white">
                      {row.plantName}
                    </td>
                    <td className="py-4 px-5 text-sand-200">
                      {row.capacityMw}
                    </td>
                    <td className="py-4 px-5 text-sand-200">
                      {row.netHeadMeters}
                    </td>
                    <td className="py-4 px-5 font-semibold text-white">
                      {row.annualGenerationMwh.toLocaleString("en-IN")} MWh
                    </td>
                    <td className="py-4 px-5 text-pingaksh-sand font-medium">
                      {row.coalDisplacedTonnes.toLocaleString("en-IN")} MT
                    </td>
                    <td className="py-4 px-5 text-emerald-400 font-medium">
                      +{row.co2AvoidedTonnesCEA.toLocaleString("en-IN")} MT
                    </td>
                    <td className="py-4 px-5 text-right font-bold text-white">
                      +{row.lifecycleCo2AvoidedTonnes.toLocaleString("en-IN")}{" "}
                      MT
                    </td>
                  </tr>
                ))}

                {/* Summary Total Footer Row */}
                <tr className="bg-white/10 font-bold text-white border-t-2 border-pingaksh-sand">
                  <td className="py-4 px-5">Total Sarju Cascade Portfolio</td>
                  <td className="py-4 px-5 text-pingaksh-sand">
                    {totalCapacityText}
                  </td>
                  <td className="py-4 px-5 text-sand-200">Cascade Total</td>
                  <td className="py-4 px-5">
                    {totalAnnualMwh.toLocaleString("en-IN")} MWh
                  </td>
                  <td className="py-4 px-5 text-pingaksh-sand">
                    {totalCoalDisplaced.toLocaleString("en-IN")} MT
                  </td>
                  <td className="py-4 px-5 text-emerald-400">
                    +{totalCeaAvoided.toLocaleString("en-IN")} MT
                  </td>
                  <td className="py-4 px-5 text-right text-pingaksh-sand">
                    +{totalLcaAvoided.toLocaleString("en-IN")} MT
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-sand-300/80">
            <p className="max-w-4xl">{data.cascadeLedger.footnote}</p>

            <Link
              href="/our-businesses/hydro-power"
              className="inline-flex items-center gap-1.5 text-pingaksh-sand hover:text-white font-semibold shrink-0"
            >
              <span>Inspect Sarju Hydro Technical Datasheets</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

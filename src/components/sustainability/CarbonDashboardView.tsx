"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ChevronRight,
  SlidersHorizontal,
  Droplets,
  Zap,
  Trees,
  Car,
  RefreshCw,
} from "lucide-react";
import { CARBON_DASHBOARD_DATA } from "@/data/carbonDashboardData";
import { useCarbonTelemetry } from "@/context/CarbonTelemetryContext";

const enterpriseEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: enterpriseEase,
    },
  }),
};

export default function CarbonDashboardView() {
  const data = CARBON_DASHBOARD_DATA;

  // =========================================================================
  // 1. ADMIN API TELEMETRY FROM CONTEXT (Exact static numbers from Workbook)
  // =========================================================================
  const {
    hydroEnergyGeneratedGwh,
    totalCarbonSavedTonnes,
    ethanolSalesLitres,
    ethanolCarbonSavedTonnes,
    totalHydroKwh,
    hydroCarbonSavedTonnes,
    isLoading,
    formatIndianNumber,
  } = useCarbonTelemetry();

  // Calculate percentage share between Hydro and Ethanol
  const totalCumulativeSafe =
    totalCarbonSavedTonnes > 0 ? totalCarbonSavedTonnes : 1;
  const hydroSharePct = Math.round(
    (hydroCarbonSavedTonnes / totalCumulativeSafe) * 100,
  );
  const ethanolSharePct = Math.max(0, 100 - hydroSharePct);

  // =========================================================================
  // 2. INTERACTIVE OUTPUT-TO-CARBON SIMULATOR STATE
  // =========================================================================
  const [simHydroMwh, setSimHydroMwh] = useState<number>(
    data.hero.dailyHydroMwhGenerated,
  );
  const [simEthanolKl, setSimEthanolKl] = useState<number>(
    data.hero.dailyEthanolLitersProduced / 1000,
  );

  const simHydroSavedTonnes =
    simHydroMwh * data.hero.coalGridEmissionFactorTonnesPerMwh;
  const simEthanolSavedTonnes =
    simEthanolKl * data.hero.ethanolNetSavingKgPerLiter;
  const simAnnualTonnes = (simHydroSavedTonnes + simEthanolSavedTonnes) * 350;
  const simEquivalentTrees = Math.round(simAnnualTonnes * 45);
  const simCarsDisplaced = Math.round(simAnnualTonnes / 4.6);

  return (
    <main className="bg-sand-100 text-pingaksh-navy overflow-hidden">
      {/* =====================================================================
          1. CINEMATIC VIDEO HERO & LIVE CARBON TELEMETRY COMMAND BOARD
      ===================================================================== */}
      <header className="bg-pingaksh-navy text-white pt-32 pb-16 lg:pt-44 lg:pb-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1800&q=80"
            className="w-full h-full object-cover opacity-25 scale-105"
          >
            <source src={data.processSystems[1].videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-pingaksh-navy/85 to-navy-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/50" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center flex-wrap gap-2 text-xs text-sand-200/75 pb-8 border-b border-white/15"
          >
            {data.breadcrumbs.map((crumb, idx) => {
              const isLast = idx === data.breadcrumbs.length - 1;
              return (
                <React.Fragment key={crumb.href}>
                  {isLast ? (
                    <span
                      aria-current="page"
                      className="text-pingaksh-sand font-semibold"
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="lg:col-span-7 space-y-4"
            >
              <h1 className="font-logo text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.08] tracking-wide">
                {data.hero.title}
              </h1>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.1}
              className="lg:col-span-5 lg:border-l-2 lg:border-pingaksh-terracotta lg:pl-8"
            >
              <p className="font-body text-sm sm:text-base text-sand-100/90 leading-relaxed">
                {data.hero.subtitle}
              </p>
            </motion.div>
          </div>

          {/* TOTAL CO2 REDUCED COMMAND CONSOLE (BOUND TO ADMIN API CONTEXT) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.2}
            className="mt-14 rounded-xl overflow-hidden border border-white/20 bg-navy-950/85 backdrop-blur-xl shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/15">
              <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="font-tagline text-[11px] uppercase tracking-[0.18em] text-pingaksh-sand font-bold">
                    Verified Cumulative CO₂ Displaced
                  </span>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-xs text-emerald-300 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>
                      {isLoading
                        ? "Syncing Workbook..."
                        : "API Workbook Synced"}
                    </span>
                    <RefreshCw
                      className={`w-3 h-3 ml-1 opacity-75 ${
                        isLoading ? "animate-spin" : ""
                      }`}
                    />
                  </div>
                </div>

                <div className="my-8">
                  <div className="font-logo text-4xl sm:text-6xl lg:text-[72px] text-white tracking-tight tabular-nums leading-none">
                    {formatIndianNumber(totalCarbonSavedTonnes, 2)}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
                    <span className="font-body text-xs sm:text-sm text-pingaksh-sand font-medium">
                      Total Metric Tonnes of CO₂ Avoided
                    </span>
                  </div>

                  {/* Visual Split Proportion Bar */}
                  <div className="mt-6 space-y-2">
                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden flex">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${hydroSharePct}%` }}
                        transition={{ duration: 1.2, ease: enterpriseEase }}
                        className="h-full bg-emerald-400"
                      />
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${ethanolSharePct}%` }}
                        transition={{ duration: 1.2, ease: enterpriseEase }}
                        className="h-full bg-pingaksh-terracotta"
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-sand-300/80">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        Hydro Cascade ({hydroSharePct}% •{" "}
                        {formatIndianNumber(hydroCarbonSavedTonnes, 0)} MT)
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-pingaksh-terracotta" />
                        Ethanol Biorefinery ({ethanolSharePct}% •{" "}
                        {formatIndianNumber(ethanolCarbonSavedTonnes, 0)} MT)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Asset Attribution Breakdown (Cols 8-12) */}
              <div className="lg:col-span-5 divide-y divide-white/15 flex flex-col justify-between bg-white/[0.02]">
                {/* 01. PRL Hydro Contribution */}
                <div className="p-7 sm:p-9 flex-1 flex flex-col justify-between group hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center justify-between text-xs gap-2">
                    <span className="inline-flex items-center gap-2 text-sand-200 font-semibold">
                      <Droplets className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>01. Cumulative CO₂ Displaced (Hydro)</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-mono text-[11px] shrink-0">
                      0.969 kg CO₂ / kWh
                    </span>
                  </div>

                  <div className="my-3 flex items-baseline justify-between gap-4">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-sand-300/70">
                        Asset Cumulative
                      </span>
                      <span className="font-logo text-3xl sm:text-4xl text-white tabular-nums">
                        {formatIndianNumber(hydroCarbonSavedTonnes, 2)}{" "}
                        <span className="text-sm text-pingaksh-sand">
                          MT CO₂
                        </span>
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="block text-xs font-mono text-emerald-400 font-semibold">
                        {formatIndianNumber(hydroEnergyGeneratedGwh, 2)} GWh
                      </span>
                      <span className="text-[11px] text-sand-300">
                        Energy Generated
                      </span>
                    </div>
                  </div>
                </div>

                {/* 02. PBPL Ethanol Contribution */}
                <div className="p-7 sm:p-9 flex-1 flex flex-col justify-between group hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center justify-between text-xs gap-2">
                    <span className="inline-flex items-center gap-2 text-sand-200 font-semibold">
                      <Zap className="w-4 h-4 text-pingaksh-terracotta shrink-0" />
                      <span>02. Cumulative CO₂ Displaced (Ethanol)</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-pingaksh-terracotta/25 text-pingaksh-sand font-mono text-[11px] shrink-0">
                      0.83 kg CO₂ / Liter
                    </span>
                  </div>

                  <div className="my-3 flex items-baseline justify-between gap-4">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-sand-300/70">
                        Asset Cumulative
                      </span>
                      <span className="font-logo text-3xl sm:text-4xl text-white tabular-nums">
                        {formatIndianNumber(ethanolCarbonSavedTonnes, 2)}{" "}
                        <span className="text-sm text-pingaksh-sand">
                          MT CO₂
                        </span>
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="block text-xs font-mono text-pingaksh-sand font-semibold">
                        {formatIndianNumber(ethanolSalesLitres, 0)} Litres
                      </span>
                      <span className="text-[11px] text-sand-300">
                        Sales to Date
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* =====================================================================
          2. VISUAL EMISSION FOOTPRINT BARS & INTERACTIVE SIMULATOR
      ===================================================================== */}
      <section className="py-20 lg:py-28 border-b border-sand-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-3xl pb-14"
          >
            <span className="font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-terracotta font-bold">
              Lifecycle Emission Avoidance
            </span>
            <h2 className="font-logo text-3xl sm:text-5xl text-pingaksh-navy mt-2">
              Visual Baseline Displacement & Impact Simulator
            </h2>
          </motion.div>

          {/* 2-Column Visual Bar Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.methodologyCards.map((card, idx) => {
              const isHydro = idx === 0;

              return (
                <motion.div
                  key={card.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={idx * 0.12}
                  className="rounded-xl border border-sand-300 bg-sand-50/70 p-7 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow duration-500"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-sand-300 text-xs">
                      <span className="font-tagline font-bold text-pingaksh-terracotta uppercase tracking-wider">
                        0{idx + 1} {card.unitBasis}
                      </span>
                    </div>

                    <h3 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy mt-5">
                      {card.vertical}
                    </h3>

                    {/* Visual Footprint Comparison Bars */}
                    <div className="mt-7 space-y-5 bg-white p-6 rounded-lg border border-sand-200">
                      {/* Fossil Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-navy-600">
                            {card.fossilBaselineLabel}
                          </span>
                          <span className="font-bold text-pingaksh-terracotta">
                            {card.fossilEmissionValue}
                          </span>
                        </div>
                        <div className="h-3 w-full rounded-full bg-sand-100 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: enterpriseEase }}
                            className="h-full bg-pingaksh-terracotta/85 rounded-full"
                          />
                        </div>
                      </div>

                      {/* Pingaksh Clean Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-navy-600">
                            Pingaksh Operational Footprint
                          </span>
                          <span className="font-bold text-emerald-700">
                            {card.pingakshEmissionValue}
                          </span>
                        </div>
                        <div className="h-3 w-full rounded-full bg-sand-100 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: isHydro ? "2%" : "28%" }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: 0.2,
                              ease: enterpriseEase,
                            }}
                            className="h-full bg-emerald-500 rounded-full"
                          />
                        </div>
                      </div>

                      {/* Net Saving Callout Banner */}
                      <div className="pt-4 border-t border-sand-200 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-pingaksh-navy">
                          Net Carbon Displaced
                        </span>
                        <span className="font-logo text-xl text-pingaksh-terracotta">
                          {card.netSavingPerUnit}
                        </span>
                      </div>
                    </div>

                    <p className="font-body text-xs sm:text-sm text-navy-700 mt-5 leading-relaxed">
                      {card.explanation}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Custom Output Simulator Console */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 rounded-xl border border-sand-300 bg-pingaksh-navy text-white p-7 sm:p-10 shadow-2xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/15 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pingaksh-terracotta flex items-center justify-center shrink-0">
                  <SlidersHorizontal className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-logo text-2xl text-white">
                    Interactive Output-to-Carbon Simulator
                  </h3>
                  <p className="text-xs text-sand-200/75">
                    Drag sliders to model annual carbon avoidance and ecological
                    equivalence
                  </p>
                </div>
              </div>
              <span className="font-tagline text-[10px] uppercase tracking-widest px-3 py-1.5 rounded bg-white/10 text-pingaksh-sand font-bold self-start sm:self-auto">
                350 Operational Days / Year
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
              {/* Sliders (Cols 1-6) */}
              <div className="lg:col-span-6 space-y-6">
                {/* Hydro Slider */}
                <div className="p-5 rounded-lg bg-white/5 border border-white/10 space-y-3">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold">
                    <span className="text-sand-100">
                      Daily Hydro Generation (MWh)
                    </span>
                    <span className="text-emerald-400 font-mono">
                      {simHydroMwh} MWh / day
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={800}
                    step={5}
                    value={simHydroMwh}
                    onChange={(e) => setSimHydroMwh(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-sand-300/80">
                    <span>Sarju I, II & III Cascade</span>
                    <span>
                      Displaces{" "}
                      <strong className="text-white">
                        {simHydroSavedTonnes.toFixed(1)} MT CO₂/day
                      </strong>
                    </span>
                  </div>
                </div>

                {/* Ethanol Slider */}
                <div className="p-5 rounded-lg bg-white/5 border border-white/10 space-y-3">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold">
                    <span className="text-sand-100">
                      Daily Bio-Ethanol Output (KLPD)
                    </span>
                    <span className="text-pingaksh-sand font-mono">
                      {simEthanolKl} KLPD
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={500}
                    step={10}
                    value={simEthanolKl}
                    onChange={(e) => setSimEthanolKl(Number(e.target.value))}
                    className="w-full accent-pingaksh-terracotta cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-sand-300/80">
                    <span>Bundi Biorefinery Complex</span>
                    <span>
                      Displaces{" "}
                      <strong className="text-white">
                        {simEthanolSavedTonnes.toFixed(1)} MT CO₂/day
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Resulting Combined Impact & Ecological Gauges (Cols 7-12) */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 p-6 rounded-lg bg-gradient-to-r from-pingaksh-terracotta to-terracotta-600 text-white flex items-center justify-between shadow-lg">
                  <div>
                    <span className="block font-tagline text-[10px] uppercase tracking-widest text-white/85 font-bold">
                      Simulated Annual Carbon Offset
                    </span>
                    <span className="font-logo text-4xl sm:text-5xl text-white tabular-nums mt-1 block">
                      {formatIndianNumber(simAnnualTonnes, 0)}{" "}
                      <span className="text-xl">MT / Yr</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-white/80">
                      Daily Combined
                    </span>
                    <span className="font-mono text-lg font-bold">
                      {(simHydroSavedTonnes + simEthanolSavedTonnes).toFixed(1)}{" "}
                      MT/d
                    </span>
                  </div>
                </div>

                {/* Equivalent Trees */}
                <div className="p-5 rounded-lg bg-navy-950/90 border border-white/15 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                    <Trees className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-logo text-2xl text-white tabular-nums">
                      {(simEquivalentTrees / 1000000).toFixed(2)}M+
                    </span>
                    <span className="block text-xs text-sand-200/80 mt-0.5">
                      Mature Trees Planted Equivalent
                    </span>
                  </div>
                </div>

                {/* Equivalent Cars Removed */}
                <div className="p-5 rounded-lg bg-navy-950/90 border border-white/15 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-pingaksh-sand/15 text-pingaksh-sand flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-logo text-2xl text-white tabular-nums">
                      {simCarsDisplaced.toLocaleString("en-IN")}
                    </span>
                    <span className="block text-xs text-sand-200/80 mt-0.5">
                      Cars Removed from Roads / Yr
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

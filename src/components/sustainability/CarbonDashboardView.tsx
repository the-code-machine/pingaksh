"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  ArrowRight,
  Play,
  Pause,
  FileSpreadsheet,
  SlidersHorizontal,
  Activity,
  Droplets,
  Zap,
  Leaf,
  Trees,
  Car,
  CheckCircle2,
  ChevronDown,
  Layers,
} from "lucide-react";
import {
  CARBON_DASHBOARD_DATA,
  type ProcessFlowSystem,
} from "@/data/carbonDashboardData";

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
  // 1. LIVE CUMULATIVE CARBON TICKER STATE
  // =========================================================================
  const dailyHydroTonnes =
    data.hero.dailyHydroMwhGenerated *
    data.hero.coalGridEmissionFactorTonnesPerMwh; // ~318.57 MT/day
  const dailyEthanolTonnes =
    (data.hero.dailyEthanolLitersProduced *
      data.hero.ethanolNetSavingKgPerLiter) /
    1000; // ~495.00 MT/day (at 300 KLPD)
  const totalDailyTonnes = dailyHydroTonnes + dailyEthanolTonnes;
  const tonnesPerSecond = totalDailyTonnes / 86400;

  const [liveTonnes, setLiveTonnes] = useState<number>(
    data.hero.baseCumulativeTonnesAtAnchor,
  );
  const [todayTonnesAccumulated, setTodayTonnesAccumulated] =
    useState<number>(0);

  useEffect(() => {
    const anchorMs = new Date(data.hero.anchorDateISO).getTime();

    const updateTicker = () => {
      const now = Date.now();
      const elapsedSeconds = Math.max(0, (now - anchorMs) / 1000);
      const currentTotal =
        data.hero.baseCumulativeTonnesAtAnchor +
        elapsedSeconds * tonnesPerSecond;

      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      const secondsToday = Math.max(0, (now - startOfToday.getTime()) / 1000);

      setLiveTonnes(currentTotal);
      setTodayTonnesAccumulated(secondsToday * tonnesPerSecond);
    };

    updateTicker();
    const interval = setInterval(updateTicker, 100);
    return () => clearInterval(interval);
  }, [
    data.hero.anchorDateISO,
    data.hero.baseCumulativeTonnesAtAnchor,
    tonnesPerSecond,
  ]);

  // =========================================================================
  // 2. INTERACTIVE PROCESS ARCHITECTURE & AUTO-STEPPING SCADA ENGINE
  // =========================================================================
  const [activeProcessId, setActiveProcessId] = useState<
    "ethanol-process" | "hydro-process"
  >("ethanol-process");
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const [autoCycleFlow, setAutoCycleFlow] = useState<boolean>(true);

  const currentProcess: ProcessFlowSystem =
    data.processSystems.find((p) => p.id === activeProcessId) ||
    data.processSystems[0];

  const handleProcessSwitch = (id: "ethanol-process" | "hydro-process") => {
    setActiveProcessId(id);
    setSelectedStepIndex(0);
  };

  useEffect(() => {
    if (!autoCycleFlow) return;
    const timer = setInterval(() => {
      setSelectedStepIndex((prev) => (prev + 1) % currentProcess.steps.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [autoCycleFlow, currentProcess.steps.length]);

  const activeStep = currentProcess.steps[selectedStepIndex];

  // =========================================================================
  // 3. INTERACTIVE OUTPUT-TO-CARBON SIMULATOR STATE
  // =========================================================================
  const [simHydroMwh, setSimHydroMwh] = useState<number>(388.5);
  const [simEthanolKl, setSimEthanolKl] = useState<number>(300);

  const simHydroSavedTonnes =
    simHydroMwh * data.hero.coalGridEmissionFactorTonnesPerMwh;
  const simEthanolSavedTonnes =
    simEthanolKl * data.hero.ethanolNetSavingKgPerLiter;
  const simAnnualTonnes = (simHydroSavedTonnes + simEthanolSavedTonnes) * 350;
  const simEquivalentTrees = Math.round(simAnnualTonnes * 45);
  const simCarsDisplaced = Math.round(simAnnualTonnes / 4.6);

  // =========================================================================
  // 4. MONTHLY TELEMETRY INTERACTIVE CHART STATE
  // =========================================================================
  const [chartFilter, setChartFilter] = useState<
    "combined" | "hydro" | "ethanol"
  >("combined");
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number>(4); // Default Aug peak
  const [showRawLedger, setShowRawLedger] = useState<boolean>(false);

  const maxMonthlyTonnes = 32000;
  const activeMonthRecord =
    data.monthlyTelemetry.records[hoveredMonthIndex] ||
    data.monthlyTelemetry.records[0];

  const hydroSharePct = Math.round((dailyHydroTonnes / totalDailyTonnes) * 100);
  const ethanolSharePct = 100 - hydroSharePct;

  return (
    <main className="bg-sand-100 text-pingaksh-navy overflow-hidden">
      {/* =====================================================================
          1. CINEMATIC VIDEO HERO & LIVE CARBON TELEMETRY COMMAND BOARD
      ===================================================================== */}
      <header className="bg-pingaksh-navy text-white pt-32 pb-16 lg:pt-44 lg:pb-24 border-b border-white/10 relative overflow-hidden">
        {/* Ambient Background Video Animation + Engineering Grid */}
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
          {/* Breadcrumbs */}
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

          {/* Header Title & Subtitle */}
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

          {/* LIVE CUMULATIVE CO2 REDUCED COMMAND CONSOLE */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.2}
            className="mt-14 rounded-xl overflow-hidden border border-white/20 bg-navy-950/85 backdrop-blur-xl shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/15">
              {/* Primary Live Counter (Cols 1-7) */}
              <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="font-tagline text-[11px] uppercase tracking-[0.18em] text-pingaksh-sand font-bold">
                    Verified Cumulative CO₂ Displaced
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-xs text-emerald-300 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Algorithmic Counter Active
                  </span>
                </div>

                <div className="my-8">
                  <div className="font-logo text-4xl sm:text-6xl lg:text-[72px] text-white tracking-tight tabular-nums leading-none">
                    {liveTonnes.toLocaleString("en-IN", {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    })}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
                    <span className="font-body text-xs sm:text-sm text-pingaksh-sand font-medium">
                      Metric Tonnes of CO₂ Equivalent (MT CO₂e) Avoided
                    </span>
                    <span className="font-mono text-xs text-emerald-400">
                      +{(tonnesPerSecond * 1000).toFixed(2)} grams / sec
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
                        Hydro Cascade Share ({hydroSharePct}%)
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-pingaksh-terracotta" />
                        E20 Bio-Refinery Share ({ethanolSharePct}%)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-sand-200/80">
                  <span>
                    Displaced Today (Since 00:00 IST):{" "}
                    <strong className="text-emerald-400 tabular-nums font-mono">
                      +{todayTonnesAccumulated.toFixed(3)} MT
                    </strong>
                  </span>
                  <span>
                    Combined Daily Offset Velocity:{" "}
                    <strong className="text-white font-mono">
                      +{totalDailyTonnes.toFixed(2)} MT / Day
                    </strong>
                  </span>
                </div>
              </div>

              {/* Live Daily Attribution Breakdown (Cols 8-12) */}
              <div className="lg:col-span-5 divide-y divide-white/15 flex flex-col justify-between bg-white/[0.02]">
                {/* Hydro Contribution */}
                <div className="p-7 sm:p-9 flex-1 flex flex-col justify-between group hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-2 text-sand-200 font-semibold">
                      <Droplets className="w-4 h-4 text-emerald-400" />
                      01. UBHP Hydro Cascade
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-mono text-[11px]">
                      0.82 kg CO₂ / kWh
                    </span>
                  </div>
                  <div className="my-3 flex items-baseline justify-between">
                    <span className="font-logo text-3xl sm:text-4xl text-white tabular-nums">
                      +{dailyHydroTonnes.toFixed(2)}{" "}
                      <span className="text-lg text-pingaksh-sand">MT/d</span>
                    </span>
                    <span className="text-xs text-sand-300">
                      {data.hero.dailyHydroMwhGenerated} MWh / day
                    </span>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "-100%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-full bg-emerald-400/70"
                    />
                  </div>
                </div>

                {/* Ethanol Contribution */}
                <div className="p-7 sm:p-9 flex-1 flex flex-col justify-between group hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-2 text-sand-200 font-semibold">
                      <Zap className="w-4 h-4 text-pingaksh-terracotta" />
                      02. PBPL E20 Bio-Ethanol
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-pingaksh-terracotta/25 text-pingaksh-sand font-mono text-[11px]">
                      1.65 kg CO₂ / Liter
                    </span>
                  </div>
                  <div className="my-3 flex items-baseline justify-between">
                    <span className="font-logo text-3xl sm:text-4xl text-white tabular-nums">
                      +{dailyEthanolTonnes.toFixed(2)}{" "}
                      <span className="text-lg text-pingaksh-sand">MT/d</span>
                    </span>
                    <span className="text-xs text-sand-300">
                      {(data.hero.dailyEthanolLitersProduced / 1000).toFixed(0)}{" "}
                      KLPD Output
                    </span>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "-100%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-full bg-pingaksh-terracotta"
                    />
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

          {/* 2-Column Visual Bar Comparison Cards (Replaces Text-Heavy Tables) */}
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
                        0{idx + 1} • {card.unitBasis}
                      </span>
                      <span className="px-3 py-1 rounded bg-white border border-sand-300 font-semibold text-pingaksh-navy">
                        {card.dailyCapacityPeg}
                      </span>
                    </div>

                    <h3 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy mt-5">
                      {card.vertical}
                    </h3>

                    {/* Animated Visual Footprint Comparison Bars */}
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

                  <div className="mt-6 pt-5 border-t border-sand-300 flex items-center justify-between">
                    <span className="text-xs text-navy-600 font-semibold uppercase tracking-wider">
                      Verified Daily Displacement
                    </span>
                    <span className="font-logo text-2xl text-pingaksh-navy">
                      {card.dailyCo2OffsetTonnes}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Custom Output Simulator Console with Ecological Equivalents */}
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
                      {simAnnualTonnes.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}{" "}
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

      {/* =====================================================================
          3. INTEGRATED PROCESS SCHEMATIC + PERMANENT LIVE VIDEO STAGE
      ===================================================================== */}
      <section className="py-20 lg:py-28 border-b border-sand-300 bg-sand-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Top Bar: Division Switcher + Auto-Cycle Toggle */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-10 border-b border-sand-300 gap-6">
            <div>
              <span className="font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-terracotta font-bold">
                Interactive SCADA Flow & Video Telemetry
              </span>
              <h2 className="font-logo text-3xl sm:text-5xl text-pingaksh-navy mt-2">
                Process Architecture & Carbon Flow
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* System Switcher with layoutId */}
              <div className="flex rounded-lg p-1 border border-sand-300 bg-white shadow-xs">
                {data.processSystems.map((sys) => {
                  const isActive = sys.id === activeProcessId;
                  return (
                    <button
                      key={sys.id}
                      type="button"
                      onClick={() => handleProcessSwitch(sys.id)}
                      className={`relative px-4 py-2.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                        isActive
                          ? "text-white"
                          : "text-pingaksh-navy hover:text-pingaksh-terracotta"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="process-system-pill"
                          className="absolute inset-0 bg-pingaksh-navy rounded-md"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{sys.tabLabel}</span>
                    </button>
                  );
                })}
              </div>

              {/* Auto-Play Flow Scrubber Button */}
              <button
                type="button"
                onClick={() => setAutoCycleFlow((prev) => !prev)}
                className={`px-4 py-3 rounded-lg border text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                  autoCycleFlow
                    ? "bg-pingaksh-terracotta text-white border-pingaksh-terracotta"
                    : "bg-white text-pingaksh-navy border-sand-300 hover:border-pingaksh-navy"
                }`}
              >
                {autoCycleFlow ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Auto-Stepping Flow</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Paused (Click Any Stage)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentProcess.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: enterpriseEase }}
              className="pt-10 space-y-8"
            >
              {/* Interactive Connected Pipeline Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentProcess.steps.map((step, idx) => {
                  const isSelected = selectedStepIndex === idx;
                  const badgeTone =
                    step.branchCategory === "co2-branch"
                      ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/30"
                      : step.branchCategory === "byproduct-branch"
                        ? "bg-pingaksh-terracotta/15 text-pingaksh-terracotta border-pingaksh-terracotta/30"
                        : "bg-sand-200 text-pingaksh-navy border-sand-300";

                  return (
                    <button
                      key={step.stepNumber}
                      type="button"
                      onClick={() => {
                        setSelectedStepIndex(idx);
                        setAutoCycleFlow(false);
                      }}
                      className={`group relative text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                        isSelected
                          ? "bg-pingaksh-navy text-white border-pingaksh-navy shadow-xl scale-[1.02]"
                          : "bg-white text-pingaksh-navy border-sand-300 hover:border-pingaksh-navy"
                      }`}
                    >
                      {/* Animated Top Progress Bar on Active Step */}
                      {isSelected && autoCycleFlow && (
                        <motion.div
                          key={`step-prog-${step.stepNumber}`}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 5.5, ease: "linear" }}
                          className="absolute top-0 left-0 h-1 bg-pingaksh-terracotta"
                        />
                      )}

                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`font-logo text-2xl ${
                              isSelected
                                ? "text-pingaksh-sand"
                                : "text-pingaksh-terracotta"
                            }`}
                          >
                            0{idx + 1}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${
                              isSelected
                                ? "bg-white/10 text-pingaksh-sand border-white/20"
                                : badgeTone
                            }`}
                          >
                            {step.branchCategory === "co2-branch"
                              ? "Carbon Capture"
                              : step.branchCategory === "byproduct-branch"
                                ? "Circular Loop"
                                : "Primary Stream"}
                          </span>
                        </div>

                        <h4 className="font-bold text-sm mt-3 leading-snug">
                          {step.stageTitle}
                        </h4>
                      </div>

                      <div
                        className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-semibold ${
                          isSelected
                            ? "border-white/15 text-emerald-300"
                            : "border-sand-200 text-pingaksh-navy"
                        }`}
                      >
                        <span className="truncate">{step.keyOutputMetric}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Integrated Stage Inspector + Live Video Animation Stage */}
              <div className="rounded-2xl border border-sand-300 bg-pingaksh-navy text-white overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
                {/* Left 6 Cols: Active Stage Engineering Telemetry */}
                <div className="lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep.stepNumber}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.35, ease: enterpriseEase }}
                      className="space-y-5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-sand font-bold">
                          Stage {activeStep.stepNumber} • {activeStep.subLabel}
                        </span>
                        <span className="text-xs font-mono text-sand-300">
                          {selectedStepIndex + 1} /{" "}
                          {currentProcess.steps.length}
                        </span>
                      </div>

                      <h3 className="font-logo text-2xl sm:text-4xl text-white leading-snug">
                        {activeStep.stageTitle}
                      </h3>

                      <p className="font-body text-sm sm:text-base text-sand-100/90 leading-relaxed">
                        {activeStep.technicalDescription}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                          <span className="block font-tagline text-[10px] uppercase tracking-wider text-sand-300">
                            Stage Output Benchmark
                          </span>
                          <span className="font-logo text-xl text-pingaksh-sand mt-1 block">
                            {activeStep.keyOutputMetric}
                          </span>
                        </div>
                        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-400/25">
                          <span className="block font-tagline text-[10px] uppercase tracking-wider text-emerald-300">
                            Carbon & Circularity Note
                          </span>
                          <span className="font-body text-xs text-white font-medium mt-1 block leading-snug">
                            {activeStep.carbonImpactNote}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 pt-5 border-t border-white/15 flex items-center justify-between text-xs text-sand-300">
                    <span className="font-mono">
                      {currentProcess.baselineFormulaText}
                    </span>
                  </div>
                </div>

                {/* Right 6 Cols: Always-Visible Live Process Video Animation */}
                <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] bg-black overflow-hidden">
                  <video
                    key={currentProcess.videoUrl}
                    src={currentProcess.videoUrl}
                    poster={currentProcess.videoPoster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />

                  {/* Top Live Feed Pill */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-navy-950/80 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {currentProcess.systemTitle.split(":")[0]} — Visual Feed
                    </span>
                  </div>

                  {/* Bottom Video Caption */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-navy-950/80 backdrop-blur-md border border-white/15">
                    <p className="text-xs text-sand-100 leading-relaxed">
                      {currentProcess.videoCaption}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =====================================================================
          4. INTERACTIVE 12-MONTH TELEMETRY GRAPH & COLLAPSIBLE AUDIT LEDGER
      ===================================================================== */}
      <section className="py-20 lg:py-28 bg-pingaksh-navy text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-10 border-b border-white/15 gap-6">
            <div>
              <span className="font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-sand font-bold">
                {data.monthlyTelemetry.fiscalYear}
              </span>
              <h2 className="font-logo text-3xl sm:text-5xl text-white mt-2">
                {data.monthlyTelemetry.title}
              </h2>
            </div>

            {/* Graph Filter Buttons */}
            <div className="flex flex-wrap rounded-lg p-1 border border-white/15 bg-navy-950">
              {(
                [
                  { id: "combined", label: "Combined Offset" },
                  { id: "hydro", label: "Hydro Cascade Only" },
                  { id: "ethanol", label: "E20 Ethanol Only" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setChartFilter(tab.id)}
                  className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    chartFilter === tab.id
                      ? "bg-pingaksh-sand text-pingaksh-navy"
                      : "text-sand-200 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Hover Telemetry HUD + 12-Month Bar Chart */}
          <div className="mt-10 rounded-xl bg-navy-950/85 border border-white/15 p-6 sm:p-10 shadow-2xl">
            {/* Active Hovered Month Breakdown Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-8 border-b border-white/10">
              <div>
                <span className="block font-tagline text-[10px] uppercase tracking-widest text-sand-300">
                  Inspected Month
                </span>
                <span className="font-logo text-3xl text-white mt-1 block">
                  {activeMonthRecord.month} • FY26
                </span>
              </div>
              <div>
                <span className="block font-tagline text-[10px] uppercase tracking-widest text-emerald-400">
                  Hydro Offset ({activeMonthRecord.hydroUnitsKwh} MU)
                </span>
                <span className="font-logo text-2xl sm:text-3xl text-emerald-400 tabular-nums mt-1 block">
                  +
                  {activeMonthRecord.hydroCo2SavedTonnes.toLocaleString(
                    "en-IN",
                  )}{" "}
                  MT
                </span>
              </div>
              <div>
                <span className="block font-tagline text-[10px] uppercase tracking-widest text-pingaksh-sand">
                  Ethanol Offset ({activeMonthRecord.ethanolLitersKl} KL)
                </span>
                <span className="font-logo text-2xl sm:text-3xl text-pingaksh-sand tabular-nums mt-1 block">
                  +
                  {activeMonthRecord.ethanolCo2SavedTonnes.toLocaleString(
                    "en-IN",
                  )}{" "}
                  MT
                </span>
              </div>
              <div>
                <span className="block font-tagline text-[10px] uppercase tracking-widest text-white">
                  Total Monthly CO₂ Saved
                </span>
                <span className="font-logo text-2xl sm:text-3xl text-white tabular-nums mt-1 block">
                  {activeMonthRecord.totalCo2SavedTonnes.toLocaleString(
                    "en-IN",
                  )}{" "}
                  MT
                </span>
              </div>
            </div>

            {/* 12-Month Interactive Bars */}
            <div className="grid grid-cols-12 gap-2 sm:gap-4 items-end h-64 pt-10 pb-3 border-b border-white/15">
              {data.monthlyTelemetry.records.map((rec, idx) => {
                const isHovered = hoveredMonthIndex === idx;
                const displayVal =
                  chartFilter === "hydro"
                    ? rec.hydroCo2SavedTonnes
                    : chartFilter === "ethanol"
                      ? rec.ethanolCo2SavedTonnes
                      : rec.totalCo2SavedTonnes;

                const heightPct = Math.min(
                  100,
                  Math.round((displayVal / maxMonthlyTonnes) * 100),
                );

                return (
                  <button
                    key={rec.month}
                    type="button"
                    onMouseEnter={() => setHoveredMonthIndex(idx)}
                    onClick={() => setHoveredMonthIndex(idx)}
                    className="h-full flex flex-col justify-end items-center group cursor-pointer focus:outline-none"
                  >
                    <span
                      className={`text-[10px] sm:text-xs font-mono mb-2 transition-colors ${
                        isHovered
                          ? "text-white font-bold scale-110"
                          : "text-pingaksh-sand/75"
                      }`}
                    >
                      {(displayVal / 1000).toFixed(1)}k
                    </span>
                    <div
                      className={`w-full h-44 rounded-t-md bg-white/5 border flex items-end overflow-hidden p-0.5 transition-colors ${
                        isHovered ? "border-pingaksh-sand" : "border-white/10"
                      }`}
                    >
                      <motion.div
                        key={chartFilter}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${heightPct}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.75,
                          delay: idx * 0.04,
                          ease: enterpriseEase,
                        }}
                        className={`w-full rounded-t-xs transition-all ${
                          chartFilter === "hydro"
                            ? "bg-emerald-400"
                            : chartFilter === "ethanol"
                              ? "bg-pingaksh-terracotta"
                              : "bg-gradient-to-t from-pingaksh-terracotta to-pingaksh-sand"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Month Labels */}
            <div className="grid grid-cols-12 gap-2 sm:gap-4 pt-3 text-center">
              {data.monthlyTelemetry.records.map((rec, idx) => (
                <span
                  key={rec.month}
                  className={`text-[11px] sm:text-xs font-bold transition-colors ${
                    hoveredMonthIndex === idx
                      ? "text-pingaksh-sand"
                      : "text-sand-200/70"
                  }`}
                >
                  {rec.month}
                </span>
              ))}
            </div>
          </div>

          {/* Collapsible Raw Multiplication Ledger Drawer (Reduces Text Clutter) */}
          <div className="mt-8">
            <button
              type="button"
              onClick={() => setShowRawLedger((prev) => !prev)}
              className="w-full py-4 px-6 rounded-xl bg-navy-950/70 hover:bg-navy-950 border border-white/15 flex items-center justify-between text-xs sm:text-sm font-semibold text-pingaksh-sand transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>
                  {showRawLedger
                    ? "Hide Monthly Generation × Carbon Multiplication Ledger"
                    : "Inspect Full 12-Month Statutory Multiplication Ledger (Table)"}
                </span>
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  showRawLedger ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {showRawLedger && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: enterpriseEase }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 rounded-xl border border-white/15 bg-navy-950/60 overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-white/15 text-sand-300 bg-white/5">
                          <th className="py-3.5 px-4 font-semibold">Month</th>
                          <th className="py-3.5 px-4 font-semibold">
                            Hydro Generated (MU)
                          </th>
                          <th className="py-3.5 px-4 font-semibold text-emerald-400">
                            Hydro CO₂ Saved (MT)
                          </th>
                          <th className="py-3.5 px-4 font-semibold">
                            E20 Ethanol Distilled (KL)
                          </th>
                          <th className="py-3.5 px-4 font-semibold text-pingaksh-sand">
                            Ethanol CO₂ Saved (MT)
                          </th>
                          <th className="py-3.5 px-4 font-semibold text-right text-white">
                            Total Monthly Offset (MT)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 tabular-nums">
                        {data.monthlyTelemetry.records.map((row) => (
                          <tr
                            key={row.month}
                            className="hover:bg-white/5 transition-colors"
                          >
                            <td className="py-3 px-4 font-semibold text-white">
                              {row.month}
                            </td>
                            <td className="py-3 px-4 text-sand-200">
                              {row.hydroUnitsKwh.toFixed(1)} MU
                            </td>
                            <td className="py-3 px-4 text-emerald-400 font-medium">
                              +{row.hydroCo2SavedTonnes.toLocaleString("en-IN")}{" "}
                              MT
                            </td>
                            <td className="py-3 px-4 text-sand-200">
                              {row.ethanolLitersKl.toLocaleString("en-IN")} KL
                            </td>
                            <td className="py-3 px-4 text-pingaksh-sand font-medium">
                              +
                              {row.ethanolCo2SavedTonnes.toLocaleString(
                                "en-IN",
                              )}{" "}
                              MT
                            </td>
                            <td className="py-3 px-4 text-right font-bold text-white">
                              {row.totalCo2SavedTonnes.toLocaleString("en-IN")}{" "}
                              MT
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}

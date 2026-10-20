"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  ArrowRight,
  Play,
  FileSpreadsheet,
  SlidersHorizontal,
} from "lucide-react";
import {
  CARBON_DASHBOARD_DATA,
  type ProcessFlowSystem,
} from "@/data/carbonDashboardData";

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

export default function CarbonDashboardView() {
  const data = CARBON_DASHBOARD_DATA;

  // 1. Live Cumulative Carbon Ticker State
  const dailyHydroTonnes =
    data.hero.dailyHydroMwhGenerated *
    data.hero.coalGridEmissionFactorTonnesPerMwh; // ~318.57 MT/day
  const dailyEthanolTonnes =
    (data.hero.dailyEthanolLitersProduced *
      data.hero.ethanolNetSavingKgPerLiter) /
    1000; // ~412.50 MT/day
  const totalDailyTonnes = dailyHydroTonnes + dailyEthanolTonnes; // ~731.07 MT/day
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

      // Calculate today's accumulation since midnight local time
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

  // 2. Interactive Process System & View Mode (Schematic vs Video)
  const [activeProcessId, setActiveProcessId] = useState<
    "ethanol-process" | "hydro-process"
  >("ethanol-process");
  const [processViewMode, setProcessViewMode] = useState<"schematic" | "video">(
    "schematic",
  );
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);

  const currentProcess: ProcessFlowSystem =
    data.processSystems.find((p) => p.id === activeProcessId) ||
    data.processSystems[0];

  const handleProcessSwitch = (id: "ethanol-process" | "hydro-process") => {
    setActiveProcessId(id);
    setSelectedStepIndex(0);
  };

  // 3. Interactive Unit Calculator State (Hydro vs Coal & Ethanol vs Petrol)
  const [simHydroMwh, setSimHydroMwh] = useState<number>(388.5);
  const [simEthanolKl, setSimEthanolKl] = useState<number>(250);

  const simHydroSavedTonnes =
    simHydroMwh * data.hero.coalGridEmissionFactorTonnesPerMwh;
  const simEthanolSavedTonnes =
    simEthanolKl * data.hero.ethanolNetSavingKgPerLiter; // KL * kg/L = Metric Tonnes

  // 4. Monthly Chart Filter Mode
  const [chartFilter, setChartFilter] = useState<
    "combined" | "hydro" | "ethanol"
  >("combined");

  const maxMonthlyTonnes = 30000;

  return (
    <main className="bg-background-warm text-pingaksh-navy">
      {/* =====================================================================
          1. HERO & LIVE CUMULATIVE CARBON SAVING TICKER
      ===================================================================== */}
      <header className="bg-pingaksh-navy text-white pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center flex-wrap gap-2 text-xs text-sand-200/75 pb-8 border-b border-white/10"
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

          {/* Header Title & Subtitle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="lg:col-span-7"
            >
              <h1 className="font-logo text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.08]">
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

          {/* LIVE CUMULATIVE CO2 REDUCED TICKER BOARD */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.2}
            className="mt-12 border border-white/20 bg-navy-950/90 backdrop-blur-md"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/15">
              {/* Primary Live Counter (Cols 1-7) */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-[0.18em] text-pingaksh-sand font-semibold">
                    Cumulative CO₂ Reduced To Date From Operations
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Live Telemetry Active
                  </span>
                </div>

                <div className="my-6">
                  <div className="font-logo text-4xl sm:text-6xl lg:text-[68px] text-white tracking-tight tabular-nums leading-none">
                    {liveTonnes.toLocaleString("en-IN", {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    })}
                  </div>
                  <span className="block text-xs sm:text-sm text-pingaksh-sand font-medium mt-3">
                    Metric Tonnes of CO₂ Equivalent (MT CO₂e) Displaced
                  </span>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-sand-200/80">
                  <span>
                    Added Today (Since 00:00 IST):{" "}
                    <strong className="text-emerald-400 tabular-nums">
                      +{todayTonnesAccumulated.toFixed(3)} MT
                    </strong>
                  </span>
                  <span>
                    Combined Daily Offset Rate:{" "}
                    <strong className="text-white">
                      +{totalDailyTonnes.toFixed(2)} MT / Day
                    </strong>
                  </span>
                </div>
              </div>

              {/* Live Daily Attribution Breakdown (Cols 8-12) */}
              <div className="lg:col-span-5 divide-y divide-white/15 flex flex-col justify-between">
                {/* Hydro Contribution */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-sand-300 font-medium">
                      01. UBHP Hydro Cascade (vs. Coal Grid)
                    </span>
                    <span className="text-emerald-400 font-mono">
                      0.82 kg CO₂ / kWh Saved
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="font-logo text-3xl text-white tabular-nums">
                      +{dailyHydroTonnes.toFixed(2)} MT
                    </span>
                    <span className="text-xs text-sand-200/75">
                      per day ({data.hero.dailyHydroMwhGenerated} MWh/day)
                    </span>
                  </div>
                </div>

                {/* Ethanol Contribution */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-sand-300 font-medium">
                      02. E20 Bio-Ethanol (vs. Pure Petrol)
                    </span>
                    <span className="text-pingaksh-sand font-mono">
                      1.65 kg CO₂ / Liter Saved
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="font-logo text-3xl text-white tabular-nums">
                      +{dailyEthanolTonnes.toFixed(2)} MT
                    </span>
                    <span className="text-xs text-sand-200/75">
                      per day (250,000 Liters/day)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* =====================================================================
          2. BASELINE METHODOLOGY & INTERACTIVE DISPLACEMENT SIMULATOR
      ===================================================================== */}
      <section className="py-16 lg:py-24 border-b border-sand-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl pb-12">
            <h2 className="font-logo text-3xl sm:text-4xl text-pingaksh-navy">
              Carbon Displacement Methodology & Baseline Peg
            </h2>
            <p className="text-sm sm:text-base text-navy-600 mt-2">
              How Pingaksh Renewables calculates verified carbon savings across
              every unit of clean hydro electricity generated and every liter of
              E20 ethanol distilled.
            </p>
          </div>

          {/* 2-Column Methodology Ledger Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.methodologyCards.map((card, idx) => (
              <motion.div
                key={card.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={idx * 0.1}
                className="border border-sand-300 bg-background-warm p-7 sm:p-9 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-sand-300 text-xs">
                    <span className="font-bold text-pingaksh-terracotta uppercase tracking-wider">
                      0{idx + 1} • {card.unitBasis}
                    </span>
                    <span className="font-semibold text-pingaksh-navy">
                      {card.dailyCapacityPeg}
                    </span>
                  </div>

                  <h3 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy mt-5">
                    {card.vertical}
                  </h3>

                  {/* Comparison Table */}
                  <div className="mt-6 border border-sand-300 bg-white divide-y divide-sand-200 text-xs sm:text-sm">
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-navy-600">
                        {card.fossilBaselineLabel}
                      </span>
                      <span className="font-semibold text-pingaksh-terracotta">
                        {card.fossilEmissionValue}
                      </span>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-navy-600">
                        Pingaksh Operational Emission
                      </span>
                      <span className="font-semibold text-emerald-700">
                        {card.pingakshEmissionValue}
                      </span>
                    </div>
                    <div className="p-4 bg-pingaksh-navy text-white flex items-center justify-between">
                      <span className="font-medium text-sand-200">
                        Net Carbon Saved Per Unit
                      </span>
                      <span className="font-logo text-lg text-pingaksh-sand">
                        {card.netSavingPerUnit}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-navy-700 mt-5 leading-relaxed">
                    {card.explanation}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-sand-300 flex items-center justify-between text-xs">
                  <span className="text-navy-600 font-medium">
                    Daily Verified Carbon Reduction
                  </span>
                  <span className="font-logo text-xl text-pingaksh-navy">
                    {card.dailyCo2OffsetTonnes}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Custom Output Simulator Bar */}
          <div className="mt-10 border border-sand-300 bg-sand-100/70 p-6 sm:p-8">
            <div className="flex items-center justify-between pb-6 border-b border-sand-300">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal className="w-4 h-4 text-pingaksh-terracotta" />
                <h3 className="font-logo text-xl text-pingaksh-navy">
                  Interactive Output-to-Carbon Simulator
                </h3>
              </div>
              <span className="text-xs text-navy-600">
                Adjust daily generation or distillation capacity to compute CO₂
                saved
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
              {/* Hydro Slider */}
              <div className="lg:col-span-4 space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Daily Hydro Generation (MWh)</span>
                  <span className="text-pingaksh-terracotta">
                    {simHydroMwh} MWh ({(simHydroMwh * 1000).toLocaleString()}{" "}
                    kWh)
                  </span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={800}
                  step={5}
                  value={simHydroMwh}
                  onChange={(e) => setSimHydroMwh(Number(e.target.value))}
                  className="w-full accent-pingaksh-navy cursor-pointer"
                />
                <span className="block text-[11px] text-navy-600">
                  Saves{" "}
                  <strong>{simHydroSavedTonnes.toFixed(1)} MT CO₂/day</strong>{" "}
                  vs. Coal Grid
                </span>
              </div>

              {/* Ethanol Slider */}
              <div className="lg:col-span-4 space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Daily E20 Ethanol Capacity (KLPD)</span>
                  <span className="text-pingaksh-terracotta">
                    {simEthanolKl} KLPD (
                    {(simEthanolKl * 1000).toLocaleString()} L)
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
                <span className="block text-[11px] text-navy-600">
                  Saves{" "}
                  <strong>{simEthanolSavedTonnes.toFixed(1)} MT CO₂/day</strong>{" "}
                  vs. Pure Petrol
                </span>
              </div>

              {/* Resulting Combined Impact */}
              <div className="lg:col-span-4 bg-pingaksh-navy text-white p-5 flex items-center justify-between">
                <div>
                  <span className="block text-[11px] text-sand-300 uppercase tracking-wider">
                    Simulated Annual CO₂ Offset
                  </span>
                  <span className="font-logo text-3xl text-pingaksh-sand tabular-nums">
                    {(
                      (simHydroSavedTonnes + simEthanolSavedTonnes) *
                      350
                    ).toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    MT / Yr
                  </span>
                </div>
                <span className="text-xs text-sand-200/80 text-right">
                  {(simHydroSavedTonnes + simEthanolSavedTonnes).toFixed(1)}{" "}
                  MT/day
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. DUAL PROCESS FLOW SCHEMATIC & VIDEO WALKTHROUGH
             (Ethanol Multi-Branch Diagram + Hydro Cascade Diagram + Video Toggle)
      ===================================================================== */}
      <section className="py-16 lg:py-24 border-b border-sand-300 bg-background-warm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Top Bar: Division Switcher + Schematic/Video Mode Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-10 border-b border-sand-300 gap-6">
            <div>
              <h2 className="font-logo text-3xl sm:text-4xl text-pingaksh-navy">
                Process Architecture & Carbon Flow Depiction
              </h2>
              <p className="text-sm text-navy-600 mt-1">
                Switch between our Bio-Ethanol & DDGS refinery loop and our
                Run-of-the-River Hydro cascade—or watch the process video.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* System Switcher */}
              <div className="flex border border-sand-300 bg-white">
                {data.processSystems.map((sys) => {
                  const isActive = sys.id === activeProcessId;
                  return (
                    <button
                      key={sys.id}
                      type="button"
                      onClick={() => handleProcessSwitch(sys.id)}
                      className={`px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                        isActive
                          ? "bg-pingaksh-navy text-white"
                          : "text-pingaksh-navy hover:bg-sand-100"
                      }`}
                    >
                      {sys.tabLabel}
                    </button>
                  );
                })}
              </div>

              {/* Schematic vs Video Toggle */}
              <div className="flex border border-pingaksh-terracotta bg-white">
                <button
                  type="button"
                  onClick={() => setProcessViewMode("schematic")}
                  className={`px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                    processViewMode === "schematic"
                      ? "bg-pingaksh-terracotta text-white"
                      : "text-pingaksh-terracotta hover:bg-terracotta-50"
                  }`}
                >
                  Interactive Flow Schematic
                </button>
                <button
                  type="button"
                  onClick={() => setProcessViewMode("video")}
                  className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    processViewMode === "video"
                      ? "bg-pingaksh-terracotta text-white"
                      : "text-pingaksh-terracotta hover:bg-terracotta-50"
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Process Video</span>
                </button>
              </div>
            </div>
          </div>

          {/* System Title & Formula Banner */}
          <div className="pt-8 pb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="max-w-3xl">
              <h3 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy">
                {currentProcess.systemTitle}
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 mt-1">
                {currentProcess.systemSubtitle}
              </p>
            </div>

            <div className="px-4 py-3 bg-white border border-sand-300 text-xs shrink-0">
              <span className="block font-bold text-pingaksh-terracotta uppercase">
                {currentProcess.baselineFormulaTitle}
              </span>
              <span className="font-mono text-pingaksh-navy mt-0.5 block">
                {currentProcess.baselineFormulaText}
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {processViewMode === "schematic" ? (
              <motion.div
                key={`${currentProcess.id}-schematic`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Visual Process Flow Grid (Interactive Connected Nodes) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentProcess.steps.map((step, idx) => {
                    const isSelected = selectedStepIndex === idx;
                    const branchColor =
                      step.branchCategory === "co2-branch"
                        ? "border-l-4 border-l-emerald-600"
                        : step.branchCategory === "byproduct-branch"
                          ? "border-l-4 border-l-pingaksh-terracotta"
                          : "border-l-4 border-l-pingaksh-navy";

                    return (
                      <button
                        key={step.stepNumber}
                        type="button"
                        onClick={() => setSelectedStepIndex(idx)}
                        className={`text-left p-5 border transition-all cursor-pointer flex flex-col justify-between ${branchColor} ${
                          isSelected
                            ? "bg-pingaksh-navy text-white border-pingaksh-navy shadow-lg"
                            : "bg-white text-pingaksh-navy border-sand-300 hover:border-pingaksh-navy"
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
                              Stage {step.stepNumber}
                            </span>
                            <ArrowRight
                              className={`w-4 h-4 ${
                                isSelected
                                  ? "text-pingaksh-sand"
                                  : "text-navy-400"
                              }`}
                            />
                          </div>

                          <h4 className="font-bold text-sm mt-3 leading-snug">
                            {step.stageTitle}
                          </h4>
                          <p
                            className={`text-[11px] mt-1 ${
                              isSelected ? "text-sand-200" : "text-navy-500"
                            }`}
                          >
                            {step.subLabel}
                          </p>
                        </div>

                        <div
                          className={`mt-4 pt-3 border-t text-[11px] font-semibold ${
                            isSelected
                              ? "border-white/15 text-emerald-300"
                              : "border-sand-200 text-pingaksh-navy"
                          }`}
                        >
                          {step.keyOutputMetric}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Stage Deep-Dive Inspector */}
                <div className="border border-sand-300 bg-white p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-sand-200 pb-6 lg:pb-0 lg:pr-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-pingaksh-terracotta">
                      Stage {currentProcess.steps[selectedStepIndex].stepNumber}{" "}
                      • {currentProcess.steps[selectedStepIndex].subLabel}
                    </span>
                    <h4 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy mt-2">
                      {currentProcess.steps[selectedStepIndex].stageTitle}
                    </h4>
                    <div className="mt-4 inline-block px-3.5 py-1.5 bg-sand-100 text-pingaksh-navy text-xs font-bold">
                      Output:{" "}
                      {currentProcess.steps[selectedStepIndex].keyOutputMetric}
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    <p className="text-sm sm:text-base text-navy-800 leading-relaxed">
                      {
                        currentProcess.steps[selectedStepIndex]
                          .technicalDescription
                      }
                    </p>
                    <div className="p-4 bg-navy-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <span className="text-pingaksh-sand font-semibold">
                        Carbon & Circularity Impact:
                      </span>
                      <span>
                        {
                          currentProcess.steps[selectedStepIndex]
                            .carbonImpactNote
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* VIDEO WALKTHROUGH MODE */
              <motion.div
                key={`${currentProcess.id}-video`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="border border-sand-300 bg-navy-950 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-8 aspect-video bg-black">
                    <video
                      key={currentProcess.videoUrl}
                      src={currentProcess.videoUrl}
                      poster={currentProcess.videoPoster}
                      controls
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="lg:col-span-4 p-6 sm:p-8 lg:p-10 text-white flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="text-xs text-pingaksh-sand font-semibold">
                        Process Video Walkthrough
                      </span>
                      <h4 className="font-logo text-2xl text-white">
                        {currentProcess.systemTitle}
                      </h4>
                      <p className="text-xs sm:text-sm text-sand-200/85 leading-relaxed">
                        {currentProcess.videoCaption}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setProcessViewMode("schematic")}
                      className="mt-6 w-full py-3 px-4 bg-pingaksh-sand text-pingaksh-navy text-xs font-semibold hover:bg-sand-300 transition-colors cursor-pointer"
                    >
                      Return to Interactive Step-by-Step Schematic
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* =====================================================================
          4. MONTH-ON-MONTH GENERATION & CARBON SAVINGS LEDGER (GRAPH + TABLE)
      ===================================================================== */}
      <section className="py-16 lg:py-24 bg-pingaksh-navy text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-10 border-b border-white/15 gap-6">
            <div>
              <h2 className="font-logo text-3xl sm:text-4xl text-white">
                {data.monthlyTelemetry.title}
              </h2>
              <p className="text-sm text-sand-200/80 mt-1 max-w-2xl">
                {data.monthlyTelemetry.subtitle}
              </p>
            </div>

            {/* Graph Filter Buttons */}
            <div className="flex border border-white/20">
              <button
                type="button"
                onClick={() => setChartFilter("combined")}
                className={`px-4 py-2 text-xs font-semibold cursor-pointer ${
                  chartFilter === "combined"
                    ? "bg-pingaksh-sand text-pingaksh-navy"
                    : "text-sand-200 hover:bg-white/5"
                }`}
              >
                Combined Total CO₂ Saved
              </button>
              <button
                type="button"
                onClick={() => setChartFilter("hydro")}
                className={`px-4 py-2 text-xs font-semibold cursor-pointer ${
                  chartFilter === "hydro"
                    ? "bg-pingaksh-sand text-pingaksh-navy"
                    : "text-sand-200 hover:bg-white/5"
                }`}
              >
                Hydro vs. Coal Only
              </button>
              <button
                type="button"
                onClick={() => setChartFilter("ethanol")}
                className={`px-4 py-2 text-xs font-semibold cursor-pointer ${
                  chartFilter === "ethanol"
                    ? "bg-pingaksh-sand text-pingaksh-navy"
                    : "text-sand-200 hover:bg-white/5"
                }`}
              >
                E20 Ethanol vs. Petrol Only
              </button>
            </div>
          </div>

          {/* 12-Month Animated Bar Chart */}
          <div className="mt-10 bg-navy-950/80 border border-white/15 p-6 sm:p-8">
            <div className="flex items-center justify-between text-xs text-sand-300 pb-6 border-b border-white/10">
              <span>{data.monthlyTelemetry.fiscalYear}</span>
              <span>Unit: Metric Tonnes CO₂ Saved (MT)</span>
            </div>

            <div className="grid grid-cols-12 gap-2 sm:gap-4 items-end h-64 pt-8 pb-3 border-b border-white/15">
              {data.monthlyTelemetry.records.map((rec, idx) => {
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
                  <div
                    key={rec.month}
                    className="h-full flex flex-col justify-end items-center"
                  >
                    <span className="text-[10px] sm:text-xs font-mono text-pingaksh-sand mb-1.5">
                      {(displayVal / 1000).toFixed(1)}k
                    </span>
                    <div className="w-full h-44 bg-white/5 border border-white/10 flex items-end overflow-hidden">
                      <motion.div
                        key={chartFilter}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${heightPct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: idx * 0.04 }}
                        className={`w-full ${
                          chartFilter === "hydro"
                            ? "bg-emerald-500"
                            : chartFilter === "ethanol"
                              ? "bg-pingaksh-terracotta"
                              : "bg-gradient-to-t from-pingaksh-terracotta to-pingaksh-sand"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Month Labels */}
            <div className="grid grid-cols-12 gap-2 sm:gap-4 pt-3 text-center">
              {data.monthlyTelemetry.records.map((rec) => (
                <span
                  key={rec.month}
                  className="text-[11px] sm:text-xs font-semibold text-sand-200"
                >
                  {rec.month}
                </span>
              ))}
            </div>
          </div>

          {/* Month-on-Month Multiplication Data Table */}
          <div className="mt-8 border border-white/15 bg-navy-950/60 overflow-x-auto">
            <div className="px-6 py-4 border-b border-white/15 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-pingaksh-sand">
                <FileSpreadsheet className="w-4 h-4" />
                <span>
                  Monthly Generation × Unit Carbon Saving Multiplication Table
                </span>
              </div>
              <span className="text-xs text-sand-300">
                Hydro: MU × 820 MT/MU | Ethanol: KL × 1.65 MT/KL
              </span>
            </div>

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
                      +{row.hydroCo2SavedTonnes.toLocaleString("en-IN")} MT
                    </td>
                    <td className="py-3 px-4 text-sand-200">
                      {row.ethanolLitersKl.toLocaleString("en-IN")} KL
                    </td>
                    <td className="py-3 px-4 text-pingaksh-sand font-medium">
                      +{row.ethanolCo2SavedTonnes.toLocaleString("en-IN")} MT
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-white">
                      {row.totalCo2SavedTonnes.toLocaleString("en-IN")} MT
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

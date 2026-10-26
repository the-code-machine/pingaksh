"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import { E20_ETHANOL_IMPACT_DATA } from "@/data/e20EthanolImpactData";

type VehicleCategory = "two-wheeler" | "four-wheeler";
type CapacityScale = "1-kl" | "250-klpd" | "350-klpd" | "annual-86ml";

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

export default function E20EthanolImpactView() {
  const data = E20_ETHANOL_IMPACT_DATA;

  // 1. Vehicle Category Toggle for Tailpipe Emissions
  const [vehicleType, setVehicleType] =
    useState<VehicleCategory>("two-wheeler");

  // 2. Distillery Capacity Scale Multiplier (in Kiloliters - KL)
  const [capacityScale, setCapacityScale] = useState<CapacityScale>("250-klpd");

  const activeKlVolume =
    capacityScale === "1-kl"
      ? 1
      : capacityScale === "250-klpd"
        ? 250
        : capacityScale === "350-klpd"
          ? 350
          : 86250; // 86.25 Million Liters Annual Output

  const sub = data.substitutionMatrix;

  const calculatedCo2Tonnes = activeKlVolume * sub.co2SavedTonnesPerKl;
  const calculatedCrudeBarrels = activeKlVolume * sub.crudeBarrelsReplacedPerKl;
  const calculatedForexInr = activeKlVolume * sub.forexSavedInrPerKl;
  const calculatedGrainTonnes = activeKlVolume * sub.grainProcuredTonnesPerKl;
  const calculatedDdgsTonnes = activeKlVolume * sub.ddgsProducedTonnesPerKl;
  const calculatedCapturedCo2 = activeKlVolume * sub.co2CapturedTonnesPerKl;

  const formatInrCurrency = (amountInr: number) => {
    if (amountInr >= 10000000) {
      return `₹${(amountInr / 10000000).toFixed(2)} Crore`;
    }
    if (amountInr >= 100000) {
      return `₹${(amountInr / 100000).toFixed(2)} Lakh`;
    }
    return `₹${amountInr.toLocaleString("en-IN")}`;
  };

  return (
    <main className="bg-background-warm text-pingaksh-navy">
      {/* =====================================================================
          1. ARCHITECTURAL HEADER & CORE KPI STRIP
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
                {data.hero.policyAlignment}
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

          {/* 4-Column KPI Strip */}
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
                    {kpi.comparisonNote}
                  </span>
                </div>
                <span className="inline-block mt-4 pt-3 border-t border-white/10 text-xs font-semibold text-emerald-400">
                  {kpi.subtext}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* =====================================================================
          2. TAILPIPE EMISSION SAVINGS AUDIT (E20 vs. E0 PURE PETROL)
      ===================================================================== */}
      <section className="py-16 lg:py-24 border-b border-sand-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Header + Vehicle Class Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-10 border-b border-sand-300 gap-6">
            <div className="max-w-3xl">
              <h2 className="font-logo text-3xl sm:text-4xl text-pingaksh-navy">
                {data.tailpipeSection.heading}
              </h2>
              <p className="text-sm sm:text-base text-navy-600 mt-2 leading-relaxed">
                {data.tailpipeSection.subheading}
              </p>
            </div>

            {/* Interactive Vehicle Segment Toggle */}
            <div className="flex border border-sand-300 bg-sand-50 shrink-0">
              <button
                type="button"
                onClick={() => setVehicleType("two-wheeler")}
                className={`px-5 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                  vehicleType === "two-wheeler"
                    ? "bg-pingaksh-navy text-white"
                    : "text-pingaksh-navy hover:bg-sand-100"
                }`}
              >
                2-Wheeler Fleet (BS-VI / E20)
              </button>
              <button
                type="button"
                onClick={() => setVehicleType("four-wheeler")}
                className={`px-5 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                  vehicleType === "four-wheeler"
                    ? "bg-pingaksh-navy text-white"
                    : "text-pingaksh-navy hover:bg-sand-100"
                }`}
              >
                4-Wheeler Passenger Cars
              </button>
            </div>
          </div>

          {/* 4 Pollutant Reduction Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
            {data.tailpipeSection.pollutants.map((item, idx) => {
              const activeReductionPct =
                vehicleType === "two-wheeler"
                  ? item.twoWheelerReductionPct
                  : item.fourWheelerReductionPct;
              const remainingEmissionPct = 100 - activeReductionPct;

              return (
                <motion.div
                  key={item.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={(idx % 2) * 0.1}
                  className="border border-sand-300 bg-background-warm p-7 sm:p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-sand-300">
                      <div>
                        <span className="text-xs font-mono font-bold text-pingaksh-terracotta">
                          {item.chemicalSymbol}
                        </span>
                        <h3 className="font-logo text-2xl text-pingaksh-navy mt-0.5">
                          {item.pollutant}
                        </h3>
                      </div>

                      <div className="text-right">
                        <span className="font-logo text-3xl sm:text-4xl text-emerald-700">
                          -{activeReductionPct}%
                        </span>
                        <span className="block text-[11px] font-semibold text-navy-500">
                          vs. Pure Petrol (E0)
                        </span>
                      </div>
                    </div>

                    {/* Visual Bar Comparison: Pure Petrol (100%) vs E20 Blend */}
                    <div className="my-6 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="font-semibold text-navy-700">
                            Pure Fossil Petrol (E0 Baseline)
                          </span>
                          <span className="font-mono text-pingaksh-terracotta font-semibold">
                            100% Baseline Emission
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-sand-200">
                          <div className="h-full w-full bg-pingaksh-terracotta" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="font-semibold text-pingaksh-navy">
                            E20 Ethanol-Blended Petrol
                          </span>
                          <span className="font-mono text-emerald-700 font-bold">
                            {remainingEmissionPct}% Residual (
                            {activeReductionPct}% Saved)
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-sand-200 overflow-hidden">
                          <motion.div
                            key={`${item.id}-${vehicleType}`}
                            initial={{ width: "100%" }}
                            animate={{ width: `${remainingEmissionPct}%` }}
                            transition={{ duration: 0.65, ease: "easeOut" }}
                            className="h-full bg-emerald-600"
                          />
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-navy-800 leading-relaxed">
                      {item.combustionMechanism}
                    </p>
                  </div>

                  <p className="text-xs text-navy-600 mt-5 pt-4 border-t border-sand-300">
                    <strong className="text-pingaksh-navy">
                      Environmental Impact:
                    </strong>{" "}
                    {item.healthAndClimateBenefit}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Fuel Chemistry & Octane Comparison Table */}
          <div className="mt-12 border border-sand-300 bg-white overflow-x-auto">
            <div className="px-6 py-4 bg-pingaksh-navy text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-logo text-xl">
                Thermodynamic & Chemical Property Comparison
              </h3>
              <span className="text-xs text-pingaksh-sand">
                {data.tailpipeSection.sourceCitation}
              </span>
            </div>

            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-sand-300 bg-sand-50 text-pingaksh-navy">
                  <th className="py-3.5 px-5 font-bold">Fuel Parameter</th>
                  <th className="py-3.5 px-5 font-bold text-pingaksh-terracotta">
                    Pure Fossil Petrol (E0)
                  </th>
                  <th className="py-3.5 px-5 font-bold">
                    Pingaksh Anhydrous Ethanol (E100)
                  </th>
                  <th className="py-3.5 px-5 font-bold text-emerald-800">
                    E20 Blended Fuel
                  </th>
                  <th className="py-3.5 px-5 font-bold">
                    Combustion & Engine Advantage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200">
                {data.tailpipeSection.fuelProperties.map((row) => (
                  <tr
                    key={row.property}
                    className="hover:bg-sand-50/60 transition-colors"
                  >
                    <td className="py-4 px-5 font-semibold text-pingaksh-navy">
                      {row.property}
                    </td>
                    <td className="py-4 px-5 text-navy-600">
                      {row.purePetrolE0}
                    </td>
                    <td className="py-4 px-5 font-medium text-pingaksh-navy">
                      {row.anhydrousEthanolE100}
                    </td>
                    <td className="py-4 px-5 font-semibold text-emerald-800">
                      {row.blendedE20Fuel}
                    </td>
                    <td className="py-4 px-5 text-navy-700">
                      {row.engineeringAdvantage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. CRUDE IMPORT SUBSTITUTION & DISTILLERY CAPACITY MULTIPLIER
      ===================================================================== */}
      <section className="py-16 lg:py-24 border-b border-sand-300 bg-sand-100/70">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Header + Distillery Capacity Selector */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-10 border-b border-sand-300 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-logo text-3xl sm:text-4xl text-pingaksh-navy">
                {sub.heading}
              </h2>
              <p className="text-sm text-navy-600 mt-2 leading-relaxed">
                {sub.subheading}
              </p>
            </div>

            {/* Capacity Peg Selector */}
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: "1-kl", label: "Per 1 KL (1,000 Liters)" },
                  { id: "250-klpd", label: "Daily Capacity (250 KLPD)" },

                  {
                    id: "annual-86ml",
                    label: "Annual Output (86.25 Million L)",
                  },
                ] as { id: CapacityScale; label: string }[]
              ).map((scale) => {
                const isActive = capacityScale === scale.id;
                return (
                  <button
                    key={scale.id}
                    type="button"
                    onClick={() => setCapacityScale(scale.id)}
                    className={`px-4 py-2.5 text-xs font-semibold border transition-colors cursor-pointer ${
                      isActive
                        ? "bg-pingaksh-navy text-white border-pingaksh-navy"
                        : "bg-white text-pingaksh-navy border-sand-300 hover:border-pingaksh-navy"
                    }`}
                  >
                    {scale.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6-Card Macroeconomic & Environmental Substitution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-sand-300 mt-10">
            {/* 1. Net CO2 Saved */}
            <div className="bg-white border-r border-b border-sand-300 p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pingaksh-terracotta">
                  01 • Tailpipe & Lifecycle Carbon
                </span>
                <h3 className="text-base font-bold text-pingaksh-navy mt-2">
                  Net Carbon Dioxide Displaced
                </h3>
                <span className="block font-logo text-4xl text-pingaksh-navy tabular-nums my-4">
                  {calculatedCo2Tonnes.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  MT
                </span>
              </div>
              <p className="text-xs text-navy-600 pt-3 border-t border-sand-200">
                Pegged at 1.65 kg CO₂ saved per liter of anhydrous ethanol vs.
                pure fossil gasoline.
              </p>
            </div>

            {/* 2. Imported Crude Oil Barrels Substituted */}
            <div className="bg-white border-r border-b border-sand-300 p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pingaksh-terracotta">
                  02 • Energy Sovereignty
                </span>
                <h3 className="text-base font-bold text-pingaksh-navy mt-2">
                  Imported Crude Oil Substituted
                </h3>
                <span className="block font-logo text-4xl text-pingaksh-navy tabular-nums my-4">
                  {calculatedCrudeBarrels.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}{" "}
                  BBL
                </span>
              </div>
              <p className="text-xs text-navy-600 pt-3 border-t border-sand-200">
                Barrels of imported petroleum gasoline displaced from national
                OMC refinery blending pools.
              </p>
            </div>

            {/* 3. Sovereign Foreign Exchange Saved */}
            <div className="bg-white border-r border-b border-sand-300 p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pingaksh-terracotta">
                  03 • Macroeconomic Impact
                </span>
                <h3 className="text-base font-bold text-pingaksh-navy mt-2">
                  Sovereign Foreign Exchange Saved
                </h3>
                <span className="block font-logo text-4xl text-emerald-700 tabular-nums my-4">
                  {formatInrCurrency(calculatedForexInr)}
                </span>
              </div>
              <p className="text-xs text-navy-600 pt-3 border-t border-sand-200">
                Retains capital within the domestic agrarian economy instead of
                funding crude oil imports.
              </p>
            </div>

            {/* 4. Regional Non-Food Grain Procured */}
            <div className="bg-white border-r border-b border-sand-300 p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pingaksh-terracotta">
                  04 • Agrarian Procurement
                </span>
                <h3 className="text-base font-bold text-pingaksh-navy mt-2">
                  Regional Farm Grain Utilized
                </h3>
                <span className="block font-logo text-4xl text-pingaksh-navy tabular-nums my-4">
                  {calculatedGrainTonnes.toLocaleString("en-IN", {
                    maximumFractionDigits: 1,
                  })}{" "}
                  MT
                </span>
              </div>
              <p className="text-xs text-navy-600 pt-3 border-t border-sand-200">
                Surplus maize, broken rice, and damaged food grains procured
                directly from farmer clusters.
              </p>
            </div>

            {/* 5. High-Protein DDGS Animal Nutrition */}
            <div className="bg-white border-r border-b border-sand-300 p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pingaksh-terracotta">
                  05 • Circular Livestock Feed
                </span>
                <h3 className="text-base font-bold text-pingaksh-navy mt-2">
                  High-Protein DDGS Produced
                </h3>
                <span className="block font-logo text-4xl text-pingaksh-navy tabular-nums my-4">
                  {calculatedDdgsTonnes.toLocaleString("en-IN", {
                    maximumFractionDigits: 1,
                  })}{" "}
                  MT
                </span>
              </div>
              <p className="text-xs text-navy-600 pt-3 border-t border-sand-200">
                30%–46% crude protein Distillers Dried Grains with Solubles for
                dairy, poultry, and aquaculture.
              </p>
            </div>

            {/* 6. Biogenic CO2 Captured */}
            <div className="bg-white border-r border-b border-sand-300 p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pingaksh-terracotta">
                  06 • Carbon Capture & Utilization
                </span>
                <h3 className="text-base font-bold text-pingaksh-navy mt-2">
                  Biogenic Liquid CO₂ Captured
                </h3>
                <span className="block font-logo text-4xl text-emerald-700 tabular-nums my-4">
                  {calculatedCapturedCo2.toLocaleString("en-IN", {
                    maximumFractionDigits: 1,
                  })}{" "}
                  MT
                </span>
              </div>
              <p className="text-xs text-navy-600 pt-3 border-t border-sand-200">
                99.95% pure fermentation CO₂ scrubbed and liquefied for beverage
                and cold-chain industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. WELL-TO-WHEEL (WTW) CARBON ACCOUNTING LEDGER
      ===================================================================== */}
      <section className="py-16 lg:py-24 bg-pingaksh-navy text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-white/15">
            <div className="lg:col-span-8">
              <h2 className="font-logo text-3xl sm:text-4xl text-white">
                {data.wellToWheelLedger.heading}
              </h2>
              <p className="text-sm sm:text-base text-sand-200/80 mt-2">
                {data.wellToWheelLedger.subheading}
              </p>
            </div>

            <div className="lg:col-span-4 bg-navy-950 border border-white/15 p-6 flex items-center justify-between">
              <div>
                <span className="block text-xs text-sand-300">
                  Net WTW Carbon Saving
                </span>
                <span className="font-logo text-3xl text-pingaksh-sand">
                  {data.wellToWheelLedger.netSavedGramsPerLiter.toLocaleString()}{" "}
                  g CO₂ / L
                </span>
              </div>
              <div className="text-right text-xs space-y-1">
                <span className="block text-terracotta-400">
                  Petrol: {data.wellToWheelLedger.purePetrolTotalGramsPerLiter}g
                </span>
                <span className="block text-emerald-400 font-semibold">
                  Pingaksh:{" "}
                  {data.wellToWheelLedger.pingakshEthanolNetGramsPerLiter}g
                </span>
              </div>
            </div>
          </div>

          <div className="border-x border-b border-white/15 divide-y divide-white/15 bg-navy-950/60">
            {data.wellToWheelLedger.stages.map((stage) => (
              <div
                key={stage.stageCode}
                className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                <div className="lg:col-span-4">
                  <span className="text-xs font-mono text-pingaksh-sand">
                    {stage.stageCode}
                  </span>
                  <h3 className="font-logo text-xl text-white mt-1">
                    {stage.stageName}
                  </h3>
                </div>

                <div className="lg:col-span-3 flex items-center gap-6 text-xs">
                  <div>
                    <span className="block text-sand-300">Pure Petrol</span>
                    <span className="font-logo text-2xl text-terracotta-400">
                      {stage.petrolGramsCo2PerLiter}g CO₂/L
                    </span>
                  </div>
                  <div>
                    <span className="block text-sand-300">
                      Pingaksh Ethanol
                    </span>
                    <span className="font-logo text-2xl text-emerald-400">
                      {stage.ethanolGramsCo2PerLiter > 0
                        ? `${stage.ethanolGramsCo2PerLiter}g`
                        : `${stage.ethanolGramsCo2PerLiter}g (Credit)`}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 text-xs sm:text-sm text-sand-200/85 leading-relaxed">
                  {stage.technicalExplanation}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-sand-300">
            <span>
              All distillation operations run under 100% Zero Liquid Discharge
              (ZLD) compliance with CPCB & MoEFCC norms.
            </span>
            <Link
              href="/our-businesses/green-fuels-ethanol"
              className="inline-flex items-center gap-1.5 text-pingaksh-sand hover:text-white font-semibold"
            >
              <span>Explore 250 KLPD Bio-Ethanol Refinery Specs</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

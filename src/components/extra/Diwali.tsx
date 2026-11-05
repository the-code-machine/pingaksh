"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Hammer,
  Check,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Crosshair,
  Flame,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";

const ASSETS = {
  // Intro & Finale
  frame01_ayodhyaRiver: "/diwali/Diwali Glow at Ayodhya’s Ram Mandir.png",
  frame02_warriorFiveHeads: "/diwali/Warrior Before the Five Stone Kings.png",
  frame11_ayodhyaFinale: "/diwali/Diwali Night at the Grand Temple.png",

  // Progressive 5-Head Overview Series (0 crushed -> 4 crushed)
  heads_0_crushed: "/diwali/Five Stone Warrior Heads in a Storm.png",
  heads_1_crushed: "/diwali/Four Fiery Demon Heads Amid Ruins.png",
  heads_2_crushed: "/diwali/Three Stone Kings Amidst Ruin.png",
  heads_3_crushed: "/diwali/Ember-Crowned Ruins of Stone Kings.png",
  heads_4_crushed: "/diwali/Crowned Stone Warrior Amid Ruins.png",

  // Close-up Combat & Strike Frames
  frame04_headWithHammer: "/diwali/Stone Titan and Golden War Hammer.png",
  frame05_hammerShatter: "/diwali/Golden Hammer Shatters the Stone King.png",
  frame08_archerAiming: "/diwali/Golden Archer Faces Colossal Stone King.png",
  frame09_arrowStrike: "/diwali/Molten Arrow Strikes the Stone King.png",
  vfx_energyBurst: "/diwali/Golden Energy Burst Over Rocky Plain.png",
};

interface Myth {
  id: number;
  category: "Ethanol Blending" | "Hydropower";
  mythText: string;
  factText: string;
}

const MYTHS: Myth[] = [
  {
    id: 0,
    category: "Ethanol Blending",
    mythText: "“Destroys Car Engines”",
    factText:
      "Modern vehicles are engineered with ethanol-resistant materials, preventing wear and ensuring long-term engine safety.",
  },
  {
    id: 1,
    category: "Ethanol Blending",
    mythText: "“Causes Food Shortages”",
    factText:
      "Ethanol production utilizes surplus or damaged grains and creates high-protein animal feed as a secondary byproduct.",
  },
  {
    id: 2,
    category: "Ethanol Blending",
    mythText: "“Wrecks Fuel Mileage”",
    factText:
      "E20 blends cause only a negligible 1% to 6% efficiency drop, which is barely noticeable in daily driving conditions.",
  },
  {
    id: 3,
    category: "Ethanol Blending",
    mythText: "“Wastes More Energy Than It Makes”",
    factText:
      "Modern production methods ensure grain ethanol delivers up to 67% more energy than the fossil fuels required to make it.",
  },
  {
    id: 4,
    category: "Hydropower",
    mythText: "“Mega-Dams Are The Only Option”",
    factText:
      "Today's modular, low-head turbines provide highly efficient baseline power without requiring massive, environmentally disruptive reservoirs.",
  },
];

export default function InteractiveDiwaliCampaign() {
  // Stages:
  // 1: Intro | 2: Challenge | 3: 5-Heads Overview | 4: Hammer Ready
  // 5: Hammer Shattered | 6: Progressive Ruins Overview (1..4 crushed)
  // 8: Ram's Bow Aiming | 9: Final Arrow Strike | 11: Happy Diwali & Pledge
  const [frame, setFrame] = useState<number>(1);
  const [currentMythIdx, setCurrentMythIdx] = useState<number>(0);
  const [brokenMyths, setBrokenMyths] = useState<number[]>([]);
  const [isStriking, setIsStriking] = useState<boolean>(false);
  const [flashBurst, setFlashBurst] = useState<boolean>(false);
  const [showPledgeCard, setShowPledgeCard] = useState<boolean>(false);

  const currentMyth = MYTHS[currentMythIdx];

  const triggerParticles = (isFinal = false) => {
    confetti({
      particleCount: isFinal ? 130 : 55,
      spread: isFinal ? 110 : 70,
      origin: { y: 0.55 },
      colors: ["#FFD700", "#FFA500", "#FF8C00", "#FFF8DC"],
    });
  };

  // Hammer strike for Myths 1 to 4 (indices 0, 1, 2, 3)
  const handleHammerStrike = () => {
    if (isStriking) return;
    setIsStriking(true);
    setFlashBurst(true);

    setTimeout(() => {
      triggerParticles(false);
      setBrokenMyths((prev) =>
        prev.includes(currentMythIdx) ? prev : [...prev, currentMythIdx],
      );
      setFrame(5);
      setIsStriking(false);
    }, 260);

    setTimeout(() => setFlashBurst(false), 480);
  };

  // Ram's Bow strike for Final Myth #5 (index 4)
  const handleBowStrike = () => {
    if (isStriking) return;
    setIsStriking(true);
    setFlashBurst(true);

    setTimeout(() => {
      triggerParticles(true);
      setBrokenMyths((prev) => (prev.includes(4) ? prev : [...prev, 4]));
      setFrame(9);
      setIsStriking(false);
    }, 250);

    setTimeout(() => setFlashBurst(false), 550);
  };

  // Dynamically picks the exact ruin image based on how many heads are crushed
  const getOverviewImageByProgress = () => {
    switch (brokenMyths.length) {
      case 0:
        return ASSETS.heads_0_crushed;
      case 1:
        return ASSETS.heads_1_crushed;
      case 2:
        return ASSETS.heads_2_crushed;
      case 3:
        return ASSETS.heads_3_crushed;
      case 4:
      default:
        return ASSETS.heads_4_crushed;
    }
  };

  const getBackgroundForFrame = () => {
    switch (frame) {
      case 1:
        return ASSETS.frame01_ayodhyaRiver;
      case 2:
        return ASSETS.frame02_warriorFiveHeads;
      case 3:
        return ASSETS.heads_0_crushed;
      case 4:
        return ASSETS.frame04_headWithHammer;
      case 5:
        return ASSETS.frame05_hammerShatter;
      case 6:
        return getOverviewImageByProgress();
      case 8:
        return ASSETS.frame08_archerAiming;
      case 9:
        return ASSETS.frame09_arrowStrike;
      case 11:
        return ASSETS.frame11_ayodhyaFinale;
      default:
        return ASSETS.frame01_ayodhyaRiver;
    }
  };

  return (
    <main className="relative w-full h-[100dvh] bg-stone-950 overflow-hidden select-none font-sans">
      <div className="absolute top-4 left-4 md:top-6 md:left-8 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-3 group shrink-0 focus:outline-none"
        >
          <div className="w-36 h-12 sm:w-[13rem] sm:h-[4.5rem] flex items-center justify-start shrink-0">
            <img
              src="/logo/logo-icon.svg"
              alt="Pingaksh Renewables Limited"
              className="w-full h-full object-contain object-left drop-shadow-md"
            />
          </div>
        </Link>
      </div>
      <motion.div
        animate={
          isStriking
            ? { x: [0, -16, 16, -10, 10, 0], y: [0, 8, -8, 5, -5, 0] }
            : { x: 0, y: 0 }
        }
        transition={{ duration: 0.35 }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Full-Screen Cinematic Background */}
        <AnimatePresence mode="wait">
          <motion.img
            key={getBackgroundForFrame()}
            src={getBackgroundForFrame()}
            alt="Interactive Campaign Stage"
            initial={{ opacity: 0.2, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Top & Bottom Gradient Vignette so fixed text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/90 pointer-events-none" />

        {/* Impact Light Burst Overlay */}
        <AnimatePresence>
          {flashBurst && (
            <motion.img
              src={ASSETS.vfx_energyBurst}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1.35 }}
              exit={{ opacity: 0, scale: 1.9 }}
              transition={{ duration: 0.42 }}
              className="absolute inset-0 w-full h-full object-cover mix-blend-screen pointer-events-none z-40"
            />
          )}
        </AnimatePresence>

        {/* ================= FRAME 01: AYODHYA INTRO ================= */}
        {frame === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-20 flex flex-col items-center text-center px-6 max-w-2xl mt-20 md:mt-28"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 uppercase tracking-[0.2em] text-xs font-semibold mb-4">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Interactive Diwali Campaign
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white drop-shadow-lg leading-tight">
              This Diwali, let’s{" "}
              <span className="text-amber-400">spark clarity</span>
            </h1>
            <button
              onClick={() => setFrame(2)}
              className="mt-8 inline-flex items-center gap-3 px-7 py-3.5 md:px-9 md:py-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 font-bold text-base md:text-lg rounded-full shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:scale-105 transition cursor-pointer"
            >
              <span>Begin the Journey</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* ================= FRAME 02: THE CHALLENGE ================= */}
        {frame === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative z-20 mx-4 md:ml-auto md:mr-20 max-w-lg text-center md:text-right bg-black/65 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-amber-500/30 shadow-2xl"
          >
            <p className="text-stone-200 text-lg md:text-2xl leading-relaxed">
              Let’s break the misconceptions around
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-amber-400 mt-1.5">
              Ethanol Blending & Hydropower
            </h2>
            <button
              onClick={() => setFrame(3)}
              className="mt-6 inline-flex items-center gap-2.5 px-7 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-full shadow-lg transition cursor-pointer"
            >
              <span>Identify the Myths</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* ================= FRAMES 03 & 06: FIXED 5-HEAD ALIGNED OVERVIEW ================= */}
        {(frame === 3 || frame === 6) && (
          <div className="relative z-20 w-full h-full flex flex-col justify-between py-6 md:py-10 px-4">
            {/* Fixed Top Header */}
            <div className="text-center pt-2">
              {frame === 3 ? (
                <>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/65 border border-amber-500/40 text-amber-300 text-xs uppercase tracking-widest">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />5
                    Common Misconceptions Standing in the Way
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold text-white mt-2 drop-shadow-md">
                    Identify the Myths
                  </h2>
                </>
              ) : (
                <>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                    {brokenMyths.length} of 5 Misconceptions Crushed
                  </h2>
                  <p className="text-amber-300 text-xs sm:text-sm mt-1">
                    {brokenMyths.length < 4
                      ? "Keep going—break the remaining myths one by one"
                      : "Only the final misconception remains—summon Ram’s Bow for the final strike"}
                  </p>
                </>
              )}
            </div>

            {/* Bottom Section: Fixed 5-Column Alignment Directly Under the 5 Heads */}
            <div className="w-full max-w-[1380px] mx-auto flex flex-col items-center gap-5 md:gap-7 pb-2 md:pb-4">
              {/* 5-Column Fixed Grid on Desktop, Horizontal Scroll/Grid on Mobile */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 md:gap-4">
                {MYTHS.map((m, idx) => {
                  const isCrushed = brokenMyths.includes(idx);
                  const isNextTarget =
                    frame === 3 ? idx === 0 : idx === brokenMyths.length;

                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      onClick={() => {
                        if (isNextTarget) {
                          setCurrentMythIdx(idx);
                          setFrame(idx === 4 ? 8 : 4);
                        }
                      }}
                      className={`relative min-h-[96px] md:min-h-[118px] p-3.5 md:p-4 rounded-xl border backdrop-blur-md flex flex-col justify-between transition-all ${
                        isCrushed
                          ? "bg-emerald-950/65 border-emerald-500/50 text-stone-300"
                          : isNextTarget
                            ? "bg-amber-950/70 border-2 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.45)] cursor-pointer hover:scale-[1.02]"
                            : "bg-black/70 border-white/15 opacity-75"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-amber-400">
                          Myth #{idx + 1}
                        </span>

                        {isCrushed ? (
                          <span className="inline-flex items-center gap-1 text-[10px] md:text-xs bg-emerald-500 text-stone-950 font-bold px-2 py-0.5 rounded-full">
                            <Check className="w-3 h-3 stroke-[3]" />
                            Crushed
                          </span>
                        ) : isNextTarget ? (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-amber-400/20 border border-amber-400/60 text-amber-300 font-semibold px-2 py-0.5 rounded-full">
                            Next Target
                          </span>
                        ) : null}
                      </div>

                      <p
                        className={`font-bold text-xs md:text-sm leading-snug mt-2 ${
                          isCrushed
                            ? "line-through text-stone-400"
                            : "text-white"
                        }`}
                      >
                        {m.mythText}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Fixed Bottom Action Button */}
              <div>
                {frame === 3 ? (
                  <button
                    onClick={() => {
                      setCurrentMythIdx(0);
                      setFrame(4);
                    }}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 md:px-9 md:py-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-base md:text-lg rounded-full shadow-[0_0_25px_rgba(251,191,36,0.75)] transition cursor-pointer"
                  >
                    <Hammer className="w-5 h-5" />
                    <span>Break Myth #1</span>
                  </button>
                ) : brokenMyths.length < 4 ? (
                  <button
                    onClick={() => {
                      const nextIdx = brokenMyths.length;
                      setCurrentMythIdx(nextIdx);
                      setFrame(4);
                    }}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 md:px-9 md:py-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-base md:text-lg rounded-full shadow-[0_0_25px_rgba(251,191,36,0.75)] transition cursor-pointer"
                  >
                    <Hammer className="w-5 h-5" />
                    <span>Break Myth #{brokenMyths.length + 1}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentMythIdx(4);
                      setFrame(8);
                    }}
                    className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 text-stone-950 font-extrabold text-base md:text-lg rounded-full shadow-[0_0_35px_rgba(251,191,36,0.9)] transition cursor-pointer"
                  >
                    <Crosshair className="w-5 h-5" />
                    <span>Summon Ram’s Bow for Final Myth</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= FRAME 04: HAMMER INTERACTION (MYTHS 1-4) ================= */}
        {frame === 4 && (
          <div
            onClick={handleHammerStrike}
            className="relative z-20 w-full h-full flex flex-col justify-between p-6 md:p-10 cursor-pointer"
          >
            {/* Fixed Top Badge */}
            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 border border-amber-400/60 text-amber-300 text-xs uppercase tracking-widest">
                Myth {currentMythIdx + 1} of 5 • {currentMyth.category}
              </span>
            </div>

            {/* Fixed Bottom Bar: Myth Card on Left, Strike Button on Right */}
            <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pb-4">
              <div className="w-full md:max-w-md bg-black/75 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-amber-500/40 text-center md:text-left shadow-2xl">
                <p className="text-amber-400 text-xs uppercase tracking-widest font-semibold mb-1">
                  Misconception #{currentMythIdx + 1}
                </p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  {currentMyth.mythText}
                </h3>
              </div>

              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleHammerStrike();
                }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-stone-950 font-extrabold text-lg md:text-xl rounded-full shadow-[0_0_35px_rgba(251,191,36,0.9)] cursor-pointer"
              >
                <Hammer className="w-5 h-5" />
                <span>Click to Break</span>
              </motion.button>
            </div>
          </div>
        )}

        {/* ================= FRAME 05: SHATTERED HEAD + FIXED BOTTOM FACT CARD ================= */}
        {frame === 5 && (
          <div className="relative z-20 w-full h-full flex flex-col justify-end items-center p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-xl bg-black/85 backdrop-blur-lg p-6 md:p-8 rounded-2xl border-2 border-amber-400 text-center shadow-[0_0_50px_rgba(0,0,0,0.9)] mb-2"
            >
              <div className="w-11 h-11 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <p className="text-amber-400 uppercase tracking-widest text-xs font-bold">
                Myth #{currentMythIdx + 1} Shattered
              </p>
              <h3 className="text-base md:text-lg line-through text-stone-400 mt-1">
                {currentMyth.mythText}
              </h3>
              <p className="text-white text-base md:text-xl font-medium mt-3 leading-relaxed">
                {currentMyth.factText}
              </p>

              <button
                onClick={() => setFrame(6)}
                className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-full shadow-lg transition cursor-pointer"
              >
                <span>
                  {brokenMyths.length < 4
                    ? "Continue to Remaining Myths"
                    : "View Final Standing Myth"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}

        {/* ================= FRAME 08: BRING THE RAM'S BOW ================= */}
        {frame === 8 && (
          <div
            onClick={handleBowStrike}
            className="relative z-20 w-full h-full flex flex-col justify-between p-6 md:p-10 cursor-pointer"
          >
            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/70 border border-amber-400 text-amber-300 text-xs md:text-sm font-semibold">
                <Crosshair className="w-4 h-4 text-amber-400" />
                Final Strike • Myth 5 of 5
              </span>
            </div>

            <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pb-4">
              <div className="w-full md:max-w-md bg-black/75 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-amber-400/50 text-center md:text-left">
                <p className="text-amber-400 text-xs uppercase tracking-widest font-semibold mb-1">
                  Final Misconception
                </p>
                <p className="text-white text-xl md:text-3xl font-bold">
                  {MYTHS[4].mythText}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBowStrike();
                }}
                className="inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 text-stone-950 font-black text-lg md:text-xl rounded-full shadow-[0_0_45px_rgba(251,191,36,1)] cursor-pointer"
              >
                <Crosshair className="w-5 h-5" />
                <span>Fire Final Arrow</span>
              </motion.button>
            </div>
          </div>
        )}

        {/* ================= FRAME 09: FINAL ARROW STRIKE IMPACT ================= */}
        {frame === 9 && (
          <div className="relative z-20 w-full h-full flex flex-col justify-end items-center p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-xl bg-black/85 backdrop-blur-lg p-6 md:p-8 rounded-2xl border-2 border-amber-400 text-center mb-2 shadow-2xl"
            >
              <div className="w-11 h-11 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="text-amber-400 font-bold uppercase tracking-widest text-xs">
                All 5 Myths Destroyed
              </p>
              <h3 className="text-base md:text-lg line-through text-stone-400 mt-1">
                {MYTHS[4].mythText}
              </h3>
              <p className="text-white text-base md:text-xl font-medium mt-3 leading-relaxed">
                {MYTHS[4].factText}
              </p>

              {/* Directly transitions to Frame 11 (Happy Diwali & Pledge) without Frame 10 sparkle banner */}
              <button
                onClick={() => {
                  triggerParticles(true);
                  setShowPledgeCard(false);
                  setFrame(11);
                }}
                className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-300 text-stone-950 font-extrabold rounded-full shadow-lg hover:scale-105 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Reveal Diwali Greeting</span>
              </button>
            </motion.div>
          </div>
        )}

        {/* ================= FRAME 11: HAPPY DIWALI & PLEDGE SECTION ================= */}
        {frame === 11 && (
          <div className="relative z-20 w-full h-full flex items-center justify-center md:justify-end px-6 md:pr-16 lg:pr-24">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-xl bg-black/70 backdrop-blur-md p-7 sm:p-9 md:p-10 rounded-3xl border border-amber-400/40 text-center shadow-[0_0_60px_rgba(0,0,0,0.85)]"
            >
              <span className="inline-flex items-center gap-1.5 text-amber-300 text-xs uppercase tracking-[0.25em] font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Festival of Light & Truth
              </span>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif italic text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-yellow-600 drop-shadow-[0_4px_25px_rgba(251,191,36,0.5)] py-1">
                Happy Diwali
              </h1>

              <div className="w-24 h-0.5 bg-amber-400/50 mx-auto my-5" />

              <p className="text-stone-200 text-base sm:text-lg md:text-xl leading-relaxed font-light">
                This Diwali, let’s replace misconceptions with facts, and light
                the way to a
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 mt-2 leading-snug">
                cleaner, greener and self-reliant India.
              </h2>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setBrokenMyths([]);
                    setCurrentMythIdx(0);
                    setShowPledgeCard(false);
                    setFrame(1);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-amber-400/60 text-amber-300 hover:bg-amber-400/15 rounded-full text-sm font-semibold transition cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Replay Experience</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </main>
  );
}

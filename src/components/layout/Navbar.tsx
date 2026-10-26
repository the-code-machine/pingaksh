"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Leaf,
  FileText,
  Globe,
  ChevronDown,
  LayoutGrid,
  ArrowRight,
  Menu,
  X,
  Lock,
  Sparkles,
  ExternalLink,
  Building2,
} from "lucide-react";
import { NAVIGATION_DATA, type NavItem } from "@/data/navigationData";
import MarketTicker from "./MarketTicker";

export default function Navbar() {
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(
    "who-we-are",
  );
  const [groupSitesOpen, setGroupSitesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const lastScrollY = useRef(0);

  // Smart Scroll Direction Detection (Hide on Scroll Down, Reveal on Scroll Up)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Solidify background after 20px
      setIsScrolled(currentScrollY > 20);

      // 2. Always show navbar at the top of the page (Hero zone)
      if (currentScrollY < 120) {
        setIsHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      const scrollDelta = currentScrollY - lastScrollY.current;

      // Ignore tiny trackpad jitters (< 8px)
      if (Math.abs(scrollDelta) < 8) return;

      if (
        scrollDelta > 0 &&
        !activeTabId &&
        !groupSitesOpen &&
        !mobileDrawerOpen
      ) {
        // Scrolling DOWN -> Hide Navbar & close any stray popovers
        setIsHidden(true);
        setActiveTabId(null);
        setGroupSitesOpen(false);
      } else if (scrollDelta < 0) {
        // Scrolling UP -> Reveal Navbar
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTabId, groupSitesOpen, mobileDrawerOpen]);

  // Sync CSS variable so sticky sub-headers (like the Year Scrubber) can optionally offset when Navbar reveals
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--navbar-offset",
      isHidden ? "0px" : "116px", // 36px (h-9 utility bar) + 80px (h-20 main nav)
    );
  }, [isHidden]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileDrawerOpen]);

  const activeNavData: NavItem | undefined = NAVIGATION_DATA.find(
    (item) => item.id === activeTabId,
  );

  const toggleMobileAccordion = (id: string) => {
    setMobileExpandedId((prev) => (prev === id ? null : id));
  };

  // Keep header visible if user is actively interacting with menus
  const shouldHideHeader =
    isHidden && !activeTabId && !groupSitesOpen && !mobileDrawerOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out will-change-transform ${
        shouldHideHeader ? "-translate-y-full" : "translate-y-0"
      }`}
      onMouseLeave={() => setActiveTabId(null)}
    >
      {/* =========================================================
          1. TOP CORPORATE UTILITY BAR (Matches Pingaksh Figma)
      ========================================================= */}
      <div className="bg-navy-950 text-white border-b border-white/10 text-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-9 flex items-center justify-between">
          {/* Left: Clean Energy | Sustainable Tomorrow */}
          <div className="flex items-center gap-2.5 text-sand-200/90">
            <span className="inline-flex items-center gap-1.5 font-medium text-white">
              <Leaf className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
              Clean Energy
            </span>
            <span className="text-white/30">|</span>
            <span className="hidden sm:inline text-white/85">
              Sustainable Tomorrow
            </span>
          </div>

          {/* Right: NSE Tickers & Quick Portal Links */}
          <div className="flex items-center gap-3 md:gap-4 overflow-x-auto no-scrollbar">
            <MarketTicker />
            <span className="hidden md:inline text-white/25">|</span>

            {/* Quick Link: Investor Reports */}
            <Link
              href="/investors/financial-reports"
              className="hidden sm:inline-flex items-center gap-1.5 text-white/85 hover:text-pingaksh-sand transition-colors whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-sand-300" />
              <span>Investor Reports</span>
            </Link>

            <span className="hidden lg:inline text-white/25">|</span>

            {/* Quick Link: Sustainability Dashboard */}
            <Link
              href="/sustainability/carbon-dashboard"
              className="hidden lg:inline-flex items-center gap-1.5 text-white/85 hover:text-pingaksh-sand transition-colors whitespace-nowrap"
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sustainability Dashboard</span>
            </Link>

            <span className="hidden sm:inline text-white/25">|</span>

            {/* Country Selector */}
            <button
              type="button"
              className="inline-flex items-center gap-1 text-white/90 hover:text-pingaksh-sand transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-sand-200" />
              <span>India</span>
              <ChevronDown className="w-3 h-3 opacity-75" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          2. MAIN NAVIGATION BAR (Desktop + Mobile Trigger)
      ========================================================= */}
      <div
        className={`transition-colors duration-300 ${
          activeTabId || isScrolled
            ? "bg-pingaksh-navy/95 backdrop-blur-md shadow-lg border-b border-white/10"
            : "bg-gradient-to-b from-pingaksh-navy/90 via-pingaksh-navy/70 to-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo + Wordmark + Tagline */}
          <Link
            href="/"
            className="inline-flex items-start gap-3 sm:gap-3.5 group shrink-0 focus:outline-none"
          >
            {/* Emblem aligned with the main title block (Top + Subtitle) */}
            <div className="w-11 h-11 sm:w-[54px] sm:h-[54px] flex items-center justify-center shrink-0 mt-0.5">
              <img
                src="/logo/logo-icon.svg"
                alt="Pingaksh Renewables Limited"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Reliance-Style 3-Tier Typography Lockup */}
            <div className="flex flex-col w-fit font-logo">
              {/* Tier 1: Primary Brand Name */}
              <span className="text-[22px] sm:text-[30px] capitalize font-medium leading-[0.95] tracking-[0.02em] text-pingaksh-sand">
                PINGAKSH
              </span>

              {/* Tier 2: Entity Name (Sized & tracked to match the width of "Pingaksh") */}
              <span className="text-[11px] sm:text-[16.5px] font-normal leading-tight tracking-[0.015em] text-pingaksh-sand/95  whitespace-nowrap">
                Renewables Limited
              </span>

              {/* Divider Rule */}
              <div className="w-full h-[1px] bg-pingaksh-sand/40 my-1" />

              {/* Tier 3: Centered Tagline */}
              <span className="text-[9.5px] sm:text-[11px] font-normal leading-none tracking-[0.04em] text-pingaksh-sand/85 text-center">
                Building Tomorrow, Today
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Tabs (Reliance-style framed active state) */}
          <nav
            aria-label="Main Navigation"
            className="hidden xl:flex items-center gap-1 2xl:gap-2 h-full"
          >
            {NAVIGATION_DATA.map((item) => {
              const isActive = activeTabId === item.id;
              return (
                <div
                  key={item.id}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveTabId(item.id)}
                >
                  <Link
                    href={item.href}
                    className={`relative px-3.5 py-2.5 text-[13.5px] lg:text-nowrap font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? "text-white bg-navy-800/90 border border-sky-400/60 shadow-inner"
                        : "text-white/95 hover:text-pingaksh-sand border border-transparent"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isActive
                          ? "rotate-180 text-pingaksh-sand"
                          : "opacity-80"
                      }`}
                    />
                    {/* Reliance-style Gold/Terracotta Bottom Active Bar */}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[3px] bg-pingaksh-sand transition-opacity duration-200 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right Actions: Group Sites Pill + Mobile/Tablet Hamburger */}
        </div>
      </div>

      {/* =========================================================
          3. RELIANCE-STYLE DESKTOP MEGA-MENU DROPDOWN (Full-Width White)
      ========================================================= */}
      <AnimatePresence>
        {activeNavData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="hidden xl:block w-full bg-white text-pingaksh-navy shadow-[0_25px_50px_-12px_rgba(18,28,77,0.35)] border-t border-sand-200"
          >
            <div className="max-w-[1440px] mx-auto px-10 py-10">
              <div className="grid grid-cols-12 gap-10">
                {/* Left Brand Context Column (Cols 1-3) */}
                <div className="col-span-3 border-r border-sand-200 pr-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-pingaksh-terracotta">
                      Pingaksh Group
                    </span>
                    <h3 className="text-2xl font-bold text-pingaksh-navy mt-2">
                      {activeNavData.label}
                    </h3>
                    <p className="text-xs text-navy-600 mt-2.5 leading-relaxed">
                      Building utility-scale hydro power and grain-based
                      bio-ethanol infrastructure for India&apos;s clean energy
                      transition.
                    </p>
                  </div>

                  <Link
                    href={activeNavData.href}
                    onClick={() => setActiveTabId(null)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pingaksh-terracotta hover:text-terracotta-600 mt-6 group"
                  >
                    <span>Overview: {activeNavData.label}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Center Multi-Column Sub-Links (Reliance Style, Cols 4-8) */}
                <div className="col-span-5 grid grid-cols-2 gap-8">
                  {activeNavData.columns.map((col, idx) => (
                    <div key={idx} className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 border-b border-sand-200 pb-2">
                        {col.heading}
                      </h4>
                      <ul className="space-y-3">
                        {col.items.map((subItem) => (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              onClick={() => setActiveTabId(null)}
                              className="group block p-2 -mx-2 rounded-lg hover:bg-sand-50 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-navy-800 group-hover:text-pingaksh-terracotta transition-colors">
                                  {subItem.label}
                                </span>
                                {subItem.isGated && (
                                  <Lock className="w-3.5 h-3.5 text-pingaksh-terracotta shrink-0" />
                                )}
                                {subItem.badge && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sand-200 text-pingaksh-navy">
                                    {subItem.badge}
                                  </span>
                                )}
                              </div>
                              {subItem.description && (
                                <p className="text-xs text-navy-500 mt-0.5 line-clamp-2">
                                  {subItem.description}
                                </p>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Right Insights Column (Cols 9-12) */}
                <div className="col-span-4 pl-6 border-l border-sand-200">
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-sand-200">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-navy-400">
                      Featured Insight
                    </h4>
                  </div>

                  <Link
                    href={activeNavData.featuredInsight.href}
                    onClick={() => setActiveTabId(null)}
                    className="block group"
                  >
                    <div className="w-full h-44 rounded-xl overflow-hidden mb-4 relative bg-sand-100">
                      <img
                        src={activeNavData.featuredInsight.imageUrl}
                        alt={activeNavData.featuredInsight.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-pingaksh-terracotta">
                        {activeNavData.featuredInsight.category}
                      </span>
                      <span className="text-sand-300">|</span>
                      <span className="text-[11px] font-medium text-navy-500">
                        {activeNavData.featuredInsight.date}
                      </span>
                    </div>

                    <h5 className="text-[15px] font-bold text-pingaksh-navy leading-snug group-hover:text-pingaksh-terracotta transition-colors">
                      {activeNavData.featuredInsight.title}
                    </h5>

                    <div className="mt-3.5 flex items-center gap-1.5 text-xs font-semibold text-pingaksh-navy group-hover:text-pingaksh-terracotta transition-colors">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          4. RELIANCE-STYLE RIGHT-TO-LEFT MOBILE & TABLET DRAWER
      ========================================================= */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed top-0 left-0 w-screen h-dvh bg-navy-950/70 backdrop-blur-xs z-50 xl:hidden"
            />

            {/* Right-to-Left Slide Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 h-dvh w-full sm:w-[420px] bg-pingaksh-navy text-white z-50 xl:hidden flex flex-col shadow-2xl overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 flex items-center justify-between border-b border-white/10 shrink-0">
                <Link
                  href="/"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="flex items-center gap-3"
                >
                  <div className="w-9 h-9 flex items-center justify-center text-pingaksh-sand">
                    <svg
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full"
                    >
                      <path
                        d="M22 14C13 14 8 20 8 27C8 35 16 40 28 38C25 26 26 14 22 14Z"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      />
                      <path
                        d="M42 14C51 14 56 20 56 27C56 35 48 40 36 38C39 26 38 14 42 14Z"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      />
                      <path
                        d="M32 18L18 50H46L32 18Z"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-logo text-lg tracking-wider text-pingaksh-sand leading-none">
                      PINGAKSH
                    </span>
                    <span className="font-tagline text-[8.5px] tracking-[0.2em] text-sand-200/80 uppercase mt-1">
                      RENEWABLES
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  aria-label="Close Menu"
                  className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Accordion List */}
              <div className="flex-1 px-5 py-4 space-y-1 overflow-y-auto">
                {NAVIGATION_DATA.map((navItem) => {
                  const isExpanded = mobileExpandedId === navItem.id;
                  return (
                    <div
                      key={navItem.id}
                      className="border-b border-white/15 last:border-b-0"
                    >
                      <button
                        type="button"
                        onClick={() => toggleMobileAccordion(navItem.id)}
                        className="w-full py-4 px-1 flex items-center justify-between text-left text-[16px] font-medium text-white hover:text-pingaksh-sand transition-colors cursor-pointer"
                      >
                        <span>{navItem.label}</span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-250 ${
                            isExpanded
                              ? "rotate-180 text-pingaksh-sand"
                              : "opacity-80"
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="bg-white text-pingaksh-navy rounded-xl p-5 mb-5 shadow-inner space-y-5">
                              {navItem.columns.map((col, colIndex) => (
                                <div key={colIndex} className="space-y-2.5">
                                  <h5 className="text-[13px] font-bold text-pingaksh-navy tracking-wide">
                                    {col.heading}
                                  </h5>
                                  <ul className="space-y-2 pl-0.5">
                                    {col.items.map((subItem) => (
                                      <li key={subItem.href}>
                                        <Link
                                          href={subItem.href}
                                          onClick={() =>
                                            setMobileDrawerOpen(false)
                                          }
                                          className="flex items-center justify-between py-1 text-[13.5px] text-navy-700 hover:text-pingaksh-terracotta font-normal transition-colors"
                                        >
                                          <span className="flex items-center gap-2">
                                            {subItem.label}
                                            {subItem.isGated && (
                                              <Lock className="w-3.5 h-3.5 text-pingaksh-terracotta" />
                                            )}
                                          </span>
                                          {subItem.badge && (
                                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sand-200 text-pingaksh-navy">
                                              {subItem.badge}
                                            </span>
                                          )}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}

                              <div className="pt-3 border-t border-sand-200">
                                <Link
                                  href={navItem.href}
                                  onClick={() => setMobileDrawerOpen(false)}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-pingaksh-terracotta hover:underline"
                                >
                                  <span>Explore {navItem.label} Overview</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="p-5 bg-navy-950 border-t border-white/10 space-y-3 shrink-0">
                <div className="flex items-center justify-between text-xs text-sand-200">
                  <span>NSE: ₹1,198.70 (+2.05%)</span>
                  <Link
                    href="/sustainability/carbon-dashboard"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <Leaf className="w-3.5 h-3.5" />
                    CO₂ Ticker
                  </Link>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

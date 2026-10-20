"use client";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import React, { useState } from "react";

export interface AnnouncementItem {
  id: string;
  category: string;
  date: string;
  isoDate: string;
  headline: string;
  summary: string;
  href: string;
  partnerNames: { primary: string; secondary: string };
  visualBadge: string;
  imageUrl: string;
  imageAlt: string;
}
const transitionEase = [0.22, 1, 0.36, 1] as const;
export default function Announment({
  announcementsSection,
}: {
  announcementsSection: {
    sectionTitle: string;
    allPressLabel: string;
    allPressHref: string;
    items: AnnouncementItem[];
  };
}) {
  const [activeAnnouncementIdx, setActiveAnnouncementIdx] = useState(0);
  const activeAnnouncement = announcementsSection.items[activeAnnouncementIdx];
  return (
    <section
      aria-labelledby="announcements-section-heading"
      className="bg-white py-24 sm:py-32 text-pingaksh-navy border-t-[12px] border-pingaksh-sand"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: transitionEase }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-sand-200"
        >
          <h2
            id="announcements-section-heading"
            className="font-logo text-4xl sm:text-5xl lg:text-6xl text-pingaksh-navy tracking-wide"
          >
            {announcementsSection.sectionTitle}
          </h2>
          <Link
            href={announcementsSection.allPressHref}
            className="inline-flex items-center gap-2 text-sm font-bold text-pingaksh-terracotta hover:text-pingaksh-navy transition-colors group pb-1"
          >
            <span>{announcementsSection.allPressLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-14">
          {/* Left: Featured Announcement Data */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-10">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeAnnouncement.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: transitionEase }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-sand-100 border border-sand-200 font-tagline text-[10px] font-bold uppercase tracking-widest text-pingaksh-terracotta">
                  {activeAnnouncement.visualBadge}
                </div>

                <h3 className="font-logo text-2xl sm:text-3xl lg:text-4xl font-bold text-pingaksh-navy leading-snug">
                  <Link
                    href={activeAnnouncement.href}
                    className="hover:text-pingaksh-terracotta transition-colors group"
                  >
                    {activeAnnouncement.headline}
                    <ArrowUpRight className="inline-block w-6 h-6 ml-2 text-pingaksh-terracotta opacity-0 -translate-y-2 -translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </h3>

                <p className="font-body text-base text-navy-600 leading-relaxed">
                  {activeAnnouncement.summary}
                </p>

                <div className="pt-5 border-t border-sand-200 flex items-center gap-4 font-tagline text-[11px] font-bold tracking-widest uppercase text-navy-500">
                  <span className="text-pingaksh-terracotta">
                    {activeAnnouncement.category}
                  </span>
                  <span className="text-sand-300">|</span>
                  <time dateTime={activeAnnouncement.isoDate}>
                    {activeAnnouncement.date}
                  </time>
                </div>
              </motion.article>
            </AnimatePresence>

            {/* Bottom Switcher Tabs */}
            <div className="space-y-3">
              <span className="block font-tagline text-[10px] font-bold uppercase tracking-widest text-navy-400">
                Recent Releases ({announcementsSection.items.length})
              </span>
              <div className="grid grid-cols-3 gap-3">
                {announcementsSection.items.map((item, idx) => {
                  const isSelected = idx === activeAnnouncementIdx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveAnnouncementIdx(idx)}
                      className={`p-4 rounded-md border text-left transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "bg-pingaksh-navy text-white border-pingaksh-navy shadow-md scale-[1.02]"
                          : "bg-sand-50 hover:bg-sand-100 text-pingaksh-navy border-sand-200 hover:border-sand-300"
                      }`}
                    >
                      <time
                        className={`block font-tagline text-[9px] font-bold uppercase tracking-wider mb-2 ${
                          isSelected
                            ? "text-pingaksh-sand"
                            : "text-pingaksh-terracotta"
                        }`}
                      >
                        {item.date}
                      </time>
                      <span className="block font-body text-xs font-semibold line-clamp-2 leading-tight">
                        {item.visualBadge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Featured Announcement Image */}
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAnnouncement.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: transitionEase }}
                className="relative overflow-hidden rounded-xl h-full min-h-[400px] lg:min-h-[550px] bg-navy-950 shadow-xl border border-sand-200"
              >
                <motion.img
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src={activeAnnouncement.imageUrl}
                  alt={activeAnnouncement.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                  <time className="inline-flex items-center px-4 py-2 rounded bg-white/95 text-pingaksh-navy font-tagline text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    {activeAnnouncement.date}
                  </time>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

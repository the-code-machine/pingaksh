"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Image as ImageIcon,
  Film,
  Search,
  X,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Download,
  Loader2,
  Calendar,
} from "lucide-react";
import type { ProjectGalleryPageData } from "@/data/projectGalleryData";

interface ProjectGalleryViewProps {
  data: ProjectGalleryPageData; // Hero and Spotlight reel stay static
}

// API Data Interface
interface ApiMediaItem {
  id: number;
  type: "image" | "video";
  file_name: string;
  db_path: string;
  url: string;
  mime_type: string;
  file_size: number;
  created_at: string;
}

const enterpriseEase = [0.22, 1, 0.36, 1] as const;

export default function ProjectGalleryView({ data }: ProjectGalleryViewProps) {
  const { breadcrumbs, hero, spotlightReel, mediaTypes } = data;

  // =================================================================
  // 1. API FETCHING, PAGINATION & FILTER STATE
  // =================================================================
  const [mediaItems, setMediaItems] = useState<ApiMediaItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [selectedType, setSelectedType] = useState<"all" | "image" | "video">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchMedia = async (
    pageNum: number,
    type: string,
    search: string,
    reset = false,
  ) => {
    setIsLoading(true);
    try {
      const apiBase =
        process.env.NEXT_PUBLIC_ADMIN_API_URL ||
        "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin";

      const url = new URL(`${apiBase}/api/media.php`);
      url.searchParams.append("page", pageNum.toString());
      url.searchParams.append("limit", "12"); // Fetch 12 items per batch

      if (type !== "all") url.searchParams.append("type", type);
      if (search.trim()) url.searchParams.append("search", search.trim());

      const res = await fetch(url.toString());
      const result = await res.json();

      if (result.success) {
        setMediaItems((prev) =>
          reset ? result.data : [...prev, ...result.data],
        );
        setHasMore(result.pagination.has_more);
      }
    } catch (error) {
      console.error("Failed to fetch media from API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce effect for search and filter changes
  useEffect(() => {
    setPage(1); // Reset to first page when filters change
    const timer = setTimeout(() => {
      fetchMedia(1, selectedType, searchQuery, true);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery, selectedType]);

  const handleLoadMore = () => {
    if (!hasMore || isLoading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMedia(nextPage, selectedType, searchQuery, false);
  };

  // =================================================================
  // 2. LIGHTBOX MODAL STATE
  // =================================================================
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(
    null,
  );
  const [spotlightModalOpen, setSpotlightModalOpen] = useState<boolean>(false);

  const closeLightbox = useCallback(() => {
    setActiveLightboxIndex(null);
    setSpotlightModalOpen(false);
  }, []);

  const showNextItem = useCallback(() => {
    if (activeLightboxIndex === null || mediaItems.length === 0) return;
    setActiveLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % mediaItems.length : null,
    );
  }, [activeLightboxIndex, mediaItems.length]);

  const showPrevItem = useCallback(() => {
    if (activeLightboxIndex === null || mediaItems.length === 0) return;
    setActiveLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + mediaItems.length) % mediaItems.length : null,
    );
  }, [activeLightboxIndex, mediaItems.length]);

  useEffect(() => {
    if (activeLightboxIndex === null && !spotlightModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNextItem();
      if (e.key === "ArrowLeft") showPrevItem();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeLightboxIndex,
    spotlightModalOpen,
    closeLightbox,
    showNextItem,
    showPrevItem,
  ]);

  const activeLightboxItem: ApiMediaItem | null =
    activeLightboxIndex !== null ? mediaItems[activeLightboxIndex] : null;

  // Formatting Helper
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <article className="w-full bg-sand-50 text-pingaksh-navy selection:bg-pingaksh-terracotta selection:text-white">
      {/* =====================================================================
          1. ARCHITECTURAL HERO HEADER
      ===================================================================== */}
      <header className="relative w-full min-h-[54vh] bg-pingaksh-navy text-white flex flex-col justify-end overflow-hidden pt-36 pb-16 sm:pb-20">
        <figure className="absolute inset-0 m-0">
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
            src={hero.backgroundImage}
            alt={hero.backgroundAlt}
            width={2000}
            height={1000}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-950 via-pingaksh-navy/80 to-navy-950/65"
          />
        </figure>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center flex-wrap gap-2 text-xs text-sand-200/80">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <li key={crumb.href} className="flex items-center gap-2">
                    {isLast ? (
                      <span className="text-pingaksh-sand font-semibold">
                        {crumb.label}
                      </span>
                    ) : (
                      <>
                        <Link
                          href={crumb.href}
                          className="hover:text-white transition-colors"
                        >
                          {crumb.label}
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-t border-white/15 pt-8">
            <div className="lg:col-span-7">
              <h1 className="font-logo text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-wide">
                {hero.title}
              </h1>
              <p className="font-logo text-lg sm:text-2xl text-pingaksh-sand mt-3">
                {hero.subtitle}
              </p>
            </div>
            <div className="lg:col-span-5">
              <p className="font-body text-sm sm:text-base text-sand-100/85 leading-relaxed">
                {hero.leadText}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          2. FEATURED OPERATIONS FILM SHOWCASE
      ===================================================================== */}

      {/* =====================================================================
          3. STICKY SEARCH & MEDIA FILTER BAR
      ===================================================================== */}
      <section className="sticky top-0 z-20 bg-sand-50/95 backdrop-blur-md border-b border-sand-300 mt-14 sm:mt-20 py-4">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Media Type Segmented Control */}
          <div className="inline-flex rounded-xl bg-sand-200/80 p-1 border border-sand-300 overflow-x-auto no-scrollbar">
            {mediaTypes.map((t) => {
              const active = selectedType === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setSelectedType(t.id as "all" | "image" | "video");
                    setActiveLightboxIndex(null);
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    active
                      ? "bg-pingaksh-terracotta text-white shadow-sm"
                      : "text-navy-700 hover:text-pingaksh-navy"
                  }`}
                >
                  {t.id === "image" && <ImageIcon className="w-3.5 h-3.5" />}
                  {t.id === "video" && <Film className="w-3.5 h-3.5" />}
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Keyword Search Box */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-3.5 h-3.5 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveLightboxIndex(null);
              }}
              placeholder="Search filename or extension (e.g. mp4, jpg)..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-sand-300 text-xs text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-navy-400 hover:text-pingaksh-navy cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. API-FED MASONRY PHOTOGRAPHY & VIDEO GRID
      ===================================================================== */}
      <section className="py-14 sm:py-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 min-h-[50vh]">
        {mediaItems.length === 0 && !isLoading ? (
          <div className="rounded-3xl bg-white border border-sand-300 p-12 text-center max-w-lg mx-auto space-y-4">
            <ImageIcon className="w-10 h-10 text-pingaksh-terracotta mx-auto opacity-80" />
            <h3 className="font-logo text-2xl text-pingaksh-navy">
              No Media Assets Found
            </h3>
            <p className="text-xs sm:text-sm text-navy-600">
              Try clearing your search keyword or switching filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedType("all");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-full bg-pingaksh-navy text-pingaksh-sand text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[360px]">
            <AnimatePresence mode="popLayout">
              {mediaItems.map((item, idx) => {
                // Alternating masonry spans (8 col wide, 4 col standard)
                const spanClass =
                  idx % 5 === 0 ? "lg:col-span-8" : "lg:col-span-4";

                return (
                  <motion.figure
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.35 }}
                    onClick={() => setActiveLightboxIndex(idx)}
                    className={`${spanClass} group relative m-0 rounded-3xl overflow-hidden bg-pingaksh-navy border border-sand-300 shadow-md hover:shadow-2xl cursor-pointer flex flex-col justify-between`}
                  >
                    {item.type === "video" ? (
                      <video
                        src={item.url}
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-85"
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.file_name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-90"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/15 group-hover:from-pingaksh-navy/95 transition-colors duration-300" />

                    <div className="relative z-10 p-5 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-navy-950/80 backdrop-blur-md border border-white/15 text-pingaksh-sand text-[10.5px] font-bold uppercase tracking-wider">
                        {item.type}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-pingaksh-sand text-white group-hover:text-pingaksh-navy backdrop-blur-md flex items-center justify-center transition-colors">
                        {item.type === "video" ? (
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        ) : (
                          <Maximize2 className="w-3.5 h-3.5" />
                        )}
                      </span>
                    </div>

                    {item.type === "video" && (
                      <div className="relative z-10 my-auto flex items-center justify-center pointer-events-none">
                        <div className="w-14 h-14 rounded-full bg-white/20 group-hover:bg-pingaksh-terracotta backdrop-blur-md text-white flex items-center justify-center border border-white/30 transition-all duration-300 group-hover:scale-110">
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}

                    <figcaption className="relative z-10 p-6 space-y-2">
                      <div className="flex items-center gap-3 text-[11px] text-sand-200/85 font-medium">
                        <span className="inline-flex items-center gap-1 uppercase">
                          <Calendar className="w-3 h-3 text-pingaksh-sand" />
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                        <span>·</span>
                        <span className="font-mono text-[10px] text-pingaksh-sand">
                          {formatBytes(item.file_size)}
                        </span>
                      </div>
                      <h3 className="font-logo text-xl sm:text-2xl text-white group-hover:text-pingaksh-sand transition-colors leading-snug truncate">
                        {item.file_name}
                      </h3>
                      <p className="text-[11px] font-mono text-sand-300/80 truncate">
                        {item.db_path}
                      </p>
                    </figcaption>
                  </motion.figure>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Load More & Loading States */}
        <div className="mt-14 flex justify-center">
          {isLoading && (
            <div className="flex items-center gap-3 text-pingaksh-terracotta font-semibold text-sm">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Fetching Media Assets...</span>
            </div>
          )}
          {hasMore && !isLoading && (
            <button
              onClick={handleLoadMore}
              className="px-8 py-3.5 rounded-full bg-pingaksh-navy hover:bg-navy-800 text-pingaksh-sand text-sm font-semibold transition-all shadow-lg cursor-pointer"
            >
              Load More Assets
            </button>
          )}
        </div>
      </section>

      {/* =====================================================================
          5. FULL-SCREEN CINEMA LIGHTBOX MODAL
      ===================================================================== */}
      <AnimatePresence>
        {(activeLightboxItem || spotlightModalOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 left-0 w-screen h-dvh bg-navy-950/95 backdrop-blur-lg z-50 flex flex-col justify-between p-4 sm:p-8 overflow-y-auto"
          >
            <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between gap-4 border-b border-white/10 pb-4 shrink-0">
              <div className="flex items-center gap-3 text-xs text-sand-200">
                <span className="px-3 py-1 rounded-full bg-pingaksh-terracotta text-white font-bold uppercase tracking-wider">
                  {spotlightModalOpen
                    ? spotlightReel.badge
                    : activeLightboxItem?.type}
                </span>
                {activeLightboxItem && (
                  <span className="font-mono text-pingaksh-sand">
                    {(activeLightboxIndex ?? 0) + 1} of {mediaItems.length}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-pingaksh-terracotta text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-w-6xl w-full mx-auto my-auto py-6 relative flex items-center justify-center">
              {!spotlightModalOpen && mediaItems.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrevItem();
                  }}
                  className="hidden sm:flex absolute -left-14 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-pingaksh-sand text-white hover:text-pingaksh-navy items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              <div className="w-full rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl">
                {spotlightModalOpen ? (
                  <video
                    src={spotlightReel.videoUrl}
                    poster={spotlightReel.posterUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full max-h-[70vh] object-contain mx-auto"
                  />
                ) : activeLightboxItem?.type === "video" ? (
                  <video
                    key={activeLightboxItem.url}
                    src={activeLightboxItem.url}
                    controls
                    autoPlay
                    playsInline
                    className="w-full max-h-[68vh] object-contain mx-auto"
                  />
                ) : (
                  activeLightboxItem && (
                    <img
                      key={activeLightboxItem.url}
                      src={activeLightboxItem.url}
                      alt={activeLightboxItem.file_name}
                      className="w-full max-h-[68vh] object-contain mx-auto"
                    />
                  )
                )}
              </div>

              {!spotlightModalOpen && mediaItems.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNextItem();
                  }}
                  className="hidden sm:flex absolute -right-14 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-pingaksh-sand text-white hover:text-pingaksh-navy items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            <div className="max-w-6xl w-full mx-auto pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white shrink-0">
              <div className="space-y-1 max-w-3xl">
                <h3 className="font-logo text-xl sm:text-2xl text-pingaksh-sand truncate">
                  {spotlightModalOpen
                    ? spotlightReel.title
                    : activeLightboxItem?.file_name}
                </h3>
                <p className="text-xs sm:text-sm text-sand-100/85 font-mono">
                  {spotlightModalOpen
                    ? spotlightReel.description
                    : activeLightboxItem?.db_path}
                </p>
              </div>

              {!spotlightModalOpen && activeLightboxItem && (
                <div className="flex items-center gap-3 shrink-0">
                  <span className="px-3.5 py-2 rounded-xl bg-white/10 text-xs font-mono text-pingaksh-sand">
                    {formatBytes(activeLightboxItem.file_size)}
                  </span>
                  <a
                    href={activeLightboxItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pingaksh-terracotta hover:bg-terracotta-600 text-white text-xs font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

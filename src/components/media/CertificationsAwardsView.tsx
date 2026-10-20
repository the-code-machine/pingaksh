"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  FileCheck2,
  ChevronRight,
  ArrowUpRight,
  Download,
  X,
  Building2,
  Calendar,
  MapPin,
  Eye,
} from "lucide-react";
import type {
  CertificationsAwardsPageData,
  AccreditationCategory,
  CertificationItem,
} from "@/data/certificationsAwardsData";

interface CertificationsAwardsViewProps {
  data: CertificationsAwardsPageData;
}

export default function CertificationsAwardsView({
  data,
}: CertificationsAwardsViewProps) {
  const {
    breadcrumbs,
    hero,
    trustBenchmarks,
    categories,
    certifications,
    awards,
    qualityPolicyStatement,
  } = data;

  const [selectedCategory, setSelectedCategory] =
    useState<AccreditationCategory>("All");
  const [inspectedCert, setInspectedCert] = useState<CertificationItem | null>(
    null,
  );

  const filteredCertifications = useMemo(() => {
    if (selectedCategory === "All") return certifications;
    return certifications.filter((c) => c.category === selectedCategory);
  }, [certifications, selectedCategory]);

  // On-Page SEO JSON-LD: BreadcrumbList + Accreditations & Awards ItemList
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: crumb.label,
          item: `https://www.pingakshrenewables.com${crumb.href}`,
        })),
      },
      {
        "@type": "CollectionPage",
        name: data.seo.title,
        description: data.seo.description,
        url: "https://www.pingakshrenewables.com/media/certifications-awards",
        mainEntity: {
          "@type": "ItemList",
          name: "Pingaksh Group Statutory Certifications & Industry Awards",
          itemListElement: certifications.map((cert, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${cert.standardCode} — ${cert.title}`,
            description: cert.scopeDescription,
          })),
        },
      },
    ],
  };

  return (
    <article className="w-full bg-sand-50 text-pingaksh-navy selection:bg-pingaksh-terracotta selection:text-white">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* =====================================================================
          1. ARCHITECTURAL HERO HEADER (With Safe Top Clearance for Fixed Navbar)
      ===================================================================== */}
      <header className="relative w-full min-h-[54vh] bg-pingaksh-navy text-white flex flex-col justify-end overflow-hidden pt-36 pb-16 sm:pb-20">
        <figure className="absolute inset-0 m-0">
          <motion.img
            initial={{ scale: 1.07 }}
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
                      <span
                        aria-current="page"
                        className="text-pingaksh-sand font-semibold"
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <>
                        <Link
                          href={crumb.href}
                          title={`Navigate to ${crumb.label}`}
                          className="hover:text-white transition-colors"
                        >
                          {crumb.label}
                        </Link>
                        <ChevronRight
                          className="w-3.5 h-3.5 opacity-50"
                          aria-hidden="true"
                        />
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
          2. 4-PILLAR STATUTORY & QUALITY BENCHMARK BAR
      ===================================================================== */}
      <section
        aria-label="Key Quality and Statutory Benchmarks"
        className="bg-navy-950 text-white border-b border-white/10 py-10"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBenchmarks.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-logo text-2xl sm:text-3xl font-bold text-pingaksh-sand">
                    {item.value}
                  </span>
                  <span className="font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded bg-pingaksh-terracotta text-white">
                    {item.unit}
                  </span>
                </div>
                <div className="mt-3">
                  <h2 className="text-sm font-bold text-white">{item.label}</h2>
                  <p className="text-xs text-sand-200/75 mt-1">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. STATUTORY CERTIFICATIONS & ISO ACCREDITATIONS DIRECTORY
      ===================================================================== */}
      <section
        aria-labelledby="certifications-heading"
        className="py-16 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10"
      >
        {/* Header & Category Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-sand-300">
          <div>
            <h2
              id="certifications-heading"
              className="font-logo text-3xl sm:text-5xl text-pingaksh-navy mt-1.5"
            >
              Statutory Accreditations
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter Certifications by Category"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-pingaksh-navy text-pingaksh-sand shadow-sm"
                      : "bg-white hover:bg-sand-200 text-navy-700 border border-sand-300"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pt-10">
          <AnimatePresence mode="popLayout">
            {filteredCertifications.map((cert, idx) => (
              <motion.article
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group rounded-3xl bg-white border border-sand-300 hover:border-pingaksh-terracotta shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Top Standard Seal Header */}
                  <div className="relative h-44 bg-pingaksh-navy overflow-hidden p-6 flex flex-col justify-between text-white">
                    <img
                      src={cert.badgeImageUrl}
                      alt={cert.imageAlt}
                      width={700}
                      height={400}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-navy-950 via-pingaksh-navy/70 to-transparent"
                    />

                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-pingaksh-sand text-[10.5px] font-bold uppercase tracking-wider border border-white/15">
                        {cert.category}
                      </span>
                      <span className="font-mono text-[11px] text-sand-200">
                        {cert.certificateNumber}
                      </span>
                    </div>

                    <div className="relative z-10 flex items-end justify-between gap-3">
                      <div>
                        <span className="text-[11px] uppercase tracking-widest text-pingaksh-sand block">
                          Standard Code
                        </span>
                        <span className="font-logo text-2xl sm:text-3xl font-bold text-white tracking-wide">
                          {cert.standardCode}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Scope & Verification Points */}
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-pingaksh-terracotta block">
                        {cert.applicableEntity}
                      </span>
                      <h3 className="font-logo text-xl text-pingaksh-navy mt-1 leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-[11.5px] text-navy-500 mt-1">
                        Issued by: <strong>{cert.issuingAuthority}</strong>
                      </p>
                    </div>

                    <p className="text-xs text-navy-700 leading-relaxed">
                      {cert.scopeDescription}
                    </p>

                    <ul className="space-y-2 pt-2 border-t border-sand-200">
                      {cert.verificationHighlights.map((point, pIdx) => (
                        <li
                          key={pIdx}
                          className="flex items-start gap-2 text-xs text-navy-800 font-medium"
                        >
                          <CheckCircle2
                            className="w-3.5 h-3.5 text-pingaksh-terracotta shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Actions: Inspect Dossier Modal + Statutory Filing Link */}
                <div className="px-6 py-4 bg-sand-50 border-t border-sand-200 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setInspectedCert(cert)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-pingaksh-navy hover:text-pingaksh-terracotta transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-pingaksh-terracotta" />
                    <span>Inspect Certificate</span>
                  </button>

                  <Link
                    href={cert.pdfHref}
                    title={`Download ${cert.standardCode} Statutory Dossier`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-pingaksh-terracotta hover:underline"
                  >
                    <FileCheck2 className="w-3.5 h-3.5" />
                    <span>{cert.validThrough.split(" ")[0]}</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* =====================================================================
          4. INDUSTRY AWARDS & CITATIONS SHOWCASE (Reliance Editorial Style)
      ===================================================================== */}
      <section
        aria-labelledby="awards-showcase-heading"
        className="py-20 sm:py-28 bg-pingaksh-navy text-white border-t border-white/10"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl mb-14">
            <span className="font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-sand">
              Institutional Recognition
            </span>
            <h2
              id="awards-showcase-heading"
              className="font-logo text-3xl sm:text-5xl text-white mt-2"
            >
              Awards &amp; Industry Citations
            </h2>
            <p className="text-sm sm:text-base text-sand-200/80 mt-3">
              Honoring our engineering teams for high-availability hydro
              generation, circular bio-refining, and Himalayan watershed
              stewardship.
            </p>
          </div>

          <div className="space-y-8">
            {awards.map((award, index) => (
              <motion.article
                key={award.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-3xl bg-navy-950/90 border border-white/15 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-xl hover:border-pingaksh-sand/40 transition-colors"
              >
                {/* Left Image Column (Cols 1-4) */}
                <figure className="lg:col-span-4 relative min-h-[240px] m-0 overflow-hidden group">
                  <img
                    src={award.imageUrl}
                    alt={award.imageAlt}
                    width={800}
                    height={550}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-80"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-pingaksh-terracotta text-white font-logo text-sm font-bold">
                    {award.year} Citation
                  </div>
                </figure>

                {/* Right Editorial Details (Cols 5-12) */}
                <div className="lg:col-span-8 p-7 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-pingaksh-sand">
                      <span className="font-bold uppercase tracking-wider">
                        Conferred by: {award.conferredBy}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sand-200/75">
                        <MapPin className="w-3.5 h-3.5 text-pingaksh-terracotta" />
                        {award.location}
                      </span>
                    </div>

                    <h3 className="font-logo text-2xl sm:text-3xl text-white">
                      {award.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-sand-100/85 leading-relaxed">
                      {award.citationSummary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <span className="text-sand-200">
                      Recipient Entity:{" "}
                      <strong className="text-white">
                        {award.recipientEntity}
                      </strong>
                    </span>

                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-pingaksh-sand font-semibold">
                      <Award className="w-4 h-4 text-pingaksh-terracotta" />
                      {award.metricHighlight}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. QUALITY & ESG GOVERNANCE CHARTER STATEMENT
      ===================================================================== */}
      <section
        aria-label="Quality and ESG Policy Statement"
        className="py-16 sm:py-20 bg-sand-200/70 border-t border-sand-300"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center space-y-5">
          <span className="font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-terracotta font-bold">
            {qualityPolicyStatement.heading}
          </span>
          <blockquote className="font-logo text-2xl sm:text-4xl text-pingaksh-navy leading-relaxed">
            “{qualityPolicyStatement.quote}”
          </blockquote>
          <div className="pt-2">
            <cite className="not-italic text-xs font-bold uppercase tracking-wider text-pingaksh-navy block">
              {qualityPolicyStatement.signatory}
            </cite>
            <span className="text-xs text-navy-600">
              {qualityPolicyStatement.designation}
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. CERTIFICATE DOSSIER MODAL VIEWER
      ===================================================================== */}
      <AnimatePresence>
        {inspectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate Details: ${inspectedCert.title}`}
            onClick={() => setInspectedCert(null)}
            className="fixed top-0 left-0 w-screen h-dvh bg-navy-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full rounded-3xl bg-white border border-sand-300 shadow-2xl overflow-hidden text-pingaksh-navy my-auto"
            >
              <div className="bg-pingaksh-navy text-white p-6 sm:p-8 flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-xs text-pingaksh-sand block">
                    Certificate Ref: {inspectedCert.certificateNumber}
                  </span>
                  <h3 className="font-logo text-2xl sm:text-3xl text-white mt-1">
                    {inspectedCert.standardCode} — {inspectedCert.title}
                  </h3>
                  <p className="text-xs text-sand-200 mt-1">
                    {inspectedCert.issuingAuthority} ·{" "}
                    {inspectedCert.validThrough}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setInspectedCert(null)}
                  aria-label="Close Certificate Modal"
                  className="p-2 rounded-full bg-white/10 hover:bg-pingaksh-terracotta text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200 text-xs space-y-1">
                  <span className="text-navy-500 uppercase font-bold block">
                    Accredited Group Entity:
                  </span>
                  <strong className="text-sm text-pingaksh-navy block">
                    {inspectedCert.applicableEntity}
                  </strong>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy-500 mb-2">
                    Audited Scope of Certification
                  </h4>
                  <p className="text-xs sm:text-sm text-navy-800 leading-relaxed">
                    {inspectedCert.scopeDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy-500 mb-2.5">
                    Key Compliance &amp; Verification Checkpoints
                  </h4>
                  <ul className="space-y-2">
                    {inspectedCert.verificationHighlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-navy-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-sand-200 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href={inspectedCert.pdfHref}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pingaksh-terracotta hover:bg-terracotta-600 text-white text-xs font-semibold transition-all shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Request / View Statutory Filing PDF</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setInspectedCert(null)}
                    className="px-5 py-2.5 rounded-full border border-sand-300 hover:bg-sand-100 text-xs font-semibold text-navy-700 cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

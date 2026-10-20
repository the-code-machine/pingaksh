"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ChevronRight,
  Building2,
  CheckCircle2,
  ArrowUpRight,
  Send,
  ShieldCheck,
  Lock,
} from "lucide-react";
import type {
  ContactOfficesPageData,
  OfficeLocation,
} from "@/data/contactOfficesData";

interface ContactOfficesViewProps {
  data: ContactOfficesPageData;
}

export default function ContactOfficesView({ data }: ContactOfficesViewProps) {
  const {
    breadcrumbs,
    hero,
    statutoryIdentity,
    categories,
    offices,
    departmentDesks,
    inquirySubjects,
  } = data;

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation>(
    offices[0],
  );
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredOffices =
    activeCategory === "all"
      ? offices
      : offices.filter((o) => o.category === activeCategory);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    const firstMatch =
      catId === "all"
        ? offices[0]
        : offices.find((o) => o.category === catId) || offices[0];
    setSelectedOffice(firstMatch);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // On-Page SEO JSON-LD: BreadcrumbList + ContactPage + Organization ContactPoints
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
        "@type": "ContactPage",
        name: data.seo.title,
        description: data.seo.description,
        url: "https://www.pingakshrenewables.com/contact/offices",
        mainEntity: {
          "@type": "Corporation",
          name: statutoryIdentity.parentEntity,
          contactPoint: departmentDesks.map((desk) => ({
            "@type": "ContactPoint",
            contactType: desk.department,
            telephone: desk.phone,
            email: desk.email,
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          })),
        },
      },
    ],
  };

  return (
    <article className="w-full bg-sand-50 text-pingaksh-navy selection:bg-pingaksh-terracotta selection:text-white">
      {/* Inject Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* =====================================================================
          1. ARCHITECTURAL HERO HEADER (With Safe Top Clearance for Fixed Navbar)
      ===================================================================== */}
      <header className="relative w-full min-h-[58vh] bg-pingaksh-navy text-white flex flex-col justify-end overflow-hidden pt-36 pb-16 sm:pb-20">
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
          {/* Breadcrumb Trail */}
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
          2. STATUTORY ENTITY BAR (Reliance-Style Corporate Disclosure Strip)
      ===================================================================== */}
      <section
        aria-label="Statutory Corporate Entities"
        className="bg-navy-950 text-sand-100 border-b border-white/10 py-5"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-2 font-semibold text-white">
              {statutoryIdentity.parentEntity}
            </span>
            <span className="hidden sm:inline text-white/25">|</span>
            <span className="text-sand-200/85">
              Hydro SPV: <strong>{statutoryIdentity.hydroSpv}</strong>
            </span>
            <span className="hidden sm:inline text-white/25">|</span>
            <span className="text-sand-200/85">
              Bio-Refinery SPV: <strong>{statutoryIdentity.biofuelSpv}</strong>
            </span>
          </div>

          <Link
            href="/contact/vendor-portal"
            title="Access Password-Protected Vendor Registration Portal"
            className="inline-flex items-center gap-1.5 text-pingaksh-sand hover:text-white font-semibold shrink-0"
          >
            <Lock className="w-3.5 h-3.5 text-pingaksh-terracotta" />
            <span>Looking for Vendor Empanelment? Access e-Portal</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* =====================================================================
          3. INTERACTIVE CORPORATE & PLANT DIRECTORY (Split Filter + Map View)
      ===================================================================== */}
      <section
        aria-labelledby="directory-heading"
        className="py-16 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10"
      >
        {/* Top Header + Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-sand-300">
          <div>
            <h2
              id="directory-heading"
              className="font-logo text-3xl sm:text-5xl text-pingaksh-navy mt-1.5"
            >
              Offices &amp; Operating Plants
            </h2>
          </div>

          {/* Category Filter Pills */}
        </div>

        {/* 12-Column Interactive Split: Left Location Selector Cards (5 Cols) + Right Inspector & Live Map (7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-10 items-start">
          {/* Left Column: Location Cards */}
          <div className="lg:col-span-5 space-y-4">
            {filteredOffices.map((office) => {
              const isSelected = selectedOffice.id === office.id;
              return (
                <motion.div
                  key={office.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedOffice(office)}
                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-250 cursor-pointer ${
                      isSelected
                        ? "bg-pingaksh-navy text-white border-pingaksh-navy shadow-xl"
                        : "bg-white hover:bg-sand-100/80 text-pingaksh-navy border-sand-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`font-tagline text-[10px] uppercase tracking-widest font-bold ${
                          isSelected
                            ? "text-pingaksh-sand"
                            : "text-pingaksh-terracotta"
                        }`}
                      >
                        {office.categoryLabel}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                          isSelected
                            ? "bg-pingaksh-terracotta text-white"
                            : "bg-sand-200 text-pingaksh-navy"
                        }`}
                      >
                        {office.badge}
                      </span>
                    </div>

                    <h3 className="font-logo text-xl sm:text-2xl tracking-wide">
                      {office.title}
                    </h3>
                    <p
                      className={`text-xs font-medium mt-0.5 ${
                        isSelected ? "text-sand-200" : "text-navy-600"
                      }`}
                    >
                      {office.entityName}
                    </p>

                    <address
                      className={`not-italic text-xs mt-4 space-y-1 leading-relaxed ${
                        isSelected ? "text-sand-100/85" : "text-navy-700"
                      }`}
                    >
                      {office.addressLines.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                      <p className="font-semibold">{office.cityStatePin}</p>
                    </address>

                    <div
                      className={`mt-4 pt-3 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${
                        isSelected
                          ? "border-white/15 text-pingaksh-sand"
                          : "border-sand-200 text-pingaksh-terracotta font-semibold"
                      }`}
                    >
                      <span>{office.phone}</span>
                      <span className="inline-flex items-center gap-1">
                        Inspect Site &amp; Map
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Active Location Detail Panel + Embedded Map */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedOffice.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-white border border-sand-300 shadow-2xl overflow-hidden"
              >
                {/* Top Site Photograph + Coordinates Overlay */}
                <div className="relative h-60 sm:h-72 bg-pingaksh-navy overflow-hidden group">
                  <img
                    src={selectedOffice.imageUrl}
                    alt={selectedOffice.imageAlt}
                    width={1200}
                    height={650}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-80"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/35 to-transparent"
                  />

                  <div className="absolute top-5 left-6 right-6 flex items-center justify-between gap-2">
                    <span className="px-3.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-pingaksh-sand text-xs font-semibold border border-white/15">
                      {selectedOffice.entityName}
                    </span>
                    <span className="px-3 py-1 rounded-md bg-navy-950/80 backdrop-blur-md text-white font-mono text-[11px] border border-white/15">
                      {selectedOffice.coordinatesLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-6 right-6 text-white">
                    <h3 className="font-logo text-2xl sm:text-4xl">
                      {selectedOffice.title}
                    </h3>
                  </div>
                </div>

                {/* Middle NAP Details & Key Functions */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-sand-200">
                    {/* Address & Hours */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin
                          className="w-4 h-4 text-pingaksh-terracotta shrink-0 mt-1"
                          aria-hidden="true"
                        />
                        <address className="not-italic text-xs sm:text-sm text-navy-800 leading-relaxed">
                          <strong className="block text-pingaksh-navy mb-0.5">
                            Official Address
                          </strong>
                          {selectedOffice.addressLines.join(", ")},{" "}
                          {selectedOffice.cityStatePin}
                        </address>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock
                          className="w-4 h-4 text-pingaksh-terracotta shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <div className="text-xs text-navy-700">
                          <strong className="block text-pingaksh-navy">
                            Operating Schedule
                          </strong>
                          {selectedOffice.operatingHours}
                        </div>
                      </div>
                    </div>

                    {/* Direct Phone, Email & Directions CTA */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Phone
                          className="w-4 h-4 text-pingaksh-terracotta shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <div className="text-xs sm:text-sm">
                          <strong className="block text-pingaksh-navy">
                            Telephone Desk
                          </strong>
                          <a
                            href={`tel:${selectedOffice.phone.replace(
                              /[^+\d]/g,
                              "",
                            )}`}
                            className="text-navy-700 hover:text-pingaksh-terracotta transition-colors block"
                          >
                            {selectedOffice.phone}
                          </a>
                          {selectedOffice.secondaryPhone && (
                            <span className="text-xs text-navy-500 block">
                              {selectedOffice.secondaryPhone}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail
                          className="w-4 h-4 text-pingaksh-terracotta shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <div className="text-xs sm:text-sm">
                          <strong className="block text-pingaksh-navy">
                            Official Email
                          </strong>
                          <a
                            href={`mailto:${selectedOffice.email}`}
                            className="text-pingaksh-terracotta font-medium hover:underline break-all"
                          >
                            {selectedOffice.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Functions hosted at this site */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-navy-500 mb-3">
                      Key Operations &amp; Functions at This Location
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {selectedOffice.keyFunctions.map((fn, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-sand-50 border border-sand-200 flex items-start gap-2 text-xs text-navy-800 font-medium"
                        >
                          <CheckCircle2
                            className="w-3.5 h-3.5 text-pingaksh-terracotta shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{fn}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Map Iframe + External Directions Link */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-navy-600">
                        Interactive Location Map
                      </span>
                      <a
                        href={selectedOffice.googleMapsDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Open ${selectedOffice.title} in Google Maps`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-pingaksh-terracotta hover:underline"
                      >
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="w-full h-56 rounded-2xl overflow-hidden border border-sand-300 bg-sand-100">
                      <iframe
                        title={`Map showing ${selectedOffice.title}`}
                        src={selectedOffice.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full border-0"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. DEPARTMENTAL & INSTITUTIONAL DESKS (Reliance-Style Direct Contacts)
      ===================================================================== */}
      <section
        aria-labelledby="desks-heading"
        className="py-16 sm:py-24 bg-pingaksh-navy text-white border-t border-white/10"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl mb-12">
            <span className="font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-sand">
              Specialized Corporate Desks
            </span>
            <h2
              id="desks-heading"
              className="font-logo text-3xl sm:text-5xl text-white mt-2"
            >
              Direct Departmental Channels
            </h2>
            <p className="text-sm text-sand-200/80 mt-2">
              Route your inquiry directly to the concerned vertical head for
              accelerated institutional response.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departmentDesks.map((desk, i) => (
              <motion.div
                key={desk.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl bg-navy-950/80 border border-white/15 p-6 flex flex-col justify-between hover:border-pingaksh-sand/50 transition-colors"
              >
                <div className="space-y-3">
                  <span className="inline-block text-[11px] font-tagline uppercase tracking-widest text-pingaksh-sand">
                    0{i + 1} · Desk
                  </span>
                  <h3 className="font-logo text-xl text-white">
                    {desk.department}
                  </h3>
                  <p className="text-xs font-semibold text-pingaksh-terracotta">
                    {desk.contactRole}
                  </p>
                  <p className="text-xs text-sand-100/75 leading-relaxed">
                    {desk.scope}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-white/10 space-y-2 text-xs">
                  <a
                    href={`mailto:${desk.email}`}
                    className="flex items-center gap-2 text-pingaksh-sand hover:underline break-all"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span>{desk.email}</span>
                  </a>
                  <a
                    href={`tel:${desk.phone.replace(/[^+\d]/g, "")}`}
                    className="flex items-center gap-2 text-sand-200 hover:text-white"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span>{desk.phone}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. CORPORATE INQUIRY DISPATCH FORM
      ===================================================================== */}
      <section
        aria-labelledby="inquiry-form-heading"
        className="py-16 sm:py-24 bg-sand-100 border-t border-sand-300"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="rounded-3xl bg-white border border-sand-300 shadow-xl p-8 sm:p-12 lg:p-14">
            <div className="max-w-2xl mb-8">
              <span className="font-tagline text-xs uppercase tracking-[0.2em] text-pingaksh-terracotta font-bold">
                Official Correspondence
              </span>
              <h2
                id="inquiry-form-heading"
                className="font-logo text-3xl sm:text-4xl text-pingaksh-navy mt-1"
              >
                Send an Institutional Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-navy-600 mt-2">
                {statutoryIdentity.complianceNote}
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-sand-50 border border-sand-300 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-logo text-2xl text-pingaksh-navy">
                  Inquiry Logged with Corporate Secretariat
                </h3>
                <p className="text-xs sm:text-sm text-navy-700 max-w-md mx-auto">
                  Thank you for contacting Pingaksh Group. Your correspondence
                  has been routed to the relevant department desk.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="mt-2 px-5 py-2 rounded-full bg-pingaksh-navy text-pingaksh-sand text-xs font-semibold cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="e.g., Rajesh Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                  />
                </div>

                <div>
                  <label
                    htmlFor="organization"
                    className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                  >
                    Organization / Entity *
                  </label>
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    required
                    placeholder="Company or Institution Name"
                    className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                  >
                    Official Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="subject"
                    className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                  >
                    Inquiry Category / Department *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                  >
                    {inquirySubjects.map((subj) => (
                      <option key={subj} value={subj}>
                        {subj}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                  >
                    Detailed Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Please share your tender reference, off-take requirement, or corporate query..."
                    className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <span className="text-xs text-navy-500">
                    Protected under Pingaksh Group Corporate Data &amp; Privacy
                    Policy.
                  </span>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-pingaksh-terracotta hover:bg-terracotta-600 text-white text-sm font-semibold transition-all shadow-lg cursor-pointer"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Dispatch Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}

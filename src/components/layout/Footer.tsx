"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ChevronDown,
  ShieldCheck,
  Leaf,
  Lock,
  FileCheck2,
  ArrowUp,
} from "lucide-react";
import { NAVIGATION_DATA } from "@/data/navigationData";

export default function Footer() {
  // Mobile accordion state
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // =========================================================
  // HARDCODED OFFICE DATA
  // =========================================================

  const offices = [
    {
      id: "corporate-hq",
      category: "corporate",
      categoryLabel: "Corporate Headquarters",
      entityName: "Pingaksh Group · Executive Secretariat",
      title: "Gurugram Corporate Office",
      badge: "Primary Executive Hub",

      addressLines: [
        "Vatika Triangle, Sushant Lok Phase I, Block A",
        "Mehrauli-Gurgaon Road, Gurugram",
      ],

      cityStatePin: "Haryana – 122002, India",

      phone: "+91 9548481358",
      email: "info@pingakshrenewables.com",

      operatingHours: "Mon – Sat: 09:30 AM – 06:30 PM IST",

      coordinatesLabel: "28.4800° N, 77.0805° E",

      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.7214777598826!2d77.07790387600867!3d28.487950390632616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1927cb70bc97%3A0xe5a3068fefc7fb8!2sVatika%20Triangle!5e0!3m2!1sen!2sin!4v1701332822188!5m2!1sen!2sin",

      googleMapsDirectUrl:
        "https://maps.google.com/?q=Vatika+Triangle,+Sushant+Lok+Phase+I,+Block+A,+Mehrauli-Gurgaon+Road,+Gurugram,+Haryana+122002",

      imageUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",

      imageAlt: "Pingaksh Group Corporate Headquarters in Gurugram",

      keyFunctions: [
        "Board of Directors & Promoter Secretariat",
        "Corporate Finance, Treasury & Investor Relations",
        "Central EPC Procurement & OMC Tender Cell",
      ],
    },
  ];

  // =========================================================
  // ORGANIZATION STRUCTURED DATA (JSON-LD)
  // =========================================================

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Corporation",

    name: "Pingaksh Renewables",
    alternateName: "Pingaksh Group (Formerly PRL)",

    url: "https://www.pingakshrenewables.com",

    description:
      "Clean energy infrastructure leader operating Run-of-the-River Hydro Power Projects (Sarju I, II, III) and a 250 KLPD Grain-Based Bio-Ethanol Distillery with Zero-Liquid Discharge.",

    address: {
      "@type": "PostalAddress",
      streetAddress:
        "3rd floor, 37 saraswati kunj, next to vatika towers, golf course road, sector 53",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      postalCode: "122002",
      addressCountry: "IN",
    },

    telephone: "+91 9313783584",
    email: "info@pingakshrenewables.com",

    knowsAbout: [
      "Run-of-the-River Hydroelectric Power",
      "E20 Grain-Based Bio-Ethanol Distillery",
      "DDGS High-Protein Animal Feed",
      "CO2 Bottling and Dry Ice Circular Economy",
      "Zero Liquid Discharge (ZLD) Sustainability",
    ],
  };

  return (
    <footer
      role="contentinfo"
      aria-label="Pingaksh Renewables Corporate Footer"
      className="bg-navy-950 text-white border-t border-white/10 relative overflow-hidden"
    >
      {/* Embedded JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* =========================================================
          1. PRE-FOOTER SUSTAINABILITY & PARTNER CALLOUT BAR
      ========================================================= */}

      <section
        aria-label="Sustainability and Partner Quick Actions"
        className="bg-pingaksh-navy border-b border-white/10"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-pingaksh-sand">
              <Leaf
                className="w-3.5 h-3.5 text-emerald-400"
                aria-hidden="true"
              />
              <span>Zero-Liquid Discharge & Circular Bio-Economy</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Partnering for India&apos;s E20 Bio-Energy &amp; Hydro Power
              Transition
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 w-full lg:w-auto">
            <Link
              href="/sustainability/carbon-dashboard"
              title="View Pingaksh Renewables Live Carbon Offset & CO2 Savings Dashboard"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-pingaksh-sand border border-pingaksh-sand/30 text-xs sm:text-sm font-semibold transition-all"
            >
              <Leaf className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Live CO₂ Savings Ticker</span>
            </Link>

            <Link
              href="/contact/vendor-portal"
              title="Access Password-Protected Vendor Registration Portal"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-pingaksh-terracotta hover:bg-terracotta-600 text-white text-xs sm:text-sm font-semibold transition-all shadow-md"
            >
              <Lock className="w-4 h-4" aria-hidden="true" />
              <span>Vendor Registration Portal</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. MAIN CORPORATE FOOTER
          BRAND + SITEMAP + CORPORATE OFFICE
      ========================================================= */}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* LEFT COLUMN: BRAND + CORPORATE OFFICE */}

          <div className="lg:col-span-4 space-y-6 pr-0 lg:pr-6">
            {offices
              .filter((office) => office.category === "corporate")
              .map((office) => (
                <address
                  key={office.id}
                  className="not-italic space-y-4 pt-2 border-white/10 text-xs sm:text-sm text-sand-100/90"
                >
                  {/* Office Title */}

                  <div className="space-y-1.5">
                    <strong className="text-white font-semibold block text-sm">
                      {office.title}
                    </strong>

                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-pingaksh-sand bg-white/5 border border-white/10 px-2 py-1 rounded">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      {office.badge}
                    </span>

                    <p className="text-[11px] text-sand-200/70 pt-1">
                      {office.entityName}
                    </p>
                  </div>

                  {/* Office Address */}

                  <div className="flex items-start gap-3">
                    <MapPin
                      className="w-4 h-4 text-pingaksh-terracotta shrink-0 mt-1"
                      aria-hidden="true"
                    />

                    <div className="space-y-0.5">
                      {office.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}

                      <span className="block">{office.cityStatePin}</span>
                    </div>
                  </div>

                  {/* Phone */}

                  <div className="flex items-center gap-3">
                    <Phone
                      className="w-4 h-4 text-pingaksh-terracotta shrink-0"
                      aria-hidden="true"
                    />

                    <a
                      href={`tel:${office.phone.replace(/[^\d+]/g, "")}`}
                      title="Call Pingaksh Renewables Corporate Office"
                      className="hover:text-pingaksh-sand transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>

                  {/* Email */}

                  <div className="flex items-center gap-3">
                    <Mail
                      className="w-4 h-4 text-pingaksh-terracotta shrink-0"
                      aria-hidden="true"
                    />

                    <a
                      href={`mailto:${office.email}`}
                      title="Email Pingaksh Renewables Corporate Office"
                      className="hover:text-pingaksh-sand transition-colors"
                    >
                      {office.email}
                    </a>
                  </div>

                  {/* Operating Hours */}

                  <div className="text-[11px] text-sand-200/70 pl-7">
                    <span className="text-pingaksh-sand font-semibold">
                      Operating Hours:
                    </span>{" "}
                    {office.operatingHours}
                  </div>

                  {/* Google Maps Directions */}

                  <div className="pl-7">
                    <a
                      href={office.googleMapsDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Get directions to ${office.title}`}
                      className="inline-flex items-center gap-1.5 text-pingaksh-sand hover:text-white transition-colors font-semibold text-xs"
                    >
                      Get Directions
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Coordinates */}

                  <p className="text-[10px] text-sand-200/50 pl-7">
                    {office.coordinatesLabel}
                  </p>
                </address>
              ))}
          </div>

          {/* =====================================================
              RIGHT COLUMNS: FOOTER SITEMAP
          ===================================================== */}

          <nav
            aria-label="Footer Sitemap Navigation"
            className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8"
          >
            {NAVIGATION_DATA.map((section) => {
              const isOpen = openSection === section.id;

              const allItems = section.columns.flatMap((col) => col.items);

              return (
                <div
                  key={section.id}
                  className="border-b border-white/10 md:border-b-0 py-3.5 md:py-0"
                >
                  {/* Desktop Heading */}

                  <h3 className="hidden md:block text-xs font-bold uppercase tracking-[0.15em] text-pingaksh-sand pb-3 mb-3 border-b border-white/10">
                    <Link
                      href={section.href}
                      title={`Explore ${section.label} at Pingaksh Renewables`}
                      className="hover:text-white transition-colors"
                    >
                      {section.label}
                    </Link>
                  </h3>

                  {/* Mobile Accordion Button */}

                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    aria-expanded={isOpen}
                    aria-controls={`footer-panel-${section.id}`}
                    className="md:hidden w-full flex items-center justify-between text-left py-1 text-sm font-bold uppercase tracking-wider text-pingaksh-sand"
                  >
                    <span>{section.label}</span>

                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-white" : "opacity-70"
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Desktop Static List */}

                  <ul className="hidden md:block space-y-2.5">
                    {allItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          title={`${item.label} - ${
                            item.description || section.label
                          }`}
                          className="group inline-flex items-center gap-1.5 text-xs text-sand-100/80 hover:text-pingaksh-sand transition-colors leading-snug"
                        >
                          <span>{item.label}</span>

                          {item.isGated && (
                            <Lock
                              className="w-3 h-3 text-pingaksh-terracotta shrink-0"
                              aria-label="Password Protected Portal"
                            />
                          )}

                          {item.badge && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-white/10 text-pingaksh-sand">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Mobile Collapsible Accordion */}

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.ul
                        id={`footer-panel-${section.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.2,
                          ease: "easeOut",
                        }}
                        className="md:hidden overflow-hidden pt-3 pb-1 space-y-2.5 pl-2 border-l-2 border-pingaksh-terracotta/60 mt-2"
                      >
                        {allItems.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              title={item.label}
                              className="flex items-center justify-between text-xs text-sand-100/85 hover:text-pingaksh-sand py-0.5"
                            >
                              <span className="flex items-center gap-1.5">
                                {item.label}

                                {item.isGated && (
                                  <Lock
                                    className="w-3 h-3 text-pingaksh-terracotta"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>

                              {item.badge && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-pingaksh-sand">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* =========================================================
          3. BOTTOM STATUTORY, COPYRIGHT & LEGAL BAR
      ========================================================= */}

      <div className="bg-black/30 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand-200/70">
          <div className="text-center sm:text-left">
            <p>
              &copy; {year}{" "}
              <strong className="text-white font-medium">
                Pingaksh Renewables . Ltd.
              </strong>{" "}
              All Rights Reserved.
            </p>
          </div>

          {/* Statutory & Legal Links */}

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/investors/statutory-filings"
              title="Statutory Filings & Regulatory Disclosures"
              className="hover:text-pingaksh-sand transition-colors"
            >
              Statutory Filings
            </Link>

            <Link
              href="/privacy-policy"
              title="Pingaksh Renewables Privacy Policy"
              className="hover:text-pingaksh-sand transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-of-use"
              title="Website Terms of Use & Disclaimer"
              className="hover:text-pingaksh-sand transition-colors"
            >
              Terms &amp; Disclaimers
            </Link>

            <Link
              href="/sitemap.xml"
              title="XML Sitemap for Search Engines"
              className="hover:text-pingaksh-sand transition-colors"
            >
              Sitemap
            </Link>

            {/* Back to Top Button */}

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top of page"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-pingaksh-terracotta text-white transition-colors cursor-pointer"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

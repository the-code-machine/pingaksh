"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock,
  Unlock,
  ShieldCheck,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Building2,
  Landmark,
  Phone,
  UserCheck,
  Trash2,
  KeyRound,
  Mail,
} from "lucide-react";
import type { VendorPortalPageData } from "@/data/vendorPortalData";

interface VendorPortalViewProps {
  data: VendorPortalPageData;
}

interface VendorKycFormState {
  companyName: string;
  address: string;
  name1: string;
  mobile1: string;
  name2: string;
  mobile2: string;
  office1: string;
  office2: string;
  residence: string;
  email: string;
  bankName: string;
  branch: string;
  accountNumber: string;
  ifscCode: string;
  tinNumber: string;
  panNumber: string;
  gstinNumber: string;
  msmeRegistered: string;
  reference: string;
  agreeTerms: boolean;
}

export default function VendorPortalView({ data }: VendorPortalViewProps) {
  const {
    breadcrumbs,
    hero,
    securityGate,
    steps,
    formLabels,
    requiredDocuments,
    complianceGuidelines,
  } = data;

  // =================================================================
  // 1. PASSWORD GATE STATE
  // =================================================================
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  // =================================================================
  // 2. MULTI-STEP KYC FORM STATE (All Legacy Fields Preserved)
  // =================================================================
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stepError, setStepError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submissionRefId, setSubmissionRefId] = useState<string>("");

  const [formData, setFormData] = useState<VendorKycFormState>({
    companyName: "",
    address: "",
    name1: "",
    mobile1: "",
    name2: "",
    mobile2: "",
    office1: "",
    office2: "",
    residence: "",
    email: "",
    bankName: "",
    branch: "",
    accountNumber: "",
    ifscCode: "",
    tinNumber: "",
    panNumber: "",
    gstinNumber: "",
    msmeRegistered: "",
    reference: "",
    agreeTerms: false,
  });

  // Track uploaded files by document ID
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<string, File | null>
  >({
    addressProof: null,
    panScanCopy: null,
    gstinCertificate: null,
    msmeCertification: null,
    tinScanCopy: null,
    companyRegCertificate: null,
  });

  // Handle Password Verification
  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      passwordInput.trim().toUpperCase() ===
      securityGate.demoAccessCode.toUpperCase()
    ) {
      setAuthError("");
      setIsUnlocked(true);
    } else {
      setAuthError(
        "Invalid Partner Access Code. Please verify with the Procurement Desk or use PINGAKSH2026.",
      );
    }
  };

  // Handle Text / Select Input Changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setStepError("");
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle File Selection
  const handleFileChange = (docId: string, fileList: FileList | null) => {
    setStepError("");
    if (fileList && fileList[0]) {
      setUploadedFiles((prev) => ({ ...prev, [docId]: fileList[0] }));
    }
  };

  const removeFile = (docId: string) => {
    setUploadedFiles((prev) => ({ ...prev, [docId]: null }));
  };

  // Validate Current Step Before Advancing
  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (
        !formData.companyName.trim() ||
        !formData.address.trim() ||
        !formData.name1.trim() ||
        !formData.mobile1.trim() ||
        !formData.office1.trim() ||
        !formData.email.trim()
      ) {
        setStepError(
          "Please fill in all mandatory (*) Company, Promoter (Name 1 & Mobile), Office 1, and Email fields.",
        );
        return false;
      }
    } else if (step === 2) {
      if (
        !formData.bankName.trim() ||
        !formData.branch.trim() ||
        !formData.accountNumber.trim() ||
        !formData.ifscCode.trim() ||
        !formData.panNumber.trim() ||
        !formData.gstinNumber.trim() ||
        !formData.msmeRegistered
      ) {
        setStepError(
          "Please complete all mandatory (*) Bank Details, PAN Number, GSTIN Number, and MSME Registered selection.",
        );
        return false;
      }
    } else if (step === 3) {
      const missingDocs = requiredDocuments.filter(
        (doc) => doc.required && !uploadedFiles[doc.id],
      );
      if (missingDocs.length > 0) {
        setStepError(
          `Please upload all mandatory (*) documents: ${missingDocs
            .map((d) => d.label)
            .join(", ")}.`,
        );
        return false;
      }
      if (!formData.agreeTerms) {
        setStepError(
          "You must agree to the Terms and Conditions of Pingaksh before submitting.",
        );
        return false;
      }
    }
    setStepError("");
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      window.scrollTo({ top: 320, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    setStepError("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 320, behavior: "smooth" });
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    const generatedId = `PRPL-KYC-${new Date().getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000,
    )}`;
    setSubmissionRefId(generatedId);
    setIsSubmitted(true);
    window.scrollTo({ top: 280, behavior: "smooth" });
  };

  // On-Page SEO JSON-LD Schema
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
        "@type": "WebPage",
        name: data.seo.title,
        description: data.seo.description,
        url: "https://www.pingakshrenewables.com/contact/vendor-portal",
      },
    ],
  };

  return (
    <article className="w-full bg-sand-50 text-pingaksh-navy selection:bg-pingaksh-terracotta selection:text-white">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* =====================================================================
          1. ARCHITECTURAL HERO HEADER (With Safe Top Clearance for Fixed Navbar)
      ===================================================================== */}
      <header className="relative w-full min-h-[52vh] bg-pingaksh-navy text-white flex flex-col justify-end overflow-hidden pt-36 pb-14 sm:pb-20">
        <figure className="absolute inset-0 m-0">
          <motion.img
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
            src={hero.backgroundImage}
            alt={hero.backgroundAlt}
            width={2000}
            height={1000}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-950 via-pingaksh-navy/85 to-navy-950/70"
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pingaksh-terracotta text-white text-[11px] font-bold uppercase tracking-wider mb-4">
                {isUnlocked ? (
                  <>
                    <Unlock className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Session Authenticated · KYC Active</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{securityGate.badge}</span>
                  </>
                )}
              </div>
              <h1 className="font-logo text-4xl sm:text-6xl text-white leading-[1.06] tracking-wide">
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
          2. MAIN PORTAL BODY: PASSWORD GATE OR UNLOCKED MULTI-STEP KYC FORM
      ===================================================================== */}
      <section
        aria-label="Vendor KYC Onboarding Portal"
        className="py-16 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10"
      >
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            /* -----------------------------------------------------------------
               STATE A: PASSWORD VERIFICATION GATE SCREEN
            ----------------------------------------------------------------- */
            <motion.div
              key="password-gate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <div className="rounded-3xl bg-white border border-sand-300 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                {/* Left Navy Security Context Column (5 Cols) */}
                <div className="lg:col-span-5 bg-pingaksh-navy text-white p-8 sm:p-10 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-pingaksh-terracotta flex items-center justify-center shadow-lg">
                      <KeyRound className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <span className="font-tagline text-[10px] uppercase tracking-[0.22em] text-pingaksh-sand block">
                        Pingaksh Supply Chain
                      </span>
                      <h2 className="font-logo text-2xl sm:text-3xl text-white mt-1">
                        Gated Supplier Empanelment
                      </h2>
                    </div>

                    <ul className="space-y-4 pt-2 border-t border-white/15">
                      {securityGate.securityFeatures.map((feat, i) => (
                        <li key={i} className="space-y-0.5">
                          <span className="text-xs font-bold text-pingaksh-sand flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                            {feat.title}
                          </span>
                          <p className="text-xs text-sand-100/75 pl-6">
                            {feat.detail}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8 mt-8 border-t border-white/10 text-xs text-sand-200/80">
                    <p>{securityGate.requestCodeText}</p>
                    <a
                      href={`mailto:${securityGate.requestCodeEmail}`}
                      className="text-pingaksh-sand font-semibold hover:underline inline-flex items-center gap-1.5 mt-1"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {securityGate.requestCodeEmail}
                    </a>
                  </div>
                </div>

                {/* Right Password Input Form (7 Cols) */}
                <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-pingaksh-terracotta">
                      Step 0 · Authentication Required
                    </span>
                    <h3 className="font-logo text-3xl text-pingaksh-navy">
                      {securityGate.heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-navy-600 leading-relaxed">
                      {securityGate.description}
                    </p>
                  </div>

                  <form onSubmit={handleUnlockSubmit} className="space-y-5">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="vendorAccessCode"
                          className="text-xs font-bold uppercase tracking-wider text-pingaksh-navy"
                        >
                          Invitation Access Passcode *
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setPasswordInput(securityGate.demoAccessCode)
                          }
                          className="text-[11px] font-semibold text-pingaksh-terracotta hover:underline cursor-pointer"
                        >
                          Use Demo Code ({securityGate.demoAccessCode})
                        </button>
                      </div>

                      <div className="relative">
                        <input
                          id="vendorAccessCode"
                          type="password"
                          value={passwordInput}
                          onChange={(e) => {
                            setPasswordInput(e.target.value);
                            setAuthError("");
                          }}
                          placeholder={securityGate.accessCodePlaceholder}
                          required
                          className="w-full px-4 py-3.5 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy font-mono tracking-wider focus:outline-none focus:border-pingaksh-terracotta"
                        />
                        <Lock
                          className="w-4 h-4 text-navy-400 absolute right-4 top-1/2 -translate-y-1/2"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {authError && (
                      <div className="p-3.5 rounded-xl bg-terracotta-50 border border-terracotta-200 text-pingaksh-terracotta text-xs font-medium flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{authError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-full bg-pingaksh-terracotta hover:bg-terracotta-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                    >
                      <Unlock className="w-4 h-4" />
                      <span>{securityGate.unlockButtonLabel}</span>
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          ) : isSubmitted ? (
            /* -----------------------------------------------------------------
               STATE B: KYC SUBMISSION CONFIRMATION RECEIPT
            ----------------------------------------------------------------- */
            <motion.div
              key="kyc-success"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl mx-auto rounded-3xl bg-white border border-sand-300 shadow-2xl p-8 sm:p-14 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-pingaksh-terracotta">
                  KYC Dossier Logged
                </span>
                <h2 className="font-logo text-3xl sm:text-4xl text-pingaksh-navy">
                  Vendor Registration Submitted Successfully
                </h2>
                <p className="text-sm text-navy-600 max-w-xl mx-auto">
                  Thank you, <strong>{formData.companyName}</strong>. Your
                  statutory KYC details and uploaded certificates have been
                  transmitted to the Pingaksh Group Vendor Empanelment Cell.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-sand-50 border border-sand-300 max-w-lg mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-sand-200">
                  <span className="text-navy-500">Application Reference:</span>
                  <strong className="font-mono text-pingaksh-terracotta">
                    {submissionRefId}
                  </strong>
                </div>
                <div className="flex justify-between py-1 border-b border-sand-200">
                  <span className="text-navy-500">Legal Entity:</span>
                  <strong className="text-pingaksh-navy">
                    {formData.companyName}
                  </strong>
                </div>
                <div className="flex justify-between py-1 border-b border-sand-200">
                  <span className="text-navy-500">PAN / GSTIN:</span>
                  <strong className="text-pingaksh-navy">
                    {formData.panNumber.toUpperCase()} ·{" "}
                    {formData.gstinNumber.toUpperCase()}
                  </strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-navy-500">MSME Registered:</span>
                  <strong className="text-pingaksh-navy">
                    {formData.msmeRegistered}
                  </strong>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-pingaksh-navy text-pingaksh-sand text-xs sm:text-sm font-semibold"
                >
                  <span>Return to Contact &amp; Partners</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ) : (
            /* -----------------------------------------------------------------
               STATE C: UNLOCKED MULTI-STEP VENDOR KYC REGISTRATION FORM
            ----------------------------------------------------------------- */
            <motion.div
              key="kyc-form-wizard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
            >
              {/* Left Sidebar (Cols 1-4): Step Progress & Compliance Rules */}
              <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
                <div className="rounded-3xl bg-pingaksh-navy text-white p-7 sm:p-8 shadow-xl space-y-6">
                  <div className="border-b border-white/15 pb-4">
                    <span className="font-tagline text-[10px] uppercase tracking-[0.2em] text-pingaksh-sand block">
                      {formLabels.sectionTitle}
                    </span>
                    <h2 className="font-logo text-2xl text-white mt-1">
                      {formLabels.sectionSubtitle}
                    </h2>
                  </div>

                  {/* Step Indicator List */}
                  <ol className="space-y-4">
                    {steps.map((s) => {
                      const isActive = currentStep === s.stepNumber;
                      const isDone = currentStep > s.stepNumber;
                      return (
                        <li key={s.id}>
                          <button
                            type="button"
                            onClick={() => {
                              if (isDone) setCurrentStep(s.stepNumber);
                            }}
                            className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center gap-3.5 ${
                              isActive
                                ? "bg-pingaksh-sand text-pingaksh-navy border-pingaksh-sand font-semibold"
                                : isDone
                                  ? "bg-white/10 text-white border-emerald-400/40 cursor-pointer"
                                  : "bg-white/5 text-white/60 border-white/10 cursor-default"
                            }`}
                          >
                            <span
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                isActive
                                  ? "bg-pingaksh-terracotta text-white"
                                  : isDone
                                    ? "bg-emerald-500 text-white"
                                    : "bg-white/10 text-white/70"
                              }`}
                            >
                              {isDone ? "✓" : `0${s.stepNumber}`}
                            </span>
                            <div>
                              <span className="block text-sm font-bold leading-none">
                                {s.title}
                              </span>
                              <span
                                className={`block text-[11px] mt-1 ${
                                  isActive
                                    ? "text-navy-700"
                                    : "text-sand-200/70"
                                }`}
                              >
                                {s.subtitle}
                              </span>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ol>

                  {/* Compliance Checklist */}
                  <div className="pt-4 border-t border-white/15 space-y-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-pingaksh-sand block">
                      Statutory KYC Guidelines
                    </span>
                    {complianceGuidelines.map((guide, idx) => (
                      <p
                        key={idx}
                        className="text-xs text-sand-100/80 leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-pingaksh-terracotta font-bold">
                          •
                        </span>
                        <span>{guide}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Right Main Form Column (Cols 5-12) */}
              <div className="lg:col-span-8">
                <form
                  onSubmit={handleFinalSubmit}
                  noValidate
                  className="rounded-3xl bg-white border border-sand-300 shadow-xl p-6 sm:p-10 lg:p-12 space-y-8"
                >
                  {/* Step Validation Error Banner */}
                  {stepError && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-terracotta-50 border border-terracotta-200 text-pingaksh-terracotta text-xs sm:text-sm font-medium flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{stepError}</span>
                    </div>
                  )}

                  {/* =========================================================
                      STEP 1: COMPANY, PROPRIETOR/DIRECTOR & PHONE NUMBERS
                  ========================================================= */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      <div className="border-b border-sand-200 pb-4 flex items-center gap-3">
                        <Building2 className="w-6 h-6 text-pingaksh-terracotta" />
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-pingaksh-terracotta">
                            Step 01 of 03
                          </span>
                          <h3 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy">
                            Company &amp; Leadership Details
                          </h3>
                        </div>
                      </div>

                      {/* Company Name & Address */}
                      <div className="grid grid-cols-1 gap-5">
                        <div>
                          <label
                            htmlFor="companyName"
                            className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                          >
                            {formLabels.companyName}
                          </label>
                          <input
                            id="companyName"
                            name="companyName"
                            type="text"
                            required
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="Enter Legal Company / Firm Name"
                            className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="address"
                            className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                          >
                            {formLabels.address}
                          </label>
                          <textarea
                            id="address"
                            name="address"
                            rows={3}
                            required
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Enter Complete Registered / Corporate Street Address, City, State & PIN"
                            className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                          />
                        </div>
                      </div>

                      {/* Proprietor / Director / Partner's Name */}
                      <div className="pt-4 border-t border-sand-200 space-y-4">
                        <h4 className="text-sm font-bold text-pingaksh-navy flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-pingaksh-terracotta" />
                          <span>{formLabels.proprietorHeader}</span>
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="name1"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-1.5"
                            >
                              {formLabels.name1}
                            </label>
                            <input
                              id="name1"
                              name="name1"
                              type="text"
                              required
                              value={formData.name1}
                              onChange={handleInputChange}
                              placeholder="Primary Director / Partner Name"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="mobile1"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-1.5"
                            >
                              {formLabels.mobile1}
                            </label>
                            <input
                              id="mobile1"
                              name="mobile1"
                              type="tel"
                              required
                              value={formData.mobile1}
                              onChange={handleInputChange}
                              placeholder="+91 98765 43210"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="name2"
                              className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5"
                            >
                              {formLabels.name2}
                            </label>
                            <input
                              id="name2"
                              name="name2"
                              type="text"
                              value={formData.name2}
                              onChange={handleInputChange}
                              placeholder="Secondary Director / Partner (Optional)"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="mobile2"
                              className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5"
                            >
                              {formLabels.mobile2}
                            </label>
                            <input
                              id="mobile2"
                              name="mobile2"
                              type="tel"
                              value={formData.mobile2}
                              onChange={handleInputChange}
                              placeholder="Secondary Mobile (Optional)"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Phone Numbers & Email & Reference */}
                      <div className="pt-4 border-t border-sand-200 space-y-4">
                        <h4 className="text-sm font-bold text-pingaksh-navy flex items-center gap-2">
                          <Phone className="w-4 h-4 text-pingaksh-terracotta" />
                          <span>{formLabels.phoneHeader} &amp; Contact</span>
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label
                              htmlFor="office1"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-1.5"
                            >
                              {formLabels.office1}
                            </label>
                            <input
                              id="office1"
                              name="office1"
                              type="tel"
                              required
                              value={formData.office1}
                              onChange={handleInputChange}
                              placeholder="Primary Office Phone"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="office2"
                              className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5"
                            >
                              {formLabels.office2}
                            </label>
                            <input
                              id="office2"
                              name="office2"
                              type="tel"
                              value={formData.office2}
                              onChange={handleInputChange}
                              placeholder="Secondary Office Phone"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="residence"
                              className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5"
                            >
                              {formLabels.residence}
                            </label>
                            <input
                              id="residence"
                              name="residence"
                              type="tel"
                              value={formData.residence}
                              onChange={handleInputChange}
                              placeholder="Residence Phone"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-1.5"
                            >
                              {formLabels.email}
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="official@vendorcompany.com"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="reference"
                              className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5"
                            >
                              {formLabels.reference}
                            </label>
                            <input
                              id="reference"
                              name="reference"
                              type="text"
                              value={formData.reference}
                              onChange={handleInputChange}
                              placeholder="Pingaksh Contact / Tender Ref (Optional)"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* =========================================================
                      STEP 2: BANK DETAILS & STATUTORY TAX IDENTIFIERS
                  ========================================================= */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      <div className="border-b border-sand-200 pb-4 flex items-center gap-3">
                        <Landmark className="w-6 h-6 text-pingaksh-terracotta" />
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-pingaksh-terracotta">
                            Step 02 of 03
                          </span>
                          <h3 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy">
                            {formLabels.bankHeader} &amp; Tax KYC
                          </h3>
                        </div>
                      </div>

                      {/* Bank Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="bankName"
                            className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                          >
                            {formLabels.bankName}
                          </label>
                          <input
                            id="bankName"
                            name="bankName"
                            type="text"
                            required
                            value={formData.bankName}
                            onChange={handleInputChange}
                            placeholder="e.g., State Bank of India / HDFC Bank"
                            className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="branch"
                            className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                          >
                            {formLabels.branch}
                          </label>
                          <input
                            id="branch"
                            name="branch"
                            type="text"
                            required
                            value={formData.branch}
                            onChange={handleInputChange}
                            placeholder="Branch Name & City"
                            className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="accountNumber"
                            className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                          >
                            {formLabels.accountNumber}
                          </label>
                          <input
                            id="accountNumber"
                            name="accountNumber"
                            type="text"
                            required
                            value={formData.accountNumber}
                            onChange={handleInputChange}
                            placeholder="Enter Corporate Bank Account No."
                            className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm font-mono text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="ifscCode"
                            className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                          >
                            {formLabels.ifscCode}
                          </label>
                          <input
                            id="ifscCode"
                            name="ifscCode"
                            type="text"
                            required
                            value={formData.ifscCode}
                            onChange={handleInputChange}
                            placeholder="11-Character IFSC (e.g., SBIN0001234)"
                            className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm font-mono uppercase text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                          />
                        </div>
                      </div>

                      {/* Tax & MSME Identifiers */}
                      <div className="pt-6 border-t border-sand-200 space-y-5">
                        <h4 className="text-sm font-bold text-pingaksh-navy">
                          {formLabels.taxHeader}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label
                              htmlFor="panNumber"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                            >
                              {formLabels.panNumber}
                            </label>
                            <input
                              id="panNumber"
                              name="panNumber"
                              type="text"
                              required
                              maxLength={10}
                              value={formData.panNumber}
                              onChange={handleInputChange}
                              placeholder="10-Digit PAN (e.g., AAACP1234A)"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm font-mono uppercase text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="gstinNumber"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                            >
                              {formLabels.gstinNumber}
                            </label>
                            <input
                              id="gstinNumber"
                              name="gstinNumber"
                              type="text"
                              required
                              maxLength={15}
                              value={formData.gstinNumber}
                              onChange={handleInputChange}
                              placeholder="15-Digit GSTIN Number"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm font-mono uppercase text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="tinNumber"
                              className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-2"
                            >
                              {formLabels.tinNumber}
                            </label>
                            <input
                              id="tinNumber"
                              name="tinNumber"
                              type="text"
                              value={formData.tinNumber}
                              onChange={handleInputChange}
                              placeholder="TIN Number (Optional)"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm font-mono text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="msmeRegistered"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                            >
                              {formLabels.msmeRegistered}
                            </label>
                            <select
                              id="msmeRegistered"
                              name="msmeRegistered"
                              required
                              value={formData.msmeRegistered}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            >
                              {formLabels.msmeOptions.map((opt) => (
                                <option key={opt.label} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* =========================================================
                      STEP 3: DOCUMENTS REQUIRED (6 UPLOAD CARDS) & TERMS
                  ========================================================= */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      <div className="border-b border-sand-200 pb-4 flex items-center gap-3">
                        <FileText className="w-6 h-6 text-pingaksh-terracotta" />
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-pingaksh-terracotta">
                            Step 03 of 03
                          </span>
                          <h3 className="font-logo text-2xl sm:text-3xl text-pingaksh-navy">
                            {formLabels.documentsHeader}
                          </h3>
                        </div>
                      </div>

                      {/* 2-Column Grid of 6 Document Upload Dropzones */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {requiredDocuments.map((doc) => {
                          const selectedFile = uploadedFiles[doc.id];
                          return (
                            <div
                              key={doc.id}
                              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                                selectedFile
                                  ? "bg-emerald-50/40 border-emerald-500/50"
                                  : "bg-sand-50/80 border-sand-300 hover:border-pingaksh-terracotta"
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-bold uppercase tracking-wider text-pingaksh-navy">
                                    {doc.label}{" "}
                                    {doc.required && (
                                      <span className="text-pingaksh-terracotta">
                                        *
                                      </span>
                                    )}
                                  </span>
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sand-200 text-navy-700">
                                    {doc.required ? "Mandatory" : "Optional"}
                                  </span>
                                </div>
                                <p className="text-[11px] text-navy-500 mt-1">
                                  {doc.helperText}
                                </p>
                              </div>

                              <div className="mt-4">
                                {selectedFile ? (
                                  <div className="p-3 rounded-xl bg-white border border-emerald-500/30 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                      <div className="truncate">
                                        <span className="block text-xs font-semibold text-pingaksh-navy truncate">
                                          {selectedFile.name}
                                        </span>
                                        <span className="block text-[10px] text-navy-400">
                                          {(selectedFile.size / 1024).toFixed(
                                            1,
                                          )}{" "}
                                          KB
                                        </span>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeFile(doc.id)}
                                      aria-label={`Remove ${doc.label}`}
                                      className="p-1.5 text-navy-400 hover:text-pingaksh-terracotta cursor-pointer"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <label
                                    htmlFor={`file-${doc.id}`}
                                    className="w-full py-3.5 px-4 rounded-xl border border-dashed border-sand-400 bg-white hover:bg-sand-100/60 flex items-center justify-center gap-2.5 text-xs font-semibold text-pingaksh-navy cursor-pointer transition-colors"
                                  >
                                    <Upload className="w-4 h-4 text-pingaksh-terracotta" />
                                    <span>Click to upload</span>
                                    <input
                                      id={`file-${doc.id}`}
                                      type="file"
                                      accept={doc.acceptedFormats}
                                      onChange={(e) =>
                                        handleFileChange(doc.id, e.target.files)
                                      }
                                      className="sr-only"
                                    />
                                  </label>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Mandatory Terms & Conditions Checkbox */}
                      <div className="pt-4 border-t border-sand-200">
                        <label
                          htmlFor="agreeTerms"
                          className="flex items-start gap-3 p-4 rounded-2xl bg-sand-50 border border-sand-300 cursor-pointer"
                        >
                          <input
                            id="agreeTerms"
                            name="agreeTerms"
                            type="checkbox"
                            checked={formData.agreeTerms}
                            onChange={handleInputChange}
                            className="mt-0.5 w-4 h-4 accent-pingaksh-terracotta rounded cursor-pointer"
                          />
                          <span className="text-xs sm:text-sm font-semibold text-pingaksh-navy">
                            {formLabels.termsText}
                          </span>
                        </label>
                      </div>
                    </motion.div>
                  )}

                  {/* =========================================================
                      BOTTOM STEP NAVIGATION BUTTONS
                  ========================================================= */}
                  <div className="pt-6 border-t border-sand-200 flex items-center justify-between gap-4">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-sand-300 hover:bg-sand-100 text-pingaksh-navy text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Previous Step</span>
                      </button>
                    ) : (
                      <span className="text-xs text-navy-500">
                        * Indicates mandatory KYC field
                      </span>
                    )}

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-pingaksh-navy hover:bg-navy-800 text-pingaksh-sand text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer"
                      >
                        <span>Continue to Step 0{currentStep + 1}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-pingaksh-terracotta hover:bg-terracotta-600 text-white text-sm font-semibold transition-all shadow-lg cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>{formLabels.submitButton}</span>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </article>
  );
}

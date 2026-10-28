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
  CopyCheck,
  Factory,
} from "lucide-react";
import type { VendorPortalPageData } from "@/data/vendorPortalData";

interface VendorPortalViewProps {
  data: VendorPortalPageData;
}

interface VendorKycFormState {
  // Step 1: Party, Principal Place of Supply, GST Contact & Directors (1-4)
  nameOfParty: string;
  contactPerson: string;
  contactMobile: string;

  principalAddress: string;
  principalCity: string;
  principalPinCode: string;
  principalState: string;
  principalTelNo: string;
  principalFaxNo: string;
  principalEmailId: string;

  gstContactName: string;
  gstContactDesignation: string;
  gstContactAddress: string;
  gstContactCity: string;
  gstContactPinCode: string;
  gstContactState: string;
  gstContactTelNo: string;
  gstContactMobileNo: string;
  gstContactEmailId: string;

  director1: string;
  director2: string;
  director3: string;
  director4: string;

  // Step 2: GST Status, HSN/SAC, PAN/MSMED/IEC, Bank & Mfg Status
  gstStatus: "Registered" | "Not Registered" | "Compounding Scheme" | "";
  gstRegNumber: string;
  materialServicesDealing: string;
  hsnSacCode: string;
  panNumber: string;
  ssiMsmedNumber: string;
  iecNumber: string;

  bankName: string;
  accountType: string;
  accountNumber: string;
  ifscCode: string;

  mfgUnitStatus: string;
  msmedSection2n: string;

  // Step 3: Declaration
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
  // 2. MULTI-STEP KYC FORM STATE (Aligned with VENDOR_PORTAL_DATA)
  // =================================================================
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stepError, setStepError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submissionRefId, setSubmissionRefId] = useState<string>("");

  const [formData, setFormData] = useState<VendorKycFormState>({
    nameOfParty: "",
    contactPerson: "",
    contactMobile: "",

    principalAddress: "",
    principalCity: "",
    principalPinCode: "",
    principalState: "",
    principalTelNo: "",
    principalFaxNo: "",
    principalEmailId: "",

    gstContactName: "",
    gstContactDesignation: "",
    gstContactAddress: "",
    gstContactCity: "",
    gstContactPinCode: "",
    gstContactState: "",
    gstContactTelNo: "",
    gstContactMobileNo: "",
    gstContactEmailId: "",

    director1: "",
    director2: "",
    director3: "",
    director4: "",

    gstStatus: "Registered",
    gstRegNumber: "",
    materialServicesDealing: "",
    hsnSacCode: "",
    panNumber: "",
    ssiMsmedNumber: "",
    iecNumber: "",

    bankName: "",
    accountType: "",
    accountNumber: "",
    ifscCode: "",

    mfgUnitStatus: "",
    msmedSection2n: "",

    agreeTerms: false,
  });

  // Track uploaded files dynamically from requiredDocuments IDs
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<string, File | null>
  >(() =>
    requiredDocuments.reduce(
      (acc, doc) => {
        acc[doc.id] = null;
        return acc;
      },
      {} as Record<string, File | null>,
    ),
  );

  // Helper: Check if a document is dynamically required based on Step 2 answers
  const isDocumentRequired = (
    docId: string,
    baseRequired: boolean,
  ): boolean => {
    if (baseRequired) return true;
    if (
      docId === "gstinCertificate" &&
      (formData.gstStatus === "Registered" ||
        formData.gstStatus === "Compounding Scheme")
    ) {
      return true;
    }
    if (docId === "ssiMsmedEmCopy" && formData.msmedSection2n === "Yes") {
      return true;
    }
    return false;
  };

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
        `Invalid Partner Access Code. Please verify with the Procurement Desk or use ${securityGate.demoAccessCode}.`,
      );
    }
  };

  // Handle Text / Select / Checkbox Input Changes
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

  // 1-Click Autofill GST Contact from Principal Place of Supply
  const copyPrincipalToGstContact = () => {
    setStepError("");
    setFormData((prev) => ({
      ...prev,
      gstContactName: prev.gstContactName || prev.contactPerson,
      gstContactAddress: prev.principalAddress,
      gstContactCity: prev.principalCity,
      gstContactPinCode: prev.principalPinCode,
      gstContactState: prev.principalState,
      gstContactTelNo: prev.principalTelNo,
      gstContactMobileNo: prev.gstContactMobileNo || prev.contactMobile,
      gstContactEmailId: prev.gstContactEmailId || prev.principalEmailId,
    }));
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
        !formData.nameOfParty.trim() ||
        !formData.contactPerson.trim() ||
        !formData.contactMobile.trim() ||
        !formData.principalAddress.trim() ||
        !formData.principalCity.trim() ||
        !formData.principalPinCode.trim() ||
        !formData.principalState.trim() ||
        !formData.principalEmailId.trim() ||
        !formData.gstContactName.trim() ||
        !formData.gstContactMobileNo.trim() ||
        !formData.gstContactEmailId.trim() ||
        !formData.director1.trim()
      ) {
        setStepError(
          "Please fill in all mandatory (*) fields across Party Details, Principal Place of Supply, GST Contact Person, and at least 1 Director / Partner / Proprietor.",
        );
        return false;
      }
    } else if (step === 2) {
      if (
        !formData.gstStatus ||
        !formData.materialServicesDealing.trim() ||
        !formData.hsnSacCode.trim() ||
        !formData.panNumber.trim() ||
        !formData.bankName.trim() ||
        !formData.accountType ||
        !formData.accountNumber.trim() ||
        !formData.ifscCode.trim() ||
        !formData.mfgUnitStatus ||
        !formData.msmedSection2n
      ) {
        setStepError(
          "Please complete all mandatory (*) GST Status, Material/Services, HSN/SAC Code, PAN, Bank Details, Mfg. Unit Status, and Section 2(n) MSMED fields.",
        );
        return false;
      }

      if (
        (formData.gstStatus === "Registered" ||
          formData.gstStatus === "Compounding Scheme") &&
        !formData.gstRegNumber.trim()
      ) {
        setStepError(
          "Please enter your 15-digit GST Registration Number (mandatory when GST Status is Registered or Compounding Scheme).",
        );
        return false;
      }

      if (
        formData.msmedSection2n === "Yes" &&
        !formData.ssiMsmedNumber.trim()
      ) {
        setStepError(
          'Please enter your SSI / MSMED Registration No. since you selected "Yes" under Section 2(n) of the MSMED Act.',
        );
        return false;
      }
    } else if (step === 3) {
      const missingDocs = requiredDocuments.filter(
        (doc) =>
          isDocumentRequired(doc.id, doc.required) && !uploadedFiles[doc.id],
      );
      if (missingDocs.length > 0) {
        setStepError(
          `Please upload all mandatory (*) enclosures: ${missingDocs
            .map((d) => d.label)
            .join(", ")}.`,
        );
        return false;
      }
      if (!formData.agreeTerms) {
        setStepError(
          "You must tick the declaration and agree to the Vendor Terms of Pingaksh Group before submitting.",
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
          1. ARCHITECTURAL HERO HEADER
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
                  Thank you, <strong>{formData.nameOfParty}</strong>. Your
                  statutory Vendor Registration Form and enclosures have been
                  transmitted to the Pingaksh Group Procurement &amp; Accounts
                  Payable Desk.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-sand-50 border border-sand-300 max-w-lg mx-auto text-left space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-sand-200">
                  <span className="text-navy-500">Application Reference:</span>
                  <strong className="font-mono text-pingaksh-terracotta">
                    {submissionRefId}
                  </strong>
                </div>
                <div className="flex justify-between py-1 border-b border-sand-200">
                  <span className="text-navy-500">Name of Party:</span>
                  <strong className="text-pingaksh-navy">
                    {formData.nameOfParty}
                  </strong>
                </div>
                <div className="flex justify-between py-1 border-b border-sand-200">
                  <span className="text-navy-500">Principal City / State:</span>
                  <strong className="text-pingaksh-navy">
                    {formData.principalCity}, {formData.principalState} (
                    {formData.principalPinCode})
                  </strong>
                </div>
                <div className="flex justify-between py-1 border-b border-sand-200">
                  <span className="text-navy-500">GST Status &amp; PAN:</span>
                  <strong className="font-mono text-pingaksh-navy">
                    {formData.gstStatus} · {formData.panNumber.toUpperCase()}
                  </strong>
                </div>
                <div className="flex justify-between py-1 border-b border-sand-200">
                  <span className="text-navy-500">HSN / SAC Code:</span>
                  <strong className="font-mono text-pingaksh-navy">
                    {formData.hsnSacCode}
                  </strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-navy-500">
                    Mfg. Unit / Section 2(n) MSMED:
                  </span>
                  <strong className="text-pingaksh-navy">
                    {formData.mfgUnitStatus} · MSMED: {formData.msmedSection2n}
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
                      STEP 1: PARTY, PRINCIPAL PLACE OF SUPPLY, GST CONTACT & DIRECTORS
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
                            {steps[0].title}
                          </h3>
                        </div>
                      </div>

                      {/* 1. Primary Party & Contact Person */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="nameOfParty"
                            className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                          >
                            {formLabels.nameOfParty}
                          </label>
                          <input
                            id="nameOfParty"
                            name="nameOfParty"
                            type="text"
                            required
                            value={formData.nameOfParty}
                            onChange={handleInputChange}
                            placeholder="Enter Legal Name of Company / Firm / Party"
                            className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="contactPerson"
                            className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                          >
                            {formLabels.contactPerson}
                          </label>
                          <input
                            id="contactPerson"
                            name="contactPerson"
                            type="text"
                            required
                            value={formData.contactPerson}
                            onChange={handleInputChange}
                            placeholder="Full Name of Primary Contact Person"
                            className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="contactMobile"
                            className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                          >
                            {formLabels.contactMobile}
                          </label>
                          <input
                            id="contactMobile"
                            name="contactMobile"
                            type="tel"
                            required
                            value={formData.contactMobile}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                          />
                        </div>
                      </div>

                      {/* 2. Address of Principal Place of Supply */}
                      <div className="pt-6 border-t border-sand-200 space-y-4">
                        <h4 className="text-sm font-bold text-pingaksh-navy flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-pingaksh-terracotta" />
                          <span>{formLabels.principalAddressHeader}</span>
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="principalAddress"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-1.5"
                            >
                              {formLabels.principalAddress}
                            </label>
                            <textarea
                              id="principalAddress"
                              name="principalAddress"
                              rows={2}
                              required
                              value={formData.principalAddress}
                              onChange={handleInputChange}
                              placeholder="Building, Plot No., Industrial Area / Street"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="principalCity"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-1.5"
                            >
                              {formLabels.principalCity}
                            </label>
                            <input
                              id="principalCity"
                              name="principalCity"
                              type="text"
                              required
                              value={formData.principalCity}
                              onChange={handleInputChange}
                              placeholder="City / Town"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="principalPinCode"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-1.5"
                            >
                              {formLabels.principalPinCode}
                            </label>
                            <input
                              id="principalPinCode"
                              name="principalPinCode"
                              type="text"
                              required
                              maxLength={6}
                              value={formData.principalPinCode}
                              onChange={handleInputChange}
                              placeholder="6-Digit PIN Code"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm font-mono text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="principalState"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-1.5"
                            >
                              {formLabels.principalState}
                            </label>
                            <input
                              id="principalState"
                              name="principalState"
                              type="text"
                              required
                              value={formData.principalState}
                              onChange={handleInputChange}
                              placeholder="State / UT"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="principalTelNo"
                              className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5"
                            >
                              {formLabels.principalTelNo}
                            </label>
                            <input
                              id="principalTelNo"
                              name="principalTelNo"
                              type="tel"
                              value={formData.principalTelNo}
                              onChange={handleInputChange}
                              placeholder="STD + Landline No."
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="principalFaxNo"
                              className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5"
                            >
                              {formLabels.principalFaxNo}
                            </label>
                            <input
                              id="principalFaxNo"
                              name="principalFaxNo"
                              type="text"
                              value={formData.principalFaxNo}
                              onChange={handleInputChange}
                              placeholder="Fax No. (Optional)"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="principalEmailId"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-1.5"
                            >
                              {formLabels.principalEmailId}
                            </label>
                            <input
                              id="principalEmailId"
                              name="principalEmailId"
                              type="email"
                              required
                              value={formData.principalEmailId}
                              onChange={handleInputChange}
                              placeholder="corporate@vendor.com"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 3. Contact Person (for GST related Issues) */}
                      <div className="pt-6 border-t border-sand-200 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-pingaksh-navy flex items-center gap-2">
                            <Phone className="w-4 h-4 text-pingaksh-terracotta" />
                            <span>{formLabels.gstContactHeader}</span>
                          </h4>

                          <button
                            type="button"
                            onClick={copyPrincipalToGstContact}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sand-100 hover:bg-pingaksh-navy text-pingaksh-navy hover:text-pingaksh-sand text-[11px] font-bold transition-colors cursor-pointer"
                          >
                            <CopyCheck className="w-3.5 h-3.5" />
                            <span>Copy from Principal Place of Supply</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="gstContactName"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-1.5"
                            >
                              {formLabels.gstContactName}
                            </label>
                            <input
                              id="gstContactName"
                              name="gstContactName"
                              type="text"
                              required
                              value={formData.gstContactName}
                              onChange={handleInputChange}
                              placeholder="GST Nodal Officer / Accounts Contact Name"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="gstContactDesignation"
                              className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5"
                            >
                              {formLabels.gstContactDesignation}
                            </label>
                            <input
                              id="gstContactDesignation"
                              name="gstContactDesignation"
                              type="text"
                              value={formData.gstContactDesignation}
                              onChange={handleInputChange}
                              placeholder="e.g., Accounts Manager"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="gstContactAddress"
                              className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5"
                            >
                              {formLabels.gstContactAddress}
                            </label>
                            <input
                              id="gstContactAddress"
                              name="gstContactAddress"
                              type="text"
                              value={formData.gstContactAddress}
                              onChange={handleInputChange}
                              placeholder="Billing / GST Correspondence Street Address"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="gstContactCity"
                              className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5"
                            >
                              {formLabels.gstContactCity}
                            </label>
                            <input
                              id="gstContactCity"
                              name="gstContactCity"
                              type="text"
                              value={formData.gstContactCity}
                              onChange={handleInputChange}
                              placeholder="City"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="gstContactPinCode"
                              className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5"
                            >
                              {formLabels.gstContactPinCode}
                            </label>
                            <input
                              id="gstContactPinCode"
                              name="gstContactPinCode"
                              type="text"
                              maxLength={6}
                              value={formData.gstContactPinCode}
                              onChange={handleInputChange}
                              placeholder="PIN Code"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm font-mono text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="gstContactState"
                              className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5"
                            >
                              {formLabels.gstContactState}
                            </label>
                            <input
                              id="gstContactState"
                              name="gstContactState"
                              type="text"
                              value={formData.gstContactState}
                              onChange={handleInputChange}
                              placeholder="State"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="gstContactTelNo"
                              className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5"
                            >
                              {formLabels.gstContactTelNo}
                            </label>
                            <input
                              id="gstContactTelNo"
                              name="gstContactTelNo"
                              type="tel"
                              value={formData.gstContactTelNo}
                              onChange={handleInputChange}
                              placeholder="Tel No."
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="gstContactMobileNo"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-1.5"
                            >
                              {formLabels.gstContactMobileNo}
                            </label>
                            <input
                              id="gstContactMobileNo"
                              name="gstContactMobileNo"
                              type="tel"
                              required
                              value={formData.gstContactMobileNo}
                              onChange={handleInputChange}
                              placeholder="Mobile No. *"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="gstContactEmailId"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-1.5"
                            >
                              {formLabels.gstContactEmailId}
                            </label>
                            <input
                              id="gstContactEmailId"
                              name="gstContactEmailId"
                              type="email"
                              required
                              value={formData.gstContactEmailId}
                              onChange={handleInputChange}
                              placeholder="gst@vendor.com"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 4. Names of all Directors / Partners / Proprietors (1-4) */}
                      <div className="pt-6 border-t border-sand-200 space-y-4">
                        <h4 className="text-sm font-bold text-pingaksh-navy flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-pingaksh-terracotta" />
                          <span>{formLabels.directorsHeader}</span>
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="director1"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-1.5"
                            >
                              {formLabels.director1}
                            </label>
                            <input
                              id="director1"
                              name="director1"
                              type="text"
                              required
                              value={formData.director1}
                              onChange={handleInputChange}
                              placeholder="Full Name of Director / Partner 1"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="director2"
                              className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5"
                            >
                              {formLabels.director2}
                            </label>
                            <input
                              id="director2"
                              name="director2"
                              type="text"
                              value={formData.director2}
                              onChange={handleInputChange}
                              placeholder="Full Name of Director / Partner 2 (Optional)"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="director3"
                              className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5"
                            >
                              {formLabels.director3}
                            </label>
                            <input
                              id="director3"
                              name="director3"
                              type="text"
                              value={formData.director3}
                              onChange={handleInputChange}
                              placeholder="Full Name of Director / Partner 3 (Optional)"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="director4"
                              className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5"
                            >
                              {formLabels.director4}
                            </label>
                            <input
                              id="director4"
                              name="director4"
                              type="text"
                              value={formData.director4}
                              onChange={handleInputChange}
                              placeholder="Full Name of Director / Partner 4 (Optional)"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* =========================================================
                      STEP 2: GST STATUS, HSN/SAC, PAN/MSMED/IEC, BANK & MFG STATUS
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
                            {steps[1].title}
                          </h3>
                        </div>
                      </div>

                      {/* 1. GST Registration Category & Tax Identifiers */}
                      <div className="space-y-5">
                        <div>
                          <span className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2.5">
                            {formLabels.gstStatusHeader}
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {formLabels.gstStatusOptions.map((opt) => {
                              const isSelected =
                                formData.gstStatus === opt.value;
                              return (
                                <label
                                  key={opt.value}
                                  className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-2.5 cursor-pointer transition-all ${
                                    isSelected
                                      ? "bg-pingaksh-navy text-pingaksh-sand border-pingaksh-navy shadow-sm"
                                      : "bg-sand-50 text-pingaksh-navy border-sand-300 hover:border-pingaksh-terracotta"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="gstStatus"
                                    value={opt.value}
                                    checked={isSelected}
                                    onChange={handleInputChange}
                                    className="accent-pingaksh-terracotta"
                                  />
                                  <span>{opt.label}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label
                              htmlFor="gstRegNumber"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                            >
                              {formLabels.gstRegNumber}{" "}
                              {formData.gstStatus !== "Not Registered" && (
                                <span className="text-pingaksh-terracotta">
                                  *
                                </span>
                              )}
                            </label>
                            <input
                              id="gstRegNumber"
                              name="gstRegNumber"
                              type="text"
                              maxLength={15}
                              disabled={formData.gstStatus === "Not Registered"}
                              value={formData.gstRegNumber}
                              onChange={handleInputChange}
                              placeholder={
                                formData.gstStatus === "Not Registered"
                                  ? "Not Applicable (Not Registered)"
                                  : "15-Digit GSTIN (e.g., 05AAACP1234A1Z5)"
                              }
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm font-mono uppercase text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta disabled:opacity-50"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="hsnSacCode"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                            >
                              {formLabels.hsnSacCode}
                            </label>
                            <input
                              id="hsnSacCode"
                              name="hsnSacCode"
                              type="text"
                              required
                              value={formData.hsnSacCode}
                              onChange={handleInputChange}
                              placeholder="4 / 6 / 8-Digit HSN or SAC Code"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm font-mono text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="materialServicesDealing"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                            >
                              {formLabels.materialServicesDealing}
                            </label>
                            <input
                              id="materialServicesDealing"
                              name="materialServicesDealing"
                              type="text"
                              required
                              value={formData.materialServicesDealing}
                              onChange={handleInputChange}
                              placeholder="Describe primary goods, raw materials, civil works, or OEM services supplied"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

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
                              placeholder="10-Character PAN (e.g., AAACP1234A)"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm font-mono uppercase text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="ssiMsmedNumber"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                            >
                              {formLabels.ssiMsmedNumber}
                            </label>
                            <input
                              id="ssiMsmedNumber"
                              name="ssiMsmedNumber"
                              type="text"
                              value={formData.ssiMsmedNumber}
                              onChange={handleInputChange}
                              placeholder="Udyam / SSI / MSMED Reg. No."
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm font-mono uppercase text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="iecNumber"
                              className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-2"
                            >
                              {formLabels.iecNumber}
                            </label>
                            <input
                              id="iecNumber"
                              name="iecNumber"
                              type="text"
                              value={formData.iecNumber}
                              onChange={handleInputChange}
                              placeholder="10-Digit Import Export Code (Optional)"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm font-mono uppercase text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 2. Bank Details */}
                      <div className="pt-6 border-t border-sand-200 space-y-4">
                        <h4 className="text-sm font-bold text-pingaksh-navy flex items-center gap-2">
                          <Landmark className="w-4 h-4 text-pingaksh-terracotta" />
                          <span>{formLabels.bankHeader}</span>
                        </h4>

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
                              htmlFor="accountType"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                            >
                              {formLabels.accountType}
                            </label>
                            <select
                              id="accountType"
                              name="accountType"
                              required
                              value={formData.accountType}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            >
                              {formLabels.accountTypeOptions.map((opt) => (
                                <option key={opt.label} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
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
                              placeholder="Enter Corporate Bank A/c Number"
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
                              maxLength={11}
                              value={formData.ifscCode}
                              onChange={handleInputChange}
                              placeholder="11-Character IFSC (e.g., SBIN0001234)"
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm font-mono uppercase text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 3. Status Of Your Mfg. Unit & MSMED Section 2(n) */}
                      <div className="pt-6 border-t border-sand-200 space-y-5">
                        <h4 className="text-sm font-bold text-pingaksh-navy flex items-center gap-2">
                          <Factory className="w-4 h-4 text-pingaksh-terracotta" />
                          <span>{formLabels.mfgStatusHeader}</span>
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label
                              htmlFor="mfgUnitStatus"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                            >
                              {formLabels.mfgUnitStatus}
                            </label>
                            <select
                              id="mfgUnitStatus"
                              name="mfgUnitStatus"
                              required
                              value={formData.mfgUnitStatus}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-300 text-sm text-pingaksh-navy focus:outline-none focus:border-pingaksh-terracotta"
                            >
                              {formLabels.mfgStatusOptions.map((opt) => (
                                <option key={opt.label} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label
                              htmlFor="msmedSection2n"
                              className="block text-xs font-bold uppercase tracking-wider text-pingaksh-navy mb-2"
                            >
                              {formLabels.msmedSection2nQuestion}
                            </label>
                            <select
                              id="msmedSection2n"
                              name="msmedSection2n"
                              required
                              value={formData.msmedSection2n}
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

                        <div className="p-4 rounded-xl bg-sand-100 border border-sand-300 text-xs text-navy-700 leading-relaxed">
                          {formLabels.msmedSection2nNote}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* =========================================================
                      STEP 3: MANDATORY STATUTORY ENCLOSURES & DECLARATION
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

                      {/* 2-Column Grid of Statutory Document Upload Dropzones */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {requiredDocuments.map((doc) => {
                          const selectedFile = uploadedFiles[doc.id];
                          const isReq = isDocumentRequired(
                            doc.id,
                            doc.required,
                          );

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
                                <div className="flex items-start justify-between gap-2">
                                  <span className="text-xs font-bold uppercase tracking-wider text-pingaksh-navy">
                                    {doc.label}{" "}
                                    {isReq && (
                                      <span className="text-pingaksh-terracotta">
                                        *
                                      </span>
                                    )}
                                  </span>
                                  <span
                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded shrink-0 ${
                                      isReq
                                        ? "bg-pingaksh-terracotta/15 text-pingaksh-terracotta"
                                        : "bg-sand-200 text-navy-700"
                                    }`}
                                  >
                                    {isReq ? "Mandatory" : "Optional"}
                                  </span>
                                </div>

                                {doc.conditionalNote && (
                                  <p className="text-[10px] font-semibold text-pingaksh-terracotta mt-1">
                                    ({doc.conditionalNote})
                                  </p>
                                )}

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
                        * Indicates mandatory statutory field
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

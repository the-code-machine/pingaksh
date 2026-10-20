export interface KycDocumentUploadSpec {
  id: string;
  label: string;
  required: boolean;
  helperText: string;
  acceptedFormats: string;
}

export interface OnboardingStepMeta {
  stepNumber: number;
  id: string;
  title: string;
  subtitle: string;
}

export interface VendorPortalPageData {
  seo: {
    title: string;
    description: string;
  };
  breadcrumbs: { label: string; href: string }[];
  hero: {
    title: string;
    subtitle: string;
    leadText: string;
    backgroundImage: string;
    backgroundAlt: string;
  };
  securityGate: {
    badge: string;
    heading: string;
    description: string;
    accessCodePlaceholder: string;
    demoAccessCode: string; // Easily replaceable or connect to API
    unlockButtonLabel: string;
    requestCodeText: string;
    requestCodeEmail: string;
    securityFeatures: { title: string; detail: string }[];
  };
  steps: OnboardingStepMeta[];
  formLabels: {
    sectionTitle: string;
    sectionSubtitle: string;
    // Step 1: Company & Promoter/Director Details
    companyName: string;
    address: string;
    proprietorHeader: string;
    name1: string;
    mobile1: string;
    name2: string;
    mobile2: string;
    phoneHeader: string;
    office1: string;
    office2: string;
    residence: string;
    email: string;
    reference: string;
    // Step 2: Bank & Statutory Tax Details
    bankHeader: string;
    bankName: string;
    branch: string;
    accountNumber: string;
    ifscCode: string;
    taxHeader: string;
    tinNumber: string;
    panNumber: string;
    gstinNumber: string;
    msmeRegistered: string;
    msmeOptions: { value: string; label: string }[];
    // Step 3: Documents & Declaration
    documentsHeader: string;
    termsText: string;
    submitButton: string;
  };
  requiredDocuments: KycDocumentUploadSpec[];
  complianceGuidelines: string[];
}

export const VENDOR_PORTAL_DATA: VendorPortalPageData = {
  seo: {
    title: "Vendor Registration & KYC Portal | Pingaksh Renewables",
    description:
      "Official password-protected Vendor KYC Registration Portal for Pingaksh Group (UBHP & PBPL). Submit company credentials, banking details, GSTIN, PAN, and MSME certificates.",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Contact & Partners", href: "/contact" },
    { label: "Vendor Registration Portal", href: "/contact/vendor-portal" },
  ],
  hero: {
    title: "Vendor KYC & Onboarding Portal",
    subtitle: "Institutional Supply Chain & Partner Empanelment Gateway",
    leadText:
      "Authorized EPC contractors, grain aggregators, electro-mechanical OEMs, and logistics suppliers can complete statutory KYC registration for Uttar Bharat Hydro Power (UBHP) and Pingaksh Beverages (PBPL).",
    backgroundImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=85",
    backgroundAlt:
      "Pingaksh Group Supply Chain and Vendor KYC Empanelment Portal",
  },
  securityGate: {
    badge: "Encrypted Partner Gateway",
    heading: "Authorized Vendor Verification",
    description:
      "Access to the Pingaksh Group Vendor KYC Registration Portal is restricted to invited suppliers and pre-qualified contractors. Please enter the invitation passcode issued by our Procurement Desk.",
    accessCodePlaceholder: "Enter Partner Access Code (e.g., PINGAKSH2026)",
    demoAccessCode: "PINGAKSH2026",
    unlockButtonLabel: "Verify & Unlock KYC Portal",
    requestCodeText:
      "Don’t have an invitation code? Contact the Central Procurement Desk at",
    requestCodeEmail: "procurement@pingakshrenewables.com",
    securityFeatures: [
      {
        title: "256-Bit Encrypted KYC",
        detail: "Direct submission to Central Procurement & Accounts Payable.",
      },
      {
        title: "Statutory Verification",
        detail: "Automated PAN, GSTIN, IFSC, and MSME compliance indexing.",
      },
      {
        title: "Multi-Entity Empanelment",
        detail:
          "Single window for UBHP Hydro, PBPL Bio-Energy & Pingaksh Farms.",
      },
    ],
  },
  steps: [
    {
      stepNumber: 1,
      id: "company-contacts",
      title: "Entity & Leadership",
      subtitle: "Company, Directors & Phones",
    },
    {
      stepNumber: 2,
      id: "bank-statutory",
      title: "Banking & Tax KYC",
      subtitle: "NEFT/RTGS, PAN, GSTIN & MSME",
    },
    {
      stepNumber: 3,
      id: "documents-upload",
      title: "Statutory Documents",
      subtitle: "6 KYC Scans & Final Declaration",
    },
  ],
  formLabels: {
    sectionTitle: "KYC REGISTRATION",
    sectionSubtitle: "Complete your registration to proceed",
    companyName: "Company Name *",
    address: "Address *",
    proprietorHeader: "Proprietor / Director / Partner's Name",
    name1: "Name 1 *",
    mobile1: "Mobile *",
    name2: "Name 2",
    mobile2: "Mobile 2",
    phoneHeader: "Phone Number",
    office1: "Office 1 *",
    office2: "Office 2",
    residence: "Residence",
    email: "Email *",
    reference: "Reference",
    bankHeader: "Bank Details",
    bankName: "Bank Name *",
    branch: "Branch *",
    accountNumber: "Account Number *",
    ifscCode: "IFSC Code *",
    taxHeader: "Statutory & Tax Identifiers",
    tinNumber: "TIN Number",
    panNumber: "PAN Number *",
    gstinNumber: "GSTIN Number *",
    msmeRegistered: "MSME Registered *",
    msmeOptions: [
      { value: "", label: "Select..." },
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
    documentsHeader: "Documents Required",
    termsText: "I agree with the Terms and Conditions of Pingaksh. *",
    submitButton: "Submit Registration",
  },
  requiredDocuments: [
    {
      id: "addressProof",
      label: "Address Proof",
      required: true,
      helperText: "Utility bill, lease deed, or registered address document",
      acceptedFormats: ".pdf,.jpg,.jpeg,.png",
    },
    {
      id: "panScanCopy",
      label: "PAN Scan Copy",
      required: true,
      helperText: "Clear copy of Company / Firm Permanent Account Number card",
      acceptedFormats: ".pdf,.jpg,.jpeg,.png",
    },
    {
      id: "gstinCertificate",
      label: "GSTIN Certificate",
      required: true,
      helperText: "Form GST REG-06 registration certificate",
      acceptedFormats: ".pdf,.jpg,.jpeg,.png",
    },
    {
      id: "msmeCertification",
      label: "MSME Certification",
      required: false,
      helperText: "Udyam Registration Certificate (mandatory if MSME is Yes)",
      acceptedFormats: ".pdf,.jpg,.jpeg,.png",
    },
    {
      id: "tinScanCopy",
      label: "TIN Scan Copy",
      required: false,
      helperText: "Taxpayer Identification Number document (if applicable)",
      acceptedFormats: ".pdf,.jpg,.jpeg,.png",
    },
    {
      id: "companyRegCertificate",
      label: "Company Registration Certificate",
      required: true,
      helperText: "Certificate of Incorporation (COI) / Partnership Deed",
      acceptedFormats: ".pdf,.jpg,.jpeg,.png",
    },
  ],
  complianceGuidelines: [
    "Ensure all uploaded scan copies (PDF/JPG/PNG) are legible and under 10 MB per file.",
    "The Bank Account name must strictly match the legal Company Name on the PAN and GSTIN certificates.",
    "MSME vendors registered under Udyam must upload their valid certificate to avail statutory payment timelines.",
  ],
};

export interface KycDocumentUploadSpec {
  id: string;
  label: string;
  required: boolean;
  conditionalNote?: string;
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
    demoAccessCode: string;
    unlockButtonLabel: string;
    requestCodeText: string;
    requestCodeEmail: string;
    securityFeatures: { title: string; detail: string }[];
  };
  steps: OnboardingStepMeta[];
  formLabels: {
    sectionTitle: string;
    sectionSubtitle: string;

    // Step 1: Party, Principal Place of Supply, GST Contact & Directors (1-4)
    nameOfParty: string;
    contactPerson: string;
    contactMobile: string;

    principalAddressHeader: string;
    principalAddress: string;
    principalCity: string;
    principalPinCode: string;
    principalState: string;
    principalTelNo: string;
    principalFaxNo: string;
    principalEmailId: string;

    gstContactHeader: string;
    gstContactName: string;
    gstContactDesignation: string;
    gstContactAddress: string;
    gstContactCity: string;
    gstContactPinCode: string;
    gstContactState: string;
    gstContactTelNo: string;
    gstContactMobileNo: string;
    gstContactEmailId: string;

    directorsHeader: string;
    director1: string;
    director2: string;
    director3: string;
    director4: string;

    // Step 2: GST Status, HSN/SAC, PAN/MSMED/IEC, Bank & Mfg Status
    gstStatusHeader: string;
    gstStatusOptions: {
      value: "Registered" | "Not Registered" | "Compounding Scheme";
      label: string;
    }[];
    gstRegNumber: string;
    materialServicesDealing: string;
    hsnSacCode: string;
    panNumber: string;
    ssiMsmedNumber: string;
    iecNumber: string;

    bankHeader: string;
    bankName: string;
    accountType: string;
    accountTypeOptions: { value: string; label: string }[];
    accountNumber: string;
    ifscCode: string;

    mfgStatusHeader: string;
    mfgUnitStatus: string;
    mfgStatusOptions: { value: string; label: string }[];
    msmedSection2nQuestion: string;
    msmedSection2nNote: string;
    msmeOptions: { value: string; label: string }[];

    // Step 3: Enclosures & Declaration
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
      "Official Vendor Registration Form for Pingaksh Group (UBHP & PBPL). Submit Principal Place of Supply, GST Contact, HSN/SAC codes, Bank Details, and MSMED disclosures.",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Contact & Partners", href: "/contact" },
    { label: "Vendor Registration Portal", href: "/contact/vendor-portal" },
  ],
  hero: {
    title: "Vendor Registration Form",
    subtitle: "Institutional Supply Chain & Partner Empanelment Gateway",
    leadText:
      "Authorized EPC contractors, grain aggregators, electro-mechanical OEMs, and service providers can complete official vendor registration for Uttar Bharat Hydro Power (UBHP) and Pingaksh Beverages (PBPL).",
    backgroundImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=85",
    backgroundAlt:
      "Pingaksh Group Supply Chain and Vendor KYC Empanelment Portal",
  },
  securityGate: {
    badge: "Encrypted Partner Gateway",
    heading: "Authorized Vendor Verification",
    description:
      "Access to the Pingaksh Group Vendor Registration Form is restricted to invited suppliers and pre-qualified contractors. Please enter the invitation passcode issued by our Procurement Desk.",
    accessCodePlaceholder: "Enter Partner Access Code (e.g., PINGAKSH2026)",
    demoAccessCode: "PINGAKSH2026",
    unlockButtonLabel: "Verify & Unlock Registration Form",
    requestCodeText:
      "Don’t have an invitation code? Contact the Central Procurement Desk at",
    requestCodeEmail: "procurement@pingakshrenewables.com",
    securityFeatures: [
      {
        title: "256-Bit Encrypted KYC",
        detail: "Direct submission to Central Procurement & Accounts Payable.",
      },
      {
        title: "GST & HSN/SAC Indexing",
        detail:
          "Structured Principal Place of Supply and GST compliance mapping.",
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
      id: "party-and-addresses",
      title: "Party, Addresses & Directors",
      subtitle: "Principal Place of Supply, GST Contact & Board",
    },
    {
      stepNumber: 2,
      id: "gst-tax-and-banking",
      title: "GST, Tax, Banking & MSMED",
      subtitle: "HSN/SAC, PAN, Bank A/c & Mfg. Unit Status",
    },
    {
      stepNumber: 3,
      id: "enclosures-upload",
      title: "Statutory Enclosures",
      subtitle: "GST, PAN, MSMED/EM & Cancelled Cheque",
    },
  ],
  formLabels: {
    sectionTitle: "VENDOR REGISTRATION FORM",
    sectionSubtitle: "Complete all statutory vendor fields to proceed",

    // Step 1
    nameOfParty: "Name of Party *",
    contactPerson: "Contact Person *",
    contactMobile: "Mobile No. *",

    principalAddressHeader: "Address of Principal Place of Supply",
    principalAddress: "Street / Building Address *",
    principalCity: "City *",
    principalPinCode: "PIN Code *",
    principalState: "State *",
    principalTelNo: "Tel No.",
    principalFaxNo: "Fax No.",
    principalEmailId: "Email ID *",

    gstContactHeader: "Contact Person (for GST related Issues)",
    gstContactName: "Name *",
    gstContactDesignation: "Designation",
    gstContactAddress: "Address",
    gstContactCity: "City",
    gstContactPinCode: "PIN Code",
    gstContactState: "State",
    gstContactTelNo: "Tel No.",
    gstContactMobileNo: "Mobile No. *",
    gstContactEmailId: "Email ID *",

    directorsHeader: "Names of all Directors / Partners / Proprietors",
    director1: "1. Director / Partner / Proprietor Name *",
    director2: "2. Director / Partner / Proprietor Name",
    director3: "3. Director / Partner / Proprietor Name",
    director4: "4. Director / Partner / Proprietor Name",

    // Step 2
    gstStatusHeader:
      "Please tick the appropriate category — GST Registration Status *",
    gstStatusOptions: [
      { value: "Registered", label: "Registered*" },
      { value: "Not Registered", label: "Not Registered" },
      { value: "Compounding Scheme", label: "Compounding Scheme" },
    ],
    gstRegNumber: "GST Registration Number (Enclose Copy in Step 3)",
    materialServicesDealing: "Material / Services in which party is dealing *",
    hsnSacCode: "HSN / SAC Code *",
    panNumber: "Permanent Account No. (PAN) * (Enclose Copy in Step 3)",
    ssiMsmedNumber: "SSI / MSMED** Registration No. (Enclose Copy in Step 3)",
    iecNumber: "Import Export Certificate No. (IEC)",

    bankHeader: "Bank Details (Please enclose a cancelled cheque copy)",
    bankName: "Bank Name *",
    accountType: "A/c Type *",
    accountTypeOptions: [
      { value: "", label: "Select A/c Type..." },
      { value: "Current Account", label: "Current Account" },
      { value: "Cash Credit (CC) / OD", label: "Cash Credit (CC) / Overdraft" },
      { value: "Savings Account", label: "Savings Account" },
    ],
    accountNumber: "Bank A/c Number *",
    ifscCode: "IFSC Code *",

    mfgStatusHeader: "Status Of Your Mfg. Unit & MSMED Declaration",
    mfgUnitStatus: "Status Of Your Mfg. Unit *",
    mfgStatusOptions: [
      { value: "", label: "Select Status of Unit..." },
      { value: "Small Scale", label: "Small Scale" },
      { value: "Medium Scale", label: "Medium Scale" },
      { value: "Large Scale", label: "Large Scale" },
      { value: "Labour Contractor", label: "Labour Contractor" },
      { value: "Partnership Firm", label: "Partnership Firm" },
      { value: "Individual", label: "Individual" },
      { value: "HUF", label: "HUF (Hindu Undivided Family)" },
    ],
    msmedSection2nQuestion:
      "** We are a supplier within the definition of Section 2(n) of MSMED Act *",
    msmedSection2nNote:
      'If the response to above is "Yes", please provide a copy of the "Entrepreneurs Memorandum (EM)" / Udyam filed with the authority specified by the respective State Government in Step 3.',
    msmeOptions: [
      { value: "", label: "Select Yes / No..." },
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],

    // Step 3
    documentsHeader: "Mandatory Statutory Enclosures",
    termsText:
      "I/We hereby declare that the particulars given above are true and correct and agree to the Vendor Terms of Pingaksh Group. *",
    submitButton: "Submit Vendor Registration",
  },
  requiredDocuments: [
    {
      id: "cancelledChequeCopy",
      label: "Cancelled Cheque Copy",
      required: true,
      helperText:
        "Mandatory enclosure verifying Bank Name, Bank A/c Number, and IFSC Code",
      acceptedFormats: ".pdf,.jpg,.jpeg,.png",
    },
    {
      id: "panScanCopy",
      label: "Permanent Account No. (PAN) Copy",
      required: true,
      helperText: "Self-attested scan copy of Company / Firm PAN Card",
      acceptedFormats: ".pdf,.jpg,.jpeg,.png",
    },
    {
      id: "gstinCertificate",
      label: "GST Registration Certificate Copy",
      required: false,
      conditionalNote: "Mandatory if GST Status is Registered",
      helperText:
        "Form GST REG-06 Certificate (Required if GST Registered / Compounding)",
      acceptedFormats: ".pdf,.jpg,.jpeg,.png",
    },
    {
      id: "ssiMsmedEmCopy",
      label: "SSI / MSMED & Entrepreneurs Memorandum (EM) Copy",
      required: false,
      conditionalNote: 'Mandatory if Section 2(n) MSMED is "Yes"',
      helperText:
        "Copy of SSI / MSMED Certificate & Entrepreneurs Memorandum (EM) filed with State Authority",
      acceptedFormats: ".pdf,.jpg,.jpeg,.png",
    },
  ],
  complianceGuidelines: [
    "Enclose a clear copy of your GST Registration Certificate, PAN Card, and Cancelled Cheque as mandated in the form.",
    "Provide accurate 4/6/8-digit HSN (for Materials) or SAC (for Services) codes in Step 02.",
    'Suppliers covered under Section 2(n) of the MSMED Act ("Yes") must enclose their Entrepreneurs Memorandum (EM) / Udyam copy.',
  ],
};

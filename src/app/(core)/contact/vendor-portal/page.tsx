import type { Metadata } from "next";
import VendorPortalView from "@/components/contact/VendorPortalView";
import { VENDOR_PORTAL_DATA } from "@/data/vendorPortalData";

export const metadata: Metadata = {
  title: VENDOR_PORTAL_DATA.seo.title,
  description: VENDOR_PORTAL_DATA.seo.description,
  alternates: {
    canonical: "/contact/vendor-portal",
  },
};

export default function VendorPortalPage() {
  return <VendorPortalView data={VENDOR_PORTAL_DATA} />;
}

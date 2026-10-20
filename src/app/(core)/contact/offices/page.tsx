import type { Metadata } from "next";
import ContactOfficesView from "@/components/contact/ContactOfficesView";
import { CONTACT_OFFICES_DATA } from "@/data/contactOfficesData";

export const metadata: Metadata = {
  title: CONTACT_OFFICES_DATA.seo.title,
  description: CONTACT_OFFICES_DATA.seo.description,
  alternates: {
    canonical: "/contact/offices",
  },
};

export default function ContactOfficesPage() {
  return <ContactOfficesView data={CONTACT_OFFICES_DATA} />;
}

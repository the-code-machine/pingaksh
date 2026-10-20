import type { Metadata } from "next";
import CertificationsAwardsView from "@/components/media/CertificationsAwardsView";
import { CERTIFICATIONS_AWARDS_DATA } from "@/data/certificationsAwardsData";

export const metadata: Metadata = {
  title: CERTIFICATIONS_AWARDS_DATA.seo.title,
  description: CERTIFICATIONS_AWARDS_DATA.seo.description,
  alternates: {
    canonical: "/media/certifications-awards",
  },
};

export default function CertificationsAwardsPage() {
  return <CertificationsAwardsView data={CERTIFICATIONS_AWARDS_DATA} />;
}

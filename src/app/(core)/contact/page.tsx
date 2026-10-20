import type { Metadata } from "next";
import OverviewPageTemplate from "@/components/templates/OverviewPageTemplate";
import { OVERVIEW_PAGES_DATA } from "@/data/overviewPagesData";

const pageData = OVERVIEW_PAGES_DATA["contact"];

export const metadata: Metadata = {
  title: pageData.seoTitle,
  description: pageData.seoDescription,
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactOverviewPage() {
  return <OverviewPageTemplate data={pageData} />;
}

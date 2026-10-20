import type { Metadata } from "next";
import OverviewPageTemplate from "@/components/templates/OverviewPageTemplate";
import { OVERVIEW_PAGES_DATA } from "@/data/overviewPagesData";

const pageData = OVERVIEW_PAGES_DATA["our-businesses"];

export const metadata: Metadata = {
  title: pageData.seoTitle,
  description: pageData.seoDescription,
};

export default function OurBusinessesOverviewPage() {
  return <OverviewPageTemplate data={pageData} />;
}

import type { Metadata } from "next";
import StatutoryFilingsView from "@/components/investors/StatutoryFilingsView";
import { STATUTORY_FILINGS_DATA } from "@/data/statutoryFilingsData";

export const metadata: Metadata = {
  title: STATUTORY_FILINGS_DATA.seo.title,
  description: STATUTORY_FILINGS_DATA.seo.description,
  alternates: {
    canonical: "/investors/statutory-filings",
  },
};

export default function StatutoryFilingsPage() {
  return <StatutoryFilingsView data={STATUTORY_FILINGS_DATA} />;
}

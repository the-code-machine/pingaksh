import type { Metadata } from "next";
import FinancialReportsView from "@/components/investors/FinancialReportsView";
import { FINANCIAL_REPORTS_DATA } from "@/data/financialReportsData";

export const metadata: Metadata = {
  title: FINANCIAL_REPORTS_DATA.seo.title,
  description: FINANCIAL_REPORTS_DATA.seo.description,
  alternates: {
    canonical: "/investors/financial-reports",
  },
};

export default function FinancialReportsPage() {
  return <FinancialReportsView data={FINANCIAL_REPORTS_DATA} />;
}

import type { Metadata } from "next";
import HeritageTimelineView from "@/components/who-we-are/HeritageTimelineView";
import { HERITAGE_TIMELINE_DATA } from "@/data/heritageTimelineData";

export const metadata: Metadata = {
  title: HERITAGE_TIMELINE_DATA.seo.title,
  description: HERITAGE_TIMELINE_DATA.seo.description,
  alternates: {
    canonical: "/who-we-are/heritage-timeline",
  },
};

export default function HeritageTimelinePage() {
  return <HeritageTimelineView data={HERITAGE_TIMELINE_DATA} />;
}

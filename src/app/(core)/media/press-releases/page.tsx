import type { Metadata } from "next";
import PressReleasesView from "@/components/media/PressReleasesView";
import { PRESS_RELEASES_DATA } from "@/data/pressReleasesData";

export const metadata: Metadata = {
  title: PRESS_RELEASES_DATA.seo.title,
  description: PRESS_RELEASES_DATA.seo.description,
  alternates: {
    canonical: "/media/press-releases",
  },
};

export default function PressReleasesPage() {
  return <PressReleasesView data={PRESS_RELEASES_DATA} />;
}

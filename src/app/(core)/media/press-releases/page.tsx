import type { Metadata } from "next";
import PressReleasesView from "@/components/media/PressReleasesView";
import { PRESS_RELEASES_DATA } from "@/data/pressReleasesData";

const API_URL =
  "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/api/announcements.php";

const MEDIA_BASE_URL = "https://aliceblue-yak-580540.hostingersite.com";

interface AnnouncementApiItem {
  id: number | string;
  slug: string;
  title: string;
  excerpt: string | null;
  category:
    | "Hydro Power"
    | "Bio-Energy & Fuels"
    | "Corporate & Governance"
    | "Sustainability & CSR";
  release_code: string | null;
  date_label: string | null;
  iso_date: string | null;
  release_year: string | null;
  location: string | null;
  image_url: string | null;
  image_alt: string | null;
  redirect_href: string | null;
  pdf_download_href: string | null;
  is_featured: boolean | number;
  tags: string[] | string | null;
  is_published: boolean | number;
}

async function getPressReleases() {
  "use cache";

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Announcements API failed: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success || !Array.isArray(result.data)) {
      throw new Error("Invalid announcements API response");
    }

    return result.data.map((item: AnnouncementApiItem) => ({
      id: String(item.id),

      slug: item.slug,

      title: item.title,

      excerpt: item.excerpt ?? "",

      category: item.category,

      releaseCode: item.release_code ?? "",

      date: item.date_label ?? "",

      isoDate: item.iso_date ?? "",

      year: item.release_year ?? item.iso_date?.slice(0, 4) ?? "",

      location: item.location ?? "",

      imageUrl: item.image_url
        ? item.image_url.startsWith("http")
          ? item.image_url
          : `${MEDIA_BASE_URL}${
              item.image_url.startsWith("/") ? "" : "/"
            }${item.image_url}`
        : "",

      imageAlt: item.image_alt ?? "",

      redirectHref: item.redirect_href ?? "",

      pdfDownloadHref: item.pdf_download_href || undefined,

      isFeatured: Boolean(item.is_featured),

      tags: Array.isArray(item.tags)
        ? item.tags
        : typeof item.tags === "string"
          ? (() => {
              try {
                const parsed = JSON.parse(item.tags);
                return Array.isArray(parsed) ? parsed : [];
              } catch {
                return [];
              }
            })()
          : [],
    }));
  } catch (error) {
    console.error("Failed to fetch press releases:", error);

    // Fallback to static data if API is unavailable
    return PRESS_RELEASES_DATA.releases;
  }
}

export const metadata: Metadata = {
  title: PRESS_RELEASES_DATA.seo.title,
  description: PRESS_RELEASES_DATA.seo.description,
  alternates: {
    canonical: "/media/press-releases",
  },
};

export default async function PressReleasesPage() {
  const releases = await getPressReleases();

  const pageData = {
    ...PRESS_RELEASES_DATA,
    releases,
  };

  return <PressReleasesView data={pageData} />;
}

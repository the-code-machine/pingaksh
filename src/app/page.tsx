import Announment from "@/components/home/Announment";
import HeroSection from "@/components/home/HeroSection";
import HomeCoreSections from "@/components/home/HomeCoreSections";
import HomeCorporateSections from "@/components/home/HomeCorporateSections";
// Next.js 13 server component
const API_URL =
  "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin/api/announcements.php";

const MEDIA_BASE_URL = "https://aliceblue-yak-580540.hostingersite.com";

async function getAnnouncements() {
  "use cache";

  try {
    const response = await fetch(`${API_URL}?limit=3`, {
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

    return result.data.map((item: any) => ({
      id: String(item.id),

      category: item.category ?? "",

      date: item.date_label ?? "",

      isoDate: item.iso_date ?? "",

      headline: item.title ?? "",

      summary: item.excerpt ?? "",

      href: item.redirect_href || `/media/press-releases/${item.slug}`,

      partnerNames: {
        primary: "",
        secondary: "",
      },

      visualBadge: item.release_code ?? item.category ?? "Announcement",

      imageUrl: item.image_url
        ? item.image_url.startsWith("http")
          ? item.image_url
          : `${MEDIA_BASE_URL}${
              item.image_url.startsWith("/") ? "" : "/"
            }${item.image_url}`
        : "",

      imageAlt: item.image_alt ?? item.title ?? "Pingaksh Group announcement",
    }));
  } catch (error) {
    console.error("Failed to fetch homepage announcements:", error);

    return [];
  }
}

export default async function Home() {
  const announcements = await getAnnouncements();

  const announcementsSection = {
    sectionTitle: "Announcements",
    allPressLabel: "View All Press Releases",
    allPressHref: "/media/press-releases",
    items: announcements,
  };

  return (
    <>
      <HeroSection />

      <HomeCoreSections />

      <HomeCorporateSections />

      <Announment announcementsSection={announcementsSection} />
    </>
  );
}

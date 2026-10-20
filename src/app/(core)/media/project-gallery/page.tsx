import type { Metadata } from "next";
import ProjectGalleryView from "@/components/media/ProjectGalleryView";
import { PROJECT_GALLERY_DATA } from "@/data/projectGalleryData";

export const metadata: Metadata = {
  title: PROJECT_GALLERY_DATA.seo.title,
  description: PROJECT_GALLERY_DATA.seo.description,
  alternates: {
    canonical: "/media/project-gallery",
  },
};

export default function ProjectGalleryPage() {
  return <ProjectGalleryView data={PROJECT_GALLERY_DATA} />;
}

// src/app/(core)/our-businesses/[slug]/page.tsx

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BusinessVerticalShowcase from "@/components/our-businesses/BusinessVerticalShowcase";
import {
  BUSINESS_VERTICALS_DATA,
  getBusinessVerticalBySlug,
} from "@/data/businessVerticalsData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BUSINESS_VERTICALS_DATA.map((vertical) => ({
    slug: vertical.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = getBusinessVerticalBySlug(slug);

  if (!business) {
    return {
      title: "Business Vertical Not Found | Pingaksh Renewables",
    };
  }

  const canonicalUrl = `https://pingaksh.com/our-businesses/${business.slug}`;

  return {
    title: business.seo.title,
    description: business.seo.description,
    keywords: business.seo.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: business.seo.title,
      description: business.seo.description,
      url: canonicalUrl,
      siteName: "Pingaksh Renewables",
      type: "website",
      images: [
        {
          url: business.hero.heroImage,
          width: 1200,
          height: 630,
          alt: business.hero.heroImageAlt,
        },
      ],
    },
  };
}

export default async function BusinessVerticalDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const business = getBusinessVerticalBySlug(slug);

  if (!business) {
    notFound();
  }

  const canonicalUrl = `https://pingaksh.com/our-businesses/${business.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://pingaksh.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Our Businesses",
            item: "https://pingaksh.com/our-businesses",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: business.name,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: business.seo.title,
        description: business.seo.description,
        mainEntity: {
          "@type": "Organization",
          name: business.legalEntity,
          parentOrganization: {
            "@type": "Corporation",
            name: "Pingaksh Renewables (Pingaksh Group)",
            url: "https://pingaksh.com",
          },
          description: business.hero.subtitle,
          image: business.hero.heroImage,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BusinessVerticalShowcase business={business} />
    </>
  );
}

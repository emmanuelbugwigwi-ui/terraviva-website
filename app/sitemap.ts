import type { MetadataRoute } from "next";

const SITE_URL = "https://terraviva-website.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/donate",
    "/financial-support",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
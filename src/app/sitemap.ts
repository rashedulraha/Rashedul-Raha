import { MetadataRoute } from "next";
import { routing } from "@/routing";

const host = "https://rashedulraha.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/work",
    "/blog",
    "/guestbook",
    "/bucket-list",
    "/uses",
    "/links",
    "/attribution",
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  staticPaths.forEach((path) => {
    routing.locales.forEach((locale) => {
      sitemap.push({
        url: `${host}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.8,
      });
    });
  });

  return sitemap;
}

import { MetadataRoute } from "next";

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

  return staticPaths.map((path) => ({
    url: `${host}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}

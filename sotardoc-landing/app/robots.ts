import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "PerplexityBot", "Google-Extended", "ClaudeBot", "Amazonbot"],
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: "https://sotardoc.com/sitemap.xml",
    host: "https://sotardoc.com",
  };
}

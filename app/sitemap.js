export default function sitemap() {
  return [
    {
      url: "https://fonalbaba.hu/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://fonalbaba.hu/bemutatkozas",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://fonalbaba.hu/mintak",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.5,
    },
  ];
}

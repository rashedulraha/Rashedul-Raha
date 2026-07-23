export interface Certificate {
  id: string;
  title?: string;
  category: string;
  image: string;
  actualCertificateImage?: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  description?: string;
  skills?: string;
}

export const certificatesData: Certificate[] = [
  // Web Development Journey
  {
    id: "programming-hero-level-1",
    category: "Web Development Journey",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    actualCertificateImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    issuer: "Programming Hero",
    date: "2023",
    credentialUrl: "https://web.programming-hero.com/",
  },
  {
    id: "programming-hero-level-2",
    category: "Web Development Journey",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    actualCertificateImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    issuer: "Programming Hero",
    date: "2023",
    credentialUrl: "https://web.programming-hero.com/",
  },
  {
    id: "phitron",
    category: "Web Development Journey",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    actualCertificateImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    issuer: "Phitron",
    date: "2023",
    credentialUrl: "https://phitron.io/",
  },

  // Other Achievements
  {
    id: "meta-social-media-management",
    category: "Other Achievements",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    issuer: "Coursera (Meta)",
    date: "Nov 2, 2023",
  },
  {
    id: "meta-social-media-marketing",
    category: "Other Achievements",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    issuer: "Coursera (Meta)",
    date: "Sep 2, 2023",
  },
  {
    id: "hubspot-social-media",
    category: "Other Achievements",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    issuer: "HubSpot Academy",
    date: "Feb 2023",
  },
  {
    id: "hubspot-digital-marketing",
    category: "Other Achievements",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
    issuer: "HubSpot Academy",
    date: "Feb 2023",
  },
  {
    id: "hubspot-content-marketing",
    category: "Other Achievements",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    issuer: "HubSpot Academy",
    date: "Feb 2023",
  },
  {
    id: "meta-measure-optimize",
    category: "Other Achievements",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    issuer: "Coursera (Meta)",
    date: "2023",
  },
  {
    id: "meta-advertising",
    category: "Other Achievements",
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80",
    issuer: "Coursera (Meta)",
    date: "2023",
  },
  {
    id: "meta-fundamentals-advertising",
    category: "Other Achievements",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    issuer: "Coursera (Meta)",
    date: "2023",
  }
];

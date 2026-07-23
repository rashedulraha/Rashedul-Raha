export type BlogPost = {
  id: string | number;
  title: string;
  slug: string;
  description: string;
  image: string;
  date?: string;
  publishedAt?: string;
  createdAt?: string;
  readTime: string;
  category: string;
};

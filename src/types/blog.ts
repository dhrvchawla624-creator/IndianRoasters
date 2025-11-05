export interface BlogPostMeta {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishDate: string;
  category: string;
  tags: string[];
  featuredImage: string;
  readTime: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  htmlContent: string;
}

export const BLOG_CATEGORIES = [
  'All Posts',
  'Roaster Stories',
  'Brewing Guides',
  'Origin Stories',
  'Coffee Education',
  'Coffee Culture'
] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];

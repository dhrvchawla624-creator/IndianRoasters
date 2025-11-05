import type { BlogPost } from '../types/blog';
import { parseMarkdown } from '../utils/markdownParser';

// Import all markdown files from content/blogs directory
const blogModules = import.meta.glob('../content/blogs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

/**
 * Load all blog posts from markdown files
 */
export function getAllBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  
  for (const path in blogModules) {
    try {
      // Access the markdown content
      const markdownModule = blogModules[path];
      
      // Handle different module formats
      let markdown: string;
      if (typeof markdownModule === 'string') {
        markdown = markdownModule;
      } else if (markdownModule && typeof markdownModule === 'object' && 'default' in markdownModule) {
        markdown = (markdownModule as any).default;
      } else {
        console.error(`Unable to load markdown from ${path}:`, markdownModule);
        continue;
      }
      
      // Parse and add to posts
      const post = parseMarkdown(markdown);
      posts.push(post);
    } catch (error) {
      console.error(`Error parsing blog post from ${path}:`, error);
    }
  }
  
  // Sort by date (newest first)
  return posts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

/**
 * Get single blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const allPosts = getAllBlogPosts();
  return allPosts.find(post => post.slug === slug);
}

/**
 * Get posts by category
 */
export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === 'All Posts') {
    return getAllBlogPosts();
  }
  
  const allPosts = getAllBlogPosts();
  return allPosts.filter(post => post.category === category);
}

/**
 * Get all unique categories with post counts
 */
export function getAllCategories(): { name: string; count: number }[] {
  const allPosts = getAllBlogPosts();
  const categoryCounts = new Map<string, number>();
  
  allPosts.forEach(post => {
    const count = categoryCounts.get(post.category) || 0;
    categoryCounts.set(post.category, count + 1);
  });
  
  return Array.from(categoryCounts.entries()).map(([name, count]) => ({
    name,
    count
  }));
}

/**
 * Search posts by query
 */
export function searchBlogPosts(query: string): BlogPost[] {
  const allPosts = getAllBlogPosts();
  const lowercaseQuery = query.toLowerCase();
  
  return allPosts.filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get related posts (same category, excluding current post)
 */
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (!currentPost) return [];
  
  const allPosts = getAllBlogPosts();
  
  return allPosts
    .filter(post => 
      post.category === currentPost.category && 
      post.slug !== currentSlug
    )
    .slice(0, limit);
}

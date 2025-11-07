import type { BlogPost } from '../types/blog.js';

/**
 * Parse frontmatter manually (browser-compatible, flexible format)
 */
function parseFrontmatter(content: string): { data: any; content: string } {
  // Normalize content
  const normalized = content.trim();
  
  console.log('🔍 Parsing frontmatter, content start:', normalized.substring(0, 200));
  
  // Try multiple regex patterns for different frontmatter formats
  const patterns = [
    /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/,  // Standard: ---\ntitle: ...\n---
    /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/,      // Flexible: --- title: ... ---
  ];
  
  let frontmatterText = '';
  let markdownContent = '';
  let matched = false;
  
  for (const pattern of patterns) {
    const match = normalized.match(pattern);
    if (match) {
      frontmatterText = match[1];
      markdownContent = match[2];
      matched = true;
      console.log('✅ Frontmatter matched!');
      break;
    }
  }
  
  if (!matched) {
    console.error('❌ No frontmatter found in content');
    return { data: {}, content: normalized };
  }
  
  console.log('📝 Frontmatter text (first 300 chars):', frontmatterText.substring(0, 300));
  
  // Parse frontmatter key-value pairs
  const data: any = {};
  const lines = frontmatterText.split(/\r?\n/);
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = trimmed.substring(0, colonIndex).trim();
    let value = trimmed.substring(colonIndex + 1).trim();
    
    // Remove surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    // Parse arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        data[key] = JSON.parse(value);
      } catch {
        data[key] = value
          .slice(1, -1)
          .split(',')
          .map(item => item.trim().replace(/^['"]|['"]$/g, ''));
      }
    }
    // Parse numbers
    else if (!isNaN(Number(value)) && value !== '') {
      data[key] = Number(value);
    }
    // Regular string
    else {
      data[key] = value;
    }
  }
  
  // Ensure defaults
  data.tags = Array.isArray(data.tags) ? data.tags : [];
  data.readTime = data.readTime || 5;
  
  console.log('✅ Parsed frontmatter data:', data);
  
  return { data, content: markdownContent };
}

/**
 * Simple markdown to HTML converter (browser-native, no dependencies)
 */
function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

  // Unordered lists
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  // Ordered lists
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');

  // Paragraphs (split by double newlines)
  const paragraphs = html.split('\n\n');
  html = paragraphs
    .map(para => {
      if (para.startsWith('<h') || para.startsWith('<ul') || para.startsWith('<blockquote') || para.startsWith('<li')) {
        return para;
      }
      return `<p>${para.replace(/\n/g, ' ')}</p>`;
    })
    .join('\n');

  return html;
}

/**
 * Parse markdown file and extract metadata + content
 */
export function parseMarkdown(markdownContent: string): BlogPost {
  const { data, content } = parseFrontmatter(markdownContent);
  const htmlContent = markdownToHtml(content);

  console.log('📄 BlogPost parsed:', { title: data.title, slug: data.slug });

  const post: BlogPost = {
    title: data.title || 'Untitled Post',
    slug: data.slug || 'untitled',
    excerpt: data.excerpt || 'No excerpt available.',
    author: data.author || 'Anonymous',
    publishDate: data.publishDate || new Date().toISOString().split('T')[0],
    category: data.category || 'Uncategorized',
    tags: Array.isArray(data.tags) ? data.tags : [],
    featuredImage: data.featuredImage || 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
    readTime: data.readTime || 5,
    content,
    htmlContent
  };

  return post;
}

/**
 * Calculate reading time from content
 */
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Get relative time (e.g., "2 days ago")
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

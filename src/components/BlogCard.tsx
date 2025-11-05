import { Link } from 'react-router-dom';
import { formatDate } from '../utils/markdownParser';
import type { BlogPost } from '../types/blog';

interface BlogCardProps {
  post: BlogPost;
}

function BlogCard({ post }: BlogCardProps) {
  // Safety check for tags
  const tags = Array.isArray(post.tags) ? post.tags : [];
  
  return (
    <Link 
      to={`/blog/${post.slug}`}
      className="group block bg-white dark:bg-dark-surface rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* Featured Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-1.5 bg-coffee-medium dark:bg-dark-accent text-white text-xs font-bold rounded-full backdrop-blur-sm bg-opacity-95">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-coffee-dark dark:text-dark-text mb-3 group-hover:text-coffee-medium dark:group-hover:text-dark-accent transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-coffee-light dark:text-dark-text-secondary mb-4 line-clamp-3 text-sm">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-coffee-light dark:text-dark-text-secondary pb-4 border-b border-cream-dark dark:border-dark-border">
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {formatDate(post.publishDate)}
          </span>
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {post.readTime} min read
          </span>
        </div>

        {/* Tags - with safety check and unique keys */}
        {tags.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={`${post.slug}-tag-${index}-${tag}`}
                className="px-3 py-1 bg-cream-dark dark:bg-dark-border text-coffee-dark dark:text-dark-text text-xs rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

export default BlogCard;

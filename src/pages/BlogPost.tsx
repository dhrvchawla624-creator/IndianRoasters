import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getBlogPostBySlug, getRelatedPosts } from '../data/blogLoader.js';
import { formatDate } from '../utils/markdownParser.js';

function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-light dark:bg-dark-bg pt-24">
        <div className="text-center p-8">
          <div className="text-8xl mb-6">📝</div>
          <h1 className="text-4xl font-bold text-coffee-dark dark:text-dark-text mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-coffee-medium dark:text-dark-text-secondary mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 bg-coffee-medium dark:bg-dark-accent text-white rounded-full font-semibold hover:bg-coffee-brown dark:hover:bg-dark-accent/80 transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Get 3 related posts from same category
  const relatedPosts = getRelatedPosts(post.slug, 3);

  return (
    <div className="bg-cream-light dark:bg-dark-bg min-h-screen">
      {/* Header with Background Image */}
      <header className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          src={post.featuredImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4">
          <span className="inline-block px-5 py-2 bg-coffee-medium dark:bg-dark-accent text-white text-sm font-bold rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/90">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{formatDate(post.publishDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        {/* Back Button */}
        <div className="mb-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-dark-surface text-coffee-medium dark:text-dark-accent border-2 border-coffee-light dark:border-dark-border rounded-full font-semibold hover:border-coffee-medium dark:hover:border-dark-accent transition-all group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-coffee-dark dark:prose-headings:text-dark-text
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-coffee-light dark:prose-p:text-dark-text-secondary prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-coffee-medium dark:prose-a:text-dark-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-coffee-dark dark:prose-strong:text-dark-text prose-strong:font-semibold
            prose-ul:my-6 prose-ol:my-6
            prose-li:text-coffee-light dark:prose-li:text-dark-text-secondary prose-li:my-2
            prose-blockquote:border-l-4 prose-blockquote:border-coffee-medium dark:prose-blockquote:border-dark-accent
            prose-blockquote:bg-cream-dark dark:prose-blockquote:bg-dark-border
            prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
            prose-blockquote:italic prose-blockquote:text-coffee-medium dark:prose-blockquote:text-dark-text-secondary
            prose-code:text-coffee-medium dark:prose-code:text-dark-accent
            prose-code:bg-cream-dark dark:prose-code:bg-dark-border
            prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-coffee-dark dark:prose-pre:bg-dark-surface
            prose-pre:text-cream-light dark:prose-pre:text-dark-text
            prose-img:rounded-2xl prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />

        {/* Tags Section */}
        <div className="mt-16 py-8 border-t border-b border-cream-dark dark:border-dark-border">
          <h3 className="text-xl font-bold text-coffee-dark dark:text-dark-text mb-6">
            Related Tags
          </h3>
          <div className="flex gap-3 flex-wrap">
            {post.tags.map(tag => (
              <button
                key={tag}
                onClick={() => navigate('/blog')}
                className="px-5 py-2.5 bg-cream-dark dark:bg-dark-border text-coffee-dark dark:text-dark-text border-2 border-coffee-light dark:border-dark-border rounded-full font-semibold text-sm hover:bg-coffee-medium hover:text-white dark:hover:bg-dark-accent hover:border-coffee-medium dark:hover:border-dark-accent transition-all"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-white dark:bg-dark-surface py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-coffee-dark dark:text-dark-text mb-8 text-center">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(related => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="group"
                >
                  <div className="bg-cream-dark dark:bg-dark-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={related.featuredImage}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-coffee-dark dark:text-dark-text group-hover:text-coffee-medium dark:group-hover:text-dark-accent transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-3 text-xs text-coffee-light dark:text-dark-text-secondary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {related.readTime} min read
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogPost;

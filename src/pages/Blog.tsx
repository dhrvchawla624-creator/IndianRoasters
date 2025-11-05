import { useState, useMemo } from 'react';
import { getAllBlogPosts, searchBlogPosts } from '../data/blogLoader';
import { BLOG_CATEGORIES } from '../types/blog';
import BlogCard from '../components/BlogCard';

function Blog() {
  const allPosts = useMemo(() => getAllBlogPosts(), []);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Posts');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on category and search
  const filteredPosts = useMemo(() => {
    let filtered = allPosts;

    // Filter by category
    if (selectedCategory !== 'All Posts') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = searchBlogPosts(searchQuery);
      
      // Also apply category filter after search
      if (selectedCategory !== 'All Posts') {
        filtered = filtered.filter(post => post.category === selectedCategory);
      }
    }

    return filtered;
  }, [allPosts, selectedCategory, searchQuery]);

  return (
    <div className="bg-cream-light dark:bg-dark-bg min-h-screen p-4 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 bg-white dark:bg-dark-surface rounded-3xl p-16 shadow-lg">
          <h1 className="text-5xl md:text-6xl font-bold text-coffee-dark dark:text-dark-text mb-4">
            ☕ Coffee Stories & Insights
          </h1>
          <p className="text-lg md:text-xl text-coffee-medium dark:text-dark-text-secondary max-w-2xl mx-auto">
            Discover the world of Indian specialty coffee roasters, brewing guides, and coffee culture
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 rounded-full border-2 border-coffee-light dark:border-dark-border bg-white dark:bg-dark-surface text-coffee-dark dark:text-dark-text focus:outline-none focus:border-coffee-medium dark:focus:border-dark-accent transition-colors shadow-md"
            />
            <svg
              className="absolute right-5 top-1/2 -translate-y-1/2 text-coffee-light dark:text-dark-text-secondary"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 flex-wrap justify-center mb-12">
          {BLOG_CATEGORIES.map(category => {
            const postCount = selectedCategory === category ? filteredPosts.length : 
              allPosts.filter(p => category === 'All Posts' || p.category === category).length;
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-coffee-medium dark:bg-dark-accent text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-dark-surface text-coffee-dark dark:text-dark-text border-2 border-coffee-light dark:border-dark-border hover:bg-cream-dark dark:hover:bg-dark-border'
                }`}
              >
                {category} ({postCount})
              </button>
            );
          })}
        </div>

        {/* Results Count */}
        {searchQuery && (
          <div className="text-center mb-6 text-coffee-medium dark:text-dark-text-secondary">
            Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} for "{searchQuery}"
          </div>
        )}

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-5 bg-white dark:bg-dark-surface rounded-3xl shadow-lg">
            <div className="text-8xl mb-6">📝</div>
            <h2 className="text-3xl font-bold text-coffee-dark dark:text-dark-text mb-4">
              No Posts Found
            </h2>
            <p className="text-coffee-medium dark:text-dark-text-secondary text-lg mb-6">
              Try adjusting your search or browse a different category
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Posts');
              }}
              className="px-8 py-3 bg-coffee-medium dark:bg-dark-accent text-white rounded-full font-semibold hover:bg-coffee-brown dark:hover:bg-dark-accent/80 transition-colors"
            >
              View All Posts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;


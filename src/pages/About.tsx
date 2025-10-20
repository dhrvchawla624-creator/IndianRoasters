function About() {
  return (
    <div className="min-h-screen pt-20 px-5 py-10 bg-cream-light">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-coffee-dark mb-4">
            About Homegrounds
          </h1>
          <p className="text-lg text-coffee-medium">
            Your Ultimate Indian Coffee Library
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold text-coffee-dark mb-4">Our Mission</h2>
            <p className="text-coffee-medium leading-relaxed mb-4">
              Homegrounds is dedicated to making India's specialty coffee scene accessible to everyone.
              We aggregate coffee offerings from 30+ premium roasters across India, providing a 
              centralized platform to discover, compare, and purchase exceptional coffee beans.
            </p>
            <p className="text-coffee-medium leading-relaxed">
              Our goal is to support the growing Indian specialty coffee community by connecting 
              coffee enthusiasts with the finest roasters and helping them discover their perfect brew.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold text-coffee-dark mb-4">Why Homegrounds?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-start space-x-3 mb-4">
                  <div className="text-2xl">🔍</div>
                  <div>
                    <h3 className="font-bold text-coffee-dark mb-1">Comprehensive Search</h3>
                    <p className="text-sm text-coffee-medium">
                      Filter by roaster, origin, process, roast level, and tasting notes
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start space-x-3 mb-4">
                  <div className="text-2xl">🔄</div>
                  <div>
                    <h3 className="font-bold text-coffee-dark mb-1">Real-Time Data</h3>
                    <p className="text-sm text-coffee-medium">
                      Always up-to-date with the latest coffee offerings and prices
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start space-x-3 mb-4">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <h3 className="font-bold text-coffee-dark mb-1">Fast & Responsive</h3>
                    <p className="text-sm text-coffee-medium">
                      Lightning-fast search and filtering for seamless browsing
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start space-x-3 mb-4">
                  <div className="text-2xl">🎨</div>
                  <div>
                    <h3 className="font-bold text-coffee-dark mb-1">Beautiful Design</h3>
                    <p className="text-sm text-coffee-medium">
                      Clean, intuitive interface designed for coffee lovers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold text-coffee-dark mb-4">Technology</h2>
            <p className="text-coffee-medium leading-relaxed mb-4">
              Built with modern web technologies including React, TypeScript, and Tailwind CSS,
              Homegrounds delivers a fast, responsive, and delightful user experience.
            </p>
            <p className="text-coffee-medium leading-relaxed">
              Our automated scraping system keeps the coffee database fresh and accurate,
              pulling data directly from roaster websites to ensure you always have access
              to the latest offerings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

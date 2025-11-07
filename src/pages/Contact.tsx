import PageHero from '../components/PageHero.js';

function Contact() {
  return (
    <div className="min-h-screen bg-cream-light dark:bg-dark-bg transition-colors duration-300">
      <PageHero 
        title="Get in Touch"
        subtitle="We'd love to hear from you"
        icon="📧"
      />
      
      <div className="max-w-4xl mx-auto px-5 py-10">
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg dark:shadow-dark-surface-elevated/30 p-8 md:p-12 transition-colors duration-300">
          <div className="text-center text-coffee-light dark:text-dark-text-secondary mb-8">
            <h2 className="text-2xl font-bold text-coffee-dark dark:text-dark-text mb-4">
              Contact Form Coming Soon
            </h2>
            <p className="text-lg mb-8">
              In the meantime, feel free to reach out through our social channels or email.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-cream dark:bg-dark-bg-secondary rounded-xl p-6 transition-colors duration-300">
              <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-3 flex items-center">
                <span className="text-2xl mr-3">💼</span>
                Business Inquiries
              </h3>
              <p className="text-sm text-coffee-medium dark:text-dark-text-secondary mb-2">
                Are you a roaster interested in being featured on our platform?
              </p>
              <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                We're always looking to expand our roaster network.
              </p>
            </div>

            <div className="bg-cream dark:bg-dark-bg-secondary rounded-xl p-6 transition-colors duration-300">
              <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-3 flex items-center">
                <span className="text-2xl mr-3">🐛</span>
                Bug Reports
              </h3>
              <p className="text-sm text-coffee-medium dark:text-dark-text-secondary mb-2">
                Found an issue with the website?
              </p>
              <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                Let us know so we can fix it and improve your experience.
              </p>
            </div>

            <div className="bg-cream dark:bg-dark-bg-secondary rounded-xl p-6 transition-colors duration-300">
              <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-3 flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Feature Requests
              </h3>
              <p className="text-sm text-coffee-medium dark:text-dark-text-secondary mb-2">
                Have ideas for new features or improvements?
              </p>
              <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                We'd love to hear your suggestions.
              </p>
            </div>

            <div className="bg-cream dark:bg-dark-bg-secondary rounded-xl p-6 transition-colors duration-300">
              <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-3 flex items-center">
                <span className="text-2xl mr-3">🤝</span>
                Partnerships
              </h3>
              <p className="text-sm text-coffee-medium dark:text-dark-text-secondary mb-2">
                Interested in collaborating with Indian Roasters?
              </p>
              <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                Let's explore opportunities together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

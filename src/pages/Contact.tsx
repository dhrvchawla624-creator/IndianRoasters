import PageHero from '../components/PageHero.js';

function Contact() {
  return (
    <div className="min-h-screen bg-cream-light dark:bg-dark-bg transition-colors duration-300">
      <PageHero 
        title="Get in Touch"
        subtitle="We'd love to hear from you"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        }
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
            <div className="bg-cream dark:bg-dark-bg-secondary rounded-xl p-6 transition-colors duration-300 flex items-start space-x-4">
              <div className="shrink-0 w-12 h-12 bg-white dark:bg-dark-surface rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coffee-medium dark:text-dark-accent"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-1">
                  Business Inquiries
                </h3>
                <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                  Are you a roaster interested in being featured on our platform? We're always looking to expand our network.
                </p>
              </div>
            </div>

            <div className="bg-cream dark:bg-dark-bg-secondary rounded-xl p-6 transition-colors duration-300 flex items-start space-x-4">
              <div className="shrink-0 w-12 h-12 bg-white dark:bg-dark-surface rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coffee-medium dark:text-dark-accent"><path d="m8 2 1.88 1.88"></path><path d="M14.12 3.88 16 2"></path><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"></path><path d="M12 20v-9"></path><path d="M6.53 9C4.6 8.8 3 7.1 3 5"></path><path d="M21 5c0 2.1-1.6 3.8-3.53 4"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-1">
                  Bug Reports
                </h3>
                <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                  Found an issue with the website? Let us know so we can fix it and improve your experience.
                </p>
              </div>
            </div>

            <div className="bg-cream dark:bg-dark-bg-secondary rounded-xl p-6 transition-colors duration-300 flex items-start space-x-4">
              <div className="shrink-0 w-12 h-12 bg-white dark:bg-dark-surface rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coffee-medium dark:text-dark-accent"><path d="M12 2a7 7 0 0 0-7 7c0 3.04 1.63 5.64 4 6.92V20h6v-4.08c2.37-1.28 4-3.88 4-6.92a7 7 0 0 0-7-7z"></path><path d="M12 18h.01"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-1">
                  Feature Requests
                </h3>
                <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                  Have ideas for new features or improvements? We'd love to hear your suggestions.
                </p>
              </div>
            </div>

            <div className="bg-cream dark:bg-dark-bg-secondary rounded-xl p-6 transition-colors duration-300 flex items-start space-x-4">
              <div className="shrink-0 w-12 h-12 bg-white dark:bg-dark-surface rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coffee-medium dark:text-dark-accent"><path d="M14.5 18H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.5"/><path d="M9.5 18H18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2.5"/><path d="m9.2 11.4-.9 2.1"/><path d="m14.8 11.4.9 2.1"/><path d="m12 15.5 1-1"/><path d="m12 15.5-1-1"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-coffee-dark dark:text-dark-text mb-1">
                  Partnerships
                </h3>
                <p className="text-sm text-coffee-medium dark:text-dark-text-secondary">
                  Interested in collaborating with Indian Roasters? Let's explore opportunities together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

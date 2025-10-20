function Contact() {
  return (
    <div className="min-h-screen pt-20 px-5 py-10 bg-cream-light">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-coffee-dark mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-coffee-medium">
            We'd love to hear from you
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center text-coffee-light mb-8">
            <div className="text-6xl mb-6">📧</div>
            <h2 className="text-2xl font-bold text-coffee-dark mb-4">
              Contact Form Coming Soon
            </h2>
            <p className="text-lg mb-8">
              In the meantime, feel free to reach out through our social channels or email.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-cream rounded-xl p-6">
              <h3 className="font-bold text-coffee-dark mb-3 flex items-center">
                <span className="text-2xl mr-3">💼</span>
                Business Inquiries
              </h3>
              <p className="text-sm text-coffee-medium mb-2">
                Are you a roaster interested in being featured on our platform?
              </p>
              <p className="text-sm text-coffee-medium">
                We're always looking to expand our roaster network.
              </p>
            </div>

            <div className="bg-cream rounded-xl p-6">
              <h3 className="font-bold text-coffee-dark mb-3 flex items-center">
                <span className="text-2xl mr-3">🐛</span>
                Bug Reports
              </h3>
              <p className="text-sm text-coffee-medium mb-2">
                Found an issue with the website?
              </p>
              <p className="text-sm text-coffee-medium">
                Let us know so we can fix it and improve your experience.
              </p>
            </div>

            <div className="bg-cream rounded-xl p-6">
              <h3 className="font-bold text-coffee-dark mb-3 flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Feature Requests
              </h3>
              <p className="text-sm text-coffee-medium mb-2">
                Have ideas for new features or improvements?
              </p>
              <p className="text-sm text-coffee-medium">
                We'd love to hear your suggestions.
              </p>
            </div>

            <div className="bg-cream rounded-xl p-6">
              <h3 className="font-bold text-coffee-dark mb-3 flex items-center">
                <span className="text-2xl mr-3">🤝</span>
                Partnerships
              </h3>
              <p className="text-sm text-coffee-medium mb-2">
                Interested in collaborating with Homegrounds?
              </p>
              <p className="text-sm text-coffee-medium">
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

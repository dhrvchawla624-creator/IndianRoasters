import PageHero from '../components/PageHero.js';
import SEO from '../components/SEO.js';

function Contact() {
  return (
    <div className="min-h-screen bg-cream-light dark:bg-dark-bg transition-colors duration-300">
      <SEO
        title="Contact Indian Roasters | Get in Touch"
        description="Reach out to Indian Roasters for business inquiries, bug reports, feature requests, or partnerships in the growing Indian specialty coffee industry."
      />
      <PageHero
        title="Get in Touch"
        subtitle="We'd love to hear from you"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        }
      />

      <div className="max-w-4xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Contact Form */}
          <div className="pixel-card bg-white dark:bg-dark-surface p-8">
            <h2 className="font-pixel text-xl md:text-2xl text-coffee-dark dark:text-dark-text mb-6">
              Send a Message
            </h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="font-pixel text-xs text-coffee-dark dark:text-dark-text-secondary block mb-2">Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="font-pixel text-sm w-full p-3 border-4 border-coffee-dark dark:border-dark-accent bg-cream-light dark:bg-dark-bg text-coffee-dark dark:text-dark-text focus:outline-none focus:ring-0 shadow-[4px_4px_0px_0px_rgba(44,24,16,1)] dark:shadow-[4px_4px_0px_0px_rgba(232,184,77,1)]" 
                  required
                />
              </div>
              <div>
                <label className="font-pixel text-xs text-coffee-dark dark:text-dark-text-secondary block mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="font-pixel text-sm w-full p-3 border-4 border-coffee-dark dark:border-dark-accent bg-cream-light dark:bg-dark-bg text-coffee-dark dark:text-dark-text focus:outline-none focus:ring-0 shadow-[4px_4px_0px_0px_rgba(44,24,16,1)] dark:shadow-[4px_4px_0px_0px_rgba(232,184,77,1)]" 
                  required
                />
              </div>
              <div>
                <label className="font-pixel text-xs text-coffee-dark dark:text-dark-text-secondary block mb-2">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="Your message here..."
                  className="w-full p-3 border-4 border-coffee-dark dark:border-dark-accent bg-cream-light dark:bg-dark-bg text-coffee-dark dark:text-dark-text focus:outline-none focus:ring-0 shadow-[4px_4px_0px_0px_rgba(44,24,16,1)] dark:shadow-[4px_4px_0px_0px_rgba(232,184,77,1)] resize-none"
                  required
                ></textarea>
              </div>
              <button type="submit" className="pixel-button w-full text-sm py-4">
                Send Transmission
              </button>
            </form>
          </div>

          {/* Contact Info & Developers */}
          <div className="flex flex-col gap-10">
            {/* Info Box */}
            <div className="pixel-card bg-cream dark:bg-dark-surface p-8">
               <h2 className="font-pixel text-xl text-coffee-dark dark:text-dark-text mb-4">
                Inquiries
              </h2>
              <p className="text-coffee-dark dark:text-dark-text-secondary font-serif text-lg mb-6 leading-relaxed">
                Whether you're a roaster wanting to get featured, a coffee enthusiast with feedback, or just want to say hi — we're all ears!
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-2 border-coffee-dark dark:border-dark-accent flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coffee-dark dark:text-dark-accent"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <span className="font-pixel text-xs text-coffee-dark dark:text-dark-text">hello@indianroasters.com</span>
                </div>
              </div>
            </div>

            {/* Developers Box */}
            <div>
              <h2 className="font-pixel text-lg text-coffee-dark dark:text-dark-text mb-6">
                Meet the Devs
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  { name: 'Dhruv Chawla', user: 'dhrvchawla624', label: 'Creator' },
                  { name: 'Pranav', user: 'ghpranav', label: 'Developer' },
                  { name: 'Madhav', user: 'madhavv-xd', label: 'Developer' },
                ].map(dev => (
                  <a 
                    key={dev.user} 
                    href={`https://github.com/${dev.user}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group pixel-card bg-white dark:bg-dark-bg-secondary p-4 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-200"
                  >
                    <img 
                      src={`https://github.com/${dev.user}.png`} 
                      alt={dev.name} 
                      className="w-12 h-12 border-2 border-coffee-dark dark:border-dark-accent rounded-none shadow-[2px_2px_0px_0px_rgba(44,24,16,1)] dark:shadow-[2px_2px_0px_0px_rgba(232,184,77,1)] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all" 
                    />
                    <div className="flex-1">
                      <h3 className="font-pixel text-xs text-coffee-dark dark:text-dark-text mb-1">{dev.name}</h3>
                      <p className="text-[10px] font-bold text-coffee-light dark:text-dark-text-muted uppercase tracking-widest">{dev.label}</p>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center border-2 border-coffee-dark dark:border-dark-accent bg-cream dark:bg-dark-surface group-hover:bg-gold dark:group-hover:bg-dark-accent transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coffee-dark group-hover:text-white dark:group-hover:text-coffee-dark"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

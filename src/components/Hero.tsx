import { useState, useEffect } from 'react';

interface HeroProps {
  totalBeans: number;
  totalRoasters: number;
}

function Hero({ totalBeans, totalRoasters }: HeroProps) {
  return (
    <header 
      className="relative pt-28 pb-20 md:pt-32 md:pb-24 text-center text-white overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(44, 24, 16, 0.9), rgba(74, 44, 29, 0.9)), url('/images/hero-bg.jpg')`
      }}
    >
      {/* Background decoration elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3 drop-shadow-lg h-28 md:h-32">
          <TypingAnimation />
          <br/>
          <span className="bg-linear-to-r from-gold to-cream dark:from-dark-accent dark:to-dark-text bg-clip-text text-transparent">
            Coffee Roasters Library
          </span>
        </h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto drop-shadow-md">
          Explore <strong className="font-bold text-gold dark:text-dark-accent">{totalBeans}+</strong> coffee beans from <strong className="font-bold text-gold dark:text-dark-accent">{totalRoasters}+</strong> roasters across India
        </p>
        
      </div>
    </header>
  );
}

const TypingAnimation = () => {
  const phrases = ["Your Ultimate Indian", "The Finest Indian", "A World of Indian"];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = 150;
    const deletingSpeed = 75;
    const pauseDuration = 2000;

    const handleTyping = () => {
      if (isDeleting) {
        if (text.length > 0) {
          setText(current => current.substring(0, current.length - 1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((current) => (current + 1) % phrases.length);
        }
      } else {
        if (text.length < currentPhrase.length) {
          setText(current => currentPhrase.substring(0, current.length + 1));
        } else {
          // Pause at the end of the phrase
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases]);

  return (
    <span className="bg-linear-to-r from-gold to-cream dark:from-dark-accent dark:to-dark-text bg-clip-text text-transparent">
      {text}
      <span className="typing-cursor">|</span>
    </span>
  );
};


export default Hero;

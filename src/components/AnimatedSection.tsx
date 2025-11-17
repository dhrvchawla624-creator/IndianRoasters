import { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

function AnimatedSection({ children, className = '' }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the section is intersecting, set it to visible and unobserve.
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup observer on component unmount
    return () => {
      if (currentRef) observer.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount.

  return (
    <div ref={sectionRef} className={`scroll-snap-start py-8 md:py-10 ${className} ${isVisible ? 'is-visible' : 'is-hidden'}`}>
      {children}
    </div>
  );
}

export default AnimatedSection;
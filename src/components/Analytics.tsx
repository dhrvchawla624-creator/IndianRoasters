import { useState, useEffect } from 'react';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function Analytics() {
  // Only load analytics after page is interactive
  const [shouldLoad, setShouldLoad] = useState(false);
  
  useEffect(() => {
    // Defer analytics until after initial render
    const timer = setTimeout(() => setShouldLoad(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  if (!shouldLoad) return null;
  
  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}


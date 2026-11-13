'use client';

import { useEffect, useRef, useState } from 'react';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { onConsentChange, readConsent } from '@/lib/consent';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? '';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

/**
 * Renders nothing on the server and before mount. The Google tags are mounted only after an explicit "granted".
 * Scripts that already ran cannot be unloaded, so withdrawing consent reloads the page.
 */
export const AnalyticsGate = () => {
  const [granted, setGranted] = useState(false);
  const wasGranted = useRef(false);

  useEffect(() => {
    const sync = (choice: ReturnType<typeof readConsent>) => {
      const next = choice === 'granted';
      // Only an explicit refusal after an agreement reloads the page. Reopening the banner does not.
      if (wasGranted.current && choice === 'denied') {
        window.location.reload();
        return;
      }
      wasGranted.current = next;
      setGranted(next);
    };
    sync(readConsent());
    return onConsentChange(sync);
  }, []);

  if (!granted) return null;

  // The Tag Manager container already loads GA4 (its "GA4 - Configuration" tag). Mounting gtag.js
  // next to it would configure the same property twice and count every page view twice,
  // so GA4 is only loaded directly when there is no container.
  if (GTM_ID) return <GoogleTagManager gtmId={GTM_ID} />;
  return GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null;
};

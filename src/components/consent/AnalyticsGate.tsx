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

  return (
    <>
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
      {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
    </>
  );
};

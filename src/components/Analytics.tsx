import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function Analytics() {
  // Only load analytics in production and if GA_ID is configured
  if (!GA_ID || process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

// Helper functions for tracking custom events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

// Predefined event tracking functions
export const trackProjectView = (projectTitle: string) => {
  trackEvent('view_portfolio_project', {
    project_name: projectTitle,
  });
};

export const trackDownloadCV = () => {
  trackEvent('download_cv', {
    file_name: 'Patrick_Bartosik_CV.pdf',
  });
};

export const trackContactFormSubmit = (leadScore?: string) => {
  trackEvent('submit_contact_form', {
    lead_score: leadScore,
  });
};

export const trackCTAClick = (ctaName: string, ctaLocation: string) => {
  trackEvent('click_cta', {
    cta_name: ctaName,
    cta_location: ctaLocation,
  });
};

export const trackExternalLink = (url: string, linkText: string) => {
  trackEvent('click_external_link', {
    link_url: url,
    link_text: linkText,
  });
};

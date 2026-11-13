import { readConsent } from '@/lib/consent';

export type TrackEvent = 'contact_step_view' | 'contact_submit' | 'contact_source' | 'contact_booking_click';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Pushes to dataLayer only once analytics consent has been granted. */
export const track = (event: TrackEvent, params: Record<string, string> = {}): void => {
  if (typeof window === 'undefined' || readConsent() !== 'granted') return;
  (window.dataLayer ??= []).push({ event, ...params });
};

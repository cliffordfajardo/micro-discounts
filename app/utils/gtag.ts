export const GA_TRACKING_ID = "G-27NWG851Z9";

declare global {
  interface Window {
    gtag: (
      option: string,
      gaTrackingId: string,
      options: Record<string, unknown>
    ) => void;
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
    // debug_mode: true,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value
}: Record<string, string>) => {
  console.log('logging event event', { action, category, label, value });
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value
  });
};
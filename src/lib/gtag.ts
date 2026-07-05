// Define global window interface for typescript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const importMetaEnv = (import.meta as any).env || {};
const GA_MEASUREMENT_ID = importMetaEnv.VITE_GA_MEASUREMENT_ID || "G-VYXGSMECN0";

let isInitialized = false;

/**
 * Dynamically loads and stabilizes gtag.js on the document head
 */
export const initGA = () => {
  if (isInitialized) return;
  if (!GA_MEASUREMENT_ID) {
    console.warn("[GA] Measurement ID is missing. Google Analytics will be inactive.");
    return;
  }

  try {
    // Create the script element
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Bootstrap dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: false, // We log page views manually in our single-page router for accuracy
      cookie_flags: "SameSite=None;Secure" // Compliant cookie configuration
    });

    isInitialized = true;
    console.log(`[GA] Google Analytics successfully loaded for Measurement ID: ${GA_MEASUREMENT_ID}`);
  } catch (err) {
    console.error("[GA] Failed to initialize Google Analytics tracker:", err);
  }
};

/**
 * Report a route/path transition page_view to GA4
 */
export const gaTrackPageView = (path: string) => {
  if (!isInitialized) initGA();
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: document.title,
      page_location: window.location.href,
    });
    if (importMetaEnv.DEV) {
      console.log(`[GA] Page View Logged: "${path}"`);
    }
  }
};

/**
 * Report a custom interactive event to GA4
 */
export const gaTrackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (!isInitialized) initGA();
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      ...parameters,
      timestamp: new Date().toISOString()
    });
    if (importMetaEnv.DEV) {
      console.log(`[GA] Event Logged: "${eventName}"`, parameters);
    }
  }
};

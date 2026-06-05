import mixpanel from "mixpanel-browser";

// Use casted reference to import.meta to prevent TS compilation environments from failing
const importMetaEnv = (import.meta as any).env || {};

// Standard Mixpanel project token, defaulting to the provided token
const MIXPANEL_TOKEN = importMetaEnv.VITE_MIXPANEL_TOKEN || "994f69c6547bf95cf5280b27f417823e";

let isInitialized = false;

/**
 * Initializes Mixpanel with standard parameters.
 */
export const initMixpanel = () => {
  if (isInitialized) return;
  
  if (MIXPANEL_TOKEN) {
    try {
      mixpanel.init(MIXPANEL_TOKEN, {
        debug: importMetaEnv.DEV, // Enable verbose debug mode in development
        track_pageview: false,    // We handle pageview tracking manually to prevent duplicates
        persistence: "localStorage",
        api_host: "https://api-js.mixpanel.com"
      });
      isInitialized = true;
      console.log("[Mixpanel] Tracking initialized successfully.");
    } catch (err) {
      console.error("[Mixpanel] Failed to initialize Mixpanel:", err);
    }
  } else {
    console.warn("[Mixpanel] Token is missing. Analytics will be inactive.");
  }
};

/**
 * Sends an event with optional properties to Mixpanel.
 */
export const mixpanelTrack = (eventName: string, props?: Record<string, any>) => {
  if (!isInitialized) {
    initMixpanel();
  }
  
  try {
    mixpanel.track(eventName, {
      ...props,
      $current_url: window.location.href,
      path: window.location.pathname,
      timestamp: new Date().toISOString()
    });
    if (importMetaEnv.DEV) {
      console.log(`[Mixpanel] Tracked event: "${eventName}"`, props);
    }
  } catch (err) {
    console.warn(`[Mixpanel] Track failed for event "${eventName}":`, err);
  }
};

/**
 * Identifies a user and optionally sets user properties.
 */
export const mixpanelIdentify = (userId: string, traits?: Record<string, any>) => {
  if (!isInitialized) {
    initMixpanel();
  }
  
  try {
    mixpanel.identify(userId);
    if (traits) {
      mixpanel.people.set(traits);
    }
    if (importMetaEnv.DEV) {
      console.log(`[Mixpanel] Identified user "${userId}"`, traits);
    }
  } catch (err) {
    console.warn(`[Mixpanel] Identify failed for user "${userId}":`, err);
  }
};

/**
 * Tracks a page view event with clean attributes.
 */
export const mixpanelTrackPageView = (path: string, properties?: Record<string, any>) => {
  mixpanelTrack("Page View", {
    path,
    title: document.title,
    referrer: document.referrer,
    ...properties
  });
};

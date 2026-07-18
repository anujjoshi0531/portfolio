// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";


Sentry.init({
  dsn: "https://785b35c892468fb3c9a2e0af1a6af2b4@o4509858293547008.ingest.us.sentry.io/4509858294333440",

  // No integrations listed here — Replay is lazy-loaded below so it stays
  // out of the critical JS bundle that every visitor downloads on first load.
  integrations: [],

  // Sample 10% of traces in production (1.0 = every request — too expensive).
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Replay sample rates — still honoured once the integration loads lazily.
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Enable sending user PII (Personally Identifiable Information)
  sendDefaultPii: true,
});

// Lazy-load Replay AFTER the page is interactive.
// The replay SDK is ~60kB+ — deferring it keeps it out of the initial bundle
// so it doesn't block LCP or inflate the shared JS chunk every visitor downloads.
if (typeof window !== "undefined") {
  const loadReplay = async () => {
    const { replayIntegration } = await import("@sentry/nextjs");
    Sentry.addIntegration(
      replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      })
    );
  };

  // Wait until the browser is idle (after LCP, hydration, etc.)
  if (typeof (window as unknown as { requestIdleCallback?: unknown }).requestIdleCallback === "function") {
    (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadReplay);
  } else {
    // Safari fallback
    setTimeout(loadReplay, 2000);
  }
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

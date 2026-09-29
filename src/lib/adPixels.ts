// Advertising pixels: Google Ads, Meta, and TikTok.
//
// All three are advertising tags, so they load only once the visitor grants the
// Advertising cookie category (see components/consent/injectScripts.ts). Nothing
// here runs at build time or before consent. Meta's <noscript> image fallback is
// deliberately left out: it fires without JavaScript, so it could never respect
// the consent choice.
//
// The Meta and TikTok bootstrap snippets are the vendors' own code, injected
// verbatim so they can be diffed against Events Manager. Only the IDs and the
// consent gating are ours.

export const GOOGLE_ADS_ID = "AW-17574370157";
export const META_PIXEL_ID = "1858545644702596";
export const TIKTOK_PIXEL_ID = "D26CTKBC77U110BN94C0";

// Cookies each category's tags may set, cleared when that category is revoked.
// Prefix matches, so "_ga" covers "_ga_<id>" and "_gcl_" covers every Ads cookie.
export const CATEGORY_COOKIES = {
  analytics: ["_ga", "_gid", "_gat"],
  advertising: ["_gcl_", "_fbp", "_fbc", "_ttp", "_tt_enable_cookie", "ttcsid"],
} as const;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { page: () => void };
  }
}

function appendScript(id: string, src: string): void {
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function appendInline(id: string, code: string): void {
  const script = document.createElement("script");
  script.id = id;
  script.text = code;
  document.head.appendChild(script);
}

/** Google Ads tag (gtag.js). Shares window.dataLayer with the GTM container. */
function loadGoogleAds(analyticsGranted: boolean): void {
  if (document.getElementById("google-ads-gtag")) return;

  window.dataLayer = window.dataLayer ?? [];
  // gtag.js only reads Arguments objects off the dataLayer, not arrays, so this
  // has to be a plain function pushing `arguments`.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };

  // Consent Mode v2. We only get here after the visitor granted Advertising,
  // so the ad signals are granted; analytics_storage mirrors their Analytics choice.
  window.gtag("consent", "default", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: analyticsGranted ? "granted" : "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_ID);

  appendScript("google-ads-gtag", `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`);
}

/** Meta Pixel base code. Fires the initial PageView. */
function loadMetaPixel(): void {
  if (document.getElementById("meta-pixel")) return;
  appendInline(
    "meta-pixel",
    `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`,
  );
}

/** TikTok Pixel base code. Fires the initial page event. */
function loadTikTokPixel(): void {
  if (document.getElementById("tiktok-pixel")) return;
  appendInline(
    "tiktok-pixel",
    `!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

  ttq.load('${TIKTOK_PIXEL_ID}');
  ttq.page();
}(window, document, 'ttq');`,
  );
}

/** Load every advertising pixel. Safe to call repeatedly, each loads once. */
export function loadAdPixels(analyticsGranted: boolean): void {
  loadGoogleAds(analyticsGranted);
  loadMetaPixel();
  loadTikTokPixel();
}

/**
 * Report a client-side route change to the ad pixels. Meta is skipped on
 * purpose: its pixel already fires PageView on history.pushState by default,
 * so calling it here would double count.
 */
export function trackAdPageView(): void {
  window.gtag?.("event", "page_view", {
    send_to: GOOGLE_ADS_ID,
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
  });
  window.ttq?.page();
}

/**
 * Expire first-party cookies whose names start with any of the given prefixes.
 * Tags usually set them on the registrable domain (".greylanjames.com"), so
 * each parent domain of the current host is tried as well as the bare host.
 */
export function clearCookies(prefixes: readonly string[]): void {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => prefixes.some((p) => name.startsWith(p)));
  if (names.length === 0) return;

  const parts = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; domain=.${parts.slice(i).join(".")}`);

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
}

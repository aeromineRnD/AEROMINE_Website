"use client";

import Script from "next/script";

// GA4, loaded only when NEXT_PUBLIC_GA_ID is set. Unset in local development
// and in preview deployments, so neither pollutes the property.
//
// Consent Mode v2 defaults are declared BEFORE the gtag config runs, which is
// the only ordering Google honours. `analytics_storage` starts denied, so no
// cookie is written until the visitor accepts in ConsentBanner.
//
// A returning visitor who already accepted has their choice applied here, in
// the same script and before config, so their first pageview of the session is
// recorded rather than lost. localStorage is wrapped in try/catch: it throws
// outright in some privacy modes.
//
// ad_* stay denied permanently. We run no advertising, so there is nothing to
// ask for and nothing the banner can grant.
export const CONSENT_KEY = "aeromine-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function Analytics() {
  if (!GA_ID) return null;

  // One script that seeds dataLayer and then injects gtag.js itself. The
  // consent default has to reach dataLayer before the library initialises, and
  // App Router gives no ordering guarantee between two afterInteractive tags
  // (beforeInteractive is only valid in a pages/_document). Loading the library
  // from inside this script is the only way to make the order certain.
  return (
    <Script id="ga-init" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});
try{if(localStorage.getItem('${CONSENT_KEY}')==='granted'){gtag('consent','update',{analytics_storage:'granted'});}}catch(e){}
gtag('js',new Date());
gtag('config','${GA_ID}');
var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA_ID}';document.head.appendChild(s);`}
    </Script>
  );
}

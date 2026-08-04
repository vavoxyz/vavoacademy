(function () {
  "use strict";

  const config = window.VAVO_TRACKING || {};
  const pixelId = String(config.tiktokPixelId || "").trim();
  const consentKey = "vavo_marketing_consent_v1";
  const checkoutKey = "vavo_checkout_started_at";
  const purchaseKey = "vavo_purchase_tracked_v1";

  const eventPayload = {
    contents: [
      {
        content_id: config.productId || "vavo-academy-preorder",
        content_name: config.productName || "Vavo Academy — Preorder",
        content_type: "product",
        quantity: 1,
        price: Number(config.value) || 50
      }
    ],
    content_type: "product",
    value: Number(config.value) || 50,
    currency: config.currency || "PLN"
  };

  function getConsent() {
    try {
      return localStorage.getItem(consentKey);
    } catch (_error) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(consentKey, value);
    } catch (_error) {
      // Strona pozostaje w pełni funkcjonalna również bez localStorage.
    }
  }

  function loadTikTokPixel() {
    if (!pixelId || window.ttq?.__vavoLoaded) return;

    (function (windowObject, documentObject, analyticsObjectName) {
      windowObject.TiktokAnalyticsObject = analyticsObjectName;
      const ttq = windowObject[analyticsObjectName] = windowObject[analyticsObjectName] || [];
      ttq.methods = [
        "page", "track", "identify", "instances", "debug", "on", "off", "once",
        "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent",
        "revokeConsent", "grantConsent"
      ];
      ttq.setAndDefer = function (target, method) {
        target[method] = function () {
          target.push([method].concat(Array.prototype.slice.call(arguments, 0)));
        };
      };
      for (let index = 0; index < ttq.methods.length; index += 1) {
        ttq.setAndDefer(ttq, ttq.methods[index]);
      }
      ttq.instance = function (id) {
        const instance = ttq._i[id] || [];
        for (let index = 0; index < ttq.methods.length; index += 1) {
          ttq.setAndDefer(instance, ttq.methods[index]);
        }
        return instance;
      };
      ttq.load = function (id, options) {
        const source = "https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i = ttq._i || {};
        ttq._i[id] = [];
        ttq._i[id]._u = source;
        ttq._t = ttq._t || {};
        ttq._t[id] = Date.now();
        ttq._o = ttq._o || {};
        ttq._o[id] = options || {};
        const script = documentObject.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = source + "?sdkid=" + encodeURIComponent(id) + "&lib=" + analyticsObjectName;
        const firstScript = documentObject.getElementsByTagName("script")[0];
        firstScript.parentNode.insertBefore(script, firstScript);
      };
      ttq.load(pixelId);
      ttq.page();
      ttq.__vavoLoaded = true;
    })(window, document, "ttq");
  }

  function track(eventName) {
    if (!pixelId || getConsent() !== "accepted") return false;
    loadTikTokPixel();
    window.ttq?.track?.(eventName, eventPayload);
    return true;
  }

  function trackThankYouPurchase() {
    if (document.body.dataset.page !== "thank-you") return;

    let checkoutStarted = false;
    let purchaseTracked = false;
    try {
      checkoutStarted = Boolean(sessionStorage.getItem(checkoutKey));
      purchaseTracked = sessionStorage.getItem(purchaseKey) === "yes";
    } catch (_error) {
      checkoutStarted = true;
    }

    if (checkoutStarted && !purchaseTracked && track("CompletePayment")) {
      try {
        sessionStorage.setItem(purchaseKey, "yes");
        sessionStorage.removeItem(checkoutKey);
      } catch (_error) {
        // Brak sessionStorage nie wpływa na stronę podziękowania.
      }
    }
  }

  function createConsentBanner(forceOpen) {
    if (!pixelId || (!forceOpen && getConsent())) return;
    document.querySelector(".cookie-consent")?.remove();

    const banner = document.createElement("section");
    banner.className = "cookie-consent";
    banner.setAttribute("aria-label", "Zgoda na analitykę marketingową");
    banner.innerHTML = `
      <strong>ANALITYKA REKLAM</strong>
      <p>Za Twoją zgodą używamy TikTok Pixel, aby mierzyć skuteczność reklam. Możesz odmówić bez wpływu na działanie strony. <a href="polityka-prywatnosci.html">Dowiedz się więcej</a>.</p>
      <div class="cookie-consent__actions">
        <button type="button" data-cookie-reject>ODRZUĆ</button>
        <button type="button" data-cookie-accept>AKCEPTUJ</button>
      </div>
    `;
    document.body.appendChild(banner);

    banner.querySelector("[data-cookie-reject]")?.addEventListener("click", function () {
      setConsent("rejected");
      window.ttq?.revokeConsent?.();
      window.ttq?.disableCookie?.();
      banner.remove();
    });

    banner.querySelector("[data-cookie-accept]")?.addEventListener("click", function () {
      setConsent("accepted");
      loadTikTokPixel();
      window.ttq?.grantConsent?.();
      window.ttq?.enableCookie?.();
      track("ViewContent");
      trackThankYouPurchase();
      banner.remove();
    });
  }

  document.querySelectorAll("[data-checkout-link]").forEach(function (link) {
    link.addEventListener("click", function () {
      try {
        sessionStorage.setItem(checkoutKey, String(Date.now()));
      } catch (_error) {
        // Brak sessionStorage nie blokuje przejścia do płatności.
      }
      track("InitiateCheckout");
    });
  });

  document.querySelectorAll("[data-cookie-settings]").forEach(function (button) {
    if (!pixelId) return;
    button.hidden = false;
    button.addEventListener("click", function () {
      createConsentBanner(true);
    });
  });

  if (getConsent() === "accepted") {
    loadTikTokPixel();
    track("ViewContent");
    trackThankYouPurchase();
  } else {
    createConsentBanner();
  }
})();

(() => {
  "use strict";
  if (window.__DIGIY_MARKET_NAV_FIX_LOADED) return;
  window.__DIGIY_MARKET_NAV_FIX_LOADED = true;

  const SUPPORTED = ["fr", "en", "es", "de", "it", "nl", "ar"];
  const LOCAL_PAGES = new Set([
    "index.html",
    "app.html",
    "fiche.html",
    "shop.html",
    "commander.html",
    "inscription-market.html",
    "lexique-market.html"
  ]);

  function currentLang() {
    try {
      const query = String(new URLSearchParams(location.search).get("lang") || "").toLowerCase();
      if (SUPPORTED.includes(query)) return query;
      const stored = String(
        localStorage.getItem("digiy-market-lang") ||
        localStorage.getItem("digiy-lang") ||
        ""
      ).toLowerCase();
      if (SUPPORTED.includes(stored)) return stored;
      const browser = String(navigator.language || "fr").slice(0, 2).toLowerCase();
      if (SUPPORTED.includes(browser)) return browser;
    } catch (_) {}
    return "fr";
  }

  function saveLang(lang) {
    try {
      localStorage.setItem("digiy-market-lang", lang);
      localStorage.setItem("digiy-lang", lang);
    } catch (_) {}
  }

  function isMarketOrigin(url) {
    return url.origin === location.origin || url.hostname === "market.digiylyfe.com";
  }

  function addLang(rawHref) {
    if (!rawHref || rawHref.startsWith("#") || /^(javascript:|mailto:|tel:|sms:)/i.test(rawHref)) {
      return rawHref;
    }
    try {
      const url = new URL(rawHref, location.href);
      const file = url.pathname.split("/").pop() || "index.html";
      if (isMarketOrigin(url) && LOCAL_PAGES.has(file)) {
        url.searchParams.set("lang", currentLang());
        return url.toString();
      }
    } catch (_) {}
    return rawHref;
  }

  function isBoutiquesLink(anchor) {
    if (!anchor) return false;
    if (anchor.dataset.marketTarget === "boutiques") return true;
    const raw = String(anchor.getAttribute("href") || "");
    if (raw === "#boutiques") return true;
    try {
      const url = new URL(raw, location.href);
      return /\/(?:index\.html)?$/.test(url.pathname) && url.hash === "#boutiques";
    } catch (_) {
      return false;
    }
  }

  function goToBoutiques(event) {
    const section = document.getElementById("boutiques");
    if (!section) return false;
    if (event) event.preventDefault();
    const lang = currentLang();
    saveLang(lang);
    try {
      const url = new URL(location.href);
      url.searchParams.set("lang", lang);
      url.hash = "boutiques";
      history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch (_) {}
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    section.setAttribute("tabindex", "-1");
    setTimeout(() => {
      try { section.focus({ preventScroll: true }); } catch (_) {}
    }, 450);
    return true;
  }

  function fixAnchor(anchor) {
    if (!anchor || anchor.dataset.marketNavFixed === "1") return;
    const raw = String(anchor.getAttribute("href") || "").trim();
    if (!raw) return;

    if (isBoutiquesLink(anchor)) {
      const target = new URL("./index.html", location.href);
      target.searchParams.set("lang", currentLang());
      target.hash = "boutiques";
      anchor.setAttribute("href", target.toString());
      anchor.dataset.marketTarget = "boutiques";
    } else {
      const fixed = addLang(raw);
      if (fixed && fixed !== raw) anchor.setAttribute("href", fixed);
    }

    anchor.dataset.marketNavFixed = "1";
  }

  function fixAll(root = document) {
    root.querySelectorAll?.("a[href]").forEach(fixAnchor);
  }

  document.addEventListener("click", (event) => {
    const anchor = event.target.closest?.("a[href]");
    if (!anchor) return;
    fixAnchor(anchor);

    if (isBoutiquesLink(anchor) && goToBoutiques(event)) return;

    try {
      const url = new URL(anchor.href, location.href);
      if (url.hostname === "market.digiylyfe.com" && url.pathname.endsWith("/shop.html") && !url.searchParams.get("slug")) {
        event.preventDefault();
        if (!goToBoutiques()) {
          const fallback = new URL("./index.html", location.href);
          fallback.searchParams.set("lang", currentLang());
          fallback.hash = "boutiques";
          location.assign(fallback.toString());
        }
      }
    } catch (_) {}
  }, true);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        if (node.matches?.("a[href]")) fixAnchor(node);
        fixAll(node);
      });
    }
  });

  function install() {
    saveLang(currentLang());
    fixAll();
    observer.observe(document.documentElement, { childList: true, subtree: true });
    if (location.hash === "#boutiques") {
      let attempts = 0;
      const timer = setInterval(() => {
        attempts += 1;
        if (goToBoutiques() || attempts >= 30) clearInterval(timer);
      }, 120);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
})();
/* =========================
   DIGIY GUARD — UNIVERSAL
   Slug + PIN -> token 30j -> Session locale
   + Slug sticky (URL ?slug=)
   + Refresh silencieux (RPC)
   + GitHub Pages friendly
========================= */
(function () {
  "use strict";

  // =============================
  // CONFIG
  // =============================
  const SUPABASE_URL = "https://wesqmwjjtsefyjnluosj.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indlc3Ftd2pqdHNlZnlqbmx1b3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNzg4ODIsImV4cCI6MjA4MDc1NDg4Mn0.dZfYOc2iL2_wRYL3zExZFsFSBK6AbMeOid2LrIjcTdA";

  // RPC names (change if needed)
  const RPC_ISSUE = "caisse_issue_token_v1";
  const RPC_REFRESH = "caisse_refresh_token_v1";

  // Session storage
  const SESSION_KEY = "DIGIY_SESSION";
  const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 jours

  // =============================
  // TIME
  // =============================
  function now() { return Date.now(); }

  // =============================
  // Base path (GitHub Pages safe)
  // =============================
  function digiyBasePath() {
    const parts = location.pathname.split("/").filter(Boolean);
    const isGh = /\.github\.io$/i.test(location.hostname);
    if (isGh && parts.length > 0) return "/" + parts[0] + "/";
    return "/";
  }
  function digiyLocal(path) {
    path = String(path || "").replace(/^\/+/, "");
    return digiyBasePath() + path;
  }

  // =============================
  // SLUG sticky
  // =============================
  function getSlugFromUrl() {
    try { return (new URL(location.href)).searchParams.get("slug"); }
    catch { return null; }
  }
  function getStickySlug() {
    const u = (getSlugFromUrl() || "").trim();
    if (u) {
      sessionStorage.setItem("DIGIY_LAST_SLUG", u);
      return u;
    }
    return (sessionStorage.getItem("DIGIY_LAST_SLUG") || "").trim();
  }
  function withSlug(url) {
    const slug = getStickySlug();
    if (!slug) return url;
    return url.includes("?")
      ? url + "&slug=" + encodeURIComponent(slug)
      : url + "?slug=" + encodeURIComponent(slug);
  }

  // =============================
  // SESSION
  // =============================
  function getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (!s || !s.expires_at) return null;

      // TTL local
      if (now() > s.expires_at) return null;

      return s;
    } catch {
      return null;
    }
  }

  function setSession(data) {
    const session = {
      ...data,
      created_at: now(),
      expires_at: now() + SESSION_TTL_MS
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  // =============================
  // SUPABASE client
  // =============================
  function getSb() {
    if (!window.supabase?.createClient) return null;
    if (!window.__digiy_sb__) {
      window.__digiy_sb__ = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { persistSession: false },
        global: { headers: { "X-Client-Info": "digiy-guard-universal" } }
      });
    }
    return window.__digiy_sb__;
  }

  // =============================
  // Helpers
  // =============================
  function safeJson(x) {
    if (x == null) return null;
    if (typeof x === "object") return x;
    const s = String(x);
    try { return JSON.parse(s); } catch { return { ok: false, error: s }; }
  }

  // =============================
  // LOGIN: slug + pin -> token 30j
  // =============================
  async function loginWithPin(slug, pin) {
    const sb = getSb();
    if (!sb) return { ok: false, error: "Supabase non initialisé (script supabase-js manquant)" };

    slug = (slug || "").trim();
    pin = (pin || "").trim();

    if (!slug || !pin) return { ok: false, error: "Slug et PIN requis" };

    // keep slug sticky
    sessionStorage.setItem("DIGIY_LAST_SLUG", slug);

    const { data, error } = await sb.rpc(RPC_ISSUE, { p_slug: slug, p_pin: pin });
    if (error) return { ok: false, error: error.message };

    const result = safeJson(data);

    if (!result?.ok || !result?.owner_id || !result?.token) {
      return { ok: false, error: result?.error || "PIN invalide" };
    }

    const session = setSession({
      ok: true,
      owner_id: result.owner_id,
      slug: result.slug || slug,
      title: result.title || "",
      phone: result.phone || "",
      token: result.token,
      server_expires_at: result.expires_at || null
    });

    return { ok: true, session };
  }

  // =============================
  // REFRESH TOKEN (silencieux)
  // =============================
  async function refreshTokenIfNeeded() {
    const sb = getSb();
    if (!sb) return { ok: false, error: "no-supabase" };

    const s = getSession();
    if (!s?.token) return { ok: false, error: "no-session" };

    try {
      const { data, error } = await sb.rpc(RPC_REFRESH, { p_token: s.token });
      if (error) return { ok: false, error: error.message };

      const r = safeJson(data);

      // si le serveur renvoie une nouvelle date d’expiration
      if (r?.ok && r?.expires_at) {
        setSession({ ...s, server_expires_at: r.expires_at });
      }

      return r || { ok: true };
    } catch (e) {
      return { ok: false, error: e?.message || String(e) };
    }
  }

  // =============================
  // REQUIRE SESSION (protect pages)
  // =============================
  function requireSession(redirect = "pin.html") {
    const s = getSession();
    if (!s || !s.owner_id || !s.token) {
      location.replace(withSlug(digiyLocal(redirect)));
      return null;
    }
    return s;
  }

  // =============================
  // BOOT (call on protected pages)
  // =============================
  async function boot(options) {
    const redirect = options?.login || "pin.html";
    const s = requireSession(redirect);
    if (!s) return { ok: false };

    // refresh silencieux (non bloquant)
    refreshTokenIfNeeded();

    return { ok: true, session: s };
  }

  // =============================
  // LOGOUT
  // =============================
  function logout(redirect = "pin.html") {
    clearSession();
    location.replace(withSlug(digiyLocal(redirect)));
  }

  // =============================
  // EXPORT
  // =============================
  window.DIGIY_GUARD = {
    boot,
    loginWithPin,
    refreshTokenIfNeeded,
    requireSession,
    logout,
    getSession,
    getSb,
    withSlug,
    digiyLocal
  };
})();

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
MARKER = "<!-- DIGIY MARKET — navigation publique fiabilisée -->"
NAV_TAG = f'{MARKER}\n<script src="./assets/js/market-public-navigation-fix.js?v=20260731-routes-v1"></script>'


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def write(path: str, text: str) -> None:
    (ROOT / path).write_text(text, encoding="utf-8")


def add_before_body(path: str) -> None:
    text = read(path)
    if "market-public-navigation-fix.js" in text:
        return
    if "</body>" not in text:
        raise RuntimeError(f"Balise </body> absente dans {path}")
    text = text.replace("</body>", f"  {NAV_TAG}\n</body>", 1)
    write(path, text)


# 1) Cartouche : les deux portes publiques amènent à la vraie galerie de fiches.
cartouche_path = "assets/js/market-portes-cartouche.js"
cartouche = read(cartouche_path)
cartouche = cartouche.replace(
    '<a href="${withLang("./index.html")}"><b>🛍️ ${t.gallery}</b><small>MARKET PUBLIC</small></a>',
    '<a data-market-target="boutiques" href="${withLang("./index.html#boutiques")}"><b>🛍️ ${t.gallery}</b><small>MARKET PUBLIC</small></a>'
)
cartouche = cartouche.replace(
    '<a href="${withLang("./fiche.html")}"><b>🪪 ${t.profile}</b><small>FICHE MARKET</small></a>',
    '<a data-market-target="boutiques" href="${withLang("./index.html#boutiques")}"><b>🪪 ${t.profile}</b><small>CHOISIR UNE FICHE</small></a>'
)
if cartouche.count('data-market-target="boutiques"') < 2:
    raise RuntimeError("Les deux portes boutiques n’ont pas été corrigées")
write(cartouche_path, cartouche)


# 2) Galerie : fiabiliser la création du slug et conserver la langue dans Voir / Commander.
app_path = "app.html"
app = read(app_path)
old_slug = '''      function shopSlug(shop){
        const direct = norm(shop.slug || shop.workspace_slug || shop.last_slug);
        if(direct) return direct;

        const p = digits(shop.whatsapp || shop.public_phone);
        return p ? "market-" + p : "";
      }'''
new_slug = '''      function shopSlug(shop){
        const direct = norm(
          shop.slug ||
          shop.workspace_slug ||
          shop.shop_slug ||
          shop.market_slug ||
          shop.public_slug ||
          shop.subscription_slug ||
          shop.pro_slug ||
          shop.identifiant ||
          shop.last_slug
        );
        if(direct) return direct;

        const p = digits(
          (typeof shopPhone === "function" ? shopPhone(shop) : "") ||
          shop.whatsapp ||
          shop.public_phone ||
          shop.phone ||
          shop.tel ||
          shop.contact_phone ||
          shop.owner_phone
        );
        return p ? "market-" + p : "";
      }'''
if old_slug in app:
    app = app.replace(old_slug, new_slug, 1)
elif "shop.subscription_slug" not in app:
    raise RuntimeError("Bloc shopSlug introuvable")

old_shop_url = '''      function shopUrl(shop){
        const slug = shopSlug(shop);
        const u = new URL("/shop.html", MARKET_ORIGIN);
        if(slug) u.searchParams.set("slug", slug);
        return u.toString();
      }'''
new_shop_url = '''      function publicRouteLang(){
        const supported=["fr","en","es","de","it","nl","ar"];
        try{
          const q=String(new URLSearchParams(location.search).get("lang")||"").toLowerCase();
          if(supported.includes(q))return q;
          const s=String(localStorage.getItem("digiy-market-lang")||localStorage.getItem("digiy-lang")||"").toLowerCase();
          if(supported.includes(s))return s;
        }catch(_){}
        return "fr";
      }

      function shopUrl(shop){
        const slug = shopSlug(shop);
        const u = new URL("/shop.html", MARKET_ORIGIN);
        if(slug) u.searchParams.set("slug", slug);
        u.searchParams.set("lang", publicRouteLang());
        if(!slug) u.hash = "boutiques";
        return u.toString();
      }'''
if old_shop_url in app:
    app = app.replace(old_shop_url, new_shop_url, 1)
elif "function publicRouteLang" not in app:
    raise RuntimeError("Bloc shopUrl introuvable")

old_commander = '''      function commanderUrl(shop){
        const slug = shopSlug(shop);
        const u = new URL("/commander.html", MARKET_ORIGIN);
        if(slug) u.searchParams.set("slug", slug);
        return u.toString();
      }'''
new_commander = '''      function commanderUrl(shop){
        const slug = shopSlug(shop);
        const u = new URL(slug ? "/commander.html" : "/index.html", MARKET_ORIGIN);
        if(slug) u.searchParams.set("slug", slug);
        u.searchParams.set("lang", publicRouteLang());
        if(!slug) u.hash = "boutiques";
        return u.toString();
      }'''
if old_commander in app:
    app = app.replace(old_commander, new_commander, 1)
elif 'new URL(slug ? "/commander.html" : "/index.html"' not in app:
    raise RuntimeError("Bloc commanderUrl introuvable")

if "market-public-navigation-fix.js" not in app:
    app = app.replace("</body>", f"  {NAV_TAG}\n</body>", 1)
write(app_path, app)


# 3) Redirection Voir : conserver langue et revenir aux boutiques si l’identifiant manque.
shop_html = '''<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <title>Redirection DIGIY MARKET</title>
</head>
<body>
  <p>Redirection vers la fiche boutique…</p>
  <script>
  (()=>{
    const supported=["fr","en","es","de","it","nl","ar"];
    const params=new URLSearchParams(location.search);
    const slug=String(params.get("slug")||"").trim();
    let lang=String(params.get("lang")||"").toLowerCase();
    try{
      if(!supported.includes(lang))lang=String(localStorage.getItem("digiy-market-lang")||localStorage.getItem("digiy-lang")||"").toLowerCase();
    }catch(_){}
    if(!supported.includes(lang))lang="fr";
    const target=new URL(slug?"./fiche.html":"./index.html",location.href);
    target.searchParams.set("lang",lang);
    if(slug)target.searchParams.set("slug",slug);else target.hash="boutiques";
    location.replace(target.pathname+target.search+target.hash);
  })();
  </script>
</body>
</html>
'''
write("shop.html", shop_html)


# 4) Index : garde-fou actif avant et après le chargement dynamique.
index_path = "index.html"
index = read(index_path)
if "market-public-navigation-fix.js" not in index:
    needle = '<script src="./assets/js/market-portes-cartouche.js?v=20260731-index"></script>'
    if needle not in index:
        raise RuntimeError("Script cartouche absent de index.html")
    index = index.replace(needle, needle + '\n  <script src="./assets/js/market-public-navigation-fix.js?v=20260731-routes-v1"></script>', 1)
index = index.replace("app.html?v=20260730-market7g", "app.html?v=20260731-market-routes-v1")
write(index_path, index)


# 5) Toutes les pages publiques conservent désormais les routes et la langue.
for page in ["fiche.html", "commander.html", "inscription-market.html", "lexique-market.html"]:
    if (ROOT / page).exists():
        add_before_body(page)

print("MARKET public : routes, ancres, fiches et inscription corrigées.")

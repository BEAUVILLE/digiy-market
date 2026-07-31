from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
import re
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
PAGES = [
    "index.html",
    "app.html",
    "fiche.html",
    "shop.html",
    "commander.html",
    "inscription-market.html",
    "lexique-market.html",
]


class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []
        self.ids = set()
        self.scripts = []
        self._script_attrs = None
        self._script_data = []

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if "id" in data:
            self.ids.add(data["id"])
        if tag == "a" and data.get("href"):
            self.hrefs.append(data["href"])
        if tag == "script":
            self._script_attrs = data
            self._script_data = []

    def handle_data(self, data):
        if self._script_attrs is not None:
            self._script_data.append(data)

    def handle_endtag(self, tag):
        if tag == "script" and self._script_attrs is not None:
            attrs = self._script_attrs
            body = "".join(self._script_data)
            if not attrs.get("src") and attrs.get("type", "").lower() not in {"application/ld+json", "application/json"}:
                self.scripts.append(body)
            self._script_attrs = None
            self._script_data = []


def node_check(label: str, content: str) -> None:
    if not content.strip():
        return
    with tempfile.NamedTemporaryFile("w", encoding="utf-8", suffix=".js", delete=False) as tmp:
        tmp.write(content)
        path = tmp.name
    result = subprocess.run(["node", "--check", path], capture_output=True, text=True)
    Path(path).unlink(missing_ok=True)
    if result.returncode:
        raise RuntimeError(f"JavaScript invalide dans {label}:\n{result.stderr}")


for page in PAGES:
    path = ROOT / page
    if not path.exists():
        raise RuntimeError(f"Page publique absente : {page}")
    text = path.read_text(encoding="utf-8")
    parser = Parser()
    parser.feed(text)

    for href in parser.hrefs:
        if href == "#" or href.startswith(("mailto:", "tel:", "sms:", "javascript:")):
            continue
        if href.startswith("#"):
            anchor = href[1:]
            if anchor and anchor not in parser.ids:
                raise RuntimeError(f"Ancre locale absente dans {page}: {href}")
            continue
        parsed = urlparse(href)
        if parsed.scheme in {"http", "https"} and parsed.netloc not in {"market.digiylyfe.com", ""}:
            continue
        local_path = parsed.path.lstrip("/")
        if not local_path or local_path.endswith("/"):
            local_path += "index.html"
        if local_path.endswith(".html") and not (ROOT / local_path).exists():
            raise RuntimeError(f"Lien local cassé dans {page}: {href}")

    for index, script in enumerate(parser.scripts, start=1):
        node_check(f"{page} script #{index}", script)

for js in [
    "assets/js/market-portes-cartouche.js",
    "assets/js/market-public-navigation-fix.js",
    "assets/js/market-secondary-i18n-data.js",
    "assets/js/market-secondary-i18n-extra.js",
    "assets/js/market-secondary-i18n.js",
]:
    path = ROOT / js
    if path.exists():
        node_check(js, path.read_text(encoding="utf-8"))

cartouche = (ROOT / "assets/js/market-portes-cartouche.js").read_text(encoding="utf-8")
if cartouche.count('data-market-target="boutiques"') < 2:
    raise RuntimeError("La cartouche ne dirige pas ses deux portes publiques vers les boutiques")
if "inscription-market.html" not in cartouche:
    raise RuntimeError("La porte inscription manque dans la cartouche")

app = (ROOT / "app.html").read_text(encoding="utf-8")
for anchor in ["boutiques", "exemples-market", "doctrine-market-pro"]:
    if not re.search(rf'id=["\']{re.escape(anchor)}["\']', app):
        raise RuntimeError(f"Ancre essentielle absente de app.html : #{anchor}")
if "shop.subscription_slug" not in app or "shopPhone(shop)" not in app:
    raise RuntimeError("La résolution robuste des identifiants boutique manque")
if 'u.searchParams.set("lang", publicRouteLang())' not in app:
    raise RuntimeError("Voir / Commander ne conservent pas la langue")

shop = (ROOT / "shop.html").read_text(encoding="utf-8")
if 'slug?"./fiche.html":"./index.html"' not in shop or 'target.hash="boutiques"' not in shop:
    raise RuntimeError("La redirection shop.html n’est pas sûre")

for page in ["index.html", "app.html", "fiche.html", "commander.html", "inscription-market.html"]:
    text = (ROOT / page).read_text(encoding="utf-8")
    if "market-public-navigation-fix.js" not in text:
        raise RuntimeError(f"Garde-fou de navigation absent : {page}")

print("AUDIT MARKET PUBLIC OK : fichiers, ancres, inscription, fiches, commandes et scripts validés.")

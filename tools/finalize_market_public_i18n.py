from pathlib import Path

EXTRA_TAG = '  <script src="./assets/js/market-secondary-i18n-extra.js?v=20260731"></script>\n'
DATA_TAG = '  <script src="./assets/js/market-secondary-i18n-data.js?v=20260731"></script>\n'
ENGINE_TAG = '  <script src="./assets/js/market-secondary-i18n.js?v=20260731"></script>\n'

changed = False
for filename in ["fiche.html", "inscription-market.html"]:
    path = Path(filename)
    source = path.read_text(encoding="utf-8")
    if "market-secondary-i18n-extra.js" not in source:
        needle = DATA_TAG + ENGINE_TAG
        replacement = DATA_TAG + EXTRA_TAG + ENGINE_TAG
        if needle not in source:
            raise SystemExit(f"Raccord i18n introuvable: {filename}")
        source = source.replace(needle, replacement, 1)
        path.write_text(source, encoding="utf-8")
        changed = True
        print(f"MESSAGES COMPLETS: {filename}")

path = Path("inscription-market.html")
source = path.read_text(encoding="utf-8")
old = 'function date(){return new Date().toLocaleString(window.DIGIY_MARKET_LOCALE||"fr-FR",{dateStyle:"full",timeStyle:"short"})}'
new = 'function date(){const locales={fr:"fr-FR",en:"en-US",es:"es-ES",de:"de-DE",it:"it-IT",nl:"nl-NL",ar:"ar-SA"};let code="fr";try{const q=String(new URLSearchParams(location.search).get("lang")||"").toLowerCase();const s=String(localStorage.getItem("digiy-market-lang")||localStorage.getItem("digiy-lang")||"").toLowerCase();code=locales[q]?q:locales[s]?s:"fr"}catch(_){}return new Date().toLocaleString(locales[code],{dateStyle:"full",timeStyle:"short"})}'
if old in source:
    source = source.replace(old, new, 1)
    path.write_text(source, encoding="utf-8")
    changed = True
    print("DATE INITIALISÉE DANS LA BONNE LANGUE")
elif new not in source:
    raise SystemExit("Fonction date MARKET introuvable")

print("MARKET PUBLIC FINALISÉ" if changed else "AUCUNE MODIFICATION NÉCESSAIRE")

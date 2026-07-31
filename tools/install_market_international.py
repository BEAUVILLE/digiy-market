from pathlib import Path

SECONDARY = ["fiche.html", "inscription-market.html"]
SECONDARY_MARKER = "<!-- DIGIY MARKET — pages secondaires internationales 7 langues -->"
SECONDARY_TAGS = """
  <!-- DIGIY MARKET — pages secondaires internationales 7 langues -->
  <script src="./assets/js/market-secondary-i18n-data.js?v=20260731"></script>
  <script src="./assets/js/market-secondary-i18n.js?v=20260731"></script>
"""
DOORS_MARKER = "<!-- DIGIY MARKET — menu central multilingue -->"
DOORS_TAGS = """
  <!-- DIGIY MARKET — menu central multilingue -->
  <script src="./assets/js/market-portes-cartouche.js?v=20260731"></script>
"""


def inject(path: Path, marker: str, tags: str) -> bool:
    if not path.exists():
        raise SystemExit(f"Fichier absent: {path}")
    source = path.read_text(encoding="utf-8")
    if marker in source:
        return False
    if "</body>" not in source:
        raise SystemExit(f"Balise </body> absente: {path}")
    source = source.replace("</body>", tags + "</body>", 1)
    path.write_text(source, encoding="utf-8")
    print(f"INSTALLÉ: {path}")
    return True


changed = inject(Path("app.html"), DOORS_MARKER, DOORS_TAGS)
for filename in SECONDARY:
    changed |= inject(Path(filename), SECONDARY_MARKER, SECONDARY_TAGS)

inscription = Path("inscription-market.html")
source = inscription.read_text(encoding="utf-8")
replacements = [
    (
        'function date(){return new Date().toLocaleString("fr-FR",{dateStyle:"full",timeStyle:"short"})}',
        'function date(){return new Date().toLocaleString(window.DIGIY_MARKET_LOCALE||"fr-FR",{dateStyle:"full",timeStyle:"short"})}'
    ),
    (
        'window.location.href=buildSmsHref(smsMsg());',
        'const rawMessage=smsMsg();const translatedMessage=typeof window.DIGIY_MARKET_TRANSLATE_MESSAGE==="function"?window.DIGIY_MARKET_TRANSLATE_MESSAGE(rawMessage):rawMessage;window.location.href=buildSmsHref(translatedMessage);'
    ),
    (
        'const u=new SpeechSynthesisUtterance(speakText());u.lang="fr-FR";',
        'const rawSpeech=speakText();const spoken=typeof window.DIGIY_MARKET_TRANSLATE_MESSAGE==="function"?window.DIGIY_MARKET_TRANSLATE_MESSAGE(rawSpeech):rawSpeech;const u=new SpeechSynthesisUtterance(spoken);u.lang=window.DIGIY_MARKET_LOCALE||"fr-FR";'
    )
]
for old, new in replacements:
    if new in source:
        continue
    if old not in source:
        raise SystemExit(f"Motif inscription introuvable: {old[:70]}")
    source = source.replace(old, new, 1)
    changed = True
inscription.write_text(source, encoding="utf-8")

print("MARKET PUBLIC INTERNATIONAL PRÊT" if changed else "AUCUNE MODIFICATION NÉCESSAIRE")

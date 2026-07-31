from pathlib import Path

path = Path(__file__).resolve().parents[1] / "index.html"
text = path.read_text(encoding="utf-8")
text = text.replace(
    "market-portes-cartouche.js?v=20260731-index",
    "market-portes-cartouche.js?v=20260731-routes-v2"
)
text = text.replace(
    "app.html?v=20260731-market-index-cartouche",
    "app.html?v=20260731-market-routes-v2"
)
path.write_text(text, encoding="utf-8")
print("Cache MARKET : cartouche et application forcées en routes-v2.")

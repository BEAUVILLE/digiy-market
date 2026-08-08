(()=>{
'use strict';
const ID='digiy-market-featured-partners';
const LANGS=['fr','en','es','de','it','nl','ar'];
const T={
fr:{label:'Boutique partenaire active',shop:'Voir la boutique',order:'Commander',commission:'0 % de commission',astou:'Linge de maison, draps, serviettes, peignoirs, robes stylées et achats accompagnés par vidéo WhatsApp.',bcheikh:'Tee-shirts, polos et caleçons à prix clairs. Commande directe, paiement au vendeur et zéro commission DIGIY.'},
en:{label:'Active partner shop',shop:'View shop',order:'Order',commission:'0% commission',astou:'Home linen, sheets, towels, bathrobes, stylish dresses and assisted shopping by WhatsApp video.',bcheikh:'T-shirts, polos and underwear with clear prices. Direct ordering, payment to the seller and zero DIGIY commission.'},
es:{label:'Tienda asociada activa',shop:'Ver tienda',order:'Pedir',commission:'0 % de comisión',astou:'Ropa de hogar, sábanas, toallas, albornoces, vestidos y compras asistidas por vídeo de WhatsApp.',bcheikh:'Camisetas, polos y ropa interior con precios claros. Pedido directo, pago al vendedor y cero comisión DIGIY.'},
de:{label:'Aktiver Partnershop',shop:'Shop ansehen',order:'Bestellen',commission:'0 % Provision',astou:'Heimtextilien, Bettwäsche, Handtücher, Bademäntel, Kleider und Einkauf per WhatsApp-Video.',bcheikh:'T-Shirts, Polos und Unterwäsche mit klaren Preisen. Direktbestellung, Zahlung an den Verkäufer und null DIGIY-Provision.'},
it:{label:'Negozio partner attivo',shop:'Vedi negozio',order:'Ordina',commission:'0% commissioni',astou:'Biancheria casa, lenzuola, asciugamani, accappatoi, abiti e acquisti assistiti tramite video WhatsApp.',bcheikh:'T-shirt, polo e biancheria intima con prezzi chiari. Ordine diretto, pagamento al venditore e zero commissioni DIGIY.'},
nl:{label:'Actieve partnerwinkel',shop:'Bekijk winkel',order:'Bestellen',commission:'0% commissie',astou:'Huishoudtextiel, lakens, handdoeken, badjassen, jurken en begeleid winkelen via WhatsApp-video.',bcheikh:'T-shirts, polo’s en ondergoed met duidelijke prijzen. Direct bestellen, betalen aan de verkoper en nul DIGIY-commissie.'},
ar:{label:'متجر شريك نشط',shop:'فتح المتجر',order:'اطلب',commission:'0٪ عمولة',astou:'أغطية ومفروشات ومناشف وأرواب وملابس مع مساعدة في الشراء عبر فيديو واتساب.',bcheikh:'قمصان وبولو وملابس داخلية بأسعار واضحة. طلب مباشر ودفع للبائع وبدون عمولة DIGIY.'}
};
const PARTNERS=[
  {key:'astou',name:'Astou Market · Saly',image:'https://astou-boutique.digiylyfe.com/ASTOU_BOUTIQUE_CARTE_VISITE_DIGIY.png',shop:'https://astou-boutique.digiylyfe.com/?lang=fr',order:'https://market.digiylyfe.com/commander.html?slug=market-221771342889&lang=fr',wa:'https://wa.me/221778765785?text='+encodeURIComponent('Bonjour 👋 Je viens de DIGIY MARKET. Je souhaite des informations sur les produits de Astou Market.'),meta:['📍 Saly','💬 +221 77 876 57 85']},
  {key:'bcheikh',name:'BCHEIKH · Saly',image:'https://bcheikh.digiylyfe.com/carte-visite.png',shop:'https://bcheikh.digiylyfe.com/',order:'https://market.digiylyfe.com/commander.html?slug=bcheikh&lang=fr',wa:'https://wa.me/221786523129?text='+encodeURIComponent('Bonjour 👋 Je viens de DIGIY MARKET. Je souhaite des informations sur les produits de BCHEIKH.'),meta:['📍 Saly · Mbour · Petite Côte','💬 +221 78 652 31 29']}
];
function lang(){const p=(location.pathname.split('/').filter(Boolean)[0]||'').toLowerCase();if(LANGS.includes(p))return p;const h=(document.documentElement.lang||'').slice(0,2).toLowerCase();if(LANGS.includes(h))return h;try{const s=localStorage.getItem('digiy-lang');if(LANGS.includes(s))return s}catch(_){ }return 'fr'}
function withLang(raw,l){try{const u=new URL(raw);u.searchParams.set('lang',l);return u.toString()}catch(_){return raw}}
function style(){if(document.getElementById(ID+'-style'))return;const s=document.createElement('style');s.id=ID+'-style';s.textContent=`
#${ID}{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:14px 0 16px}
#${ID} .fp-card{padding:16px;border-radius:26px;border:2px solid rgba(214,173,57,.42);background:linear-gradient(135deg,rgba(255,255,255,.97),rgba(255,247,232,.93));box-shadow:0 16px 40px rgba(6,59,43,.13)}
#${ID} .fp-label{display:inline-flex;min-height:30px;align-items:center;padding:0 10px;border-radius:999px;background:rgba(214,173,57,.16);border:1px solid rgba(214,173,57,.34);color:#6b4d09;font-size:.75rem;font-weight:1000;letter-spacing:.05em;text-transform:uppercase}
#${ID} .fp-grid{display:grid;grid-template-columns:150px 1fr;gap:16px;align-items:center;margin-top:12px}
#${ID} .fp-card img{width:150px;aspect-ratio:9/16;object-fit:contain;border-radius:20px;border:1px solid rgba(6,59,43,.12);background:#07140f}
#${ID} h3{margin:0 0 5px;color:#063b2b;font-size:1.55rem;line-height:1.05;font-weight:1000}
#${ID} p{margin:0;color:#4f5f58;line-height:1.48;font-weight:780}
#${ID} .fp-meta{display:flex;gap:7px;flex-wrap:wrap;margin:10px 0}
#${ID} .fp-meta span{padding:7px 9px;border-radius:999px;background:rgba(6,59,43,.07);border:1px solid rgba(6,59,43,.09);font-size:.78rem;font-weight:950;color:#31483d}
#${ID} .fp-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
#${ID} .fp-actions a{min-height:44px;display:inline-flex;align-items:center;justify-content:center;padding:0 13px;border-radius:999px;text-decoration:none;font-size:.84rem;font-weight:1000}
#${ID} .fp-main{background:linear-gradient(135deg,#063b2b,#0b5a41);color:#fff}
#${ID} .fp-gold{background:linear-gradient(135deg,#f4cf64,#d6ad39);color:#2d2308}
#${ID} .fp-soft{background:#fff;color:#063b2b;border:1px solid rgba(6,59,43,.13)}
#${ID}[dir="rtl"]{text-align:right}
@media(max-width:900px){#${ID}{grid-template-columns:1fr}}
@media(max-width:620px){#${ID} .fp-grid{grid-template-columns:92px 1fr;align-items:start}#${ID} .fp-card img{width:92px;border-radius:16px}#${ID} h3{font-size:1.35rem}#${ID} .fp-actions{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr}#${ID} .fp-actions a:last-child{grid-column:1/-1}}
`;document.head.appendChild(s)}
function ensure(){if(document.getElementById(ID))return true;const panel=document.querySelector('#boutiques > .panel');if(!panel)return false;style();const l=lang(),x=T[l]||T.fr;const box=document.createElement('section');box.id=ID;if(l==='ar')box.dir='rtl';box.setAttribute('aria-label','Partenaires actifs DIGIY MARKET');box.innerHTML=PARTNERS.map(p=>`<article class="fp-card"><span class="fp-label">${x.label}</span><div class="fp-grid"><a href="${withLang(p.shop,l)}" target="_blank" rel="noopener"><img src="${p.image}" alt="Carte de visite ${p.name}" loading="lazy"></a><div><h3>${p.name}</h3><p>${x[p.key]}</p><div class="fp-meta"><span>${p.meta[0]}</span><span>${p.meta[1]}</span><span>${x.commission}</span></div><div class="fp-actions"><a class="fp-main" href="${withLang(p.shop,l)}" target="_blank" rel="noopener">${x.shop}</a><a class="fp-gold" href="${withLang(p.order,l)}" target="_blank" rel="noopener">${x.order}</a><a class="fp-soft" href="${p.wa}" target="_blank" rel="noopener">WhatsApp</a></div></div></div></article>`).join('');const controls=panel.querySelector('.controls');panel.insertBefore(box,controls||panel.firstChild);return true}
if(!ensure()){const obs=new MutationObserver(()=>{if(ensure())obs.disconnect()});obs.observe(document.documentElement,{childList:true,subtree:true});setTimeout(()=>obs.disconnect(),15000)}
})();
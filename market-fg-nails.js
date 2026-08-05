(()=>{
'use strict';
const ID='fg-nails-market-featured';
const BASE='https://f-g-nails.digiylyfe.com/';
const IMAGE=BASE+'fg-nails-carte-officielle.webp';
const LANGS=['fr','en','es','de','it','nl','ar'];
const T={
fr:{label:'Boutique partenaire active',desc:'Onglerie, soins de beauté, massage modelant, lipocavitation ventre et produits d’hygiène femme et homme. Contact direct avec Fama.',products:'Voir les produits',profile:'Ouvrir la fiche',commission:'0 % de commission',message:'Bonjour FG NAILS, je viens de DIGIY MARKET et je souhaite voir vos produits disponibles.'},
en:{label:'Active partner shop',desc:'Nail care, beauty treatments, body massage, abdominal lipocavitation and hygiene products for women and men. Direct contact with Fama.',products:'View products',profile:'Open profile',commission:'0% commission',message:'Hello FG NAILS, I found you on DIGIY MARKET and would like to see the available products.'},
es:{label:'Tienda asociada activa',desc:'Manicura, cuidados de belleza, masaje modelador, lipocavitación abdominal y productos de higiene para mujeres y hombres. Contacto directo con Fama.',products:'Ver productos',profile:'Abrir la ficha',commission:'0 % de comisión',message:'Hola FG NAILS, vengo de DIGIY MARKET y deseo ver los productos disponibles.'},
de:{label:'Aktiver Partnershop',desc:'Nagelpflege, Schönheitspflege, Modellagemassage, Lipokavitation am Bauch und Hygieneprodukte für Frauen und Männer. Direkter Kontakt mit Fama.',products:'Produkte ansehen',profile:'Profil öffnen',commission:'0 % Provision',message:'Hallo FG NAILS, ich komme von DIGIY MARKET und möchte die verfügbaren Produkte sehen.'},
it:{label:'Negozio partner attivo',desc:'Unghie, trattamenti di bellezza, massaggio modellante, lipocavitazione addominale e prodotti per l’igiene di donne e uomini. Contatto diretto con Fama.',products:'Vedi prodotti',profile:'Apri la scheda',commission:'0% commissioni',message:'Buongiorno FG NAILS, vi ho trovato su DIGIY MARKET e vorrei vedere i prodotti disponibili.'},
nl:{label:'Actieve partnerwinkel',desc:'Nagelverzorging, schoonheidsbehandelingen, modelmassage, lipocavitatie voor de buik en hygiëneproducten voor vrouwen en mannen. Direct contact met Fama.',products:'Bekijk producten',profile:'Profiel openen',commission:'0% commissie',message:'Hallo FG NAILS, ik kom via DIGIY MARKET en wil graag de beschikbare producten zien.'},
ar:{label:'متجر شريك نشط',desc:'العناية بالأظافر وخدمات التجميل والتدليك وليبـوكافيتيشن البطن ومنتجات النظافة للنساء والرجال. تواصل مباشر مع فاما.',products:'عرض المنتجات',profile:'فتح الصفحة',commission:'0٪ عمولة',message:'مرحبًا FG NAILS، وصلت إليكم عبر DIGIY MARKET وأرغب في رؤية المنتجات المتوفرة.'}
};
function lang(){
  const path=(location.pathname.split('/').filter(Boolean)[0]||'').toLowerCase();
  if(LANGS.includes(path))return path;
  const html=(document.documentElement.lang||'').slice(0,2).toLowerCase();
  if(LANGS.includes(html))return html;
  try{const saved=localStorage.getItem('digiy-lang');if(LANGS.includes(saved))return saved}catch(_){ }
  return 'fr';
}
function url(path,l){const u=new URL(path,BASE);u.searchParams.set('lang',l);return u.toString()}
function addStyle(){
  if(document.getElementById(ID+'-style'))return;
  const style=document.createElement('style');style.id=ID+'-style';style.textContent=`
  #${ID}{margin:14px 0 16px;padding:16px;border-radius:26px;border:2px solid rgba(214,173,57,.48);background:linear-gradient(135deg,rgba(255,255,255,.96),rgba(255,247,232,.92));box-shadow:0 16px 40px rgba(6,59,43,.13)}
  #${ID} .fg-label{display:inline-flex;min-height:30px;align-items:center;padding:0 10px;border-radius:999px;background:rgba(214,173,57,.16);border:1px solid rgba(214,173,57,.34);color:#6b4d09;font-size:.75rem;font-weight:1000;letter-spacing:.05em;text-transform:uppercase}
  #${ID} .fg-grid{display:grid;grid-template-columns:150px 1fr;gap:16px;align-items:center;margin-top:12px}
  #${ID} img{width:150px;aspect-ratio:9/16;object-fit:cover;border-radius:20px;border:1px solid rgba(6,59,43,.12);background:#f4ead7}
  #${ID} h3{margin:0 0 5px;color:#063b2b;font-size:1.65rem;line-height:1.05;font-weight:1000}
  #${ID} p{margin:0;color:#4f5f58;line-height:1.48;font-weight:780}
  #${ID} .fg-meta{display:flex;gap:7px;flex-wrap:wrap;margin:10px 0}
  #${ID} .fg-meta span{padding:7px 9px;border-radius:999px;background:rgba(6,59,43,.07);border:1px solid rgba(6,59,43,.09);font-size:.78rem;font-weight:950;color:#31483d}
  #${ID} .fg-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
  #${ID} .fg-actions a{min-height:44px;display:inline-flex;align-items:center;justify-content:center;padding:0 13px;border-radius:999px;text-decoration:none;font-size:.84rem;font-weight:1000}
  #${ID} .fg-main{background:linear-gradient(135deg,#063b2b,#0b5a41);color:#fff}
  #${ID} .fg-gold{background:linear-gradient(135deg,#f4cf64,#d6ad39);color:#2d2308}
  #${ID} .fg-soft{background:#fff;color:#063b2b;border:1px solid rgba(6,59,43,.13)}
  #${ID}[dir="rtl"]{text-align:right}
  @media(max-width:620px){#${ID} .fg-grid{grid-template-columns:92px 1fr;align-items:start}#${ID} img{width:92px;border-radius:16px}#${ID} h3{font-size:1.35rem}#${ID} .fg-actions{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr}#${ID} .fg-actions a:last-child{grid-column:1/-1}}
  `;document.head.appendChild(style);
}
function ensure(){
  if(document.getElementById(ID))return true;
  const panel=document.querySelector('#boutiques > .panel');if(!panel)return false;
  addStyle();const l=lang(),x=T[l]||T.fr,profile=url('',l),products=url('hygiene-bien-etre-saly.html',l),whatsapp='https://wa.me/221780127062?text='+encodeURIComponent(x.message);
  const block=document.createElement('section');block.id=ID;if(l==='ar')block.dir='rtl';block.setAttribute('aria-label','FG NAILS · DIGIY MARKET');block.innerHTML=`
  <span class="fg-label">${x.label}</span><div class="fg-grid"><a href="${profile}" target="_blank" rel="noopener"><img src="${IMAGE}" alt="FG NAILS Saly" loading="lazy"></a><div><h3>FG NAILS · Saly</h3><p>${x.desc}</p><div class="fg-meta"><span>📍 Résidence Nafil</span><span>💬 +221 78 012 70 62</span><span>${x.commission}</span></div><div class="fg-actions"><a class="fg-main" href="${products}" target="_blank" rel="noopener">${x.products}</a><a class="fg-gold" href="${profile}" target="_blank" rel="noopener">${x.profile}</a><a class="fg-soft" href="${whatsapp}" target="_blank" rel="noopener">WhatsApp</a></div></div></div>`;
  const controls=panel.querySelector('.controls');panel.insertBefore(block,controls||panel.firstChild);return true;
}
if(!ensure()){const obs=new MutationObserver(()=>{if(ensure())obs.disconnect()});obs.observe(document.documentElement,{childList:true,subtree:true});setTimeout(()=>obs.disconnect(),15000)}
})();

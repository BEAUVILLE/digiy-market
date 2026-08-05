(()=>{
  'use strict';

  const ID='fg-nails-market-featured';
  const PROFILE='https://f-g-nails.digiylyfe.com/';
  const PRODUCTS='https://f-g-nails.digiylyfe.com/hygiene-bien-etre-saly.html';
  const IMAGE='https://f-g-nails.digiylyfe.com/fg-nails-carte-officielle.webp';
  const WHATSAPP='https://wa.me/221780127062?text='+encodeURIComponent('Bonjour FG NAILS, je viens de DIGIY MARKET et je souhaite voir vos produits disponibles.');

  function addStyle(){
    if(document.getElementById(ID+'-style')) return;
    const style=document.createElement('style');
    style.id=ID+'-style';
    style.textContent=`
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
      @media(max-width:620px){#${ID} .fg-grid{grid-template-columns:92px 1fr;align-items:start}#${ID} img{width:92px;border-radius:16px}#${ID} h3{font-size:1.35rem}#${ID} .fg-actions{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr}#${ID} .fg-actions a:last-child{grid-column:1/-1}}
    `;
    document.head.appendChild(style);
  }

  function ensure(){
    if(document.getElementById(ID)) return true;
    const panel=document.querySelector('#boutiques > .panel');
    if(!panel) return false;
    addStyle();
    const lang=(document.documentElement.lang||'fr').toLowerCase();
    const en=lang.startsWith('en');
    const block=document.createElement('section');
    block.id=ID;
    block.setAttribute('aria-label','FG NAILS dans DIGIY MARKET');
    block.innerHTML=`
      <span class="fg-label">${en?'Active partner shop':'Boutique partenaire active'}</span>
      <div class="fg-grid">
        <a href="${PROFILE}" target="_blank" rel="noopener"><img src="${IMAGE}" alt="FG NAILS Saly" loading="lazy"></a>
        <div>
          <h3>FG NAILS · Saly</h3>
          <p>${en?'Nails, beauty care, body treatments and women’s and men’s hygiene products. Direct contact with Fama.':'Onglerie, soins de beauté, massage modelant, lipocavitation et produits d’hygiène femme et homme. Contact direct avec Fama.'}</p>
          <div class="fg-meta"><span>📍 Résidence Nafil</span><span>💬 +221 78 012 70 62</span><span>0% commission</span></div>
          <div class="fg-actions">
            <a class="fg-main" href="${PRODUCTS}" target="_blank" rel="noopener">${en?'View products':'Voir les produits'}</a>
            <a class="fg-gold" href="${PROFILE}" target="_blank" rel="noopener">${en?'Open profile':'Ouvrir la fiche'}</a>
            <a class="fg-soft" href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
      </div>`;
    const controls=panel.querySelector('.controls');
    panel.insertBefore(block,controls||panel.firstChild);
    return true;
  }

  if(!ensure()){
    const obs=new MutationObserver(()=>{if(ensure()) obs.disconnect();});
    obs.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>obs.disconnect(),15000);
  }
})();
(() => {
  "use strict";
  const SUPPORTED=["fr","en","es","de","it","nl","ar"];
  const COPY={
    fr:{kicker:"MENU CENTRAL MARKET",title:"Toutes les portes du module",sub:"Galerie, fiche boutique, inscription vendeur et outils professionnels, sans perdre la langue choisie.",gallery:"Voir les boutiques",profile:"Fiche boutique",register:"Inscrire un vendeur",marketPro:"Accès MARKET PRO",proSpace:"Mon Espace Pro",hub:"Maison DIGIY"},
    en:{kicker:"MARKET CENTRAL MENU",title:"Every door in the module",sub:"Gallery, shop profile, seller registration and professional tools without losing the selected language.",gallery:"View shops",profile:"Shop profile",register:"Register a seller",marketPro:"MARKET PRO access",proSpace:"My Pro Space",hub:"DIGIY home"},
    es:{kicker:"MENÚ CENTRAL MARKET",title:"Todas las puertas del módulo",sub:"Galería, ficha de tienda, inscripción de vendedor y herramientas profesionales sin perder el idioma elegido.",gallery:"Ver tiendas",profile:"Ficha de tienda",register:"Registrar un vendedor",marketPro:"Acceso MARKET PRO",proSpace:"Mi Espacio Pro",hub:"Casa DIGIY"},
    de:{kicker:"MARKET-HAUPTMENÜ",title:"Alle Zugänge des Moduls",sub:"Galerie, Shop-Profil, Verkäuferregistrierung und Profi-Werkzeuge mit beibehaltener Sprache.",gallery:"Shops ansehen",profile:"Shop-Profil",register:"Verkäufer registrieren",marketPro:"MARKET PRO öffnen",proSpace:"Mein Pro-Bereich",hub:"DIGIY Haus"},
    it:{kicker:"MENU CENTRALE MARKET",title:"Tutte le porte del modulo",sub:"Galleria, scheda negozio, iscrizione venditore e strumenti professionali mantenendo la lingua scelta.",gallery:"Vedi negozi",profile:"Scheda negozio",register:"Iscrivi un venditore",marketPro:"Accesso MARKET PRO",proSpace:"Il mio Spazio Pro",hub:"Casa DIGIY"},
    nl:{kicker:"CENTRAAL MARKET-MENU",title:"Alle deuren van de module",sub:"Galerij, winkelprofiel, verkopersinschrijving en professionele hulpmiddelen met behoud van de gekozen taal.",gallery:"Bekijk winkels",profile:"Winkelprofiel",register:"Verkoper inschrijven",marketPro:"MARKET PRO openen",proSpace:"Mijn Pro-ruimte",hub:"DIGIY huis"},
    ar:{kicker:"القائمة المركزية لـ MARKET",title:"جميع بوابات الوحدة",sub:"المعرض وبطاقة المتجر وتسجيل البائع والأدوات المهنية مع الحفاظ على اللغة المختارة.",gallery:"عرض المتاجر",profile:"بطاقة المتجر",register:"تسجيل بائع",marketPro:"دخول MARKET PRO",proSpace:"مساحتي المهنية",hub:"بيت DIGIY"}
  };
  function detect(){
    try{
      const q=String(new URLSearchParams(location.search).get("lang")||"").toLowerCase();
      if(SUPPORTED.includes(q))return q;
      const s=String(localStorage.getItem("digiy-lang")||"").toLowerCase();
      if(SUPPORTED.includes(s))return s;
    }catch(_){}
    return "fr";
  }
  let current=detect(),box=null;
  function withLang(path){
    const u=new URL(path,location.href);
    u.searchParams.set("lang",current);
    return u.toString();
  }
  function render(next){
    current=SUPPORTED.includes(next)?next:"fr";
    if(!box)return;
    const t=COPY[current]||COPY.fr;
    box.dir=current==="ar"?"rtl":"ltr";
    const pro=new URL("https://pro-market.digiylyfe.com/lang.html");
    pro.searchParams.set("lang",current);
    pro.searchParams.set("page","pin.html");
    box.innerHTML=`
      <div class="digiy-market-doors-head"><span>${t.kicker}</span><h2>${t.title}</h2><p>${t.sub}</p></div>
      <div class="digiy-market-doors-grid">
        <a data-market-target="boutiques" href="${withLang("./index.html#boutiques")}"><b>🛍️ ${t.gallery}</b><small>MARKET PUBLIC</small></a>
        <a data-market-target="boutiques" href="${withLang("./index.html#boutiques")}"><b>🪪 ${t.profile}</b><small>CHOISIR UNE FICHE</small></a>
        <a href="${withLang("./inscription-market.html")}"><b>🧾 ${t.register}</b><small>INSCRIPTION</small></a>
        <a href="${pro.toString()}"><b>🔐 ${t.marketPro}</b><small>PRO MARKET</small></a>
        <a href="${withLang("https://pro-espace.digiylyfe.com/")}"><b>🧰 ${t.proSpace}</b><small>MON ESPACE PRO</small></a>
        <a href="${withLang("https://digiy-hub.digiylyfe.com/")}"><b>🧭 ${t.hub}</b><small>HUB DIGIY</small></a>
      </div>`;
  }
  function install(){
    if(document.getElementById("digiyMarketDoors"))return;
    const anchor=document.querySelector(".hero")||document.querySelector("main")||document.body.firstElementChild;
    box=document.createElement("section");
    box.id="digiyMarketDoors";
    const style=document.createElement("style");
    style.textContent=`
      #digiyMarketDoors{margin:18px auto;padding:18px;width:min(1180px,calc(100% - 28px));border:1px solid rgba(214,173,57,.38);border-radius:28px;background:radial-gradient(circle at top right,rgba(244,207,100,.19),transparent 40%),linear-gradient(135deg,#063b2b,#0b5a41);box-shadow:0 20px 60px rgba(6,59,43,.20);color:#fff}
      .digiy-market-doors-head span{display:inline-flex;padding:7px 11px;border-radius:999px;border:1px solid rgba(244,207,100,.38);background:rgba(255,255,255,.10);color:#fff7c2;font:950 11px system-ui;letter-spacing:.07em}
      .digiy-market-doors-head h2{margin:11px 0 5px;color:#fff;font:950 clamp(24px,4vw,34px)/1.04 system-ui}.digiy-market-doors-head p{margin:0;color:rgba(255,255,255,.82);font:800 14px/1.5 system-ui}
      .digiy-market-doors-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:15px}.digiy-market-doors-grid a{min-height:88px;padding:13px;border:1px solid rgba(255,255,255,.16);border-radius:19px;background:rgba(255,255,255,.08);color:#fff;text-decoration:none;display:grid;align-content:center;gap:6px;transition:.16s ease}.digiy-market-doors-grid a:hover,.digiy-market-doors-grid a:focus-visible{transform:translateY(-1px);border-color:rgba(244,207,100,.72);background:rgba(244,207,100,.13);outline:none}.digiy-market-doors-grid b{font:950 14px/1.25 system-ui}.digiy-market-doors-grid small{color:#fff7c2;font:900 10px system-ui;letter-spacing:.05em}[dir="rtl"] .digiy-market-doors-head,[dir="rtl"] .digiy-market-doors-grid a{text-align:right}@media(max-width:760px){.digiy-market-doors-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:430px){.digiy-market-doors-grid{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
    if(anchor&&anchor.parentNode)anchor.insertAdjacentElement("afterend",box);else document.body.prepend(box);
    render(current);
    document.addEventListener("digiy:lang",e=>render(e.detail?.lang||detect()));
    document.addEventListener("click",e=>{const b=e.target.closest?.("[data-lang],[data-market-lang]");if(!b)return;const next=String(b.dataset.lang||b.dataset.marketLang||"").toLowerCase();if(SUPPORTED.includes(next))setTimeout(()=>render(next),0)},true);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
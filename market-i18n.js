/* DIGIY MARKET — moteur métier multilingue · barre unique + fiches directes */
(function(){
'use strict';
var B=window.DIGIY_MARKET_PACK_BASE;
if(!B)return;

var sourceLangs={
  es:window.DIGIY_MARKET_LANG_ES,
  de:window.DIGIY_MARKET_LANG_DE,
  it:window.DIGIY_MARKET_LANG_IT,
  nl:window.DIGIY_MARKET_LANG_NL,
  ar:window.DIGIY_MARKET_LANG_AR
};
var D={sources:B.sources,locales:B.locales,rows:{},meta:{}};
Object.keys(sourceLangs).forEach(function(lang){
  var item=sourceLangs[lang];
  if(item&&Array.isArray(item.row)){D.rows[lang]=item.row;D.meta[lang]=item.meta||{};}
});

var SUPPORTED=['fr','en','es','de','it','nl','ar'];
var LABELS={
  fr:'🇫🇷 FR',
  en:'🇬🇧 EN',
  es:'🇪🇸 ES',
  de:'🇩🇪 DE',
  it:'🇮🇹 IT',
  nl:'🇳🇱 NL',
  ar:'🌙 AR'
};
var INTERNAL_KEY='digiy_market_lang_v2';
var applying=false;
var registered=false;
var scheduled=false;
var clickGuardInstalled=false;

function current(){
  try{
    if(window.DIGIY_I18N)return window.DIGIY_I18N.getLanguage();
    var q=(new URL(location.href)).searchParams.get('lang');
    if(SUPPORTED.indexOf(q)>=0)return q;
    var s=localStorage.getItem('digiy-lang');
    if(SUPPORTED.indexOf(s)>=0)return s;
  }catch(e){}
  return 'fr';
}

function internal(){
  try{
    return window.DIGIY_MARKET_GET_LANG
      ? window.DIGIY_MARKET_GET_LANG()
      : (localStorage.getItem(INTERNAL_KEY)==='en'?'en':'fr');
  }catch(e){return'fr';}
}

function buildPacks(){
  var out={};
  Object.keys(D.rows).forEach(function(lang){
    var row=D.rows[lang],pack={};
    D.sources.forEach(function(source,i){pack[source]=row[i];});
    out[lang]=pack;
  });
  return out;
}

function register(){
  if(registered)return;
  if(window.DIGIY_I18N&&window.DIGIY_I18N.register){
    registered=true;
    window.DIGIY_I18N.register(buildPacks());
  }
}

function setMeta(){
  var lang=current(),meta=D.meta[lang];
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  if(!meta)return;
  document.title=meta.title;
  var desc=document.querySelector('meta[name="description"]');
  if(desc)desc.setAttribute('content',meta.description);
}

function injectLayoutFix(){
  if(document.getElementById('market-language-layout-fix'))return;
  var style=document.createElement('style');
  style.id='market-language-layout-fix';
  style.textContent=
    '#digiy-i18n-bar{display:none!important}'+
    '.digiy-langbar{display:grid!important;grid-template-columns:repeat(7,minmax(0,1fr))!important;width:min(100%,680px)!important;max-width:100%!important;gap:5px!important;overflow:visible!important;position:relative!important;z-index:4!important;flex:1 1 100%!important}'+
    '.digiy-langbar .digiy-langbtn{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:0!important;min-height:38px!important;padding:0 7px!important;visibility:visible!important;opacity:1!important}'+
    '@media(min-width:761px){.topbar-inner{flex-wrap:wrap!important}.digiy-langbar{order:3!important;margin-left:auto!important;margin-top:3px!important}}'+
    '@media(max-width:760px){.digiy-langbar{order:2!important;width:100%!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;margin:6px 0 0!important}.digiy-langbar .digiy-langbtn{font-size:.76rem!important;padding:0 5px!important}.top-actions{order:3!important}}'+
    '@media(max-width:390px){.digiy-langbar .digiy-langbtn{font-size:.70rem!important;padding:0 3px!important}}';
  document.head.appendChild(style);
}

function chooseLanguage(lang){
  if(SUPPORTED.indexOf(lang)<0)lang='fr';
  try{
    localStorage.setItem('digiy-lang',lang);
  }catch(e){}
  if(window.DIGIY_I18N&&window.DIGIY_I18N.setLanguage){
    window.DIGIY_I18N.setLanguage(lang);
    return;
  }
  try{
    var u=new URL(location.href);
    u.searchParams.set('lang',lang);
    location.href=u.toString();
  }catch(e){
    location.href='/?lang='+encodeURIComponent(lang);
  }
}

function ensureButtons(){
  var bar=document.querySelector('.digiy-langbar');
  if(!bar)return;
  bar.dataset.digiySeven='1';
  bar.setAttribute('aria-label',current()==='ar'?'اختيار اللغة':'Choisir la langue');

  var existing={};
  bar.querySelectorAll('.digiy-langbtn[data-digiy-lang]').forEach(function(btn){
    existing[btn.dataset.digiyLang]=btn;
  });

  SUPPORTED.forEach(function(lang){
    var btn=existing[lang];
    if(!btn){
      btn=document.createElement('button');
      btn.className='digiy-langbtn';
      btn.type='button';
      btn.dataset.digiyLang=lang;
    }
    if(btn.textContent!==LABELS[lang])btn.textContent=LABELS[lang];
    btn.removeAttribute('onclick');
    btn.onclick=null;
    if(btn.dataset.marketLangWired!=='1'){
      btn.dataset.marketLangWired='1';
      btn.addEventListener('click',function(event){
        event.preventDefault();
        event.stopPropagation();
        chooseLanguage(lang);
      });
    }
    bar.appendChild(btn);
  });
}

function markButtons(){
  var lang=current();
  document.querySelectorAll('.digiy-langbtn[data-digiy-lang]').forEach(function(btn){
    var active=btn.dataset.digiyLang===lang;
    btn.classList.toggle('active',active);
    btn.setAttribute('aria-pressed',active?'true':'false');
  });
}

function contactMessage(shop,channel){
  var lang=current(),meta=D.meta[lang];
  if(!meta)return null;
  var tpl=channel==='sms'?meta.sms:meta.whatsapp;
  return tpl.replace('{shop}',shop||'DIGIY MARKET');
}

function patchContacts(){
  if(['fr','en'].indexOf(current())>=0)return;
  document.querySelectorAll('.shop-card').forEach(function(card){
    var shop=(card.querySelector('.shop-title')||{textContent:'DIGIY MARKET'}).textContent.trim();
    var wa=card.querySelector('a.btn-live[href*="wa.me"]');
    if(wa){
      try{
        var u=new URL(wa.href);
        u.searchParams.set('text',contactMessage(shop,'whatsapp'));
        wa.href=u.toString();
      }catch(e){}
    }
    var sms=card.querySelector('a.btn-soft[href^="sms:"]');
    if(sms){
      var phone=(sms.getAttribute('href')||'').split('?')[0];
      sms.setAttribute('href',phone+'?body='+encodeURIComponent(contactMessage(shop,'sms')));
    }
  });
}

function directProfileUrl(value){
  try{
    var u=new URL(value,location.href);
    if(/\/shop\.html$/i.test(u.pathname))u.pathname='/fiche.html';
    if(u.hostname==='market.digiylyfe.com'&&/\/fiche\.html$/i.test(u.pathname)){
      var lang=current();
      if(lang&&lang!=='fr')u.searchParams.set('lang',lang);
      else u.searchParams.delete('lang');
      return u.toString();
    }
  }catch(e){}
  return value||'';
}

function patchProfileLinks(){
  document.querySelectorAll('.shop-card .shop-actions a.btn-main').forEach(function(link){
    var fixed=directProfileUrl(link.getAttribute('href')||link.href);
    if(fixed&&link.href!==fixed)link.href=fixed;
    link.target='_self';
    link.dataset.marketProfileDirect='1';
  });
}

function installProfileClickGuard(){
  if(clickGuardInstalled)return;
  clickGuardInstalled=true;
  document.addEventListener('click',function(event){
    var target=event.target&&event.target.closest
      ? event.target.closest('.shop-card .shop-actions a.btn-main')
      : null;
    if(!target)return;
    var fixed=directProfileUrl(target.getAttribute('href')||target.href);
    if(!fixed)return;
    event.preventDefault();
    event.stopImmediatePropagation();
    location.assign(fixed);
  },true);
}

function patchShare(){
  var lang=current(),meta=D.meta[lang];
  if(!meta)return;
  ['bottomShare','fastShare','btnHeroShare'].forEach(function(id){
    var el=document.getElementById(id);
    if(!el||el.dataset.marketShareSeven==='1')return;
    el.dataset.marketShareSeven='1';
    el.addEventListener('click',function(e){
      if(['fr','en'].indexOf(current())>=0)return;
      e.preventDefault();
      e.stopImmediatePropagation();
      var payload={title:document.title,text:meta.share,url:location.href};
      if(navigator.share)navigator.share(payload).catch(function(){});
      else if(navigator.clipboard)navigator.clipboard.writeText(location.href).catch(function(){});
    },true);
  });
}

function voice(){
  var lang=current(),meta=D.meta[lang];
  if(!meta||!('speechSynthesis'in window))return;
  var utter=new SpeechSynthesisUtterance(meta.audio);
  utter.lang=D.locales[lang]||'fr-FR';
  utter.rate=.86;
  var voices=window.speechSynthesis.getVoices()||[];
  var code=utter.lang.slice(0,2).toLowerCase();
  var found=voices.find(function(v){
    return String(v.lang||'').toLowerCase().indexOf(code)===0;
  });
  if(found)utter.voice=found;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

function patchAudio(){
  var play=document.getElementById('digiyAudioPlayBtn');
  var stop=document.getElementById('digiyAudioStopBtn');
  if(play&&play.dataset.marketAudioSeven!=='1'){
    play.dataset.marketAudioSeven='1';
    play.addEventListener('click',function(e){
      if(['fr','en'].indexOf(current())>=0)return;
      e.preventDefault();
      e.stopImmediatePropagation();
      voice();
    },true);
  }
  if(stop&&stop.dataset.marketAudioSeven!=='1'){
    stop.dataset.marketAudioSeven='1';
    stop.addEventListener('click',function(e){
      if(['fr','en'].indexOf(current())>=0)return;
      e.preventDefault();
      e.stopImmediatePropagation();
      try{speechSynthesis.cancel();}catch(_){}
    },true);
  }
}

function ensureBase(lang){
  var desired=lang==='fr'?'fr':'en';
  if(internal()===desired)return false;
  try{
    if(desired==='en')localStorage.setItem(INTERNAL_KEY,'en');
    else localStorage.removeItem(INTERNAL_KEY);
    localStorage.setItem('digiy-lang',lang);
  }catch(e){}
  location.reload();
  return true;
}

function patch(){
  if(applying)return;
  applying=true;
  injectLayoutFix();
  register();
  setMeta();
  ensureButtons();
  markButtons();
  patchContacts();
  patchProfileLinks();
  patchShare();
  patchAudio();
  applying=false;
}

function schedulePatch(){
  if(scheduled)return;
  scheduled=true;
  setTimeout(function(){
    scheduled=false;
    patch();
  },0);
}

document.addEventListener('digiy:languagechange',function(e){
  var lang=e.detail&&e.detail.lang?e.detail.lang:current();
  if(ensureBase(lang))return;
  schedulePatch();
});

var observer=new MutationObserver(function(){
  if(!applying)schedulePatch();
});

function init(){
  var lang=current();
  injectLayoutFix();
  installProfileClickGuard();
  if(ensureBase(lang))return;
  register();
  patch();
  observer.observe(document.body,{childList:true,subtree:true});
  setTimeout(patch,120);
  setTimeout(patch,600);
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',init,{once:true});
}else{
  init();
}
})();
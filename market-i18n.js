/* DIGIY MARKET — moteur métier multilingue */
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
var INTERNAL_KEY='digiy_market_lang_v2';
var applying=false;

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
  try{return window.DIGIY_MARKET_GET_LANG?window.DIGIY_MARKET_GET_LANG():(localStorage.getItem(INTERNAL_KEY)==='en'?'en':'fr');}
  catch(e){return'fr';}
}
function buildPacks(){
  var out={};
  Object.keys(D.rows).forEach(function(lang){
    var row=D.rows[lang], pack={};
    D.sources.forEach(function(source,i){pack[source]=row[i];});
    out[lang]=pack;
  });
  return out;
}
function register(){
  if(window.DIGIY_I18N&&window.DIGIY_I18N.register){
    window.DIGIY_I18N.register(buildPacks());
  }
}
function setMeta(){
  var lang=current(), meta=D.meta[lang];
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  if(!meta)return;
  document.title=meta.title;
  var desc=document.querySelector('meta[name="description"]');
  if(desc)desc.setAttribute('content',meta.description);
}
function addButtons(){
  var bar=document.querySelector('.digiy-langbar');
  if(!bar||bar.dataset.digiySeven==='1')return;
  bar.dataset.digiySeven='1';
  ['es','de','it','nl','ar'].forEach(function(lang){
    var b=document.createElement('button');
    b.className='digiy-langbtn';
    b.type='button';
    b.dataset.digiyLang=lang;
    b.textContent=lang==='es'?'🇪🇸 ES':lang==='de'?'🇩🇪 DE':lang==='it'?'🇮🇹 IT':lang==='nl'?'🇳🇱 NL':'🌙 AR';
    b.addEventListener('click',function(){
      if(window.DIGIY_I18N)window.DIGIY_I18N.setLanguage(lang);
    });
    bar.appendChild(b);
  });
}
function markButtons(){
  var lang=current();
  document.querySelectorAll('.digiy-langbtn').forEach(function(b){
    b.classList.toggle('active',b.dataset.digiyLang===lang);
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
      try{var u=new URL(wa.href);u.searchParams.set('text',contactMessage(shop,'whatsapp'));wa.href=u.toString();}catch(e){}
    }
    var sms=card.querySelector('a.btn-soft[href^="sms:"]');
    if(sms){
      var phone=(sms.getAttribute('href')||'').split('?')[0];
      sms.setAttribute('href',phone+'?body='+encodeURIComponent(contactMessage(shop,'sms')));
    }
  });
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
  var found=voices.find(function(v){return String(v.lang||'').toLowerCase().indexOf(code)===0;});
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
  register();
  setMeta();
  addButtons();
  markButtons();
  patchContacts();
  patchShare();
  patchAudio();
  applying=false;
}
document.addEventListener('digiy:languagechange',function(e){
  var lang=e.detail&&e.detail.lang?e.detail.lang:current();
  if(ensureBase(lang))return;
  setTimeout(patch,0);
});
var observer=new MutationObserver(function(){
  if(!applying)setTimeout(patch,0);
});
function init(){
  var lang=current();
  if(ensureBase(lang))return;
  register();
  patch();
  observer.observe(document.body,{childList:true,subtree:true});
  setTimeout(patch,120);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();
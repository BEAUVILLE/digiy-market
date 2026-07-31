/* DIGIY MARKET — routeur public local et strict
   Conserve la langue et les paramètres des pages publiques MARKET.
   Ne touche pas aux domaines PRO, WhatsApp, téléphone, SMS ou ancres internes.
*/
(function(){
  'use strict';

  var SUPPORTED=['fr','en','es','de','it','nl','ar'];
  var WRAPPED=['inscription-market.html','fiche.html','commander.html','shop.html'];
  var VERSION='20260731-market-pages-v1';

  function lang(){
    var value='';
    try{
      value=(new URL(location.href)).searchParams.get('lang')||localStorage.getItem('digiy-lang')||'';
    }catch(e){}
    value=String(value||'').slice(0,2).toLowerCase();
    return SUPPORTED.indexOf(value)>=0?value:'fr';
  }

  function basename(pathname){
    var parts=String(pathname||'').split('/');
    return parts[parts.length-1]||'index.html';
  }

  function wrappedUrl(input){
    var url;
    try{url=new URL(input,location.href)}catch(e){return null}
    if(url.origin!==location.origin)return null;

    var page=basename(url.pathname);
    if(WRAPPED.indexOf(page)<0)return null;
    if(page==='shop.html')page='fiche.html';

    var out=new URL('./lang.html',location.origin+'/');
    out.searchParams.set('lang',lang());
    out.searchParams.set('page',page);
    url.searchParams.forEach(function(value,key){
      if(key!=='lang'&&key!=='page'&&key!=='v')out.searchParams.append(key,value);
    });
    out.searchParams.set('v',VERSION);
    out.hash=url.hash||'';
    return out.toString();
  }

  function galleryUrl(){
    var out=new URL('./',location.origin+'/');
    out.searchParams.set('lang',lang());
    out.searchParams.set('v',VERSION);
    return out.toString();
  }

  document.addEventListener('click',function(event){
    var anchor=event.target&&event.target.closest?event.target.closest('a[href]'):null;
    if(!anchor)return;
    var raw=anchor.getAttribute('href')||'';
    if(!raw||raw.charAt(0)==='#'||/^(mailto:|tel:|sms:|javascript:)/i.test(raw))return;

    var target=wrappedUrl(anchor.href);
    if(target){
      event.preventDefault();
      event.stopImmediatePropagation();
      location.assign(target);
      return;
    }

    try{
      var url=new URL(anchor.href,location.href);
      if(url.origin===location.origin&&(/\/(?:index\.html)?$/i.test(url.pathname))){
        event.preventDefault();
        event.stopImmediatePropagation();
        location.assign(galleryUrl());
      }
    }catch(e){}
  },true);

  window.DIGIY_MARKET_PUBLIC_ROUTE={
    lang:lang,
    wrap:wrappedUrl,
    gallery:galleryUrl,
    version:VERSION
  };
})();
/* DIGIY MARKET — traduction renforcée des choix dynamiques de l'inscription */
(() => {
  "use strict";

  const DATA = window.DIGIY_RESA_I18N || {};
  const SUPPORTED = DATA.supported || ["fr","en","es","de","it","nl","ar"];

  function currentLang(){
    try{
      const query = String(new URLSearchParams(location.search).get("lang") || "").toLowerCase();
      if(SUPPORTED.includes(query)) return query;
      const stored = String(localStorage.getItem("digiy-lang") || "").toLowerCase();
      if(SUPPORTED.includes(stored)) return stored;
    }catch(_){ }
    return "fr";
  }

  const lang = currentLang();
  if(lang === "fr") return;

  const translations = (DATA.langs && DATA.langs[lang]) || {};
  const exact = DATA.frToKey || {};
  const partial = Object.entries(DATA.partial || {}).sort((a,b) => b[0].length - a[0].length);

  function keepSpacing(raw, translated){
    const left = (String(raw).match(/^\s*/) || [""])[0];
    const right = (String(raw).match(/\s*$/) || [""])[0];
    return left + translated + right;
  }

  function translateString(value){
    const raw = String(value ?? "");
    if(!raw.trim()) return raw;
    const compact = raw.replace(/\s+/g," ").trim();
    const key = exact[compact];
    if(key && translations[key]) return keepSpacing(raw, translations[key]);

    let output = compact;
    for(const [source, partialKey] of partial){
      if(translations[partialKey] && output.includes(source)){
        output = output.split(source).join(translations[partialKey]);
      }
    }
    return output === compact ? raw : keepSpacing(raw, output);
  }

  function translateMessage(value){
    return String(value || "").split("\n").map(translateString).join("\n");
  }

  function translateNode(node){
    if(!node) return;
    if(node.nodeType === Node.TEXT_NODE){
      const parent = node.parentElement;
      if(!parent || ["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","INPUT"].includes(parent.tagName)) return;
      const next = translateString(node.nodeValue);
      if(next !== node.nodeValue) node.nodeValue = next;
      return;
    }
    if(node.nodeType !== Node.ELEMENT_NODE) return;
    if(["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","INPUT"].includes(node.tagName)) return;
    for(const child of node.childNodes) translateNode(child);
  }

  function patchWhatsApp(){
    document.querySelectorAll("#btnWa[href],#btnProof[href]").forEach(anchor => {
      try{
        const original = anchor.getAttribute("href") || "";
        const url = new URL(original, location.href);
        if(!/(^|\.)wa\.me$/i.test(url.hostname)) return;
        const message = url.searchParams.get("text");
        if(!message) return;
        const next = translateMessage(message);
        if(next !== message){
          url.searchParams.set("text", next);
          anchor.setAttribute("href", url.toString());
        }
      }catch(_){ }
    });
  }

  const selectors = [
    "#presenceOptions",
    "#metierOptions",
    "#boostOptions",
    "#reseauOptions",
    "#selectedBox",
    "#choiceList",
    "#benefits",
    "#countryNote",
    "#payBadge",
    ".paymentTitle",
    ".payment .proof",
    "#dateBox",
    "#formWarning"
  ].join(",");

  function apply(){
    document.querySelectorAll(selectors).forEach(translateNode);
    patchWhatsApp();
  }

  let scheduled = false;
  function schedule(){
    if(scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  }

  const observer = new MutationObserver(schedule);

  function start(){
    apply();
    observer.observe(document.body, {
      subtree:true,
      childList:true,
      characterData:true,
      attributes:true,
      attributeFilter:["href","class"]
    });
    document.addEventListener("click", event => {
      if(event.target.closest?.(".option,[data-country],#btnClear,#btnClearProInfo")){
        setTimeout(schedule, 0);
        setTimeout(schedule, 80);
      }
    }, true);
    setTimeout(apply, 180);
    setTimeout(apply, 700);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", start, {once:true});
  }else{
    start();
  }
})();

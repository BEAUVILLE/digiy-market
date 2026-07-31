/* DIGIY MARKET — traductions produits BOUTIQUE BCHEIKH */
(function(){
'use strict';
if(window.__DIGIY_MARKET_BCHEIKH_I18N__)return;
window.__DIGIY_MARKET_BCHEIKH_I18N__=true;

var LANGS=['fr','en','es','de','it','nl','ar'];
var SOURCE={
  'Tee-shirt / Polo':1,
  'Mode':1,
  'Tee-shirt ou polo selon les modèles, tailles et couleurs disponibles.':1,
  'Pack de 3 pièces':1,
  'Pack avantage de trois tee-shirts ou polos selon les disponibilités.':1,
  'Poche de 3 caleçons':1,
  'Sous-vêtements':1,
  'Poche contenant trois caleçons, selon les tailles et modèles disponibles.':1
};

var DICT={
  fr:{
    'Tee-shirt / Polo':'T-shirt / Polo',
    'Mode':'Mode',
    'Tee-shirt ou polo selon les modèles, tailles et couleurs disponibles.':'T-shirt ou polo selon les modèles, tailles et couleurs disponibles.',
    'Pack de 3 pièces':'Pack de 3 pièces',
    'Pack avantage de trois tee-shirts ou polos selon les disponibilités.':'Pack avantage de trois T-shirts ou polos selon les disponibilités.',
    'Poche de 3 caleçons':'Pack de 3 caleçons',
    'Sous-vêtements':'Sous-vêtements',
    'Poche contenant trois caleçons, selon les tailles et modèles disponibles.':'Pack contenant trois caleçons, selon les tailles et modèles disponibles.'
  },
  en:{
    'Tee-shirt / Polo':'T-shirt / Polo shirt',
    'Mode':'Fashion',
    'Tee-shirt ou polo selon les modèles, tailles et couleurs disponibles.':'T-shirt or polo shirt depending on available styles, sizes and colors.',
    'Pack de 3 pièces':'Pack of 3',
    'Pack avantage de trois tee-shirts ou polos selon les disponibilités.':'Value pack of three T-shirts or polo shirts, subject to availability.',
    'Poche de 3 caleçons':'Pack of 3 boxer shorts',
    'Sous-vêtements':'Underwear',
    'Poche contenant trois caleçons, selon les tailles et modèles disponibles.':'Pack containing three boxer shorts, depending on available sizes and styles.'
  },
  es:{
    'Tee-shirt / Polo':'Camiseta / Polo',
    'Mode':'Moda',
    'Tee-shirt ou polo selon les modèles, tailles et couleurs disponibles.':'Camiseta o polo según los modelos, tallas y colores disponibles.',
    'Pack de 3 pièces':'Pack de 3 piezas',
    'Pack avantage de trois tee-shirts ou polos selon les disponibilités.':'Pack ahorro de tres camisetas o polos, según disponibilidad.',
    'Poche de 3 caleçons':'Pack de 3 bóxeres',
    'Sous-vêtements':'Ropa interior',
    'Poche contenant trois caleçons, selon les tailles et modèles disponibles.':'Pack con tres bóxeres, según las tallas y modelos disponibles.'
  },
  de:{
    'Tee-shirt / Polo':'T-Shirt / Poloshirt',
    'Mode':'Mode',
    'Tee-shirt ou polo selon les modèles, tailles et couleurs disponibles.':'T-Shirt oder Poloshirt je nach verfügbaren Modellen, Größen und Farben.',
    'Pack de 3 pièces':'3er-Pack',
    'Pack avantage de trois tee-shirts ou polos selon les disponibilités.':'Vorteilspack mit drei T-Shirts oder Poloshirts, je nach Verfügbarkeit.',
    'Poche de 3 caleçons':'3er-Pack Boxershorts',
    'Sous-vêtements':'Unterwäsche',
    'Poche contenant trois caleçons, selon les tailles et modèles disponibles.':'Packung mit drei Boxershorts, je nach verfügbaren Größen und Modellen.'
  },
  it:{
    'Tee-shirt / Polo':'T-shirt / Polo',
    'Mode':'Moda',
    'Tee-shirt ou polo selon les modèles, tailles et couleurs disponibles.':'T-shirt o polo in base ai modelli, alle taglie e ai colori disponibili.',
    'Pack de 3 pièces':'Confezione da 3 pezzi',
    'Pack avantage de trois tee-shirts ou polos selon les disponibilités.':'Confezione conveniente di tre T-shirt o polo, secondo disponibilità.',
    'Poche de 3 caleçons':'Confezione da 3 boxer',
    'Sous-vêtements':'Intimo',
    'Poche contenant trois caleçons, selon les tailles et modèles disponibles.':'Confezione contenente tre boxer, secondo le taglie e i modelli disponibili.'
  },
  nl:{
    'Tee-shirt / Polo':'T-shirt / Polo',
    'Mode':'Mode',
    'Tee-shirt ou polo selon les modèles, tailles et couleurs disponibles.':'T-shirt of polo, afhankelijk van beschikbare modellen, maten en kleuren.',
    'Pack de 3 pièces':'Pakket van 3 stuks',
    'Pack avantage de trois tee-shirts ou polos selon les disponibilités.':'Voordeelpak van drie T-shirts of polo’s, afhankelijk van beschikbaarheid.',
    'Poche de 3 caleçons':'Pakket van 3 boxershorts',
    'Sous-vêtements':'Ondergoed',
    'Poche contenant trois caleçons, selon les tailles et modèles disponibles.':'Pakket met drie boxershorts, afhankelijk van beschikbare maten en modellen.'
  },
  ar:{
    'Tee-shirt / Polo':'تيشيرت / قميص بولو',
    'Mode':'أزياء',
    'Tee-shirt ou polo selon les modèles, tailles et couleurs disponibles.':'تيشيرت أو قميص بولو حسب الموديلات والمقاسات والألوان المتوفرة.',
    'Pack de 3 pièces':'عبوة من 3 قطع',
    'Pack avantage de trois tee-shirts ou polos selon les disponibilités.':'عبوة اقتصادية من ثلاثة تيشيرتات أو قمصان بولو حسب التوفر.',
    'Poche de 3 caleçons':'عبوة من 3 سراويل داخلية',
    'Sous-vêtements':'ملابس داخلية',
    'Poche contenant trois caleçons, selon les tailles et modèles disponibles.':'عبوة تحتوي على ثلاثة سراويل داخلية حسب المقاسات والموديلات المتوفرة.'
  }
};

var originals=new WeakMap();
function language(){
  var value='';
  try{value=(new URL(location.href)).searchParams.get('lang')||localStorage.getItem('digiy-lang')||''}catch(e){}
  value=String(value).slice(0,2).toLowerCase();
  return LANGS.indexOf(value)>=0?value:'fr';
}
function normalize(value){return String(value||'').replace(/\s+/g,' ').trim()}
function section(){var products=document.getElementById('products');return products&&products.closest?products.closest('.section'):products}
function translateNode(node){
  if(!node||node.nodeType!==Node.TEXT_NODE)return;
  var current=normalize(node.nodeValue);
  if(!current)return;
  if(!originals.has(node)){
    if(!SOURCE[current])return;
    originals.set(node,node.nodeValue);
  }
  var base=originals.get(node);
  var key=normalize(base);
  var lang=language();
  var translated=(DICT[lang]||DICT.fr)[key]||key;
  node.nodeValue=String(base).replace(key,translated);
}
function apply(){
  var root=section();
  if(!root)return;
  var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  var node;
  while((node=walker.nextNode()))translateNode(node);
}
var scheduled=false;
function schedule(){if(scheduled)return;scheduled=true;setTimeout(function(){scheduled=false;apply()},40)}
function init(){
  apply();
  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
  document.addEventListener('digiy:languagechange',schedule);
  setTimeout(apply,180);
  setTimeout(apply,800);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

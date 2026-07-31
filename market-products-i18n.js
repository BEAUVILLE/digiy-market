/* DIGIY MARKET — traduction locale des produits publics dynamiques */
(function(){
'use strict';
var LANGS=['fr','en','es','de','it','nl','ar'];
var SOURCE={
  'Produits / sélection':1,
  'Les produits peuvent être enrichis depuis l’espace vendeur MARKET.':1,
  'Drap 2 places':1,'Draps':1,'Drap confortable pour lit deux places.':1,
  'Drap 1 place':1,'Drap confortable pour lit une place.':1,
  'Parure complète':1,'Parures':1,'Parure complète pour une chambre élégante.':1,
  'Taie oreiller':1,'Taie pratique et confortable.':1,
  'Serviette bain':1,'Serviettes':1,'Serviette de bain douce et absorbante.':1,
  'Peignoir':1,'Peignoir confortable pour la maison.':1,
  'Couette':1,'Chambre':1,'Couette confortable pour la chambre.':1,
  'Oreiller':1,'Oreiller confortable pour un usage quotidien.':1,
  'Nappe table':1,'Table':1,'Nappe pratique pour embellir la table.':1,
  'Torchon':1,'Torchon utile pour la cuisine et la maison.':1,
  'SAC À MAIN':1,'MODE':1,'TEST':1
};
var DICT={
  en:{
    'Produits / sélection':'Products / selection','Les produits peuvent être enrichis depuis l’espace vendeur MARKET.':'Products can be enriched from the MARKET seller area.',
    'Drap 2 places':'Double bed sheet','Draps':'Sheets','Drap confortable pour lit deux places.':'Comfortable sheet for a double bed.',
    'Drap 1 place':'Single bed sheet','Drap confortable pour lit une place.':'Comfortable sheet for a single bed.',
    'Parure complète':'Complete bedding set','Parures':'Bedding sets','Parure complète pour une chambre élégante.':'Complete set for an elegant bedroom.',
    'Taie oreiller':'Pillowcase','Taie pratique et confortable.':'Practical and comfortable pillowcase.',
    'Serviette bain':'Bath towel','Serviettes':'Towels','Serviette de bain douce et absorbante.':'Soft and absorbent bath towel.',
    'Peignoir':'Bathrobe','Peignoir confortable pour la maison.':'Comfortable bathrobe for home.',
    'Couette':'Duvet','Chambre':'Bedroom','Couette confortable pour la chambre.':'Comfortable duvet for the bedroom.',
    'Oreiller':'Pillow','Oreiller confortable pour un usage quotidien.':'Comfortable pillow for everyday use.',
    'Nappe table':'Tablecloth','Table':'Table','Nappe pratique pour embellir la table.':'Practical tablecloth to enhance the table.',
    'Torchon':'Tea towel','Torchon utile pour la cuisine et la maison.':'Useful tea towel for the kitchen and home.',
    'SAC À MAIN':'HANDBAG','MODE':'FASHION','TEST':'TEST'
  },
  es:{
    'Produits / sélection':'Productos / selección','Les produits peuvent être enrichis depuis l’espace vendeur MARKET.':'Los productos pueden enriquecerse desde el espacio vendedor MARKET.',
    'Drap 2 places':'Sábana doble','Draps':'Sábanas','Drap confortable pour lit deux places.':'Sábana cómoda para cama doble.',
    'Drap 1 place':'Sábana individual','Drap confortable pour lit une place.':'Sábana cómoda para cama individual.',
    'Parure complète':'Juego completo','Parures':'Juegos de cama','Parure complète pour une chambre élégante.':'Juego completo para un dormitorio elegante.',
    'Taie oreiller':'Funda de almohada','Taie pratique et confortable.':'Funda práctica y cómoda.',
    'Serviette bain':'Toalla de baño','Serviettes':'Toallas','Serviette de bain douce et absorbante.':'Toalla de baño suave y absorbente.',
    'Peignoir':'Albornoz','Peignoir confortable pour la maison.':'Albornoz cómodo para el hogar.',
    'Couette':'Edredón','Chambre':'Dormitorio','Couette confortable pour la chambre.':'Edredón cómodo para el dormitorio.',
    'Oreiller':'Almohada','Oreiller confortable pour un usage quotidien.':'Almohada cómoda para uso diario.',
    'Nappe table':'Mantel','Table':'Mesa','Nappe pratique pour embellir la table.':'Mantel práctico para embellecer la mesa.',
    'Torchon':'Paño de cocina','Torchon utile pour la cuisine et la maison.':'Paño útil para la cocina y el hogar.',
    'SAC À MAIN':'BOLSO','MODE':'MODA','TEST':'PRUEBA'
  },
  de:{
    'Produits / sélection':'Produkte / Auswahl','Les produits peuvent être enrichis depuis l’espace vendeur MARKET.':'Die Produkte können im MARKET-Verkäuferbereich ergänzt werden.',
    'Drap 2 places':'Doppelbettlaken','Draps':'Bettlaken','Drap confortable pour lit deux places.':'Bequemes Laken für ein Doppelbett.',
    'Drap 1 place':'Einzelbettlaken','Drap confortable pour lit une place.':'Bequemes Laken für ein Einzelbett.',
    'Parure complète':'Komplettes Bettwäsche-Set','Parures':'Bettwäsche-Sets','Parure complète pour une chambre élégante.':'Komplettes Set für ein elegantes Schlafzimmer.',
    'Taie oreiller':'Kissenbezug','Taie pratique et confortable.':'Praktischer und bequemer Kissenbezug.',
    'Serviette bain':'Badetuch','Serviettes':'Handtücher','Serviette de bain douce et absorbante.':'Weiches und saugfähiges Badetuch.',
    'Peignoir':'Bademantel','Peignoir confortable pour la maison.':'Bequemer Bademantel für zu Hause.',
    'Couette':'Bettdecke','Chambre':'Schlafzimmer','Couette confortable pour la chambre.':'Bequeme Bettdecke für das Schlafzimmer.',
    'Oreiller':'Kissen','Oreiller confortable pour un usage quotidien.':'Bequemes Kissen für den täglichen Gebrauch.',
    'Nappe table':'Tischdecke','Table':'Tisch','Nappe pratique pour embellir la table.':'Praktische Tischdecke zur Verschönerung des Tisches.',
    'Torchon':'Geschirrtuch','Torchon utile pour la cuisine et la maison.':'Nützliches Geschirrtuch für Küche und Haushalt.',
    'SAC À MAIN':'HANDTASCHE','MODE':'MODE','TEST':'TEST'
  },
  it:{
    'Produits / sélection':'Prodotti / selezione','Les produits peuvent être enrichis depuis l’espace vendeur MARKET.':'I prodotti possono essere arricchiti dallo spazio venditore MARKET.',
    'Drap 2 places':'Lenzuolo matrimoniale','Draps':'Lenzuola','Drap confortable pour lit deux places.':'Lenzuolo comodo per letto matrimoniale.',
    'Drap 1 place':'Lenzuolo singolo','Drap confortable pour lit une place.':'Lenzuolo comodo per letto singolo.',
    'Parure complète':'Completo letto','Parures':'Completi letto','Parure complète pour une chambre élégante.':'Completo per una camera elegante.',
    'Taie oreiller':'Federa','Taie pratique et confortable.':'Federa pratica e confortevole.',
    'Serviette bain':'Asciugamano da bagno','Serviettes':'Asciugamani','Serviette de bain douce et absorbante.':'Asciugamano da bagno morbido e assorbente.',
    'Peignoir':'Accappatoio','Peignoir confortable pour la maison.':'Accappatoio confortevole per la casa.',
    'Couette':'Piumone','Chambre':'Camera','Couette confortable pour la chambre.':'Piumone confortevole per la camera.',
    'Oreiller':'Cuscino','Oreiller confortable pour un usage quotidien.':'Cuscino confortevole per l’uso quotidiano.',
    'Nappe table':'Tovaglia','Table':'Tavola','Nappe pratique pour embellir la table.':'Tovaglia pratica per abbellire la tavola.',
    'Torchon':'Strofinaccio','Torchon utile pour la cuisine et la maison.':'Strofinaccio utile per la cucina e la casa.',
    'SAC À MAIN':'BORSA','MODE':'MODA','TEST':'TEST'
  },
  nl:{
    'Produits / sélection':'Producten / selectie','Les produits peuvent être enrichis depuis l’espace vendeur MARKET.':'Producten kunnen worden aangevuld vanuit de MARKET-verkopersruimte.',
    'Drap 2 places':'Tweepersoonslaken','Draps':'Lakens','Drap confortable pour lit deux places.':'Comfortabel laken voor een tweepersoonsbed.',
    'Drap 1 place':'Eenpersoonslaken','Drap confortable pour lit une place.':'Comfortabel laken voor een eenpersoonsbed.',
    'Parure complète':'Complete bedset','Parures':'Beddensets','Parure complète pour une chambre élégante.':'Complete set voor een elegante slaapkamer.',
    'Taie oreiller':'Kussensloop','Taie pratique et confortable.':'Praktische en comfortabele kussensloop.',
    'Serviette bain':'Badhanddoek','Serviettes':'Handdoeken','Serviette de bain douce et absorbante.':'Zachte en absorberende badhanddoek.',
    'Peignoir':'Badjas','Peignoir confortable pour la maison.':'Comfortabele badjas voor thuis.',
    'Couette':'Dekbed','Chambre':'Slaapkamer','Couette confortable pour la chambre.':'Comfortabel dekbed voor de slaapkamer.',
    'Oreiller':'Kussen','Oreiller confortable pour un usage quotidien.':'Comfortabel kussen voor dagelijks gebruik.',
    'Nappe table':'Tafelkleed','Table':'Tafel','Nappe pratique pour embellir la table.':'Praktisch tafelkleed om de tafel te verfraaien.',
    'Torchon':'Theedoek','Torchon utile pour la cuisine et la maison.':'Handige theedoek voor keuken en huis.',
    'SAC À MAIN':'HANDTAS','MODE':'MODE','TEST':'TEST'
  },
  ar:{
    'Produits / sélection':'المنتجات / الاختيار','Les produits peuvent être enrichis depuis l’espace vendeur MARKET.':'يمكن إثراء المنتجات من مساحة بائع MARKET.',
    'Drap 2 places':'شرشف سرير لشخصين','Draps':'شراشف','Drap confortable pour lit deux places.':'شرشف مريح لسرير لشخصين.',
    'Drap 1 place':'شرشف سرير لشخص واحد','Drap confortable pour lit une place.':'شرشف مريح لسرير لشخص واحد.',
    'Parure complète':'طقم سرير كامل','Parures':'أطقم سرير','Parure complète pour une chambre élégante.':'طقم كامل لغرفة نوم أنيقة.',
    'Taie oreiller':'غطاء وسادة','Taie pratique et confortable.':'غطاء وسادة عملي ومريح.',
    'Serviette bain':'منشفة حمام','Serviettes':'مناشف','Serviette de bain douce et absorbante.':'منشفة حمام ناعمة وماصة.',
    'Peignoir':'روب حمام','Peignoir confortable pour la maison.':'روب حمام مريح للمنزل.',
    'Couette':'لحاف','Chambre':'غرفة النوم','Couette confortable pour la chambre.':'لحاف مريح لغرفة النوم.',
    'Oreiller':'وسادة','Oreiller confortable pour un usage quotidien.':'وسادة مريحة للاستخدام اليومي.',
    'Nappe table':'مفرش طاولة','Table':'طاولة','Nappe pratique pour embellir la table.':'مفرش عملي لتزيين الطاولة.',
    'Torchon':'فوطة مطبخ','Torchon utile pour la cuisine et la maison.':'فوطة مفيدة للمطبخ والمنزل.',
    'SAC À MAIN':'حقيبة يد','MODE':'أزياء','TEST':'اختبار'
  }
};
var originals=new WeakMap();
function language(){var x='';try{x=(new URL(location.href)).searchParams.get('lang')||localStorage.getItem('digiy-lang')||''}catch(e){}x=String(x).slice(0,2).toLowerCase();return LANGS.indexOf(x)>=0?x:'fr'}
function normalize(v){return String(v||'').replace(/\s+/g,' ').trim()}
function section(){var products=document.getElementById('products');return products&&products.closest?products.closest('.section'):products}
function text(node){if(!node||node.nodeType!==Node.TEXT_NODE)return;var current=normalize(node.nodeValue);if(!current)return;if(!originals.has(node)){if(SOURCE[current])originals.set(node,node.nodeValue);else return}var base=originals.get(node),key=normalize(base),lang=language(),translated=lang==='fr'?key:((DICT[lang]||{})[key]||key);node.nodeValue=String(base).replace(key,translated)}
function walk(root){if(!root)return;var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);var node;while((node=walker.nextNode()))text(node)}
function prices(root){if(!root)return;var lang=language(),locale={fr:'fr-FR',en:'en-US',es:'es-ES',de:'de-DE',it:'it-IT',nl:'nl-NL',ar:'ar-SA'}[lang]||'fr-FR';root.querySelectorAll('.price').forEach(function(el){if(!el.dataset.marketRawPrice){var raw=normalize(el.textContent);if(/^\d+(?:[.,]\d+)?$/.test(raw))el.dataset.marketRawPrice=raw.replace(',','.')}var value=Number(el.dataset.marketRawPrice);if(Number.isFinite(value))el.textContent=new Intl.NumberFormat(locale,{maximumFractionDigits:0}).format(value)+' FCFA'})}
function apply(){var root=section();if(!root)return;walk(root);prices(root)}
var scheduled=false;function schedule(){if(scheduled)return;scheduled=true;setTimeout(function(){scheduled=false;apply()},35)}
var observer=new MutationObserver(schedule);
function init(){apply();observer.observe(document.body,{childList:true,subtree:true});document.addEventListener('digiy:languagechange',schedule);setTimeout(apply,180);setTimeout(apply,800)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
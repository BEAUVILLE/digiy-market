/* DIGIY MARKET — correctif carte BCHEIKH autonome
   La carte affichée par MARKET est stockée dans MARKET pour ne plus dépendre
   d'un asset manquant sur la vitrine BCHEIKH.
*/
(function(){
  'use strict';
  var CARD='./assets/partners/bcheikh-card.webp?v=20260811-card-v1';

  function normalize(value){
    return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  }

  function isBcheikh(card){
    if(!card)return false;
    var title=card.querySelector('h3,.shop-title');
    var name=normalize(title?title.textContent:'');
    return name.indexOf('bcheikh')!==-1 || name.indexOf('b cheikh')!==-1;
  }

  function patchCard(card){
    if(!isBcheikh(card))return;
    var img=card.querySelector('img');
    if(!img)return;
    img.src=CARD;
    img.alt='Carte de visite BCHEIKH';
    img.removeAttribute('onerror');
    img.setAttribute('data-digiy-bcheikh-card-fix','1');
  }

  function patch(root){
    var scope=root&&root.querySelectorAll?root:document;
    if(scope.matches&&scope.matches('.fp-card,.shop-card'))patchCard(scope);
    scope.querySelectorAll('.fp-card,.shop-card').forEach(patchCard);
  }

  function start(){
    patch(document);
    new MutationObserver(function(mutations){
      mutations.forEach(function(m){
        m.addedNodes.forEach(function(node){
          if(node&&node.nodeType===1)patch(node);
        });
      });
    }).observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();

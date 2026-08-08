/* DIGIY MARKET — liens publics directs BCHEIKH + ASTOU BOUTIQUE
   Correctif ciblé : remplace uniquement le bouton "Voir" des deux boutiques.
   Ne touche pas à Commander, WhatsApp, SMS ni aux routes PRO.
*/
(function(){
  'use strict';

  var TARGETS = [
    {
      match: function(name){ return name.indexOf('bcheikh') !== -1 || name.indexOf('b cheikh') !== -1; },
      href: 'https://bcheikh.digiylyfe.com/'
    },
    {
      match: function(name){ return name.indexOf('astou') !== -1; },
      href: 'https://astou-boutique.digiylyfe.com/?lang=fr'
    }
  ];

  function normalize(value){
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/gi, ' ')
      .trim()
      .toLowerCase();
  }

  function publicHrefForCard(card){
    if(!card) return '';
    var title = card.querySelector('.shop-title');
    var name = normalize(title ? title.textContent : '');
    if(!name) return '';
    for(var i = 0; i < TARGETS.length; i++){
      if(TARGETS[i].match(name)) return TARGETS[i].href;
    }
    return '';
  }

  function patchCard(card){
    var target = publicHrefForCard(card);
    if(!target) return;

    var links = card.querySelectorAll('.shop-actions a[href]');
    for(var i = 0; i < links.length; i++){
      var link = links[i];
      var href = link.getAttribute('href') || '';
      if(/\/shop\.html(?:\?|$)/i.test(href)){
        link.setAttribute('href', target);
        link.setAttribute('data-digiy-public-target', '1');
        break;
      }
    }
  }

  function patch(root){
    var scope = root && root.querySelectorAll ? root : document;
    if(scope.matches && scope.matches('.shop-card')) patchCard(scope);
    scope.querySelectorAll('.shop-card').forEach(patchCard);
  }

  document.addEventListener('click', function(event){
    var link = event.target && event.target.closest ? event.target.closest('.shop-card .shop-actions a[href]') : null;
    if(!link) return;
    var card = link.closest('.shop-card');
    var target = publicHrefForCard(card);
    if(!target) return;
    var href = link.getAttribute('href') || '';
    if(link.getAttribute('data-digiy-public-target') === '1' || /\/shop\.html(?:\?|$)/i.test(href)){
      event.preventDefault();
      event.stopImmediatePropagation();
      location.assign(target);
    }
  }, true);

  function start(){
    patch(document);
    new MutationObserver(function(mutations){
      mutations.forEach(function(mutation){
        mutation.addedNodes.forEach(function(node){
          if(node && node.nodeType === 1) patch(node);
        });
      });
    }).observe(document.body, { childList:true, subtree:true });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once:true });
  else start();
})();

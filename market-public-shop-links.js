/* DIGIY MARKET — liens publics + cartes de visite BCHEIKH / ASTOU
   Correctif ciblé :
   - conserve les liens publics directs des deux boutiques ;
   - pose leur carte de visite comme visuel principal MARKET ;
   - affiche la carte entière, sans recadrage ;
   - ne touche pas à Commander, WhatsApp, SMS ni aux routes PRO.
*/
(function(){
  'use strict';

  var STYLE_ID='digiy-market-business-card-first-style';
  var TARGETS = [
    {
      match: function(name){ return name.indexOf('bcheikh') !== -1 || name.indexOf('b cheikh') !== -1; },
      href: 'https://bcheikh.digiylyfe.com/',
      image: 'https://raw.githubusercontent.com/BEAUVILLE/bcheikh/main/carte-visite.png',
      alt: 'Carte de visite BCHEIKH'
    },
    {
      match: function(name){ return name.indexOf('astou') !== -1; },
      href: 'https://astou-boutique.digiylyfe.com/?lang=fr',
      image: 'https://raw.githubusercontent.com/BEAUVILLE/astou-boutique/main/ASTOU_BOUTIQUE_CARTE_VISITE_DIGIY.png',
      alt: 'Carte de visite Astou Boutique'
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

  function ensureStyle(){
    if(document.getElementById(STYLE_ID))return;
    var style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent='\n'+
      '.shop-media.digiy-card-first{min-height:300px!important;background:linear-gradient(180deg,#07140f,#10251c)!important;}\n'+
      '.shop-media.digiy-card-first .shop-bg-img{width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important;padding:10px!important;background:#07140f!important;}\n'+
      '@media(max-width:760px){.shop-media.digiy-card-first{min-height:320px!important;}}\n';
    document.head.appendChild(style);
  }

  function targetForCard(card){
    if(!card) return null;
    var title = card.querySelector('.shop-title');
    var name = normalize(title ? title.textContent : '');
    if(!name) return null;
    for(var i = 0; i < TARGETS.length; i++){
      if(TARGETS[i].match(name)) return TARGETS[i];
    }
    return null;
  }

  function patchMainImage(card,target){
    if(!target || !target.image)return;
    var media=card.querySelector('.shop-media');
    if(!media)return;

    ensureStyle();
    media.classList.add('digiy-card-first','has-img');

    var img=media.querySelector('.shop-bg-img');
    if(!img){
      img=document.createElement('img');
      img.className='shop-bg-img';
      img.loading='lazy';
      img.decoding='async';
      media.insertBefore(img,media.firstChild);
    }

    if(img.getAttribute('src')!==target.image)img.setAttribute('src',target.image);
    img.setAttribute('alt',target.alt||'Carte de visite');
    img.removeAttribute('onerror');
    img.setAttribute('data-digiy-business-card','1');
  }

  function patchPublicLink(card,target){
    if(!target || !target.href)return;
    var links = card.querySelectorAll('.shop-actions a[href]');
    for(var i = 0; i < links.length; i++){
      var link = links[i];
      var href = link.getAttribute('href') || '';
      if(/\/shop\.html(?:\?|$)/i.test(href)){
        link.setAttribute('href', target.href);
        link.setAttribute('data-digiy-public-target', '1');
        break;
      }
    }
  }

  function patchCard(card){
    var target = targetForCard(card);
    if(!target) return;
    patchMainImage(card,target);
    patchPublicLink(card,target);
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
    var target = targetForCard(card);
    if(!target) return;
    var href = link.getAttribute('href') || '';
    if(link.getAttribute('data-digiy-public-target') === '1' || /\/shop\.html(?:\?|$)/i.test(href)){
      event.preventDefault();
      event.stopImmediatePropagation();
      location.assign(target.href);
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

(function(){
  'use strict';
  if(document.querySelector('script[data-digiy-featured-partners]'))return;
  var s=document.createElement('script');
  s.src='./market-featured-partners.js?v=20260808-featured-v1';
  s.defer=true;
  s.setAttribute('data-digiy-featured-partners','1');
  document.head.appendChild(s);
})();

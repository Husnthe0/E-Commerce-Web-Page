document.addEventListener('DOMContentLoaded', function(){
  var cards = document.querySelectorAll('.product-card');
  cards.forEach(function(card){
    var btn = card.querySelector('button');
    if(!btn) return;
    btn.addEventListener('click', function(){
      var name = (card.querySelector('.product-info h3') || {}).textContent || '';
      var priceText = (card.querySelector('.product-info p') || {}).textContent || '0';
      var price = parseFloat(priceText.replace(/[^0-9.]/g,'')) || 0;
      var img = (card.querySelector('img') || {}).getAttribute ? card.querySelector('img').getAttribute('src') : '';
      var id = name.toLowerCase().replace(/[^a-z0-9]+/g,'-') || Date.now().toString();
      if(typeof addToCart === 'function') addToCart(id, name.trim(), price, img);
    });
  });
});
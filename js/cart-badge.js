(function(){
function getCart(){
  try{ return JSON.parse(localStorage.getItem('cart'))||[] }catch(e){return[]}
}
function update(){
  var cart=getCart();
  var count=cart.reduce(function(s,i){return s+(i.qty||0)},0);
  document.querySelectorAll('.cart-count').forEach(function(el){el.textContent=count});
}
function bindClicks(){
  document.querySelectorAll('.fa-bag-shopping,.cart-count').forEach(function(el){
    el.style.cursor='pointer';
    el.addEventListener('click',function(){ location.href='cart.html' });
  });
}
window.addEventListener('storage',function(e){ if(e.key==='cart') update() });
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){ update(); bindClicks() }); else { update(); bindClicks() }
})();
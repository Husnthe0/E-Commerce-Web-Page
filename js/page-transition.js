(function(){
  const DURATION = 360;

  function applyLoaded(){
    document.body.classList.remove('is-exiting');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.body.classList.add('has-loaded');
    }));
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(applyLoaded, 20);
  } else {
    document.addEventListener('DOMContentLoaded', applyLoaded);
  }

  document.addEventListener('click', function(e){
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    if (anchor.target === '_blank' || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return;

    let url;
    try { url = new URL(href, location.href); } catch (err) { return; }
    if (url.origin !== location.origin) return;

    if (url.pathname === location.pathname && url.search === location.search) return;

    e.preventDefault();

    document.body.classList.remove('has-loaded');
    document.body.classList.add('is-exiting');

    setTimeout(() => {
      location.href = url.href;
    }, DURATION);

  }, false);

  window.addEventListener('pageshow', function(e){
    if (e.persisted) {
      document.body.classList.remove('is-exiting');
      applyLoaded();
    }
  });

})();
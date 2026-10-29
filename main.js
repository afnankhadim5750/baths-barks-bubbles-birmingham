document.addEventListener('DOMContentLoaded', function () {
  var btn = document.querySelector('[data-menu-toggle]');
  var nav = document.querySelector('[data-mobile-menu]');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); });
    });
  }
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightbox-img');
  document.querySelectorAll('[data-lightbox]').forEach(function (img) {
    img.addEventListener('click', function () {
      lbImg.src = img.dataset.full || img.src;
      lbImg.alt = img.alt;
      lb.classList.add('open');
    });
  });
  var close = document.getElementById('lightbox-close');
  if (close) close.addEventListener('click', function () { lb.classList.remove('open'); });
  if (lb) lb.addEventListener('click', function (e) { if (e.target === lb) lb.classList.remove('open'); });
  var form = document.getElementById('booking-form');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('booking-note').textContent = 'Thanks! To confirm your appointment, please call (205) 214-3782 or message Baths Barks & Bubbles Pet Spa on Facebook — appointments are confirmed directly with the salon.';
  });
  var links = document.querySelectorAll('.navlinks a, .mobile-nav a');
  var sections = [];
  links.forEach(function (a) {
    var id = a.getAttribute('href');
    if (id && id.charAt(0) === '#' && id.length > 1) {
      var el = document.querySelector(id);
      if (el) sections.push({ id: id, el: el });
    }
  });
  if ('IntersectionObserver' in window && sections.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.style.color = a.getAttribute('href') === '#' + en.target.id ? '#6b5b95' : ''; });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { obs.observe(s.el); });
  }
});

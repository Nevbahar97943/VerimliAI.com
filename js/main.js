/**
 * VerimliAI.com - Main JavaScript
 * Handles: navigation, mobile menu, cart, store products, contact form, FAQ, scroll animations
 */
(function () {
  'use strict';

  /* ============================================================
     DOM READY
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initHeaderScroll();
    initMobileMenu();
    initFAQ();
    initScrollReveal();
    initContactForm();
    initRandevuForm();
    initStore();
    initCart();
    initSmoothScroll();
    initROICalculator();
    initAITerminal();
    initCookieBanner();
    initCurrencyDisplay();
  });

  /* ============================================================
     HEADER SCROLL EFFECT
     ============================================================ */
  function initHeaderScroll() {
    var header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /* ============================================================
     MOBILE MENU
     ============================================================ */
  function initMobileMenu() {
    var toggle = document.getElementById('mobileToggle');
    var menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    var links = menu.querySelectorAll('.mobile-menu__link');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ============================================================
     FAQ ACCORDION
     ============================================================ */
  function initFAQ() {
    var items = document.querySelectorAll('.faq__item');
    items.forEach(function (item) {
      var question = item.querySelector('.faq__question');
      if (!question) return;

      question.addEventListener('click', function () {
        var isActive = item.classList.contains('active');

        items.forEach(function (el) {
          el.classList.remove('active');
          var answer = el.querySelector('.faq__answer');
          if (answer) answer.style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          var answer = item.querySelector('.faq__answer');
          if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  }

  /* ============================================================
     COOKIE CONSENT BANNER (GDPR)
     ============================================================ */
  function initCookieBanner() {
    if (getCookie('verimliai_cookie_consent')) return;

    var banner = document.createElement('div');
    banner.className = 'cookie-banner active';
    banner.id = 'cookieBanner';
    banner.innerHTML = '' +
      '<div class="cookie-banner__text">' +
        'Bu web sitesi, size en iyi deneyimi sunmak icin cerezler kullanir. ' +
        'Siteyi kullanmaya devam ederek <a href="gizlilik-politikasi.html" style="color:var(--clr-accent-400);">Gizlilik Politikasi</a>\'ni kabul etmis olursunuz.' +
      '</div>' +
      '<div class="cookie-banner__actions">' +
        '<button class="btn btn-primary btn-sm" id="cookieAccept">Kabul Et</button>' +
        '<button class="btn btn-ghost btn-sm" id="cookieReject">Reddet</button>' +
      '</div>';
    document.body.appendChild(banner);

    document.getElementById('cookieAccept').addEventListener('click', function () {
      setCookie('verimliai_cookie_consent', 'accepted', 365);
      banner.classList.remove('active');
      setTimeout(function () { banner.remove(); }, 400);
    });

    document.getElementById('cookieReject').addEventListener('click', function () {
      setCookie('verimliai_cookie_consent', 'rejected', 365);
      banner.classList.remove('active');
      setTimeout(function () { banner.remove(); }, 400);
    });
  }

  function setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var d = new Date();
      d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + d.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/; SameSite=Lax';
  }

  function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
  }

  /* ============================================================
     GLOBAL PRICE / CURRENCY DISPLAY
     ============================================================ */
  function initCurrencyDisplay() {
    var currency = 'TRY';
    var rates = { TRY: 1, USD: 0.030, EUR: 0.028, GBP: 0.024, AED: 0.11 };
    var symbols = { TRY: 'TL', USD: '$', EUR: '€', GBP: '£', AED: 'AED' };

    // Detect from path
    var path = window.location.pathname;
    if (path.indexOf('/en/') !== -1) currency = 'USD';
    else if (path.indexOf('/ar/') !== -1) currency = 'AED';

    // IP-based override (simulated)
    // In production: fetch('https://ipapi.co/json/').then(...)

    // Store for other scripts
    window.__verimliai = window.__verimliai || {};
    window.__verimliai.currency = currency;
    window.__verimliai.rate = rates[currency];
    window.__verimliai.symbol = symbols[currency];
  }

})();

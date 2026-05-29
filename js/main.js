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
      });
    });
  }

  /* ============================================================
     SCROLL REVEAL (Intersection Observer)
     ============================================================ */
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================================
     CONTACT FORM
     ============================================================ */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name');
      var email = document.getElementById('email');
      if (!name || !email) return;
      if (!name.value.trim() || !email.value.trim()) return;

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Gonderiliyor...';
      submitBtn.disabled = true;

      fetch(form.action, { method: 'POST', body: new FormData(form) })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d.success) { form.style.display = 'none'; var s = document.getElementById('formSuccess'); if (s) s.classList.add('active'); }
          else { submitBtn.textContent = originalText; submitBtn.disabled = false; }
        })
        .catch(function () { form.style.display = 'none'; var s = document.getElementById('formSuccess'); if (s) s.classList.add('active'); });
    });
  }

  /* ============================================================
     RANDEVU FORM
     ============================================================ */
  function initRandevuForm() {
    var form = document.getElementById('randevuForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('randevu_name');
      var email = document.getElementById('randevu_email');
      if (!name || !email) return;
      if (!name.value.trim() || !email.value.trim()) return;

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Gonderiliyor...';
      submitBtn.disabled = true;

      fetch(form.action, { method: 'POST', body: new FormData(form) })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d.success) { form.style.display = 'none'; var s = document.getElementById('randevuFormSuccess'); if (s) s.classList.add('active'); }
          else { submitBtn.textContent = originalText; submitBtn.disabled = false; }
        })
        .catch(function () { form.style.display = 'none'; var s = document.getElementById('randevuFormSuccess'); if (s) s.classList.add('active'); });
    });
  }

  /* ============================================================
     COOKIE CONSENT BANNER (GDPR)
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

  /* ============================================================
     STORE - PRODUCT DATA & RENDERING
     ============================================================ */
  var products = [
    { id: 1, name: 'E-Ticaret Satis Prompt Paketi', category: 'e-ticaret', categoryLabel: 'E-Ticaret', emoji: '\uD83D\uDED2', desc: 'Urun aciklamasi, kampanya metni, musteri yorumu yanitlama ve cross-sell promptlari. 40+ hazir prompt.', price: 149, oldPrice: 249 },
    { id: 2, name: 'Instagram Icerik Takvimi Sablonu', category: 'sosyal-medya', categoryLabel: 'Sosyal Medya', emoji: '\uD83D\uDCF1', desc: '30 gunluk hazir icerik takvimi.', price: 99, oldPrice: 159 },
    { id: 3, name: 'AI ile Reklam Metni Yazma Kilavuzu', category: 'icerik', categoryLabel: 'Icerik Uretimi', emoji: '\uD83D\uDCDD', desc: 'Yuksek donusumlu reklam metni promptlari.', price: 199, oldPrice: null },
    { id: 4, name: 'Musteri Hizmetleri AI Sablonu', category: 'musteeri', categoryLabel: 'Musteri Iliskileri', emoji: '\uD83D\uDCAC', desc: '50 musteri sorusu icin yanit sablonlari.', price: 179, oldPrice: 299 },
    { id: 5, name: 'TikTok & Reels Viral Icerik Paketi', category: 'sosyal-medya', categoryLabel: 'Sosyal Medya', emoji: '\uD83C\uDFAC', desc: '100+ viral hook fikri.', price: 129, oldPrice: 199 },
    { id: 6, name: 'E-Ticaret SEO Prompt Seti', category: 'e-ticaret', categoryLabel: 'E-Ticaret', emoji: '\uD83D\uDD0D', desc: 'Urun sayfasi SEO optimizasyonu promptlari.', price: 159, oldPrice: null },
    { id: 7, name: 'AI ile Email Marketing Sablonlari', category: 'icerik', categoryLabel: 'Icerik Uretimi', emoji: '\uD83D\uDCE7', desc: '20+ email marketing promptu.', price: 139, oldPrice: 219 },
    { id: 8, name: 'Butik ve Moda AI Prompt Kiti', category: 'e-ticaret', categoryLabel: 'E-Ticaret', emoji: '\uD83D\uDC57', desc: 'Moda sektorune ozel promptlar.', price: 169, oldPrice: 279 },
    { id: 9, name: 'Klinik & Saglik Sektoru AI Paketi', category: 'musteeri', categoryLabel: 'Musteri Iliskileri', emoji: '\uD83C\uDFE5', desc: 'Klinik sektorune ozel yanit sablonlari.', price: 189, oldPrice: null }
  ];

  function initStore() {
    var grid = document.getElementById('productsGrid');
    if (!grid) return;
    renderProducts(products);
    var filterBtns = document.querySelectorAll('.store__filter-btn');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.getAttribute('data-filter');
        renderProducts(filter === 'all' ? products : products.filter(function (p) { return p.category === filter; }));
      });
    });
  }

  function renderProducts(productList) {
    var grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    productList.forEach(function (p) {
      var card = document.createElement('div');
      card.className = 'product-card reveal';
      card.innerHTML = '<div class="product-card__image">' + p.emoji + '</div><div class="product-card__body"><div class="product-card__category">' + p.categoryLabel + '</div><h3 class="product-card__title">' + p.name + '</h3><p class="product-card__desc">' + p.desc + '</p><div class="product-card__footer"><div><span class="product-card__price">' + p.price + ' TL</span>' + (p.oldPrice ? '<span class="product-card__price-old">' + p.oldPrice + ' TL</span>' : '') + '</div><button class="btn btn-primary btn-sm" data-add-to-cart="' + p.id + '">Sepete Ekle</button></div></div>';
      grid.appendChild(card);
    });
    initScrollReveal();
    var addBtns = grid.querySelectorAll('[data-add-to-cart]');
    addBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pid = parseInt(btn.getAttribute('data-add-to-cart'));
        var prod = products.find(function (p) { return p.id === pid; });
        if (prod) addToCart(prod);
      });
    });
  }

  /* ============================================================
     CART
     ============================================================ */
  var cart = [];
  function initCart() {
    loadCartFromStorage();
    var cartToggle = document.getElementById('cartToggle');
    var cartClose = document.getElementById('cartClose');
    var cartOverlay = document.getElementById('cartOverlay');
    var checkoutBtn = document.getElementById('checkoutBtn');
    if (cartToggle) cartToggle.addEventListener('click', function (e) { e.preventDefault(); openCart(); });
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    if (checkoutBtn) checkoutBtn.addEventListener('click', function () {
      if (cart.length === 0) return;
      showToast('Odeme sayfasina yonlendiriliyorsunuz. Toplam: ' + getCartTotal() + ' TL');
      setTimeout(function () { window.location.href = 'odeme-basarili.html'; }, 1500);
      cart = []; saveCartToStorage(); renderCart(); closeCart();
    });
    renderCart();
  }

  function addToCart(product) {
    var ex = cart.find(function (i) { return i.id === product.id; });
    if (ex) ex.quantity += 1;
    else cart.push({ id: product.id, name: product.name, price: product.price, emoji: product.emoji, quantity: 1 });
    saveCartToStorage(); renderCart();
    showToast(product.name + ' sepete eklendi');
  }

  function removeFromCart(id) { cart = cart.filter(function (i) { return i.id !== id; }); saveCartToStorage(); renderCart(); }
  function getCartTotal() { return cart.reduce(function (t, i) { return t + i.price * i.quantity; }, 0); }
  function getCartItemCount() { return cart.reduce(function (c, i) { return c + i.quantity; }, 0); }

  function renderCart() {
    var items = document.getElementById('cartItems');
    var footer = document.getElementById('cartFooter');
    var total = document.getElementById('cartTotal');
    var cnt = document.getElementById('cartCount');
    if (cnt) cnt.textContent = '(' + getCartItemCount() + ')';
    if (!items) return;
    if (cart.length === 0) { items.innerHTML = '<div class="cart-sidebar__empty">Sepetiniz bos.</div>'; if (footer) footer.style.display = 'none'; return; }
    if (footer) footer.style.display = 'block';
    items.innerHTML = cart.map(function (i) { return '<div class="cart-item"><div class="cart-item__icon">' + i.emoji + '</div><div class="cart-item__info"><div class="cart-item__name">' + i.name + '</div><div class="cart-item__price">' + i.price + ' TL x ' + i.quantity + '</div></div><button class="cart-item__remove" data-remove="' + i.id + '">\u2715</button></div>'; }).join('');
    if (total) total.textContent = getCartTotal() + ' TL';
    items.querySelectorAll('[data-remove]').forEach(function (b) { b.addEventListener('click', function () { removeFromCart(parseInt(b.getAttribute('data-remove'))); }); });
  }

  function openCart() { var s = document.getElementById('cartSidebar'); var o = document.getElementById('cartOverlay'); if (s) s.classList.add('active'); if (o) o.classList.add('active'); document.body.style.overflow = 'hidden'; }
  function closeCart() { var s = document.getElementById('cartSidebar'); var o = document.getElementById('cartOverlay'); if (s) s.classList.remove('active'); if (o) o.classList.remove('active'); document.body.style.overflow = ''; }
  function saveCartToStorage() { try { localStorage.setItem('verimliai_cart', JSON.stringify(cart)); } catch (e) {} }
  function loadCartFromStorage() { try { var s = localStorage.getItem('verimliai_cart'); if (s) cart = JSON.parse(s); } catch (e) { cart = []; } }

  /* ============================================================
     TOAST
     ============================================================ */
  function showToast(msg) {
    var t = document.getElementById('toast');
    var txt = document.getElementById('toastText');
    if (!t || !txt) return;
    txt.textContent = msg; t.classList.add('active'); t.classList.add('toast--success');
    clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove('active'); }, 2500);
  }

  /* ============================================================
     SMOOTH SCROLL
     ============================================================ */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var hh = document.getElementById('header');
      var offset = hh ? hh.offsetHeight : 72;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
    });
  }

  /* ============================================================
     ROI CALCULATOR
     ============================================================ */
  function initROICalculator() {
    var msgSlider = document.getElementById('msgSlider');
    var priceSlider = document.getElementById('priceSlider');
    if (!msgSlider || !priceSlider) return;
    var msgD = document.getElementById('msgCountDisplay');
    var priceD = document.getElementById('priceDisplay');
    var rev = document.getElementById('roiRevenue');
    var timeEl = document.getElementById('roiTime');

    function calc() {
      var msgs = parseInt(msgSlider.value);
      var price = parseInt(priceSlider.value);
      var recovered = Math.round(msgs * 0.30);
      var revVal = recovered * price;
      var mins = msgs * 2;
      var hrs = Math.round(mins / 60);
      msgD.textContent = msgs;
      priceD.textContent = price + ' TL';
      rev.textContent = revVal.toLocaleString('tr-TR') + ' TL';
      timeEl.textContent = hrs >= 160 ? Math.round(hrs / 160) + ' Tam Zamanli Eleman' : hrs >= 40 ? hrs + ' Saat (' + Math.round(hrs / 40) + ' Hafta)' : hrs + ' Saat';
    }
    msgSlider.addEventListener('input', calc);
    priceSlider.addEventListener('input', calc);
    calc();
  }

  /* ============================================================
     AI TERMINAL
     ============================================================ */
  function initAITerminal() {
    var commands = { 'fiyat': 'index.html#paketler', 'fiyatlar': 'index.html#paketler', 'paket': 'index.html#paketler', 'randevu': 'randevu.html', 'demo': 'demolar.html', 'demolar': 'demolar.html', 'magaza': 'magaza.html', 'blog': 'blog.html', 'iletisim': 'iletisim.html', 'altyapi': 'altyapi.html', 'entegrasyon': 'entegrasyonlar.html', 'sozluk': 'ai-sozluk.html', 'guvenlik': 'veri-guvenligi.html', 'durum': 'sistem-durumu.html', 'checkup': 'checkup.html', 'rapor': 'raporlar.html', 'basari': 'basari-hikayeleri.html', 'anasayfa': 'index.html', 'hizmet': 'index.html#hizmetler' };

    var termHTML = '<div class="ai-terminal" id="aiTerminal"><div class="ai-terminal__input-wrap"><span class="ai-terminal__prompt">></span><input type="text" class="ai-terminal__input" id="terminalInput" placeholder="Komut yazin... (fiyatlar, randevu, blog)" autocomplete="off"><button class="ai-terminal__close" id="terminalClose">✕</button></div><div class="ai-terminal__hint"><span class="ai-terminal__hint-item">fiyatlar</span><span class="ai-terminal__hint-item">randevu</span><span class="ai-terminal__hint-item">blog</span><span class="ai-terminal__hint-item">demolar</span><span class="ai-terminal__hint-item">magaza</span></div></div><button class="terminal-trigger" id="terminalTrigger" title="AI Terminal (Ctrl+K)">></button>';

    var div = document.createElement('div'); div.innerHTML = termHTML;
    document.body.appendChild(div.firstElementChild);
    document.body.appendChild(div.firstElementChild);

    var term = document.getElementById('aiTerminal');
    var trig = document.getElementById('terminalTrigger');
    var inp = document.getElementById('terminalInput');
    var cls = document.getElementById('terminalClose');

    function open() { term.classList.add('active'); trig.style.display = 'none'; setTimeout(function () { inp.focus(); }, 200); }
    function close() { term.classList.remove('active'); trig.style.display = 'flex'; inp.value = ''; }

    trig.addEventListener('click', open);
    cls.addEventListener('click', close);
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { var cmd = inp.value.toLocaleLowerCase('tr').trim(); if (commands[cmd]) { close(); window.location.href = commands[cmd]; } }
      if (e.key === 'Escape') close();
    });

    document.querySelectorAll('.ai-terminal__hint-item').forEach(function (h) {
      h.addEventListener('click', function () { var cmd = h.textContent.toLocaleLowerCase('tr').trim(); if (commands[cmd]) { close(); window.location.href = commands[cmd]; } });
    });

    document.addEventListener('keydown', function (e) { if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); term.classList.contains('active') ? close() : open(); } });
    document.addEventListener('click', function (e) { if (term.classList.contains('active') && !term.contains(e.target) && e.target !== trig) close(); });
  }

)();

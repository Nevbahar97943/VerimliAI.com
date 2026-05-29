/**
 * VerimliAI - Kurumsal AI Chatbot Widget
 * Kural tabanli akilli asistan. Ziyaretcileri bilgilendirir ve randevuya yonlendirir.
 */
(function () {
  'use strict';

  /* ============================================================
     CHATBOT KNOWLEDGE BASE
     ============================================================ */
  var knowledgeBase = {
    greeting: {
      tr: [
        'Merhaba! Ben VerimliAI\'nin dijital asistanıyım. Size nasıl yardımcı olabilirim?',
        'Hoş geldiniz! İşletmeniz için yapay zeka çözümlerimiz hakkında bilgi alabilirsiniz.'
      ],
      en: [
        'Hello! I\'m VerimliAI\'s digital assistant. How can I help you optimize your business?',
        'Welcome! Learn about our AI automation solutions for your enterprise.'
      ],
      ar: [
        'مرحباً! أنا المساعد الرقمي لـ VerimliAI. كيف يمكنني مساعدتك في تطوير أعمالك؟'
      ]
    },
    fallback: {
      tr: [
        'Bu konuda size en iyi şekilde yardımcı olabilmem için ücretsiz danışmanlık randevusu oluşturmanızı öneririm.',
        'Anladım, bu konuyu size daha detaylı anlatabilmemiz için bir görüşme planlayalım mı?'
      ],
      en: [
        'I recommend scheduling a free consultation so we can best assist you with this topic.',
        'Let\'s schedule a meeting to discuss this in detail. Would you like me to redirect you?'
      ],
      ar: [
        'أوصي بتحديد موعد استشارة مجانية لمساعدتك بشكل أفضل في هذا الموضوع.'
      ]
    }
  };

  /* ============================================================
     LANGUAGE DETECTION
     ============================================================ */
  function getLang() {
    if (window.__verimliai && window.__verimliai.currency === 'USD') return 'en';
    if (window.__verimliai && window.__verimliai.currency === 'AED') return 'ar';
    return 'tr';
  }

  var responses = {
    /* --- Hizmetler --- */
    'hizmet|hizmetler|neler|neler yapıyorsunuz|ne iş|ne is|ne yapıyor': function () {
      return 'VerimliAI olarak 3 temel hizmet sunuyoruz:\n\n' +
        '📌 <b>AI Satış Asistanı:</b> Instagram DM, WhatsApp ve web sitenizde 7/24 müşterileri karşılayan, soruları yanıtlayan ve doğrudan satış kapatan akıllı bot.\n\n' +
        '📌 <b>AI İçerik Asistanı:</b> Sosyal medya içerik planı, Reels/TikTok senaryoları ve reklam metinlerini otomatik üreten AI sistemi.\n\n' +
        '📌 <b>Dijital Mağaza:</b> Hazır prompt paketleri ve AI destekli iş şablonları.\n\n' +
        'Hangisi hakkında daha fazla bilgi almak istersiniz?';
    },

    'satış|satis|satis asistani|satis bot|dm|instagram dm|whatsapp': function () {
      return 'AI Satış Asistanımız tam size göre! 🚀\n\n' +
        'İşletmenizin Instagram DM ve WhatsApp mesajlarını 7/24 yanıtlar, kargo takibi yapar ve müşteriyi ödeme linkine yönlendirerek satışı kapatır.\n\n' +
        'Kurulum: <b>7.500 TL - 20.000 TL</b> (tek seferlik)\n' +
        'Aylık: <b>1.500 TL - 3.500 TL</b>\n\n' +
        '📊 Sonuç: Müşterilerimiz ayda ortalama +%40 satış artışı görüyor.\n\n' +
        'Detaylı bilgi ve ücretsiz demo için randevu almak ister misiniz?';
    },

    'içerik|icerik|icerik asistanı|icerik asistani|sosyal medya|reels|tiktok': function () {
      return 'AI İçerik Asistanı ile sosyal medyada rakiplerinizin önüne geçin! 📱\n\n' +
        'Sizin için her ay:\n' +
        '• 30 günlük içerik takvimi\n' +
        '• Reels/TikTok senaryoları ve hook metinleri\n' +
        '• Reklam copy\'leri\n' +
        '• Trend analizi ve adaptasyon\n\n' +
        'İçerik üretmek için saatler harcamayı bırakın, AI sizin için çalışsın.\n\n' +
        'Ücretsiz danışmanlık için randevu oluşturalım mı?';
    },

    'magaza|dijital|mağaza|ürün|urun|prompt|rehber|satın|satin': function () {
      return 'Dijital Mağazamızda şu ürünleri bulabilirsiniz:\n\n' +
        '🛍️ <b>Satış Artıran 50 ChatGPT Komutu:</b> 149 TL\n' +
        '🛍️ <b>Sosyal Medya İçerik Üretim Promptları:</b> 99 TL\n' +
        '🛍️ <b>AI ile Reklam Metni Yazma Kılavuzu:</b> 199 TL\n\n' +
        'Tüm ürünler anında dijital teslimat ile e-posta adresinize gönderilir.\n\n' +
        'Mağazayı ziyaret etmek ister misiniz? Sizi yönlendireyim.';
    },

    /* --- Fiyat --- */
    'fiyat|ücret|ucret|maliyet|kaç|kac|para|kaç tl|kac tl|ne kadar|bütçe|butce': function () {
      return 'İşletmenizin ihtiyacına göre 3 paketimiz var:\n\n' +
        '🔹 <b>Başlangıç:</b> 7.500 TL + 1.500 TL/ay\n' +
        '🔹 <b>Profesyonel:</b> 12.500 TL + 2.500 TL/ay (En popüler 🏆)\n' +
        '🔹 <b>Kurumsal:</b> 20.000 TL + 3.500 TL/ay\n\n' +
        'Her pakette AI Satış Asistanı kurulumu ve aylık bakım dahil.\n' +
        'Size özel fiyat teklifi için ücretsiz danışmanlık randevusu alın!';
    },

    /* --- Randevu --- */
    'randevu|danışmanlık|danismanlik|görüşme|gorusme|demo|toplantı|toplanti|ücretsiz|ucretsiz': function () {
      return 'Harika! Ücretsiz danışmanlık randevunuzu hemen oluşturabiliriz. 🗓️\n\n' +
        '30 dakikalık online keşif görüşmesinde:\n' +
        '• İşletmenizi ve ihtiyaçlarınızı analiz ediyoruz\n' +
        '• Size en uygun AI çözümünü belirliyoruz\n' +
        '• Örnek bir demo sunuyoruz\n\n' +
        'Randevu sayfasına gitmek ister misiniz?';
    },

    /* --- Nasıl çalışır --- */
    'nasıl|nasil|süreç|surec|adım|adim|kurulum|entegrasyon|ne kadar süre|ne kadar sure': function () {
      return 'VerimliAI ile çalışma sürecimiz çok basit:\n\n' +
        '1️⃣ <b>Keşif Görüşmesi:</b> 30 dk ücretsiz analiz\n' +
        '2️⃣ <b>Kurulum:</b> 2-7 iş günü içinde sisteminiz hazır\n' +
        '3️⃣ <b>Canlıya Alma:</b> Ekibinize 1 saat ücretsiz eğitim\n' +
        '4️⃣ <b>Aylık Optimizasyon:</b> Sürekli iyileştirme ve raporlama\n\n' +
        'Başlangıç paketi kurulumu sadece 2-3 iş günü sürer!';
    },

    /* --- Kimler için --- */
    'kimler|işletme|isletme|kobi|butik|e-ticaret|eticaret|klinik': function () {
      return 'VerimliAI özellikle şu işletmeler için idealdir:\n\n' +
        '✅ E-ticaret markaları ve butikler\n' +
        '✅ Instagram üzerinden satış yapanlar\n' +
        '✅ Klinik ve sağlık kuruluşları\n' +
        '✅ Yerel işletmeler ve hizmet sektörü\n' +
        '✅ Dijitalde büyümek isteyen tüm KOBİ\'ler\n\n' +
        'İşletmenizin büyüklüğü ne olursa olsun, size özel bir çözümümüz var!';
    },

    /* --- İletişim --- */
    'iletişim|iletisim|mail|e-posta|email|telefon|tel|ulaş|ulas': function () {
      return 'Bize şu kanallardan ulaşabilirsiniz:\n\n' +
        '📧 E-posta: <b>info@verimliai.com</b>\n' +
        '📞 Telefon: <b>+90 (XXX) XXX XX XX</b>\n' +
        '📍 Konum: İstanbul, Türkiye\n\n' +
        'Çalışma saatleri: Hafta içi 09:00 - 18:00\n\n' +
        'Veya hemen şimdi randevu alarak bize ulaşabilirsiniz!';
    },

    /* --- Teşekkür / Kapanış --- */
    'teşekkür|tesekkur|sağol|saol|eyvallah|tamam|tmm|görüşürüz|gorusuruz': function () {
      return 'Rica ederim, yardımcı olabildiğime sevindim! 😊\n\n' +
        'İşletmenizi yapay zeka ile büyümek için biz her zaman buradayız.\n\n' +
        'Unutmayın: Ücretsiz danışmanlık randevusu ile işletmenize özel çözümleri keşfedebilirsiniz.\n\n' +
        'İyi günler dilerim! 🚀';
    }
  };

  /* ============================================================
     QUICK ACTIONS (Hizli Butonlar)
     ============================================================ */
  var quickActions = [
    { label: 'Hizmetlerimiz', query: 'hizmetler' },
    { label: 'Fiyatlar', query: 'fiyat' },
    { label: 'Ucretsiz Randevu', query: 'randevu' },
    { label: 'Iletisim', query: 'iletisim' }
  ];

  /* ============================================================
     BUILD CHATBOT HTML
     ============================================================ */
  var chatbotHTML = '' +
    '<div class="chatbot" id="chatbot">' +
      '<button class="chatbot__toggle" id="chatbotToggle" aria-label="AI Asistan">' +
        '<span class="chatbot__toggle-icon chatbot__toggle-icon--open">💬</span>' +
        '<span class="chatbot__toggle-icon chatbot__toggle-icon--close" style="display:none;">✕</span>' +
        '<span class="chatbot__pulse"></span>' +
      '</button>' +
      '<div class="chatbot__window" id="chatbotWindow">' +
        '<div class="chatbot__header">' +
          '<div class="chatbot__header-avatar">V</div>' +
          '<div class="chatbot__header-info">' +
            '<div class="chatbot__header-name">VerimliAI Asistan</div>' +
            '<div class="chatbot__header-status">' +
              '<span class="chatbot__header-dot"></span> Çevrimiçi' +
            '</div>' +
          '</div>' +
          '<button class="chatbot__header-close" id="chatbotClose">✕</button>' +
        '</div>' +
        '<div class="chatbot__messages" id="chatbotMessages"></div>' +
        '<div class="chatbot__quick-actions" id="chatbotQuickActions"></div>' +
        '<div class="chatbot__input-wrap">' +
          '<input type="text" class="chatbot__input" id="chatbotInput" placeholder="Mesajınızı yazın..." autocomplete="off">' +
          '<button class="chatbot__send" id="chatbotSend">➤</button>' +
        '</div>' +
        '<div class="chatbot__footer-text">VerimliAI Kurumsal Asistan · 7/24</div>' +
      '</div>' +
    '</div>';

  /* ============================================================
     INJECT INTO PAGE
     ============================================================ */
  function injectChatbot() {
    var container = document.createElement('div');
    container.innerHTML = chatbotHTML;
    document.body.appendChild(container.firstElementChild);
  }

  /* ============================================================
     CHAT LOGIC
     ============================================================ */
  var chatbot, chatbotWindow, chatbotMessages, chatbotInput, chatbotQuickActions;
  var isOpen = false;
  var hasGreeted = false;

  function initChatbot() {
    chatbot = document.getElementById('chatbot');
    chatbotWindow = document.getElementById('chatbotWindow');
    chatbotMessages = document.getElementById('chatbotMessages');
    chatbotInput = document.getElementById('chatbotInput');
    chatbotQuickActions = document.getElementById('chatbotQuickActions');

    document.getElementById('chatbotToggle').addEventListener('click', toggleChat);
    document.getElementById('chatbotClose').addEventListener('click', closeChat);
    document.getElementById('chatbotSend').addEventListener('click', handleSend);
    chatbotInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSend();
      }
    });

    renderQuickActions();
  }

  function toggleChat() {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  }

  function openChat() {
    isOpen = true;
    chatbot.classList.add('chatbot--open');
    chatbotWindow.style.display = 'flex';
    document.getElementById('chatbotToggle').querySelector('.chatbot__toggle-icon--open').style.display = 'none';
    document.getElementById('chatbotToggle').querySelector('.chatbot__toggle-icon--close').style.display = 'block';

    if (!hasGreeted) {
      setTimeout(function () {
        var lang = getLang();
        addMessage('bot', randomFrom(knowledgeBase.greeting[lang] || knowledgeBase.greeting['tr']));
      }, 400);
      hasGreeted = true;
    }

    setTimeout(function () {
      chatbotInput.focus();
    }, 500);
  }

  function closeChat() {
    isOpen = false;
    chatbot.classList.remove('chatbot--open');
    chatbotWindow.style.display = 'none';
    document.getElementById('chatbotToggle').querySelector('.chatbot__toggle-icon--open').style.display = 'block';
    document.getElementById('chatbotToggle').querySelector('.chatbot__toggle-icon--close').style.display = 'none';
  }

  function handleSend() {
    var text = chatbotInput.value.trim();
    if (!text) return;

    addMessage('user', text);
    chatbotInput.value = '';

    setTimeout(function () {
      var response = findResponse(text);
      addMessage('bot', response);
    }, 600 + Math.random() * 600);

    chatbotInput.focus();
  }

  function addMessage(type, text) {
    var msg = document.createElement('div');
    msg.className = 'chatbot__msg chatbot__msg--' + type;

    var bubble = document.createElement('div');
    bubble.className = 'chatbot__bubble chatbot__bubble--' + type;

    bubble.innerHTML = text.replace(/\n/g, '<br>');
    msg.appendChild(bubble);

    if (type === 'bot') {
      var time = document.createElement('div');
      time.className = 'chatbot__time';
      time.textContent = 'Az önce';
      msg.appendChild(time);
    }

    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function findResponse(text) {
    var lower = text.toLocaleLowerCase('tr');

    for (var pattern in responses) {
      var keywords = pattern.split('|');
      for (var i = 0; i < keywords.length; i++) {
        if (lower.indexOf(keywords[i]) !== -1) {
          return responses[pattern]();
        }
      }
    }

    // Check against quick actions
    if (lower.indexOf('evet') !== -1 || lower.indexOf('tamam') !== -1 || lower.indexOf('olur') !== -1) {
      return 'Harika! Hemen randevu sayfamıza giderek ücretsiz danışmanlık randevunuzu oluşturabilirsiniz. Sizi yönlendirmemi ister misiniz?\n\n<a href="randevu.html" target="_blank" style="color: #00d2d3;">👉 Randevu sayfasına git</a>';
    }

    return randomFrom(knowledgeBase.fallback);
  }

  function handleQuickAction(query) {
    addMessage('user', query);
    setTimeout(function () {
      var response = findResponse(query);
      addMessage('bot', response);
    }, 400);
    chatbotInput.focus();
  }

  function renderQuickActions() {
    chatbotQuickActions.innerHTML = '';
    quickActions.forEach(function (action) {
      var btn = document.createElement('button');
      btn.className = 'chatbot__quick-btn';
      btn.textContent = action.label;
      btn.addEventListener('click', function () {
        handleQuickAction(action.query);
      });
      chatbotQuickActions.appendChild(btn);
    });
  }

  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    injectChatbot();
    initChatbot();
  });

})();

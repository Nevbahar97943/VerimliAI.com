# VerimliAI - Teknik Entegrasyon Kurulum Rehberi

> Son guncelleme: Mayis 2026

---

## 1. Web3Forms (Iletisim Formu Mail Entegrasyonu)

Web3Forms, ucretsiz (250 gonderim/ay) form-to-email servisidir. Sitenizdeki formlardan gelen mesajlari dogrudan e-postaniza iletir.

### Kurulum Adimlari:

1. **Hesap olusturun:** https://web3forms.com adresine gidin, "Get Access Key" butonuna tiklayin.
2. **E-posta ile kaydolun:** info@verimliai.com veya kullanmak istediginiz e-posta adresiyle kayit olun.
3. **Access Key alin:** Kayit sonrasi size ozel bir access key verilecek. Ornek: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
4. **Siteye ekleyin:** Asagidaki iki dosyadaki `YOUR_WEB3FORMS_ACCESS_KEY` yazan yerleri kendi key'inizle degistirin:
   - `iletisim.html` - iletisim formu
   - `randevu.html` - randevu formu

```html
<!-- Form icindeki bu satiri bulun: -->
<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">

<!-- Kendi key'inizle degistirin: -->
<input type="hidden" name="access_key" value="sizin-gercek-keyiniz">
```

5. **Test edin:**
   - `iletisim.html` sayfasindaki formu doldurup gonderin
   - Kayitli e-posta adresinize mesajin ulastigini kontrol edin
   - Spam/onemsiz klasorune de bakin

> **Not:** Web3Forms'un spam bot korumasi icin formlara eklenen gizli `botcheck` checkbox'i mevcuttur. Gercek kullanicilar bu alani gormez.

---

## 2. Shopier (Dijital Urun Odeme Entegrasyonu)

Shopier, Turkiye'de dijital urun satisi icin en yaygin kullanilan odeme altyapisidir. Kredi karti, havale/EFT ve kapida odeme destekler.

### Kurulum Adimlari:

1. **Shopier hesabi olusturun:** https://www.shopier.com adresinde satici hesabi acin.
2. **Magaza bilgilerini doldurun:** Magaza adi, iletisim, banka hesabi vb.
3. **Dijital urun ekleyin:**
   - Shopier panelinde "Urunler" -> "Yeni Urun Ekle"
   - Her dijital urun icin bir Shopier urunu olusturun
   - Urun turunu "Dijital Urun" olarak isaretleyin
   - **Onemli:** "Teslimat" ayarlarinda "E-posta ile otomatik gonder" secenegini aktif edin
   - PDF dosyalarinizi Shopier'e yukleyin (odeme sonrasi otomatik gonderim icin)

4. **Magaza ID'nizi alin:**
   - Shopier panelinde "Magaza Ayarlari" -> "Magaza Bilgileri"
   - "Magaza ID" veya "Shop ID" degerini kopyalayin (ornegin: `verimliai`)

5. **Siteye entegre edin:**
   - `js/main.js` dosyasinda su satiri bulun:
   ```javascript
   var shopierShopId = 'YOUR_SHOPIER_SHOP_ID';
   ```
   - Kendi magaza ID'nizle degistirin:
   ```javascript
   var shopierShopId = 'verimliai';
   ```

6. **Odeme akisi:**
   - Musteri magazadan urun sepete ekler
   - "Odeme Yap" butonuna tiklar
   - Shopier odeme sayfasina yonlendirilir
   - Odeme tamamlaninca Shopier otomatik olarak:
     - PDF urunu musteri e-postasina gonderir
     - Musteriyi `odeme-basarili.html` sayfasina yonlendirir

7. **Shopier'de basari/hata sayfalari ayarlari:**
   - Shopier panelinde "Ayarlar" -> "Sayfa Yonlendirmeleri"
   - Basarili odeme sonrasi: `https://verimliai.com/odeme-basarili.html`
   - Basarisiz odeme sonrasi: `https://verimliai.com/magaza.html`

### Alternatif: Manuel Odeme Yontemi

Eger Shopier henuz aktif degilse, magaza checkout'u odeme sayfasina yonlendirir ve orada manuel talimatlar gosterilir.

---

## 3. Calendly (Online Randevu Takvimi)

Calendly, ucretsiz (1 etkinlik tipi) online randevu planlama aracidir.

### Kurulum Adimlari:

1. **Ucretsiz hesap olusturun:** https://calendly.com adresine gidin.
2. **Etkinlik olusturun:**
   - "Create" -> "Event Type" -> "30 Minute Meeting"
   - Etkinlik adi: "Ucretsiz AI Kesif Gorusmesi"
   - Konum: "Zoom" veya "Google Meet" (otomatik link olusturur)
   - Musaitlik takviminizi ayarlayin
3. **Soru ekleyin (Zorunlu Alanlar):**
   - Etkinlik ayarlarinda "Invitee Questions" bolumune gidin
   - Sunlari zorunlu soru olarak ekleyin:
     - "Isletmenizin adi nedir?" (Kisa metin, zorunlu)
     - "Instagram hesabiniz nedir?" (Kisa metin, zorunlu)
     - "En cok hangi alanda AI otomasyonuna ihtiyaciniz var?" (Coktan secmeli: Musteri Iliskileri / Sosyal Medya / Satis / Hepsi / Kararsizim, zorunlu)
4. **Embed kodunu alin:**
   - Etkinlik sayfasinda "Share" -> "Add to Website" -> "Inline Embed"
   - Kodu kopyalayin
5. **Siteye ekleyin:**
   - `randevu.html` dosyasinda yorum satirindaki Calendly embed kodunu aktif edin
   - `data-url="PLACEHOLDER_URL"` kismini kendi Calendly linkinizle degistirin
   - Placeholder bolumunu gizleyin veya kaldirin

### Alternatifler (Ucretsiz):
- **Zcal** (zcal.co) - Tamamen ucretsiz
- **Calendar.com** - Ucretsiz tier mevcut
- **Google Calendar Appointment Schedule** - Google Workspace ile ucretsiz

---

## 4. AI Chatbot (Mevcut Durum)

Sitenizdeki chatbot **kural tabanli** olarak calisir ve herhangi bir harici servise ihtiyac duymaz. Su an icin 12 farkli konu basliginda yanit verebilir.

### Chatbase / Msty Yükseltmesi (Opsiyonel):

Eger daha gelismis bir AI chatbot isterseniz:

1. **Chatbase** (chatbase.co):
   - Ucretsiz baslangic: 30 mesaj/ay
   - VerimliAI hizmetleri, fiyatlandirma, SSS bilgilerini yukleyin
   - Embed kodunu alip chatbot.js yerine ekleyin

2. **Msty** (msty.ai):
   - Lokal olarak calisir
   - Kendi API anahtarinizla kullanabilirsiniz
   - Sitenize gommek icin ek gelistirme gerekir

---

## 5. Kurumsal E-Posta Kurulumu

### Secenek A: Alan Adi E-postasi (Onerilen)

Domain'inizi (verimliai.com) alirken cogu domain saglayicisi ucretsiz e-posta hosting sunar.

**Adimlar:**
1. Domain kontrol panelinize giris yapin
2. "E-posta Hesaplari" veya "Email" bolumune gidin
3. `info@verimliai.com` adresini olusturun
4. Gelen kutusuna webmail veya Gmail uzerinden erisin

**Gmail ile kullanmak icin:**
1. Gmail Ayarlari -> "Hesaplar ve Ice Aktarma" -> "E-posta adresi ekle"
2. info@verimliai.com bilgilerini girin (SMTP/POP3)
3. Gmail uzerinden gonderip/alabilirsiniz

### Secenek B: Forwarding (Yonlendirme)

Domain panelinizden `info@verimliai.com` adresine gelen mailleri mevcut Gmail adresinize yonlendirin.

### Secenek C: Ucretsiz E-posta (Gecici Cozum)

Domain kurulumu yapilana kadar Web3Forms uzerinden gelen mesajlari mevcut e-postaniza alabilirsiniz. Web3Forms kayit sirasinda verdiginiz e-posta adresine tum form gonderimleri iletilir.

---

## 6. Tum Sistemleri Test Etme

### Test Kontrol Listesi:

- [ ] **Iletisim formu:** `iletisim.html` -> Formu doldur -> E-postaya mesaj geldi mi?
- [ ] **Randevu formu:** `randevu.html` -> Formu doldur -> E-postaya talep geldi mi?
- [ ] **Magaza sepeti:** Urun ekle -> Sepeti ac -> Sepette gorunuyor mu?
- [ ] **Magaza checkout:** Odeme Yap -> Yonlendirme calisiyor mu?
- [ ] **Odeme basari sayfasi:** `odeme-basarili.html` sayfasi duzgun goruntuleniyor mu?
- [ ] **Chatbot:** Sag alt kosedeki simgeye tikla -> Mesaj yaz -> Yanit aliyor musun?
- [ ] **Mobil gorunum:** Telefondan tum sayfalari kontrol et
- [ ] **Navigasyon:** Tum linkler dogru sayfalara yonlendiriyor mu?
- [ ] **Footer:** Tum footer linkleri calisiyor mu?

---

## 7. Hizli Baslangic (Ilk Yapilacaklar)

1. **Web3Forms access key al** (2 dakika) -> iletisim.html ve randevu.html'e ekle
2. **Shopier hesabi ac** (5 dakika) -> Magaza ID'yi main.js'e ekle
3. **Domain e-postasini aktif et** (domain panelinden)
4. **Calendly hesabi ac** (opsiyonel, form su an yeterli)
5. **Tum testleri yap** (yukaridaki kontrol listesi)

---

> Sorulariniz icin: info@verimliai.com

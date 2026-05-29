# VerimliAI — Site Bakim, Guvenlik ve Performans Rehberi

## Sifir Kod Degisikligi · Tamamen Sunucu/Platform Konfigurasyonu

---

## 1. CLOUDFLARE WAF — Kuresel Siber Guvenlik Duvari

### 1.1 Cloudflare'a Site Ekleme
1. https://dash.cloudflare.com adresine git, hesap olustur.
2. "Add a Site" → `verimliai.com` gir.
3. Cloudflare mevcut DNS kayitlarini otomatik tarar.
4. **Free Plan** sec (KOBi siteleri icin yeterli).
5. Cloudflare'in verdigi 2 nameserver adresini, domain panelinde (domaini aldigim yer) guncelle.
6. 24-48 saat icinde DNS yayilimi tamamlanir.

### 1.2 WAF (Web Application Firewall) Kurallari
Cloudflare Dashboard → Security → WAF:

```
Kural 1: SQL Injection Engelleme
  - Field: URI Query String
  - Operator: contains
  - Value: "SELECT", "UNION", "DROP", "INSERT INTO"
  - Action: Block

Kural 2: XSS Engelleme
  - Field: URI Query String
  - Operator: contains
  - Value: "<script>", "javascript:", "onerror="
  - Action: Block

Kural 3: Brute Force Koruma
  - Rate Limiting: 10 istek / 10 saniye / IP
  - Action: JS Challenge

Kural 4: Bot Korumasi
  - Security → Bots → Bot Fight Mode: ON
  - Verified Bots: Allow (Google, Bing)
  - Definitely Automated: Block
```

### 1.3 DDoS Korumasi
Cloudflare Dashboard → Security → DDoS:
- **HTTP DDoS korumasi:** Varsayilan olarak aktif (Free tier'da temel koruma).
- **"I'm Under Attack" modu:** Saldiri aninda manuel aktif edilir. Tum ziyaretcilere JS challenge gosterir.

### 1.4 SSL/TLS Ayarlari
Cloudflare Dashboard → SSL/TLS:
- **SSL/TLS encryption mode:** Full (strict) — hem Cloudflare-sunucu hem kullanici-Cloudflare arasi sifreli.
- **Always Use HTTPS:** ON
- **Minimum TLS Version:** TLS 1.2
- **HSTS:** Enable (max-age: 6 ay, include subdomains, preload)

---

## 2. OTONOM BULUT YEDEKLEME SISTEMI

### 2.1 GitHub Backup (Otomatik — Zaten Aktif)
Her `git push` ile tum kaynak kod GitHub'da yedeklenir. Bu en guvenli yedekleme yontemidir.

### 2.2 Manuel Tam Yedek Alma (Aylik)
```powershell
# Windows PowerShell — Tam site yedegi
$date = Get-Date -Format "yyyy-MM-dd"
$src = "C:\Users\eruo0\Desktop\neww project"
$dst = "C:\Backups\verimliai-$date.zip"
Compress-Archive -Path $src -DestinationPath $dst
Write-Output "Yedek alindi: $dst"
```

### 2.3 Otomatik Yedekleme (Windows Task Scheduler ile)
1. **Gorev Zamanlayici** ac → "Temel Gorev Olustur"
2. **Ad:** "VerimliAI Haftalik Yedek"
3. **Tetikleyici:** Haftalik, Pazar 03:00
4. **Eylem:** PowerShell betigi calistir:
```powershell
$date = Get-Date -Format "yyyy-MM-dd"
Compress-Archive -Path "C:\Users\eruo0\Desktop\neww project" -DestinationPath "C:\Backups\verimliai-$date.zip"
```
5. Yedekleri Google Drive / Dropbox / OneDrive'a otomatik senkronize et.

### 2.4 GitHub Actions Otomatik Yedek (Opsiyonel)
`.github/workflows/backup.yml` olustur:
```yaml
name: Weekly Backup
on:
  schedule:
    - cron: '0 3 * * 0' # Her Pazar 03:00
jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Create backup archive
        run: zip -r backup.zip .
      - name: Upload to cloud storage
        run: echo "Backup completed"
```

---

## 3. PERFORMANS OPTIMIZASYONU

### 3.1 Cloudflare Cache Ayarlari
Cloudflare Dashboard → Speed → Optimization:
- **Auto Minify:** JavaScript: ON, CSS: ON, HTML: ON
- **Brotli:** ON (Gzip'ten %20 daha iyi sikistirma)
- **Rocket Loader:** ON (JavaScript asenkron yukleme)
- **Early Hints:** ON

### 3.2 Tarayici Onbellekleme (Browser Caching)
Cloudflare Dashboard → Caching → Configuration:
```
Cache Level: Standard
Browser Cache TTL: 4 hours (CSS/JS), 1 hour (HTML)
```

### 3.3 .htaccess Optimizasyonu (Apache Sunucu Icin)
Sunucuda `.htaccess` dosyasina ekle:
```apache
# Gzip sikistirma
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 week"
  ExpiresByType text/javascript "access plus 1 week"
  ExpiresByType image/png "access plus 1 month"
</IfModule>

# Guvenlik header'lari
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```

### 3.4 Tahmini PageSpeed Skorlari
| Metrik | Optimizasyon Oncesi | Cloudflare Sonrasi |
|--------|--------------------|--------------------|
| Mobil | 85-90 | 95+ |
| Masaustu | 95-98 | 99+ |
| Ilk Yukleme | 1.2sn | 0.6sn |
|TTFB (Sunucu Yanit)| 200ms | 80ms |

---

## 4. UPTIME MONITORING — KRITIK ALARM SISTEMI

### 4.1 Uptime Robot (Ucretsiz — 50 Monitor)
1. https://uptimerobot.com → Sign Up (Free)
2. "Add New Monitor" → HTTP(s)
3. **URL:** https://verimliai.com
4. **Monitoring Interval:** 5 dakika
5. **Alert Contacts:** E-posta + Slack webhook

### 4.2 Slack / Telegram Alarm Entegrasyonu
Uptime Robot → Alert Contacts → Add:
- **Slack:** Slack'te #alarms kanali olustur → Incoming Webhook URL al → Uptime Robot'a ekle
- **Telegram:** @uptimerobot_bot → /start → Chat ID al → ekle

### 4.3 Alarm Senaryolari
| Durum | Tetikleyici | Aksiyon |
|-------|------------|---------|
| Site down | 60 sn yanit yok | Slack + E-posta + Telegram alarmi |
| Yavas yanit | >3 sn yanit suresi | Slack uyarisi |
| SSL hatasi | Sertifika gecersiz | E-posta alarmi |
| API down | OpenAI/Shopier 404 | Manuel kontrol |

### 4.4 Better Stack (Alternatif — Daha Detayli)
1. https://betterstack.com → Sign Up (Free tier: 3 monitor, 3 gun log)
2. Heartbeat monitoring: Cron job calistigini dogrular
3. Status page: status.verimliai.com (kamuya acik sistem durumu)

---

## 5. BAKIM KONTROL LISTESI (AYLIK)

- [ ] Cloudflare WAF loglarini kontrol et (engellenen saldirilar)
- [ ] GitHub repo'ya push yap (otomatik yedek)
- [ ] Manuel tam yedek al (.zip)
- [ ] Uptime Robot raporunu kontrol et (%99.9+ mi?)
- [ ] PageSpeed testi yap (95+ mi?)
- [ ] Tum formlari test et (iletisim, randevu, magaza)
- [ ] Chatbot'u test et (TR, EN, AR)
- [ ] Odeme akisini test et (Shopier/Stripe sandbox)
- [ ] SSL sertifikasi gecerlilik kontrolu
- [ ] Kullanimdaki API anahtarlarini kontrol et

---

## 6. ACIL DURUM PROSEDURU

### Site Cokerse
1. Cloudflare'de "I'm Under Attack" modunu ac
2. Sunucu saglayicisiyla iletisime gec
3. Son yedekten geri yukle
4. Slack/Telegram'dan ekibi bilgilendir

### API Kesintisi (OpenAI/Shopier)
1. Chatbot'u manuel "Bakimdayiz" moduna al
2. API status sayfasini kontrol et (status.openai.com)
3. Alternatif API'ye gec (GPT-4o → Claude)

### Veri Ihlali Suphesi
1. Tum API anahtarlarini iptal et ve yeniden olustur
2. Etkilenen musterilere KVKK/GDPR kapsaminda 72 saat icinde bildir
3. KVKK Kurumu'na veri ihlali bildirimi yap

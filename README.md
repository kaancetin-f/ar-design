# AR Design

[![Version](https://img.shields.io/npm/v/ar-design.svg)](https://www.npmjs.com/package/ar-design)
[![License](https://img.shields.io/npm/l/ar-design.svg)](https://github.com/kaancetin-f/ar-design/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue.svg)](https://www.typescriptlang.org/)

AR Design, React ve Next.js uygulamaları için geliştirilmiş modern, esnek ve kullanıcı dostu bir UI kütüphanesidir. TypeScript ile yazılmış olup, kapsamlı bileşen koleksiyonu ve özelleştirilebilir tasarım sistemi sunar.

## 🚀 Özellikler

- **Modern Tasarım**: Güncel tasarım trendlerine uygun, temiz ve minimal arayüz
- **TypeScript Desteği**: Tam TypeScript desteği ile tip güvenliği
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Özelleştirilebilir**: CSS değişkenleri ile kolay özelleştirme
- **Erişilebilirlik**: WCAG standartlarına uygun bileşenler
- **Performans**: Optimize edilmiş bundle boyutu ve hızlı render
- **Modüler Yapı**: İhtiyacınız olan bileşenleri ayrı ayrı import edebilme

## 📦 Kurulum

```bash
npm install ar-design
```

veya

```bash
yarn add ar-design
```

## 🔧 Gereksinimler

- React >= 18.0.0
- React DOM >= 18.0.0

## 🎯 Hızlı Başlangıç

```tsx
import { Button, Input, Card } from 'ar-design';

function App() {
  return (
    <div>
      <Card>
        <Input placeholder="Adınızı girin" />
        <Button variant="filled" color="primary">
          Gönder
        </Button>
      </Card>
    </div>
  );
}
```

## 📚 Bileşenler

### Form Elemanları

- **Button** - Çoklu varyant ve boyut seçenekleri
- **ButtonAction** - Aksiyon butonları
- **ButtonGroup** - Buton grupları
- **Checkbox** - Onay kutuları
- **DatePicker** - Tarih seçici
- **Input** - Metin giriş alanları
- **InputTag** - Etiket giriş alanları
- **Radio** - Radyo butonları
- **Select** - Açılır liste
- **Switch** - Anahtar düğmeleri
- **TextEditor** - Zengin metin editörü
- **Upload** - Dosya yükleme

### Veri Görüntüleme

- **Card** - Kart bileşenleri
- **Chip** - Etiket bileşenleri
- **Divider** - Ayırıcı çizgiler
- **DnD** - Sürükle-bırak
- **Paper** - Kağıt bileşenleri
- **SyntaxHighlighter** - Kod vurgulayıcı
- **Table** - Tablo bileşenleri
- **Tabs** - Sekme bileşenleri
- **Typography** - Tipografi bileşenleri

### Geri Bildirim

- **Alert** - Uyarı mesajları
- **Drawer** - Çekmece bileşenleri
- **Modal** - Modal pencereler
- **Popover** - Açılır ipuçları
- **Progress** - İlerleme çubukları
- **Tooltip** - İpucu balonları

### Navigasyon

- **Breadcrumb** - Gezinti kırıntıları
- **Menu** - Menü bileşenleri
- **Steps** - Adım göstergeleri

### Düzen

- **Layout** - Sayfa düzeni
- **Grid** - Izgara sistemi

## 📖 Detaylı Kullanım Kılavuzu

Bileşenlerin detaylı kullanım örnekleri için aşağıdaki dokümantasyon dosyalarını inceleyin:

- [Form Bileşenleri](./docs/form-components.md) - Button, Input, Select, DatePicker vb.
- [Veri Görüntüleme Bileşenleri](./docs/data-display-components.md) - Table, Card, Typography vb.
- [Geri Bildirim Bileşenleri](./docs/feedback-components.md) - Alert, Modal, Progress vb.
- [Navigasyon Bileşenleri](./docs/navigation-components.md) - Menu, Breadcrumb, Steps vb.
- [Düzen Bileşenleri](./docs/layout-components.md) - Layout, Grid vb.
- [Grafik Bileşenleri](./docs/chart-components.md) - Pie Chart vb.
- [Ortak Özellikler](./docs/common-properties.md) - Varyantlar, renkler, boyutlar vb.

## 🎨 Tema ve Özelleştirme

AR Design, CSS değişkenleri kullanarak kolay özelleştirme imkanı sunar:

```css
:root {
  --primary: #007bff;
  --secondary: #6c757d;
  --success: #28a745;
  --warning: #ffc107;
  --danger: #dc3545;
  --border-radius: 0.5rem;
}
```

## 🔧 Geliştirme

### Projeyi Klonlama

```bash
git clone https://github.com/kaancetin-f/ar-design.git
cd ar-design
npm install
```

### Build İşlemi

```bash
npm run build
```

### CSS Loader

```bash
npm run css-loader
```

## 📦 Modüler Import

AR Design, modüler import desteği sunar:

```tsx
// Tüm bileşenler
import { Button, Input, Card } from 'ar-design';

// Sadece belirli kategoriler
import { Button, Input } from 'ar-design';

// Servis ve yardımcı fonksiyonlar
import { Api } from 'ar-design/@service';
import { Config } from 'ar-design/@config';
import { useNotification } from 'ar-design/@hooks';

// Stil dosyaları
import 'ar-design/@styles';
```

## 🌍 Çoklu Dil Desteği

AR Design, çoklu dil desteği sunar:

```tsx
import { LanguageProvider } from 'ar-design/@config';

function App() {
  return (
    <LanguageProvider language="tr">
      {/* Uygulama içeriği */}
    </LanguageProvider>
  );
}
```

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Kaan ÇETİN**

- GitHub: [@kaancetin-f](https://github.com/kaancetin-f)
- NPM: [ar-design](https://www.npmjs.com/package/ar-design)

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Changelog

Detaylı değişiklik geçmişi için [CHANGELOG.md](CHANGELOG.md) dosyasını inceleyin.

## 🐛 Hata Bildirimi

Hata bildirimi için [GitHub Issues](https://github.com/kaancetin-f/ar-design/issues) sayfasını kullanın.

## 📞 Destek

Sorularınız için:
- GitHub Issues: [Issues](https://github.com/kaancetin-f/ar-design/issues)

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

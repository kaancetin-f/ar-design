# Düzen Bileşenleri

AR Design kütüphanesindeki düzen bileşenleri, sayfa yapısı ve layout için tasarlanmıştır.

## Layout (Sayfa Düzeni)

```tsx
import { Layout } from 'ar-design';

<Layout>
  <Layout.Header>
    <h1>Başlık</h1>
  </Layout.Header>
  
  <Layout.Main>
    <p>Ana içerik</p>
  </Layout.Main>
  
  <Layout.Footer>
    <p>Alt bilgi</p>
  </Layout.Footer>
</Layout>
```

## Section (Bölüm)

```tsx
import { Section } from 'ar-design';

<Section>
  <h2>Bölüm Başlığı</h2>
  <p>Bölüm içeriği</p>
</Section>
``` 
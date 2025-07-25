# Navigasyon Bileşenleri

AR Design kütüphanesindeki navigasyon bileşenleri, kullanıcı gezinmesi ve sayfa yapısı için tasarlanmıştır.

## Menu (Menü)

```tsx
import { Menu } from 'ar-design';

const items = [
  { key: '1', label: 'Ana Sayfa', icon: <HomeIcon /> },
  { key: '2', label: 'Hakkımızda', icon: <AboutIcon /> },
  { key: '3', label: 'İletişim', icon: <ContactIcon /> }
];

<Menu items={items} />
```

## Breadcrumb (Gezinti Kırıntısı)

```tsx
import { Breadcrumb } from 'ar-design';

const items = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Ürünler', href: '/products' },
  { label: 'Elektronik', href: '/products/electronics' }
];

<Breadcrumb items={items} />
```

## Steps (Adım Göstergesi)

```tsx
import { Steps } from 'ar-design';

const steps = [
  { title: 'Adım 1', description: 'İlk adım' },
  { title: 'Adım 2', description: 'İkinci adım' },
  { title: 'Adım 3', description: 'Son adım' }
];

<Steps current={1} items={steps} />
```

## Pagination (Sayfalama)

```tsx
import { Pagination } from 'ar-design';

<Pagination 
  current={1}
  total={100}
  pageSize={10}
  onChange={(page) => console.log(page)}
/>
``` 
# Grafik Bileşenleri

AR Design kütüphanesindeki grafik bileşenleri, veri görselleştirme için tasarlanmıştır.

## Pie Chart (Pasta Grafik)

```tsx
import { Pie } from 'ar-design';

const data = [
  { label: 'Kategori 1', value: 30, color: '#ff6b6b' },
  { label: 'Kategori 2', value: 25, color: '#4ecdc4' },
  { label: 'Kategori 3', value: 45, color: '#45b7d1' }
];

<Pie data={data} />
``` 
# Veri Görüntüleme Bileşenleri

AR Design kütüphanesindeki veri görüntüleme bileşenleri, verileri organize ve görsel olarak sunmak için tasarlanmıştır.

## Card (Kart)

```tsx
import { Card } from 'ar-design';

// Temel kullanım
<Card>
  <h3>Kart Başlığı</h3>
  <p>Kart içeriği buraya gelecek.</p>
</Card>

// Varyantlar
<Card variant="filled" color="light">
  <h3>Dolu Kart</h3>
  <p>İçerik</p>
</Card>

<Card variant="outlined" color="primary">
  <h3>Çerçeveli Kart</h3>
  <p>İçerik</p>
</Card>

// Başlık ile
<Card title="Kart Başlığı">
  <p>Kart içeriği</p>
</Card>

// Aksiyonlar ile
<Card 
  title="Kullanıcı Kartı"
  actions={<Button>Düzenle</Button>}
>
  <p>Kullanıcı bilgileri</p>
</Card>

// Durum renkleri
<Card status="success">
  <h3>Başarılı İşlem</h3>
  <p>İşlem başarıyla tamamlandı.</p>
</Card>
```

## Chip (Etiket)

```tsx
import { Chip } from 'ar-design';

<Chip>Etiket</Chip>
<Chip color="primary">Birincil</Chip>
<Chip color="success">Başarılı</Chip>
<Chip variant="outlined">Çerçeveli</Chip>
```

## Divider (Ayırıcı)

```tsx
import { Divider } from 'ar-design';

<Divider />
<Divider>Veya</Divider>
```

## Paper (Kağıt)

```tsx
import { Paper } from 'ar-design';

<Paper>
  <p>Kağıt içeriği</p>
</Paper>
```

## Typography (Tipografi)

```tsx
import { Typography } from 'ar-design';

// Başlık
<Typography.Title level={1}>Ana Başlık</Typography.Title>
<Typography.Title level={2}>Alt Başlık</Typography.Title>
<Typography.Title level={3}>Küçük Başlık</Typography.Title>

// Paragraf
<Typography.Paragraph>Normal paragraf metni.</Typography.Paragraph>
<Typography.Paragraph size="large">Büyük paragraf.</Typography.Paragraph>
<Typography.Paragraph color="primary">Renkli paragraf.</Typography.Paragraph>
```

## Table (Tablo)

```tsx
import { Table } from 'ar-design';

// Temel kullanım
const columns = [
  { key: 'name', title: 'Ad' },
  { key: 'age', title: 'Yaş' },
  { key: 'city', title: 'Şehir' }
];

const data = [
  { name: 'Ahmet', age: 25, city: 'İstanbul' },
  { name: 'Ayşe', age: 30, city: 'Ankara' }
];

<Table columns={columns} data={data} />

// Gelişmiş kolon tanımları
const advancedColumns = [
  {
    title: 'Ad Soyad',
    key: 'name',
    config: {
      width: 200,
      alignContent: 'left',
      sticky: 'left',
      textWrap: 'nowrap'
    }
  },
  {
    title: 'Yaş',
    key: 'age',
    config: {
      width: 100,
      alignContent: 'center'
    }
  },
  {
    title: 'Durum',
    key: 'status',
    render: (item) => (
      <span style={{ 
        color: item.status === 'active' ? 'green' : 'red' 
      }}>
        {item.status === 'active' ? 'Aktif' : 'Pasif'}
      </span>
    )
  },
  {
    title: 'İşlemler',
    key: 'actions',
    render: (item) => (
      <div>
        <Button size="small" onClick={() => editItem(item)}>Düzenle</Button>
        <Button size="small" color="danger" onClick={() => deleteItem(item)}>Sil</Button>
      </div>
    )
  }
];

// Filtreleme özelliği
const filterableColumns = [
  {
    title: 'Kategori',
    key: 'category',
    filters: [
      { value: 'elektronik', text: 'Elektronik' },
      { value: 'giyim', text: 'Giyim' },
      { value: 'kitap', text: 'Kitap' }
    ]
  }
];

// Başlık ve açıklama ile
<Table 
  title="Kullanıcı Listesi"
  description="Sistemdeki tüm kullanıcıları görüntüler"
  columns={columns}
  data={data}
/>

// Satır seçimi
<Table 
  columns={columns}
  data={data}
  selections={(selectedItems) => console.log('Seçilen:', selectedItems)}
  previousSelections={previouslySelectedItems}
/>

// Arama özelliği
<Table 
  columns={columns}
  data={data}
  config={{ isSearchable: true }}
  searchedParams={(params, query, operator) => {
    console.log('Arama parametreleri:', params);
    console.log('Arama sorgusu:', query);
    console.log('Operatör:', operator);
  }}
/>

// Sayfalama
<Table 
  columns={columns}
  data={data}
  pagination={{
    totalRecords: 1000,
    perPage: 20,
    onChange: (page) => console.log('Sayfa:', page)
  }}
/>

// Kaydırma özelliği
<Table 
  columns={columns}
  data={data}
  config={{
    scroll: { maxHeight: 400 }
  }}
/>

// Alt satırlar (subrows)
const dataWithSubrows = [
  {
    id: 1,
    name: 'Kategori 1',
    subitems: [
      { id: 11, name: 'Alt Kategori 1.1' },
      { id: 12, name: 'Alt Kategori 1.2' }
    ]
  }
];

<Table 
  columns={columns}
  data={dataWithSubrows}
  config={{
    subrow: {
      openAutomatically: false,
      selector: 'subitems',
      button: true
    }
  }}
/>

// Aksiyon butonları
<Table 
  columns={columns}
  data={data}
  actions={{
    import: {
      tooltip: 'Dosya Yükle',
      allowedTypes: ['application/json', 'text/csv'],
      onClick: (formData, files) => {
        console.log('Yüklenen dosyalar:', files);
      }
    },
    create: {
      tooltip: 'Yeni Kayıt',
      onClick: () => {
        console.log('Yeni kayıt oluştur');
      }
    }
  }}
/>

// Sunucu tarafı işleme
<Table 
  columns={columns}
  data={data}
  config={{ isServerSide: true }}
  pagination={{
    totalRecords: 1000,
    perPage: 20,
    onChange: (page) => fetchData(page)
  }}
/>

// Ağaç görünümü
<Table 
  columns={columns}
  data={treeData}
  config={{ isTreeView: true }}
/>

// Özel render fonksiyonları
const customColumns = [
  {
    title: 'Resim',
    key: 'avatar',
    render: (item) => (
      <img 
        src={item.avatar} 
        alt={item.name}
        style={{ width: 40, height: 40, borderRadius: '50%' }}
      />
    )
  },
  {
    title: 'Tarih',
    key: 'createdAt',
    render: (item) => new Date(item.createdAt).toLocaleDateString('tr-TR')
  },
  {
    title: 'Durum',
    key: 'status',
    render: (item) => (
      <Chip 
        color={item.status === 'active' ? 'success' : 'danger'}
      >
        {item.status === 'active' ? 'Aktif' : 'Pasif'}
      </Chip>
    )
  }
];

// Filtre operatörleri
// - Contains: İçerir
// - DoesNotContains: İçermez
// - Equals: Eşittir
// - DoesNotEquals: Eşit değildir
// - BeginsWith: İle başlar
// - EndsWith: İle biter
// - Blank: Boş
// - NotBlank: Boş değil

// Kolon konfigürasyonu seçenekleri
// - width: Kolon genişliği (piksel)
// - alignContent: İçerik hizalama ('left' | 'center' | 'right')
// - sticky: Yapışkan kolon ('left' | 'right')
// - textWrap: Metin sarma ('wrap' | 'nowrap')
```

## Tabs (Sekmeler)

```tsx
import { Tabs } from 'ar-design';

const items = [
  { key: '1', label: 'Sekme 1', children: 'İçerik 1' },
  { key: '2', label: 'Sekme 2', children: 'İçerik 2' },
  { key: '3', label: 'Sekme 3', children: 'İçerik 3' }
];

<Tabs items={items} />
```

## SyntaxHighlighter (Kod Vurgulayıcı)

```tsx
import { SyntaxHighlighter } from 'ar-design';

<SyntaxHighlighter language="javascript">
  {`function hello() {
  console.log("Hello, World!");
}`}
</SyntaxHighlighter>
```

## DnD (Sürükle-Bırak)

```tsx
import { DnD } from 'ar-design';

<DnD 
  items={items}
  onReorder={(newItems) => console.log(newItems)}
/>
```

## Grid System (Izgara Sistemi)

```tsx
import { Grid } from 'ar-design';

// Satır
<Grid.Row>
  <Grid.Column span={6}>Sol Kolon</Grid.Column>
  <Grid.Column span={6}>Sağ Kolon</Grid.Column>
</Grid.Row>

// Responsive kolonlar
<Grid.Row>
  <Grid.Column 
    xs={12} 
    sm={6} 
    md={4} 
    lg={3}
  >
    Responsive Kolon
  </Grid.Column>
</Grid.Row>
``` 
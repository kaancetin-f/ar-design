# Form Bileşenleri

AR Design kütüphanesindeki form bileşenleri, kullanıcı girişi ve etkileşimi için tasarlanmıştır.

## Button (Buton)

```tsx
import { Button } from 'ar-design';

// Temel kullanım
<Button>Varsayılan Buton</Button>

// Varyantlar
<Button variant="filled" color="primary">Dolu Buton</Button>
<Button variant="outlined" color="secondary">Çerçeveli Buton</Button>
<Button variant="dashed" color="success">Kesikli Buton</Button>
<Button variant="text" color="danger">Metin Buton</Button>

// Boyutlar
<Button size="small">Küçük</Button>
<Button size="normal">Normal</Button>
<Button size="large">Büyük</Button>

// Şekil varyantları (ikon için)
<Button shape="circle" icon={{ element: <Icon /> }} />
<Button shape="square" icon={{ element: <Icon /> }} />

// İkonlu buton
<Button 
  icon={{ 
    element: <Icon />, 
    position: "start" // "start" | "end"
  }}
>
  İkonlu Buton
</Button>

// Tam genişlik
<Button fullWidth>Tam Genişlik</Button>

// Konumlandırma
<Button 
  position={{
    type: "fixed", // "fixed" | "absolute"
    inset: ["top", "right"] // ["top" | "right" | "bottom" | "left"]
  }}
>
  Konumlandırılmış Buton
</Button>

// Büyük harf
<Button upperCase>BÜYÜK HARF</Button>

// Kenarlık ayarları
<Button border={{ radius: "sm" }}>Yuvarlak Köşeli</Button>
```

## ButtonAction (Aksiyon Butonu)

```tsx
import { ButtonAction } from 'ar-design';

<ButtonAction 
  icon={{ element: <Icon /> }}
  onClick={() => console.log('Tıklandı')}
/>
```

## ButtonGroup (Buton Grubu)

```tsx
import { ButtonGroup } from 'ar-design';

<ButtonGroup>
  <Button>Sol</Button>
  <Button>Orta</Button>
  <Button>Sağ</Button>
</ButtonGroup>
```

## Input (Metin Girişi)

```tsx
import { Input } from 'ar-design';

// Temel kullanım
<Input placeholder="Metin girin" />

// Varyantlar
<Input variant="filled" placeholder="Dolu input" />
<Input variant="outlined" placeholder="Çerçeveli input" />
<Input variant="dashed" placeholder="Kesikli input" />

// Boyutlar
<Input size="small" placeholder="Küçük" />
<Input size="normal" placeholder="Normal" />
<Input size="large" placeholder="Büyük" />

// Renkler
<Input color="primary" placeholder="Birincil" />
<Input color="success" placeholder="Başarılı" />
<Input color="warning" placeholder="Uyarı" />
<Input color="danger" placeholder="Hata" />

// Doğrulama
<Input 
  validation={{ 
    text: "Bu alan zorunludur",
    scrollTo: true 
  }}
  placeholder="Zorunlu alan"
/>

// İkonlu input
<Input 
  icon={{ 
    element: <SearchIcon />, 
    position: "start" 
  }}
  placeholder="Ara..."
/>

// Butonlu input
<Input 
  button={{
    text: "Gönder",
    onClick: () => console.log('Gönderildi'),
    variant: "filled",
    color: "primary"
  }}
  placeholder="E-posta adresiniz"
/>

// Addon (ön/son ek)
<Input 
  addon={{ 
    variant: "outlined", 
    before: "₺", 
    after: "KDV" 
  }}
  placeholder="Fiyat"
/>

// Kenarlık ayarları
<Input 
  border={{ radius: "lg" }}
  placeholder="Yuvarlak köşeli"
/>
```

## InputTag (Etiket Girişi)

```tsx
import { InputTag } from 'ar-design';

<InputTag 
  placeholder="Etiket ekleyin..."
  onChange={(tags) => console.log(tags)}
/>
```

## Checkbox (Onay Kutusu)

```tsx
import { Checkbox } from 'ar-design';

// Temel kullanım
<Checkbox label="Kullanım şartlarını kabul ediyorum" />

// Varyantlar
<Checkbox variant="filled" label="Dolu checkbox" />
<Checkbox variant="outlined" label="Çerçeveli checkbox" />

// Boyutlar
<Checkbox size="small" label="Küçük" />
<Checkbox size="normal" label="Normal" />
<Checkbox size="large" label="Büyük" />

// Renkler
<Checkbox color="primary" label="Birincil" />
<Checkbox color="success" label="Başarılı" />

// Doğrulama
<Checkbox 
  validation={{ text: "Bu alan zorunludur" }}
  label="Zorunlu onay"
/>

// Kenarlık ayarları
<Checkbox 
  border={{ radius: "sm" }}
  label="Yuvarlak köşeli"
/>
```

## Radio (Radyo Buton)

```tsx
import { Radio } from 'ar-design';

<Radio 
  name="gender" 
  value="male" 
  label="Erkek" 
/>
<Radio 
  name="gender" 
  value="female" 
  label="Kadın" 
/>
```

## Switch (Anahtar)

```tsx
import { Switch } from 'ar-design';

<Switch 
  label="Bildirimleri aç"
  onChange={(checked) => console.log(checked)}
/>
```

## Select (Açılır Liste)

```tsx
import { Select } from 'ar-design';

const options = [
  { label: "Seçenek 1", value: "1" },
  { label: "Seçenek 2", value: "2" },
  { label: "Seçenek 3", value: "3" }
];

// Tekli seçim
<Select 
  options={options}
  value={selectedOption}
  onChange={(option) => setSelectedOption(option)}
  placeholder="Seçenek seçin"
/>

// Çoklu seçim
<Select 
  options={options}
  value={selectedOptions}
  onChange={(options) => setSelectedOptions(options)}
  multiple={true}
  placeholder="Birden fazla seçin"
/>

// Arama özelliği
<Select 
  options={options}
  onSearch={(searchText) => console.log(searchText)}
  placeholder="Ara ve seç"
/>

// Yeni seçenek oluşturma
<Select 
  options={options}
  onCreate={(option) => console.log('Yeni seçenek:', option)}
  placeholder="Yeni seçenek oluştur"
/>

// Durum ayarları
<Select 
  options={options}
  status="success"
  placeholder="Başarılı durum"
/>
```

## DatePicker (Tarih Seçici)

```tsx
import { DatePicker } from 'ar-design';

// Temel kullanım
<DatePicker 
  onChange={(value) => console.log(value)}
  placeholder="Tarih seçin"
/>

// Saat ile birlikte
<DatePicker 
  isClock={true}
  onChange={(value) => console.log(value)}
  placeholder="Tarih ve saat seçin"
/>

// Etiket ile
<DatePicker 
  label="Doğum tarihi"
  onChange={(value) => console.log(value)}
/>

// Varyantlar
<DatePicker 
  variant="filled"
  onChange={(value) => console.log(value)}
/>

// Boyutlar
<DatePicker 
  size="large"
  onChange={(value) => console.log(value)}
/>
```

## TextEditor (Metin Editörü)

```tsx
import { TextEditor } from 'ar-design';

<TextEditor 
  placeholder="Metninizi yazın..."
  onChange={(value) => console.log(value)}
/>
```

## Upload (Dosya Yükleme)

```tsx
import { Upload } from 'ar-design';

<Upload 
  multiple={true}
  accept=".jpg,.png,.pdf"
  onChange={(files) => console.log(files)}
/>
``` 
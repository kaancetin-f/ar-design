# Ortak Özellikler

AR Design kütüphanesindeki tüm bileşenler aşağıdaki ortak özellikleri destekler.

## Varyantlar

```tsx
// Dolu arka plan
<Component variant="filled" />

// Çerçeveli
<Component variant="outlined" />

// Kesikli çerçeve
<Component variant="dashed" />

// Sadece metin (bazı bileşenlerde)
<Component variant="text" />

// Kenarlıksız (bazı bileşenlerde)
<Component variant="borderless" />
```

## Renkler

```tsx
// Birincil renk
<Component color="primary" />

// İkincil renk
<Component color="secondary" />

// Başarı rengi
<Component color="success" />

// Uyarı rengi
<Component color="warning" />

// Tehlike rengi
<Component color="danger" />

// Bilgi rengi
<Component color="information" />

// Açık renk
<Component color="light" />

// Koyu renk
<Component color="dark" />
```

## Boyutlar

```tsx
// Küçük boyut
<Component size="small" />

// Normal boyut (varsayılan)
<Component size="normal" />

// Büyük boyut
<Component size="large" />
```

## Kenarlık Ayarları

```tsx
// Küçük yuvarlama
<Component border={{ radius: "sm" }} />

// Büyük yuvarlama
<Component border={{ radius: "lg" }} />

// Ekstra büyük yuvarlama
<Component border={{ radius: "xl" }} />

// Çok büyük yuvarlama
<Component border={{ radius: "xxl" }} />

// Hap şeklinde yuvarlama
<Component border={{ radius: "pill" }} />

// Yuvarlama yok
<Component border={{ radius: "none" }} />
```

## İkon Desteği

```tsx
// İkon ile
<Component 
  icon={{ 
    element: <IconComponent />, 
    position: "start" // "start" | "end"
  }}
>
  İçerik
</Component>

// Sadece ikon (bazı bileşenlerde)
<Component 
  icon={{ 
    element: <IconComponent /> 
  }}
/>
```

## Durum Renkleri

```tsx
// Başarı durumu
<Component status="success" />

// Uyarı durumu
<Component status="warning" />

// Hata durumu
<Component status="danger" />

// Bilgi durumu
<Component status="information" />
```

## Doğrulama

```tsx
// Doğrulama mesajı
<Component 
  validation={{ 
    text: "Bu alan zorunludur",
    scrollTo: true 
  }}
/>
```

## Devre Dışı

```tsx
// Devre dışı durum
<Component disabled />
```

## Büyük Harf

```tsx
// Metni büyük harfe çevir
<Component upperCase>
  Metin
</Component>
``` 
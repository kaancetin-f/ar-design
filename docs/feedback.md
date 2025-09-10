# Feedback (Geri Bildirim)

## Alert (Uyarı)

```tsx
import { Alert } from "ar-design";

const Page = () => {
  return (
    <>
      {/* Basit kullanım */}
      <Alert message="Bilgiler başarıyla kaydedildi." status="success" />

      {/* İç içe mesaj listesi */}
      <Alert
        message={[
          "Form gönderiminde hata oluştu.",
          ["Email alanı boş bırakılamaz.", "Şifre en az 8 karakter olmalıdır."],
        ]}
        status="danger"
      />

      {/* Emphasize kullanımı */}
      <Alert
        message="Dosya yükleme işlemi başarısız oldu. Lütfen PNG formatında yükleyiniz."
        emphasize={["PNG", "başarısız"]}
      />

      {/* Özel içerik (children) */}
      <Alert status="warning" variant="filled">
        <strong>Dikkat:</strong> Bu işlem geri alınamaz!
      </Alert>
    </>
  );
};

export default Page;
```

| Prop        | Tip                                                                                                                                       | Varsayılan         | Açıklama                                                                          |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | --------------------------------------------------------------------------------- |
| `message`   | `string` \| `string[]`                                                                                                                    | –                  | Gösterilecek mesaj. Tek metin veya iç içe liste (çok seviyeli mesajlar) olabilir. |
| `children`  | `React.ReactNode`                                                                                                                         | –                  | `message` yerine özel içerik göstermek için kullanılabilir.                       |
| `variant`   | `"filled"` \| `"surface"` \| `"dashed"`                                                                                                   | `"filled"`         | Alert stilini belirler.                                                           |
| `status`    | `"primary"` \| `"primary-light"` \| `"secondary"` \| `"success"` \| `"danger"` \| `"warning"` \| `"information"` \| `"dark"` \| `"light"` | `"primary"`        | Alert’in durumu (bilgi, başarı, hata vb.). Rengi de buna göre belirlenir.         |
| `border`    | `{ radius: "sm" \| "lg" \| "xl" \| "xxl" \| "pill" \| "none" }`                                                                           | `{ radius: "sm" }` | Köşe yuvarlama boyutunu belirler.                                                 |
| `emphasize` | `string[]`                                                                                                                                | –                  | Mesaj içerisindeki belirli kelimeleri **vurgulamak** için kullanılır              |

## Drawer (Çekmece)

```tsx
import { Drawer } from "ar-design";
import { useState } from "react";

const Page = () => {
  // states
  const [open, setOpen] = useState(true);

  return (
    <Drawer
      title="Kullanıcı Bilgileri"
      open={{ get: open, set: setOpen }}
      tabs={[
        { title: "Genel", content: <div>Genel bilgiler burada.</div> },
        { title: "Ayarlar", content: <div>Ayarlar buraya gelecek.</div> },
      ]}
    />
  );
};

export default Page;
```

| Prop        | Tip                                                                    | Varsayılan | Açıklama                                                                                |
| ----------- | ---------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------- |
| `title`     | `string`                                                               | –          | Drawer başlığını belirler.                                                              |
| `tabs`      | `TabProps[]`                                                           | `[]`       | Drawer içeriğini sekmeler halinde tanımlar.                                             |
| `activeTab` | `number`                                                               | `0`        | Başlangıçta hangi sekmenin seçili olacağını belirler.                                   |
| `open`      | `{ get: boolean; set: React.Dispatch<React.SetStateAction<boolean>> }` | –          | Drawer’ın açık/kapalı durumunu yönetir. `get` mevcut durumu, `set` güncellemeyi sağlar. |
| `onChange`  | `(currentTab: number) => void`                                         | –          | Sekme değiştiğinde tetiklenir.                                                          |
| `onClose`   | `(closeTab: number) => void`                                           | –          | Sekme kapatma butonu varsa tetiklenir.                                                  |
| `children`  | `React.ReactNode`                                                      | –          | Drawer içeriği (tab content yerine kullanılabilir).                                     |

### 🔧 TabProps

| Alan      | Tip                        | Açıklama                                        |
| --------- | -------------------------- | ----------------------------------------------- |
| `title`   | `string`                   | Sekme başlığı                                   |
| `content` | `React.ReactNode`          | Sekme içeriği                                   |
| `config`  | `{ canBeClosed: boolean }` | Sekmenin kapatılabilir olup olmadığını belirtir |

## Modal

```tsx
import { Button, Modal } from "ar-design";
import { useState } from "react";

const Page = () => {
  // states
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* Basit Modal */}
      <Modal open={{ get: open, set: setOpen }} title="Bilgilendirme">
        <p>Bu bir basit modal örneğidir.</p>
      </Modal>

      {/* Footer ile Modal */}
      <Modal
        open={{ get: open, set: setOpen }}
        title="Onay"
        footer={
          <div className="actions">
            <Button onClick={() => setOpen(false)}>İptal</Button>
            <Button onClick={() => console.log("Onaylandı")}>Onayla</Button>
          </div>
        }
      >
        <p>Devam etmek istediğinize emin misiniz?</p>
      </Modal>

      {/* Kapatma Butonuna Popover Bağlama */}
      <Modal
        open={{ get: open, set: setOpen }}
        title="Detaylı Modal"
        closePopover={{
          content: <div>Kapatma hakkında ipucu.</div>,
          onConfirm: (confirm) => {
            // ...
          },
        }}
        disableCloseOnBackdrop
        disableCloseOnEsc
      >
        <p>Popover eklenmiş kapatma butonu örneği.</p>
      </Modal>
    </>
  );
};

export default Page;
```

| Prop                     | Tip                                                                    | Varsayılan | Açıklama                                         |
| ------------------------ | ---------------------------------------------------------------------- | ---------- | ------------------------------------------------ |
| `open`                   | `{ get: boolean; set: React.Dispatch<React.SetStateAction<boolean>> }` | –          | Modal’ın açık/kapalı durumunu yönetir.           |
| `title`                  | `string`                                                               | –          | Modal başlığı.                                   |
| `children`               | `React.ReactNode`                                                      | –          | Modal içerik bölgesi.                            |
| `footer`                 | `React.ReactNode`                                                      | –          | Modal alt kısmı (ör. butonlar).                  |
| `size`                   | `"small" \| "normal" \| "large" \| "xlarge"`                           | `"normal"` | Modal boyutunu belirler.                         |
| `closePopover`           | `IPopoverProps`                                                        | –          | Kapatma ikonuna ek popover bağlamak için.        |
| `disableCloseOnBackdrop` | `boolean`                                                              | `false`    | Dış alana tıklanarak modal kapanmasını engeller. |
| `disableCloseOnEsc`      | `boolean`                                                              | `false`    | `Escape` tuşuyla modal kapanmasını engeller.     |
| `...attributes`          | `React.HTMLAttributes<HTMLDivElement>`                                 | –          | Modal kök div’i için ek HTML özellikleri.        |

## Popover

```tsx
import { Popover } from "ar-design";

const Page = () => {
  return (
    <>
      {/* Basit Modal */}
      <Popover
        title="Silme İşlemi"
        message="Bu kaydı silmek istediğinize emin misiniz?"
        onConfirm={(confirm) => {
          if (confirm) console.log("Silindi!");
          else console.log("İptal edildi.");
        }}
      >
        <button>Sil</button>
      </Popover>

      {/* Özel İçerik */}
      <Popover
        title="Kullanıcı Bilgileri"
        content={
          <div>
            <strong>Ad:</strong> *****
            <br />
            <strong>Rol:</strong> Super Admin
          </div>
        }
      >
        <span className="info-icon">ℹ️</span>
      </Popover>

      {/* Özel Buton Metinleri */}
      <Popover
        title="Onay"
        message="Bu işlemi gerçekleştirmek istiyor musunuz?"
        config={{ buttons: { okay: "Tamam", cancel: "Vazgeç" } }}
        onConfirm={(c) => console.log("Seçim:", c)}
      >
        <button>İşlem Yap</button>
      </Popover>
    </>
  );
};

export default Page;
```

| Prop         | Tip                                              | Varsayılan                          | Açıklama                                                             |
| ------------ | ------------------------------------------------ | ----------------------------------- | -------------------------------------------------------------------- |
| `children`   | `React.ReactNode`                                | –                                   | Popover’un tetikleyici öğesi (ör. ikon, buton).                      |
| `title`      | `string`                                         | –                                   | Popover başlığı.                                                     |
| `message`    | `string`                                         | –                                   | Açıklama mesajı.                                                     |
| `content`    | `React.JSX.Element`                              | –                                   | Popover içinde özel içerik render etmek için.                        |
| `onConfirm`  | `(confirm: boolean) => void`                     | –                                   | Onay / iptal aksiyonlarını yakalar.                                  |
| `windowBlur` | `boolean`                                        | `false`                             | Pencere odaktan çıkınca popover’un kapanıp kapanmayacağını belirler. |
| `fullWidth`  | `boolean`                                        | `false`                             | Popover’un tam genişlikte görünmesini sağlar.                        |
| `config`     | `{ buttons: { okay: string; cancel?: string } }` | `{ okay: "Evet", cancel: "Hayır" }` | Buton yazılarını özelleştirmek için.                                 |

## Progress (İlerleme)

```tsx
import { Progress } from "ar-design";
import { useEffect, useState } from "react";

const Page = () => {
  // states
  const [progress, setProgress] = useState(0);

  // useEffects
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : prev));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Basit Progress */}
      <Progress value={80} />

      {/* Reverse Mode */}
      <Progress value={80} reverse />

      {/* Yüzdeyi Gizleme */}
      <Progress value={75} isVisibleValue />

      {/* Dinamik Kullanım */}
      <Progress value={progress} />
    </>
  );
};

export default Page;
```

| Prop             | Tip       | Varsayılan | Açıklama                                    |
| ---------------- | --------- | ---------- | ------------------------------------------- |
| `value`          | `number`  | –          | İlerleme yüzdesi (**0 – 100** arası).       |
| `reverse`        | `boolean` | `false`    | Status renklerinin ters çalışmasını sağlar. |
| `isVisibleValue` | `boolean` | `false`    | Yüzde değerinin görünürlüğünü kontrol eder. |

### Status Mantığı

#### İlerleme yüzdesi value değerine göre status rengi otomatik atanır:

| Aralık (%)   | Normal (`reverse = false`) | Ters (`reverse = true`) |
| ------------ | -------------------------- | ----------------------- |
| **0 – 25**   | `danger` (Kırmızı)         | `success` (Yeşil)       |
| **26 – 50**  | `warning` (Sarı)           | `primary` (Mavi)        |
| **51 – 75**  | `primary` (Mavi)           | `warning` (Sarı)        |
| **76 – 100** | `success` (Yeşil)          | `danger` (Kırmızı)      |

## Tooltip (İpucu)

```tsx
"use client";

import { Tooltip } from "ar-design";

const Page = () => {
  return (
    <>
      {/* Basit Tooltip */}
      <Tooltip text="Kaydetmek için tıkla">
        <button>Kaydet</button>
      </Tooltip>

      {/* Liste Tipinde Tooltip */}
      <Tooltip text={["İlk adımı tamamla", "Profilini güncelle", "Sonra kaydet"]}>
        <span>Bilgi</span>
      </Tooltip>
    </>
  );
};

export default Page;
```

| Prop        | Tip                                      | Varsayılan | Açıklama                                                               |
| ----------- | ---------------------------------------- | ---------- | ---------------------------------------------------------------------- |
| `text`      | `string \| string[]`                     | –          | Tooltip içinde gösterilecek metin ya da liste.                         |
| `direction` | `"top" \| "right" \| "left" \| "bottom"` | `"top"`    | Tooltip’in varsayılan yönü. Ekran taşmalarına göre otomatik ayarlanır. |
| `children`  | `React.ReactNode`                        | –          | Tooltip’i tetikleyen element.                                          |

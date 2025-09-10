# Form Elemanları

## Button (Buton)

```tsx
import { Button } from "ar-design";

const Page = () => {
  return (
    <>
      {/* Temel Kullanım */}
      <Button onClick={() => console.log("Tıklandı!")}>Kaydet</Button>

      {/* Variant ve Renk */}
      <Button variant="outlined" color="orange">
        Düzenle
      </Button>
      <Button variant="filled" color="red">
        Sil
      </Button>

      {/* İkonlu Buton */}
      <Button color="green" icon={{ element: <Icon /> }}>
        Ekle
      </Button>
      {/* Sadece İkon (Daire) */}
      <Button color="red" shape="circle" icon={{ element: <Icon /> }} />

      {/* Full Width */}
      <Button color="blue" fullWidth>
        Giriş Yap
      </Button>

      {/* Pozisyonlu Buton (Floating Action Button) */}
      <Button
        color="blue"
        shape="circle"
        position={{ type: "fixed", inset: ["bottom", "right"] }}
        icon={{ element: <Icon /> }}
      />

      {/* Uppercase */}
      <Button color="gray" upperCase>
        profil güncelle
      </Button>
    </>
  );
};

export default Page;
```

| Prop        | Tip                                                                                   | Varsayılan         | Açıklama                                                                 |
| ----------- | ------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------ |
| `variant`   | `"filled"` \| `"surface"` \| `"outlined"` \| `"dashed"` \| `"borderless"`             | `"filled"`         | Butonun görsel stilini belirler.                                         |
| `color`     | `IColors` (`blue`, `purple`, `pink`, `red`, `orange`, `yellow`, `green`, `teal`, ...) | `"light"`          | Butonun renk temasını ayarlar.                                           |
| `border`    | `{ radius?: "none" \| "sm" \| "lg" \| "xl" \| "xxl" \| "pill" \| "none" }`            | `{ radius: "sm" }` | Kenar yuvarlama ayarı.                                                   |
| `size`      | `"small"` \| `"normal"` \| `"large"`                                                  | `"normal"`         | Butonun boyutu.                                                          |
| `shape`     | `"circle"` \| `"square"`                                                              | –                  | Butonun geometrik şeklini belirler.                                      |
| `icon`      | `{ element: React.ReactNode; position?: "left" \| "right" }`                          | –                  | İkon ekler. Metinle birlikte kullanılabilir.                             |
| `upperCase` | `boolean`                                                                             | –                  | Eğer true ise, metin büyük harf yapılır.                                 |
| `fullWidth` | `boolean`                                                                             | –                  | Buton genişliği bulunduğu container kadar olur.                          |
| `position`  | `{ type: "fixed" \| "absolute"; inset: ("top" \| "right" \| "bottom" \| "left")[] }`  | –                  | Butonun sayfa üzerinde sabitlenmesini sağlar.                            |
| `children`  | `React.ReactNode`                                                                     | –                  | Butonun içeriği (metin veya JSX).                                        |
| `...`       | `React.ButtonHTMLAttributes<HTMLButtonElement>`                                       | –                  | Native `<button>` özelliklerini destekler (disabled, type, onClick vb.). |

## ButtonAction (Aksiyon Butonu)

```tsx
import { ButtonAction } from "ar-design";

const Page = () => {
  return (
    <ButtonAction
      buttons={[
        { text: "Düzenle", color: "blue", onClick: () => console.log("Düzenle tıklandı!") },
        { text: "Sil", color: "red", onClick: () => console.log("Sil tıklandı!") },
      ]}
    />
  );
};

export default Page;
```

| Prop      | Tip                                                                                                                                                                                                                            | Açıklama                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `buttons` | `{ text: string; color?: IColors ("blue" \| "purple" \| "pink"\| "red" \| "orange" \| "yellow" \| "green" \| "teal" \| ...); icon?:{ element: React.ReactNode; position?: "left" \| "right" } }; onClick: (event) => void;`\[] | Gösterilecek buton listesi. Her bir buton için **text**, **renk**, **ikon** ve **onClick** event’i tanımlanabilir. |

## ButtonGroup (Buton Grubu)

```tsx
import { Button, ButtonGroup } from "ar-design";
import { Color } from "ar-design/@types";

const Page = () => {
  const actions = [
    { text: "Kaydet", color: "blue" },
    { text: "Düzenle", color: "orange" },
    { text: "Sil", color: "red" },
  ];

  return (
    <>
      <ButtonGroup>
        <Button color="blue">Kaydet</Button>
        <Button color="blue">Kaydet</Button>
        <Button color="blue">Kaydet</Button>
        <Button color="red">Sil</Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button color="green">Kaydet</Button>
        {/* Bu bir Button olmadığı için hata gösterilir */}
        <div>Yanlış Element</div>
      </ButtonGroup>

      <ButtonGroup>
        {actions.map((action, index) => (
          <Button key={index} color={action.color as Color}>
            {action.text}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
};

export default Page;
```

| Prop       | Tip                                                            | Açıklama                                                                                |
| ---------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `children` | `ReactElement<typeof Button> \| ReactElement<typeof Button>[]` | Gruba dahil edilecek `Button` bileşenleri. Sadece `Button` olmalıdır, yoksa hata verir. |

## Checkbox (Onay Kutusu)

```tsx
import { Checkbox } from "ar-design";
import { useState } from "react";

const Page = () => {
  // states
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <>
      {/* Temel Kullanım */}
      <Checkbox label="Beni işaretle" checked={isChecked} onChange={(event) => setIsChecked(event.target.checked)} />

      {/* Farklı Renk */}
      <Checkbox
        label="Beni işaretle"
        color="red"
        checked={isChecked}
        onChange={(event) => setIsChecked(event.target.checked)}
      />

      <Checkbox
        label="Beni işaretle"
        color="orange"
        checked={isChecked}
        onChange={(event) => setIsChecked(event.target.checked)}
      />
    </>
  );
};

export default Page;
```

| Prop                     | Tip                                                             | Açıklama                                                    |        |            |                                                                                   |
| ------------------------ | --------------------------------------------------------------- | ----------------------------------------------------------- | ------ | ---------- | --------------------------------------------------------------------------------- |
| `label`                  | `string`                                                        | Checkbox yanında gösterilecek etiket.                       |        |            |                                                                                   |
| `variant`                | `string` (IGlobalProps üzerinden)                               | Bileşenin varyantını belirler (örn. `filled`, `outlined`).  |        |            |                                                                                   |
| `color`                  | `string` (IGlobalProps üzerinden)                               | Checkbox rengi (örn. `blue`, `red`, `green`).               |        |            |                                                                                   |
| `border`                 | `{ radius: string }` (IGlobalProps üzerinden)                   | Checkbox köşe yuvarlaklığı.                                 |        |            |                                                                                   |
| `upperCase`              | `boolean` (IGlobalProps üzerinden)                              | Label metnini büyük harf yapar.                             |        |            |                                                                                   |
| `validation`             | `IValidation` (IGlobalProps üzerinden)                          | Hata ve uyarı mesajlarıyla ilişkili validasyon özellikleri. |        |            |                                                                                   |
| Tüm standart input props | \`Omit\<React.InputHTMLAttributes<HTMLInputElement>, "children" | "type"                                                      | "size" | "color">\` | `onChange`, `checked`, `disabled` gibi standart input özellikleri kullanılabilir. |

## DatePicker (Tarih Seçici)

```tsx
import { DatePicker } from "ar-design";
import { useState } from "react";

const Page = () => {
  const [date, setDate] = useState<string>("");

  return (
    <>
      {/* Temel Kullanım */}
      <DatePicker value={date} onChange={(value) => setDate(value)} placeholder="Tarih Seçin" />

      {/* Tarih ve Saat Seçici */}
      <DatePicker value={date} onChange={(value) => setDate(value)} isClock placeholder="Tarih ve Saat Seçin" />

      {/* Renk ve Varyant Özelleştirmesi */}
      <DatePicker
        variant="outlined"
        color="green"
        value={date}
        onChange={(value) => setDate(value)}
        placeholder="Özel Renkli Tarih Seçici"
      />

      <p>Seçilen Tarih: {date}</p>
    </>
  );
};

export default Page;
```

## Input (Metin Girişi)

```tsx
import { Input, Paper } from "ar-design";
import { useState } from "react";

const Page = () => {
  const [value, setValue] = useState<string>("");

  return (
    <>
      {/* Temel Kullanım */}
      <Input placeholder="İsim giriniz" value={value} onChange={(e) => setValue(e.target.value)} />

      {/* UpperCase ve icon */}
      <Input
        placeholder="Soyisim giriniz"
        upperCase
        icon={{ element: </Icon> }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* Input + Addon */}
      <Input
        placeholder="Fiyat giriniz"
        addon={{ before: "$", after: "USD", variant: "filled" }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* Input + Button */}
      <Input
        placeholder="Arama yap"
        button={{
          children: "Ara",
          variant: "surface",
          color: "blue",
          onClick: () => alert(value),
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <p>Girilen değer: {value}</p>
    </>
  );
};

export default Page;
```

## Radio (Radyo Buton)

```tsx

```

## Switch (Anahtar)

```tsx

```

## Select (Açılır Liste)

```tsx

```

## TextEditor (Metin Editörü)

```tsx

```

## Upload (Dosya Yükleme)

```tsx

```

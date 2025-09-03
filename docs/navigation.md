# Navigasyon Bileşenleri

AR Design kütüphanesindeki navigasyon bileşenleri, kullanıcı gezinmesi ve sayfa yapısı için tasarlanmıştır.

## Menu (Menü)

```tsx
import { Menu } from "ar-design";
import { MenuProps } from "ar-design/@types";

const menu: MenuProps[] = [
  { render: "Ana Sayfa", icon: <HomeIcon /> },
  {
    type: "group",
    render: "Ayarlar",
    icon: <SettingsIcon />,
    submenu: [
      { render: "Profil" },
      { render: "Güvenlik" },
      { render: "Dil" },
      { type: "divider" },
      { render: "Çıkış Yap" },
    ],
  },
];

const Page = () => {
  return <Menu data={menu} />;
};

export default Page;
```

## Pagination (Sayfalama)

```tsx
import { Pagination } from "ar-design";
import { useState } from "react";

const Page = () => {
  // states
  const [page, setPage] = useState<number>(1);

  return (
    <Pagination
      currentPage={page}
      totalRecords={95}
      perPage={10}
      onChange={(newPage) => {
        setPage(newPage);
      }}
    />
  );
};

export default Page;
```

## Steps (Adım Göstergesi)

```tsx
import { Steps } from "ar-design";

const steps = [
  { title: "Kullanıcı Bilgileri", content: <UserForm /> },
  { title: "Adres Bilgileri", content: <AddressForm /> },
  { title: "Özet", content: <Summary /> },
];

const Page = () => {
  return <Steps steps={steps} onChange={(step) => console.log("Aktif adım:", step)} />;
};

export default Page;
```

## Steps (Adım Göstergesi) -> Validation

```tsx
import { Button, Steps } from "ar-design";
import { ValidationProperties } from "ar-design/@types";

const steps = [
  { title: "Kullanıcı", content: <UserForm /> },
  { title: "Adres", content: <AddressForm /> },
];

const validation = {
  data: { isim: "" }, // Boş olması durumunda ilerleme yapmaz.
  rules: [
    {
      key: "isim",
      step: 1,
      shape: [
        {
          type: "required",
          message: "İsim zorunlu.",
        },
      ],
    },
  ] as ValidationProperties<any>[],
};

const Page = () => {
  return (
    <Steps
      steps={steps}
      onChange={(step) => {
        console.log(step);
      }}
      validation={validation}
    >
      <Button color="orange">Taslak Kaydet</Button>
    </Steps>
  );
};

export default Page;
```

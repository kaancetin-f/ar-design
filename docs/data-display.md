# Data Display (Veri Görüntüleme Bileşenleri)

## Card (Kart)

```tsx
import { Card, Button } from "ar-design";

const Page = () => {
  return (
    <Card
      title="Kullanıcı Bilgileri"
      actions={<Button variant="borderless">...</Button>}
      variant="outlined"
      status="success"
    >
      <p>Ad Soyad: **** *****</p>
      <p>Email: ****.*****@example.com</p>
    </Card>
  );
};

export default Page;
```

| Prop       | Tip                                               | Varsayılan                         | Açıklama                                                 |
| ---------- | ------------------------------------------------- | ---------------------------------- | -------------------------------------------------------- |
| `title`    | `string`                                          | -                                  | Kart başlığı. Gösterilmek istenirse üstte render edilir. |
| `actions`  | `React.JSX.Element`                               | -                                  | Başlığın yanında gösterilecek aksiyon (ör. buton, menü). |
| `variant`  | `"filled" \| "outlined" \| "surface"`             | `"filled"`                         | Kartın görsel stilini belirler.                          |
| `status`   | `"primary" \| "success" \| "warning" \| "danger"` | Kartın durumunu/temasını belirler. |
| `children` | `React.ReactNode`                                 | -                                  | Kartın içeriği.                                          |

## Chip (Etiket)

```tsx
import { Chip } from "ar-design";

const Page = () => {
  return (
    <>
      <Chip text="Default" />
      <Chip text="Başarılı" variant="filled" color="blue" />
      <Chip text="Hata" variant="outlined" color="red" />
      <Chip text="Onaylandı" variant="surface" color="green" />
      <Chip text="Varsayılan" variant="dashed" color="blue" />
      <Chip text="Varsayılan" variant="borderless" color="blue" />

      {/* Icon */}
      <Chip text="Başarılı" variant="filled" color="green" icon={{ element: <SuccessIcon /> }} />
    </>
  );
};

export default Page;
```

| Prop      | Tip                                                                                                                 | Varsayılan         | Açıklama                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------------------------------- |
| `text`    | `string`                                                                                                            | -                  | Chip içinde gösterilecek metin.          |
| `variant` | `"filled" \| "surface" \| "outlined" \| "dashed" \| "borderless"`                                                   | `"outlined"`       | Chip stilini belirler.                   |
| `color`   | `"blue" \| "purple" \| "pink" \| "red" \| "orange" \| "yellow" \| "green" \| "teal" \| "cyan" \| "gray" \| "light"` | `"light"`          | Özel renk tonları.                       |
| `border`  | `{ radius: "sm" \| "lg" \| "xl" \| "xxl" \| "pill" \| "none" }`                                                     | `{ radius: "sm" }` | Chip köşe yuvarlama ayarı.               |
| `icon`    | `{ element: React.JSX.Element; position?: "start" \| "end" }` (opsiyonel)                                           | -                  | Chip başında veya sonunda ikon gösterir. |

## Diagram

```tsx
import { Diagram } from "ar-design";
import { EdgeData, NodeData } from "ar-design/@types";

const nodes: NodeData[] = [
  { id: 1, position: { x: 50, y: 50 }, data: { label: "Node 1" } },
  { id: 2, position: { x: 200, y: 50 }, data: { label: "Node 2" } },
];

const edges: EdgeData[] = [{ id: 1, from: { id: 1, port: "bottom" }, to: { id: 2, port: "top" } }];

const Page = () => {
  return <Diagram nodes={nodes} edges={edges} />;
};

export default Page;
```

| Prop    | Tip          | Varsayılan | Açıklama                                                       |
| ------- | ------------ | ---------- | -------------------------------------------------------------- |
| `nodes` | `NodeData[]` | -          | Diyagramdaki düğümler. Her düğümün pozisyon ve etiketi vardır. |
| `edges` | `EdgeData[]` | -          | Düğümler arasındaki bağlantılar.                               |

### 🔹 NodeData

| Alan       | Tip                        | Açıklama                            |
| ---------- | -------------------------- | ----------------------------------- |
| `id`       | `number`                   | Düğümün benzersiz ID’si.            |
| `position` | `{ x: number; y: number }` | Düğümün diyagram üzerindeki konumu. |
| `data`     | `{ label: string }`        | Düğümde gösterilecek metin/etiket.  |

### 🔹 EdgeData

| Alan   | Tip                                       | Açıklama                             |
| ------ | ----------------------------------------- | ------------------------------------ |
| `id`   | `number`                                  | Bağlantının benzersiz ID’si.         |
| `from` | `{ id: number; port: "top" \| "bottom" }` | Bağlantının başladığı düğüm ve port. |
| `to`   | `{ id: number; port: "top" \| "bottom" }` | Bağlantının bittiği düğüm ve port.   |

## Divider (Ayırıcı)

```tsx
import { Divider } from "ar-design";

const Page = () => {
  return (
    <>
      <p>İçerik 1</p>
      <Divider />
      <p>İçerik 2</p>
    </>
  );
};

export default Page;
```

## DnD / Drag and Drop (Sürükle-Bırak)

```tsx
import { DnD } from "ar-design";

type Task = { id: number; title: string };

const tasks: Task[] = [
  { id: 1, title: "Task 1" },
  { id: 2, title: "Task 2" },
  { id: 3, title: "Task 3" },
];

const Page = () => {
  const handleChange = (data: Task[]) => {
    console.log("Yeni sıralama:", data);
  };

  return (
    <DnD
      data={tasks}
      onChange={handleChange}
      renderItem={(item) => <div>{item.title}</div>}
      confing={{ isMoveIcon: true }}
    />
  );
};

export default Page;
```

| Prop         | Tip                                             | Varsayılan             | Açıklama                                                               |
| ------------ | ----------------------------------------------- | ---------------------- | ---------------------------------------------------------------------- |
| `data`       | `T[]`                                           | -                      | Sürüklenebilir öğelerin dizisi.                                        |
| `renderItem` | `(item: T, index: number) => React.JSX.Element` | -                      | Liste öğesinin render edilme şekli.                                    |
| `columnKey`  | `string` (opsiyonel)                            | -                      | Eğer birden fazla DnD alanı varsa, hangi kolona ait olduğunu belirtir. |
| `onChange`   | `(data: T[]) => void` (opsiyonel)               | -                      | Sıralama değiştiğinde çağrılır.                                        |
| `confing`    | `{ isMoveIcon: boolean }` (opsiyonel)           | `{ isMoveIcon: true }` | Her öğede hareket ikonu gösterilip gösterilmeyeceğini kontrol eder.    |

## Grid System (Izgara Sistemi)

### Row (Satır)

```tsx
import { Grid } from "ar-design";

const { Row, Column } = Grid;

const Page = () => {
  return (
    <Row>
      <Column>Sol Kolon</Column>
      <Column>Orta Kolon</Column>
      <Column>Sağ Kolon</Column>
    </Row>
  );
};

export default Page;
```

| Prop       | Tip               | Varsayılan | Açıklama                               |
| ---------- | ----------------- | ---------- | -------------------------------------- |
| `children` | `React.ReactNode` | -          | Satırın içinde gösterilecek içerikler. |

### Column (Kolon)

```tsx
import { Grid } from "ar-design";

const { Row, Column } = Grid;

const Page = () => {
  return (
    <Row>
      <Column size={{ xl: 6, md: 12 }} align="left">
        Sol Kolon
      </Column>
      <Column size={6} align="center">
        Sağ Kolon
      </Column>
    </Row>
  );
};

export default Page;
```

| Prop       | Tip                                                                       | Varsayılan | Açıklama                                                                                                                        |     |                                    |
| ---------- | ------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------- | --- | ---------------------------------- |
| `children` | `React.ReactNode`                                                         | -          | Sütunun içinde gösterilecek içerik.                                                                                             |     |                                    |
| `size`     | `number` veya `{ xl?: 1-12; lg?: 1-12; md?: 1-12; sm?: 1-12; xs?: 1-12 }` | -          | Sütunun genişliği. Tek sayı verilirse tüm breakpoint’lerde uygulanır, obje verilirse her breakpoint için ayrı boyut belirlenir. |     |                                    |
| `align`    | \`"left"                                                                  | "center"   | "right"\`                                                                                                                       | -   | Sütun içeriğinin yatay hizalaması. |

## Kanban Board

```tsx
import { KanbanBoard } from "ar-design";

type Task = { id: string; title: string };

const columns = [
  {
    key: "todo",
    title: "Yapılacaklar",
    items: [{ id: "1", title: "Task 1" }],
    renderItem: (item: Task) => <div>{item.title}</div>,
  },
  {
    key: "inProgress",
    title: "Devam Edenler",
    items: [],
    renderItem: (item: Task) => <div>{item.title}</div>,
  },
  {
    key: "done",
    title: "Tamamlananlar",
    items: [],
    renderItem: (item: Task) => <div>{item.title}</div>,
  },
];

const Page = () => {
  const handleChange = (item: Task, columnKey: string, hoverIndex: number) => {
    console.log(item, columnKey, hoverIndex);
  };

  return <KanbanBoard trackBy={(item) => item.id} columns={columns} onChange={handleChange} />;
};

export default Page;
```

| Prop       | Tip                                                                    | Varsayılan | Açıklama                                                     |
| ---------- | ---------------------------------------------------------------------- | ---------- | ------------------------------------------------------------ |
| `trackBy`  | `(item: T) => string`                                                  | -          | Her öğeyi eşsiz olarak tanımlamak için kullanılan fonksiyon. |
| `columns`  | `KanbanBoardColumnType<T, TColumnProperties>[]`                        | -          | Sütun dizisi ve her sütunun öğeleri ile render fonksiyonu.   |
| `onChange` | `(item: T, columnKey: string, hoverIndex: number) => void` (opsiyonel) | -          | Bir öğe sütun değiştirdiğinde çağrılır.                      |

### 🔧 KanbanBoardColumnType

| Prop         | Tip                                             | Açıklama                                              |
| ------------ | ----------------------------------------------- | ----------------------------------------------------- |
| `title`      | `string`                                        | Sütunun başlığı.                                      |
| `key`        | `string`                                        | Sütunun eşsiz anahtarı.                               |
| `items`      | `T[]`                                           | Sütundaki öğeler.                                     |
| `renderItem` | `(item: T, index: number) => React.JSX.Element` | Öğelerin nasıl render edileceğini belirten fonksiyon. |

## Paper (Kağıt)

```tsx
import { Button, Paper } from "ar-design";

const Page = () => {
  return (
    <Paper title="Başlık">
      <p>Bu, Paper bileşeni içindeki içeriktir.</p>
    </Paper>
  );
};

export default Page;
```

| Prop       | Tip                           | Varsayılan | Açıklama                                        |
| ---------- | ----------------------------- | ---------- | ----------------------------------------------- |
| `children` | `React.ReactNode`             | -          | İçerik alanı.                                   |
| `title`    | `string` (opsiyonel)          | -          | Başlık metni.                                   |
| `action`   | `React.ReactNode` (opsiyonel) | -          | Başlığın yanında gösterilecek aksiyon bileşeni. |

## Table (Tablo)

```tsx
import { Table } from "ar-design";
import { TableColumnType } from "ar-design/@types";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "passive";
};

const users: User[] = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: "2",
    name: "Ayşe Demir",
    email: "ayse.demir@example.com",
    role: "editor",
    status: "active",
  },
  {
    id: "3",
    name: "Mehmet Kaya",
    email: "mehmet.kaya@example.com",
    role: "viewer",
    status: "passive",
  },
  {
    id: "4",
    name: "Zeynep Çelik",
    email: "zeynep.celik@example.com",
    role: "editor",
    status: "active",
  },
];

const columns: TableColumnType<User>[] = [
  { key: "name", title: "Ad Soyad" },
  { key: "email", title: "E-posta", render: (u) => u.email },
];

const Page = () => {
  return (
    <Table
      trackBy={(item) => item.id}
      title="Kullanıcılar"
      description="Sistemde kayıtlı kullanıcılar listesi"
      data={users}
      columns={columns}
      actions={{
        create: { tooltip: "Yeni Kullanıcı", onClick: () => console.log("create") },
        delete: { tooltip: "Seçileni Sil", onClick: () => console.log("delete") },
      }}
      selections={(items) => console.log("Seçilenler:", items)}
      pagination={{
        totalRecords: 120,
        perPage: 10,
        onChange: (page) => console.log("Sayfa:", page),
      }}
      config={{
        isSearchable: true,
        scroll: { maxHeight: 400 },
        subrow: { openAutomatically: false, button: true },
      }}
    />
  );
};

export default Page;
```

| Prop                 | Tip                                                                                | Açıklama                                                               |
| -------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `trackBy`            | `(item: T) => string`                                                              | Her satırı benzersiz kılmak için ID üretici.                           |
| `title`              | `string`                                                                           | Tablo başlığı.                                                         |
| `description`        | `string`                                                                           | Başlık altı açıklama.                                                  |
| `data`               | `T[]`                                                                              | Tabloya render edilecek veriler.                                       |
| `columns`            | `TableColumnType<T>[]`                                                             | Tablo kolon tanımları.                                                 |
| `actions`            | `{ import?, export?, create?, delete? }`                                           | Import, export, create, delete aksiyonları.                            |
| `selections`         | `(selectionItems: T[]) => void`                                                    | Seçilen satırların callback’i.                                         |
| `previousSelections` | `T[]`                                                                              | Daha önce seçilmiş satırlar.                                           |
| `searchedParams`     | `(params: SearchedParam \| null, query: string, operator: FilterOperator) => void` | Arama/filtreleme callback’i.                                           |
| `onEditable`         | `(item: T, index: number) => void`                                                 | Satırın düzenlenebilir olduğu durumda tetiklenir.                      |
| `pagination`         | `{ totalRecords: number; perPage: number; onChange? }`                             | Sayfalama ayarları.                                                    |
| `config`             | `Config`                                                                           | Tablo genel ayarları (server-side, search, scroll, subrow, tree view). |
| `children`           | `React.ReactNode`                                                                  | Ek içerik (opsiyonel).                                                 |

## Tabs (Sekmeler)

```tsx
import { Tabs } from "ar-design";

const tabList = [
  { title: "Genel", content: <div>Genel İçerik</div> },
  { title: "Ayarlar", content: <div>Ayarlar İçeriği</div> },
  { title: "Profil", content: <div>Profil İçeriği</div> },
];

const Page = () => {
  return (
    <Tabs
      name="main-tabs"
      tabs={tabList}
      activeTab={0}
      onChange={(current) => {
        console.log("Aktif sekme:", current);
      }}
    />
  );
};

export default Page;
```

| Prop        | Tip                                        | Varsayılan | Açıklama                                              |
| ----------- | ------------------------------------------ | ---------- | ----------------------------------------------------- |
| `name`      | `string`                                   | -          | Sekme seti için benzersiz isim (sessionStorage için). |
| `tabs`      | `TabProps[]`                               | `[]`       | Sekme öğeleri listesi.                                |
| `activeTab` | `number` (opsiyonel)                       | `0`        | Başlangıçta aktif olacak sekme indeksi.               |
| `onChange`  | `(currentTab: number) => void` (opsiyonel) | -          | Sekme değiştiğinde tetiklenen callback.               |
| `onClose`   | `(closeTab: number) => void` (opsiyonel)   | -          | Sekme kapatıldığında tetiklenen callback.             |

### 🔧 TabProps

| Alan                 | Tip                        | Opsiyonel | Açıklama                                             |
| -------------------- | -------------------------- | --------- | ---------------------------------------------------- |
| `title`              | `string`                   | Hayır     | Sekmenin başlığı.                                    |
| `content`            | `React.ReactNode`          | Hayır     | Sekmenin içerik alanı (JSX veya komponent).          |
| `config`             | `{ canBeClosed: boolean }` | Evet      | Sekmenin kapatılabilir olup olmadığını belirler.     |
| `config.canBeClosed` | `boolean`                  | Evet      | `true` ise sekme kullanıcı tarafından kapatılabilir. |

## Typography (Tipografi)

### Title (Başlık Etiketi)

```tsx
import { Typography } from "ar-design";

const { Title } = Typography;

const Page = () => {
  return (
    <>
      <Title Level="h1" size="large" align="center" upperCase>
        Merhaba AR Design
      </Title>

      <Title Level="h3" size="medium" align="left">
        Alt Başlık
      </Title>
    </>
  );
};

export default Page;
```

| Alan             | Tip                                        | Opsiyonel | Varsayılan | Açıklama                                                         |          |                   |            |             |                                       |            |      |     |                |
| ---------------- | ------------------------------------------ | --------- | ---------- | ---------------------------------------------------------------- | -------- | ----------------- | ---------- | ----------- | ------------------------------------- | ---------- | ---- | --- | -------------- |
| `Level`          | \`"h1"                                     | "h2"      | "h3"       | "h4"                                                             | "h5"     | "h6"\`            | Hayır      | -           | Başlık seviyesi (HTML heading tag’i). |            |      |     |                |
| `children`       | `React.ReactNode`                          | Hayır     | -          | Başlık içeriği (metin veya JSX).                                 |          |                   |            |             |                                       |            |      |     |                |
| `align`          | \`"left"                                   | "center"  | "right"\`  | Evet                                                             | `"left"` | Metin hizalaması. |            |             |                                       |            |      |     |                |
| `size`           | \`"xx-small"                               | "x-small" | "small"    | "medium"                                                         | "large"  | "x-large"         | "xx-large" | "xxx-large" | "smaller"                             | "larger"\` | Evet | -   | Başlık boyutu. |
| `upperCase`      | `boolean`                                  | Evet      | `false`    | Eğer `true` ise başlık metni büyük harfe çevrilir.               |          |                   |            |             |                                       |            |      |     |                |
| Diğer HTML props | `React.HTMLAttributes<HTMLHeadingElement>` | Evet      | -          | `className`, `id`, `style` vb. HTML heading element özellikleri. |          |                   |            |             |                                       |            |      |     |                |

### Paragraph (Pragraf)

```tsx
import { Typography } from "ar-design";

const { Paragraph } = Typography;

const Page = () => {
  return (
    <>
      <Paragraph color="gray-700" size="normal" align="left">
        Bu bir standart paragraf örneğidir.
      </Paragraph>

      <Paragraph color="primary" size="large" align="center" upperCase>
        Merhaba Dünya
      </Paragraph>

      <Paragraph color="danger" size="small" align="right">
        Uyarı mesajı
      </Paragraph>
    </>
  );
};

export default Page;
```

| Alan             | Tip                                          | Opsiyonel | Varsayılan | Açıklama                                                                  |          |                   |            |             |           |            |      |     |                  |
| ---------------- | -------------------------------------------- | --------- | ---------- | ------------------------------------------------------------------------- | -------- | ----------------- | ---------- | ----------- | --------- | ---------- | ---- | --- | ---------------- |
| `children`       | `React.ReactNode`                            | Hayır     | -          | Paragraf içeriği (metin veya JSX).                                        |          |                   |            |             |           |            |      |     |                  |
| `color`          | `ParagraphColors \| Status`                  | Evet      | -          | Metin rengi. `ParagraphColors` veya `Status` değerlerinden biri olabilir. |          |                   |            |             |           |            |      |     |                  |
| `align`          | \`"left"                                     | "center"  | "right"\`  | Evet                                                                      | `"left"` | Metin hizalaması. |            |             |           |            |      |     |                  |
| `size`           | \`"xx-small"                                 | "x-small" | "small"    | "medium"                                                                  | "large"  | "x-large"         | "xx-large" | "xxx-large" | "smaller" | "larger"\` | Evet | -   | Paragraf boyutu. |
| `upperCase`      | `boolean`                                    | Evet      | `false`    | Eğer `true` ise paragraf metni büyük harfe çevrilir.                      |          |                   |            |             |           |            |      |     |                  |
| Diğer HTML props | `React.HTMLAttributes<HTMLParagraphElement>` | Evet      | -          | `className`, `id`, `style` vb. HTML paragraph element özellikleri.        |          |                   |            |             |           |            |      |     |                  |

### 🔧 ParagraphColors

| Renk       | Açıklama          |
| ---------- | ----------------- |
| `gray-100` | En açık gri ton   |
| `gray-200` | Açık gri ton      |
| `gray-300` | Hafif gri ton     |
| `gray-400` | Orta açık gri ton |
| `gray-500` | Orta gri ton      |
| `gray-600` | Orta koyu gri ton |
| `gray-700` | Koyu gri ton      |
| `gray-800` | Daha koyu gri ton |
| `gray-900` | En koyu gri ton   |

### 🔧 Statuses

| Status          | Açıklama                                       |
| --------------- | ---------------------------------------------- |
| `primary`       | Ana vurgu rengi                                |
| `primary-light` | Ana rengin açık tonu                           |
| `secondary`     | İkincil vurgu rengi                            |
| `success`       | Başarılı durumları temsil eden renk            |
| `danger`        | Hata veya tehlike durumlarını temsil eden renk |
| `warning`       | Uyarı durumlarını temsil eden renk             |
| `information`   | Bilgi veya nötr durumları temsil eden renk     |
| `dark`          | Koyu renk tonu                                 |
| `light`         | Açık renk tonu                                 |

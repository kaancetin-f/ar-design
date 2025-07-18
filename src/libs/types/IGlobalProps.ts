import { Border, Color, Icon, Sizes, Status, Variants } from ".";

export interface IChildren {
  /**
   * Bileşenin içinde render edilecek içeriği belirtir.
   * Bu içerik bir dize (string) veya bir React Elemanı olabilir.
   *
   * Örneğin;
   * - Bir Dize: "Hello, World!"
   * - Bir React Elemanı: <span>Hello, World!</span>
   *
   * ```jsx
   * <Component>Hello, World!</Component>
   *
   * <Component>
   *    <span>Hello, World!</span>
   * </Component>
   *
   * <Component>
   *    <span>Hello, World!</span>
   *    <span>Hello, World!</span>
   * </Component>
   * ```
   */
  children?: React.ReactNode;
}

export interface IVariant<T extends { component?: string } = {}> {
  /**
   * Bileşenin stil varyantını belirtir.
   *
   * - `filled`: Dolu arka plan rengi ile stilize edilmiş bir varyant.
   * - `outlined`: Sadece kenarlıkları olan, arka planı şeffaf olan bir varyant.
   * - `dashed`: Sadece kesikli kenarlıkları olan, arka planı şeffaf olan bir varyant.
   * - `text`: Arka plan ve kenarlık olmadan sadece metni gösteren bir varyant.
   *
   * Bu seçenekler, bileşenin görünümünü ve stilini değiştirir.
   *
   * Örneğin;
   *
   * ```jsx
   * <Component variant="filled">Hello, World!</Component>
   * ```
   */
  variant?: T["component"] extends "alert"
    ? Exclude<Variants, "outlined" | "borderless">
    : T["component"] extends "card"
    ? Exclude<Variants, "dashed" | "borderless">
    : Variants;
}

export interface IStatus<T extends { component?: string } = {}> {
  /**
   * Bileşenin statü durumuna göre renk özelliğini belirtir.
   *
   * Örneğin;
   *
   * ```jsx
   * <Component status="success">Hello, World!</Component>
   * ```
   */
  status?: T["component"] extends "alert"
    ? Exclude<Status, "primary-light" | "secondary" | "information" | "dark" | "light">
    : T["component"] extends "card"
    ? Exclude<Status, "primary-light" | "secondary" | "information" | "dark" | "light">
    : Status;
}

export interface IColors {
  /**
   * Bileşenin renk özelliğini belirtir.
   *
   * Örneğin;
   *
   * ```jsx
   * <Component color="blue">Hello, World!</Component>
   * ```
   */
  color?: Color;
}

export interface IBorder {
  /**
   * Bileşenin çervesinde düzenleme yapılmasına olanak tanır.
   * Kenarlığın stilini ve köşe yuvarlama derecesini tanımlamak için kullanılır.
   *
   * - `radius` (isteğe bağlı): Köşe yuvarlama derecesini belirtir.
   *    - `sm`: Küçük yuvarlama.
   *    - `lg`: Büyük yuvarlama.
   *    - `xl`: Ekstra büyük yuvarlama.
   *    - `xxl`: Çok büyük yuvarlama.
   *    - `pill`: Hap şeklinde yuvarlama.
   *    - `none`: Yuvarlama yok.
   *
   * Örneğin;
   *
   * ```jsx
   * <Component border={{ radius: "sm" }} >
   *  Example
   * </Component>
   * ```
   */
  border?: Border;
}

export interface IIcon {
  /**
   * İkon eklemeyi sağlar.
   * İkonun kendisini, yönünü ve pozisyonunu tanımlamak için kullanılır.
   *
   * - `element`: İkon olarak kullanılacak React JSX elemanı.
   * - `position` (isteğe bağlı): İkonun metne göre konumunu belirtir.
   *    - `start`: İkon metnin başında yer alır.
   *    - `end`: İkon metnin sonunda yer alır.
   *
   * Örneğin;
   *
   * ```jsx
   * <Component
   *    icon={{
   *      element: <MyIcon />,
   *      direction: "row",
   *      position: "start"
   *    }}
   * >
   *  Click Me!
   * </Component>
   * ```
   */
  icon?: Icon;
}

export interface ISize {
  /**
   * Bileşenin boyutlarınu belirlemek için kullanılır.
   *
   * - `large`: Büyük boyut.
   * - `normal (Varsayılan)`: Normal boyut.
   * - `small`: Küçük boyut.
   *
   * Örneğin;
   *
   * ```jsx
   * <Component size="large" >
   *  Example
   * </Component>
   * ```
   */
  size?: Sizes;
}

export interface IUpperCase {
  /**
   * Bileşendeki metni büyük harflere dönüştürüp dönüştürmeyeceğini belirtir.
   * Boolean (true/false) değeri alır.
   *
   * - `true`: Metin büyük harflerle yazılır.
   * - `false`: Metin olduğu gibi, yani küçük/büyük harf karışımı şeklinde yazılır.
   *
   * Bu özellik, metnin stilini özelleştirmek için kullanılır ve isteğe bağlı şekilde çalışır.
   *
   * Örneğin;
   *
   * ```jsx
   * <Component upperCase>
   *  Example
   * </Component>
   * ```
   */
  upperCase?: boolean;
}

export interface IValidation {
  /**
   * Bileşen için doğrulama (validation) mesajı tanımlamak amacıyla kullanılır.
   *
   * - `text`: Gösterilecek hata veya uyarı mesajı.
   * - `scrollTo`: (İsteğe bağlı) true olarak ayarlanırsa, doğrulama mesajı varsa ilgili bileşene otomatik olarak kaydırma yapılır.
   *
   * Örneğin;
   *
   * ```jsx
   * <Component
   *   validation={{
   *     text: "Bu alan zorunludur.",
   *     scrollTo: true,
   *   }}
   * />
   * ```
   */
  validation?: {
    text: string | undefined;
    scrollTo?: boolean;
  };
}

export interface IDisabled {
  /**
   * Bileşenin pasif (devre dışı) olup olmadığını belirtmek için kullanılır.
   *
   * - `true`: Bileşen devre dışı olur, kullanıcı etkileşimi engellenir.
   * - `false` veya belirtilmemişse: Bileşen aktif olur.
   *
   * Örneğin;
   *
   * ```jsx
   * <Component disabled>
   *  Example
   * </Component>
   * ```
   */
  disabled?: boolean;
}

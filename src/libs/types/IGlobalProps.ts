import { Border, Icon, Sizes, Status, Variants } from ".";

/**
 * Ortak olabilecek özellikler bu interface altına konumlandırıldı.
 */
export interface IGlobalProps {
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
  variant?: Variants;

  /**
   * Bileşenin statü durumuna göre renk özelliğini belirtir.
   *
   * Örneğin;
   *
   * ```jsx
   * <Component status="success">Hello, World!</Component>
   * ```
   */
  status?: Status;

  /**
   * İkon eklemeyi sağlar.
   * İkonun kendisini, yönünü ve pozisyonunu tanımlamak için kullanılır.
   *
   * - `element`: İkon olarak kullanılacak React JSX elemanı.
   * - `direction` (isteğe bağlı): İkonun ve metnin hizalanma yönünü belirtir.
   *    - `row`: İkon ve metin yatay olarak hizalanır.
   *    - `column`: İkon ve metin dikey olarak hizalanır.
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
   *  Test
   * </Component>
   * ```
   */
  border?: Border;

  size?: Sizes;

  /**
   * Bileşendeki metni büyük harflere dönüştürüp dönüştürmeyeceğini belirtir.
   * Boolean (true/false) değeri alır.
   *
   * - `true`: Metin büyük harflerle yazılır.
   * - `false`: Metin olduğu gibi, yani küçük/büyük harf karışımı şeklinde yazılır.
   *
   * Bu özellik, metnin stilini özelleştirmek için kullanılır ve isteğe bağlı şekilde çalışır.
   */
  upperCase?: boolean;

  disabled?: boolean;
}

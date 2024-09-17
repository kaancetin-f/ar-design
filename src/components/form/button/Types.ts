import { BorderRadiuses } from "../../../libs/types/BorderRadiuses";
import { Colors } from "../../../libs/types/Colors";
import { Variants } from "../../../libs/types/Variants";

export type Props = {
  /**
   * Bileşenin içinde render edilecek içeriği belirtir.
   * Bu içerik bir dize (string) veya bir React JSX elemanı olabilir.
   *
   * Örneğin;
   * - Bir dize: "Hello, World!"
   * - Bir React JSX elemanı: <span>Hello, World!</span>
   *
   * ```jsx
   * <Button>Hello, World!</Button>
   *
   * <Button>
   *    <span>Hello, World!</span>
   * </Button>
   * ```
   */
  children?: string | React.JSX.Element;

  /**
   * Bileşenin stil varyantını belirtir.
   * Üç seçenekten biri olabilir: "filled", "outlined" veya "text".
   *
   * - `"filled"`: Dolu arka plan rengi ile stilize edilmiş bir varyant.
   * - `"outlined"`: Sadece kenarlıkları olan, arka planı şeffaf olan bir varyant.
   * - `"text"`: Arka plan ve kenarlık olmadan sadece metni gösteren bir varyant.
   *
   * Bu seçenekler, bileşenin görünümünü ve stilini değiştirir.
   *
   * Örneğin;
   *
   * ```jsx
   * <Button variant="filled">Hello, World!</Button>
   * ```
   */
  variant?: Variants;

  /**
   * Bileşenin şekil varyantını belirtir ve genellikle sadece ikon için kullanılmalıdır.
   * İki seçenekten biri olabilir: "circle" veya "square".
   *
   * - `"circle"`: Daire şeklinde stilize edilmiş bir varyant.
   * - `"square"`: Kare şeklinde stilize edilmiş bir varyant.
   *
   * Bu seçenekler, bileşenin şekilsel görünümünü değiştirir.
   *
   * Örneğin;
   *
   * ```jsx
   * <Button shape="circle">Hello, World!</Button>
   * ```
   */
  shape?: "circle" | "square";

  /**
   * Bileşenin renk özelliğini belirtir.
   * Renklerin tanımlandığı bir `Colors` türü kullanılır.
   *
   * `Colors` türü, belirli renklerin ve renk şemalarının tanımlandığı bir enum veya benzeri bir yapıyı temsil eder.
   *
   * Örneğin;
   *
   * ```jsx
   * <Button color="success">Hello, World!</Button>
   * ```
   */
  color?: Colors;

  /**
   * Bileşenine ikon eklemeyi sağlar.
   * İkonun kendisini, yönünü ve pozisyonunu tanımlamak için kullanılır.
   *
   * - `element`: İkon olarak kullanılacak React JSX elemanı.
   * - `direction` (isteğe bağlı): İkonun ve metnin hizalanma yönünü belirtir.
   *    - `"row"`: İkon ve metin yatay olarak hizalanır.
   *    - `"column"`: İkon ve metin dikey olarak hizalanır.
   * - `position` (isteğe bağlı): İkonun metne göre konumunu belirtir.
   *    - `"start"`: İkon metnin başında yer alır.
   *    - `"end"`: İkon metnin sonunda yer alır.
   *
   * Örneğin;
   *
   * ```jsx
   * <Button
   *    icon={{
   *      element: <MyIcon />,
   *      direction: "row",
   *      position: "start"
   *    }}
   * >
   *  Click Me!
   * </Button>
   * ```
   */
  icon?: {
    element: React.JSX.Element;
    direction?: "row" | "column";
    position?: "start" | "end";
  };

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

  /**
   * Bileşenin çervesinde düzenleme yapılmasına olanak tanır.
   * Kenarlığın stilini ve köşe yuvarlama derecesini tanımlamak için kullanılır.
   *
   * - `style` (isteğe bağlı): Kenarlığın stilini belirtir.
   *    - `"solid"`: Düz çizgi şeklinde kenarlık.
   *    - `"dashed"`: Kesik çizgi şeklinde kenarlık.
   *    - `"none"`: Kenarlık yok.
   * - `radius` (isteğe bağlı): Köşe yuvarlama derecesini belirtir.
   *    - `"sm"`: Küçük yuvarlama.
   *    - `"lg"`: Büyük yuvarlama.
   *    - `"xl"`: Ekstra büyük yuvarlama.
   *    - `"xxl"`: Çok büyük yuvarlama.
   *    - `"pill"`: Hap şeklinde yuvarlama.
   *    - `"none"`: Yuvarlama yok.
   *
   * Örneğin;
   *
   * ```jsx
   * <Button
   *    border={{
   *     style: "solid",
   *     radius: "lg"
   *    }}
   * >
   *  Test
   * </Button>
   * ```
   */
  border?: {
    radius?: BorderRadiuses;
  };

  size?: "large" | "normal" | "small";

  position?: {
    type: "fixed" | "absolute";
    inset: ("top" | "right" | "bottom" | "left")[];
  };
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

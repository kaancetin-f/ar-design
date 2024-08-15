import { Colors } from "../../libs/types/colors";

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
   *
   * Bu prop isteğe bağlıdır.
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
  variant?: "filled" | "outlined" | "text";

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
   * Bu prop isteğe bağlıdır.
   */
  color?: Colors;

  /**
   * Bileşenin yanında gösterilecek bir ikonu belirtir.
   * İkon, bir React JSX elemanı olarak sağlanır.
   *
   * Örneğin, bir SVG ikon veya bir font ikon bileşeni olabilir:
   *
   * ```jsx
   * <Button icon={<Icon name="***" />}>Hello, World!</Button>
   * ```
   *
   * Bu prop isteğe bağlıdır ve sağlanmazsa bileşende bir ikon görünmeyecektir.
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

  border?: {
    style?: "solid" | "dashed" | "none";
    radius?: "sm" | "lg" | "xl" | "xxl" | "pill" | "none";
  };

  width?: "max-width" | "auto";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

import { IBorder, IColors, IIcon, ISize, IUpperCase, IVariant } from "../../../libs/types/IGlobalProps";

interface IProps
  extends IVariant,
    IColors,
    IBorder,
    IIcon,
    ISize,
    IUpperCase,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
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
   * Bileşenin konumlandırmasını belirlemek için kullanılır.
   *
   * - `type`: CSS `position` özelliği.
   *   - `fixed`: Sayfa boyunca sabit konum.
   *   - `absolute`: Üst öğeye göre konumlandırma.
   * - `inset`: Bileşenin konumlanacağı kenar(lar).
   *   - Örn: `["top", "left"]` => üstten ve soldan hizalanır.
   *
   * Örneğin;
   *
   * ```jsx
   * <Component
   *   position={{
   *     type: "absolute",
   *     inset: ["top", "left"]
   *   }}
   * />
   * ```
   */
  position?: {
    type: "fixed" | "absolute";
    inset: ("top" | "right" | "bottom" | "left")[];
  };

  /**
   * Bileşenin yatayda tam genişlikte olup olmayacağını belirtir.
   *
   * - `true`: Bileşen bulunduğu kapsayıcının tüm genişliğini kaplar.
   * - `false` veya belirtilmemişse: İçeriğe göre genişlik alır.
   *
   * Örneğin;
   *
   * ```jsx
   * <Component fullWidth />
   * ```
   */
  fullWidth?: boolean;
}

export default IProps;

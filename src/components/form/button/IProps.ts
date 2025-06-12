import { IBorder, IIcon, ISize, IStatus, IUpperCase, IVariant } from "../../../libs/types/IGlobalProps";

interface IProps
  extends IVariant,
    IStatus,
    IBorder,
    IIcon,
    ISize,
    IUpperCase,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
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
   * Bileşene açıklayıcı bir bilgi balonu (tooltip) eklemek için kullanılır.
   *
   * - `text`: Tooltip içerisinde gösterilecek açıklama metni.
   * - `direction`: Tooltip’in hangi yönde görüneceğini belirtir. Varsayılan yön kullanılabilir.
   *   - `top`: Tooltip yukarıda görünür.
   *   - `right`: Tooltip sağda görünür.
   *   - `left`: Tooltip solda görünür.
   *   - `bottom`: Tooltip aşağıda görünür.
   *
   * Örneğin;
   *
   * ```jsx
   * <Component
   *   tooltip={{
   *     text: "Bu bir açıklamadır.",
   *     direction: "top"
   *   }}
   * />
   * ```
   */
  tooltip?: {
    text: string;
    direction?: "top" | "right" | "left" | "bottom";
  };

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

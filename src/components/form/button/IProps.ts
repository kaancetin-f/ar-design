import { IGlobalProps } from "../../../libs/types/IGlobalProps";

interface IProps
  extends Omit<IGlobalProps, "children" | "disabled">,
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

  position?: {
    type: "fixed" | "absolute";
    inset: ("top" | "right" | "bottom" | "left")[];
  };
}

export default IProps;

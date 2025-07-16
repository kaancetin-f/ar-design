import IButtonProps from "../button/IProps";
import { Variants } from "../../../libs/types";
import { IBorder, IColors, IIcon, ISize, IUpperCase, IValidation, IVariant } from "../../../libs/types/IGlobalProps";

interface IProps
  extends IVariant,
    IColors,
    IBorder,
    IIcon,
    ISize,
    IUpperCase,
    IValidation,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size" | "color"> {
  /**
   * Bileşene entegre bir buton özelliği eklemek için kullanılır.
   *
   * `IButtonProps` tipi ile tanımlanır ve butonun davranışlarını, metnini, tıklama olaylarını vs. içerir.
   *
   * Örneğin;
   *
   * ```jsx
   * <Input
   *   button={{
   *     text: "Gönder",
   *     onClick: () => console.log("Tıklandı"),
   *   }}
   * />
   * ```
   */
  button?: IButtonProps;

  /**
   * Bileşenin başına (`before`) veya sonuna (`after`) yardımcı içerikler (ek öğeler) eklemek için kullanılır.
   *
   * - `variant`: Stil türünü belirtir ("filled" | "outlined" | "dashed" | "borderless").
   * - `before`: Bileşenin soluna içerik ekler (örneğin ₺, %, vb.).
   * - `after`: Bileşenin sağına içerik ekler.
   *
   * Örneğin;
   *
   * ```jsx
   * <Input addon={{ variant: "outlined", before: "₺", after: "KDV" }} />
   * ```
   */
  addon?: { variant?: Variants; before?: string | number; after?: string | number };
}

export default IProps;

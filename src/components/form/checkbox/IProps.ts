import { IBorder, ISize, IStatus, IUpperCase, IValidation, IVariant } from "../../../libs/types/IGlobalProps";

interface IProps
  extends IVariant,
    IStatus,
    IBorder,
    ISize,
    IUpperCase,
    IValidation,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "type" | "size"> {
  /**
   * Bileşenin başlığı veya etiket metnidir.
   *
   * Genellikle input, buton gibi öğelerin ne amaçla kullanıldığını belirtmek için görüntülenir.
   *
   * Örneğin;
   *
   * ```jsx
   * <Checkbox label="Kullanıcı Adı" />
   * ```
   */
  label?: string;
}

export default IProps;

import {
  IBorder,
  IDisabled,
  IIcon,
  ISize,
  IStatus,
  IUpperCase,
  IValidation,
  IVariant,
} from "../../../libs/types/IGlobalProps";

interface IProps
  extends IVariant,
    IStatus,
    IBorder,
    IIcon,
    ISize,
    IUpperCase,
    IValidation,
    IDisabled,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size"> {
  /**
   * Bileşenin başlığı veya etiket metnidir.
   *
   * Genellikle input, buton gibi öğelerin ne amaçla kullanıldığını belirtmek için görüntülenir.
   *
   * Örneğin;
   *
   * ```jsx
   * <Switch label="Kullanıcı Adı" />
   * ```
   */
  label?: string;
}

export default IProps;

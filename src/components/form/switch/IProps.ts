import {
  IBorder,
  IColors,
  IDisabled,
  IIcon,
  ISize,
  IUpperCase,
  IValidation,
  IVariant,
} from "../../../libs/types/IGlobalProps";

interface IProps
  extends IVariant,
    IColors,
    IBorder,
    IIcon,
    ISize,
    IUpperCase,
    IValidation,
    IDisabled,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size" | "color"> {
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

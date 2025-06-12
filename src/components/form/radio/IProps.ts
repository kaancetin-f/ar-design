import { IBorder, IIcon, ISize, IStatus, IUpperCase, IValidation, IVariant } from "../../../libs/types/IGlobalProps";
import { Status } from "../../../libs/types";

interface IProps
  extends IVariant,
    IStatus,
    IBorder,
    IIcon,
    ISize,
    IUpperCase,
    IValidation,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size"> {
  /**
   * Bileşenin başlığı veya etiket metnidir.
   *
   * Genellikle input, buton gibi öğelerin ne amaçla kullanıldığını belirtmek için görüntülenir.
   *
   * Örneğin;
   *
   * ```jsx
   * <Radio label="Kullanıcı Adı" />
   * ```
   */
  label?: string;

  /**
   * Bileşenin izlenebilir bir durum göstergesi (trace) olup olmadığını belirtir.
   *
   * - `color`: İzleme durumunu belirtmek için kullanılır. `Status` tipiyle tanımlanır (örneğin "success", "error", "warning" gibi).
   *
   * Örneğin;
   *
   * ```jsx
   * <Radio trace={{ color: "success" }} />
   * ```
   */
  trace?: { color: Status };
}

export default IProps;

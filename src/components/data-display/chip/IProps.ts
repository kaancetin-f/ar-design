import { IBorder, IIcon, IStatus, IVariant } from "../../../libs/types/IGlobalProps";

interface IProps extends IVariant, IStatus, IBorder, IIcon {
  /**
   * Bileşende gösterilecek metin.
   *
   * Örneğin;
   *
   * ```jsx
   * <Chip text="..." />
   * ```
   */
  text: string;
}

export default IProps;

import { IBorder, IColors, IIcon, IVariant } from "../../../libs/types/IGlobalProps";

interface IProps extends IVariant, IColors, IBorder, IIcon {
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

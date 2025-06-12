import { IChildren } from "../../../libs/types/IGlobalProps";

interface IProps extends IChildren {
  /**
   * Gösterilecek metin veya metinler.
   *
   * Örneğin;
   *
   * ```jsx
   * <Tooltip text="..."><Component>...</Component></Tooltip>
   * <Tooltip text={["...", "..."]}><Component>...</Component></Tooltip>
   * ```
   */
  text: string | string[];

  /**
   * Tooltip'in hangi yönde görüneceği.
   *
   * Geçerli değerler:
   * - `top`: Üstte
   * - `right`: Sağda
   * - `left`: Solda
   * - `bottom`: Altta
   *
   * Örneğin;
   *
   * ```jsx
   * <Tooltip text="Bilgi" direction="right"><Component>...</Component></Tooltip>
   * ```
   */
  direction?: "top" | "right" | "left" | "bottom";
}

export default IProps;

import { ParagraphColors, Status } from "../../../../libs/types";
import { IChildren, ISize, IUpperCase } from "../../../../libs/types/IGlobalProps";

interface IProps extends IChildren, ISize, IUpperCase {
  /**
   * Paragraf metninin rengi.
   *
   * `ParagraphColors` veya `Status` tipi değer alabilir.
   *
   * Örneğin;
   *
   * ```jsx
   * <Paragraph color="error" />
   * ```
   */
  color?: ParagraphColors | Status;

  /**
   * Metnin yatay hizalamasını belirler.
   *
   * - `left`: Metin sola hizalanır.
   * - `center`: Metin ortalanır.
   * - `right`: Metin sağa hizalanır.
   *
   * Örneğin;
   *
   * ```jsx
   * <Paragraph align="left" />
   * ```
   */
  align?: "left" | "center" | "right";
}

export default IProps;

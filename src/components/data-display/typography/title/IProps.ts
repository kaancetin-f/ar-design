import { IChildren, IUpperCase } from "../../../../libs/types/IGlobalProps";

interface IProps extends IChildren, IUpperCase, React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Başlığın HTML seviyesini belirler.
   *
   * - `h1` en büyük başlıktır, `h6` ise en küçük.
   * - Semantik anlamda uygun başlık seviyeleri kullanılması önerilir.
   *
   * Örneğin;
   *
   * ```jsx
   * <Title Level="h2" />
   * ```
   */
  Level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  /**
   * Başlık metninin yatay hizalamasını belirler.
   *
   * - `"left"`: Metin sola hizalanır.
   * - `"center"`: Metin ortalanır.
   * - `"right"`: Metin sağa hizalanır.
   *
   * Örneğin;
   *
   * ```jsx
   * <Title align="center" />
   * ```
   */
  align?: "left" | "center" | "right";

  /**
   * Başlık metninin boyutunu belirler.
   *
   * Aşağıdaki CSS'e karşılık gelen değerleri destekler:
   * - `"xx-small"` → Çok çok küçük
   * - `"x-small"` → Çok küçük
   * - `"small"` → Küçük
   * - `"medium"` → Orta (varsayılan)
   * - `"large"` → Büyük
   * - `"x-large"` → Çok büyük
   * - `"xx-large"` → Çok çok büyük
   * - `"xxx-large"` → En büyük
   * - `"smaller"` → Ebeveyn öğeye göre daha küçük
   * - `"larger"` → Ebeveyn öğeye göre daha büyük
   *
   * Örneğin;
   *
   * ```jsx
   * <Title size="x-large" />
   * ```
   */
  size?:
    | "xx-small"
    | "x-small"
    | "small"
    | "medium"
    | "large"
    | "x-large"
    | "xx-large"
    | "xxx-large"
    | "smaller"
    | "larger";
}

export default IProps;

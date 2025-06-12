type Column = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface IProps {
  /**
   * Kolon içinde gösterilecek içerik.
   *
   * Örneğin;
   *
   * ```jsx
   * <Column>
   *   <p>İçerik</p>
   * </Column>
   * ```
   */
  children: React.ReactNode;

  /**
   * Kolon genişliğini belirler.
   *
   * - Sayı olarak verilirse tüm cihazlarda aynı genişlik uygulanır.
   * - Obje olarak verilirse, farklı ekran boyutlarına göre özel kolon genişlikleri tanımlanabilir.
   *
   * Örneğin;
   *
   * ```jsx
   * <Column size={6}>...</Column>
   * ```
   * veya
   * ```jsx
   * <Column size={{ xl: 3, md: 6, xs: 12 }}>...</Column>
   * ```
   */
  size?:
    | {
        xl?: Column;
        lg?: Column;
        md?: Column;
        sm?: Column;
        xs?: Column;
      }
    | number;

  /**
   * İçeriğin yatay hizalamasını belirler.
   *
   * - `left`: İçerik sola hizalanır.
   * - `center`: İçerik yatayda ortalanır.
   * - `right`: İçerik sağa hizalanır.
   *
   * Örneğin;
   *
   * ```jsx
   * <Column align="center">...</Column>
   * ```
   */
  align?: "left" | "center" | "right";
}

export default IProps;

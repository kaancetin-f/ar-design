import React from "react";

interface IProps<T> {
  /**
   * Sürüklenebilir liste verisi.
   *
   * Örneğin;
   *
   * ```jsx
   * <DnD data={[{ id: 1, ... }, { id: 2, ... }]} />
   * ```
   */
  data: T[];

  /**
   * Her bir öğenin nasıl render edileceğini tanımlar.
   *
   * - `item`: Mevcut öğe.
   * - `index`: Öğenin listedeki sırası.
   *
   * Örneğin;
   *
   * ```jsx
   * <DnD renderItem={(item) => <div>{item.label}</div>} />
   * ```
   */
  renderItem: (item: T, index: number) => React.JSX.Element;

  columnKey?: string;
  /**
   * Sıralama değiştiğinde tetiklenen olay.
   *
   * - `data`: Yeni sıralanmış öğeler.
   *
   * Örneğin;
   *
   * ```jsx
   * <DnD onChange={(data) => console.log("Yeni sıra:", data)} />
   * ```
   */
  onChange: (data: T[]) => void;
}

export default IProps;

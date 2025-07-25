export type NodeData = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  data: { label: string };
};

export type EdgeData = {
  id: string;
  position: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
  from: number;
  to?: number;
};

interface IProps {
  /**
   * Sürüklenebilir liste verisi.
   *
   * Örneğin;
   *
   * ```jsx
   * <Diagram data={[{ id: 1, ... }, { id: 2, ... }]} />
   * ```
   */
  nodes: NodeData[];

  /**
   * Her bir öğenin nasıl render edileceğini tanımlar.
   *
   * - `item`: Mevcut öğe.
   * - `index`: Öğenin listedeki sırası.
   *
   * Örneğin;
   *
   * ```jsx
   * <Diagram renderItem={(item) => <div>{item.label}</div>} />
   * ```
   */
  // renderItem: (item: T, index: number) => React.JSX.Element;
  // renderAsside: React.ReactNode;

  edges: EdgeData[];
}

export default IProps;

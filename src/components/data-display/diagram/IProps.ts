export type NodeData = {
  id: number;
  position: {
    x: number;
    y: number;
  };
  data: { label: string };
};

type Port = "top" | "bottom";

export type EdgeData = {
  id: number;
  from: {
    id: number;
    port: Port;
  };
  to: {
    id: number;
    port: Port;
  };
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

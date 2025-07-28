import React, { useMemo, useRef, useState } from "react";
import "../../../assets/css/components/data-display/diagram/styles.css";
import IProps, { EdgeData, NodeData } from "./IProps";

type Position = { x: number; y: number };

export default function Diagram({ nodes, edges }: IProps) {
  // refs
  const _arDiagram = useRef<HTMLDivElement | null>(null);
  const _container = useRef<HTMLDivElement | null>(null);
  const _arNodes = useRef<Record<string, HTMLDivElement | null>>({});
  // refs -> Start Position
  const _dragStartMousePosition = useRef<Position>({ x: 0, y: 0 });
  const _dragStartNodePosition = useRef<Position>({ x: 0, y: 0 });

  // states
  const [_nodes, setNodes] = useState<NodeData[]>(nodes);
  const [_edges] = useState<EdgeData[]>(edges);
  // states -> Pan
  const [pan, setPan] = useState<Position>({ x: 0, y: 0 });
  const [panning, setPanning] = useState<boolean>(false);
  const [startPan, setStartPan] = useState<Position>({ x: 0, y: 0 });
  // states -> Zoom
  const [scale, setScale] = useState<number>(1);
  // states -> Drag
  const [draggedNode, setDraggedNode] = useState<string | null>(null);

  // methods
  const getNodeCenter = (id: number): Position | null => {
    const node = _arNodes.current[id];

    if (!node || !_arDiagram.current) return null;

    const arDiagramRect = _arDiagram.current.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();

    return {
      x: nodeRect.left - arDiagramRect.left + nodeRect.width / 2 - pan.x,
      y: nodeRect.top - arDiagramRect.top + nodeRect.height / 2 - pan.y,
    };
  };

  const renderEdges = useMemo(() => {
    return _edges.map((edge) => {
      const from = getNodeCenter(edge.from);
      const to = getNodeCenter(edge.to);

      if (!from || !to) return null;

      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const length = Math.sqrt(dx * dx + dy * dy);

      return (
        <div
          key={edge.id}
          style={{
            left: from.x / scale,
            top: from.y / scale,
            width: length / scale,
            transform: `rotate(${angle}deg)`,
            transformOrigin: "0 0",
          }}
        />
      );
    });
  }, [_nodes]);

  // methods -> Pan
  const onPanStart = (e: React.MouseEvent) => {
    setPanning(true);

    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const onPanMove = (e: React.MouseEvent) => {
    if (panning) {
      setPan({ x: e.clientX - startPan.x, y: e.clientY - startPan.y });
    }
  };

  const onPanEnd = () => setPanning(false);

  // methods -> Zoom
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();

    const zoomIntensity = 0.1;
    const direction = event.deltaY > 0 ? -1 : 1;

    const newScale = Math.max(0.1, scale + direction * zoomIntensity);

    // Mouse'un container içindeki konumunu al.
    const rect = _container.current!.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // İçerik düzleminde mouse'un bulunduğu noktayı bul.
    const zoomPointX = (mouseX - pan.x) / scale;
    const zoomPointY = (mouseY - pan.y) / scale;

    // Yeni pan değerini hesapla ki zoomPoint sabit kalsın.
    const newPanX = mouseX - zoomPointX * newScale;
    const newPanY = mouseY - zoomPointY * newScale;

    setScale(newScale);
    setPan({ x: newPanX, y: newPanY });
  };

  // methods -> Node
  const onNodeMouseDown = (event: React.MouseEvent, id: string, node: Position) => {
    event.stopPropagation();

    setDraggedNode(id);
    _dragStartMousePosition.current = { x: event.clientX, y: event.clientY };
    _dragStartNodePosition.current = { x: node.x, y: node.y };
  };

  const onMouseMove = (event: React.MouseEvent) => {
    if (draggedNode) {
      const deltaX = (event.clientX - _dragStartMousePosition.current.x) / scale;
      const deltaY = (event.clientY - _dragStartMousePosition.current.y) / scale;

      const newX = _dragStartNodePosition.current.x + deltaX;
      const newY = _dragStartNodePosition.current.y + deltaY;

      setNodes((prev) =>
        prev.map((node) => (node.id === draggedNode ? { ...node, position: { x: newX, y: newY } } : node))
      );
    }
  };

  const onMouseUp = () => setDraggedNode(null);

  return (
    <div
      ref={_arDiagram}
      className="ar-diagram"
      onMouseDown={onPanStart}
      onMouseMove={(event) => {
        onPanMove(event);
        onMouseMove(event);
      }}
      onMouseUp={() => {
        onMouseUp();
        onPanEnd();
      }}
    >
      <div
        ref={_container}
        className="content"
        style={{ backgroundPosition: `${pan.x}px ${pan.y}px` }}
        onWheel={handleWheel}
      >
        <div
          className="nodes-wrapper"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          }}
        >
          {/* Edges */}
          <div className="edges">{renderEdges}</div>

          {/* Nodes */}
          <div className="nodes">
            {_nodes.map((node) => (
              <div
                key={node.id}
                ref={(el) => (_arNodes.current[node.id] = el)}
                style={{
                  left: node.position.x,
                  top: node.position.y,
                }}
                onMouseDown={(event) => onNodeMouseDown(event, node.id, node.position)}
              >
                <span>{node.data.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

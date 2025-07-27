import React, { useRef, useState } from "react";
import "../../../assets/css/components/data-display/diagram/styles.css";
import IProps, { EdgeData, NodeData } from "./IProps";

type Position = { x: number; y: number };

export default function Diagram({ nodes, edges }: IProps) {
  // refs
  const _arDiagram = useRef<HTMLDivElement | null>(null);
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
  // states -> Drag
  const [draggedNode, setDraggedNode] = useState<string | null>(null);

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

  // methods -> Node
  const onNodeMouseDown = (event: React.MouseEvent, id: string, node: Position) => {
    event.stopPropagation();

    setDraggedNode(id);
    _dragStartMousePosition.current = { x: event.clientX, y: event.clientY };
    _dragStartNodePosition.current = { x: node.x, y: node.y };
  };

  const onMouseMove = (event: React.MouseEvent) => {
    if (draggedNode) {
      const arDigramRect = _arDiagram.current?.getBoundingClientRect();

      if (!arDigramRect) return;

      const deltaX = event.clientX - _dragStartMousePosition.current.x;
      const deltaY = event.clientY - _dragStartMousePosition.current.y;

      const newX = _dragStartNodePosition.current.x + deltaX;
      const newY = _dragStartNodePosition.current.y + deltaY;

      setNodes((prev) =>
        prev.map((node) => (node.id === draggedNode ? { ...node, position: { x: newX, y: newY } } : node))
      );
    }
  };

  const onMouseUp = () => setDraggedNode(null);

  const getNodeCenter = (id: number): Position | null => {
    const el = _arNodes.current[id];
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const wrapperRect = _arDiagram.current?.getBoundingClientRect();
    if (!wrapperRect) return null;
    return {
      x: rect.left - wrapperRect.left + rect.width / 2 - pan.x,
      y: rect.top - wrapperRect.top + rect.height / 2 - pan.y,
    };
  };

  const renderEdges = () => {
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
            left: from.x,
            top: from.y,
            width: length,
            transform: `rotate(${angle}deg)`,
            transformOrigin: "0 0",
          }}
        />
      );
    });
  };

  return (
    <div
      ref={_arDiagram}
      className="ar-diagram"
      onMouseDown={onPanStart}
      onMouseMove={(e) => {
        onPanMove(e);
        onMouseMove(e);
      }}
      onMouseUp={() => {
        onMouseUp();
        onPanEnd();
      }}
    >
      <div className="content" style={{ backgroundPosition: `${pan.x}px ${pan.y}px` }}>
        <div
          className="nodes-wrapper"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px)`,
          }}
        >
          {/* Edges */}
          <div className="edges">{renderEdges()}</div>

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

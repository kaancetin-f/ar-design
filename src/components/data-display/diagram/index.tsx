"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import IProps, { EdgeData, NodeData } from "./IProps";
import "../../../assets/css/components/data-display/diagram/styles.css";
import Utils from "../../../libs/infrastructure/shared/Utils";

type Position = { x: number; y: number };

const Diagram = ({ nodes, edges }: IProps) => {
  // refs
  const _arDiagramContent = useRef<HTMLDivElement>(null);
  const _arDiagramItems = useRef<(HTMLDivElement | null)[]>([]);
  // refs -> Node
  const _dragNodeIndex = useRef<number | null>(null);
  const _dragStartMousePosition = useRef<Position>({ x: 0, y: 0 });
  const _dragStartNodePosition = useRef<Position>({ x: 0, y: 0 });
  // refs -> Pan Scroll
  const _isPanning = useRef<boolean>(false);
  const _panStartMousePosition = useRef<Position>({ x: 0, y: 0 });
  const _panStartOffset = useRef<Position>({ x: 0, y: 0 });
  // refs -> Connect
  const _dragConnectIndex = useRef<number | null>(null);

  // states
  const [_nodes, setNodes] = useState<NodeData[]>(nodes);
  const [_edges, setEdges] = useState<EdgeData[]>(edges);
  const [edgeNodes, setEdgeNodes] = useState<(React.JSX.Element | null)[]>([]);
  const [panOffset, setPanOffset] = useState<Position>({ x: 0, y: 0 });

  // methods
  const handlePanScrollMouseDown = useCallback(
    (event: React.MouseEvent) => {
      _isPanning.current = true;
      _panStartMousePosition.current = { x: event.clientX, y: event.clientY };
      _panStartOffset.current = { ...panOffset };
    },
    [panOffset]
  );

  const handlePanScrollMouseMove = useCallback((event: React.MouseEvent) => {
    if (_dragNodeIndex.current !== null) return;
    if (!_isPanning.current) return;

    const dx = event.clientX - _panStartMousePosition.current.x;
    const dy = event.clientY - _panStartMousePosition.current.y;

    setPanOffset({
      x: _panStartOffset.current.x + dx,
      y: _panStartOffset.current.y + dy,
    });
  }, []);

  const handlePanMouseUp = useCallback(() => (_isPanning.current = false), []);

  const handleMouseDown = useCallback((event: React.MouseEvent, index: number, node: Position) => {
    _dragNodeIndex.current = index;
    _dragStartMousePosition.current = { x: event.clientX, y: event.clientY };
    _dragStartNodePosition.current = { x: node.x, y: node.y };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (_dragConnectIndex.current !== null) return;
    if (_dragNodeIndex.current === null) return;

    const deltaX = event.clientX - _dragStartMousePosition.current.x;
    const deltaY = event.clientY - _dragStartMousePosition.current.y;

    const newX = _dragStartNodePosition.current.x + deltaX;
    const newY = _dragStartNodePosition.current.y + deltaY;

    setNodes((prev) =>
      prev.map((node, index) => (index === _dragNodeIndex.current ? { ...node, position: { x: newX, y: newY } } : node))
    );
  };

  const handleMouseUp = useCallback(() => {
    _dragNodeIndex.current = null;
    _dragConnectIndex.current = null;

    if (_edges.length === 0) return;

    setNodes((prev) => [
      ...prev,
      {
        id: Utils.RandomCharacterGenerator(20),
        position: { x: _edges[_edges.length - 1].position.x2, y: _edges[_edges.length - 1].position.y2 },
        data: { label: "Test" },
      },
    ]);
  }, [, _edges]);

  // useEffects
  useEffect(() => {
    setEdgeNodes(
      _edges.map((edge, index) => {
        const { x1, y1, x2, y2 } = edge.position;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        return (
          <div
            key={index}
            className="line"
            style={{
              top: y1,
              left: x1,
              width: length,
              transform: `rotate(${angle}deg)`,
            }}
          ></div>
        );
      })
    );
  }, [_nodes, _edges]);

  return (
    <div className="ar-diagram">
      <div
        ref={_arDiagramContent}
        className="content"
        style={{ backgroundPosition: `${panOffset.x}px ${panOffset.y}px` }}
        onMouseDown={handlePanScrollMouseDown}
        onMouseMove={(event) => {
          handlePanScrollMouseMove(event);
          handleMouseMove(event);

          if (_dragConnectIndex.current !== null) {
            const rect = _arDiagramContent.current?.getBoundingClientRect();
            const x = event.clientX - (rect?.left || 0);
            const y = event.clientY - (rect?.top || 0);

            const fromIndex = _dragConnectIndex.current;
            const connectElement = _arDiagramItems.current[fromIndex]?.querySelector(".connect-top") as HTMLDivElement;
            const connectRect = connectElement?.getBoundingClientRect();

            const x1 = connectRect.left - (rect?.left || 0) + connectRect.width / 2;
            const y1 = connectRect.top - (rect?.top || 0) + connectRect.height / 2;

            setEdges((prev) =>
              prev.map((edge, i) => {
                if (i === prev.length - 1) {
                  return {
                    ...edge,
                    position: { x1, y1, x2: x, y2: y },
                  };
                }
                return edge;
              })
            );
          }

          if (_dragNodeIndex.current !== null) {
            const rect = _arDiagramContent.current?.getBoundingClientRect();

            const fromIndex = _dragNodeIndex.current;
            const connectElement = _arDiagramItems.current[fromIndex]?.querySelector(".connect-top") as HTMLDivElement;
            const connectRect = connectElement?.getBoundingClientRect();

            const x1 = connectRect.left - (rect?.left || 0) + connectRect.width / 2;
            const y1 = connectRect.top - (rect?.top || 0) + connectRect.height / 2;

            setEdges((prev) =>
              prev.map((edge) => {
                return {
                  ...edge,
                  position: { x1, y1, x2: edge.position.x2, y2: edge.position.y2 },
                };
              })
            );
          }
        }}
        onMouseUp={() => {
          handlePanMouseUp();
          handleMouseUp();
        }}
      >
        <div
          className="nodes-wrapper"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
          }}
        >
          {/* Edges */}
          <div className="edges">{edgeNodes}</div>

          {/* Nodes */}
          <div className="nodes">
            {_nodes.map((node, index) => (
              <div
                key={index}
                ref={(element) => {
                  _arDiagramItems.current[index] = element;
                }}
                className="item"
                onMouseDown={(event) => handleMouseDown(event, index, node.position)}
                style={{
                  top: node.position.y,
                  left: node.position.x,
                }}
              >
                <div
                  className="connect-top"
                  onMouseDown={(event) => {
                    _dragConnectIndex.current = index;

                    const rect = _arDiagramContent.current?.getBoundingClientRect();
                    const x = event.clientX - (rect?.left || 0);
                    const y = event.clientY - (rect?.top || 0);

                    setEdges((prev) => {
                      return [
                        ...prev,
                        {
                          id: Utils.RandomCharacterGenerator(20),
                          from: index,
                          position: { x1: x, y1: y, x2: x, y2: y },
                        },
                      ];
                    });
                  }}
                ></div>
                <div className="connect-bottom"></div>

                <span>{node.data.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagram;

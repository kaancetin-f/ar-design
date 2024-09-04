"use client";

import React, { useEffect, useRef, useState } from "react";
import Parser from "./classes/Parser";
import Compiler from "./classes/Compiler";
import "../../assest/css/syntax-highlighter/syntax-highlighter.css";
import Button from "../form/button";

const SyntaxHighlighter: React.FC<{
  children: React.ReactNode;
  position?: "left" | "center" | "right";
}> = ({ children, position = "left" }) => {
  // refs
  const _div = useRef<HTMLDivElement>(null);
  const _code = useRef<HTMLElement>(null);

  // states
  const [elements, setElements] = useState<string[]>([]);
  const [codePanelIsOpen, setCodePanelIsOpen] = useState<boolean>(false);

  // classes
  const parser = new Parser(setElements);
  const compiler = new Compiler(_code);

  // useEffects
  useEffect(() => {
    // Clear...
    setElements([]);
    if (_code.current) _code.current.innerHTML = "";

    // Fill...
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) parser.JsxToString(child);
    });
  }, [children]);

  useEffect(() => {
    if (elements.length === 0) return;

    compiler.Jsx(elements);
  }, [elements]);

  useEffect(() => {}, [codePanelIsOpen]);

  return (
    <React.Fragment>
      <div className="ar-syntax">
        <div ref={_div} className={`preview ${position}`}>
          {children}
        </div>

        <div className="ar-syntax-button-group">
          <Button
            variant="outlined"
            color="dark"
            border={{
              style: "solid",
            }}
            size="small"
            onClick={() => setCodePanelIsOpen((x) => !x)}
          >
            {codePanelIsOpen ? "Close Code" : "Open Code"}
          </Button>
        </div>

        <pre className={`pre ${!codePanelIsOpen ? "hidden" : "visible"}`}>
          <code ref={_code}></code>
        </pre>
      </div>
    </React.Fragment>
  );
};

export default SyntaxHighlighter;

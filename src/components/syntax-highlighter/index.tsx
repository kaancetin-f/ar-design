import React, { useEffect, useRef, useState } from "react";
import "../../libs/styles/syntax-highlighter/syntax-highlighter.css";
import Parser from "./classes/Parser";
import Compiler from "./classes/Compiler";

const SyntaxHighlighter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // refs
  const _div = useRef<HTMLDivElement>(null);
  const _code = useRef<HTMLElement>(null);

  // states
  const [elements, setElements] = useState<string[]>([]);

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

  return (
    <React.Fragment>
      <div className="ar-syntax">
        <div ref={_div} className="preview">
          {children}
        </div>
        <pre className="pre">
          <code ref={_code}></code>
        </pre>
      </div>
    </React.Fragment>
  );
};

export default SyntaxHighlighter;

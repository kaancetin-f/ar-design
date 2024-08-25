import React, { useEffect, useRef, useState } from "react";
import "../../libs/styles/syntax-highlighter/syntax-highlighter.css";
import Parser from "./classes/Parser";
import Replacer from "./classes/Replacer";

const SyntaxHighlighter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // refs
  const _div = useRef<HTMLDivElement>(null);
  const _code = useRef<HTMLElement>(null);

  // states
  const [elements, setElements] = useState<string[]>([]);

  // classes
  const parser = new Parser(setElements);
  const replacer = new Replacer(_code);

  // useEffects
  useEffect(() => {
    // Clear...
    setElements([]);

    // Fill...
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) parser.JsxToString(child);
    });
  }, [children]);

  useEffect(() => {
    if (elements.length === 0) return;

    replacer.Jsx(elements);
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

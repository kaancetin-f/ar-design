import React, { useEffect, useRef, useState } from "react";
import "../../libs/styles/syntax-highlighter/syntax-highlighter.css";

const SyntaxHighlighter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // refs
  const _code = useRef<HTMLElement>(null);

  // states
  const [elements, setElements] = useState<string[]>([]);

  // useEffects
  useEffect(() => {
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        let _Component = typeof child.type === "function" ? child.type["name"] : child.type;

        const attributes = Object.keys(child.props)
          .filter((key) => key !== "children") // children özniteliğini dahil etmiyoruz
          .map((key) => `${key}="${child.props[key]}"`) // key="value" formatında stringler oluşturuyoruz
          .join(" ");

        setElements((elements) => [...elements, `<${_Component} ${attributes}>${child.props["children"]}</${_Component}>`]);
      }
    });
  }, [children]);

  useEffect(() => {
    if (elements.length === 0) return;

    elements.forEach((element) => {
      element = element.replace(/<(.*?)>/g, `<span class="ar-tag">&lt;$1&gt;</span>`);

      element = element.replace(/(\w+)=["'](.*?)["']/g, function (match, p1, p2) {
        if (!match.includes("ar-")) {
          return `<span class="ar-attribute">${p1}</span><span class="ar-equal">=</span><span class="ar-string">&quot;${p2}&quot;</span>`;
        }

        return match; // Aksi takdirde olduğu gibi bırak
      });

      if (_code.current) _code.current.innerHTML += `<span class="ar-language">${element}</span><br />`;
    });
  }, [elements]);

  return (
    <pre>
      <code ref={_code}></code>
    </pre>
  );
};

export default SyntaxHighlighter;

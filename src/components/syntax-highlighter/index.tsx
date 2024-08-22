import React, { useEffect, useRef, useState } from "react";
import "../../libs/styles/syntax-highlighter/syntax-highlighter.css";

const SyntaxHighlighter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // refs
  const _div = useRef<HTMLDivElement>(null);
  const _code = useRef<HTMLElement>(null);

  // tag methods
  const container = (element: string) => `<span class="ar-language">${element}</span>\n\n`;
  const attribute = (value: string) => `<span class="ar-attribute">${value}</span>`;
  const string = (value: string) => `<span class="ar-string">&quot;${value}&quot;</span>`;
  const entries = (value: string) => `<span class="ar-entries">${value}</span>`;
  // tag refs
  const equal = '<span class="ar-equal">=</span>';
  // const _colon = '<span class="ar-colon">:</span>';
  const oCurlyBracket = '<span class="ar-curly-brackets">{</span>';
  const oCurlyBrackets = '<span class="ar-curly-brackets">{{</span>';
  const cCurlyBracket = '<span class="ar-curly-brackets">}</span>';
  const cCurlyBrackets = '<span class="ar-curly-brackets">}}</span>';

  // states
  const [elements, setElements] = useState<string[]>([]);

  const handleEntries = (propValue: any): string | number => {
    if (propValue && typeof propValue === "object") {
      return `{${Object.entries(propValue)
        .map(([key, value]) => `${key}: ${handleEntries(value)}`)
        .join(", ")}}`;
    }

    return typeof propValue === "number" ? propValue : `"${propValue}"`;
  };

  // useEffects
  useEffect(() => {
    // Clear...
    setElements([]);

    // Fill...
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        const componentType = typeof child.type === "function" ? child.type.name : child.type;

        // `br` elementi geldiğinde render işleminden çıkılır.
        if (componentType === "br") return;

        const attributesKeys = Object.keys(child.props).filter((key) => key !== "children");
        const attributes = attributesKeys
          .map((key) => {
            const propValue = child.props[key];
            let result = "";

            switch (typeof propValue) {
              case "number":
                result = `${key}=${propValue}`;
                break;
              case "string":
                result = `${key}="${propValue}"`;
                break;
              case "boolean":
                result = `${key}={${propValue}}`;
                break;
              case "object":
                const entries = Object.entries(propValue)
                  .map(([key, value]) => `${key}: ${handleEntries(value)}`)
                  .join(", ");

                result = `${key}=+ ${entries} +`;
                break;
              case "function":
                result = `${key}={${propValue}}`;
                break;
              default:
                break;
            }

            return result;
          })
          .join(" ");

        const formattedAttributes = attributes ? ` ${attributes}` : "";
        const lineBreak = attributesKeys.length >= 3 ? "\n" : "";
        const childrenContent = attributesKeys.length >= 3 ? `   ${child.props.children}` : child.props.children;

        const renderElement = child.props.children
          ? `<${componentType}${formattedAttributes}>${lineBreak}${childrenContent}${lineBreak}</${componentType}>`
          : `<${componentType}${formattedAttributes} />`;

        setElements((prevElements) => [...prevElements, renderElement]);
      }
    });
  }, [children]);

  useEffect(() => {
    if (elements.length === 0) return;
    if (_code.current) _code.current.innerHTML = ""; // Clear...

    elements.forEach((element) => {
      element = element.replace(/<(.*?)>/g, (match, tagContent: string) => {
        const equalsMatches = match.match(/=/g);
        const lineBreak = equalsMatches && equalsMatches.length >= 3 ? `\n  ` : "";

        // tagContent = tagContent.replace(/(\b[A-Z][a-z]*\b)/g, (attr, p1) => {
        //   return customAttribute(p1);
        // });

        tagContent = tagContent.replace(/([\w-]+)=\s*["']([^"']*)["']/g, (_, p1, p2) => {
          return `${lineBreak}${attribute(p1)}${equal}${string(p2)}`;
        });

        tagContent = tagContent.replace(/(\w+)=\s*{(.*?)}/g, (_, p1, p2) => {
          return `${lineBreak}${attribute(p1)}${equal}${oCurlyBracket}${entries(p2)}${cCurlyBracket}`;
        });

        tagContent = tagContent.replace(/(\w+)=\s*[+](.*?)[+]/g, (_, p1, p2) => {
          return `${lineBreak}${attribute(p1)}${equal}${oCurlyBrackets}${entries(p2)}${cCurlyBrackets}`;
        });

        return !match.toLowerCase().includes("ar-")
          ? `<span class="ar-tag-container"><span class="ar-tag-lt">&lt;</span><span class="ar-tag">${tagContent}</span><span class="ar-tag-gt">&gt;</span></span>`
          : match;
      });

      if (_code.current) _code.current.innerHTML += container(element);
    });
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

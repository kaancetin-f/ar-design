import React, { useEffect, useRef, useState } from "react";
import "../../libs/styles/syntax-highlighter/syntax-highlighter.css";

const SyntaxHighlighter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // refs
  const _div = useRef<HTMLDivElement>(null);
  const _code = useRef<HTMLElement>(null);
  let _lineBreakSpaces = useRef<number>(4).current;

  // states
  const [elements, setElements] = useState<string[]>([]);

  // methods
  const handleEntries = (propValue: any): string | number => {
    if (propValue && typeof propValue === "object") {
      return `[curly-bracket<] ${Object.entries(propValue)
        .map(
          ([key, value]) =>
            `[attribute-key]${key}[/attribute-key][colon]:[/colon] ${handleEntries(value)}`
        )
        .join(", ")} [curly-bracket>]`;
    }

    return typeof propValue === "number"
      ? `[number]${propValue}[/number]`
      : `[string]${propValue}[/string]`;
  };

  const handleComponentToString = (
    child:
      | React.ReactPortal
      | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>,
    subChilde: boolean = false,
    indentLevel: number = 0
  ): string | undefined => {
    if (!child) return;

    const componentType = typeof child.type === "function" ? child.type.name : child.type;
    let componentContent = child.props.children;
    // İndent seviyesi için boşlukları ekle.
    const indent = "  ".repeat(indentLevel);

    // Eğer `br` elementi ise işlemi sonlandır
    if (componentType === "br") return;

    const formatAttributeValue = (key: string, value: any): string => {
      let result: string = "";

      switch (typeof value) {
        case "number":
          result = `[number]${value}[/number]`;
          break;
        case "string":
          result = `[string]${value}[/string]`;
          break;
        case "boolean":
          result = `[boolean]${value}[/boolean]`;
          break;
        case "object":
          const entries = Object.entries(value)
            .map(
              ([subKey, subValue]) =>
                `[attribute-key]${subKey}[/attribute-key][colon]:[/colon] ${handleEntries(
                  subValue
                )}`
            )
            .join(", ");

          result = `[object]${entries}[/object]`;
          break;
        case "function":
          result = `[function][/function]`;
          break;
        default:
          return "";
      }

      return `[attribute-key]${key}[/attribute-key][equal]=[/equal]${result}`;
    };

    const attributes = Object.keys(child.props).filter((key) => key !== "children");
    const attributesLength = attributes.length;
    const attributesList = attributes
      .map((key) => formatAttributeValue(key, child.props[key]))
      .join(" ");

    const formattedTag =
      componentType[0].toUpperCase() === componentType[0]
        ? `[react-tag]${componentType}[/react-tag]`
        : componentType;
    const formattedAttributes =
      attributesLength > 0 ? ` [attributes]${attributesList}[/attributes]` : "";

    // Eğer gelen iç eleman bir nesneyse yeniden yapılan.
    if (React.isValidElement(componentContent)) {
      // İç içe tek bir çocuk eleman varsa recursive olarak işlemeye devam et
      componentContent = `\n${handleComponentToString(componentContent, true, indentLevel + 1)}\n`;
    } else if (Array.isArray(componentContent)) {
      // Eğer birden fazla çocuk varsa hepsini işle
      componentContent = componentContent
        .map((contentChild) => handleComponentToString(contentChild, true))
        .join(`\n${indent}`);
    } else if (typeof componentContent === "string") {
      // Eğer metin içeriği varsa, trimle
      componentContent = componentContent.trim();
    }

    componentContent =
      attributesLength >= _lineBreakSpaces ? `\n   ${componentContent}\n` : componentContent;
    const renderElement = componentContent
      ? `${indent}[open]&lt;[/open][tag]${formattedTag}[/tag]${formattedAttributes}[close]>[/close]${componentContent}${indent}[open]&lt;/[/open][tag]${formattedTag}[/tag][close]>[/close]`
      : `${indent}[open]&lt;[/open][tag]${formattedTag}[/tag]${formattedAttributes} [close]/&gt;[/close]`;

    !subChilde && setElements((prevElements) => [...prevElements, renderElement]);

    return renderElement;
  };

  // useEffects
  useEffect(() => {
    // Clear...
    setElements([]);

    // Fill...
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) handleComponentToString(child);
    });
  }, [children]);

  useEffect(() => {
    if (elements.length === 0) return;
    if (_code.current) _code.current.innerHTML = ""; // Clear...

    elements.forEach((element) => {
      // Open Tag
      element = element.replace(
        /\[open\](.*?)\[\/open\]|\[close-slash\](.*?)\[\/close-slash\]/g,
        (_, p1, p2) => {
          return `<span>${p1 ?? p2}</span>`;
        }
      );

      // Close Tag
      element = element.replace(/\[close\](.*?)\[\/close\]/g, (_, p1) => {
        return `<span>${p1}</span>`;
      });

      // Tags
      element = element.replace(/\[tag\](.*?)\[\/tag\]/g, (_, p1) => {
        return `<span class="ar-tag">${p1}</span>`;
      });

      element = element.replace(/\[react-tag\](.*?)\[\/react-tag\]/g, (_, p1) => {
        return `<span class="ar-custom-tag">${p1}</span>`;
      });

      // Attributes
      element = element.replace(/\[attributes\](.*?)\[\/attributes\]/g, (_, p1) => {
        return `<span class="ar-attributes">${p1}</span>`;
      });

      // Attributes Key
      element = element.replace(/\[attribute-key\](.*?)\[\/attribute-key\]/g, (_, p1) => {
        return `<span class="ar-attribute-key">${p1}</span>`;
      });

      element = element.replace(/\[equal\](.*?)\[\/equal\]/g, (_, p1) => {
        return `<span>${p1}</span>`;
      });

      element = element.replace(/\[colon\](.*?)\[\/colon\]/g, (_, p1) => {
        return `<span>${p1}</span>`;
      });

      // Attributes Values
      element = element.replace(/\[string\](.*?)\[\/string\]/g, (_, p1) => {
        return `<span class="ar-string-value">"${p1}"</span>`;
      });
      element = element.replace(/\[number\](.*?)\[\/number\]/g, (_, p1) => {
        return `<span class="ar-number-value">${p1}</span>`;
      });

      element = element.replace(/\[boolean\](.*?)\[\/boolean\]/g, (_, p1) => {
        return `<span class="ar-boolean-value"><span>{</span>${p1}<span>}</span></span>`;
      });

      element = element.replace(/\[object\](.*?)\[\/object\]/g, (_, p1) => {
        return `<span class="ar-object-value"><span>{{</span> ${p1} <span>}}</span></span>`;
      });

      element = element.replace(/\[curly-bracket<\]/g, "<span class='ar-curly-bracket'>{</span>");
      element = element.replace(/\[curly-bracket>\]/g, "<span class='ar-curly-bracket'>}</span>");

      if (_code.current) _code.current.innerHTML += `<span class="ar-language">${element}</span>`;
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

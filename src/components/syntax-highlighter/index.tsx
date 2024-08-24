import React, { useEffect, useRef, useState } from "react";
import "../../libs/styles/syntax-highlighter/syntax-highlighter.css";

const SyntaxHighlighter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // refs
  const _div = useRef<HTMLDivElement>(null);
  const _code = useRef<HTMLElement>(null);

  const container = (element: string) => `<span class="ar-language">${element}</span>`;
  // tag variable/s
  // const lineBreakSpaces = 6;

  // states
  const [elements, setElements] = useState<string[]>([]);

  // methods
  const handleEntries = (propValue: any): string | number => {
    if (propValue && typeof propValue === "object") {
      return `{${Object.entries(propValue)
        .map(
          ([key, value]) =>
            `[attribute-key]${key}[/attribute-key]: [object]${handleEntries(value)}[/object]`
        )
        .join(", ")}}`;
    }

    return typeof propValue === "number"
      ? `[number]${propValue}[/number]`
      : `[string]${propValue}[/string]`;
  };

  const handleComponentToString = (
    child:
      | React.ReactPortal
      | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>,
    subChilde: boolean = false
  ): string | undefined => {
    if (!child) return;

    const componentType = typeof child.type === "function" ? child.type.name : child.type;

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
                `[attribute-key]${subKey}[/attribute-key]: ${handleEntries(subValue)}`
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

    const attributes = Object.keys(child.props)
      .filter((key) => key !== "children")
      .map((key) => formatAttributeValue(key, child.props[key]))
      .join(" ");

    const formattedTag =
      componentType[0].toUpperCase() === componentType[0]
        ? `[react-tag]${componentType}[/react-tag]`
        : componentType;
    const formattedAttributes = attributes ? ` [attributes]${attributes}[/attributes]` : "";

    let childrenContent = child.props.children;
    // if (React.isValidElement(childrenContent)) {
    //   childrenContent = `${handleComponentToString(child.props.children, true)}`;
    // }

    const renderElement = childrenContent
      ? `[open]<[/open][tag]${formattedTag}[/tag]${formattedAttributes}[close]>[/close]${childrenContent}[open]<[/open][close-slash]/[/close-slash][tag]${formattedTag}[/tag][close]>[/close]`
      : `[open]<[/open][tag]${formattedTag}[/tag]${formattedAttributes} [close]/>[/close]`;

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

      // Attributes Values
      element = element.replace(/\[string\](.*?)\[\/string\]/g, (_, p1) => {
        return `<span class="ar-string-value">"${p1}"</span>`;
      });

      element = element.replace(/\[boolean\](.*?)\[\/boolean\]/g, (_, p1) => {
        return `<span class="ar-boolean-value"><span>{</span> ${p1} <span>}</span></span>`;
      });

      element = element.replace(/\[object\](.*?)\[\/object\]/g, (_, p1) => {
        return `<span class="ar-object-value"><span>{{</span> ${p1} <span>}}</span></span>`;
      });

      if (_code.current) _code.current.innerHTML += container(element);
    });

    // elements.forEach((element) => {
    //   element = element.replace(/<(.*?)>/g, (match, tagContent: string) => {
    //     const equalsMatches = match.match(/=/g);
    //     const lineBreak =
    //       equalsMatches && equalsMatches.length >= lineBreakSpaces
    //         ? `\n  `
    //         : "";
    //     // Attr için özel yazıldı.
    //     const lineBreakAttributes =
    //       equalsMatches && equalsMatches.length >= lineBreakSpaces ? `\n` : "";
    //     // Bu kısım nesnelerin girintileri ve alt satıra kaydırma işlemleri için özel yazılmıştır.
    //     const lineBreakChildStart =
    //       equalsMatches && equalsMatches.length >= lineBreakSpaces
    //         ? `\n    `
    //         : "";
    //     const lineBreakChildEnd =
    //       equalsMatches && equalsMatches.length >= lineBreakSpaces
    //         ? `\n  `
    //         : "";

    //     // tagContent = tagContent.replace(/\[tag\](.*?)\[\/tag\]/g, (_, p1) => {
    //     //   return `<span class="ar-custom-tag">${p1}</span>`;
    //     // });

    //     // tagContent = tagContent.replace(/\[attributes\](.*?)\[\/attributes\]/g, (_, p1) => {
    //     //   return `${p1}${lineBreakAttributes}`;
    //     // });

    //     // tagContent = tagContent.replace(/\[tag-slash\](.*?)\[\/tag-slash\]/g, (_, p1) => {
    //     //   return `<span class="ar-custom-tag-slash">${p1}</span>`;
    //     // });

    //     // tagContent = tagContent.replace(/(\w+)=\s*\[number\](.*?)\[\/number\]/g, (_, p1, p2) => {
    //     //   return `${lineBreak}${attribute(p1)}${equal}${oCurlyBracket}${entries(p2)}${cCurlyBracket}`;
    //     // });

    //     // tagContent = tagContent.replace(/([\w-]+)=\s*\[string\](.*?)\[\/string\]/g, (_, p1, p2) => {
    //     //   return `${lineBreak}${attribute(p1)}${equal}${string(p2)}`;
    //     // });

    //     // tagContent = tagContent.replace(/(\w+)=\s*{(.*?)}/g, (_, p1, p2) => {
    //     //   return `${lineBreak}${attribute(p1)}${equal}${oCurlyBracket}${entries(p2)}${cCurlyBracket}`;
    //     // });

    //     // tagContent = tagContent.replace(/(\w+)=\s*\[boolean\](.*?)\[\/boolean\]/g, (_, p1, p2) => {
    //     //   return `${lineBreak}${attribute(p1)}${equal}${oCurlyBracket}${entries(p2)}${cCurlyBracket}`;
    //     // });

    //     // tagContent = tagContent.replace(/(\w+)=\s*\[object\](.*?)\[\/object\]/g, (_, p1, p2) => {
    //     //   p2 = p2.replace(/(\w+):\s*\[child-string\](.*?)\[\/child-string\]/g, (_: string, p1: string, p2: string) => {
    //     //     return `${lineBreakChildStart}${attribute(p1)}${colon} ${string(p2)}`;
    //     //   });

    //     //   p2 = p2.replace(/(\w+):\s*\[child-object\](.*?)\[\/child-object\]/g, (_: string, p1: string, p2: string) => {
    //     //     return `${attribute(p1)}${colon} ${entries(p2)}`;
    //     //   });

    //     //   return `${lineBreak}${attribute(p1)}${equal}${oCurlyBrackets}${entries(p2)}${lineBreakChildEnd}${cCurlyBrackets}`;
    //     // });

    //     // tagContent = tagContent.replace(/(\w+)=\s*\[function\](.*?)\[\/function\]/g, (_, p1, p2) => {
    //     //   return `${lineBreak}${attribute(p1)}${equal}${oCurlyBracket}()=>{${p2}}${cCurlyBracket}`;
    //     // });

    //     return !match.toLowerCase().includes("ar-")
    //       ? `<span class="ar-tag-container"><span class="ar-tag-lt"><</span><span class="ar-tag">${tagContent}</span><span class="ar-tag-gt">></span></span>`
    //       : match;
    //   });

    //   if (_code.current) _code.current.innerHTML += container(element);
    // });
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

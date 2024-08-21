import React, { useEffect, useRef, useState } from "react";
import "../../libs/styles/syntax-highlighter/syntax-highlighter.css";

const SyntaxHighlighter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // refs
  const _div = useRef<HTMLDivElement>(null);
  const _code = useRef<HTMLElement>(null);

  // tag methods
  const container = (element: string) => `<span class="ar-language">${element}</span>\n`;
  const attribute = (value: string) => `<span class="ar-attribute">${value}</span>`;
  const string = (value: string) => `<span class="ar-string">&quot;${value}&quot;</span>`;
  const entries = (value: string) => `<span class="ar-entries">${value}</span>`;
  // tag refs
  const _equal = '<span class="ar-equal">=</span>';
  const _colon = '<span class="ar-colon">:</span>';
  const _openCurlyBracket = '<span class="ar-curly-brackets">{</span>';
  const _openCurlyBrackets = '<span class="ar-curly-brackets">{{</span>';
  const _closeCurlyBracket = '<span class="ar-curly-brackets">}</span>';
  const _closeCurlyBrackets = '<span class="ar-curly-brackets">}}</span>';

  // states
  const [elements, setElements] = useState<string[]>([]);

  // useEffects
  useEffect(() => {
    // Clear...
    setElements([]);

    // Fill...
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        const _Component = typeof child.type === "function" ? child.type["name"] : child.type;

        // BR gelmesi durumunda yazdırma işlemini iptal eder.
        if (_Component === "br") return;

        const attributesKeys = Object.keys(child.props).filter((key) => key !== "children");
        const attributes = attributesKeys
          .map((key) => {
            let result: string = "";

            if (typeof child.props[key] === "string") {
              result = `${key}="${child.props[key]}"`;
            }

            if (typeof child.props[key] === "boolean") {
              result = `${key}={${child.props[key]}}`;
            }

            if (typeof child.props[key] === "object") {
              const entries = Object.entries(child.props[key])
                .map(([propKey, propValue]) => `${propKey}:"${propValue}"`)
                .join(", ");

              result = `${key}={${entries}}`;
            }

            return result;
          })
          .join(" ");

        const _attributes = attributesKeys.length > 0 ? ` ${attributes}` : attributes;
        const _br = attributesKeys.length >= 3 ? "\n" : "";
        const _children = attributesKeys.length >= 3 ? `\t${child.props["children"]}` : child.props["children"];

        const render = child.props["children"]
          ? `<${_Component}${_attributes}>${_br}${_children}${_br}</${_Component}>`
          : `<${_Component}${_attributes}/>`;

        setElements((elements) => [...elements, render]);
      }
    });
  }, [children]);

  useEffect(() => {
    if (elements.length === 0) return;
    if (_code.current) _code.current.innerHTML = ""; // Clear...

    elements.forEach((element) => {
      // "<" ve ">" arasında ki bütün değerleri alır ve değiştirir.
      element = element.replace(/<(.*?)>/g, function (match, tagContent: string) {
        if (!match.includes("ar-")) {
          /**
           * Bu regex ifadesi, HTML veya XML etiket içeriğinde yer alan  `anahtar="değer"`
           * şeklindeki öznitelikleri bulur ve `attribute(anahtar) + _equal + string(değer)` şeklinde yeniden biçimlendirir.
           * Ancak, "ar-" ile başlayan öznitelikler bu işleme dahil edilmez ve olduğu gibi bırakılır.
           */
          tagContent = tagContent.replace(/(\w+)=["'](.*?)["']/g, function (_match: string, p1: string, p2: string) {
            if (!_match.includes("ar-")) return `${attribute(p1)}${_equal}${string(p2)}`;

            return _match;
          });

          /**
           * Bu regex ifadesi, `anahtar={{değer}}` şeklindeki öznitelikleri bulur ve öznitelik içindeki `anahtar: "değer"` şeklindeki alt öznitelikleri işleyerek
           * `attribute(anahtar) + _equal + {{entries(değer)}}` şeklinde yeniden biçimlendirir.
           * Alt özniteliklerde "ar-" ile başlayanları değiştirmeden bırakır.
           * Dış öznitelikler ise "ar-" ile başlamıyorsa yeniden biçimlendirilir, aksi takdirde olduğu gibi bırakılır.
           */
          tagContent = tagContent.replace(/(\w+)=[{](.*?)[}]/g, function (match, p1: string, p2: string) {
            if (!match.includes("ar-")) {
              p2 = p2.replace(/(\w+):["'](.*?)["']/g, function (_match: string, _p1: string, _p2: string) {
                if (!_match.includes("ar-")) {
                  return `${attribute(_p1)}${_colon}${string(_p2)}`;
                }

                return _match;
              });

              return p2.includes(":")
                ? `${attribute(p1)}${_equal}${_openCurlyBrackets}${entries(p2)}${_closeCurlyBrackets}`
                : `${attribute(p1)}${_equal}${_openCurlyBracket}${entries(p2)}${_closeCurlyBracket}`;
            }

            return match;
          });

          return `<span class="ar-tag-container">&lt;<span class="ar-tag">${tagContent}</span>&gt;</span>`;
        }

        return match;
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

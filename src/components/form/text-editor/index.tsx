"use client";

import Utils from "../../../libs/infrastructure/shared/Utils";
import React, { useEffect, useRef, useState } from "react";
import IProps from "./IProps";
import Button from "../button";
import { Icons } from "../../../libs/types";
import { ARIcon } from "../../icons";
import "../../../assets/css/components/form/text-editor/styles.css";

const TextEditor: React.FC<IProps> = ({ name, value, onChange, placeholder, height, validation }) => {
  // refs
  const _container = useRef<HTMLDivElement>(null);
  const _arIframe = useRef<HTMLIFrameElement>(null);

  // states
  const [iframe, setIframe] = useState<HTMLIFrameElement | null>(null);
  const [iframeDocument, setIframeDocument] = useState<Document | undefined>(undefined);

  // variables
  const toolbarButtons: { command: string; icon: Icons; tooltip: string }[] = [
    { command: "bold", icon: "Bold", tooltip: `Bold (${Utils.GetOSShortCutIcons()} + B)` },
    { command: "italic", icon: "Italic", tooltip: `Bold (${Utils.GetOSShortCutIcons()} + I)` },
    { command: "underline", icon: "Underline", tooltip: `Bold (${Utils.GetOSShortCutIcons()} + U)` },
    { command: "insertUnorderedList", icon: "BulletList", tooltip: "Bulleted List" },
    { command: "insertOrderedList", icon: "NumberList", tooltip: "Numbered List" },
    { command: "justifyLeft", icon: "TextAlingLeft", tooltip: "Align Left" },
    { command: "justifyCenter", icon: "TextAlingCenter", tooltip: "Align Center" },
    { command: "justifyRight", icon: "TextAlingRight", tooltip: "Align Right" },
  ];
  const _iframeClassName: string[] = [];
  _iframeClassName.push(
    ...Utils.GetClassName(
      "outlined",
      !Utils.IsNullOrEmpty(validation?.text) ? "danger" : "light",
      { radius: "sm" },
      undefined,
      undefined,
      undefined
    )
  );

  // methods
  const execCommand = (command: string) => {
    if (!_arIframe.current) return;

    const iframeDoc = _arIframe.current.contentDocument || _arIframe.current.contentWindow?.document;
    if (iframeDoc) iframeDoc.execCommand(command, true, undefined);
  };

  const handleFocus = () => _arIframe.current?.classList.add("focused");

  const handleBlur = () => _arIframe.current?.classList.remove("focused");

  const handleMouseDown = () => {
    // Resizebar a tıklandığında iframe içerisinde bulunan window'un event listenerı olmadığı için orada resize çalışmayacaktır.
    // Bu yüzden önüne bir duvar örüyoruz ve mevcut sayfanın window'unda işlem yapmaya devam ediyor.
    const resizeItem = document.createElement("div");
    resizeItem.classList.add("ar-text-editor--block-item");
    _container.current?.appendChild(resizeItem);

    window.addEventListener("mousemove", handleResize);

    window.addEventListener("mouseup", () => {
      resizeItem.remove();
      window.removeEventListener("mousemove", handleResize);
    });
  };

  const handleResize = (event: MouseEvent) => {
    if (_arIframe.current) {
      const rect = _arIframe.current.getBoundingClientRect();
      const height = (rect.height += event.movementY);

      _arIframe.current.style.height = `${height}px`;
    }
  };

  // useEffects
  useEffect(() => {
    // Iframe Document yüklendikten sonra çalışacaktır.

    if (!iframeDocument) return;

    const selection = iframeDocument.getSelection();
    let range: Range | null = null;

    // Eğer bir seçim (caret) varsa, konumunu kaydet
    if (selection && selection.rangeCount > 0) range = selection.getRangeAt(0);

    // Eğer içeriği kendimiz değiştirmedikse ve gelen value farklıysa, içeriği güncelle
    if (iframeDocument.body.innerHTML !== value) iframeDocument.body.innerHTML = value || `<p>${placeholder ?? ""}</p>`;

    // Cursor (caret) konumunu geri yükle
    if (range) {
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [value, iframeDocument]);

  useEffect(() => {
    // Iframe yüklendikten sonra çalışacaktır.

    if (!iframe) return;

    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDocument) return; // 👈 Güvenlik önlemi

    // Herhangi bir değişikliği izlemek için MutationObserver kullan
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach(() => {
        iframeDocument?.body.innerHTML === "<br>" ? onChange(undefined) : onChange(iframeDocument.body.innerHTML);
      });
    });

    setIframeDocument(iframeDocument);
    iframeDocument.designMode = "on";

    // Observer'ı body üzerinde başlat
    observer.observe(iframeDocument.body, { childList: true, subtree: true, characterData: true, attributes: true });

    iframeDocument.body.addEventListener("focus", handleFocus);
    iframeDocument.body.addEventListener("blur", handleBlur);

    return () => {
      observer.disconnect();

      iframeDocument?.body.removeEventListener("focus", handleFocus);
      iframeDocument?.body.removeEventListener("blur", handleBlur);
    };
  }, [iframe]);

  useEffect(() => {
    if (!_arIframe.current) return;

    setIframe(_arIframe.current);

    return () => {
      if (iframeDocument) {
        iframeDocument.body.removeEventListener("focus", handleFocus);
        iframeDocument.body.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  return (
    <div ref={_container} className="ar-text-editor">
      <div className="toolbar">
        {toolbarButtons.map(({ command, icon, tooltip }) => (
          <Button
            key={command}
            type="button"
            variant="borderless"
            status="secondary"
            icon={{ element: <ARIcon icon={icon} size={18} fill="var(--gray-700)" /> }}
            tooltip={{
              text: tooltip,
            }}
            onClick={() => execCommand(command)}
          />
        ))}
      </div>

      <iframe ref={_arIframe} name={name} className={_iframeClassName.map((c) => c).join(" ")} height={height} />

      <div className="resize" onMouseDown={handleMouseDown}></div>

      {validation?.text && <span className="validation">{validation.text}</span>}
    </div>
  );
};

export default TextEditor;

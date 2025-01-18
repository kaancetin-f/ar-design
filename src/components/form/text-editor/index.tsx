"use client";

import React, { useEffect, useRef, useState } from "react";
import IProps from "./IProps";
import { ARIcon } from "../../icons";
import Button from "../button";
import "../../../assets/css/components/form/text-editor/styles.css";
import { Icons } from "../../../libs/types";
import Utils from "../../../libs/infrastructure/shared/Utils";

const TextEditor: React.FC<IProps> = ({ name, value, onChange, placeholder, validation }) => {
  // refs
  const _firstLoad = useRef<boolean>(false);
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

  // useEffects
  // Iframe Document yüklendikten sonra çalışacaktır. (Bir defa çalışır.)
  useEffect(() => {
    if (iframeDocument && !_firstLoad.current) {
      if (value) iframeDocument.body.innerHTML = value;
      else iframeDocument.body.innerHTML = `<p>${placeholder}</p>`;

      _firstLoad.current = true;
    }
  }, [value, iframeDocument]);

  // Iframe yüklendikten sonra çalışacaktır.
  useEffect(() => {
    if (!iframe) return;

    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDocument) {
      setIframeDocument(iframeDocument);
      iframeDocument.designMode = "on";

      // Herhangi bir değişikliği izlemek için MutationObserver kullan
      const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach(() => {
          iframeDocument.body.innerHTML === "<br>" ? onChange(undefined) : onChange(iframeDocument.body.innerHTML);
        });
      });
      // Observer'ı body üzerinde başlat
      observer.observe(iframeDocument.body, { childList: true, subtree: true, characterData: true, attributes: true });

      iframeDocument.body.addEventListener("focus", handleFocus);
      iframeDocument.body.addEventListener("blur", handleBlur);
    }
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
    <div className="ar-text-editor">
      <div className="toolbar">
        {toolbarButtons.map(({ command, icon, tooltip }) => (
          <Button
            key={command}
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

      <iframe ref={_arIframe} name={name} className={_iframeClassName.map((c) => c).join(" ")} />

      {validation?.text && <span className="validation">{validation.text}</span>}
    </div>
  );
};

export default TextEditor;

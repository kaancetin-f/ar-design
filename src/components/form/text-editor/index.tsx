import React, { useEffect, useRef } from "react";
import IProps from "./IProps";
import { ARIcon } from "../../icons";
import Button from "../button";
import "../../../assets/css/components/form/text-editor/styles.css";

const TextEditor: React.FC<IProps> = () => {
  // refs
  const _arIframe = useRef<HTMLIFrameElement>(null);

  // methods
  function execCommand(command: string) {
    if (!_arIframe.current) return;

    const iframeDoc = _arIframe.current.contentDocument || _arIframe.current.contentWindow?.document;
    if (iframeDoc) iframeDoc.execCommand(command, true, "null");
  }

  // useEffects
  useEffect(() => {
    if (!_arIframe.current) return;

    const iframeDoc = _arIframe.current.contentDocument || _arIframe.current.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.designMode = "on";
      iframeDoc.body.innerHTML = "<p>Type your text here...</p>";
    }
  }, []);

  return (
    <div className="ar-text-editor">
      <div className="toolbar">
        <Button
          variant="borderless"
          status="secondary"
          icon={{ element: <ARIcon icon={"Bold"} size={18} fill="var(--gray-700)" /> }}
          onClick={() => execCommand("bold")}
        />
        <Button
          variant="borderless"
          status="secondary"
          icon={{ element: <ARIcon icon={"Italic"} size={18} fill="var(--gray-700)" /> }}
          onClick={() => execCommand("italic")}
        />
        <Button
          variant="borderless"
          status="secondary"
          icon={{ element: <ARIcon icon={"Underline"} size={18} fill="var(--gray-700)" /> }}
          onClick={() => execCommand("underline")}
        />
        <Button
          variant="borderless"
          status="secondary"
          icon={{ element: <ARIcon icon={"BulletList"} size={14} fill="var(--gray-700)" /> }}
          onClick={() => execCommand("insertUnorderedList")}
        />
        <Button
          variant="borderless"
          status="secondary"
          icon={{ element: <ARIcon icon={"NumberList"} size={20} fill="var(--gray-700)" /> }}
          onClick={() => execCommand("insertOrderedList")}
        />
        <Button
          variant="borderless"
          status="secondary"
          icon={{ element: <ARIcon icon={"TextAlingLeft"} size={18} fill="var(--gray-700)" /> }}
          onClick={() => execCommand("justifyLeft")}
        />
        <Button
          variant="borderless"
          status="secondary"
          icon={{ element: <ARIcon icon={"TextAlingCenter"} size={18} fill="var(--gray-700)" /> }}
          onClick={() => execCommand("justifyCenter")}
        />
        <Button
          variant="borderless"
          status="secondary"
          icon={{ element: <ARIcon icon={"TextAlingRight"} size={18} fill="var(--gray-700)" /> }}
          onClick={() => execCommand("justifyRight")}
        />
      </div>

      <iframe ref={_arIframe} frameBorder="0"></iframe>
    </div>
  );
};

export default TextEditor;

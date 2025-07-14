import React, { memo, useEffect, useState } from "react";
import Button from "../button";
import { ARIcon } from "../../icons";

interface IProps {
  selectedFile: File | undefined;
  handleFileToBase64: (file: File) => Promise<string>;
  handleFileRemove: (fileToRemove: File) => void;
}

const PreviewSelectedFile = ({ selectedFile, handleFileToBase64, handleFileRemove }: IProps) => {
  // states
  const [selectedFileBase64, setSelectedFileBase64] = useState<string | undefined>(undefined);

  // useEffects
  useEffect(() => {
    (async () => {
      if (!selectedFile) return;

      setSelectedFileBase64(await handleFileToBase64(selectedFile));
    })();
  }, [selectedFile]);

  return (
    selectedFile && (
      <div className="preview">
        <div className="buttons">
          <div>
            <Button
              variant="borderless"
              type="button"
              icon={{ element: <ARIcon icon={"Download"} fill="currentColor" /> }}
              onClick={(event) => {
                event.stopPropagation();

                const url = window.URL.createObjectURL(selectedFile);
                const a = document.createElement("a");
                a.href = url;
                a.download = selectedFile.name;
                a.click();

                // Belleği temizle
                window.URL.revokeObjectURL(url);
              }}
            />

            <Button
              variant="borderless"
              type="button"
              icon={{ element: <ARIcon variant="fill" icon={"Eye"} fill="currentColor" /> }}
              onClick={(event) => {
                event.stopPropagation();

                const newTab = window.open();
                newTab?.document.write(
                  `<img src="${selectedFileBase64}" title="${selectedFile.name}" alt="${selectedFile.name}" />`
                );
              }}
            />

            <Button
              variant="borderless"
              status="danger"
              type="button"
              icon={{ element: <ARIcon variant="fill" icon={"Trash"} fill="currentColor" /> }}
              onClick={(event) => {
                event.stopPropagation();

                handleFileRemove(selectedFile);
              }}
            />
          </div>
        </div>

        <img src={selectedFileBase64} />

        <div className="informations">
          <span className="file-name">{selectedFile.name}</span>

          <div>
            <span className="file-size">
              {(selectedFile.size / 1024).toFixed(3)}
              <span className="size-type">KB</span>
            </span>

            <span className="file-type">{selectedFile.type.split("/")[1].toLocaleUpperCase()}</span>
          </div>
        </div>
      </div>
    )
  );
};

export default memo(PreviewSelectedFile);

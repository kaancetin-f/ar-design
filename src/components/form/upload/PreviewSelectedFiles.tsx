import React, { memo, useEffect, useState } from "react";
import Button from "../button";
import { ARIcon } from "../../icons";
import { ValidationError } from ".";
import { MimeTypes } from "../../../libs/types";
import Utils from "../../../libs/infrastructure/shared/Utils";

interface IProps {
  selectedFiles: File[];
  validationErrors: ValidationError[];
  handleFileToBase64: (file: File) => Promise<string>;
  handleFileRemove: (fileToRemove: File) => void;
}

const PreviewSelectedFiles = ({ selectedFiles, validationErrors, handleFileToBase64, handleFileRemove }: IProps) => {
  // states
  const [items, setItems] = useState<React.JSX.Element[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [selectedFileBase64, setSelectedFileBase64] = useState<string | undefined>(undefined);

  // useEffects
  useEffect(() => {
    (async () => {
      const items = await Promise.all(
        selectedFiles.map(async (selectedFile) => {
          const fileInformation = Utils.GetFileTypeInformation(selectedFile.type as MimeTypes);
          const _selectedFileBase64 = await handleFileToBase64(selectedFile);
          const message = validationErrors.find(
            (validationError) => validationError.fileName === selectedFile.name
          )?.message;

          return (
            <div
              className="item"
              style={{ backgroundColor: fileInformation.color }}
              onClick={(event) => event.stopPropagation()}
              onMouseOver={async (event) => {
                event.stopPropagation();

                setSelectedFileBase64(await handleFileToBase64(selectedFile));
                setSelectedFile(selectedFile);
              }}
            >
              {message && (
                <div className="error">
                  <ARIcon variant="fill" icon={"ExclamationDiamond"} fill="var(--white)" />
                  <span>{message}</span>
                </div>
              )}

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

                  {selectedFile.type.includes("image") && (
                    <Button
                      variant="borderless"
                      type="button"
                      icon={{ element: <ARIcon variant="fill" icon={"Eye"} fill="currentColor" /> }}
                      onClick={(event) => {
                        event.stopPropagation();

                        const newTab = window.open();
                        newTab?.document.write(
                          `<img src="${_selectedFileBase64}" title="${selectedFile.name}" alt="${selectedFile.name}" />`
                        );
                      }}
                    />
                  )}

                  <Button
                    variant="borderless"
                    color="red"
                    type="button"
                    icon={{ element: <ARIcon variant="fill" icon={"Trash"} fill="currentColor" /> }}
                    onClick={(event) => {
                      event.stopPropagation();

                      handleFileRemove(selectedFile);
                    }}
                  />
                </div>
              </div>

              {selectedFile.type.includes("image") ? (
                <img src={_selectedFileBase64} />
              ) : (
                <ARIcon icon={fileInformation.icon ?? "Document"} fill="var(--white)" size={32} />
              )}
            </div>
          );
        })
      );

      setItems(items);

      setSelectedFileBase64(await handleFileToBase64(selectedFiles[0]));
      setSelectedFile(selectedFiles[0]);
    })();
  }, [selectedFiles, validationErrors]);

  return (
    selectedFiles.length > 0 && (
      <>
        <div className="preview">
          {selectedFile?.type.includes("image") ? (
            <img src={selectedFileBase64} className="selected-image" />
          ) : (
            "Önizleme Yok."
          )}

          {selectedFile && (
            <div className="informations">
              <span className="file-name">{selectedFile.name}</span>

              <div>
                <span className="file-size">
                  {(selectedFile.size / 1024).toFixed(3)}
                  <span className="size-type">KB</span>
                </span>

                {/* <span className="file-type">{selectedFile.type.split("/")[1].toLocaleUpperCase()}</span> */}
                <span className="file-type">
                  {Utils.GetFileTypeInformation(selectedFile.type as MimeTypes).readableType}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="items">{items}</div>
      </>
    )
  );
};

export default memo(PreviewSelectedFiles);

import React, { useEffect, useRef, useState } from "react";
import Props from "./Props";
import "../../../assets/css/components/form/upload/styles.css";
import Tooltip from "../../feedback/tooltip";
import { AllowedTypes } from "../../../libs/types";
import { ARIcon } from "../../icons";

const Upload: React.FC<Props> = ({ text, file, onChange, allowedTypes, maxSize, multiple }) => {
  // refs
  const _firstLoad = useRef<boolean>(false);
  const _input = useRef<HTMLInputElement>(null);
  const _arUplaod = useRef<HTMLDivElement>(null);
  // refs -> File Data
  const _validationErrors = useRef<string[]>([]);

  // states
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [validationErrors, setValidationErrors] = useState<Partial<{ [key: string]: string }>[]>([]);

  // methods
  const handleFileChange = (files: FileList | null) => {
    const _files = Array.from(files ?? []);

    if (multiple) {
      setSelectedFiles((prev) => {
        const previousFileNames = prev.map((f) => f.name);
        const newFiles = _files.filter((f) => !previousFileNames.includes(f.name)) ?? [];

        return [...prev, ...newFiles];
      });
    } else {
      setSelectedFile(_files[0]);
    }
  };

  const handleFileRemove = (fileToRemove: File) => {
    if (multiple) {
      const dataTransfer = new DataTransfer();

      setSelectedFiles((prev) => {
        const newList = prev.filter((x) => x.name !== fileToRemove.name);
        newList.forEach((file) => dataTransfer.items.add(file));

        if (_input.current) _input.current.files = dataTransfer.files;

        return newList;
      });
    } else {
      setSelectedFile(undefined);
    }
  };

  const handleValidationFile = (file: File) => {
    const newErrors: Partial<{ [key: string]: string }>[] = [];

    if (allowedTypes) {
      if (!allowedTypes.includes(file.type as AllowedTypes)) {
        newErrors.push({ [file.name]: "Geçersiz dosya türü." });
        _validationErrors.current.push(file.name);
      }
    }

    if (maxSize) {
      const _maxSize = maxSize * 1024 * 1024; // MB

      if (file.size > _maxSize) {
        newErrors.push({ [file.name]: "Dosya boyutu çok büyük." });
        _validationErrors.current.push(file.name);
      }
    }
    setValidationErrors((prev) => [...prev, ...newErrors]);
  };

  function handleFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read the file"));
        }
      };
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  }

  // useEffects
  useEffect(() => {
    (async () => {
      const dataTransfer = new DataTransfer();
      const fileFormData = new FormData();

      setValidationErrors([]);
      _validationErrors.current = [];

      if (_input.current) {
        if (multiple) {
          // Seçilmiş olan dosyalar validasyona gönderiliyor.
          selectedFiles.forEach((f) => handleValidationFile(f));
          const inValidFiles = Array.from(new Set(_validationErrors.current));
          // Input içerisine dosyalar aktarılıyor.
          selectedFiles.forEach((f) => dataTransfer.items.add(f));
          _input.current.files = dataTransfer.files;

          // Geçerli olan dosyalar alındı...
          const validFiles = [...selectedFiles.filter((x) => !inValidFiles.includes(x.name))];
          validFiles.forEach((f) => fileFormData.append("file", f));

          // Geçerli olan dosyalar base64'e dönüştürülüyor...
          const base64Array = await Promise.all(validFiles.map((validFile) => handleFileToBase64(validFile)));

          onChange(fileFormData, validFiles, base64Array, _validationErrors.current.length === 0);
        } else {
          if (selectedFile) {
            handleValidationFile(selectedFile);
            fileFormData.append("file", selectedFile);

            onChange(fileFormData, selectedFile, await handleFileToBase64(selectedFile));

            // Input içerisine dosyalar aktarılıyor.
            dataTransfer.items.add(selectedFile);
            _input.current.files = dataTransfer.files;
          }
        }
      }
    })();
  }, [selectedFiles, selectedFile]);

  useEffect(() => {
    if (_firstLoad.current) return;

    multiple ? setSelectedFiles(file) : setSelectedFile(file);

    _firstLoad.current = true;
  }, [file]);

  return (
    <div ref={_arUplaod} className="ar-upload">
      <input ref={_input} type="file" onChange={(event) => handleFileChange(event.target.files)} multiple={multiple} />

      <div className="ar-upload-button">
        <div
          className="button"
          onClick={() => {
            if (_input.current) _input.current.click();
          }}
        >
          <div className="information">
            <ARIcon variant="linear" icon="Upload" stroke="var(--gray-600)" fill="transparent" />

            <div className="properies">
              {allowedTypes && (
                <div className="allow-types">
                  {allowedTypes?.map((allowedType) => allowedType.split("/")[1].toLocaleUpperCase()).join(", ")}
                </div>
              )}

              {maxSize && <div className="max-size">up to {maxSize}MB</div>}
            </div>
          </div>

          {text && <span>{text}</span>}
        </div>

        <div className="ar-upload-files">
          {multiple ? (
            <ul>
              {selectedFiles.map((selectedFile, index) => {
                let _className: string[] = [];

                const errorMessages = validationErrors
                  .filter((error) => Object.keys(error).includes(selectedFile.name))
                  .map((error) => error[selectedFile.name]);

                if (errorMessages.length > 0) _className.push("error");

                const content = (
                  <div className="content">
                    <span className={_className.map((c) => c).join(" ")}>{selectedFile.name}</span>
                    <span
                      onClick={(event) => {
                        event.stopPropagation();
                        handleFileRemove(selectedFile);
                      }}
                    >
                      x
                    </span>
                  </div>
                );

                return (
                  <li key={index} className={_className.map((c) => c).join(" ")}>
                    {errorMessages.length === 0 ? (
                      content
                    ) : (
                      <Tooltip text={errorMessages.map((message) => message ?? "")}>{content}</Tooltip>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            selectedFile && (
              <div className="file">
                <div className="information">
                  {/* <ARIcon icon={"File"} /> */}
                  <span>{selectedFile.name}</span>
                  <span>{(selectedFile.size / 1024).toFixed(3)}KB</span>
                </div>

                <div className="delete" onClick={() => handleFileRemove(selectedFile)}>
                  <ARIcon icon="CloseCircle" fill="transparent" size={20} />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;

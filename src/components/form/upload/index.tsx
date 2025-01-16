import React, { useEffect, useRef, useState } from "react";
import Props from "./Props";
import "../../../assets/css/components/form/upload/styles.css";
import { ARIcon } from "../../icons";
import Button from "../button";

const Upload: React.FC<Props> = ({ text, file, onChange, multiple }) => {
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
    }
  };

  const handleValidationFile = (file: File) => {
    const newErrors: Partial<{ [key: string]: string }>[] = [];
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      newErrors.push({ [file.name]: "Geçersiz dosya türü." });
      _validationErrors.current.push(file.name);
    }
    if (file.size > maxSize) {
      newErrors.push({ [file.name]: "Dosya boyutu çok büyük." });
      _validationErrors.current.push(file.name);
    }

    setValidationErrors((prev) => [...prev, ...newErrors]);
  };

  // useEffects
  useEffect(() => {
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
        onChange(fileFormData, validFiles);
      } else {
        if (selectedFile) {
          handleValidationFile(selectedFile);
          fileFormData.append("file", selectedFile);
          onChange(fileFormData, selectedFile);

          // Input içerisine dosyalar aktarılıyor.
          dataTransfer.items.add(selectedFile);
          _input.current.files = dataTransfer.files;
        }
      }
    }
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
        <Button
          variant="outlined"
          status="light"
          icon={{ element: <ARIcon variant="bulk" icon="Upload" fill="var(--gray-300)" /> }}
          onClick={() => {
            if (_input.current) _input.current.click();
          }}
        >
          {text && <span>{text}</span>}
        </Button>

        <div className="ar-upload-files">
          <ul>
            {selectedFiles.map((selectedFile, index) => {
              let _className: string[] = [];

              const errorMessages = validationErrors
                .filter((error) => Object.keys(error).includes(selectedFile.name))
                .map((error) => error[selectedFile.name]);

              if (errorMessages.length > 0) _className.push("error");

              return (
                <li key={index} className={_className.map((c) => c).join(" ")}>
                  <div className="list-content">
                    <span>{selectedFile.name}</span>
                    <span
                      onClick={(event) => {
                        event.stopPropagation();
                        handleFileRemove(selectedFile);
                      }}
                    >
                      x
                    </span>
                  </div>

                  {errorMessages.length > 0 && (
                    <div className="errors">
                      {errorMessages.map((message, i) => (
                        <span key={i}>
                          <span className="bullet">&#8226;</span>
                          <span>{message}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Upload;

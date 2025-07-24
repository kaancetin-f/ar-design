import React, { useCallback, useEffect, useRef, useState } from "react";
import Props from "./Props";
import "../../../assets/css/components/form/upload/styles.css";
import { MimeTypes } from "../../../libs/types";
import { ARIcon } from "../../icons";
import Dropzone from "./Dropzone";
import Button from "../button";
import List from "./List";

export type ValidationError = { fileName: string; message: string };

const Upload: React.FC<Props> = ({ text, file, onChange, allowedTypes, maxSize, type = "list", multiple }) => {
  // refs
  const _firstLoad = useRef<boolean>(false);
  const _input = useRef<HTMLInputElement>(null);
  const _arUplaod = useRef<HTMLDivElement>(null);
  // refs -> File Data
  const _validationErrors = useRef<string[]>([]);

  // variables
  const [className, setClassName] = useState<string[]>(["button"]);

  // states
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  // methods
  const handleFileChange = useCallback((files: FileList | null) => {
    const _files = Array.from(files ?? []);

    if (_files.length > 0) {
      if (multiple) {
        setSelectedFiles((prev) => {
          const previousFileNames = prev.map((f) => f.name);
          const newFiles = _files.filter((f) => !previousFileNames.includes(f.name)) ?? [];

          return [...prev, ...newFiles];
        });
      } else {
        setSelectedFile(_files[0]);
      }
    } else {
      multiple ? setSelectedFiles(file) : setSelectedFile(file);
    }
  }, []);

  const handleFileRemove = useCallback((fileToRemove: File) => {
    if (multiple) {
      const dataTransfer = new DataTransfer();

      setSelectedFiles((prev) => {
        const newList = prev.filter((x) => x.name !== fileToRemove.name);
        newList.forEach((file) => dataTransfer.items.add(file));

        if (_input.current) _input.current.files = dataTransfer.files;

        if (newList.length === 0) setClassName((prev) => prev.filter((c) => c !== "has-file"));

        return newList;
      });
    } else {
      setSelectedFile(undefined);
      setClassName((prev) => prev.filter((c) => c !== "has-file"));
    }
  }, []);

  const handleValidationFile = useCallback((file: File) => {
    const newErrors: ValidationError[] = [];

    if (allowedTypes) {
      if (!allowedTypes.includes(file.type as MimeTypes)) {
        newErrors.push({ fileName: file.name, message: "Geçersiz dosya türü." });
        _validationErrors.current.push(file.name);
      }
    }

    if (maxSize) {
      const _maxSize = maxSize * 1024 * 1024; // MB

      if (file.size > _maxSize) {
        newErrors.push({ fileName: file.name, message: "Dosya boyutu çok büyük." });
        _validationErrors.current.push(file.name);
      }
    }

    setValidationErrors((prev) => [...prev, ...newErrors]);
  }, []);

  const handleFileToBase64 = useCallback((file: File): Promise<string> => {
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
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setClassName((prev) => {
        const index = prev.findIndex((c) => c === "dragging");

        if (index === -1) return [...prev, "dragging"];

        return prev;
      });
    } else {
      setClassName((prev) => prev.filter((c) => c !== "dragging"));
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;

    if (files && files.length > 0) {
      if (multiple) {
        setSelectedFiles(Array.from(files));
      } else {
        setSelectedFile(files[files.length - 1]);
        _firstLoad.current = true;
      }
    }

    setClassName((prev) => prev.filter((c) => c !== "dragging"));
  }, []);

  const renderUploadFile = (params: { children: React.ReactNode }) => {
    return (
      <div ref={_arUplaod} className="ar-upload">
        <input
          ref={_input}
          type="file"
          onChange={(event) => handleFileChange(event.target.files)}
          multiple={multiple}
        />

        {params.children}
      </div>
    );
  };

  // useEffects
  useEffect(() => {
    (async () => {
      const dataTransfer = new DataTransfer();
      const fileFormData = new FormData();

      setValidationErrors([]);
      _validationErrors.current = [];

      if (_input.current) {
        if (multiple) {
          if (selectedFiles.length === 0) {
            onChange(fileFormData, [], [], false);
            return;
          }

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

          // Eğer dosya varsa.
          setClassName((prev) => {
            const index = prev.findIndex((c) => c === "has-file");

            if (index === -1) return [...prev, "has-file"];

            return prev;
          });
        } else {
          if (selectedFile) {
            handleValidationFile(selectedFile);
            fileFormData.append("file", selectedFile);

            onChange(fileFormData, selectedFile, await handleFileToBase64(selectedFile));

            // Input içerisine dosyalar aktarılıyor.
            dataTransfer.items.add(selectedFile);
            _input.current.files = dataTransfer.files;
          } else {
            onChange(undefined, null, "");
          }
        }
      }
    })();
  }, [selectedFiles, selectedFile]);

  useEffect(() => {
    if (_firstLoad.current) {
      // if (multiple && file.length === 0) {
      //   setSelectedFiles([]);
      // } else {
      //   if (!file) setSelectedFile(undefined);
      // }

      return;
    }

    if (multiple) {
      setSelectedFiles(file);
      _firstLoad.current = true;
    } else {
      setSelectedFile(file);
      _firstLoad.current = true;
    }
  }, [file]);

  useEffect(() => {
    if (type === "dropzone") setClassName((prev) => [...prev, "dropzone"]);
  }, []);

  switch (type) {
    case "list":
      return renderUploadFile({
        children: (
          <>
            <Button
              variant="outlined"
              color="gray"
              icon={{ element: <ARIcon variant="fill" icon="CloudUpload" /> }}
              onClick={() => {
                if (_input.current) _input.current.click();
              }}
            >
              {text && <span>{text}</span>}
            </Button>

            <List
              selectedFiles={selectedFiles.length === 0 && selectedFile ? [selectedFile] : selectedFiles}
              validationErrors={validationErrors}
              handleFileToBase64={handleFileToBase64}
              handleFileRemove={handleFileRemove}
            />
          </>
        ),
      });
    case "dropzone":
      return renderUploadFile({
        children: (
          <div className="ar-upload-button">
            <div
              className={className.map((c) => c).join(" ")}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => {
                if (_input.current) _input.current.click();
              }}
            >
              <Dropzone
                selectedFiles={selectedFiles.length === 0 && selectedFile ? [selectedFile] : selectedFiles}
                validationErrors={validationErrors}
                handleFileToBase64={handleFileToBase64}
                handleFileRemove={handleFileRemove}
              />

              {!selectedFile && selectedFiles.length === 0 && (
                <>
                  <div className="upload">
                    <ARIcon variant="fill" icon="CloudUpload" size={32} />

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
                </>
              )}
            </div>
          </div>
        ),
      });
  }
};

export default Upload;

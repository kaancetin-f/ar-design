import React, { useEffect, useRef, useState } from "react";
import Props from "./Props";
import "../../../assets/css/components/form/upload/styles.css";
import ReactDOM from "react-dom";
import { ARIcon } from "../../icons";

const Upload: React.FC<Props> = ({ file, onChange, multiple }) => {
  // refs
  const _input = useRef<HTMLInputElement>(null);
  const _arUplaod = useRef<HTMLDivElement>(null);
  const _arUplaodFiles = useRef<HTMLDivElement>(null);
  const _count = useRef<HTMLSpanElement>(null);
  const _countInterval = useRef<NodeJS.Timeout>();

  // states
  const [open, setOpen] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  // methods
  const handleClickOutSide = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (_arUplaodFiles.current && !_arUplaodFiles.current.contains(target)) setOpen(false);
  };

  const handleKeys = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === "Escape") setOpen(false);
  };

  const handlePosition = () => {
    if (_arUplaod.current && _arUplaodFiles.current) {
      const wRect = _arUplaod.current.getBoundingClientRect(); // Wrapper
      const ufRect = _arUplaodFiles.current.getBoundingClientRect(); // Popup
      const screenCenter = window.innerHeight / 2;
      const sx = window.scrollX || document.documentElement.scrollLeft;
      const sy = window.scrollY || document.documentElement.scrollTop;

      if (multiple) {
        _arUplaodFiles.current.style.top = `${
          (wRect.top > screenCenter ? wRect.top - ufRect.height + wRect.height : wRect.top) + sy
        }px`;
      } else {
        _arUplaodFiles.current.style.top = `${wRect.top + sy}px`;
      }
      _arUplaodFiles.current.style.left = `${wRect.left - ufRect.width + sx - 10}px`;
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesArray = Array.from(event.target.files ?? []);
    setSelectedFiles(filesArray);

    if (filesArray.length > 0) {
      const formData = new FormData();

      if (multiple) {
        filesArray.forEach((file) => formData.append("file", file));
        onChange(formData, filesArray);
      } else {
        formData.append("file", filesArray[0]);
        onChange(formData, filesArray[0]);
      }
    }
  };

  const handleFileRemove = (fileToRemove: File) => {
    setSelectedFiles((prev) => prev.filter((x) => x.name !== fileToRemove.name));

    // Dosyayı input'tan kaldırmak için input'un value'sunu sıfırla
    if (_input.current) {
      const inputFiles = Array.from(_input.current.files ?? []);
      const updatedFiles = inputFiles.filter((file) => file.name !== fileToRemove.name);
      const dataTransfer = new DataTransfer();
      updatedFiles.forEach((file) => dataTransfer.items.add(file));

      // input'un files özelliğini güncelle
      _input.current.files = dataTransfer.files;
    }
  };

  // useEffects
  useEffect(() => {
    handlePosition();

    if (_count.current) {
      _count.current.classList.add("changed");

      _countInterval.current = setTimeout(() => {
        _count.current?.classList.remove("changed");
        clearTimeout(_countInterval.current);
      }, 250);
    }
  }, [selectedFiles]);

  useEffect(() => {
    if (_input.current) {
      multiple ? setSelectedFiles(file) : setSelectedFile(file);
    }
  }, [file]);

  useEffect(() => {
    if (open) {
      handlePosition();

      window.addEventListener("blur", () => setOpen(false));
      document.addEventListener("click", handleClickOutSide);
      document.addEventListener("keydown", handleKeys);
    }

    return () => {
      window.removeEventListener("blur", () => setOpen(false));
      document.removeEventListener("click", handleClickOutSide);
      document.removeEventListener("keydown", handleKeys);
    };
  }, [open]);

  return (
    <div ref={_arUplaod} className="ar-upload">
      <input ref={_input} type="file" onChange={handleFileChange} multiple={multiple} />

      <div className="ar-upload-button">
        <span ref={_count} className="count" onClick={() => setOpen((prev) => !prev)}>
          {selectedFiles.length === 0 ? (selectedFile ? 1 : 0) : selectedFiles.length}
        </span>

        <button
          onClick={() => {
            if (_input.current) _input.current.click();
          }}
        >
          <ARIcon variant="bulk" icon="Upload" fill="var(--success)" />
          <span>Dosya Yükle</span>
        </button>
      </div>

      {open && selectedFiles.length > 0 ? (
        ReactDOM.createPortal(
          <div ref={_arUplaodFiles} className="ar-upload-files">
            <ul>
              {selectedFiles.map((selectedFile, index) => (
                <li key={index}>
                  <span>{selectedFile.name}</span>
                  <span
                    onClick={(event) => {
                      event.stopPropagation();
                      handleFileRemove(selectedFile);
                    }}
                  >
                    <ARIcon variant="bulk" icon="Trash" fill="var(--danger)" size={16} />
                  </span>
                </li>
              ))}
            </ul>
          </div>,
          document.body
        )
      ) : (
        <span>{selectedFile?.name}</span>
      )}
    </div>
  );
};

export default Upload;

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Option, Props } from "./Types";
import Input from "../input";
import "../../../assest/css/form/select/select.css";

const Select: React.FC<Props> = ({ variant = "outlined", options, onChange, multiple }) => {
  // refs
  const _arSelect = useRef<HTMLDivElement>(null);
  const _input = useRef<HTMLInputElement>(null);
  const _options = useRef<HTMLDivElement>(null);
  const _searchField = useRef<HTMLInputElement>(null);

  // states
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selection, setSelection] = useState<Option | null>(null);
  const [selections, setSelections] = useState<Option[]>([]);
  let [optionsClassName, setOptionsClassName] = useState<string[]>(["options", "closed"]);

  // methods
  const handleClickOutSide = (event: MouseEvent) => {
    const _target = event.target as HTMLElement;

    if (_arSelect.current && !_arSelect.current.contains(_target)) {
      setOptionsOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") setOptionsOpen(false);
  };

  // effects
  useEffect(() => {
    setOptionsClassName(["options"]);

    if (optionsOpen) {
      // Options açıldıktan 100ms sonra arama kutusuna otomatik olarak focus oluyor.
      setTimeout(() => {
        if (_searchField.current) _searchField.current.focus();
      }, 250);

      if (_input.current) {
        _input.current.value = "";
        _input.current.placeholder = selection?.value || "";
      }

      setSearchText("");
      setOptionsClassName((prev) => [...prev, "opened"]);
    } else {
      if (_input.current) {
        _input.current.value = selection?.value || "";
        _input.current.placeholder = "";
      }

      setOptionsClassName((prev) => [...prev, "closed"]);
    }
  }, [optionsOpen]);

  useEffect(() => {
    window.addEventListener("click", handleClickOutSide);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("click", handleClickOutSide);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={_arSelect} className="ar-select-wrapper">
      <div className="ar-select">
        {/* Multiple */}
        {multiple ? (
          <div className="selections" onClick={() => setOptionsOpen((x) => !x)}>
            <ul>
              {selections.map((selection, index) => (
                <li key={index}>{selection.value}</li>
              ))}
            </ul>
          </div>
        ) : (
          // Single
          <Input
            ref={_input}
            variant={variant}
            onClick={() => setOptionsOpen((x) => !x)}
            onKeyUp={(event) => {
              // Arama yapmak için kullanılan state bu kısımda dolduruluyor.
              setSearchText(event.currentTarget.value);
            }}
          />
        )}

        {(Object.keys(selection || {}).length > 0 || (multiple && selections.length > 0)) && (
          <span
            className="button-clear"
            onClick={() => {
              // Multiple
              if (multiple) setSelections([]);

              // Single
              if (!multiple) {
                if (_input.current) {
                  _input.current.value = "";
                }

                setSelection(null);
              }
            }}
          ></span>
        )}
      </div>

      {options && (
        <div ref={_options} className={optionsClassName.map((className) => className).join(" ")}>
          {/* Eğer çoklu seçim olarak kullanılıyorsa bu arama kısmı açılıyor... */}
          {multiple && (
            <div className="search-field">
              <Input
                ref={_searchField}
                variant="outlined"
                status="light"
                placeholder="Search..."
                onKeyUp={(event) => {
                  // Arama yapmak için kullanılan state bu kısımda dolduruluyor.
                  setSearchText(event.currentTarget.value);
                }}
              />
            </div>
          )}

          <ul>
            {options
              .filter((option) => option.value.toLowerCase().includes(searchText.toLowerCase()))
              .map((option, index) => (
                <li
                  key={index}
                  onClick={() => {
                    // Multiple
                    if (multiple) {
                      if (selections.includes(option)) {
                        const filtered = selections.filter((v) => v !== option);

                        onChange(filtered);
                        setSelections(filtered);
                      } else {
                        onChange([...selections, option]);
                        setSelections((prev) => [...prev, option]);
                      }
                    }

                    // Signle
                    if (!multiple) {
                      if (_input.current) {
                        _input.current.value = option.value;
                      }

                      onChange(option);
                      setSelection(option);
                      setOptionsOpen(false);
                    }
                  }}
                >
                  {option.value}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Select.displayName = "Select";

export default Select;

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Option, Props } from "./Types";
import Input from "../input";
import "../../../assets/css/components/form/select/select.css";
import Chip from "../../data-display/chip";

const Select: React.FC<Props> = ({ variant = "outlined", options, onChange, multiple }) => {
  // refs
  const _arSelect = useRef<HTMLDivElement>(null);
  const _input = useRef<HTMLInputElement>(null);
  const _options = useRef<HTMLDivElement>(null);
  const _optionItems = useRef<(HTMLLIElement | null)[]>([]);
  const _searchField = useRef<HTMLInputElement>(null);
  let _otoFocus = useRef<NodeJS.Timeout>().current;
  let _navigationIndex = useRef<number>(0);

  // states
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selection, setSelection] = useState<Option | null>(null);
  const [selections, setSelections] = useState<Option[]>([]);
  const [navigationIndex, setNavigationIndex] = useState<number>(0);
  let [optionsClassName, setOptionsClassName] = useState<string[]>(["options", "closed"]);

  // methods
  const handleClickOutSide = (event: MouseEvent) => {
    const _target = event.target as HTMLElement;

    if (_arSelect.current && !_arSelect.current.contains(_target)) {
      setOptionsOpen(false);
    }
  };

  const handleItemSelected = (option: Option, index: number) => {
    // Multiple
    if (multiple) {
      const isSelectionItem = selections.some((selection) => selection.value === option.value);

      if (isSelectionItem) {
        const filtered = selections.filter((selection) => selection.value !== option.value);

        onChange(filtered);
        setSelections(filtered);
      } else {
        onChange([...selections, option]);
        setSelections((prev) => [
          ...prev,
          {
            value: option.value,
            text: option.text,
          },
        ]);
      }

      // Selected Items
      _optionItems.current[index]?.classList.toggle("selectedItem");
      // Temizleme işlemi...
      setSearchText("");
      if (_searchField.current) _searchField.current.value = "";
    }

    // Signle
    if (!multiple) {
      if (_input.current) _input.current.value = option.text;

      onChange(option);
      setSelection(option);
      setOptionsOpen(false);

      _optionItems.current.forEach((item) => item?.classList.remove("selectedItem"));
      _optionItems.current[index]?.classList.add("selectedItem");
    }
  };

  const handleKeys = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === "ArrowUp" || key === "ArrowLeft") {
      setNavigationIndex((prev) => {
        let result: number = 0;

        if (prev > 0) result = prev - 1;
        if (prev === 0) result = _optionItems.current.length - 1;

        _navigationIndex.current = result;
        return result;
      });
    } else if (key === "ArrowDown" || key === "ArrowRight") {
      setNavigationIndex((prev) => {
        let result: number = 0;

        if (prev === _optionItems.current.length - 1) result = 0;
        if (prev < _optionItems.current.length - 1) result = prev + 1;

        _navigationIndex.current = result;
        return result;
      });
    } else if (key === "Enter") {
      if (_navigationIndex.current === -1) return;

      _optionItems.current[_navigationIndex.current]?.click();
    } else if (key === "Escape") {
      setOptionsOpen(false);
    }
  };

  // effects
  useEffect(() => {
    setOptionsClassName(["options"]);

    if (optionsOpen) {
      // Options açıldıktan 100ms sonra arama kutusuna otomatik olarak focus oluyor.
      _otoFocus = setTimeout(() => {
        if (_searchField.current) _searchField.current.focus();
      }, 250);

      if (!multiple) {
        if (_input.current) {
          _input.current.value = "";
          _input.current.placeholder = selection?.text || "";
        }
      }

      setOptionsClassName((prev) => [...prev, "opened"]);

      // Options paneli için olay dinleyileri ekleniyor.
      document.addEventListener("click", handleClickOutSide);
      document.addEventListener("keydown", handleKeys);

      // Dinleyicileri kaldır ve zamanlayıcıyı temizle.
      return () => {
        clearTimeout(_otoFocus);
        document.removeEventListener("click", handleClickOutSide);
        document.removeEventListener("keydown", handleKeys);
      };
    } else {
      if (multiple) {
        setSearchText("");
        if (_searchField.current) _searchField.current.value = "";
      } else {
        if (_input.current) {
          _input.current.value = selection?.text || "";
          _input.current.removeAttribute("placeholder");
        }
      }

      setOptionsClassName((prev) => [...prev, "closed"]);
    }
  }, [optionsOpen]);

  useEffect(() => {
    setNavigationIndex(0);
    _navigationIndex.current = 0;
  }, [searchText]);

  useEffect(() => {
    // Seçilen öğeye 'navigate-with-arrow-keys' sınıfını ekle
    _optionItems.current.forEach((item, index) => {
      index === navigationIndex
        ? item?.classList.add("navigate-with-arrow-keys")
        : item?.classList.remove("navigate-with-arrow-keys");
    });
  }, [navigationIndex]);

  return (
    <div ref={_arSelect} className="ar-select-wrapper">
      <div className="ar-select">
        {/* Multiple */}
        {multiple ? (
          <div className="selections" onClick={() => setOptionsOpen((x) => !x)}>
            {selections.map((selection, index) => (
              <Chip key={index} text={selection.text} />
            ))}
          </div>
        ) : (
          // Single
          <Input
            ref={_input}
            variant={variant}
            onClick={() => setOptionsOpen((x) => !x)}
            onChange={() => !optionsOpen && setOptionsOpen(true)}
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
              if (multiple) {
                if (_searchField.current) _searchField.current.value = "";

                setSelections([]);
              }

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

      {options.length > 0 && (
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
              .filter((option) => {
                if (!optionsOpen) return option;

                return option.text.toLowerCase().includes(searchText.toLowerCase());
              })
              .map((option, index) => (
                <li
                  ref={(element) => (_optionItems.current[index] = element)}
                  key={index}
                  onClick={() => handleItemSelected(option, index)}
                >
                  {/* 
                    TODO: Bu kısmı checkbox bileşeni yapıldıktan sonra tekrar düzenlenecek.
                    TODO: Eğer çoklu seçim kullanıyorsa checkbox dahil edilerek daha güzel bir görünüm kazandırılacak.
                  */}
                  {/* {multiple && <span className="check"></span>} */}
                  <span>{option.text}</span>
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

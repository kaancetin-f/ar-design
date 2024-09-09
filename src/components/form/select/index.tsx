"use client";

import React, { useEffect, useRef, useState } from "react";
import { Option, Props } from "./Types";
import Input from "../input";
import "../../../assest/css/components/form/select/select.css";
import Chip from "../../data-display/chip";

const Select: React.FC<Props> = ({ variant = "outlined", options, onChange, multiple }) => {
  // refs
  const _arSelect = useRef<HTMLDivElement>(null);
  const _input = useRef<HTMLInputElement>(null);
  const _options = useRef<HTMLDivElement>(null);
  const _optionItems = useRef<(HTMLLIElement | null)[]>([]);
  const _searchField = useRef<HTMLInputElement>(null);
  let _selectedIndex = useRef<number>(0).current;

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

  const handleItemSelected = (option: Option) => {
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

      // Diğer İşlemler
      if (_searchField.current) _searchField.current.value = "";
      setSearchText("");
    }

    // Signle
    if (!multiple) {
      if (_input.current) {
        _input.current.value = option.text;
      }

      onChange(option);
      setSelection(option);
      setOptionsOpen(false);
    }
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.code === "Escape") setOptionsOpen(false);
  };

  const handleArrowKeys = (event: KeyboardEvent) => {
    // Önce tüm öğelerin 'navigate-with-arrow-keys' sınıfını kaldır
    _optionItems.current.forEach((item) => item?.classList.remove("navigate-with-arrow-keys"));

    const key = event.key;

    // Yukarı veya sola ok tuşlarına basıldıysa
    if (key === "ArrowUp" || key === "ArrowLeft") {
      _selectedIndex = _selectedIndex === 0 ? _optionItems.current.length - 1 : _selectedIndex - 1;
    }
    // Aşağı veya sağa ok tuşlarına basıldıysa
    else if (key === "ArrowDown" || key === "ArrowRight") {
      _selectedIndex = _selectedIndex === _optionItems.current.length - 1 ? 0 : _selectedIndex + 1;
    }

    // Seçilen öğeye 'navigate-with-arrow-keys' sınıfını ekle
    _optionItems.current[_selectedIndex]?.classList.add("navigate-with-arrow-keys");
  };

  const handleEnterKey = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === "Enter" && _selectedIndex !== null) {
      // Geçerli bir öğe seçildiyse ve Enter'a basıldıysa
      _optionItems.current[_selectedIndex]?.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      ); // Click olayını tetikle
    }
  };

  /**
   * Seçilmiş olan `option` nesnesini belirtmek için kullanılmaktadır.
   * @param option
   * @returns
   */
  const isSelected = (option: Option) => {
    if (multiple) {
      return selections.some((v) => v.value === option.value) ? "selectedItem" : "";
    } else {
      return selection?.value === option.value ? "selectedItem" : "";
    }
  };

  // effects
  useEffect(() => {
    setOptionsClassName(["options"]);

    if (optionsOpen) {
      // Options açıldıktan 100ms sonra arama kutusuna otomatik olarak focus oluyor.
      const otoFocus = setTimeout(() => {
        if (_searchField.current) _searchField.current.focus();
      }, 250);

      if (_input.current) {
        _input.current.value = "";
        _input.current.placeholder = selection?.text || "";
      }

      setSearchText("");
      setOptionsClassName((prev) => [...prev, "opened"]);

      window.addEventListener("keydown", handleArrowKeys);
      window.addEventListener("keydown", handleEnterKey);

      // Temizlik fonksiyonu: Dinleyicileri kaldır ve zamanlayıcıyı temizle
      return () => {
        clearTimeout(otoFocus); // setTimeout'u temizle

        window.removeEventListener("keydown", handleArrowKeys);
        window.removeEventListener("keydown", handleEnterKey);
      };
    } else {
      if (_input.current) {
        _input.current.value = selection?.text || "";
        _input.current.placeholder = "";
      }

      setOptionsClassName((prev) => [...prev, "closed"]);
    }
  }, [optionsOpen]);

  useEffect(() => {
    window.addEventListener("click", handleClickOutSide);
    window.addEventListener("keydown", handleEscapeKey);

    // Başlangıçta ilk değeri seçer...
    _optionItems.current[0]?.classList.add("navigate-with-arrow-keys");

    return () => {
      window.removeEventListener("click", handleClickOutSide);
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

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

      {options && (
        <div ref={_options} className={optionsClassName.map((className) => className).join(" ")}>
          {/* Eğer çoklu seçim olarak kullanılıyorsa bu arama kısmı açılıyor... */}
          {multiple && (
            <div className="search-field">
              <Input
                ref={_searchField}
                variant="outlined"
                status="primary"
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
              .filter((option) => option.text.toLowerCase().includes(searchText.toLowerCase()))
              .map((option, index) => (
                <li
                  ref={(element) => (_optionItems.current[index] = element)}
                  key={index}
                  className={isSelected(option)}
                  onClick={() => handleItemSelected(option)}
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

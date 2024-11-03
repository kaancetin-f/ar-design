"use client";

import React, { useEffect, useRef, useState } from "react";
import { Props } from "./Props";
import Input from "../input";
import "../../../assets/css/components/form/select/select.css";
import Chip from "../../data-display/chip";
import Checkbox from "../checkbox";
import Paragraph from "../../data-display/typography/paragraph/Paragraph";
import { Option } from "../../../libs/types/index";

const Select: React.FC<Props> = ({
  variant = "outlined",
  status,
  border = { radius: "sm" },
  options,
  onChange,
  multiple,
  defaultValueIndex,
  ...attributes
}) => {
  // refs
  let _selectionClassName = "selections";

  const _arSelect = useRef<HTMLDivElement>(null);
  const _singleInput = useRef<HTMLInputElement>(null);
  const _multipleInput = useRef<HTMLDivElement>(null);
  const _options = useRef<HTMLDivElement>(null);
  const _optionItems = useRef<(HTMLLIElement | null)[]>([]);
  const _searchField = useRef<HTMLInputElement>(null);
  let _otoFocus = useRef<NodeJS.Timeout>().current;
  let _navigationIndex = useRef<number>(0);
  let _selectedItemIndex = useRef<number>(0);

  // states
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
  let [optionsClassName, setOptionsClassName] = useState<string[]>(["options", "closed"]);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selection, setSelection] = useState<Option | undefined>(undefined);
  const [selections, setSelections] = useState<Option[]>([]);
  const [navigationIndex, setNavigationIndex] = useState<number>(0);

  // selection className
  if (variant) _selectionClassName += ` ${variant}`;
  _selectionClassName += multiple ? ` ${status?.color || "light"}` : status || "light";

  // border
  _selectionClassName += ` border-radius-${border.radius}`;
  _selectionClassName += ` border-style-solid}`;

  // methods
  const handleClickOutSide = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (_arSelect.current && !_arSelect.current.contains(target)) {
      setOptionsOpen(false);
    }
  };

  const handleKeys = (event: KeyboardEvent) => {
    const key = event.key;
    const optionItems = _optionItems.current.filter((optionItem) => optionItem !== null);

    if (key === "ArrowUp" || key === "ArrowLeft") {
      setNavigationIndex((prev) => {
        let result: number = 0;

        if (prev > 0) result = prev - 1;
        if (prev === 0) result = optionItems.length - 1;

        _navigationIndex.current = result;
        return result;
      });
    } else if (key === "ArrowDown" || key === "ArrowRight") {
      setNavigationIndex((prev) => {
        let result: number = 0;

        if (prev === optionItems.length - 1) result = 0;
        if (prev < optionItems.length - 1) result = prev + 1;

        _navigationIndex.current = result;
        return result;
      });
    } else if (key === "Enter") {
      if (_navigationIndex.current === -1) return;

      optionItems[_navigationIndex.current]?.click();
    } else if (key === "Escape") {
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
      if (_singleInput.current) _singleInput.current.value = option.text;

      onChange(option);
      setSelection(option);
      setOptionsOpen(false);

      _selectedItemIndex.current = index;
      _optionItems.current.forEach((item) => item?.classList.remove("selectedItem"));
      _optionItems.current[index]?.classList.add("selectedItem");
    }
  };

  // effects
  useEffect(() => setFilteredOptions(options), [options]);

  useEffect(() => {
    const optionItems = _optionItems.current.filter((optionItem) => optionItem !== null);
    const screenCenter = window.innerHeight / 2 + 100;
    const rect = _singleInput.current
      ? _singleInput.current.getBoundingClientRect()
      : _multipleInput.current?.getBoundingClientRect();
    const direction = rect && rect.top > screenCenter ? "bottom" : "top";

    setOptionsClassName(["options"]);

    if (optionsOpen) {
      // Options açıldıktan 100ms sonra arama kutusuna otomatik olarak focus oluyor.
      _otoFocus = setTimeout(() => {
        if (_searchField.current) _searchField.current.focus();
      }, 250);

      if (!multiple) {
        if (_singleInput.current) {
          _singleInput.current.value = "";
          _singleInput.current.placeholder = selection?.text || attributes.placeholder || "";
        }

        optionItems[_selectedItemIndex.current]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setOptionsClassName((prev) => [...prev, direction, "opened"]);

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
      // Options paneli kapanma süresi 250ms.
      // 300ms sonra temizlenmesinin sebebi kapanırken birder veriler gerliyor ve panel yüksekliği artıyor.
      setTimeout(() => {
        setSearchText("");
      }, 300);

      if (multiple) {
        if (_searchField.current) _searchField.current.value = "";
      } else {
        if (_singleInput.current) {
          _singleInput.current.value = selection?.text || "";
          _singleInput.current.placeholder = attributes.placeholder || "";
        }
      }

      setOptionsClassName((prev) => [...prev, direction, "closed"]);
    }
  }, [optionsOpen]);

  useEffect(() => {
    // Arama kriterlerine uygun olan değerleri bir state e gönderiyoruz.
    setFilteredOptions(
      options?.filter((option) => {
        if (!optionsOpen) return option;

        return option.text.toLowerCase().includes(searchText.toLowerCase());
      })
    );

    // Arama yapılması durumunda değerleri sıfırla.
    setNavigationIndex(0);
    _navigationIndex.current = 0;

    // Arama yapılması durumunda arama sonuçlarından ilk olan değeri işaretle.
    const optionItems = _optionItems.current.filter((optionItem) => optionItem !== null);
    optionItems[_navigationIndex.current]?.classList.add("navigate-with-arrow-keys");
  }, [searchText]);

  useEffect(() => {
    // Seçilen öğeye 'navigate-with-arrow-keys' sınıfını ekle
    _optionItems.current
      .filter((optionItem) => optionItem !== null)
      .forEach((item, index) => {
        if (index === navigationIndex) {
          item?.classList.add("navigate-with-arrow-keys");

          item.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        } else {
          item?.classList.remove("navigate-with-arrow-keys");
        }
      });
  }, [navigationIndex]);

  useEffect(() => {
    if (multiple) {
    } else {
      if (defaultValueIndex !== undefined && defaultValueIndex >= 0) {
        handleItemSelected(options[defaultValueIndex], defaultValueIndex);
      }
    }
  }, [defaultValueIndex]);

  return (
    <div ref={_arSelect} className="ar-select-wrapper">
      {/* :Begin: Select and Multiple Select Field */}
      <div ref={_multipleInput} className="ar-select">
        {/* Multiple */}
        {multiple ? (
          <div className={_selectionClassName} onClick={() => setOptionsOpen((x) => !x)}>
            <div className="items">
              {selections.length > 0 ? (
                selections.map((selection, index) => (
                  <Chip
                    key={index}
                    variant={status?.selected?.variant || "filled"}
                    status={status?.selected?.color || status?.color}
                    text={selection.text}
                  />
                ))
              ) : (
                <span className={`placeholder ${status?.color || "light"}`}>
                  {attributes.placeholder}
                </span>
              )}
            </div>
          </div>
        ) : (
          // Single
          <Input
            ref={_singleInput}
            variant={variant}
            status={status || "light"}
            border={{ radius: border.radius }}
            onClick={() => setOptionsOpen((prev) => !prev)}
            onChange={() => !optionsOpen && setOptionsOpen(true)}
            onKeyUp={(event) => {
              if (event.key === "Enter") return;

              // Arama yapmak için kullanılan state bu kısımda dolduruluyor.
              setSearchText(event.currentTarget.value);
            }}
            placeholder={attributes.placeholder}
            disabled={attributes.disabled}
          />
        )}

        {!attributes.disabled &&
          (Object.keys(selection || {}).length > 0 || (multiple && selections.length > 0)) && (
            <span
              className="button-clear"
              onClick={() => {
                // Multiple
                if (multiple) {
                  if (_searchField.current) _searchField.current.value = "";

                  setSelections([]);
                  onChange([]);
                }

                // Single
                if (!multiple) {
                  if (_singleInput.current) {
                    _singleInput.current.value = "";
                  }

                  setSelection(undefined);
                  onChange(undefined);
                }
              }}
            ></span>
          )}

        <span
          className={`angel-down ${optionsOpen ? "opened" : "closed"}`}
          onClick={(event) => {
            event.stopPropagation();

            setOptionsOpen((x) => !x);
          }}
        ></span>
      </div>
      {/* :End: Select and Multiple Select Field */}

      {/* :Begin: Options Field */}
      <div ref={_options} className={optionsClassName.map((c) => c).join(" ")}>
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

        {filteredOptions?.length > 0 ? (
          <ul>
            {filteredOptions?.map((option, index) => {
              const isItem = selections.some((selection) => selection.value === option.value);

              return (
                <li
                  ref={(element) => (_optionItems.current[index] = element)}
                  key={index}
                  onClick={() => handleItemSelected(option, index)}
                >
                  {multiple && (
                    <Checkbox
                      checked={isItem}
                      status={isItem ? status?.selected?.color || status?.color : "light"}
                      disabled
                    />
                  )}
                  <span>{option.text}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <Paragraph color="gray-500" align="center">
            Het hangi bir kayıt bulunumadı!
          </Paragraph>
        )}
      </div>
      {/* {options.length > 0 && (
        
      )} */}
      {/* :End: Options Field */}
    </div>
  );
};

Select.displayName = "Select";

export default Select;

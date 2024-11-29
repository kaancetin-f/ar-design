"use client";

import React, { useEffect, useRef, useState } from "react";
import { Props } from "./Props";
import Input from "../input";
import "../../../assets/css/components/form/select/select.css";
import Chip from "../../data-display/chip";
import Checkbox from "../checkbox";
import Paragraph from "../../data-display/typography/paragraph/Paragraph";
import { Option } from "../../../libs/types/index";
import Utils from "../../../libs/infrastructure/shared/Utils";

const Select: React.FC<Props> = ({
  variant = "outlined",
  status,
  border = { radius: "sm" },
  options,
  value,
  onChange,
  onCreate,
  multiple,
  placeholder,
  disabled,
  validation,
}) => {
  const _selectionClassName: string[] = ["selections"];

  // refs
  const _arSelect = useRef<HTMLDivElement>(null);
  const _singleInput = useRef<HTMLInputElement>(null);
  const _multipleInput = useRef<HTMLDivElement>(null);
  const _options = useRef<HTMLDivElement>(null);
  const _optionItems = useRef<(HTMLLIElement | null)[]>([]);
  const _searchField = useRef<HTMLInputElement>(null);
  let _otoFocus = useRef<NodeJS.Timeout>().current;
  let _navigationIndex = useRef<number>(0);

  // states
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
  let [optionsClassName, setOptionsClassName] = useState<string[]>(["options", "closed"]);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [singleInputText, setSingleInputText] = useState<string>("");
  const [navigationIndex, setNavigationIndex] = useState<number>(0);

  _selectionClassName.push(
    ...Utils.GetClassName(
      variant,
      !Utils.IsNullOrEmpty(validation?.text) ? "danger" : "light",
      border,
      undefined,
      undefined,
      undefined
    )
  );

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
      setSingleInputText("");
    }
  };

  const handleItemSelected = (option: Option) => {
    if (multiple) {
      const hasItem = value.some((item) => item.value === option.value && item.text === option.text);

      if (hasItem) onChange(value.filter((v) => !(v.value === option.value && v.text === option.text)));
      else onChange([...value, option]);
    } else {
      onChange(option);
      setOptionsOpen(false);
    }
  };

  const handleCleanSelection = () => {
    if (multiple) {
      if (_searchField.current) _searchField.current.value = "";
      onChange([]);
    } else {
      if (_singleInput.current) _singleInput.current.value = "";
      onChange(undefined);
    }
  };

  // useEffects
  useEffect(() => {
    if (multiple) {
      setSearchText("");
      if (_searchField.current) _searchField.current.value = "";
    } else {
      if (!_singleInput.current) return;

      if (value) _singleInput.current.value = value.text;
      else _singleInput.current.value = "";
    }
  }, [value]);

  useEffect(() => setFilteredOptions(options), [options]);

  useEffect(() => {
    const screenCenter = window.innerHeight / 2 + 100;
    const rect = _singleInput.current
      ? _singleInput.current.getBoundingClientRect()
      : _multipleInput.current?.getBoundingClientRect();
    const direction = rect && rect.top > screenCenter ? "bottom" : "top";

    setOptionsClassName(["options"]);

    if (optionsOpen) {
      if (!multiple) {
        // const optionItems = _optionItems.current.filter((optionItem) => optionItem !== null);

        // Scroll ile kaydırma işlemi
        // if (_options.current) {
        //   const list = _options.current.querySelector("ul") as HTMLUListElement;

        //   list.scrollTo({
        //     top: optionItems[_selectedItemIndex.current].offsetTop,
        //     behavior: "smooth",
        //   });
        // }

        if (_singleInput.current) {
          _singleInput.current.value = "";
          _singleInput.current.placeholder = value?.text || placeholder || "";
        }
      }

      if (_options.current) {
        _options.current.style.top = `${rect?.bottom}px`;
        _options.current.style.left = `${rect?.left}px`;
        _options.current.style.width = `${rect?.width}px`;
      }

      // Options açıldıktan 100ms sonra arama kutusuna otomatik olarak focus oluyor.
      _otoFocus = setTimeout(() => {
        if (_searchField.current) _searchField.current.focus();
      }, 250);

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
          _singleInput.current.value = value?.text ?? "";
          _singleInput.current.placeholder = placeholder ?? "";
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

  return (
    <div ref={_arSelect} className="ar-select-wrapper">
      {/* :Begin: Select and Multiple Select Field */}
      <div ref={_multipleInput} className="ar-select">
        {multiple ? (
          <div className={_selectionClassName.map((c) => c).join(" ")} onClick={() => setOptionsOpen((x) => !x)}>
            <div className="items">
              {value.length > 0 ? (
                value.map((_value, index) => (
                  <Chip
                    key={index}
                    variant={status?.selected?.variant || "filled"}
                    status={status?.selected?.color || status?.color}
                    text={_value.text}
                  />
                ))
              ) : (
                <span className="placeholder">{placeholder}</span>
              )}
            </div>
          </div>
        ) : (
          <Input
            ref={_singleInput}
            variant={variant}
            status={!Utils.IsNullOrEmpty(validation?.text) ? "danger" : status}
            border={{ radius: border.radius }}
            onClick={() => {
              setOptionsOpen((prev) => !prev);
              setSingleInputText("");
            }}
            onChange={(event) => {
              !optionsOpen && setOptionsOpen(true);
              setSingleInputText(event.target.value);
            }}
            onKeyUp={(event) => {
              if (event.key === "Enter") return;

              setSearchText(event.currentTarget.value);
            }}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}

        <span
          className={`button-clear ${!disabled && (multiple ? value.length > 0 : value) ? "opened" : "closed"}`}
          onClick={(event) => {
            if (disabled) return;

            event.stopPropagation();
            handleCleanSelection();
          }}
        ></span>

        <span
          className={`angel-down ${optionsOpen ? "opened" : "closed"}`}
          onClick={(event) => {
            event.stopPropagation();
            setOptionsOpen((x) => !x);
          }}
        ></span>

        {validation?.text && <span className="validation">{validation.text}</span>}
      </div>
      {/* :End: Select and Multiple Select Field */}

      {/* :Begin: Options Field */}
      <div ref={_options} className={optionsClassName.map((c) => c).join(" ")}>
        {multiple && (
          <div className="search-field">
            <Input
              ref={_searchField}
              variant="outlined"
              status="light"
              placeholder="Search..."
              onKeyUp={(event) => {
                setSearchText(event.currentTarget.value);
              }}
            />
          </div>
        )}

        {filteredOptions.length > 0 ? (
          <ul>
            {filteredOptions.map((option, index) => {
              const isItem = multiple && value.some((_value) => _value.value === option.value);

              return (
                <li
                  key={index}
                  ref={(element) => (_optionItems.current[index] = element)}
                  className={option === value ? "selectedItem" : ""}
                  onClick={() => handleItemSelected(option)}
                >
                  {multiple && <Checkbox checked={isItem} status={isItem ? "primary" : "light"} disabled />}
                  <span>{option.text}</span>
                </li>
              );
            })}
          </ul>
        ) : !onCreate ? (
          <Paragraph color="gray-500" align="center">
            Herhangi bir kayıt bulunumadı!
          </Paragraph>
        ) : (
          <span
            style={{ padding: "1rem", cursor: "pointer" }}
            onClick={() => {
              onCreate({ value: "", text: singleInputText });
              handleItemSelected({ value: "", text: singleInputText });
            }}
          >
            {options.length === 0 && singleInputText.length === 0
              ? "Herhangi bir kayıt bulunumadı!"
              : `${singleInputText} Ekle`}
          </span>
        )}
      </div>
      {/* :End: Options Field */}
    </div>
  );
};

Select.displayName = "Select";

export default Select;

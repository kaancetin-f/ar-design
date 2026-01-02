"use client";

import React, { useEffect, useRef, useState } from "react";
import { Props } from "./Props";
import Input from "../input";
import "../../../assets/css/components/form/select/styles.css";
import Chip from "../../data-display/chip";
import Checkbox from "../checkbox";
import { Option } from "../../../libs/types/index";
import Utils from "../../../libs/infrastructure/shared/Utils";
import ReactDOM from "react-dom";

const Select: React.FC<Props> = ({
  variant = "outlined",
  status,
  color,
  border = { radius: "sm" },
  style,
  options,
  value,
  onChange,
  onSearch,
  onClick,
  onCreate,
  multiple,
  placeholder,
  validation,
  upperCase,
  disabled,
}) => {
  const _selectionClassName: string[] = ["selections"];

  // refs
  const _arSelect = useRef<HTMLDivElement>(null);
  const _singleInput = useRef<HTMLInputElement>(null);
  const _multipleInput = useRef<HTMLDivElement>(null);
  const _placeholder = useRef<HTMLSpanElement>(null);
  const _options = useRef<HTMLDivElement>(null);
  const _optionItems = useRef<(HTMLLIElement | null)[]>([]);
  const _searchField = useRef<HTMLInputElement>(null);
  // const _searchTimeOut = useRef<NodeJS.Timeout | null>(null);
  let _otoFocus = useRef<NodeJS.Timeout>().current;
  let _navigationIndex = useRef<number>(0);

  // states
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [isSearchTextEqual, setIsSearchTextEqual] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [singleInputText, setSingleInputText] = useState<string>("");
  const [navigationIndex, setNavigationIndex] = useState<number>(0);

  _selectionClassName.push(
    ...Utils.GetClassName(
      variant,
      undefined,
      validation?.text ? "red" : "light",
      border,
      undefined,
      undefined,
      undefined
    )
  );

  // methods
  const handleClickOutSide = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (_arSelect.current && !_arSelect.current.contains(target)) setOptionsOpen(false);
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
    } else if (key === "Escape") setOptionsOpen(false);
  };

  // const handleSearch = (value: string) => {
  //   if (searchText.length === 0 || !onSearch) return;
  //   if (_searchTimeOut.current) clearTimeout(_searchTimeOut.current);

  //   _searchTimeOut.current = setTimeout(() => {
  //     setSearchText(value);
  //     onSearch(value);
  //   }, 750);
  // };

  const handlePosition = () => {
    if (_options.current) {
      const optionRect = _options.current.getBoundingClientRect();
      const InpuRect = _singleInput.current
        ? _singleInput.current.getBoundingClientRect()
        : _multipleInput.current?.getBoundingClientRect();

      if (InpuRect) {
        const screenCenter = window.innerHeight / 2;
        const sx = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft;
        const sy = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

        _options.current.style.visibility = "visible";
        _options.current.style.opacity = "1";
        _options.current.style.top = `${
          (InpuRect.top > screenCenter
            ? InpuRect.top - optionRect.height - (multiple ? 0 : 5)
            : InpuRect.top + InpuRect.height) + sy
        }px`;
        _options.current.style.left = `${InpuRect.left + sx}px`;
        _options.current.style.minWidth = "200px";
        _options.current.style.width = `${InpuRect.width}px`;
      }
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
      if (_searchField.current) setSearchText("");

      onChange([]);
    } else {
      if (_singleInput.current) {
        setSingleInputText("");
        _singleInput.current.placeholder = `${validation ? "* " : ""}${placeholder ?? ""}`;
      }

      onChange(undefined);
    }

    setOptionsOpen(false);
  };

  const createField = () => {
    if (!onCreate) return;

    return (
      <div
        className="no-options-field"
        onClick={(event) => {
          event.stopPropagation();
          onCreate({ value: "", text: singleInputText });
          setOptionsOpen(false);
        }}
      >
        {options.length === 0 && (singleInputText.length === 0 || searchText.length === 0) ? (
          <span className="text">Herhangi bir kayıt bulunumadı.</span>
        ) : (
          <span className="add-item">
            <span className="plus">+</span>
            {singleInputText.length !== 0 ? singleInputText : searchText}
          </span>
        )}
      </div>
    );
  };

  // Özel büyük harfe dönüştürme işlevi.
  const convertToUpperCase = (str: string) => {
    return str
      .replace(/ş/g, "S")
      .replace(/Ş/g, "S")
      .replace(/ı/g, "I")
      .replace(/I/g, "I")
      .replace(/ç/g, "C")
      .replace(/Ç/g, "C")
      .replace(/ğ/g, "G")
      .replace(/Ğ/g, "G")
      .replace(/ö/g, "O")
      .replace(/Ö/g, "O")
      .replace(/ü/g, "U")
      .replace(/Ü/g, "U")
      .replace(/[a-z]/g, (match) => match.toUpperCase());
  };

  // useEffects
  useEffect(() => {
    if (multiple) setSearchText("");
    else setSingleInputText(value?.text ?? "");
  }, [value]);

  useEffect(() => setFilteredOptions(options), [options]);

  useEffect(() => {
    if (optionsOpen) {
      setTimeout(() => handlePosition(), 0);

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
          setSingleInputText("");
          _singleInput.current.placeholder = value?.text || `${validation ? "* " : ""}${placeholder ?? ""}` || "";
        }
      }

      // Options açıldıktan 100ms sonra arama kutusuna otomatik olarak focus oluyor.
      _otoFocus = setTimeout(() => {
        if (_searchField.current) _searchField.current.focus();
      }, 250);

      // Options paneli için olay dinleyileri ekleniyor.
      window.addEventListener("blur", () => setOptionsOpen(false));
      document.addEventListener("click", handleClickOutSide);
      document.addEventListener("keydown", handleKeys);
    } else {
      // Options paneli kapanma süresi 250ms.
      // 300ms sonra temizlenmesinin sebebi kapanırken birder veriler gerliyor ve panel yüksekliği artıyor.
      setTimeout(() => setSearchText(""), 300);

      if (multiple) {
        if (_searchField.current) _searchField.current.value = "";
      } else {
        if (_singleInput.current) {
          setSingleInputText(value?.text ?? "");
          _singleInput.current.placeholder = `${validation ? "* " : ""}${placeholder ?? ""}`;
        }
      }
    }

    return () => {
      clearTimeout(_otoFocus);

      window.removeEventListener("blur", () => setOptionsOpen(false));
      document.removeEventListener("click", handleClickOutSide);
      document.removeEventListener("keydown", handleKeys);
    };
  }, [optionsOpen]);

  useEffect(() => {
    if (searchText.length > 0 && onSearch) {
      onSearch(searchText);
    } else {
      // Arama kriterlerine uygun olan değerleri bir state e gönderiyoruz.
      setFilteredOptions(
        options?.filter((option) => {
          if (!optionsOpen) return option;

          return option.text.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
        })
      );
      setIsSearchTextEqual(
        options?.some((option) => {
          if (!optionsOpen) return option;

          return option.text.toLocaleLowerCase() == searchText.toLocaleLowerCase();
        })
      );
    }

    // Arama yapılması durumunda değerleri sıfırla.
    setNavigationIndex(0);
    _navigationIndex.current = 0;

    // Arama yapılması durumunda arama sonuçlarından ilk olan değeri işaretle.
    const optionItems = _optionItems.current.filter((optionItem) => optionItem !== null);
    optionItems[_navigationIndex.current]?.classList.add("navigate-with-arrow-keys");

    // Yeniden konumlandır.
    setTimeout(() => handlePosition(), 0);
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
          <div className="wrapper">
            <div
              {...(value.length > 0
                ? {
                    style: {
                      clipPath: `polygon(
                            -15px 0,
                            10px -5px,
                            10px 5px,
                            calc(${_placeholder.current?.getBoundingClientRect().width}px + 7px) 5px,
                            calc(${_placeholder.current?.getBoundingClientRect().width}px + 7px) -5px,
                            100% -70px,
                            calc(100% + 5px) calc(100% + 5px),
                            -5px calc(100% + 5px)
                          )`,
                    },
                  }
                : {})}
              className={_selectionClassName.map((c) => c).join(" ")}
              onClick={() => {
                onClick && onClick();

                (() => {
                  setOptionsOpen((prev) => !prev);
                })();
              }}
            >
              <div className="items">
                {value.map((_value, index) => (
                  <Chip
                    key={index}
                    variant={status?.selected?.variant || "filled"}
                    color={status?.selected?.color || status?.color}
                    text={_value.text}
                  />
                ))}
              </div>
            </div>

            <span
              ref={_placeholder}
              className={`placeholder ${value.length > 0 ? "visible" : "hidden"}`}
              onClick={() => setOptionsOpen((prev) => !prev)}
            >
              {validation ? "* " : ""}
              {placeholder}
            </span>
          </div>
        ) : (
          <Input
            ref={_singleInput}
            style={style}
            variant={variant}
            color={!Utils.IsNullOrEmpty(validation?.text) ? "red" : color}
            // status={!Utils.IsNullOrEmpty(validation?.text) ? "danger" : status}
            border={{ radius: border.radius }}
            value={singleInputText}
            onClick={() => {
              onClick && onClick();

              (() => {
                setOptionsOpen((prev) => !prev);
              })();
            }}
            onChange={(event) => {
              !optionsOpen && setOptionsOpen(true);

              if (upperCase) event.target.value = convertToUpperCase(event.target.value);

              setSingleInputText(event.target.value);
            }}
            onKeyUp={(event) => {
              if (event.key === "Enter") return;

              setSearchText(event.currentTarget.value);
            }}
            placeholder={placeholder}
            validation={validation}
            disabled={disabled}
          />
        )}

        <div className="buttons">
          <span
            className={`button-clear ${!disabled && (multiple ? value.length > 0 : value) ? "opened" : "closed"}`}
            onClick={(event) => {
              if (disabled) return;

              event.stopPropagation();
              handleCleanSelection();
            }}
          ></span>

          <span
            className={`angel-down ${!disabled && optionsOpen ? "opened" : "closed"}`}
            onClick={(event) => {
              if (disabled) return;

              event.stopPropagation();
              setOptionsOpen((x) => !x);
            }}
          ></span>
        </div>

        {multiple && validation && <span className="validation">{validation.text}</span>}
      </div>
      {/* :End: Select and Multiple Select Field */}

      {/* :Begin: Options Field */}
      {!disabled &&
        optionsOpen &&
        ReactDOM.createPortal(
          <div ref={_options} className="ar-select-options">
            {multiple && (
              <div className="search-field">
                <Input
                  ref={_searchField}
                  variant="outlined"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  onClick={(event) => event.stopPropagation()}
                />
              </div>
            )}

            {filteredOptions.length > 0 ? (
              <ul>
                {onCreate && !isSearchTextEqual && searchText.length > 0 && <li>{createField()}</li>}

                {filteredOptions.map((option, index) => {
                  const isItem = multiple && value.some((_value) => _value.value === option.value);

                  return (
                    <li
                      key={index}
                      ref={(element) => (_optionItems.current[index] = element)}
                      className={option === value ? "selectedItem" : ""}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleItemSelected(option);
                      }}
                    >
                      {multiple && <Checkbox checked={isItem} color={isItem ? "blue" : "light"} disabled />}
                      <span>{option.text}</span>
                    </li>
                  );
                })}
              </ul>
            ) : !onCreate ? (
              <div className="no-options-field">
                <span className="text">Herhangi bir kayıt bulunumadı.</span>
              </div>
            ) : (
              createField()
            )}
          </div>,
          document.body
        )}
      {/* :End: Options Field */}
    </div>
  );
};

Select.displayName = "Select";

export default Select;

"use client";

import React, { ChangeEvent, useMemo, useRef, useState } from "react";
import Input from "../input";
import IProps from "./IProps";

const InputNumber: React.FC<IProps> = ({ ...attributes }: IProps) => {
  // refs
  const _input = useRef<HTMLInputElement | null>(null);
  const _caretPosition = useRef<number | null>(null);
  const _isInputTouch = useRef<boolean>(false);

  // states
  const [value, setValue] = useState<string | null>(null);

  // methods
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    const caret = _input.current?.selectionStart ?? 0;
    _caretPosition.current = caret;

    if (value.length === 0) _isInputTouch.current = false;

    // Temizle.
    const cleanedValue = (value = value.replace(/[^0-9,]/g, ""));

    // Numara olarak çevir.
    const normalized = value.replace(/\./g, "").replace(",", ".");
    const parsed = parseFloat(normalized);
    const numberValue = isNaN(parsed) ? 0 : parsed;

    // Formatla ve Kullanıcı , (virgül) girdiyse kuruş göster.
    const isDecimals = cleanedValue.includes(",");
    let formatted = numberValue === 0 && cleanedValue === "" ? "" : formatter(isDecimals).format(numberValue);

    // if (isDecimals) {
    //   const [_, digits] = formatted.split(",");

    //   if (digits && digits.length > 2) formatted = formatted.slice(0, -1);
    // }

    setValue(formatted);

    setTimeout(() => {
      requestAnimationFrame(() => {
        if (!_input.current || _caretPosition.current == null) return;
        if (isDecimals) _isInputTouch.current = false;

        _caretPosition.current += formatted.length > value.length && !_isInputTouch.current ? 1 : 0;

        _input.current?.setSelectionRange(_caretPosition.current, _caretPosition.current);
      });
    }, 0);
  };

  const handleClick = () => {
    const caret = _input.current?.selectionStart ?? 0;
    _caretPosition.current = caret;

    if (_input.current && _input.current.value.length > 3) _isInputTouch.current = true;
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(event.code)) return;

    if (_input.current && _input.current.value.length > 3) _isInputTouch.current = true;
  };

  const formatter = useMemo(() => {
    return (isDecimals: boolean) =>
      new Intl.NumberFormat("tr-TR", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: isDecimals ? 2 : 0,
      });
  }, []);

  return (
    <Input
      ref={_input}
      {...attributes}
      value={value ?? attributes.value}
      onChange={(event) => {
        // Disabled gelmesi durumunda işlem yapmasına izin verme...
        if (attributes.disabled) return;

        (() => {
          handleChange(event);
        })();

        (() => {
          if (attributes.onChange) {
            const { value } = event.target;
            const newValue = value.replaceAll(".", "");

            attributes.onChange({
              ...event,
              target: {
                ...event.target,
                id: event.target.id,
                name: event.target.name,
                value: newValue,
                type: event.target.type,
              },
            });
          }
        })();
      }}
      onClick={handleClick}
      onKeyUp={handleKeyUp}
      type="text"
      inputMode="decimal"
    />
  );
};

export default InputNumber;

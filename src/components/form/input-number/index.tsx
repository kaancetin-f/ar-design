"use client";

import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import Input from "../input";
import IProps from "./IProps";

const InputNumber: React.FC<IProps> = ({
  variant,
  color,
  name,
  value,
  onChange,
  digits,
  placeholder,
  validation,
  disabled,
}: IProps) => {
  // refs
  const _firstLoad = useRef<boolean>(false);
  const _input = useRef<HTMLInputElement | null>(null);

  // states
  const [_value, setValue] = useState<string | number | readonly string[] | undefined>("");

  // methods
  const handleClick = () => {
    const input = _input.current;

    if (!input) return;

    const caret = input.selectionStart ?? 0;
    input.setSelectionRange(caret, caret + 1);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = _input.current;

    if (!input) return;

    const caret = input.selectionStart ?? 0;

    if (event.code === "ArrowRight") {
      input.setSelectionRange(caret, caret + 1);
    } else if (event.code === "ArrowLeft" && caret > 0) {
      input.setSelectionRange(caret - 1, caret);
    } else if (["ArrowUp", "ArrowDown"].includes(event.code)) {
      input.setSelectionRange(caret, caret + 1);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;

    // Temizle.
    const cleanedValue = (value = value.replace(/[^0-9,]/g, ""));

    // Numara olarak çevir.
    const normalized = parseCurrencySmart(value);
    const isDecimals = cleanedValue.includes(",");
    const parsedDecimal = parseFloat(normalized);
    const newValue = isNaN(parsedDecimal) ? 0 : parsedDecimal;

    // Formatla ve Kullanıcı , (virgül) girdiyse kuruş göster.
    let formatted = newValue === 0 && cleanedValue === "" ? "" : getFormatter(isDecimals).format(newValue);

    setValue(formatted);
    onChange?.({ ...event, target: { ...event.target, name: name, value: normalized } });
  };

  const getFormatter = useMemo(() => {
    return (isDecimals: boolean) =>
      new Intl.NumberFormat("tr-TR", {
        style: "decimal",
        minimumFractionDigits: digits?.minimum ?? 0,
        maximumFractionDigits: isDecimals ? digits?.maximum ?? 2 : 0,
      });
  }, [digits]);

  const parseCurrencySmart = (input: string) => {
    if (input.includes(",") && input.includes(".")) {
      // Nokta binlik, virgül ondalık (tr-TR, de-DE gibi)
      return input.replace(/\./g, "").replace(",", ".");
    } else if (input.includes(",") && !input.includes(".")) {
      // Virgül ondalık, binlik yok (fr-FR gibi)
      return input.replace(",", ".");
    } else if (input.includes(".") && !input.includes(",")) {
      // Nokta ondalık, binlik yok veya US format
      return input.replace(/,/g, "");
    } else {
      // Hiçbiri yok, zaten sayı
      return input;
    }
  };

  // useEffects
  useEffect(() => {
    if (!_firstLoad.current && value !== undefined && value !== "") {
      const isDecimals = String(value).includes(".");
      setValue(getFormatter(isDecimals).format(Number(value)));
      _firstLoad.current = true;
    }
  }, [value]);

  return (
    <Input
      ref={_input}
      name={name}
      variant={variant}
      color={color}
      value={_value ?? ""}
      type="text"
      inputMode="decimal"
      onChange={(event) => {
        // Disabled gelmesi durumunda işlem yapmasına izin verme...
        if (disabled) return;

        handleChange(event);
      }}
      onClick={handleClick}
      onKeyUp={handleKeyUp}
      placeholder={placeholder}
      validation={validation}
    />
  );
};

export default InputNumber;

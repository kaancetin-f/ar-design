"use client";

import React, { ChangeEvent, useMemo, useRef, useState } from "react";
import Input from "../input";
import IProps from "./IProps";

const InputNumber: React.FC<IProps> = ({ ...attributes }: IProps) => {
  // refs
  const _input = useRef<HTMLInputElement | null>(null);
  const _caretPosition = useRef<number | null>(null);

  // states
  const [value, setValue] = useState<string | null>(null);

  // methods
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;

    // Temizle.
    const cleanedValue = (value = value.replace(/[^0-9,]/g, ""));

    // Numara olarak çevir.
    const normalized = value.replace(/\./g, "").replace(",", ".");
    const parsed = parseFloat(normalized);
    const numberValue = isNaN(parsed) ? 0 : parsed;

    // Formatla ve Kullanıcı , (virgül) girdiyse kuruş göster.
    const isDecimals = cleanedValue.includes(",");
    const formatted = numberValue === 0 && cleanedValue === "" ? "" : formatter(isDecimals).format(numberValue);

    setValue(formatted);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const caretPosition = event.currentTarget.selectionStart ?? 0;

    _caretPosition.current = caretPosition;
  };

  const formatter = useMemo(() => {
    return (isDecimals: boolean) =>
      new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: isDecimals ? 2 : 0,
        maximumFractionDigits: 2,
      });
  }, []);

  return (
    <Input
      ref={_input}
      {...attributes}
      value={value ?? ""}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      type="text"
      inputMode="decimal"
    />
  );
};

export default InputNumber;

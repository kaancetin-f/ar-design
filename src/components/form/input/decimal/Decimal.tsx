"use client";

import React, { ChangeEvent, useRef, useState, useEffect } from "react";
import Input from "..";
import IProps from "./IProps";

const Decimal: React.FC<IProps> = ({ variant, color, name, value, onChange, placeholder, validation, disabled }) => {
  // refs
  const _input = useRef<HTMLInputElement | null>(null);

  // states
  const [_value, setValue] = useState<string>("");

  // methods
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/[^0-9.]/g, "");

    const parts = inputValue.split(".");
    if (parts.length > 2) {
      inputValue = parts[0] + "." + parts.slice(1).join("");
    }

    setValue(inputValue);

    onChange?.({
      ...event,
      target: {
        ...event.target,
        name,
        value: inputValue,
      },
    });
  };

  // useEffects
  useEffect(() => {
    if (value === undefined || value === null) {
      setValue("");
    } else {
      setValue(String(value));
    }
  }, [value]);

  return (
    <Input
      ref={_input}
      name={name}
      variant={variant}
      color={color}
      type="text"
      inputMode="decimal"
      value={_value}
      onChange={(e) => {
        if (disabled) return;

        handleChange(e);
      }}
      placeholder={placeholder}
      validation={validation}
      disabled={disabled}
    />
  );
};

export default Decimal;

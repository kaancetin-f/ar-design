"use client";

import React, { ChangeEvent, useRef, useCallback } from "react";
import Input from "..";
import IProps from "./IProps";

const Otp = ({ character, onChange, ...attributes }: IProps) => {
  // refs
  const _inputs = useRef<(HTMLInputElement | null)[]>([]);
  const _value = useRef<Record<number, string>>({});

  // methods
  const handleChange = useCallback(
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      if (attributes.disabled) return;

      let { value } = event.target;
      value = value.replace(/\D/g, "");

      _value.current = { ..._value.current, [index]: value };

      onChange?.({
        ...event,
        target: {
          ...event.target,
          name: attributes.name ?? "",
          value: Object.keys(_value.current)
            .sort((a, b) => Number(a) - Number(b))
            .map((key) => _value.current[Number(key)])
            .join(""),
        },
      });
    },
    [onChange, attributes.name, attributes.disabled]
  );

  const handleKeyUp = useCallback(
    (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;

      if (value.length >= 1 && event.key >= "0" && event.key <= "9") {
        _inputs.current[index + 1]?.focus();
        _inputs.current[index + 1]?.select();
      }

      if (event.key === "ArrowLeft") {
        _inputs.current[index - 1]?.focus();
        _inputs.current[index - 1]?.select();
      } else if (event.key === "ArrowRight") {
        _inputs.current[index + 1]?.focus();
        _inputs.current[index + 1]?.select();
      }

      if (event.key === "Backspace" && value.length === 0) {
        _inputs.current[index - 1]?.focus();
        _inputs.current[index - 1]?.select();
      }
    },
    []
  );

  const handleClick = useCallback((event: React.MouseEvent<HTMLInputElement>) => {
    const input = event.currentTarget;

    if (document.activeElement === input) input.select();
  }, []);

  return (
    <div className="ar-input-otp-wrapper">
      {Array.from({ length: character }, (_, index) => (
        <span key={index}>
          <Input
            ref={(el) => {
              _inputs.current[index] = el;
            }}
            {...attributes}
            value={_value.current[index] ?? ""}
            onChange={handleChange(index)}
            onKeyUp={handleKeyUp(index)}
            onFocus={(event) => event.target.select()}
            onClick={handleClick}
            size={1}
            placeholder={undefined}
            autoFocus={index === 0}
            autoComplete="off"
          />
        </span>
      ))}
    </div>
  );
};

Otp.displayName = "Input.Otp";
export default Otp;

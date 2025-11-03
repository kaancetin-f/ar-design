"use client";

import React, { useRef, useCallback, FormEvent } from "react";
import Input from "..";
import IProps from "./IProps";

const Otp = ({ character, onChange, ...attributes }: IProps) => {
  // refs
  const _inputs = useRef<(HTMLInputElement | null)[]>([]);
  const _value = useRef<Record<number, string>>({});

  // methods
  const handleInput = useCallback(
    (index: number) => (event: FormEvent<HTMLInputElement>) => {
      if (attributes.disabled) return;

      let { value } = event.currentTarget;
      _value.current = { ..._value.current, [index]: value };

      if (value.length >= 1) {
        _inputs.current[index + 1]?.focus();
        _inputs.current[index + 1]?.select();
      }

      onChange?.({
        ...event,
        target: {
          ...event.currentTarget,
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
      const input = event.currentTarget;
      const { value } = input;
      const lastChar = value.slice(-1);

      event.currentTarget.value = lastChar;

      if (event.key === "Backspace" && value.length === 0) {
        _inputs.current[index - 1]?.focus();
        _inputs.current[index - 1]?.select();
      }
    },
    []
  );

  const handleKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (index === 0 && (event.key === "ArrowDown" || event.key === "ArrowLeft")) event.preventDefault();
    if (index + 1 >= character && (event.key === "ArrowUp" || event.key === "ArrowRight")) event.preventDefault();

    if (!/[0-9]/.test(event.key) && event.key.length === 1) event.preventDefault();

    if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
      _inputs.current[index - 1]?.focus();
      setTimeout(() => _inputs.current[index - 1]?.select(), 0);
    } else if (event.key === "ArrowUp" || event.key === "ArrowRight") {
      _inputs.current[index + 1]?.focus();
      setTimeout(() => _inputs.current[index + 1]?.select(), 0);
    }
  };

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
            onInput={handleInput(index)}
            onKeyUp={handleKeyUp(index)}
            onKeyDown={handleKeyDown(index)}
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

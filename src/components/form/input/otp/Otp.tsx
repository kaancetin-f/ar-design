"use client";

import React, { useRef, useCallback, FormEvent } from "react";
import Input from "..";
import IProps from "./IProps";

const Otp = ({ character, onChange, ...attributes }: IProps) => {
  // refs
  const _inputs = useRef<(HTMLInputElement | null)[]>([]);
  const _isPasteCombo = useRef<boolean>(false);
  const _value = useRef<Record<number, string>>({});

  // methods
  const handleInput = useCallback(
    (index: number) => (event: FormEvent<HTMLInputElement>) => {
      if (attributes.disabled) return;
      if (_isPasteCombo.current) return;

      let { value } = event.currentTarget;
      _value.current = { ..._value.current, [index]: value };

      if (value.length >= 1) {
        if (!_inputs.current[index + 1]) {
          _inputs.current[character - 1]?.focus();
          _inputs.current[character - 1]?.select();

          return;
        }

        _inputs.current[index + 1]?.focus();
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
      const beforeInput = _inputs.current[index] as HTMLInputElement;
      // referans
      const beforeInputValue = beforeInput.value;

      if (beforeInputValue.length > 1) {
        let i = 0;
        const chars = beforeInputValue.split("");

        const interval = setInterval(() => {
          const input = _inputs.current[i];

          if (input) {
            input.value = chars[i];
            input.focus();
          }

          i++;
          if (i >= chars.length) clearInterval(interval);
        }, 50);

        return;
      }

      const lastChar = value.slice(-1);
      event.currentTarget.value = lastChar;

      if (event.key === "Backspace" && value.length === 0) {
        _inputs.current[index - 1]?.focus();
      }
    },
    []
  );

  const handleKeyDown = useCallback(
    (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      _isPasteCombo.current = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "v";
      if (_isPasteCombo.current) return;

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
    },
    [character]
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

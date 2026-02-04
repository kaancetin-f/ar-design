"use client";

import React, { useEffect, useRef, useState } from "react";
import Input from "..";
import IProps from "./IProps";
import Select from "../../select";
import { Option } from "../../../../libs/types";
import PHONE from "../../../../libs/infrastructure/shared/PHONE";

const Phone: React.FC<IProps> = ({
  variant,
  color,
  options,
  values,
  onSelected,
  validation,
  ...attributes
}: IProps) => {
  // refs
  const _input = useRef<HTMLInputElement | null>(null);

  // states
  const [_value, setValue] = useState<string | number | readonly string[] | undefined>("");
  const [selected, setSelected] = useState<Option | undefined>(undefined);

  // methods
  const handleClick = () => {
    const input = _input.current;

    if (!input) return;

    const caret = input.selectionStart ?? 0;
    input.setSelectionRange(caret, caret + 1);
  };

  // useEffects
  useEffect(() => {
    setValue(values.value);
    setSelected(options?.find((option) => option.value === values.option));
  }, [values]);

  return (
    <div className="ar-input-phone-wrapper">
      {options && (
        <Select
          style={{ width: 130 }}
          variant="outlined"
          color="light"
          options={options}
          value={selected}
          onChange={(option) => {
            onSelected?.(option);
            setSelected(option);
          }}
        />
      )}

      <Input
        ref={_input}
        {...attributes}
        {...(!options ? { style: { borderRadius: "var(--border-radius-sm)" } } : {})}
        variant={variant}
        color={color}
        value={PHONE.FormatByMask(selected?.value as string, _value as string)}
        type="tel"
        inputMode="decimal"
        onChange={(event) => {
          if (attributes.disabled) return;

          (() => {
            if (attributes.onChange) {
              const { id, name, value, type, dataset } = event.target;

              attributes.onChange({
                ...event,
                target: {
                  ...event.target,
                  id: id,
                  name: name,
                  value: value,
                  type: type,
                  dataset: dataset,
                },
              });
            }
          })();
        }}
        onClick={handleClick}
        validation={validation}
      />
    </div>
  );
};

export default Phone;

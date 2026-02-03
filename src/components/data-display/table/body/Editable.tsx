"use client";

import React, { useEffect, useState } from "react";
import Input from "../../../form/input";
import DatePicker from "../../../form/date-picker";
import { Errors, Option, TableColumnType } from "../../../../libs/types";
import Select from "../../../form/select";

interface IProps<T> {
  c: TableColumnType<T>;
  item: T;
  trackByValue: string;
  onEditable: (item: T, trackByValue: string) => void;
  validation?: Errors<T>;
}

const Editable = function <T>({ c, item, trackByValue, onEditable, validation }: IProps<T>) {
  // variables
  const key = c.key as keyof T;
  const itemValue = item[c.key as keyof T];
  const selectItem = c.editable?.options?.find((x) => x.value === itemValue);
  const selectItems = Array.isArray(itemValue)
    ? (c.editable?.options?.filter((x) => itemValue.includes(x.value)) as Option[])
    : [];
  const _vText = validation?.[`${c.key as string}_${trackByValue}` as keyof typeof validation];

  // states
  const [_value, setValue] = useState<string | number | readonly string[] | undefined>(itemValue as string);

  // useEffects
  useEffect(() => setValue(itemValue as string), [item]);

  switch (c.editable?.type) {
    case "string":
    case "number":
      return (
        <Input
          variant="borderless"
          value={_value}
          onChange={(event) => {
            const { value } = event.target;

            setValue(value);
            onEditable({ ...item, [key]: c.editable?.type === "number" ? Number(value) : value } as T, trackByValue);
          }}
          validation={{ text: _vText }}
        />
      );
    case "decimal":
      return (
        <Input.Decimal
          variant="borderless"
          name={c.key as string}
          value={_value}
          onChange={(event) => {
            const { value } = event.target;

            setValue(value);
            onEditable({ ...item, [key]: value } as T, trackByValue);
          }}
          validation={{ text: _vText }}
        />
      );
    case "input-formatted-decimal":
      return (
        <Input.FormattedDecimal
          variant="borderless"
          name={c.key as string}
          value={_value}
          onChange={(event) => {
            const { value } = event.target;

            setValue(value);
            onEditable({ ...item, [key]: value } as T, trackByValue);
          }}
          validation={{ text: _vText }}
        />
      );
    case "date-picker":
      return (
        <DatePicker
          variant="borderless"
          value={_value}
          onChange={(value) => {
            setValue(value);
            onEditable({ ...item, [key]: value } as T, trackByValue);
          }}
          validation={{ text: _vText }}
        />
      );
    case "single-select":
      return (
        <Select
          variant="borderless"
          value={selectItem}
          options={c.editable.options as Option[]}
          onClick={async () => await c.editable?.method?.()}
          onChange={(option) => {
            onEditable({ ...item, [key]: option?.value } as T, trackByValue);
          }}
          validation={{ text: _vText }}
        />
      );
    case "multiple-select":
      return (
        <Select
          variant="borderless"
          value={selectItems}
          options={c.editable.options as Option[]}
          onClick={async () => await c.editable?.method?.()}
          onChange={(options) => {
            onEditable({ ...item, [key]: options.map((option) => option.value) } as T, trackByValue);
          }}
          validation={{ text: _vText }}
          multiple
        />
      );
    default:
      return null;
  }
};

export default Editable;

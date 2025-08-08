"use client";

import React, { useState } from "react";
import Input from "../../form/input";
import DatePicker from "../../form/date-picker";
import { Option, TableColumnType } from "../../../libs/types";
import Select from "../../form/select";
import InputNumber from "../../form/input-number";

interface IProps<T> {
  c: TableColumnType<T>;
  item: T;
  index: number;
  onEditable: (item: T, index: number) => void;
}

const Editable = function <T>({ c, item, index, onEditable }: IProps<T>) {
  const key = c.key as keyof T;
  const itemValue = item[c.key as keyof T];
  const selectItem = c.editable?.options?.find((x) => x.value === itemValue);
  const selectItems = Array.isArray(itemValue)
    ? (c.editable?.options?.filter((x) => itemValue.includes(x.value)) as Option[])
    : [];

  // states
  const [value, setValue] = useState<string | number | readonly string[] | undefined>(itemValue as string);

  switch (c.editable?.type) {
    case "string":
    case "number":
      return (
        <Input
          variant="borderless"
          value={value}
          onChange={(event) => {
            const { value } = event.target;

            setValue(value);
            onEditable({ ...item, [key]: c.editable?.type === "number" ? Number(value) : value } as T, index);
          }}
        />
      );
    case "input-number":
      return (
        <InputNumber
          variant="borderless"
          name={c.key as string}
          value={value}
          onChange={(event) => {
            const { value } = event.target;

            setValue(value);
            onEditable({ ...item, [key]: c.editable?.type === "number" ? Number(value) : value } as T, index);
          }}
        />
      );
    case "date-picker":
      return (
        <DatePicker
          variant="borderless"
          value={value}
          onChange={(value) => {
            setValue(value);
            onEditable({ ...item, [key]: value } as T, index);
          }}
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
            onEditable({ ...item, [key]: option?.value } as T, index);
          }}
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
            onEditable({ ...item, [key]: options.map((option) => option.value) } as T, index);
          }}
          multiple
        />
      );
    default:
      return null;
  }
};

export default Editable;

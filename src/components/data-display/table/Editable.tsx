"use client";

import React, { useState } from "react";
import Input from "../../form/input";
import DatePicker from "../../form/date-picker";
import { Option, TableColumnType } from "../../../libs/types";
import Select from "../../form/select";

interface IProps<T> {
  c: TableColumnType<T>;
  item: T;
  onEditable: (item: T) => void;
}

const Editable = function <T>({ c, item, onEditable }: IProps<T>) {
  const key = c.key as keyof T;
  const itemValue = item[c.key as keyof T];
  const selectItem = c.editable?.options?.find((x) => x.value === itemValue);
  const selectItems = Array.isArray(itemValue)
    ? (c.editable?.options?.filter((x) => itemValue.includes(x.value)) as Option[])
    : [];

  // states
  const [value, setValue] = useState<string | number | readonly string[] | undefined>(itemValue as string);
  const [selectionItem, setSelectionItem] = useState<Option | undefined>(selectItem);
  const [selectionItems, setSelectionItems] = useState<Option[]>(selectItems);

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
            onEditable({ ...item, [key]: c.editable?.type === "number" ? Number(value) : value } as T);
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
            onEditable({ ...item, [key]: value } as T);
          }}
        />
      );
    case "single-select":
      return (
        <Select
          variant="borderless"
          value={selectionItem}
          options={c.editable.options as Option[]}
          onClick={async () => await c.editable?.method?.()}
          onChange={(option) => {
            setSelectionItem(option);
            onEditable({ ...item, [key]: option?.value } as T);
          }}
        />
      );
    case "multiple-select":
      return (
        <Select
          variant="borderless"
          value={selectionItems}
          options={c.editable.options as Option[]}
          onClick={async () => await c.editable?.method?.()}
          onChange={(options) => {
            setSelectionItems(options);
            onEditable({ ...item, [key]: options.map((option) => option.value) } as T);
          }}
          multiple
        />
      );
    default:
      return null;
  }
};

export default Editable;

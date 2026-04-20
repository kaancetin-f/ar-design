"use client";

import React, { useEffect, useState } from "react";
import Input from "../../../form/input";
import DatePicker from "../../../form/date-picker";
import { Option, TableColumnType } from "../../../../libs/types";
import Select from "../../../form/select";
import { Config } from "../IProps";
import { ExtractKey } from "../Helpers";

interface IProps<T extends object> {
  c: TableColumnType<T>;
  item: T;
  trackByValue: string;
  onEditable: (item: T, trackByValue: string, currentKey?: keyof T | null) => void;
  config: Config<T>;
}

const Editable = function <T extends object>({ c, item, trackByValue, onEditable, config }: IProps<T>) {
  // variables
  const key = c.key as keyof T;
  const itemValue = item[c.key as keyof T];
  const selectItem = c.editable?.(item)?.options?.find((x) => x.value === itemValue);
  const selectItems = Array.isArray(itemValue)
    ? (c.editable?.(item)?.options?.filter((x) => itemValue.includes(x.value)) as Option[])
    : [];
  const validation = config.validation;
  const _vText = validation?.errors?.[`${c.key as string}_${trackByValue}` as keyof typeof validation.errors];

  // states
  const [_value, setValue] = useState<string | number | readonly string[] | undefined>(itemValue as string);

  // useEffects
  useEffect(() => setValue(itemValue as string), [item]);

  switch (c.editable?.(item)?.type) {
    case "string":
    case "number":
      return (
        <Input
          variant="borderless"
          value={_value}
          onChange={(event) => {
            const { value } = event.target;

            setValue(value);
            onEditable(
              { ...item, [key]: c.editable?.(item)?.type === "number" ? Number(value) : value } as T,
              trackByValue,
              ExtractKey(c.key),
            );
          }}
          validation={{ text: _vText }}
          {...(c.editable?.(item).where ? { disabled: c.editable?.(item).where } : {})}
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
            onEditable({ ...item, [key]: value } as T, trackByValue, ExtractKey(c.key));
          }}
          validation={{ text: _vText }}
          locale={config.locale}
          {...(c.editable?.(item).where ? { disabled: c.editable?.(item).where } : {})}
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
            onEditable({ ...item, [key]: value } as T, trackByValue, ExtractKey(c.key));
          }}
          validation={{ text: _vText }}
          locale={config.locale}
          {...(c.editable?.(item).where ? { disabled: c.editable?.(item).where } : {})}
        />
      );
    case "date-picker":
      return (
        <DatePicker
          variant="borderless"
          value={_value}
          onChange={(value) => {
            setValue(value);
            onEditable({ ...item, [key]: value } as T, trackByValue, ExtractKey(c.key));
          }}
          validation={{ text: _vText }}
          {...(c.editable?.(item).where ? { disabled: c.editable?.(item).where } : {})}
        />
      );
    case "single-select":
      return (
        <Select
          variant="borderless"
          value={selectItem}
          options={c.editable?.(item).options as Option[]}
          onClick={async () => await c.editable?.(item)?.method?.()}
          onChange={(option) => {
            onEditable({ ...item, [key]: option?.value } as T, trackByValue, ExtractKey(c.key));
          }}
          validation={{ text: _vText }}
          {...(c.editable?.(item).where ? { disabled: c.editable?.(item).where } : {})}
        />
      );
    case "multiple-select":
      return (
        <Select
          variant="borderless"
          value={selectItems}
          options={c.editable?.(item).options as Option[]}
          onClick={async () => await c.editable?.(item)?.method?.()}
          onChange={(options) => {
            onEditable({ ...item, [key]: options.map((option) => option.value) } as T, trackByValue, ExtractKey(c.key));
          }}
          validation={{ text: _vText }}
          multiple
          {...(c.editable?.(item).where ? { disabled: c.editable?.(item).where } : {})}
        />
      );
    default:
      return null;
  }
};

export default Editable;

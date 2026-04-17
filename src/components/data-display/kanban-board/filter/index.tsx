"use client";

import { Dispatch, SetStateAction, useState } from "react";
import DateFilters from "./DateFilters";
import SelectFilters from "./SelectFilters";
import React from "react";
import Input from "../../../form/input";
import { Config } from "../IProps";
import { useTranslation } from "../../../../libs/core/application/hooks";

interface IProps<T extends object> {
  states: {
    search: {
      get: string;
      set: Dispatch<React.SetStateAction<string>>;
    };
    dateFilters: {
      get: Record<string, { from: Date | null; to: Date | null }>;
      set: Dispatch<SetStateAction<Record<string, { from: Date | null; to: Date | null }>>>;
    };
    selectFilters: {
      get: { [key: string]: (string | null)[] };
      set: Dispatch<SetStateAction<{ [key: string]: (string | null)[] }>>;
    };
    selectedFilters: {
      get: Record<string, Set<string | null>>;
      set: Dispatch<SetStateAction<Record<string, Set<string | null>>>>;
    };
  };
  config?: Config<T>;
}

function Filter<T extends object>({ states, config }: IProps<T>) {
  // states
  const [openName, setOpenName] = useState<string | null>(null);

  // hooks
  const { t } = useTranslation(String(config?.locale ?? "tr"));

  // methods
  const handleOpen = (name: string | null) => setOpenName(openName === name ? null : name);

  return (
    <div className="filters">
      <Input
        variant="borderless"
        placeholder={t("KanbanBoard.Search.Input.Placeholder")}
        onChange={(event) => states.search.set(event.target.value.toLocaleLowerCase())}
      />

      <ul>
        <DateFilters
          states={{
            dateFilters: {
              get: states.dateFilters.get,
              set: states.dateFilters.set,
            },
            openName: { get: openName },
          }}
          methods={{
            open: handleOpen,
          }}
          config={config}
        />

        <SelectFilters
          states={{
            selectFilters: {
              get: states.selectFilters.get,
              set: states.selectFilters.set,
            },
            selectedFilters: {
              get: states.selectedFilters.get,
              set: states.selectedFilters.set,
            },
            openName: { get: openName },
          }}
          methods={{ open: handleOpen }}
          config={config}
        />
      </ul>
    </div>
  );
}

export default Filter;

import React, { Dispatch, SetStateAction } from "react";
import { ARIcon } from "../../icons";
import Checkbox from "../../form/checkbox";

interface IProps {
  states: {
    selectFilters: {
      get: { [key: string]: (string | null)[] };
      set: Dispatch<SetStateAction<{ [key: string]: (string | null)[] }>>;
    };
    selectedFilters: {
      get: Record<string, Set<string | null>>;
      set: Dispatch<SetStateAction<Record<string, Set<string | null>>>>;
    };
  };
}

const SelectFilters = ({ states }: IProps) => {
  return Object.entries(states.selectFilters.get).map(([name, values]) => (
    <li>
      <div>
        <span>{name}</span>
        <ARIcon icon={"ChevronDown"} />
      </div>

      <ul>
        {values.map((val) => (
          <li>
            <Checkbox
              label={String(val ?? "-")}
              checked={states.selectedFilters.get[name]?.has(val) ?? false}
              onChange={() => {
                states.selectedFilters.set((prev) => {
                  const next = { ...prev };
                  const set = new Set(next[name] ?? []);

                  set.has(val) ? set.delete(val) : set.add(val);
                  next[name] = set;

                  return next;
                });
              }}
            />
          </li>
        ))}
      </ul>
    </li>
  ));
};

export default SelectFilters;

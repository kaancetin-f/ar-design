import React, { Dispatch, SetStateAction } from "react";
import { ARIcon } from "../../../icons";
import Checkbox from "../../../form/checkbox";
import Grid from "../../grid-system";
import Button from "../../../form/button";
import Divider from "../../divider";

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
    openName: {
      get: string | null;
    };
  };
  methods: {
    open: (name: string | null) => void;
  };
}

const { Box } = Grid;

const SelectFilters = ({ states, methods }: IProps) => {
  return Object.entries(states.selectFilters.get).map(([name, values], index) => {
    const isEqualsName = states.openName.get === name;
    const className: string[] = [];

    if (isEqualsName) className.push("active");

    return (
      <li key={index} className={className.map((c) => c).join(" ")} onClick={() => methods.open(name)}>
        <div>
          <span>{name}</span>
          <ARIcon icon={"ChevronDown"} />
        </div>

        {isEqualsName && (
          <ul className={className.map((c) => c).join(" ")} onClick={(event) => event.stopPropagation()}>
            {values.map((value, index) => (
              <li key={index}>
                <Checkbox
                  label={String(value ?? "-")}
                  checked={states.selectedFilters.get[name]?.has(value) ?? false}
                  onChange={() => {
                    states.selectedFilters.set((prev) => {
                      const next = { ...prev };
                      const set = new Set(next[name] ?? []);

                      set.has(value) ? set.delete(value) : set.add(value);
                      next[name] = set;

                      return next;
                    });
                  }}
                />
              </li>
            ))}

            <Divider config={{ margin: "0.5rem 0" }} />

            <Box direction="flex-end">
              <Button
                color="red"
                size="small"
                onClick={() => {
                  states.selectedFilters.set((prev) => {
                    const next = { ...prev };
                    delete next[name];

                    return next;
                  });
                }}
              >
                Clear
              </Button>
            </Box>
          </ul>
        )}
      </li>
    );
  });
};

export default SelectFilters;

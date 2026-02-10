import React, { Dispatch, SetStateAction } from "react";
import DatePicker from "../../form/date-picker";
import { ARIcon } from "../../icons";
import Grid from "../grid-system";

interface IProps {
  states: {
    dateFilters: {
      get: Record<string, { from: Date | null; to: Date | null }>;
      set: Dispatch<SetStateAction<Record<string, { from: Date | null; to: Date | null }>>>;
    };
  };
}

const { Row, Column } = Grid;

const DateFilters = ({ states }: IProps) => {
  return Object.entries(states.dateFilters.get).map(([name, range]) => (
    <li key={name} className="filter-box">
      <div>
        <span>{name}</span>
        <ARIcon icon={"ChevronDown"} />
      </div>

      <ul>
        <Row>
          <Column>
            <DatePicker
              value={range.from?.toISOString()}
              onChange={(value) => {
                states.dateFilters.set((prev) => ({
                  ...prev,
                  [name]: {
                    ...prev[name],
                    from: new Date(value),
                  },
                }));
              }}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <DatePicker
              value={range.to?.toISOString()}
              onChange={(value) => {
                states.dateFilters.set((prev) => ({
                  ...prev,
                  [name]: {
                    ...prev[name],
                    to: new Date(value),
                  },
                }));
              }}
            />
          </Column>
        </Row>
      </ul>
    </li>
  ));
};

export default DateFilters;

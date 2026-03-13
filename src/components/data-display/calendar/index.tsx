"use client";

import React, { useState } from "react";
import IProps from "./IProps";
import Body from "./Body";
import { View } from "../../../libs/types";
import Header from "./Header";
import "../../../assets/css/components/data-display/calendar/styles.css";

const Calendar = function <T>({ data, renderItem, config }: IProps<T>) {
  // states
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<View>("Week");

  return (
    <div className="ar-calendar">
      <Header
        states={{
          currentDate: { get: currentDate, set: setCurrentDate },
          view: {
            get: view,
            set: setView,
          },
        }}
        config={config}
      />

      <Body
        data={data}
        renderItem={renderItem}
        states={{
          currentDate: { get: currentDate, set: setCurrentDate },
          view: {
            get: view,
            set: setView,
          },
        }}
        config={config}
      />
    </div>
  );
};

Calendar.displayName = "DatePicker";
export default Calendar;

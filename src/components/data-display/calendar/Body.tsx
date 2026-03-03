import React from "react";
import Day from "./views/Day";
import Week from "./views/Week";
import Month from "./views/Month";
import { View } from "../../../libs/types";
import { CalendarEvent } from "./IProps";

interface IProps {
  data: CalendarEvent[];
  states: {
    currentDate: {
      get: Date;
      set: React.Dispatch<React.SetStateAction<Date>>;
    };
    view: { get: View; set: React.Dispatch<React.SetStateAction<View>> };
  };
  config?: {
    locale?: Intl.LocalesArgument;
  };
}

const Body = ({ data, states, config }: IProps) => {
  if (states.view.get === "Day") return <Day />;
  else if (states.view.get === "Week")
    return <Week data={data} states={{ currentDate: states.currentDate }} config={config} />;
  else if (states.view.get === "Month") return <Month />;

  return <>...</>;
};

export default Body;

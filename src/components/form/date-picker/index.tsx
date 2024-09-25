import React, { useEffect, useRef, useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/form/date-picker/date-picker.css";
import Input from "../input";
import Select from "../select";
import { Option } from "../../../libs/types";
import Button from "../button";

const weekdays = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const months = [
  { value: 0, text: "Ocak" },
  { value: 1, text: "Şubat" },
  { value: 2, text: "Mart" },
  { value: 3, text: "Nisan" },
  { value: 4, text: "Mayıs" },
  { value: 5, text: "Haziran" },
  { value: 6, text: "Temmuz" },
  { value: 7, text: "Ağustos" },
  { value: 8, text: "Eylül" },
  { value: 9, text: "Ekim" },
  { value: 10, text: "Kasım" },
  { value: 11, text: "Aralık" },
];

const DatePicker: React.FC<IProps> = ({ format }) => {
  // refs
  const _currentDate = useRef<Date>(new Date()).current;
  const _beginDate = useRef<HTMLInputElement>(null);

  // states
  const [calendar, setCalendar] = useState<React.ReactNode[]>([]);
  const [years, setYears] = useState<Option[]>([]);
  const [currentMonth, setCurrentMonth] = useState<number>(_currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(_currentDate.getFullYear());

  // useEffects
  useEffect(() => {
    if (isNaN(currentYear)) return;

    const years: Option[] = [];

    // Son 20 yıl
    for (let i = currentYear - 20; i <= currentYear; i++) {
      years.push({ value: i, text: `${i}` });
    }

    // Önümüzdeki 20 yıl
    for (let i = currentYear + 1; i <= currentYear + 20; i++) {
      years.push({ value: i, text: `${i}` });
    }

    setYears(years);
  }, [currentYear]);

  useEffect(() => {
    const calendar = [];
    const date = {
      current: {
        firstDay: new Date(currentYear, currentMonth, 1),
        lastDay: new Date(currentYear, currentMonth + 1, 0),
      },
    };
    const startingDay = date.current.firstDay.getDay() === 0 ? 7 : date.current.firstDay.getDay();
    const endDay = date.current.lastDay.getDay() === 0 ? 7 : date.current.lastDay.getDay();

    for (let i = 1; i < startingDay; i++) {
      calendar.push(<span key={`prev-${i}`} className="empty-day"></span>);
    }

    for (let i = date.current.firstDay.getDate(); i <= date.current.lastDay.getDate(); i++) {
      calendar.push(
        <span
          key={i}
          onClick={() => {
            if (_beginDate.current) {
              const [date, time] = new Date(Date.UTC(currentYear, currentMonth, i, 0, 0, 0))
                .toISOString()
                .split("T");

              _beginDate.current.value = date;
            }
          }}
        >
          <span>{i}</span>
        </span>
      );
    }

    for (let i = endDay; i < 7; i++) {
      calendar.push(<span key={`next-${i}`} className="empty-day"></span>);
    }

    setCalendar(calendar);
  }, [currentMonth, currentYear]);

  return (
    <div className="ar-date-picker">
      <Input
        ref={_beginDate}
        type="date"
        onKeyDown={(event) => {
          if (event.code == "Space") event.preventDefault();
        }}
        autoComplete="off"
        placeholder={format}
      />

      <div className="calendar">
        <div className="select-field">
          <div className="prev">
            <span onClick={() => setCurrentYear((prev) => (prev -= 1))}>{"«"}</span>
            <span onClick={() => setCurrentMonth((prev) => (prev -= 1))}>{"‹"}</span>
          </div>

          <div className="selects">
            <Select
              defaultValueIndex={currentMonth}
              variant="borderless"
              options={months}
              onChange={(option) => setCurrentMonth(option?.value as number)}
              placeholder="Begin"
            />

            <Select
              variant="borderless"
              defaultValueIndex={years.findIndex((year) => year.value == currentYear)}
              options={years}
              onChange={(option) => setCurrentYear(option?.value as number)}
              placeholder="End"
            />
          </div>

          <div className="next">
            <span onClick={() => setCurrentMonth((prev) => (prev += 1))}>{"›"}</span>
            <span onClick={() => setCurrentYear((prev) => (prev += 1))}>{"»"}</span>
          </div>
        </div>

        {/* :Begin: Weekdays */}
        <div className="weekdays">
          {weekdays.map((weekday) => (
            <span>{weekday}</span>
          ))}
        </div>
        {/* :End: Weekdays */}

        {/* :Begin: Days */}
        <div className="days">{calendar}</div>
        {/* :End: Days */}

        {/* :Begin: Actions */}
        <div className="actions">
          <Button variant="outlined">Bugün</Button>
        </div>
        {/* :End: Actions */}
      </div>
    </div>
  );
};

DatePicker.displayName = "DatePicker";

export default DatePicker;

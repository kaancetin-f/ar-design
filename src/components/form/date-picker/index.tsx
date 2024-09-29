import React, { useEffect, useRef, useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/form/date-picker/date-picker.css";
import Input from "../input";
import Select from "../select";
import { Option } from "../../../libs/types";
import Button from "../button";
import Alert from "../../feedback/alert";

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
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  let [calendarClassName, setCalendarClassName] = useState<string[]>(["calendar", "closed"]);
  const [calendar, setCalendar] = useState<React.ReactNode[]>([]);
  const [years, setYears] = useState<Option[]>([]);

  // states => Selected Date
  const [currentYear, setCurrentYear] = useState<number>(_currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(_currentDate.getMonth());
  const [currentDay, setCurrentDay] = useState<number>(_currentDate.getDate());

  // methods
  // TODO: Getter ve Setter metod yaz... (Tarih için)
  const setInput = (year: number, month: number, day: number) => {
    if (_beginDate.current) {
      const [date, time] = new Date(Date.UTC(year, month, day, 0, 0, 0)).toISOString().split("T");

      _beginDate.current.value = date;

      setCalendarOpen(false);
    }

    setCurrentDay(day);
  };

  const setToday = () => {
    setInput(_currentDate.getFullYear(), _currentDate.getMonth(), _currentDate.getDate());

    setCurrentYear(_currentDate.getFullYear());
    setCurrentMonth(_currentDate.getMonth());
    setCurrentDay(_currentDate.getDate());
  };

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
    const screenCenter = window.innerHeight / 2 + 100;
    const rect = _beginDate.current?.getBoundingClientRect();
    const direction = rect && rect.top > screenCenter ? "bottom" : "top";

    setCalendarClassName(["calendar"]);

    if (!calendarOpen) {
      setCalendarClassName((prev) => [...prev, direction, "closed"]);

      return;
    }

    setCalendarClassName((prev) => [...prev, direction, "opened"]);

    const calendar = [];
    const beginDateValue = _beginDate.current?.value || "";
    const date = {
      input: {
        begin: new Date(beginDateValue),
      },
      current: {
        firstDay: new Date(currentYear, currentMonth, 1), // Geçerli ayın ilk günü
        lastDay: new Date(currentYear, currentMonth + 1, 0), // Geçerli ayın son günü
      },
    };

    const startingDay = date.current.firstDay.getDay() === 0 ? 7 : date.current.firstDay.getDay();
    const endDay = date.current.lastDay.getDay() === 0 ? 7 : date.current.lastDay.getDay();

    for (let i = 1; i < startingDay; i++) {
      calendar.push(<span key={`prev-${i}`} className="empty-day"></span>);
    }

    for (let i = date.current.firstDay.getDate(); i <= date.current.lastDay.getDate(); i++) {
      const isSelected = !isNaN(date.input.begin.getTime())
        ? date.input.begin.getFullYear() == currentYear &&
          date.input.begin.getMonth() == currentMonth &&
          i == currentDay
        : _currentDate.getFullYear() == currentYear &&
          _currentDate.getMonth() == currentMonth &&
          i == currentDay;

      calendar.push(
        <span
          key={i}
          {...(isSelected ? { className: "selection-day" } : {})}
          onClick={() => {
            setInput(currentYear, currentMonth, i);
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
  }, [currentYear, currentMonth, currentDay, calendarOpen]);

  return (
    <div className="ar-date-picker">
      <Input
        ref={_beginDate}
        type="date"
        onKeyDown={(event) => {
          if (event.code == "Space") event.preventDefault();
        }}
        onClick={() => setCalendarOpen((prev) => !prev)}
        autoComplete="off"
        placeholder={format}
        readOnly
      />

      <div className={calendarClassName.map((className) => className).join(" ")}>
        <div className="header">
          <div className="select-field">
            <div className="prev">
              <span onClick={() => setCurrentYear((prev) => (prev -= 1))}>{"«"}</span>
              <span
                onClick={() =>
                  setCurrentMonth((prev) => {
                    if (prev <= 0) {
                      setCurrentYear((prev) => (prev -= 1));
                      return 11;
                    }

                    return (prev -= 1);
                  })
                }
              >
                {"‹"}
              </span>
            </div>

            <div className="selects">
              <Select
                defaultValueIndex={months.findIndex((month) => month.value == currentMonth)}
                variant="borderless"
                options={months}
                onChange={(option) => setCurrentMonth(option?.value as number)}
                placeholder="Ay"
              />

              <Select
                variant="borderless"
                defaultValueIndex={years.findIndex((year) => year.value == currentYear)}
                options={years}
                onChange={(option) => setCurrentYear(option?.value as number)}
                placeholder="Yıl"
              />
            </div>

            <div className="next">
              <span
                onClick={() =>
                  setCurrentMonth((prev) => {
                    if (prev >= 11) {
                      setCurrentYear((prev) => (prev += 1));
                      return 0;
                    }

                    return (prev += 1);
                  })
                }
              >
                {"›"}
              </span>
              <span onClick={() => setCurrentYear((prev) => (prev += 1))}>{"»"}</span>
            </div>
          </div>
        </div>

        <div className="content">
          {!isNaN(currentMonth) && !isNaN(currentYear) ? (
            <React.Fragment>
              {/* :Begin: Weekdays */}
              <div className="weekdays">
                {weekdays.map((weekday, index) => (
                  <span key={index}>{weekday}</span>
                ))}
              </div>
              {/* :End: Weekdays */}

              {/* :Begin: Days */}
              <div className="days">{calendar}</div>
              {/* :End: Days */}
            </React.Fragment>
          ) : (
            <Alert status="warning">Ay veya yıl seçimi yapmanız gerekmektedir.</Alert>
          )}
        </div>

        {/* :Begin: Actions */}
        <div className="actions">
          <Button variant="outlined" onClick={() => setToday()}>
            Bugün
          </Button>
        </div>
        {/* :End: Actions */}
      </div>
    </div>
  );
};

DatePicker.displayName = "DatePicker";

export default DatePicker;

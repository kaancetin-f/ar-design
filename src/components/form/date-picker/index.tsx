"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../../assets/css/components/form/date-picker/date-picker.css";
import Input from "../input";
import Select from "../select";
import { Option } from "../../../libs/types";
import Button from "../button";
import Alert from "../../feedback/alert";
import Props from "./Props";
import ReactDOM from "react-dom";

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

const DatePicker: React.FC<Props> = ({ onChange, isClock, ...attributes }) => {
  // refs
  const _arCalendar = useRef<HTMLDivElement>(null);
  const _currentDate = useRef<Date>(new Date()).current;
  const _beginDate = useRef<HTMLInputElement>(null);
  const _clockOpen = useRef<boolean>(false);

  // refs
  const _year = useRef<number>(_currentDate.getFullYear());
  const _month = useRef<number>(_currentDate.getMonth());
  const _day = useRef<number>(_currentDate.getDate());
  const _hours = useRef<number>(_currentDate.getHours());
  const _minutes = useRef<number>(_currentDate.getMinutes());
  // refs -> List Elements
  const _hoursListElement = useRef<HTMLUListElement>(null);
  const _hoursLiElements = useRef<(HTMLLIElement | null)[]>([]);
  const _minutesListElement = useRef<HTMLUListElement>(null);
  const _minutesLiElements = useRef<(HTMLLIElement | null)[]>([]);

  // states
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [calendar, setCalendar] = useState<React.ReactNode[]>([]);
  const [years, setYears] = useState<Option[]>([]);
  const [hours, setHours] = useState<React.ReactNode>();
  const [minutes, setMinutes] = useState<React.ReactNode>();
  const [dateTrigger, setDateTrigger] = useState<boolean>(false);
  const [timeTrigger, setTimeTrigger] = useState<boolean>(false);
  // states => Selected Date
  const [currentYear, setCurrentYear] = useState<number>(_currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(_currentDate.getMonth());
  const [currentDay, setCurrentDay] = useState<number>(_currentDate.getDate());
  const [currentHours, setCurrentHours] = useState<number>(_currentDate.getHours());
  const [currentMinutes, setCurrentMinutes] = useState<number>(_currentDate.getMinutes());

  // methods
  const handleClickOutSide = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (_arCalendar.current && !_arCalendar.current.contains(target)) cancelProgress();
  };

  const handleKeys = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === "Escape") cancelProgress();
  };

  const handlePosition = () => {
    if (_arCalendar.current && _beginDate.current) {
      const arCalendarRect = _arCalendar.current.getBoundingClientRect();
      const InpuRect = _beginDate.current?.getBoundingClientRect();

      if (InpuRect) {
        const screenCenter = window.innerHeight / 2;
        const sx = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft;
        const sy = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

        _arCalendar.current.style.top = `${
          (InpuRect.top > screenCenter ? InpuRect.top - arCalendarRect.height : InpuRect.top + InpuRect.height) + sy
        }px`;
        _arCalendar.current.style.left = `${InpuRect.left + sx}px`;
      }
    }
  };

  const handleParse = (data: string) => {
    const [date, time] = data.split("T");
    const [year, month, day] = date.split("-").map(Number);
    const hours = time ? time.split(".")[0].split(":").map(Number)[0] : 0;
    const minutes = time ? time.split(".")[0].split(":").map(Number)[1] : 0;

    return {
      date: date,
      time: time,
      year: year,
      month: month,
      day: day,
      hours: hours,
      minutes: minutes,
    };
  };

  const setNow = () => {
    const now = new Date();

    // Stateler güncelleniyor...
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
    setCurrentDay(now.getDate());
    setCurrentHours(now.getHours());
    setCurrentMinutes(now.getMinutes());

    _year.current = now.getFullYear();
    _month.current = now.getMonth();
    _day.current = now.getDate();
    _hours.current = now.getHours();
    _minutes.current = now.getMinutes();

    // Input güncelleniyor...
    updateDateInput(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());

    // Takvim kapatılıyor...
    setCalendarOpen(false);

    // Değer gönderiliyor...
    const inputDate = new Date(
      Date.UTC(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        !isClock ? 0 : now.getHours(),
        !isClock ? 0 : now.getMinutes(),
        0
      )
    );

    onChange(inputDate.toISOString());
  };

  const updateDateInput = (
    year: number = _year.current,
    month: number = _month.current,
    day: number = _day.current,
    hours: number = _hours.current,
    minutes: number = _minutes.current
  ) => {
    if (_beginDate.current) {
      const inputDate = new Date(Date.UTC(year, month, day, hours, minutes, 0));

      if (isNaN(inputDate.getTime())) return;

      const [date, time] = inputDate.toISOString().split("T");
      const [clock, _] = time.split(".");

      _beginDate.current.value = !_clockOpen.current ? date : `${date}T${clock}`;
    }
  };

  const okayButton = () => {
    return (
      <Button
        variant="borderless"
        status="success"
        onClick={() => {
          // Input güncelleniyor...
          updateDateInput(_year.current, _month.current, _day.current, _hours.current, _minutes.current);

          // Stateler güncelleniyor...
          setCurrentYear(_year.current);
          setCurrentMonth(_month.current);
          setCurrentDay(_day.current);
          setCurrentHours(_hours.current);
          setCurrentMinutes(_minutes.current);

          const inputDate = new Date(
            Date.UTC(
              _year.current,
              _month.current,
              _day.current,
              !isClock ? 0 : _hours.current,
              !isClock ? 0 : _minutes.current,
              0
            )
          );

          onChange(inputDate.toISOString());

          setCalendarOpen(false);
        }}
      >
        Tamam
      </Button>
    );
  };

  const cancelProgress = () => {
    const dateParse = handleParse(String(attributes.value));

    _year.current = attributes.value ? dateParse.year : currentYear;
    _month.current = attributes.value ? dateParse.month - 1 : currentMonth;
    _day.current = attributes.value ? dateParse.day : currentDay;
    _hours.current = attributes.value ? dateParse.hours : currentHours;
    _minutes.current = attributes.value ? dateParse.minutes : currentMinutes;

    setCalendarOpen(false);
  };

  // useEffects
  useEffect(() => {
    if (isNaN(_year.current)) return;

    const years: Option[] = [];

    // Son 20 yıl
    for (let i = _year.current - 20; i <= _year.current; i++) {
      years.push({ value: i, text: `${i}` });
    }

    // Önümüzdeki 20 yıl
    for (let i = _year.current + 1; i <= _year.current + 20; i++) {
      years.push({ value: i, text: `${i}` });
    }

    setYears(years);
  }, []);

  useEffect(() => {
    if (attributes.value && _beginDate.current) {
      const dateParse = handleParse(String(attributes.value));

      _year.current = dateParse.year;
      _month.current = dateParse.month - 1;
      _day.current = dateParse.day;

      if (hours || minutes) {
        _hours.current = dateParse.hours;
        _minutes.current = dateParse.minutes;
      }

      updateDateInput(dateParse.year, dateParse.month - 1, dateParse.day, dateParse.hours, dateParse.minutes);
    }
  }, [attributes.value]);

  useEffect(() => {
    if (calendarOpen) {
      const calendar = [];
      const beginDateValue = _beginDate.current?.value || "";
      const date = {
        input: {
          begin: new Date(beginDateValue),
        },
        current: {
          firstDay: new Date(_year.current, _month.current, 1), // Geçerli ayın ilk günü
          lastDay: new Date(_year.current, _month.current + 1, 0), // Geçerli ayın son günü
        },
      };

      const startingDay = date.current.firstDay.getDay() === 0 ? 7 : date.current.firstDay.getDay();
      const endDay = date.current.lastDay.getDay() === 0 ? 7 : date.current.lastDay.getDay();

      for (let i = 1; i < startingDay; i++) {
        calendar.push(<span key={`prev-${i}`} className="empty-day"></span>);
      }

      for (let i = date.current.firstDay.getDate(); i <= date.current.lastDay.getDate(); i++) {
        const isSelected = !isNaN(date.input.begin.getTime())
          ? date.input.begin.getFullYear() == _year.current &&
            date.input.begin.getMonth() == _month.current &&
            i == _day.current
          : _currentDate.getFullYear() == _year.current &&
            _currentDate.getMonth() == _month.current &&
            i == _day.current;

        calendar.push(
          <span
            key={`current-${i}`}
            {...(isSelected ? { className: "selection-day" } : {})}
            onClick={() => {
              _day.current = i;
              setDateTrigger((prev) => !prev);
            }}
          >
            <span>{i}</span>
          </span>
        );
      }

      for (let i = endDay; i < 7; i++) {
        calendar.push(<span key={`next-${i}`} className="empty-day"></span>);
      }

      // Takvim nesneleri ekleniyor.
      setCalendar(calendar);

      // Konumu Ayarlanıyor.
      setTimeout(handlePosition, 0);

      window.addEventListener("blur", () => setCalendarOpen(false));
      document.addEventListener("click", handleClickOutSide);
      document.addEventListener("keydown", handleKeys);
    } else {
      window.removeEventListener("blur", () => setCalendarOpen(false));
      document.removeEventListener("click", handleClickOutSide);
      document.removeEventListener("keydown", handleKeys);
    }

    return () => {
      window.removeEventListener("blur", () => setCalendarOpen(false));
      document.removeEventListener("click", handleClickOutSide);
      document.removeEventListener("keydown", handleKeys);
    };
  }, [dateTrigger, calendarOpen]);

  useEffect(() => {
    const generateList = (count: number, current: number, setFunc: React.Dispatch<React.SetStateAction<any>>) => {
      const items = Array.from({ length: count }, (_, i) => (
        <li
          ref={(element) =>
            count === 24 ? (_hoursLiElements.current[i] = element) : (_minutesLiElements.current[i] = element)
          }
          key={i}
          {...(current === i ? { className: "selection-time" } : {})}
          onClick={() => {
            if (count === 24) {
              setTimeTrigger((prev) => !prev);
              _hours.current = i;
            } else {
              setTimeTrigger((prev) => !prev);
              _minutes.current = i;
            }
          }}
        >
          <span>
            <span>{i.toString().padStart(2, "0")}</span>
          </span>
        </li>
      ));

      setFunc(items);
    };

    // Listeler oluşturuyor...
    generateList(24, _hours.current, setHours);
    generateList(60, _minutes.current, setMinutes);

    if (!isClock) return;

    // Seçim sonrasında en yukarı getirme işlemi için aşağıda yer alan kodlar yazılmıştır
    const hourLiElement = _hoursLiElements.current[_hours.current];
    const minuteLiElement = _minutesLiElements.current[_minutes.current];

    if (hourLiElement) {
      _hoursListElement.current?.scrollTo({
        top: hourLiElement.offsetTop - _hoursListElement.current.offsetTop - 8,
        behavior: "smooth",
      });
    }

    if (minuteLiElement) {
      _minutesListElement.current?.scrollTo({
        top: minuteLiElement.offsetTop - _minutesListElement.current.offsetTop - 8,
        behavior: "smooth",
      });
    }
  }, [timeTrigger, calendarOpen, isClock]);

  return (
    <div className="ar-date-picker">
      {attributes.placeholder && attributes.placeholder.length > 0 && <label>{attributes.placeholder}</label>}

      <Input
        ref={_beginDate}
        type={isClock ? "datetime-local" : "date"}
        onKeyDown={(event) => event.code == "Space" && event.preventDefault()}
        onChange={(event) => {
          // Disabled gelmesi durumunda işlem yapmasına izin verme...
          if (attributes.disabled) return;

          (() => {
            const value = event.target.value;

            const [date, time] = value.split("T");
            const [year, month, day] = date.split("-").map(Number);
            const hours = time ? time.split(".")[0].split(":").map(Number)[0] : 0;
            const minutes = time ? time.split(".")[0].split(":").map(Number)[1] : 0;

            _year.current = year;
            _month.current = month - 1;
            _day.current = day;

            if (hours || minutes) {
              _hours.current = hours;
              _minutes.current = minutes;
            }

            setDateTrigger((prev) => !prev);
            setTimeTrigger((prev) => !prev);
          })();
        }}
        onClick={(event) => {
          event.preventDefault();
          setCalendarOpen((prev) => !prev);
        }}
        autoComplete="off"
      />

      {calendarOpen &&
        ReactDOM.createPortal(
          <div ref={_arCalendar} className="ar-date-calendar">
            {/* :Begin: Calendar */}
            <div className="header">
              <div className="select-field">
                <div className="prev">
                  <span
                    onClick={() => {
                      _year.current -= 1;
                      setDateTrigger((prev) => !prev);
                    }}
                  >
                    {"«"}
                  </span>
                  <span
                    onClick={() => {
                      if (_month.current <= 0) {
                        _year.current -= 1;
                        _month.current = 12;
                      }

                      _month.current -= 1;

                      updateDateInput(_year.current, _month.current, _day.current);
                      setDateTrigger((prev) => !prev);
                    }}
                  >
                    {"‹"}
                  </span>
                </div>

                <div className="selects">
                  <Select
                    variant="borderless"
                    value={months.find((month) => month.value === _month.current)}
                    options={months}
                    onChange={(option) => {
                      _month.current = option?.value as number;

                      updateDateInput(_year.current, _month.current, _day.current);
                      setDateTrigger((prev) => !prev);
                    }}
                    placeholder="Ay"
                  />

                  <Select
                    variant="borderless"
                    value={years.find((years) => years.value === _year.current)}
                    options={years}
                    onChange={(option) => {
                      _year.current = option?.value as number;

                      updateDateInput(_year.current, _month.current, _day.current);
                      setDateTrigger((prev) => !prev);
                    }}
                    placeholder="Yıl"
                  />
                </div>

                <div className="next">
                  <span
                    onClick={() => {
                      if (_month.current >= 11) {
                        _year.current += 1;
                        _month.current = -1;
                      }

                      _month.current += 1;

                      updateDateInput(_year.current, _month.current, _day.current);
                      setDateTrigger((prev) => !prev);
                    }}
                  >
                    {"›"}
                  </span>
                  <span
                    onClick={() => {
                      _year.current += 1;

                      updateDateInput(_year.current, _month.current, _day.current);
                      setDateTrigger((prev) => !prev);
                    }}
                  >
                    {"»"}
                  </span>
                </div>
              </div>
            </div>

            <div className="content">
              {!isNaN(_month.current) && !isNaN(_year.current) ? (
                <div className="calendar">
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
                </div>
              ) : (
                <Alert status="warning">Ay veya yıl seçimi yapmanız gerekmektedir.</Alert>
              )}
            </div>

            <div className="footer">
              <div>
                <Button variant="borderless" onClick={() => setNow()}>
                  Şimdi
                </Button>
              </div>

              <div>{!isClock && okayButton()}</div>
            </div>
            {/* :End: Calendar */}

            {/* :Begin: Clock */}
            <div className={`clock ${isClock ? "active" : "passive"}`}>
              <div className="header">
                {_hours.current.toString().padStart(2, "0")}
                {" : "}
                {_minutes.current.toString().padStart(2, "0")}
              </div>
              <div className="content">
                <ul ref={_hoursListElement}>{hours}</ul>
                <ul ref={_minutesListElement}>{minutes}</ul>
              </div>
              {isClock && <div className="footer">{okayButton()}</div>}
            </div>
            {/* :End: Clock */}
          </div>,
          document.body
        )}
    </div>
  );
};

DatePicker.displayName = "DatePicker";
export default DatePicker;

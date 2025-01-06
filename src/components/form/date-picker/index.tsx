"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../../assets/css/components/form/date-picker/date-picker.css";
import Input from "../input";
// import Select from "../select";
import { Option } from "../../../libs/types";
import Button from "../button";
import Alert from "../../feedback/alert";
import Props from "./Props";
import ReactDOM from "react-dom";
import DATE from "./DATE";

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

  // refs -> Geçerli Tarih ve Saat Bilgileri.
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
  const [calendarIsOpen, setCalendarIsOpen] = useState<boolean>(false);
  const [calendarDays, setCalendarDays] = useState<React.ReactNode[]>([]);
  const [years, setYears] = useState<Option[]>([]);
  const [hours, setHours] = useState<React.ReactNode>();
  const [minutes, setMinutes] = useState<React.ReactNode>();
  const [dateChanged, setDateChanged] = useState<boolean>(false);
  const [timeChanged, setTimeChanged] = useState<boolean>(false);
  // states => Seçilmiş Tarihler
  const [selectedYear, setSelectedYear] = useState<number>(_currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(_currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState<number>(_currentDate.getDate());
  const [selectedHours, setSelectedHours] = useState<number>(_currentDate.getHours());
  const [selectedMinutes, setSelectedMinutes] = useState<number>(_currentDate.getMinutes());

  // methods
  const handleClickOutSide = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (_arCalendar.current && !_arCalendar.current.contains(target)) closeCalendar();
  };

  const handleKeys = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === "Escape") closeCalendar();
  };

  const handlePosition = () => {
    if (_arCalendar.current && _beginDate.current) {
      const arCalendarRect = _arCalendar.current.getBoundingClientRect();
      const InpuRect = _beginDate.current?.getBoundingClientRect();

      if (InpuRect) {
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;
        const sx = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft;
        const sy = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

        _arCalendar.current.style.top = `${
          (InpuRect.top > screenCenterY ? InpuRect.top - arCalendarRect.height : InpuRect.top + InpuRect.height) + sy
        }px`;
        _arCalendar.current.style.left = `${
          (InpuRect.left > screenCenterX ? InpuRect.right - arCalendarRect.width : InpuRect.left) + sx
        }px`;
      }
    }
  };

  // Şimdi Butonu
  const setNowButton = () => {
    const now = new Date();

    // Stateler güncelleniyor...
    setSelectedYear(now.getFullYear());
    setSelectedMonth(now.getMonth());
    setSelectedDay(now.getDate());
    setSelectedHours(now.getHours());
    setSelectedMinutes(now.getMinutes());

    _year.current = now.getFullYear();
    _month.current = now.getMonth();
    _day.current = now.getDate();
    _hours.current = now.getHours();
    _minutes.current = now.getMinutes();

    // Takvim kapatılıyor...
    setCalendarIsOpen(false);

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

  // Tamam Butonu
  const okayButton = () => {
    return (
      <Button
        variant="borderless"
        status="success"
        onClick={() => {
          // Stateler güncelleniyor...
          setSelectedYear(_year.current);
          setSelectedMonth(_month.current);
          setSelectedDay(_day.current);
          setSelectedHours(_hours.current);
          setSelectedMinutes(_minutes.current);

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
          setCalendarIsOpen(false);
        }}
      >
        Tamam
      </Button>
    );
  };

  const closeCalendar = () => {
    const { year, month, day, hours, minutes } = DATE.Parse(String(attributes.value), isClock);

    _year.current = attributes.value ? year : selectedYear;
    _month.current = attributes.value ? month - 1 : selectedMonth;
    _day.current = attributes.value ? day : selectedDay;
    _hours.current = attributes.value ? hours : selectedHours;
    _minutes.current = attributes.value ? minutes : selectedMinutes;

    setCalendarIsOpen(false);
  };

  // useEffects
  useEffect(() => {
    if (calendarIsOpen) {
      handlePosition();

      const days = [];
      const firstDayOfMonth = new Date(_year.current, _month.current, 1);
      const lastDayOfMonth = new Date(_year.current, _month.current + 1, 0);
      const startingDay = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay();
      const endingDay = lastDayOfMonth.getDay() === 0 ? 7 : lastDayOfMonth.getDay();

      for (let i = 1; i < startingDay; i++) {
        days.push(<span key={`prev-${i}`} className="empty-day"></span>);
      }

      for (let i = firstDayOfMonth.getDate(); i <= lastDayOfMonth.getDate(); i++) {
        const isSelected = !isNaN(firstDayOfMonth.getTime())
          ? firstDayOfMonth.getFullYear() === _year.current &&
            firstDayOfMonth.getMonth() === _month.current &&
            i === _day.current
          : _currentDate.getFullYear() === _year.current &&
            _currentDate.getMonth() === _month.current &&
            i === _day.current;

        days.push(
          <span
            key={`current-${i}`}
            className={isSelected ? "selection-day" : ""}
            onClick={(event) => {
              event.preventDefault();

              _day.current = i;
              setSelectedDay(i);
              setDateChanged(!dateChanged);
            }}
          >
            <span>{i}</span>
          </span>
        );
      }

      for (let i = endingDay; i < 7; i++) {
        days.push(<span key={`next-${i}`} className="empty-day"></span>);
      }

      setCalendarDays(days);

      window.addEventListener("blur", () => closeCalendar());
      document.addEventListener("click", handleClickOutSide);
      document.addEventListener("keydown", handleKeys);
    }

    return () => {
      window.removeEventListener("blur", () => closeCalendar());
      document.removeEventListener("click", handleClickOutSide);
      document.removeEventListener("keydown", handleKeys);
    };
  }, [dateChanged, calendarIsOpen]);

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
              setTimeChanged((prev) => !prev);
              _hours.current = i;
              setSelectedHours(i);
            } else {
              setTimeChanged((prev) => !prev);
              _minutes.current = i;
              setSelectedMinutes(i);
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
  }, [timeChanged, calendarIsOpen, isClock]);

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

  return (
    <div className="ar-date-picker">
      {attributes.placeholder && attributes.placeholder.length > 0 && <label>{attributes.placeholder}</label>}

      <Input
        ref={_beginDate}
        value={DATE.ParseValue(String(attributes.value), isClock)}
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

            setDateChanged((prev) => !prev);
            setTimeChanged((prev) => !prev);
          })();
        }}
        onClick={(event) => {
          event.preventDefault();
          setCalendarIsOpen(true);
        }}
        autoComplete="off"
      />

      {calendarIsOpen &&
        ReactDOM.createPortal(
          <div ref={_arCalendar} className="ar-date-calendar">
            {/* :Begin: Calendar */}
            <div className="header">
              <div className="select-field">
                <div className="prev">
                  <span
                    onClick={() => {
                      _year.current -= 1;
                      setSelectedYear(_year.current);
                      setDateChanged((prev) => !prev);
                    }}
                  ></span>
                  <span
                    onClick={() => {
                      if (_month.current <= 0) {
                        _year.current -= 1;
                        _month.current = 12;
                      }

                      _month.current -= 1;
                      setSelectedYear(_year.current);
                      setSelectedMonth(_month.current);
                      setDateChanged((prev) => !prev);
                    }}
                  ></span>
                </div>

                <div className="selects">
                  <div>
                    <span>{months.find((month) => month.value === selectedMonth)?.text}</span>
                  </div>
                  <div>
                    <span>{years.find((year) => year.value === selectedYear)?.text}</span>
                  </div>
                </div>

                <div className="next">
                  <span
                    onClick={() => {
                      if (_month.current >= 11) {
                        _year.current += 1;
                        _month.current = -1;
                      }

                      _month.current += 1;
                      setSelectedYear(_year.current);
                      setSelectedMonth(_month.current);
                      setDateChanged((prev) => !prev);
                    }}
                  ></span>
                  <span
                    onClick={() => {
                      _year.current += 1;
                      setSelectedYear(_year.current);
                      setDateChanged((prev) => !prev);
                    }}
                  ></span>
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
                  <div className="days">{calendarDays}</div>
                  {/* :End: Days */}
                </div>
              ) : (
                <Alert status="warning">Ay veya yıl seçimi yapmanız gerekmektedir.</Alert>
              )}
            </div>

            <div className="footer">
              <div>
                <Button variant="borderless" onClick={() => setNowButton()}>
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

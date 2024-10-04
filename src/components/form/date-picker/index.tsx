import React, { useEffect, useRef, useState } from "react";
import "../../../assets/css/components/form/date-picker/date-picker.css";
import Input from "../input";
import Select from "../select";
import { Option } from "../../../libs/types";
import Button from "../button";
import Alert from "../../feedback/alert";
import Props from "./Props";

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

const DatePicker: React.FC<Props> = ({ onChange, ...attributes }) => {
  // refs
  const _arCalendar = useRef<HTMLDivElement>(null);
  const _currentDate = useRef<Date>(new Date()).current;
  const _beginDate = useRef<HTMLInputElement>(null);
  const _clockOpen = useRef<boolean>(false);

  // refs -> Saatler
  const _hours = useRef<number>(_currentDate.getHours());
  const _minutes = useRef<number>(_currentDate.getMinutes());
  const _hoursListElement = useRef<HTMLUListElement>(null);
  const _hoursLiElements = useRef<(HTMLLIElement | null)[]>([]);
  const _minutesListElement = useRef<HTMLUListElement>(null);
  const _minutesLiElements = useRef<(HTMLLIElement | null)[]>([]);

  // states
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [clockOpen, setClockOpen] = useState<boolean>(false);
  const [calendar, setCalendar] = useState<React.ReactNode[]>([]);
  const [years, setYears] = useState<Option[]>([]);
  const [hours, setHours] = useState<React.ReactNode>();
  const [minutes, setMinutes] = useState<React.ReactNode>();
  let [calendarClassName, setCalendarClassName] = useState<string[]>([
    "calendar-wrapper",
    "closed",
  ]);

  // states => Selected Date
  const [currentYear, setCurrentYear] = useState<number>(_currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(_currentDate.getMonth());
  const [currentDay, setCurrentDay] = useState<number>(_currentDate.getDate());
  const [currentHours, setCurrentHours] = useState<number>(_currentDate.getHours());
  const [currentMinutes, setCurrentMinutes] = useState<number>(_currentDate.getMinutes());

  // methods
  const handleClickOutSide = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (_arCalendar.current && !_arCalendar.current.contains(target)) {
      setCalendarOpen(false);
    }
  };

  const handleKeys = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === "Escape") setCalendarOpen(false);
  };

  const setNow = () => {
    const now = new Date();

    // Stateler güncelleniyor...
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
    setCurrentDay(now.getDate());

    if (clockOpen) {
      setCurrentHours(now.getHours());
      setCurrentMinutes(now.getMinutes());
    }

    // Input güncelleniyor...
    updateDateInput(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes()
    );

    // Takvim kapatılıyor...
    setCalendarOpen(false);

    // Değer gönderiliyor...
    const inputDate = new Date(
      Date.UTC(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        !clockOpen ? 0 : now.getHours(),
        !clockOpen ? 0 : now.getMinutes(),
        0
      )
    );
    onChange(inputDate.toISOString());
  };

  const okayButton = () => {
    const inputDate = new Date(
      Date.UTC(
        currentYear,
        currentMonth,
        currentDay,
        !clockOpen ? 0 : currentHours,
        !clockOpen ? 0 : currentMinutes,
        0
      )
    );

    return (
      <Button
        variant="borderless"
        status="success"
        onClick={() => {
          onChange(inputDate.toISOString());
          setCalendarOpen(false);
        }}
      >
        Tamam
      </Button>
    );
  };

  const updateDateInput = (
    year: number = currentYear,
    month: number = currentMonth,
    day: number = currentDay,
    hours: number = _hours.current,
    minutes: number = _minutes.current
  ) => {
    if (_beginDate.current) {
      const inputDate = new Date(Date.UTC(year, month, day, hours, minutes, 0));

      if (isNaN(inputDate.getTime())) return;

      const [date, time] = inputDate.toISOString().split("T");
      const [clock, ms] = time.split(".");

      _beginDate.current.value = !_clockOpen.current ? date : `${date}T${clock}`;
    }
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
    // Sıfırlama işlemi...
    setCalendarClassName(["calendar-wrapper"]);

    const screenCenter = window.innerHeight / 2 + 100;
    const rect = _beginDate.current?.getBoundingClientRect();
    const direction = rect && rect.top > screenCenter ? "bottom" : "top";

    if (calendarOpen) {
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
            key={`current-${i}`}
            {...(isSelected ? { className: "selection-day" } : {})}
            onClick={() => {
              setCurrentDay(i);
              updateDateInput(currentYear, currentMonth, i);
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

      // Takvim paneli için olay dinleyileri ekleniyor.
      document.addEventListener("click", handleClickOutSide);
      document.addEventListener("keydown", handleKeys);

      // Dinleyicileri kaldır ve zamanlayıcıyı temizle.
      return () => {
        document.removeEventListener("click", handleClickOutSide);
        document.removeEventListener("keydown", handleKeys);
      };
    } else {
      setCalendarClassName((prev) => [...prev, direction, "closed"]);
      return;
    }
  }, [currentYear, currentMonth, currentDay, calendarOpen]);

  useEffect(() => {
    const generateList = (
      count: number,
      current: number,
      setFunc: React.Dispatch<React.SetStateAction<any>>
    ) => {
      const items = Array.from({ length: count }, (_, i) => (
        <li
          ref={(element) =>
            count === 24
              ? (_hoursLiElements.current[i] = element)
              : (_minutesLiElements.current[i] = element)
          }
          key={i}
          {...(current === i ? { className: "selection-time" } : {})}
          onClick={() => {
            if (count === 24) {
              setCurrentHours(i);
              _hours.current = i;
            } else {
              setCurrentMinutes(i);
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
    generateList(24, currentHours, setHours);
    generateList(60, currentMinutes, setMinutes);

    // Input güncelleniyor...
    updateDateInput(currentYear, currentMonth, currentDay, currentHours, currentMinutes);

    if (!clockOpen) return;

    // Seçim sonrasında en yukarı getirme işlemi için aşağıda yer alan kodlar yazılmıştır
    const hourLiElement = _hoursLiElements.current[currentHours];
    const minuteLiElement = _minutesLiElements.current[currentMinutes];

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
  }, [currentHours, currentMinutes, clockOpen]);

  return (
    <div className="ar-date-picker">
      <Input
        ref={_beginDate}
        type={clockOpen ? "datetime-local" : "date"}
        onKeyDown={(event) => event.code == "Space" && event.preventDefault()}
        onChange={(event) => {
          // Disabled gelmesi durumunda işlem yapmasına izin verme...
          if (attributes.disabled) return;

          (() => {
            const value = event.target.value;
            const [date, time] = value.split("T");
            const [year, month, day] = date.split("-").map(Number);
            const hours = time ? Number(time.split(".")[0].split(":")[0]) : 0;
            const minutes = time ? Number(time.split(".")[0].split(":")[1]) : 0;

            setCurrentYear(year);
            setCurrentMonth(month - 1);
            setCurrentDay(day);
            if (hours || minutes) {
              setCurrentHours(hours);
              setCurrentMinutes(minutes);
            }

            updateDateInput(Number(year), Number(month) - 1, Number(day), hours, minutes);
          })();
        }}
        onClick={(event) => {
          event.preventDefault();
          setCalendarOpen(true);
        }}
        autoComplete="off"
      />

      <div ref={_arCalendar} className={calendarClassName.map((className) => className).join(" ")}>
        {/* :Begin: Calendar */}
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

            <Button
              variant="borderless"
              status={!clockOpen ? "primary" : "danger"}
              onClick={() => {
                _clockOpen.current = !_clockOpen.current;
                setClockOpen((prev) => !prev);
              }}
            >
              Saat
            </Button>
          </div>

          <div>{!clockOpen && okayButton()}</div>
        </div>
        {/* :End: Calendar */}

        {/* :Begin: Clock */}
        <div className={`clock ${clockOpen ? "active" : "passive"}`}>
          <div className="header">
            {currentHours.toString().padStart(2, "0")}
            {" : "}
            {currentMinutes.toString().padStart(2, "0")}
          </div>
          <div className="content">
            <ul ref={_hoursListElement}>{hours}</ul>
            <ul ref={_minutesListElement}>{minutes}</ul>
          </div>
          {clockOpen && <div className="footer">{okayButton()}</div>}
        </div>
        {/* :End: Clock */}
      </div>
    </div>
  );
};

DatePicker.displayName = "DatePicker";
export default DatePicker;

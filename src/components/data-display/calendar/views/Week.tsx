import React, { useEffect, useMemo, useState } from "react";
import { CalendarEvent } from "../IProps";

interface IProps {
  data: CalendarEvent[];
  states: {
    currentDate: {
      get: Date;
      set: React.Dispatch<React.SetStateAction<Date>>;
    };
  };
  config?: {
    locale?: Intl.LocalesArgument;
    weekStartsOn?: number;
  };
}

const Week = ({ data, states, config }: IProps) => {
  const startHour = 0;
  const endHour = 24;
  const hours = endHour - startHour;
  const cellHeight = 60;
  // const slotDuration = 15;
  // const slotHeight = cellHeight / (60 / slotDuration);

  // states
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  // const [tempStart, setTempStart] = useState<{
  //   date: Date;
  //   minutes: number;
  // } | null>(null);

  // methods
  // const handleClick = (weekDay: Date, hourIndex: number) => (event: React.MouseEvent<HTMLDivElement>) => {
  //   const rect = event.currentTarget.getBoundingClientRect();
  //   const y = event.clientY - rect.top;

  //   const slotIndex = Math.floor(y / slotHeight);
  //   const minutes = hourIndex * 60 + slotIndex * slotDuration;

  //   if (!tempStart) {
  //     setTempStart({ date: weekDay, minutes });
  //     return;
  //   }

  //   const startMinutes = Math.min(tempStart.minutes, minutes);
  //   const endMinutes = Math.max(tempStart.minutes, minutes) + slotDuration;

  //   const startDate = new Date(weekDay);
  //   startDate.setHours(Math.floor(startMinutes / 60), startMinutes % 60, 0, 0);

  //   const endDate = new Date(weekDay);
  //   endDate.setHours(Math.floor(endMinutes / 60), endMinutes % 60, 0, 0);

  //   setEvents((prev) => [...prev, { start: startDate, end: endDate }]);
  //   setTempStart(null);
  // };

  const weekDays = useMemo(
    () => getWeekDays(states.currentDate.get, config?.weekStartsOn ?? 1),
    [states.currentDate.get, config?.weekStartsOn],
  );

  // useEffects
  useEffect(() => {
    setEvents(data);
  }, [data]);

  return (
    <div className="ar-calendar-week-view">
      <div className="head">
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="item">
            <span className="day-name">
              {day
                .toLocaleString(config?.locale ?? "tr", {
                  weekday: "short",
                })
                .toUpperCase()}
            </span>
            <span className="date">{day.getDate()}</span>
          </div>
        ))}
      </div>

      <div className="body">
        <div className="clocks">
          {Array.from({ length: hours }, (_, index) => (
            <div key={index}>
              <span>{String(startHour + index).padStart(2, "0")}:00</span>
            </div>
          ))}
        </div>

        <div role="grid" className="grid">
          <div className="events-layer">
            {events.map((event, index) => {
              const dayIndex = weekDays.findIndex((d) => d.toDateString() === event.start.toDateString());

              if (dayIndex === -1) return null;

              const startMinutes = event.start.getHours() * 60 + event.start.getMinutes();
              const durationMinutes = (event.end.getTime() - event.start.getTime()) / 60000;

              const top = (startMinutes / 60) * cellHeight;
              const height = (durationMinutes / 60) * cellHeight;

              return (
                <div
                  key={index}
                  className="event-box"
                  style={{
                    top,
                    height,
                    left: `${(100 / 7) * dayIndex}%`,
                  }}
                >
                  {event.start.toLocaleTimeString(config?.locale ?? "tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {" - "}
                  {event.end.toLocaleTimeString(config?.locale ?? "tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              );
            })}
          </div>

          {Array.from({ length: hours }).map((_, rowIndex) => (
            <div key={rowIndex} className="row">
              {weekDays.map((_, colIndex) => (
                // <div key={colIndex} className="cell" onClick={handleClick(weekDay, rowIndex)} />
                <div key={colIndex} className="cell" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const getWeekRange = (date: Date, weekStartsOn: number = 1) => {
  const current = new Date(date);
  const currentDay = current.getDay();
  const diff = (currentDay - weekStartsOn + 7) % 7;

  const start = new Date(current);
  start.setDate(current.getDate() - diff);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return { start, end };
};

const getWeekDays = (date: Date, weekStartsOn: number = 1) => {
  const { start } = getWeekRange(date, weekStartsOn);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
};

export default Week;

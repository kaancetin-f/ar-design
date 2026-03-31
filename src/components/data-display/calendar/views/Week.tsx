import React, { useEffect, useMemo, useRef, useState } from "react";
import { CalendarEvent } from "../IProps";
import ReactDOM from "react-dom";

interface IProps<T> {
  data: (T & CalendarEvent)[];
  renderItem: (item: T, index: number) => React.JSX.Element;
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

const Week = function <T>({ data, renderItem, states, config }: IProps<T>) {
  // refs
  const _eventBox = useRef<(HTMLDivElement | null)[]>([]);

  // states
  const [mouseCoordinate, setMouseCoordinate] = useState<{
    x: number;
    y: number;
    isRightHalf: boolean;
    isBottomHalf: boolean;
  }>({
    x: 0,
    y: 0,
    isRightHalf: false,
    isBottomHalf: false,
  });
  const [activeTooltip, setActiveTooltip] = useState<{ id: number; content: React.JSX.Element } | null>(null);

  // variables
  const startHour = 0;
  const endHour = 24;
  const hours = endHour - startHour;
  const cellHeight = 60;

  // methods
  const weekDays = useMemo(
    () => getWeekDays(states.currentDate.get, config?.weekStartsOn ?? 1),
    [states.currentDate.get, config?.weekStartsOn],
  );

  // useEffects
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouseCoordinate({
        x: event.clientX,
        y: event.clientY,
        isRightHalf: event.clientX > window.innerWidth / 2,
        isBottomHalf: event.clientY > window.innerHeight / 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="ar-calendar-week-view">
        <div className="head">
          {weekDays.map((day) => (
            <div key={day.toISOString()} className="item">
              <span className="day-name">
                {day.toLocaleString(config?.locale ?? "tr", { weekday: "short" }).toUpperCase()}
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
            {Array.from({ length: hours }).map((_, rowIndex) => (
              <div key={rowIndex} className="row">
                {weekDays.map((_, colIndex) => (
                  <div key={colIndex} className="cell" />
                ))}
              </div>
            ))}
          </div>

          <div className="events-layer">
            {data.flatMap((event, eventIdx) => {
              const eventColor = getColor(eventIdx);

              // Her etkinlik için haftanın günlerini gezip, o güne düşen parçayı hesaplıyoruz
              return weekDays.map((day, dayIndex) => {
                const dayStart = new Date(day);
                dayStart.setHours(0, 0, 0, 0);

                const dayEnd = new Date(day);
                dayEnd.setHours(23, 59, 59, 999);

                // Etkinlik bu günle kesişiyor mu?
                const overlapStart = new Date(Math.max(event.start.getTime(), dayStart.getTime()));
                const overlapEnd = new Date(Math.min(event.end.getTime(), dayEnd.getTime()));

                if (overlapStart < overlapEnd) {
                  // Bu güne düşen kısmın yükseklik ve top değerleri
                  const startMinutes = overlapStart.getHours() * 60 + overlapStart.getMinutes();
                  const durationMinutes = (overlapEnd.getTime() - overlapStart.getTime()) / 60000;

                  const top = (startMinutes / 60) * cellHeight;
                  const height = (durationMinutes / 60) * cellHeight;

                  // Durum Kontrolleri
                  const isContinuedFromYesterday = event.start < dayStart;
                  const isContinuingTomorrow = event.end > dayEnd;

                  return (
                    <div
                      ref={(element) => {
                        if (!element) return;

                        _eventBox.current[dayIndex] = element;
                      }}
                      key={`${eventIdx}-${dayIndex}`}
                      onMouseEnter={() => setActiveTooltip({ content: renderItem(event, eventIdx), id: eventIdx })}
                      onMouseLeave={() => setActiveTooltip(null)}
                      className="event-box"
                      style={{
                        backgroundColor: eventColor.bg,
                        top: `${top}px`,
                        height: `${height}px`,
                        left: `${(100 / 7) * dayIndex}%`,
                        width: `${100 / 7}%`,
                        borderTop: isContinuedFromYesterday ? "none" : `1px solid ${eventColor.border}`,
                        borderBottom: isContinuingTomorrow ? "none" : `1px solid ${eventColor.border}`,
                        borderRadius: isContinuedFromYesterday
                          ? "0 0 var(--border-radius-sm) var(--border-radius-sm)"
                          : isContinuingTomorrow
                            ? "var(--border-radius-sm) var(--border-radius-sm) 0 0"
                            : "var(--border-radius-sm)",
                      }}
                    >
                      {!isContinuedFromYesterday && renderItem(event, eventIdx)}
                    </div>
                  );
                }
                return null;
              });
            })}
          </div>
        </div>
      </div>

      {activeTooltip &&
        ReactDOM.createPortal(
          <div
            className="ar-calendar-tooltip"
            style={{
              top: mouseCoordinate.y,
              left: mouseCoordinate.x,
              transform: `translate(${mouseCoordinate.isRightHalf ? "-110%" : "10%"}, ${mouseCoordinate.isBottomHalf ? "-110%" : "10%"})`,
            }}
          >
            {activeTooltip.content}
          </div>,
          document.body,
        )}
    </>
  );
};

// Yardımcı Fonksiyonlar aynı kalıyor
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

const getColor = (id: string | number) => {
  const colors = [
    { bg: "#3174ad", border: "#2a6293" }, // Mavi
    { bg: "#4caf50", border: "#388e3c" }, // Yeşil
    { bg: "#ff9800", border: "#f57c00" }, // Turuncu
    { bg: "#9c27b0", border: "#7b1fa2" }, // Mor
    { bg: "#e91e63", border: "#c2185b" }, // Pembe
    { bg: "#00bcd4", border: "#0097a7" }, // Turkuaz
  ];
  const index = typeof id === "number" ? id : id.length;
  return colors[index % colors.length];
};

export default Week;

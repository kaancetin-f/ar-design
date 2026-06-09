"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../../../assets/css/components/charts/gantt/styles.css";
import Pagination from "../../navigation/pagination";
import { useTranslation } from "../../../libs/core/application/hooks";
import IProps, { Task } from "./IProps";

const colors = ["#A881FA", "#75CFA4", "#EE6D63", "#FAD87A"];

const Gantt: React.FC<IProps> = ({ data, pagination, config = { isSearchable: false } }) => {
  // refs
  const _svg = useRef<SVGSVGElement>(null);
  const _mapIsMoveField = useRef<SVGRectElement>(null);

  // states
  const [scrollX, setScrollX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  // states -> Pagination
  // const [totalRecords, _] = useState<number>(0); // Not used, pagination.totalRecords is used directly or tasks.length. Keeping it commented out.
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPerPage, setSelectedPerPage] = useState<number>(pagination?.perPage ?? 10);
  // states -> Mobil
  const [isMobile, setIsMobile] = useState(false);

  // variables
  const TIMELINE = generateGanttTimeline(data);

  const HEADER_HEIGHT = 75;
  const STROKE_WIDTH = 0.5;
  const ROW_HEIGHT = 45;

  const LABEL_WIDTH = useMemo(() => {
    const longestName = data.reduce(
      (maxTask, currentTask) => (currentTask.name.length > maxTask.name.length ? currentTask : maxTask), // Corrected logic
      {
        name: "",
      },
    ).name;
    const estimatedWidth = longestName.length * 7 + 25;

    return Math.min(Math.max(estimatedWidth, 120), 250);
  }, [data]);

  const SVG_WIDTH = "100%";
  const SVG_HEIGHT = HEADER_HEIGHT + data.length * ROW_HEIGHT + ROW_HEIGHT * 2;

  let PREVMATCHMONT: number = 0;
  let PREVMATCHDAY: number = 0;

  // hooks
  const { t } = useTranslation(String(config.locale ?? "tr"));

  // methods
  const handleResize = useMemo(() => {
    return (_: UIEvent) => {
      setIsMobile(window.innerWidth <= 768);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;

    setIsDragging(true);
    setStartX(e.clientX + scrollX);
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!isDragging) return;

      let newScrollX = startX - e.clientX;

      if (newScrollX < 0) newScrollX = 0;

      const maxScrollWidth = TIMELINE.days.length * 60 - ((_svg.current?.clientWidth ?? 0) - LABEL_WIDTH);
      if (newScrollX > maxScrollWidth) newScrollX = maxScrollWidth;

      setScrollX(newScrollX);
    },
    [isDragging, startX, TIMELINE.days.length, LABEL_WIDTH],
  );

  const handleMouseUpOrLeave = () => {
    const svgRect = _svg.current?.getBoundingClientRect();
    const mapIsMoveFieldRect = _mapIsMoveField.current?.getBoundingClientRect();

    if (svgRect && mapIsMoveFieldRect) {
      const svgElement = _svg.current;
      if (!svgElement) return;

      const chartContentWidth = TIMELINE.days.length * 60;
      const viewportWidth = svgElement.clientWidth;

      const availableChartWidth = viewportWidth - LABEL_WIDTH;

      if (chartContentWidth > availableChartWidth) {
        const maxScrollX = chartContentWidth - availableChartWidth;
        if (scrollX > maxScrollX) {
          setScrollX(maxScrollX);
        }
      } else {
        setScrollX(0);
      }
    }
    setIsDragging(false);
  };

  // useEffects
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <div className="ar-gantt-chart">
      <svg
        ref={_svg}
        xmlns="http://www.w3.org/2000/svg"
        // viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        className="ar-gantt-chart-svg"
      >
        {/* :Begin: Header */}
        <g className="header" width={"100%"}>
          {/* Background */}
          <rect x={0} y={0} width={"100%"} height={HEADER_HEIGHT} />

          <g transform={`translate(25, ${HEADER_HEIGHT / 2})`} className="title-group">
            <text className="title">Ar Gantt Chart</text>

            <text y={20} className="title-description">
              Daily View
            </text>
          </g>

          <line
            x1="0"
            y1={HEADER_HEIGHT}
            x2={"100%"}
            y2={HEADER_HEIGHT}
            opacity={0.25}
            stroke="var(--black)"
            strokeWidth={1}
          />
        </g>
        {/* :END: Header */}

        {/* :Begin: Body */}
        <g className="body" transform={`translate(0, ${HEADER_HEIGHT + ROW_HEIGHT * 2})`}>
          {/* :Begin: Time Axis & Bars */}
          <g
            className={`${isDragging ? "dragging" : "no-dragging"} time-and-bars`}
            transform={`translate(${LABEL_WIDTH - scrollX}, 0)`} // Apply scrollX as a negative offset
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            style={{ cursor: isDragging ? "grabbing" : "grab", userSelect: "none" }}
          >
            {/* :Begin: Months & Days */}
            <g>
              {TIMELINE.days.map((day, index) => {
                const xPos = (index + 1) * 60;
                const nextDay = new Date(day.date);
                nextDay.setDate(nextDay.getDate() + 1);
                const isLastDayOfMonth = day.date.getMonth() !== nextDay.getMonth();

                const isSunday = day.date.getDay() === 0;
                if (!isSunday && !isLastDayOfMonth) return null; // Return null if not to be rendered

                const currentMonthNum = day.date.getMonth();
                const currentDayNum = day.date.getDate();
                // NOTE: PREVMATCHMONT and PREVMATCHDAY are mutable variables used in render,
                // which is an anti-pattern in React. This logic should ideally be moved
                // to a memoized function or derived from state/props.
                // For this change, we'll keep the existing logic but acknowledge it's not ideal.
                // Resetting for each render pass to avoid unexpected behavior across renders.
                if (index === 0) {
                  // Reset on first iteration
                  PREVMATCHMONT = 0;
                  PREVMATCHDAY = 0;
                }
                const dayDiff = currentDayNum - (currentMonthNum !== PREVMATCHMONT ? 0 : PREVMATCHDAY);
                // Bir sonraki turda kullanabilmek için hafızayı güncelliyoruz.
                PREVMATCHMONT = currentMonthNum;
                PREVMATCHDAY = currentDayNum;

                return (
                  <g key={index}>
                    <line
                      x1={xPos}
                      y1={-ROW_HEIGHT * 2}
                      x2={xPos}
                      y2={0}
                      opacity={0.25}
                      stroke="var(--black)"
                      strokeWidth={STROKE_WIDTH}
                    />

                    <text
                      x={xPos - (dayDiff * 60) / 2}
                      y={-ROW_HEIGHT * 2 + ROW_HEIGHT / 2}
                      fill="var(--black)"
                      fontSize="12"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {day.date.toLocaleDateString("tr-TR", { month: "long" })}
                    </text>
                  </g>
                );
              })}

              {TIMELINE.days.map((day, index) => {
                const xPos = (index + 1) * 60; // 01:00 -> 60px, 02:00 -> 120px...

                return (
                  <g key={index}>
                    <text
                      x={(index + 1) * 60 - 30}
                      y={-ROW_HEIGHT + ROW_HEIGHT / 2}
                      fill={day.isWeekend ? "var(--red-500)" : "var(--black)"}
                      fontSize="12"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {String(day.number).padStart(2, "0")} {day.name}
                    </text>

                    <line
                      x1={xPos}
                      y1={0}
                      x2={xPos}
                      y2={SVG_HEIGHT}
                      opacity={0.25}
                      stroke="var(--black)"
                      strokeWidth={STROKE_WIDTH}
                      strokeDasharray={"5,5"}
                    />
                  </g>
                );
              })}

              <line
                x1={0}
                y1={-ROW_HEIGHT}
                x2={TIMELINE.days.length * 60}
                y2={-ROW_HEIGHT}
                opacity={0.25}
                stroke="var(--black)"
                strokeWidth={1}
              />

              <line
                x1={0}
                y1={0}
                x2={TIMELINE.days.length * 60}
                y2={0}
                opacity={0.25}
                stroke="var(--black)"
                strokeWidth={1}
              />
            </g>
            {/* :End: Months & Days */}

            {/* :Begin: Map */}
            <g transform={`translate(0, 0)`}>
              {data.map((task, index) => {
                const taskStart = new Date(task.start);
                const taskEnd = new Date(task.end);

                // 1. Proje başlangıcından bu görevin başlangıcına kadar geçen toplam milisaniye
                const diffMsFromStart = taskStart.getTime() - Number(TIMELINE.timelineStart?.getTime());

                // Milisaniyeyi saate çeviriyoruz
                const hoursFromStart = diffMsFromStart / (1000 * 60 * 60);

                // X Konumu: Geçen toplam saati, saat başına düşen piksel genişliğiyle çarpıyoruz
                const x = hoursFromStart * (60 / 24);

                // 2. Görevin toplam süresini saat cinsinden buluyoruz
                const durationHours = (taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60);

                // Genişlik (Width): Süreyi saat başına düşen pikselle çarpıyoruz
                const width = durationHours * (60 / 24);

                // 3. Dikey Konumlandırma (Senin mevcut mantığın)
                const height = ROW_HEIGHT / 1.5;
                const y = index * ROW_HEIGHT + height / 4;

                return (
                  <g key={task.id}>
                    <rect x={x} y={y} width={width} height={height} fill={colors[index % colors.length]} rx={3} />

                    {width > 60 && (
                      <text
                        x={x + width / 2}
                        y={y + height / 2 + 4}
                        fontSize={12}
                        fontWeight="600"
                        fill="var(--black)"
                        textAnchor="middle"
                      >
                        {task.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
            {/* :End: Map */}

            <rect
              ref={_mapIsMoveField}
              x={0}
              y={-ROW_HEIGHT}
              width={TIMELINE.days.length * 60} // This is the total width of the chart content
              height={SVG_HEIGHT}
              fill="transparent"
              pointerEvents="all"
            />
          </g>
          {/* :End: Time Axis & Bars */}

          {/* :Begin:Left Label Axis */}
          <g className="left-axis">
            {/* Background */}
            <rect x={0} y={-ROW_HEIGHT * 2 + 0.5} width={LABEL_WIDTH} height={SVG_HEIGHT} fill="var(--gray-200)" />

            <g className="label-list">
              {data.map((task, index) => {
                const y = index * ROW_HEIGHT;
                const textContent = task.name;
                const maxTextWidth = LABEL_WIDTH - 20; // 10px padding on each side

                return (
                  <g key={task.id} className="label-row">
                    <text
                      x="10"
                      y={y + ROW_HEIGHT / 2}
                      className="label-text"
                      // Add title for tooltip if text is truncated
                      // title={textContent.length * 7 > maxTextWidth ? textContent : undefined}
                    >
                      {/* Truncate text if it exceeds maxTextWidth (rough character count estimation) */}
                      {textContent.length * 7 > maxTextWidth
                        ? `${textContent.substring(0, Math.floor(maxTextWidth / 7) - 3)}...`
                        : textContent}
                    </text>

                    <line
                      x1="0"
                      y1={y + ROW_HEIGHT}
                      x2={LABEL_WIDTH}
                      y2={y + ROW_HEIGHT}
                      stroke="var(--black)"
                      strokeWidth="0.5"
                      opacity={0.25}
                    ></line>

                    <line
                      x1={LABEL_WIDTH}
                      y1={y + ROW_HEIGHT}
                      x2={LABEL_WIDTH + TIMELINE.days.length * 60} // Extend across the entire chart width
                      y2={y + ROW_HEIGHT}
                      opacity={0.25}
                      stroke="var(--black)"
                      strokeWidth={STROKE_WIDTH}
                      strokeDasharray={"5,5"}
                    />
                  </g>
                );
              })}
            </g>
          </g>
          {/* :End:Left Label Axis */}
        </g>
        {/* :End: Body */}
      </svg>
      {/* Hidden text element for measuring width (optional, for more accurate truncation if needed) */}
      {/* <svg style={{ position: 'absolute', visibility: 'hidden', height: 0, width: 0 }}>
        <text ref={_textMeasureRef} style={{ fontSize: '12px', fontWeight: '600', fontFamily: 'sans-serif' }}></text>
      </svg> */}

      <div className="footer">
        <span>
          {isMobile ? (
            <>
              <strong>
                {(currentPage - 1) * selectedPerPage + 1} -{" "}
                {/* Corrected to use tasks.length or pagination.totalRecords */}
                {Math.min(currentPage * selectedPerPage, pagination?.totalRecords || data.length)} of{" "}
                {pagination?.totalRecords || data.length}
              </strong>
            </>
          ) : (
            t(
              "Table.Pagination.Information.Text",
              (currentPage - 1) * selectedPerPage + 1, // Corrected to use tasks.length or pagination.totalRecords
              Math.min(currentPage * selectedPerPage, pagination?.totalRecords || data.length),
              pagination?.totalRecords || data.length,
            )
          )}
        </span>

        {pagination && (
          <Pagination
            totalRecords={config.isServerSide ? pagination.totalRecords : (data.length ?? 0)} // Corrected to use tasks.length
            currentPage={currentPage}
            perPage={selectedPerPage}
            onChange={(currentPage, perPage) => {
              setCurrentPage(currentPage);
              setSelectedPerPage(perPage);
              pagination.onChange?.(currentPage, perPage);
            }}
          />
        )}
      </div>
    </div>
  );
};

const generateGanttTimeline = (data: Task[]) => {
  if (!data || data.length === 0) {
    return { minDate: null, maxDate: null, months: [], days: [] };
  }

  // 1. En erken başlangıç ve en geç bitiş tarihlerini buluyoruz.
  let minDate = new Date(data[0].start);
  let maxDate = new Date(data[0].end);

  data.forEach((task) => {
    const start = new Date(task.start);
    const end = new Date(task.end);
    if (start < minDate) minDate = start;
    if (end > maxDate) maxDate = end;
  });

  // Şemanın düzgün görünmesi için başlangıcı o ayın 1'ine,
  // bitişi ise o ayın son gününe yuvarlamak yerleşim açısından daha iyi sonuç verir.
  const startTimeline = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  const endTimeline = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0); // Ayın son günü

  const months: Array<{ year: number; number: number; name: string; totalDays: number }> = [];
  const days: Array<{ date: Date; number: number; name: string; isWeekend: boolean }> = [];

  // 2. Günleri ve Ayları döngüyle oluşturuyoruz.
  const current = new Date(startTimeline);

  while (current <= endTimeline) {
    // Gün listesini doldur.
    const dayOfWeek = current.getDay();
    days.push({
      date: new Date(current),
      number: current.getDate(),
      name: current.toLocaleDateString("tr-TR", { weekday: "short" }), // Pzt, Sal...
      isWeekend: dayOfWeek === 0 || dayOfWeek === 6, // Hafta sonu kontrolü (Gantt'ta boyamak için).
    });

    // Ay listesini doldur. (Eğer listede bu ay henüz yoksa ekle)
    const year = current.getFullYear();
    const number = current.getMonth();
    const name = current.toLocaleDateString("tr-TR", { month: "long" }); // Ocak, Şubat...

    const monthExists = months.some((m) => m.year === year && m.number === number);
    if (!monthExists) {
      // O ayın toplam gün sayısını bulalım.
      const totalDays = new Date(year, number + 1, 0).getDate();
      months.push({ year, number, name, totalDays });
    }

    // Bir sonraki güne geç.
    current.setDate(current.getDate() + 1);
  }

  return {
    timelineStart: startTimeline,
    timelineEnd: endTimeline,
    months, // Üst zaman bandı için (Örn: Ocak, Şubat)
    days, // Alt zaman bandı için (Örn: 1, 2, 3... veya haftalık kırılım için)
  };
};

export default Gantt;

import React, { useCallback, useRef, useState } from "react";
import "../../../assets/css/components/charts/gantt/styles.css";

const tasks: Task[] = [
  {
    id: "ffa5c782-f482-49ed-acd5-f5cab8b2c39e",
    name: "Turksat2LoV10000",
    start: "2026-04-22T09:30:00Z",
    end: "2026-04-22T14:30:00Z",
  },
  {
    id: "ff68947f-b2c2-4621-b5db-fd57702d037a",
    name: "Turksat2LoV10000",
    start: "2026-08-31T09:30:00Z",
    end: "2026-08-31T14:30:00Z",
  },
  {
    id: "ff2e87f5-9b3c-470d-bda9-dfea1851680c",
    name: "IRD 6",
    start: "2026-04-15T10:30:00Z",
    end: "2026-04-15T17:30:00Z",
  },
];

interface Task {
  id: string | number;
  name: string;
  start: string;
  end: string;
}

const Gantt: React.FC<{}> = () => {
  // refs
  const _svg = useRef<SVGSVGElement>(null);
  const _mapIsMoveField = useRef<SVGRectElement>(null);

  // states
  const [scrollX, setScrollX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);

  // variables
  const TIMELINE = generateGanttTimeline(tasks);

  const SVG_WIDTH = "100%";
  const SVG_HEIGHT = 2400;
  const HEADER_HEIGHT = 75;
  const STROKE_WIDTH = 0.5;
  const LABEL_WIDTH = 120;
  const ROW_HEIGHT = 45;

  let PREVMATCHMONT: number = 0;
  let PREVMATCHDAY: number = 0;

  // methods
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;

    setIsDragging(true);
    // Tıklanılan ilk X pozisyonu ile mevcut kaydırma değerini hafızaya alıyoruz.
    setStartX(e.clientX + Math.abs(scrollX));
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!isDragging) return;

      let newScrollX = startX - e.clientX;
      if (newScrollX < 0) newScrollX = 0;

      setScrollX(newScrollX);
    },
    [isDragging, startX],
  );

  const handleMouseUpOrLeave = () => {
    const svgRect = _svg.current?.getBoundingClientRect();
    const mapIsMoveFieldRect = _mapIsMoveField.current?.getBoundingClientRect();

    if (svgRect && mapIsMoveFieldRect) {
      if (svgRect.right > mapIsMoveFieldRect.right) {
        const targetLeft = svgRect.width - mapIsMoveFieldRect.width;
        setScrollX(targetLeft - LABEL_WIDTH);
      }
    }

    setIsDragging(false);
  };

  return (
    <svg
      ref={_svg}
      xmlns="http://www.w3.org/2000/svg"
      // viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      width={SVG_WIDTH}
      height={SVG_HEIGHT}
      className="ar-gantt-chart"
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
          transform={`translate(${LABEL_WIDTH - Math.abs(scrollX)}, 0)`}
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
              if (!isSunday && !isLastDayOfMonth) return;

              const currentMonthNum = day.date.getMonth();
              const currentDayNum = day.date.getDate();
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
                    stroke="var(--white)"
                    strokeWidth={STROKE_WIDTH}
                  />

                  <text
                    x={xPos - (dayDiff * 60) / 2}
                    y={-ROW_HEIGHT * 2 + ROW_HEIGHT / 2}
                    fill="var(--white)"
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
                    fill={day.isWeekend ? "var(--red-500)" : "var(--white)"}
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
                    stroke="var(--white)"
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
              stroke="var(--white)"
              strokeWidth={1}
            />

            <line
              x1={0}
              y1={0}
              x2={TIMELINE.days.length * 60}
              y2={0}
              opacity={0.25}
              stroke="var(--white)"
              strokeWidth={1}
            />
          </g>
          {/* :End: Months & Days */}

          {/* :Begin: Map */}
          <g transform={`translate(0, 0)`}>
            {tasks.map((task, index) => {
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
                  <rect x={x} y={y} width={width} height={height} fill={"#000"} rx={3} />

                  {width > 60 && (
                    <text
                      x={x + width / 2}
                      y={y + height / 2 + 4} // Dikine tam ortalamak için basamak ayarı
                      fontSize={12}
                      fontWeight="600"
                      fill="var(--black)"
                      textAnchor="middle" // Metni X koordinatına göre tam ortalar
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
            width={TIMELINE.days.length * 60}
            height={SVG_HEIGHT}
            fill="transparent"
            pointerEvents="all"
          />
        </g>
        {/* :End: Time Axis & Bars */}

        {/* :Begin:Left Label Axis */}
        <g className="left-axis">
          {/* Background */}
          <rect x={0} y={-ROW_HEIGHT * 2} width={LABEL_WIDTH} height={SVG_HEIGHT} />

          <g className="label-list">
            {tasks.map((task, index) => {
              const y = index * ROW_HEIGHT;

              return (
                <g key={task.id} className="label-row">
                  <text x="10" y={y + ROW_HEIGHT / 2} className="label-text">
                    {task.name}
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
                    x2={24 * 60}
                    y2={y + ROW_HEIGHT}
                    opacity={0.25}
                    stroke="var(--white)"
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
  );
};

const generateGanttTimeline = (tasks: Task[]) => {
  if (!tasks || tasks.length === 0) {
    return { minDate: null, maxDate: null, months: [], days: [] };
  }

  // 1. En erken başlangıç ve en geç bitiş tarihlerini buluyoruz.
  let minDate = new Date(tasks[0].start);
  let maxDate = new Date(tasks[0].end);

  tasks.forEach((task) => {
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

import React, { useEffect, useRef } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/charts/pie/pie.css";

const Pie: React.FC<IProps> = ({ data }) => {
  // refs
  const _arPieChart = useRef<HTMLDivElement>(null);
  // variable/s
  const conicColors = ["primary", "success", "warning", "danger", "light", "dark"];
  const conic: string[] = [];

  // useEffects
  useEffect(() => {
    if (!_arPieChart.current) return;

    let total = data.reduce((sum, value) => sum + value.value, 0);
    let normalizedData = data.map((value) => (value.value / total) * 100);
    let start = 0;

    normalizedData.forEach((percent, index) => {
      let end = start + percent; // Bitiş yüzdesini hesapla
      conic.push(`var(--${conicColors[index]}) ${start}% ${end}%`);
      start = end; // Sonraki dilim için başlangıç noktasını ayarla
    });

    _arPieChart.current.style.background = `conic-gradient(${conic.join(", ")})`;
  }, [data]);

  return (
    <div className="ar-pie-chart-wrapper">
      <div ref={_arPieChart} className="ar-pie-chart">
        <article>{/* <span>33%</span> */}</article>
      </div>

      <div className="information-field">
        {data.map((item, index) => (
          <article>
            <span style={{ backgroundColor: `var(--${conicColors[index]})` }}>%{item.value}</span>
            <span>{item.text}</span>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Pie;

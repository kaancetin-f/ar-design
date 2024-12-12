import React, { useEffect, useRef, useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/charts/pie/pie.css";

const Pie: React.FC<IProps> = ({ data }) => {
  // refs
  const _arPieChart = useRef<HTMLDivElement>(null);

  // state
  const [conic, setConic] = useState<string[]>([]);

  // variable/s
  const conicColors = ["primary", "success", "warning", "danger", "light", "dark"];

  useEffect(() => {
    if (!_arPieChart.current || data.length === 0) return;

    let total = data.reduce((sum, value) => sum + value.value, 0);
    let normalizedData = data.map((value) => (value.value / total) * 100);
    let start = 0;
    const conicGradients: string[] = [];

    normalizedData.forEach((percent, index) => {
      let end = start + percent; // Bitiş yüzdesini hesapla
      conicGradients.push(`var(--${conicColors[index]}) ${start}% ${end}%`);
      start = end; // Sonraki dilim için başlangıç noktasını ayarla
    });

    setConic(conicGradients);
  }, [data]);

  return (
    <div className="ar-pie-chart-wrapper">
      <div ref={_arPieChart} className="ar-pie-chart" style={{ background: `conic-gradient(${conic.join(", ")})` }}>
        <article>{/* Grafik yüzdesi burada olabilir */}</article>
      </div>

      <div className="information-field">
        {data.map((item, index) => (
          <article key={index}>
            <span style={{ backgroundColor: `var(--${conicColors[index]})` }}>%{item.value}</span>
            <span>{item.text}</span>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Pie;

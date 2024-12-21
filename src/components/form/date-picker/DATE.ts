class DATE {
  public Parse = (value: string, isCloack: boolean = false) => {
    // Seçilmiş Tarih ve Zaman
    const [sd, st] = value.split("T");
    const [y, m, d] = sd.split("-").map(Number);

    // Zaman Bilgileri
    const [c, _] = isCloack ? st.split(".") : "00:00";
    const [hh, mm] = isCloack ? c.split(":").map(Number) : [0, 0];

    return {
      year: y,
      month: m,
      day: d,
      hours: hh,
      minutes: mm,
    };
  };

  public ParseValue = (value: string, isCloack: boolean = false) => {
    const [date, time] = value.split("T");
    const [clock, _] = isCloack && time ? time.split(".") : "00:00";

    return !isCloack ? date : `${date}T${clock}`;
  };
}

export default new DATE();

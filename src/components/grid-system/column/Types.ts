type Column = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Props = {
  children: React.ReactNode;
  column?: {
    xl?: Column;
    lg?: Column;
    md?: Column;
    sm?: Column;
    xs?: Column;
  };
  align?: "left" | "center" | "right";
};

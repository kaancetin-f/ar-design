export type Option = { id: string; value: string };

type Multiple = { onChange: (option: Option[]) => void; multiple: true };
type Single = { onChange: (option: Option | undefined) => void; multiple?: false };

export type Props = { variant?: "filled" | "outlined" | "borderless"; options: Option[] } & (
  | Multiple
  | Single
);

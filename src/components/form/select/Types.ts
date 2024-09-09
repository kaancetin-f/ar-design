import { Variants } from "../../../libs/types/Variants";

export type Option = { value: string | number; text: string };

type Multiple = { onChange: (option: Option[]) => void; multiple: true };
type Single = { onChange: (option: Option | undefined) => void; multiple?: false };

export type Props = { variant?: Variants; options: Option[] } & (Multiple | Single);

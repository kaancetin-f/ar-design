import { HTMLAttributes } from "react";

export type Props = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLButtonElement>;

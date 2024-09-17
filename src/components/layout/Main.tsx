import React from "react";
import { MainProps } from "./Types";

const Main: React.FC<MainProps> = ({ children }) => <main>{children}</main>;

Main.displayName = "Layout.Main";
export default Main;

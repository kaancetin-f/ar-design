import { useContext } from "react";
import { LayoutContext } from "../contexts/Layout";

const useLayout = () => useContext(LayoutContext);

export default useLayout;

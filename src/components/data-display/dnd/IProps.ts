import React from "react";

interface IProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.JSX.Element;
  onChange: (data: T[]) => void;
}

export default IProps;

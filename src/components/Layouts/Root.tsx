import React from "react";

type Props = {
  children: React.ReactNode;
};
const Root: React.FC<Props> = ({ children }) => {
  return <div>Root{children}</div>;
};

export default Root;

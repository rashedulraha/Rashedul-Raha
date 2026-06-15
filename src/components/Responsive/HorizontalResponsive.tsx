import React from "react";
const HorizontalResponsive = ({ children }: { children: React.ReactNode }) => {
  return <div className="py-10 md:py-20 lg:py-30 mt-20">{children}</div>;
};

export default HorizontalResponsive;

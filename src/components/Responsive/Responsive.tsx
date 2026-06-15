import React from "react";

const Responsive = ({ children }: { children: React.ReactNode }) => {
  return <div className="py-10 md:py-20 mt-20">{children}</div>;
};

export default Responsive;

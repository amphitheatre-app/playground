import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex flex-col bg-[#1d2a35] h-screen">{children}</div>;
};

export default Layout;

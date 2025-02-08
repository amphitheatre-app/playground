import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

export default Layout;

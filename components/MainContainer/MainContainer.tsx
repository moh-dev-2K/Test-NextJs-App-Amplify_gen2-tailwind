import React from "react";

function MainContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col justify-between h-full">{children}</div>;
}

export default MainContainer;

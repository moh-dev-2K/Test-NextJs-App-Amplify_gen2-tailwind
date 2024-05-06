import React from "react";
import Footer from "@/components/Footer/Footer";

function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default MainContainer;

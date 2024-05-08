"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      console.log("inside timeout");
      redirect("/dashboard");
    }, 0);
    console.log("useEffect");
  });
  return <div className="App"></div>;
};

export default App;

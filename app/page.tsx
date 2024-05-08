"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      redirect("/dashboard");
    }, 0);
  });
  return <div className="App"></div>;
};

export default App;

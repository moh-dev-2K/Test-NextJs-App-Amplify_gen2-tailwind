"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    redirect("/dashboard");
  });
  return <div className="App"></div>;
};

export default App;

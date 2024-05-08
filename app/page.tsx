"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const App = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      console.log("inside timeout");
      router.push("/dashboard");
    }, 0);
    console.log("useEffect");
  });
  return <div className="App"></div>;
};

export default App;

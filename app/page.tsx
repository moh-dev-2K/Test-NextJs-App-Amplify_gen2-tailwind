"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const App = () => {
  const router = useRouter();
  useEffect(() => {
    console.log("useEffect");
    router.push("/dashboard");
  });
  return <div className="App"></div>;
};

export default App;

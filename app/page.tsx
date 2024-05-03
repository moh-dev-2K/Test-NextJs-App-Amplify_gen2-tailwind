"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    return redirect("/users");
  }, []);
};

export default Index;

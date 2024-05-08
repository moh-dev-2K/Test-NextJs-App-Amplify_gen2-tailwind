import React from "react";
import Button from "@/components/button/Button";

function Header() {
  return (
    <div className="text-center">
      <h1 className="bg-[#0F172A] flex justify-between gap-3 text-2xl text-white font-bold p-4 drop-shadow-xl">
        <img className="h-7 w-auto" src="icon.jpeg" alt="" />
        Amplify Gen 2 Test App
        <div className="text-base bg-white text-black rounded-lg p-1.5 hover:scale-105">
          <Button />
        </div>
      </h1>
    </div>
  );
}

export default Header;

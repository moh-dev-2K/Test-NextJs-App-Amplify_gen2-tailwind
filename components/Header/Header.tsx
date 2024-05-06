import React from "react";

function Header() {
  return (
    <div className="text-center">
      <h1 className="bg-[#0F172A] flex justify-center gap-3 text-2xl text-white font-bold p-4 drop-shadow-xl">
        <img className="h-7 w-auto" src="icon.jpeg" alt="" />
        Amplify Gen 2 Test App
      </h1>
    </div>
  );
}

export default Header;

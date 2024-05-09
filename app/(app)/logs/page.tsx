"use client";

import ListingHeader from "@/components/ui/HeaderTitle/HeaderTitle";
import Grid from "@/components/Grid/Grid";
import { useState } from "react";
import { Search } from "lucide-react";

const Logs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="h-[100%]">
      <ListingHeader title="Error Logs"></ListingHeader>

      <div className="flex sm:flex-row flex-col sm:justify-between justify-center items-center px-5 mt-8">
        <div className="flex items-center relative lg:w-[400px] sm:w-[250px] w-full sm:mr-6 mr-0 sm:mb-2 mb-8">
          <Search
            color="#dddddd"
            size={18}
            className="mx-3 mb-1 absolute focus:text-[#EBA232]"
          />

          <input
            type="text"
            className="rounded-full bg-[#FFFFFF] px-9 py-4 text-sm text-gray-800 border border-[#dddddd] w-full 
      placeholder-[#dddddd] placeholder:text-sm
      focus:border-[#f5f5f5] focus:outline-none"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery((value) => e.target.value);
            }}
          />
        </div>
      </div>

      <div className="flex h-[450px] sm:flex-row flex-col sm:justify-between justify-center items-center px-5 mt-8">
        <Grid searchQuery={searchQuery}></Grid>
      </div>
    </div>
  );
};

export default Logs;

"use client";

import React, { useEffect, useState } from "react";
import Pagination from "@/components/ui/table/pagination/pagination";
import UserColumns, { UserColumnsProps } from "./columns";
import LimitPerPage from "@/components/ui/table/pagination/limitPerPage/limitPerPage";
import ListingHeader from "@/components/ui/HeaderTitle/HeaderTitle";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { errorLogsData } from "@/data/errorLogs";
const entriesPerPageOptions = [5, 10, 15];

function Logs() {
  const [errorLogs, setErrorLogs] = useState<any>(errorLogsData.slice(0, 5));
  const [currentPage, setCurrentPage] = useState(1);
  const [errorLogsLimit, setErrorLogsLimit] = useState(5);
  const [totalPages, setTotalPages] = useState<number>(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const router = useRouter();

  useEffect(() => {
    pagination();
  }, [currentPage]);

  useEffect(() => {
    handleSorting();
  }, [sortBy, sortOrder]);

  const pagination = () => {
    const start =
      (currentPage - 1) * Math.min(errorLogsData.length, errorLogsLimit);
    const end = start + errorLogsLimit;
    setErrorLogs(errorLogsData.slice(start, end));
  };

  const handleEntriesPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const errorLogsLimit = parseInt(event.target.value);
    setErrorLogsLimit(errorLogsLimit);
    const updatedErrorLogs = errorLogsData.slice(0, errorLogsLimit);
    setErrorLogs(updatedErrorLogs);
    const totalPages = Math.ceil(errorLogsData.length! / errorLogsLimit);
    setTotalPages(totalPages);
    setCurrentPage(1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((value) => value - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((value) => value + 1);
    }
  };

  const handleSorting = () => {
    let sortedErrorLogs = [...errorLogsData];
    if (sortBy === "errorMessage" || sortBy === "errorType") {
      sortedErrorLogs.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortBy].localeCompare(b[sortBy]);
        } else {
          return b[sortBy].localeCompare(a[sortBy]);
        }
      });
    } else if (sortBy === "timestamp") {
      sortedErrorLogs.sort((a, b) => {
        if (sortOrder === "asc") {
          return (
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
        } else {
          return (
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
        }
      });
    }
    setErrorLogs(sortedErrorLogs.slice(0, errorLogsLimit));
  };

  const handleSortByAndOrder = (newSortBy: string) => {
    if (sortBy != newSortBy) {
      setSortBy(newSortBy);
    }
    if (sortOrder == "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
  };

  const userColProps: UserColumnsProps = {
    handleSortByAndOrder,
    sortBy,
    sortOrder,
  };
  return (
    <div className="">
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
              const updatedUsers = errorLogsData.filter(
                (errorLog: any) =>
                  errorLog.errorMessage
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  errorLog.errorType
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  errorLog.timestamp
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              );
              setErrorLogs(updatedUsers.slice(0, errorLogsLimit));
            }}
          />
        </div>

        <div className="flex sm:flex-row flex-col items-center">
          <div className="text-right text-xs pr-6 sm:mb-0 mb-8">
            <LimitPerPage
              entriesLimit={errorLogsLimit}
              handleEntriesPerPageChange={handleEntriesPerPageChange}
              entriesPerPageOptions={entriesPerPageOptions}></LimitPerPage>
          </div>
        </div>
      </div>

      <div className="overflow-auto rounded-lg border border-gray-200 drop-shadow-lg m-5">
        <table className="bg-white text-left text-xs text-gray-600 w-full">
          <thead className="bg-[#0F172A]">
            <UserColumns {...userColProps} />
          </thead>

          <tbody>
            {errorLogs &&
              errorLogs!.map((errorLog: any) => (
                <tr
                  onDoubleClick={() => {
                    router.push("/dashboard");
                  }}
                  key={errorLog.id}
                  className="hover:bg-[#F4F5F7] border-b border-[#f5f5f5]">
                  <td className="px-2 py-4">{errorLog.timestamp}</td>
                  <td className="px-2 py-4">{errorLog.errorMessage}</td>
                  <td className="px-2 py-4">{errorLog.errorType}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalUsers={errorLogsData.length}
        currentPage={currentPage}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
      />
    </div>
  );
}

export default Logs;

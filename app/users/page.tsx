"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import _ from "lodash";
import Pagination from "@/components/ui/table/pagination/pagination";
import UserColumns, { UserColumnsProps } from "./columns";
import LimitPerPage from "@/components/ui/table/pagination/limitPerPage/limitPerPage";
import ListingHeader from "@/components/ui/HeaderTitle/HeaderTitle";
import { usersData } from "@/data/users";

const entriesPerPageOptions = [5, 10, 15];

const UserList = () => {
  const [users, setUsers] = useState<any>(usersData.slice(0, 5));
  const [currentPage, setCurrentPage] = useState(1);
  const [usersLimit, setUsersLimit] = useState(5);
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
    const start = (currentPage - 1) * Math.min(usersData.length, usersLimit);
    const end = start + usersLimit;
    setUsers(usersData.slice(start, end));
  };

  const handleEntriesPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const usersLimit = parseInt(event.target.value);
    setUsersLimit(usersLimit);
    const updatedUsers = usersData.slice(0, usersLimit);
    setUsers(updatedUsers);
    const totalPages = Math.ceil(usersData.length! / usersLimit);
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
    let sortedUsers = [...usersData];
    if (sortBy === "name" || sortBy === "email" || sortBy === "profession") {
      sortedUsers.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortBy].localeCompare(b[sortBy]);
        } else {
          return b[sortBy].localeCompare(a[sortBy]);
        }
      });
    } else if (sortBy === "phoneNumber") {
      sortedUsers.sort((a, b) => {
        if (sortOrder === "asc") {
          return parseInt(a[sortBy]) - parseInt(b[sortBy]);
        } else {
          return parseInt(b[sortBy]) - parseInt(a[sortBy]);
        }
      });
    }
    setUsers(sortedUsers.slice(0, usersLimit));
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
    <div className="min-h-screen">
      <ListingHeader title="User List"></ListingHeader>

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
              const updatedUsers = usersData.filter(
                (user: any) =>
                  user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  user.email
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  user.profession
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              );
              setUsers(updatedUsers.slice(0, usersLimit));
            }}
          />
        </div>

        <div className="flex sm:flex-row flex-col items-center">
          <div className="text-right text-xs pr-6 sm:mb-0 mb-8">
            <LimitPerPage
              usersLimit={usersLimit}
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
            {users &&
              users!.map((user: any) => (
                <tr
                  onDoubleClick={() => {
                    router.push("/dashboard");
                  }}
                  key={user.id}
                  className="hover:bg-[#F4F5F7] border-b border-[#f5f5f5]">
                  <td className="px-2 py-4">{user.name}</td>
                  <td className="px-2 py-4">{user.email}</td>
                  <td className="px-2 py-4">{user.phoneNumber}</td>
                  <td className="px-2 py-4">{user.profession}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalUsers={usersData.length}
        currentPage={currentPage}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
      />
    </div>
  );
};

export default UserList;

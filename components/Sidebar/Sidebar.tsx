"use client";

import { Bug, CalendarCheck2, LayoutDashboardIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const activeClass =
  "rounded-l-full w-full text-white bg-[#EBA232] transition-all";
const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    router.push("/login");
  };

  return (
    <div className="flex h-full drop-shadow-lg">
      <div className={"w-full transition-all"}>
        <div className="bg-[#0F172A] h-full relative pl-4 py-2">
          <ul className="mt-3 overflow-y-auto text-white font-normal transition-all">
            <li className="group hover:text-[#EBA232]">
              <Link
                className={
                  `flex items-center  p-2 ` +
                  (pathname === "/dashboard" ? activeClass : "")
                }
                href={"/dashboard"}>
                <div className="p-1 flex justify-center items-center group-hover:text-[#EBA232] rounded-full w-8 h-8 bg-[#0F172A] text-white">
                  <LayoutDashboardIcon width={16} height={16} />
                </div>
                <span className="text-base ml-2">Dashboard</span>
              </Link>
            </li>
            <li className="group hover:text-[#EBA232]">
              <Link
                className={
                  `flex items-center  p-2 ` +
                  (pathname === "/logs" ? activeClass : "")
                }
                href={"/logs"}>
                <div className="p-1 flex justify-center items-center group-hover:text-[#EBA232] rounded-full w-8 h-8 bg-[#0F172A] text-white">
                  <Bug width={16} height={16} />
                </div>
                <span className="text-base ml-2">Logs</span>
              </Link>
            </li>
            <li className="group hover:text-[#EBA232]">
              <Link
                className={
                  `flex items-center  p-2 ` +
                  (pathname === "/scheduler" ? activeClass : "")
                }
                href={"/scheduler"}>
                <div className="p-1 flex justify-center items-center group-hover:text-[#EBA232] rounded-full w-8 h-8 bg-[#0F172A] text-white">
                  <CalendarCheck2 width={16} height={16} />
                </div>
                <span className="text-base ml-2">Scheduler</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React from "react";
import {
  FaUserCircle,
  FaUsersCog,
  FaChartBar,
  FaClipboardList,
  FaCogs,
} from "react-icons/fa";
import { MdDashboard, MdSettings, MdClose } from "react-icons/md"; // Add MdClose here
import { NavLink } from "react-router-dom";

function SuperAdminSidebar({ className, toggleSidebar }) {
  return (
    <aside className={`${className} backdrop-blur-md text-gray-800 p-4 h-[89vh] mt-[10vh] overflow-y-scroll`}>
      <div className="relative lg:hidden hover:shadow-sm">
        <MdClose
          onClick={toggleSidebar}
          size={28}
          className="z-50 rounded-md text-red-500 border hover:text-white hover:bg-red-500 hover:border-none duration-300"
        />
      </div>
      <div className="flex flex-col px-2">
        <NavLink
          to={"super-admin/dashboard"}
          className={({ isActive }) =>
            `${isActive ? "bg-gray-200 text-orange-400" : "hover:bg-gray-200"} mb-1 border-gray-500 shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          <MdDashboard size={24} /> Dashboard
        </NavLink>
        
        <NavLink
          to={"register-res-own"}
          className={({ isActive }) =>
            `${isActive ? "bg-gray-200 text-orange-400" : "hover:bg-gray-200"} mb-1 border-gray-500 shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          <MdDashboard size={24} /> Dashboard
        </NavLink>
        <NavLink
          to={"manage-users"}
          className={({ isActive }) =>
            `${isActive ? "bg-gray-200 text-orange-400" : "hover:bg-gray-200"} mb-1 border-gray-500 shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          <FaUsersCog size={24} /> Manage Users
        </NavLink>
        <NavLink
          to={"reports"}
          className={({ isActive }) =>
            `${isActive ? "bg-gray-200 text-orange-400" : "hover:bg-gray-200"} mb-1 border-gray-500 shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          <FaChartBar size={24} /> Reports
        </NavLink>
        <NavLink
          to={"settings"}
          className={({ isActive }) =>
            `${isActive ? "bg-gray-200 text-orange-400" : "hover:bg-gray-200"} mb-1 border-gray-500 shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          <MdSettings size={24} /> Settings
        </NavLink>
      </div>
    </aside>
  );
}

export default SuperAdminSidebar;

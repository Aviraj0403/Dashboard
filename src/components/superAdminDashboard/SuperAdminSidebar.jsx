import React from "react";
import {
  FaUserCircle,
  FaUsersCog,
  FaChartBar,
} from "react-icons/fa";
import { MdDashboard, MdSettings, MdClose } from "react-icons/md"; 
import { NavLink } from "react-router-dom";

function SuperAdminSidebar({ className, toggleSidebar }) {
  return (
    <aside className={`${className} backdrop-blur-md text-gray-800 p-6 h-[90vh] mt-[10vh] overflow-y-auto shadow-lg rounded-lg transition-all duration-300`}>
      <div className="relative lg:hidden mb-4 hover:shadow-sm">
        <MdClose
          onClick={toggleSidebar} // Call toggle function
          size={28}
          className="z-50 rounded-md text-red-500 border hover:text-white hover:bg-red-500 transition duration-300 cursor-pointer"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <NavLink
          to={"super-admin/dashboard"}
          className={({ isActive }) =>
            `${isActive ? "bg-gray-200 text-orange-400" : "hover:bg-gray-200"} flex items-center gap-2 p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105`
          }
        >
          <MdDashboard size={24} /> Dashboard
        </NavLink>
        <NavLink
          to={"register-res-own"}
          className={({ isActive }) =>
            `${isActive ? "bg-gray-200 text-orange-400" : "hover:bg-gray-200"} flex items-center gap-2 p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105`
          }
        >
          <FaUserCircle size={24} /> Register Restaurant Owner
        </NavLink>
        <NavLink
          to={"manage-users"}
          className={({ isActive }) =>
            `${isActive ? "bg-gray-200 text-orange-400" : "hover:bg-gray-200"} flex items-center gap-2 p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105`
          }
        >
          <FaUsersCog size={24} /> Manage Users
        </NavLink>
        <NavLink
          to={"reports"}
          className={({ isActive }) =>
            `${isActive ? "bg-gray-200 text-orange-400" : "hover:bg-gray-200"} flex items-center gap-2 p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105`
          }
        >
          <FaChartBar size={24} /> Reports
        </NavLink>
        <NavLink
          to={"settings"}
          className={({ isActive }) =>
            `${isActive ? "bg-gray-200 text-orange-400" : "hover:bg-gray-200"} flex items-center gap-2 p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105`
          }
        >
          <MdSettings size={24} /> Settings
        </NavLink>
      </div>
    </aside>
  );
}

export default SuperAdminSidebar;

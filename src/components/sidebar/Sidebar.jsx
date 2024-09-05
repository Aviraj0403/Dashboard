import React from "react";
import { FaAdn, FaFirstOrder, FaUserCircle, FaUserFriends, FaUtensils,FaCog} from "react-icons/fa";
import { MdBookmark, MdCabin, MdClose, MdDashboard, MdDining, MdEmojiPeople, MdGroup, MdLocalOffer, MdTranscribe } from "react-icons/md";
import { NavLink, Link } from "react-router-dom";
function Sidebar({ className, toggleSidebar }) {
  return (
    <aside className={`${className}  bg-gray-900 text-white p-4 h-[91vh] mt-[9vh] overflow-y-scroll`}>
      <div className=" relative lg:hidden  hover:shadow-sm">
        <MdClose
          onClick={toggleSidebar}
          size={28}
          className=" z-50 rounded-md text-red-500 border hover:text-white hover:bg-red-500 hover:border-none duration-300 "
        />
      </div>
      <div className=" flex flex-col  px-2 ">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            ` ${
              isActive ? " bg-gray-700  " : " hover:shadow-none hover:bg-gray-700"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <MdDashboard /> Dashboard
        </NavLink>
        <NavLink
          to={"/b"}
          className={({ isActive }) =>
            ` ${
              isActive ? " bg-gray-700 " : " hover:shadow-none hover:bg-gray-700"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <FaAdn /> Items
        </NavLink>
        {/* Add Item */}
        <NavLink
      to={"/add-item"} // Adjust the route path as necessary
      className={({ isActive }) =>
        ` ${
          isActive ? "bg-gray-700" : "hover:shadow-none hover:bg-gray-700"
        } mb-1 border-gray-500 shadow-white px-4 py-2 rounded-md flex items-center gap-2`
      }
       >
      <FaUtensils /> Add Item
    </NavLink>
      {/* Manage List  */}
      <NavLink
      to={"/manage-item"} // Adjust the route path as necessary
      className={({ isActive }) =>
        ` ${
          isActive ? "bg-gray-700" : "hover:shadow-none hover:bg-gray-700"
        } mb-1 border-gray-500 shadow-white px-4 py-2 rounded-md flex items-center gap-2`
      }
       >
      <FaCog /> Manage List
    </NavLink>
        <NavLink
          to={"/dinning"}
          className={({ isActive }) =>
            ` ${
              isActive ? " bg-gray-700  " : " hover:shadow-none hover:bg-gray-700"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <MdDining /> Dinning Tables
        </NavLink>
      </div>
      <div className=" titles pb-1">
        <h2 className=" text-gray-400">POS & ORDERS</h2>
      </div>
      <div className=" flex flex-col  px-2 ">
        <NavLink
          to={"/d"}
          className={({ isActive }) =>
            ` ${
              isActive ? " bg-gray-700  shadow-sm" : " hover:shadow-none hover:bg-gray-700"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <MdBookmark /> POS
        </NavLink>
        <NavLink
          to={"/e"}
          className={({ isActive }) =>
            ` ${
              isActive ? " bg-gray-700 shadow-sm " : " hover:shadow-none hover:bg-gray-700"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <FaFirstOrder /> POS Orders
        </NavLink>
        <NavLink
          to={"/c"}
          className={({ isActive }) =>
            ` ${
              isActive ? " bg-gray-700 shadow-sm " : " hover:shadow-none hover:bg-gray-700"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <MdCabin /> Table Orders
        </NavLink>
      </div>
      <div className=" titles pb-1">
        <h2 className=" text-gray-400">PROMO</h2>
      </div>
      <div className=" flex flex-col  px-2 ">
        <NavLink
          to={"/n"}
          className={({ isActive }) =>
            ` ${
              isActive ? " bg-gray-700  shadow-sm" : " hover:shadow-none hover:bg-gray-700"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <MdLocalOffer /> Offers
        </NavLink>
        {/* <NavLink
          to={"/b"}
          className={({ isActive }) =>
            ` ${
              isActive ? " bg-gray-700 shadow-sm " : " hover:shadow-none hover:bg-gray-700"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <FaAdn /> Items
        </NavLink>
        <NavLink
          to={"/c"}
          className={({ isActive }) =>
            ` ${
              isActive ? " bg-gray-700 shadow-sm " : " hover:shadow-none hover:bg-gray-700"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <MdDining /> Dinning Tables
        </NavLink> */}
      </div>
      <div className=" titles pb-1">
        <h2 className=" text-gray-400">USERS</h2>
      </div>
      <div className=" flex flex-col  px-2 ">
        <NavLink
          to={"/administrator"}
          className={({ isActive }) =>
            ` ${
              isActive ? " bg-gray-700  shadow-sm" : " hover:shadow-none hover:bg-gray-700"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <FaUserCircle /> Administrators
        </NavLink>
        <NavLink
          to={"/customer"}
          className={({ isActive }) =>
            ` ${
              isActive ? " bg-gray-700 shadow-sm " : " hover:shadow-none hover:bg-gray-700"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <MdGroup /> Customers
        </NavLink>
        <NavLink
          to={"/employee"}
          className={({ isActive }) =>
            ` ${
              isActive ? " bg-gray-700 shadow-sm " : " hover:shadow-none hover:bg-gray-700"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <FaUserFriends /> Employees
        </NavLink>
      </div>
      <div className=" titles pb-1">
        <h2 className=" text-gray-400 uppercase">accounts</h2>
      </div>
      <div className=" flex flex-col  px-2 ">
        <NavLink
          to={"/transcations"}
          className={({ isActive }) =>
            ` ${
              isActive ? " bg-gray-700  shadow-sm" : " hover:shadow-none hover:bg-gray-700"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <MdTranscribe /> Transcations
        </NavLink>
      
      </div>
      <div className=" titles">
        <h2 className=" text-gray-400 uppercase">reports</h2>
      </div>
      <div className=" flex flex-col  px-2 ">
        <NavLink
          to={"/transcations"}
          className={({ isActive }) =>
            ` ${
              isActive ? " bg-gray-700  shadow-sm" : " hover:shadow-none hover:bg-gray-700"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <MdTranscribe /> Sales Report
        </NavLink>
      
      </div>
    </aside>
  );
}

export default Sidebar;

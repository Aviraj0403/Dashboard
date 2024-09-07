import React from "react";
import {
  FaAdn,
  FaFirstOrder,
  FaUserCircle,
  FaUserFriends,
  FaUtensils,
  FaCog,
  FaFileAlt ,
  FaFileInvoice
} from "react-icons/fa";
import { MdCurrencyBitcoin, MdCurrencyRupee, MdSettings } from "react-icons/md";
import {
  MdBookmark,
  MdCabin,
  MdClose,
  MdDashboard,
  MdDining,
  MdEmojiPeople,
  MdGroup,
  MdLocalOffer,
  MdTranscribe,
} from "react-icons/md";
import { NavLink, Link } from "react-router-dom";
function Sidebar({ className, toggleSidebar }) {
  return (
    <aside
      className={`${className} backdrop-blur-md   text-gray-800 p-4 h-[89vh] mt-[10vh] overflow-y-scroll`}
    >
      <div className=" relative lg:hidden  hover:shadow-sm">
        <MdClose
          onClick={toggleSidebar}
          size={28}
          className=" z-50 rounded-md text-red-500 border hover:text-white hover:bg-red-500 hover:border-none duration-300 "
        />
      </div>
      <div className=" flex flex-col  px-2 ">
        <NavLink
          to={"dashboard"}
          className={({ isActive }) =>
            ` ${
              isActive
                ? " bg-gray-200 text-orange-400  "
                : " hover:shadow-none hover:bg-gray-200"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <MdDashboard size={24} /> Dashboard
        </NavLink>
        <NavLink
          to={"items"}
          className={({ isActive }) =>
            ` ${
              isActive
                ? " bg-gray-200  text-orange-400"
                : " hover:shadow-none hover:bg-gray-200"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <FaAdn size={24} /> Items
        </NavLink>
        {/* Add Item */}
        <NavLink
          to={"add-item"} // Adjust the route path as necessary
          className={({ isActive }) =>
            ` ${
              isActive
                ? "bg-gray-200 text-orange-400"
                : "hover:shadow-none hover:bg-gray-200"
            } mb-1 border-gray-500 shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          <FaUtensils size={24} /> Add Item
        </NavLink>
        {/* Manage List  */}
        <NavLink
          to={"manage-item"} // Adjust the route path as necessary
          className={({ isActive }) =>
            ` ${
              isActive
                ? "bg-gray-200 text-orange-400"
                : "hover:shadow-none hover:bg-gray-200"
            } mb-1 border-gray-500 shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          <FaCog size={24} /> Manage List
        </NavLink>
        <NavLink
          to={"dining"}
          className={({ isActive }) =>
            ` ${
              isActive
                ? " bg-gray-200 text-orange-400  "
                : " hover:shadow-none hover:bg-gray-200"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <MdDining size={24} /> Dinning Tables
        </NavLink>
      </div>
      <div className=" titles pb-1">
        <h2 className=" text-gray-400">POS & ORDERS</h2>
      </div>
      <div className=" flex flex-col  px-2 ">
        <NavLink
          to={"pos"}
          className={({ isActive }) =>
            ` ${
              isActive
                ? " bg-gray-200   text-orange-400"
                : " hover:shadow-none hover:bg-gray-200"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <MdBookmark size={24} /> POS
        </NavLink>
        <NavLink
          to={"pos/orders"}
          className={({ isActive }) =>
            ` ${
              isActive
                ? " bg-gray-200  text-orange-400"
                : " hover:shadow-none hover:bg-gray-200"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <FaFirstOrder size={24} /> POS Orders
        </NavLink>
        <NavLink
          to={"table-orders"}
          className={({ isActive }) =>
            ` ${
              isActive
                ? " bg-gray-200 text-orange-400 "
                : " hover:shadow-none hover:bg-gray-200"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <MdCabin size={24} /> Table Orders
        </NavLink>
      </div>
      <div className=" titles pb-1">
        <h2 className=" text-gray-400">PROMO</h2>
      </div>
      <div className=" flex flex-col  px-2 ">
        <NavLink
          to={"OffersList"}
          className={({ isActive }) =>
            ` ${
              isActive
                ? " bg-gray-200  text-orange-400"
                : " hover:shadow-none hover:bg-gray-200"
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
              isActive ? " bg-gray-200 shadow-sm " : " hover:shadow-none hover:bg-gray-200"
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
              isActive ? " bg-gray-200 shadow-sm " : " hover:shadow-none hover:bg-gray-200"
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
          to={"administrator"}
          className={({ isActive }) =>
            ` ${
              isActive
                ? " bg-gray-200 text-orange-400  "
                : " hover:shadow-none hover:bg-gray-200"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <FaUserCircle size={24} /> Administrators
        </NavLink>
        <NavLink
          to={"customer"}
          className={({ isActive }) =>
            ` ${
              isActive
                ? " bg-gray-200 text-orange-400 "
                : " hover:shadow-none hover:bg-gray-200"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <MdGroup  size={24}/> Customers
        </NavLink>
        <NavLink
          to={"employee"}
          className={({ isActive }) =>
            ` ${
              isActive
                ? " bg-gray-200 text-orange-400 "
                : " hover:shadow-none hover:bg-gray-200"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <FaUserFriends  size={24}/> Employees
        </NavLink>
      </div>
      <div className=" titles pb-1">
        <h2 className=" text-gray-400 uppercase">accounts</h2>
      </div>
      <div className=" flex flex-col  px-2 ">
        <NavLink
          to={"transactions"}
          className={({ isActive }) =>
            ` ${
              isActive
                ? " bg-gray-200  text-orange-400"
                : " hover:shadow-none hover:bg-gray-200"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <MdCurrencyRupee size={24} /> Transcations
        </NavLink>
      </div>
      <div className=" titles">
        <h2 className=" text-gray-400 uppercase">reports</h2>
      </div>
      <div className=" flex flex-col  px-2 ">

        {/* REPORT */}
        <NavLink
          to={"sales-report"}
          className={({ isActive }) =>
            ` ${
              isActive
                ? " bg-gray-200  text-orange-400"
                : " hover:shadow-none hover:bg-gray-200"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <MdTranscribe size={24} /> Sales Report
        </NavLink>
        <NavLink
          to={"items-report"}
          className={({ isActive }) =>
            ` ${
              isActive
                ? " bg-gray-200  text-orange-400"
                : " hover:shadow-none hover:bg-gray-200"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <FaFileAlt size={24} /> Items Report
        </NavLink>
        <NavLink
          to={"gst-report"}
          className={({ isActive }) =>
            ` ${
              isActive
                ? " bg-gray-200  text-orange-400"
                : " hover:shadow-none hover:bg-gray-200"
            }  mb-1  border-gray-500  shadow-white px-4 py-2 rounded-md flex items-center gap-2`
          }
        >
          {" "}
          <FaFileInvoice size={24} /> GST Report
        </NavLink>

      </div>
      <div className=" titles">
        <h2 className=" text-gray-400 uppercase">Setup</h2>
      </div>
      <div className=" flex flex-col  px-2 ">
        <NavLink
          to={"settings"}
          // onClick={() => onCategorySelect("settings")}
          className={({ isActive }) =>
            ` px-4 py-2 rounded-md flex items-center gap-2 ${
              isActive
                ? "bg-gray-200 text-orange-400"
                : "hover:bg-gray-200 hover:shadow-none"
            }`
          }
        >
          <MdSettings size={24} /> Settings
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;

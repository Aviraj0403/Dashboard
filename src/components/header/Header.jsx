import React, { useState } from "react";
import { FaAlignLeft, FaUserAstronaut } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import Profile from "./profile/Profile";
import { useWindowContext } from "../../context/windowContext";
import { useAuth } from "../../context/userContext"; // Use the AuthContext to access user data
import logo from "../../../public/logo.png";

function Header({ toggleSidebar, openSidebar }) {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const { progressWidth } = useWindowContext();
  const { userData } = useAuth(); // Get userData from AuthContext

  return (
    <header className="bg-orange-100/20 p-4 fixed top-0 left-0 right-0 z-50  backdrop-blur-md shadow-md transition-all ease-in-out duration-300">
      <div className="container mx-auto flex justify-between">
        <img src={logo} alt="" className=" w-14 h-12 rounded-full scale-150" />
        <div className="flex items-center space-x-4">
          <p className="text-sm max-sm:hidden">Branch: Dwarka (Main)</p>
          <select className="border rounded px-2 py-1 text-black max-sm:hidden">
            <option value="english">English</option>
            <option value="Hindi">Hindi</option>
          </select>
          {openSidebar ? (
            <FaAlignLeft size={26} onClick={toggleSidebar} />
          ) : (
            <MdMenu size={38} onClick={toggleSidebar} />
          )}
          <div className="relative">
            <button
              onClick={() => setIsOpenProfile(!isOpenProfile)}
              className="bg-orange-700 flex items-center gap-1 text-white px-3 py-2 rounded"
            >
              <FaUserAstronaut /> {userData?.user?.username || "User"} {/* Show logged-in user's name */}
            </button>
            {isOpenProfile && <Profile />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

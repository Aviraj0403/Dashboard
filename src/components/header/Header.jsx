import React, { useEffect, useState } from "react";
import { FaAlignLeft, FaUserAstronaut } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import Profile from "./profile/Profile";
import { useWindowContext } from "../../context/windowContext";

function Header({ toggleSidebar, openSidebar }) {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const { progressWidth } = useWindowContext();
  return (
    <header className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-50  shadow-md transition-all ease-in-out duration-300">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">Br Tech</h1>
        <div className="flex items-center space-x-4">
          <p className="text-sm max-sm:hidden">Branch: Hajipur (Main)</p>
          <select className="border rounded px-2 py-1 text-black max-sm:hidden">
            <option value="english">English</option>
            <option value="bengali">Bengali</option>
          </select>
          {openSidebar ? (
            <FaAlignLeft size={26} onClick={toggleSidebar} />
          ) : (
            <MdMenu size={38} onClick={toggleSidebar} />
          )}
          <div className="relative">
            <button
              onClick={() => setIsOpenProfile(!isOpenProfile)}
              className="bg-gray-700 flex items-center gap-1 text-white px-3 py-2 rounded"
            >
              <FaUserAstronaut /> Aman
            </button>
            {isOpenProfile && <Profile />}
          </div>
        </div>
      </div>
      {/* <div
        className=" border mt-1 h-2 bg-blue-700 transition-all ease-in-out duration-300"
        style={{ width: `${progressWidth}%` }}
      ></div> */}
    </header>
  );
}

export default Header;

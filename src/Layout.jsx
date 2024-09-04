import React from "react";
import Header from "./components/header/Header";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/footer/Footer";
import Sidebar from "./components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import RouterCumb from "./components/router/RouterCumb";
import { useWindowContext } from "./context/windowContext";
import ProgressBar from "./components/progressbar/ProgressBar";
function Layout() {
  const [openSidebar, setOpenSidebar] = useState(true);
  const { divRef, progressWidth } = useWindowContext();
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpenSidebar(true);
      } else {
        setOpenSidebar(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex h-screen overflow-hidden ">
      {/* left part  */}
      <Sidebar
        className={`lg:fixed absolute top-0 left-0 z-30 w-64 h-full bg-gray-800 transition-transform duration-300 ease-in-out ${
          openSidebar ? "translate-x-0 " : "-translate-x-full "
        }`}
        toggleSidebar={toggleSidebar}
      />
      {/* right part  */}
      <div
        className={`flex flex-col flex-grow transition-all duration-300 ease-in-out ${
          openSidebar ? "lg:ml-64 sm:ml-0" : "ml-0"
        }`}
      >
        <Header toggleSidebar={toggleSidebar} openSidebar={openSidebar} />
        {/* padding fromt top  */}
        <div className=" mt-[10vh]">
          <ProgressBar progressWidth={progressWidth}/>
          <RouterCumb />
        </div>
        {/* main outlet for dynamic routing */}
        <main ref={divRef?divRef:null} className="flex-grow p-4 overflow-y-scroll ">
          <Outlet />
          {/* Uncomment the footer if needed */}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;

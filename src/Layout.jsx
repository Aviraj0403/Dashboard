import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Sidebar from "./components/sidebar/Sidebar";
import RouterCumb from "./components/router/RouterCumb";
import { useWindowContext } from "./context/windowContext";
import ProgressBar from "./components/progressbar/ProgressBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const { divRef, progressWidth } = useWindowContext();

  const toggleSidebar = () => setOpenSidebar(prev => !prev);

  useEffect(() => {
    const handleResize = () => {
      setOpenSidebar(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden select-none">
      <ToastContainer />
      <Sidebar
        className={`lg:fixed absolute top-0 left-0 z-50 w-64 h-full  bg-white  transition-transform duration-300 ease-in-out ${
          openSidebar ? "translate-x-0 " : "-translate-x-full "
        }`}
        toggleSidebar={toggleSidebar}
      />
      <div className={`flex flex-col flex-grow transition-all duration-300 ease-in-out ${openSidebar ? "lg:ml-64" : "ml-0"}`}>
        <Header toggleSidebar={toggleSidebar} openSidebar={openSidebar} />
        <div className="mt-[10vh]">
          <ProgressBar progressWidth={progressWidth} />
          <RouterCumb />
        </div>
        {/* main outlet for dynamic routing */}
        <main ref={divRef?divRef:null} className="flex-grow p-4 overflow-y-scroll bg-orange-100/30 ">
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Sidebar from "./components/sidebar/Sidebar";
import SuperAdminDashboard from "./components/superAdminDashboard/SuperAdminDashboard.jsx";
import LoginPage from "./pages/Login/Login.jsx";
import ProtectedRoute from './components/secureRoute/ProtectedRoute.jsx';
import { AuthProvider } from './context/userContext';
import { SocketProvider } from './context/SocketContext';

function App() {
  const [openSidebar, setOpenSidebar] = useState(true);

  const toggleSidebar = () => {
    setOpenSidebar(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setOpenSidebar(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <div className="flex h-screen overflow-hidden">
            <Sidebar
              className={`lg:fixed absolute top-0 left-0 z-30 w-64 h-full bg-gray-800 transition-transform duration-300 ease-in-out ${
                openSidebar ? "translate-x-0" : "-translate-x-full"
              }`}
              toggleSidebar={toggleSidebar}
            />
            <div
              className={`flex flex-col flex-grow transition-all duration-300 ease-in-out ${
                openSidebar ? "lg:ml-64 sm:ml-0" : "ml-0"
              }`}
            >
              <Header toggleSidebar={toggleSidebar} openSidebar={openSidebar} />
              <main className="flex-grow p-4 overflow-y-scroll">
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route 
                    path="/super-admin-dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['superAdmin']}>
                        <SuperAdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  {/* Add more routes as needed */}
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;

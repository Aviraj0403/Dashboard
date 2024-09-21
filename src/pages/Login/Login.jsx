import React, { useState } from 'react';
import { useAuth } from '../../context/userContext';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { handleLogin, userRole, isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({ email: "", username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError(""); // Clear previous error
    const success = await handleLogin(formData);

    if (!success) {
      setLoginError("Invalid username or password.");
    }
  };

  // Redirect if logged in
  if (isLoggedIn) {
    const redirectPath = userRole === 'superAdmin' 
      ? '/super-admin-dashboard' 
      : '/admin/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  const handleDemoLogin = async (username, password) => {
    const success = await handleLogin({ username, password });
    if (!success) {
      setLoginError("Invalid demo credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
        <form className="space-y-6" onSubmit={handleLoginSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username or Email</label>
            <input
              type="text"
              id="username"
              name="username" // Change to "username" to match handleChange
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Username or Email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Password"
              required
            />
          </div>
          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
          <button type="submit" className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
      <DemoLogin handleDemoLogin={handleDemoLogin} />
    </div>
  );
};

const DemoLogin = ({ handleDemoLogin }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 mt-8">
      <h3 className="text-center text-lg font-medium text-gray-700 mb-4">For quick demo login click below</h3>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handleDemoLogin("superadmin@12", "superadmin")}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
        >
          Super Admin
        </button>
        <button
          onClick={() => handleDemoLogin("admin@12", "admin")}
          className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600"
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

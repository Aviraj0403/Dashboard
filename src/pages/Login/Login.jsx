import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/userContext';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { handleLogin, isAdmin, isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [redirectToAdmin, setRedirectToAdmin] = useState(false); 
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      if (isAdmin) {
        setRedirectToAdmin(true);
      }
    }
  }, [isLoggedIn, isAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const success = await handleLogin(formData);
    
    if (!success) {
      setLoginError("Invalid username or password.");
    }

    setFormData({ username: '', password: '' });
  };

  if (redirectToAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Main login card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleLoginSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name='username'
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-red-500 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              id="password"
              className="w-full p-3 border border-red-500 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Password"
            />
          </div>

          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

          <div className="flex justify-between items-center">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
              <span className="ml-2 text-gray-700">Remember Me</span>
            </label>
            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
          </div>

          <div>
            <button type="submit" className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
              Login
            </button>
          </div>
        </form>
      </div>

      {/* Demo login buttons */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 mt-8">
        <h3 className="text-center text-lg font-medium text-gray-700 mb-4">For quick demo login click below</h3>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleDemoLogin("admin@12", "admin")}
            className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600"
          >
            Admin
          </button>
          <button
            onClick={() => handleDemoLogin("manager@12", "manager")}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Branch Manager
          </button>
          <button
            onClick={() => handleDemoLogin("pos@12", "pos")}
            className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600"
          >
            Pos Operator
          </button>
        </div>
      </div>
    </div>
  );

  function handleDemoLogin(username, password) {
    setFormData({ username, password });
    handleLogin({ username, password });
  }
};

export default LoginPage;

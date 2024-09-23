import React, { useState } from 'react';
import { useAuth } from '../../context/userContext';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
    const { handleLogin, userRole, isLoggedIn } = useAuth();
    const [formData, setFormData] = useState({ username: "", password: "" });
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
        console.log("Login form submitted");

        try {
            const success = await handleLogin(formData);
            console.log("Login attempt success:", success);
            if (!success) {
                setLoginError("Invalid username or password.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setLoginError("An error occurred while trying to log in. Please try again.");
        }
    };

    // Redirect if logged in
    if (isLoggedIn) {
        console.log("isLoggedIn:", isLoggedIn);
        console.log("userRole:", userRole);
        const redirectPath = userRole === 'superAdmin' 
            ? '/super-admin-dashboard' 
            : '/admin/dashboard';
        return <Navigate to={redirectPath} replace />;
    }

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
                            name="username"
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
        </div>
    );
};

export default LoginPage;

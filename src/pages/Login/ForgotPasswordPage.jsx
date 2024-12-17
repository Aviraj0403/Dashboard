import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import eye icons

const ForgotPasswordPage = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1); // Track the step (1: Request OTP, 2: Verify OTP)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility
    const navigate = useNavigate();
    
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            // Request OTP from the backend API
            const response = await fetch(`${apiUrl}/api/auth/request-otp`, {
                method: 'POST',
                body: JSON.stringify({ contactInfo: { phone } }),
                headers: { 'Content-Type': 'application/json' },
            });
            const result = await response.json();
            if (response.ok) {
                setStep(2);  // Go to OTP verification step
                setError("");
            } else {
                setError(result.message);
            }
        } catch (error) {
            console.error(error);
            setError("Error requesting OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            // Verify OTP and reset password
            const response = await fetch(`${apiUrl}/api/auth/verify-otp-and-reset-password`, {
                method: 'POST',
                body: JSON.stringify({
                    contactInfo: { phone },
                    otp,
                    newPassword
                }),
                headers: { 'Content-Type': 'application/json' },
            });
            const result = await response.json();
            if (response.ok) {
                navigate('/login'); // Navigate to login page after success
            } else {
                setError(result.message);
            }
        } catch (error) {
            console.error(error);
            setError("Error resetting password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 transition-transform transform-gpu">
                <h2 className="text-2xl font-bold text-center mb-6">
                    {step === 1 ? "Forgot Password" : "Verify OTP"}
                </h2>

                {/* Step 1: Request OTP */}
                {step === 1 ? (
                    <form onSubmit={handlePhoneSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className={`w-full py-3 ${loading ? "bg-gray-400" : "bg-blue-500"} text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 ease-in-out`}
                            disabled={loading}
                        >
                            {loading ? "Requesting OTP..." : "Request OTP"}
                        </button>
                    </form>
                ) : (
                    /* Step 2: Verify OTP and Reset Password */
                    <form onSubmit={handleOtpSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                                placeholder="Enter OTP"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                                    placeholder="Enter new password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                >
                                    {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                                    placeholder="Confirm your new password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                >
                                    {confirmPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                                </button>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className={`w-full py-3 ${loading ? "bg-gray-400" : "bg-blue-500"} text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 ease-in-out`}
                            disabled={loading}
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordPage;

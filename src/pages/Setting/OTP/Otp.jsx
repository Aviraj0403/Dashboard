import React, { useState } from 'react';

const OTP = () => {
  // State for managing OTP settings
  const [otpType, setOtpType] = useState('');
  const [otpDigitLimit, setOtpDigitLimit] = useState('');
  const [otpExpireTime, setOtpExpireTime] = useState('');

  // Handler functions for dropdown changes
  const handleOtpTypeChange = (e) => setOtpType(e.target.value);
  const handleOtpDigitLimitChange = (e) => setOtpDigitLimit(e.target.value);
  const handleOtpExpireTimeChange = (e) => setOtpExpireTime(e.target.value);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TODO: Implement backend API call to save OTP settings
    // Example:
    // fetch('/api/save-otp-settings', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     otpType,
    //     otpDigitLimit,
    //     otpExpireTime,
    //   }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Handle success
    //   console.log('OTP settings saved successfully:', data);
    // })
    // .catch(error => {
    //   // Handle error
    //   console.error('Error saving OTP settings:', error);
    // });

    console.log('OTP Settings Submitted', { otpType, otpDigitLimit, otpExpireTime });
  };

  return (
    <div className="w-full mx-auto px-4 py-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">OTP Settings</h2>
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        {/* OTP Type */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">OTP Type</label>
          <select
            value={otpType}
            onChange={handleOtpTypeChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>Select OTP Type</option>
            <option value="both">Both</option>
            <option value="sms">SMS</option>
            <option value="mail">Mail</option>
          </select>
        </div>

        {/* OTP Digit Limit */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">OTP Digit Limit</label>
          <select
            value={otpDigitLimit}
            onChange={handleOtpDigitLimitChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>Select Digit Limit</option>
            <option value="4">4 Digits</option>
            <option value="6">6 Digits</option>
            <option value="8">8 Digits</option>
          </select>
        </div>

        {/* OTP Expire Time */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">OTP Expire Time (minutes)</label>
          <select
            value={otpExpireTime}
            onChange={handleOtpExpireTimeChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>Select Expire Time</option>
            <option value="5">5 Minutes</option>
            <option value="10">10 Minutes</option>
            <option value="20">20 Minutes</option>
            <option value="25">25 Minutes</option>
            <option value="30">30 Minutes</option>
            <option value="50">50 Minutes</option>
            <option value="60">60 Minutes</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="col-span-1 sm:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTP;

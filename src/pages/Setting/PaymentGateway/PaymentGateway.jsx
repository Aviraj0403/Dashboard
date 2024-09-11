import React, { useState } from 'react';

const PaymentGateway = () => {
  const [razorpaySettings, setRazorpaySettings] = useState({
    keyId: 'rzp_test_8cJKdCIjZrkmUq',
    keySecret: 'd8hS3U9c6B5G9g5b3rkm8I2f',
    status: 'Enable',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRazorpaySettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality, possibly with API calls
    console.log('Saving settings:', razorpaySettings);
  };

  
  
  return (
    <div className="p-6 bg  rounded-lg max-w-md mx-auto overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4">Razorpay Gateway</h2>

      {/* Razorpay Settings */}
      <div className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="keyId" className="text-sm font-medium text-gray-700 mb-1">
            Razorpay Key Id
          </label>
          <input
            type="text"
            id="keyId"
            name="keyId"
            value={razorpaySettings.keyId}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter Razorpay Key Id"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="keySecret" className="text-sm font-medium text-gray-700 mb-1">
            Razorpay Key Secret
          </label>
          <input
            type="text"
            id="keySecret"
            name="keySecret"
            value={razorpaySettings.keySecret}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter Razorpay Key Secret"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">
            Razorpay Status
          </label>
          <select
            id="status"
            name="status"
            value={razorpaySettings.status}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="Enable">Enable</option>
            <option value="Disable">Disable</option>
          </select>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PaymentGateway;


/*
const handleSave = () => {
  // TODO: Implement save functionality
  // Example: POST request to your backend API to save Razorpay settings
  // fetch('/api/save-razorpay-settings', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(razorpaySettings),
  // })
  // .then(response => response.json())
  // .then(data => {
  //   // Handle successful save
  //   console.log('Razorpay settings saved successfully:', data);
  // })
  // .catch(error => {
  //   // Handle errors
  //   console.error('Error saving Razorpay settings:', error);
  // });

  console.log('Saving settings:', { razorpaySettings });
};

*/
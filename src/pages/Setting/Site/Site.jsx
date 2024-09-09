import React, { useState } from 'react';

const Site = () => {
  // State for managing dropdown selections and input fields
  const [timeFormat, setTimeFormat] = useState('12-hour');
  const [dateFormat, setDateFormat] = useState('d-m-Y');
  const [timezone, setTimezone] = useState('Asia/Kolkata'); // Default timezone for India
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('INR');
  const [comments, setComments] = useState('');

  // Handler functions for dropdown changes
  const handleTimeFormatChange = (e) => setTimeFormat(e.target.value);
  const handleDateFormatChange = (e) => setDateFormat(e.target.value);
  const handleTimezoneChange = (e) => setTimezone(e.target.value);
  const handleLanguageChange = (e) => setLanguage(e.target.value);
  const handleCurrencyChange = (e) => setCurrency(e.target.value);
  const handleCommentsChange = (e) => setComments(e.target.value);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Implement backend API call to save settings
    // Example:
    // fetch('/api/save-settings', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     timeFormat,
    //     dateFormat,
    //     timezone,
    //     language,
    //     currency,
    //     comments,
    //   }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Handle success
    //   console.log('Settings saved successfully:', data);
    // })
    // .catch(error => {
    //   // Handle error
    //   console.error('Error saving settings:', error);
    // });

    console.log('Form Submitted', {
      timeFormat,
      dateFormat,
      timezone,
      language,
      currency,
      comments,
    });
  };

  return (
    <div className="w-full mx-auto px-4 py-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Site Settings</h2>
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        {/* Date Format */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Date Format</label>
          <select
            value={dateFormat}
            onChange={handleDateFormatChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="d-m-Y">d-m-Y (09-09-2024)</option>
            <option value="Y-m-d">Y-m-d (2024-09-09)</option>
            <option value="m-d-Y">m-d-Y (09-09-2024)</option>
          </select>
        </div>

        {/* Time Format */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Time Format</label>
          <select
            value={timeFormat}
            onChange={handleTimeFormatChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="12-hour">12 Hour (5:43 PM)</option>
            <option value="24-hour">24 Hour (17:43)</option>
          </select>
        </div>

        {/* Default Timezone */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Default Timezone</label>
          <select
            value={timezone}
            onChange={handleTimezoneChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="Asia/Kolkata">Asia/Kolkata (India)</option>
            <option value="America/New_York">America/New_York (New York)</option>
            <option value="Europe/London">Europe/London (London)</option>
          </select>
        </div>

        {/* Default Branch */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Default Branch</label>
          <input
            type="text"
            placeholder="Mirpur-1 (main)"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Default Language */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Default Language</label>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Bengali">Bengali</option>
          </select>
        </div>

        {/* Default SMS Gateway */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Default SMS Gateway</label>
          <input
            type="text"
            placeholder="--"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Copyright */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Copyright</label>
          <input
            type="text"
            placeholder="© BR Tech Pvt Ltd 2024, All Rights Reserved"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Google Map Key */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Google Map Key</label>
          <input
            type="text"
            placeholder="Fake-map-key"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Digit After Decimal Point */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Digit After Decimal Point</label>
          <input
            type="text"
            placeholder="2"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Default Currency */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Default Currency</label>
          <select
            value={currency}
            onChange={handleCurrencyChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="INR">Indian Rupee (₹)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
          </select>
        </div>

        {/* Currency Position */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Currency Position</label>
          <div className="flex items-center space-x-4">
            <label>
              <input type="radio" name="currencyPosition" value="left" className="mr-2" />
              Left
            </label>
            <label>
              <input type="radio" name="currencyPosition" value="right" className="mr-2" />
              Right
            </label>
          </div>
        </div>

        {/* Online Payment Gateway */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Online Payment Gateway</label>
          <div className="flex items-center space-x-4">
            <label>
              <input type="radio" name="paymentGateway" value="enable" className="mr-2" />
              Enable
            </label>
            <label>
              <input type="radio" name="paymentGateway" value="disable" className="mr-2" />
              Disable
            </label>
          </div>
        </div>

        {/* Language Switch */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Language Switch</label>
          <div className="flex items-center space-x-4">
            <label>
              <input type="radio" name="languageSwitch" value="enable" className="mr-2" />
              Enable
            </label>
            <label>
              <input type="radio" name="languageSwitch" value="disable" className="mr-2" />
              Disable
            </label>
          </div>
        </div>

        {/* Email Verification */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Email Verification</label>
          <div className="flex items-center space-x-4">
            <label>
              <input type="radio" name="emailVerification" value="enable" className="mr-2" />
              Enable
            </label>
            <label>
              <input type="radio" name="emailVerification" value="disable" className="mr-2" />
              Disable
            </label>
          </div>
        </div>

        {/* Phone Verification */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Phone Verification</label>
          <div className="flex items-center space-x-4">
            <label>
              <input type="radio" name="phoneVerification" value="enable" className="mr-2" />
              Enable
            </label>
            <label>
              <input type="radio" name="phoneVerification" value="disable" className="mr-2" />
              Disable
            </label>
          </div>
        </div>

        {/* App Debug */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">App Debug</label>
          <div className="flex items-center space-x-4">
            <label>
              <input type="radio" name="appDebug" value="enable" className="mr-2" />
              Enable
            </label>
            <label>
              <input type="radio" name="appDebug" value="disable" className="mr-2" />
              Disable
            </label>
          </div>
        </div>

        {/* Auto Update */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Auto Update</label>
          <div className="flex items-center space-x-4">
            <label>
              <input type="radio" name="autoUpdate" value="enable" className="mr-2" />
              Enable
            </label>
            <label>
              <input type="radio" name="autoUpdate" value="disable" className="mr-2" />
              Disable
            </label>
          </div>
        </div>

        {/* Comments */}
        {/* <div className="col-span-1 sm:col-span-2 flex flex-col">
          <label className="mb-2 font-medium">Comments (Optional)</label>
          <textarea
            value={comments}
            onChange={handleCommentsChange}
            placeholder="Add any additional comments here..."
            className="border border-gray-300 rounded-md p-2 w-full"
            rows="4"
          ></textarea>
        </div> */}

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

export default Site;

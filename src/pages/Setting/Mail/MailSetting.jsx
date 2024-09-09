import React, { useState } from 'react';

const MailSettings = () => {
  // State for managing mail settings
  const [mailHost, setMailHost] = useState('');
  const [mailPort, setMailPort] = useState('');
  const [mailUsername, setMailUsername] = useState('');
  const [mailPassword, setMailPassword] = useState('');
  const [mailFromName, setMailFromName] = useState('');
  const [mailFromEmail, setMailFromEmail] = useState('');
  const [mailEncryption, setMailEncryption] = useState('SSL');

  // Handler functions for mail settings changes
  const handleMailHostChange = (e) => setMailHost(e.target.value);
  const handleMailPortChange = (e) => setMailPort(e.target.value);
  const handleMailUsernameChange = (e) => setMailUsername(e.target.value);
  const handleMailPasswordChange = (e) => setMailPassword(e.target.value);
  const handleMailFromNameChange = (e) => setMailFromName(e.target.value);
  const handleMailFromEmailChange = (e) => setMailFromEmail(e.target.value);
  const handleMailEncryptionChange = (e) => setMailEncryption(e.target.value);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Implement backend API call to save mail settings
    // Example:
    // fetch('/api/save-mail-settings', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     mailHost,
    //     mailPort,
    //     mailUsername,
    //     mailPassword,
    //     mailFromName,
    //     mailFromEmail,
    //     mailEncryption,
    //   }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Handle success
    //   console.log('Mail settings saved successfully:', data);
    // })
    // .catch(error => {
    //   // Handle error
    //   console.error('Error saving mail settings:', error);
    // });

    console.log('Mail Settings Submitted', {
      mailHost,
      mailPort,
      mailUsername,
      mailPassword,
      mailFromName,
      mailFromEmail,
      mailEncryption,
    });
  };

  return (
    <div className="w-full mx-auto px-4 py-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Mail Settings</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Mail Host */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Mail Host</label>
          <input
            type="text"
            value={mailHost}
            onChange={handleMailHostChange}
            placeholder="smtp.example.com"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Mail Port */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Mail Port</label>
          <input
            type="number"
            value={mailPort}
            onChange={handleMailPortChange}
            placeholder="587"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Mail Username */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Mail Username</label>
          <input
            type="text"
            value={mailUsername}
            onChange={handleMailUsernameChange}
            placeholder="user@example.com"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Mail Password */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Mail Password</label>
          <input
            type="password"
            value={mailPassword}
            onChange={handleMailPasswordChange}
            placeholder="********"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Mail From Name */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Mail From Name</label>
          <input
            type="text"
            value={mailFromName}
            onChange={handleMailFromNameChange}
            placeholder="Your Company"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Mail From Email */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Mail From Email</label>
          <input
            type="email"
            value={mailFromEmail}
            onChange={handleMailFromEmailChange}
            placeholder="noreply@example.com"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Mail Encryption */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Mail Encryption</label>
          <select
            value={mailEncryption}
            onChange={handleMailEncryptionChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="SSL">SSL</option>
            <option value="TLS">TLS</option>
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

export default MailSettings;

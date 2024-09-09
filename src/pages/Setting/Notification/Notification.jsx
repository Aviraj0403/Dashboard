import React, { useState } from 'react';

const FirebaseNotification = () => {
  // State for managing Firebase settings and file upload
  const [vapidKey, setVapidKey] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [authDomain, setAuthDomain] = useState('');
  const [projectId, setProjectId] = useState('');
  const [storageBucket, setStorageBucket] = useState('');
  const [messageSenderId, setMessageSenderId] = useState('');
  const [appId, setAppId] = useState('');
  const [measurementId, setMeasurementId] = useState('');
  const [jsonFile, setJsonFile] = useState(null);
  // Handler functions for input changes
  const handleVapidKeyChange = (e) => setVapidKey(e.target.value);
  const handleApiKeyChange = (e) => setApiKey(e.target.value);
  const handleAuthDomainChange = (e) => setAuthDomain(e.target.value);
  const handleProjectIdChange = (e) => setProjectId(e.target.value);
  const handleStorageBucketChange = (e) => setStorageBucket(e.target.value);
  const handleMessageSenderIdChange = (e) => setMessageSenderId(e.target.value);
  const handleAppIdChange = (e) => setAppId(e.target.value);
  const handleMeasurementIdChange = (e) => setMeasurementId(e.target.value);
  const handleFileChange = (e) => setJsonFile(e.target.files[0]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('vapidKey', vapidKey);
    formData.append('apiKey', apiKey);
    formData.append('authDomain', authDomain);
    formData.append('projectId', projectId);
    formData.append('storageBucket', storageBucket);
    formData.append('messageSenderId', messageSenderId);
    formData.append('appId', appId);
    formData.append('measurementId', measurementId);
    if (jsonFile) {
      formData.append('jsonFile', jsonFile);
    }

    // TODO: Implement backend API call to save notification settings
    // Example:
    // fetch('/api/save-notification-settings', {
    //   method: 'POST',
    //   body: formData,
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Handle success
    //   console.log('Notification settings saved successfully:', data);
    // })
    // .catch(error => {
    //   // Handle error
    //   console.error('Error saving notification settings:', error);
    // });

    console.log('Notification Settings Submitted', {
      vapidKey,
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messageSenderId,
      appId,
      measurementId,
      jsonFile,
    });
  };

  return (
    <div className="w-full mx-auto px-4 py-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Notification Settings</h2>
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        {/* Firebase Public VAPID Key */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Firebase Public VAPID Key</label>
          <input
            type="text"
            value={vapidKey}
            onChange={handleVapidKeyChange}
            placeholder="Enter VAPID Key"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Firebase Api Key */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Firebase Api Key</label>
          <input
            type="text"
            value={apiKey}
            onChange={handleApiKeyChange}
            placeholder="Enter API Key"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Firebase Auth Domain */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Firebase Auth Domain</label>
          <input
            type="text"
            value={authDomain}
            onChange={handleAuthDomainChange}
            placeholder="Enter Auth Domain"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Firebase Project Id */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Firebase Project Id</label>
          <input
            type="text"
            value={projectId}
            onChange={handleProjectIdChange}
            placeholder="Enter Project Id"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Firebase Storage Bucket */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Firebase Storage Bucket</label>
          <input
            type="text"
            value={storageBucket}
            onChange={handleStorageBucketChange}
            placeholder="Enter Storage Bucket"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Firebase Message Sender Id */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Firebase Message Sender Id</label>
          <input
            type="text"
            value={messageSenderId}
            onChange={handleMessageSenderIdChange}
            placeholder="Enter Message Sender Id"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Firebase App Id */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Firebase App Id</label>
          <input
            type="text"
            value={appId}
            onChange={handleAppIdChange}
            placeholder="Enter App Id"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Firebase Measurement Id */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Firebase Measurement Id</label>
          <input
            type="text"
            value={measurementId}
            onChange={handleMeasurementIdChange}
            placeholder="Enter Measurement Id"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* File Upload */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">File (Json)</label>
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-md p-2"
          />
          {jsonFile && <p className="mt-2 text-gray-500">File: {jsonFile.name}</p>}
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

export default FirebaseNotification;

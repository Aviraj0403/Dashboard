import React, { useState } from 'react';

const NotificationAlert = () => {
  // States for managing notification settings
  const [selectedType, setSelectedType] = useState('');
  const [mailNotificationEnabled, setMailNotificationEnabled] = useState(true);
  const [mailMessage, setMailMessage] = useState('You have a new order.');
  const [smsNotificationEnabled, setSmsNotificationEnabled] = useState(true);
  const [smsMessage, setSmsMessage] = useState('You have a new order.');
  const [pushNotificationEnabled, setPushNotificationEnabled] = useState(true);
  const [pushMessage, setPushMessage] = useState('You have a new order.');

  // Handler functions
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleMailNotificationChange = (e) => setMailNotificationEnabled(e.target.checked);
  const handleMailMessageChange = (e) => setMailMessage(e.target.value);

  const handleSmsNotificationChange = (e) => setSmsNotificationEnabled(e.target.checked);
  const handleSmsMessageChange = (e) => setSmsMessage(e.target.value);

  const handlePushNotificationChange = (e) => setPushNotificationEnabled(e.target.checked);
  const handlePushMessageChange = (e) => setPushMessage(e.target.value);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement backend API call to save notification settings
    // Example:
    // fetch('/api/save-notification-alert', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ mailNotificationEnabled, mailMessage, smsNotificationEnabled, smsMessage, pushNotificationEnabled, pushMessage }),
    // })
    // .then(response => response.json())
    // .then(data => console.log('Notification settings saved:', data))
    // .catch(error => console.error('Error saving notification settings:', error));
    console.log('Notification Settings Submitted:', { mailNotificationEnabled, mailMessage, smsNotificationEnabled, smsMessage, pushNotificationEnabled, pushMessage });
  };

  return (
    <div className="w-full mx-auto px-4 py-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Notification Alert Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Notification Type Selection */}
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="mail"
              name="notificationType"
              value="mail"
              checked={selectedType === 'mail'}
              onChange={handleTypeChange}
              className="mr-2"
            />
            <label htmlFor="mail" className="font-medium">Mail</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="sms"
              name="notificationType"
              value="sms"
              checked={selectedType === 'sms'}
              onChange={handleTypeChange}
              className="mr-2"
            />
            <label htmlFor="sms" className="font-medium">SMS</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="push"
              name="notificationType"
              value="push"
              checked={selectedType === 'push'}
              onChange={handleTypeChange}
              className="mr-2"
            />
            <label htmlFor="push" className="font-medium">Push Notification</label>
          </div>
        </div>

        {/* Mail Notification Messages */}
        {selectedType === 'mail' && (
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="mailNotification"
                checked={mailNotificationEnabled}
                onChange={handleMailNotificationChange}
                className="mr-2"
              />
              <label htmlFor="mailNotification" className="font-medium">Admin and Branch Manager New Order Message</label>
            </div>
            {mailNotificationEnabled && (
              <div className="flex flex-col">
                <label htmlFor="mailMessage" className="mb-2 font-medium">Message</label>
                <textarea
                  id="mailMessage"
                  value={mailMessage}
                  onChange={handleMailMessageChange}
                  rows="4"
                  className="border border-gray-300 rounded-md p-2"
                  placeholder="Enter your message here..."
                />
              </div>
            )}
          </div>
        )}

        {/* SMS Notification Messages */}
        {selectedType === 'sms' && (
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="smsNotification"
                checked={smsNotificationEnabled}
                onChange={handleSmsNotificationChange}
                className="mr-2"
              />
              <label htmlFor="smsNotification" className="font-medium">Admin and Branch Manager New Order Message</label>
            </div>
            {smsNotificationEnabled && (
              <div className="flex flex-col">
                <label htmlFor="smsMessage" className="mb-2 font-medium">Message</label>
                <textarea
                  id="smsMessage"
                  value={smsMessage}
                  onChange={handleSmsMessageChange}
                  rows="4"
                  className="border border-gray-300 rounded-md p-2"
                  placeholder="Enter your message here..."
                />
              </div>
            )}
          </div>
        )}

        {/* Push Notification Messages */}
        {selectedType === 'push' && (
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pushNotification"
                checked={pushNotificationEnabled}
                onChange={handlePushNotificationChange}
                className="mr-2"
              />
              <label htmlFor="pushNotification" className="font-medium">Admin and Branch Manager New Order Message</label>
            </div>
            {pushNotificationEnabled && (
              <div className="flex flex-col">
                <label htmlFor="pushMessage" className="mb-2 font-medium">Message</label>
                <textarea
                  id="pushMessage"
                  value={pushMessage}
                  onChange={handlePushMessageChange}
                  rows="4"
                  className="border border-gray-300 rounded-md p-2"
                  placeholder="Enter your message here..."
                />
              </div>
            )}
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
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

export default NotificationAlert;

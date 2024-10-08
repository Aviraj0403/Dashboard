// useNotification.js
import { useState, useRef } from 'react';

const useNotification = () => {
  const [notification, setNotification] = useState(null);
  const notificationSound = useRef(new Audio('/notification.mp3'));

  const notify = (message) => {
    setNotification(message);
    notificationSound.current.play().catch(console.error);
  };

  const clearNotification = () => {
    setNotification(null);
  };

  return {
    notification,
    notify,
    clearNotification,
  };
};

export default useNotification;

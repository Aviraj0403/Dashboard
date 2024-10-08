// useSocket.js
import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const useSocket = (url, onMessage) => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(url);

    // Register event listeners
    socketRef.current.on('message', onMessage);

    return () => {
      // Cleanup: Disconnect the socket when the component unmounts
      socketRef.current.disconnect();
    };
  }, [url, onMessage]);

  return socketRef.current;
};

export default useSocket;

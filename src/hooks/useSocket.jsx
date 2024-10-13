import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const useSocket = (url, onMessage) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Create the socket connection
    socketRef.current = io(url);

    // Register event listeners
    socketRef.current.on('message', onMessage);

    return () => {
      // Cleanup: Remove the event listener and disconnect the socket when the component unmounts
      if (socketRef.current) {
        socketRef.current.off('message', onMessage);
        socketRef.current.disconnect();
      }
    };
  }, [url, onMessage]);

  return socketRef.current;
};

export default useSocket;

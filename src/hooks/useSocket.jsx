import { useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = (restaurantId, handlers) => {
  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.emit("joinRestaurant", restaurantId);

    // Attach event handlers
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      // Clean up: remove event handlers and disconnect socket
      Object.entries(handlers).forEach(([event]) => {
        socket.off(event);
      });
      socket.disconnect();
    };
  }, [restaurantId, handlers]);
};

export default useSocket;

import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState('');

  const connectSocket = (restaurantId) => {
    const socketConnection = io('http://localhost:4000');
    socketConnection.emit('joinRestaurant', restaurantId);

    socketConnection.on('orderUpdate', handleOrderUpdate);
    socketConnection.on('newOrder', handleNewOrder);
    socketConnection.on('tableUpdate', handleTableUpdate);
    socketConnection.on('paymentProcessed', handlePaymentProcessed);

    setSocket(socketConnection);
  };

  const handleOrderUpdate = (data) => {
    setNotification(`Order updated for Table ${data.tableId}`);
  };

  const handleNewOrder = (data) => {
    if (!data.orderDetails || !data.orderDetails.cart) return;
    setNotification(`New order received for Table ${data.orderDetails.selectedTable}`);
  };

  const handleTableUpdate = (data) => {
    // Handle table updates
  };

  const handlePaymentProcessed = (data) => {
    setNotification(`Payment confirmed from ${data.tableName}`);
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, connectSocket, notification, setNotification }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};

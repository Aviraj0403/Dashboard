import React, { useState, useEffect, useMemo } from "react";
import { FaChartLine, FaClipboardList, FaUser } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import BookingChart from "../chart/BookingChart";
import { Outlet } from "react-router-dom";
import { useRestaurantId } from '../../context/userContext';
import io from "socket.io-client";
import {
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  TextField,
  Snackbar,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import useNotification from '../../hooks/useNotification';

// Item data
const items = [
  { id: 1, name: 'Sesame Chicken', price: 2500.00 },
  { id: 2, name: 'Sweet & Sour Chicken', price: 2000.00 },
  { id: 3, name: 'Wonton Soup', price: 1500.00 },
  { id: 4, name: 'American BBQ Double', price: 3000.00 },
  { id: 5, name: 'Vegetable Roll', price: 1000.00 },
  { id: 6, name: 'Plain Grilled Chicken', price: 2500.00 },
  { id: 7, name: 'Roasted Salmon Salad', price: 3500.00 },
  { id: 8, name: 'Yemete Kudasai Chicken', price: 2000.00 },
];

function Dashboard() {
  const restaurantId = useRestaurantId();
  const { notification, notify, clearNotification } = useNotification();
  const [orderData, setOrderData] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableOrders, setTableOrders] = useState([]);
  const [activeTables, setActiveTables] = useState(new Set());
  const [showMenu, setShowMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  // Socket connection
  useEffect(() => {
    const socketConnection = io("http://localhost:4000");

    socketConnection.emit("joinRestaurant", restaurantId);

    socketConnection.on("orderUpdate", handleOrderUpdate);
    socketConnection.on("newOrder", handleNewOrder);
    socketConnection.on("tableUpdate", handleTableUpdate);
    socketConnection.on("paymentProcessed", handlePaymentProcessed);

    return () => {
      socketConnection.off("orderUpdate", handleOrderUpdate);
      socketConnection.off("newOrder", handleNewOrder);
      socketConnection.off("tableUpdate", handleTableUpdate);
      socketConnection.off("paymentProcessed", handlePaymentProcessed);
      socketConnection.disconnect();
    };
  }, [restaurantId]);

  const handleOrderUpdate = (data) => {
    setOrderData((prevData) => {
      const updatedData = [...prevData];
      const index = updatedData.findIndex(order => order.tableId === data.tableId);
      if (index !== -1) {
        updatedData[index] = data;
      } else {
        updatedData.push(data);
      }
      return updatedData;
    });
    notify(`Order updated for Table ${data.tableId}`);
  };

  const handleNewOrder = (data) => {
    if (!data.orderDetails || !data.orderDetails.cart) {
      console.error("Invalid order data received:", data);
      return;
    }

    const { selectedTable, totalPrice, cart } = data.orderDetails;

    const newOrder = {
      tableId: selectedTable,
      totalAmount: totalPrice,
      orderDetails: cart,
      paymentStatus: 'Pending',
      tableName: data.tableName,
    };

    setOrderData(prevData => [...prevData, newOrder]);
    setActiveTables(prev => new Set(prev).add(newOrder.tableName));
    notify(`New order received for Table ${selectedTable}`);
  };

  const handleTableUpdate = (data) => {
    if (selectedTable === data.tableId) {
      setTableOrders(data.orders);
    }
  };

  const handlePaymentProcessed = (data) => {
    setOrderData(prevData =>
      prevData.map(order =>
        order.tableId === data.tableId ? { ...order, paymentStatus: 'Paid', transactionId: data.transactionId ,tableName: order.tableName } : order
      )
    );
    notify(`Payment confirmed from ${data.tableName}`);
  };

  const calculateTotalPrice = useMemo(() =>
    tableOrders.reduce((total, order) => total + order.price, 0), [tableOrders]
  );

  const handleAddItem = () => {
    if (selectedTable !== null && selectedItem) {
      const item = items.find(item => item.id === selectedItem);
      if (item) {
        setTableOrders(prevOrders => {
          const existingItemIndex = prevOrders.findIndex(order => order.id === selectedItem);
          if (existingItemIndex >= 0) {
            const updatedOrders = [...prevOrders];
            updatedOrders[existingItemIndex].quantity += quantity;
            updatedOrders[existingItemIndex].price = item.price * updatedOrders[existingItemIndex].quantity;
            return updatedOrders;
          } else {
            return [...prevOrders, { id: selectedItem, itemName: item.name, quantity, price: item.price * quantity }];
          }
        });
        resetMenuState();
      }
    }
  };

  const resetMenuState = () => {
    setShowMenu(false);
    setSelectedItem(null);
    setQuantity(1);
  };

  const hours = new Date().getHours();
  const greetingMessage = hours < 12 ? "Good Morning!" : hours < 18 ? "Good Afternoon!" : "Good Evening!";
  const textColor = hours < 12 ? "text-blue-600" : hours < 18 ? "text-orange-500" : "text-purple-600";

  return (
    <main className="flex-grow p-4 overflow-scroll">
      <Snackbar
        open={Boolean(notification)}
        autoHideDuration={12000}
        onClose={clearNotification}
        message={notification}
      />

      <div className="px-3 py-2 mb-1">
        <h2 className={`text-2xl font-bold ${textColor}`}>{greetingMessage}</h2>
      </div>

      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 text-white">
        <OverviewCard title="Total Sales" value={`₹${calculateTotalPrice.toFixed(2)}`} icon={<FaChartLine />} color="#FF4F99" />
        <OverviewCard title="Total Orders" value={orderData.length} icon={<FaClipboardList />} color="#8262FE" />
        <OverviewCard title="Total Customers" value={activeTables.size} icon={<MdMenuBook />} color="#567DFF" />
        <OverviewCard title="Total Menu Items" value={items.length} icon={<FaUser />} color="#A953FF" />
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4">Customer Orders</h2>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 py-3">
          {orderData.map(order => (
           <OrderCard key={order.tableId} order={order} onClick={() => setSelectedTable(order.tableId)} />

          ))}
        </div>
      </div>

      {selectedTable && (
        <TableOrders
          selectedTable={selectedTable}
          tableOrders={tableOrders}
          calculateTotalPrice={calculateTotalPrice}
          setShowMenu={setShowMenu}
        />
      )}

      {showMenu && (
        <ItemSelectionMenu
          items={items}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          quantity={quantity}
          setQuantity={setQuantity}
          handleAddItem={handleAddItem}
          closeMenu={resetMenuState}
        />
      )}

      <BookingChart title={"Sales Report"} url={"/ticket/tickets/all"} />
      <Outlet />
    </main>
  );
}

// OverviewCard Component
const OverviewCard = ({ title, value, icon, color }) => (
  <div className="p-4 rounded shadow flex items-center justify-between" style={{ backgroundColor: color }}>
    {icon}
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

// OrderCard Component
const OrderCard = ({ order, onClick }) => (
  <motion.div
    onClick={onClick}
    className={`bg-gray-100 p-4 rounded-lg shadow-lg cursor-pointer border-2 border-gray-300 transition-transform transform hover:scale-105`}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
  >
    <Typography variant="h6" component="h3" className="font-bold flex justify-between items-center">
      {order.tableName}
      {order.paymentStatus === 'Paid' && <Chip label="Paid" color="success" size="small" />}
    </Typography>
    <Typography variant="body1">Order Total: ₹{(order.totalAmount || 0).toFixed(2)}</Typography>
    <Typography variant="body1">Payment Status: {order.paymentStatus || "Pending"}</Typography>

    {/* Display cart items */}
    <Typography variant="body2" className="mt-2">Order Details:</Typography>
    {order.orderDetails.map(item => (
      <Typography key={item.fooditemId} variant="body2">
        {item.name} (Quantity: {item.quantity})
      </Typography>
    ))}

    {order.transactionId && <Typography variant="body1">Transaction ID: {order.transactionId}</Typography>}
  </motion.div>
);

// TableOrders Component
const TableOrders = ({ selectedTable, tableOrders, calculateTotalPrice, setShowMenu }) => (
  <div className="mb-4">
    <h2 className="text-2xl font-bold mb-4">Orders for Table {selectedTable}</h2>
    <div className="mb-4">
      <Button variant="contained" color="primary" onClick={() => setShowMenu(true)}>Add Item to Order</Button>
      <Typography variant="h6" className="mb-2">Total Price (INR): ₹{calculateTotalPrice.toFixed(2)}</Typography>
    </div>
    <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 py-3">
      {tableOrders.map(order => (
        <Card key={order.id} className="shadow-lg p-4 border border-gray-300">
          <CardContent>
            <Typography variant="h6" component="div">{order.itemName}</Typography>
            <Typography variant="body2">Quantity: {order.quantity}</Typography>
            <Typography variant="body2">Price: ₹{order.price.toFixed(2)}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

// ItemSelectionMenu Component
const ItemSelectionMenu = ({ items, selectedItem, setSelectedItem, quantity, setQuantity, handleAddItem, closeMenu }) => (
  <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-4 rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Select Item</h2>
      <Select value={selectedItem || ''} onChange={(e) => setSelectedItem(e.target.value)} displayEmpty fullWidth>
        <MenuItem value="" disabled>Select Menu Item</MenuItem>
        {items.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.name} - ₹{item.price.toFixed(2)}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        inputProps={{ min: 1 }}
        fullWidth
      />
      <div className="flex justify-between mt-4">
        <Button variant="contained" color="primary" onClick={handleAddItem}>Add Item</Button>
        <Button variant="outlined" onClick={closeMenu}>Cancel</Button>
      </div>
    </div>
  </div>
);

export default Dashboard;
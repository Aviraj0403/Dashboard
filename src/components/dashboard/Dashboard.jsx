import React, { useState, useEffect, useRef } from "react";
import { FaChartLine, FaClipboardList, FaUser } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import BookingChart from "../chart/BookingChart";
import { Outlet } from "react-router-dom";
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
} from "@mui/material";
import { motion } from "framer-motion";

const items = [
  { id: 1, name: 'Sesame Chicken', image: 'https://demo.foodscan.xyz/storage/61/conversions/sweet_&_sour_chicken-thumb.png', price: 2500.00 },
  { id: 2, name: 'Sweet & Sour Chicken', image: 'https://demo.foodscan.xyz/storage/61/conversions/sweet_&_sour_chicken-thumb.png', price: 2000.00 },
  { id: 3, name: 'Wonton Soup', image: 'https://demo.foodscan.xyz/storage/79/conversions/wonton_soup-thumb.png', price: 1500.00 },
  { id: 4, name: 'American BBQ Double', image: 'https://demo.foodscan.xyz/storage/43/conversions/american_bbq_double-thumb.png', price: 3000.00 },
  { id: 5, name: 'Vegetable Roll', image: 'https://demo.foodscan.xyz/storage/42/conversions/vegetable_roll-thumb.png', price: 1000.00 },
  { id: 6, name: 'Plain Grilled Chicken', image: 'https://demo.foodscan.xyz/storage/56/conversions/plain_grilled_chicken-thumb.png', price: 2500.00 },
  { id: 7, name: 'Roasted Salmon Salad', image: 'https://demo.foodscan.xyz/storage/75/conversions/roasted_salmon_salad-thumb.png', price: 3500.00 },
  { id: 8, name: 'Yemete Kudasai Chicken', image: 'https://demo.foodscan.xyz/storage/62/conversions/yemete_kudasai_chicken-thumb.png', price: 2000.00 },
];

const sampleOrders = [
  { tableId: 1, totalAmount: 12000.00, paymentStatus: 'unpaid', foodStatus: 'processing', persons: 4 },
  { tableId: 2, totalAmount: 8575.00, paymentStatus: 'paid', foodStatus: 'delivered', persons: 2 },
  { tableId: 3, totalAmount: 6000.00, paymentStatus: 'partial paid', foodStatus: 'processing', persons: 3 },
];

const sampleTableOrders = {
  1: [
    { id: 1, itemName: 'Sesame Chicken', quantity: 2, price: 2500.00 },
    { id: 3, itemName: 'Wonton Soup', quantity: 1, price: 1500.00 },
  ],
  2: [
    { id: 2, itemName: 'Sweet & Sour Chicken', quantity: 1, price: 2000.00 },
    { id: 5, itemName: 'Vegetable Roll', quantity: 3, price: 1000.00 },
  ],
};

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [orderData, setOrderData] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableOrders, setTableOrders] = useState([]);
  const [activeTables, setActiveTables] = useState(new Set());
  const [socket, setSocket] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [persons, setPersons] = useState(1);
  const [notification, setNotification] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [paymentNotification, setPaymentNotification] = useState(null);
  const notificationSound = useRef(new Audio('/notification.mp3'));

  useEffect(() => {
    const timer = setInterval(() => {
      setOrderData(sampleOrders);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedTable !== null) {
      setTableOrders(sampleTableOrders[selectedTable] || []);
    }
  }, [selectedTable]);

  useEffect(() => {
    const socketConnection = io("http://localhost:4000");
    setSocket(socketConnection);

    const handleOrderUpdate = (data) => {
      setOrderData(prevData => {
        const updatedData = [...prevData];
        data.forEach(update => {
          const index = updatedData.findIndex(order => order.tableId === update.tableId);
          if (index !== -1) {
            updatedData[index] = update;
          } else {
            updatedData.push(update);
          }
        });
        return updatedData;
      });
      setNotification(`Order updated for Table ${data.tableId}`);
      playNotificationSound();
    };

    const handleTableUpdate = (data) => {
      if (selectedTable === data.tableId) {
        setTableOrders(data.orders);
      }
      setActiveTables(prevTables => new Set(prevTables).add(data.tableId));
    };

    const handleTableStatusUpdate = (data) => {
      setActiveTables(prevTables => {
        const newTables = new Set(prevTables);
        if (data.status === 'completed') {
          newTables.delete(data.tableId);
        }
        return newTables;
      });
    };

    const handlePaymentProcessed = (data) => {
      setOrderData(prevData =>
        prevData.map(order =>
          order.tableId === data.tableId
            ? { ...order, paymentStatus: 'paid', transactionId: data.transactionId }
            : order
        )
      );
      setPaymentNotification(`Payment confirmed from ${data.tableName}`);
      playNotificationSound();
    };

    socketConnection.on("orderUpdate", handleOrderUpdate);
    socketConnection.on("tableUpdate", handleTableUpdate);
    socketConnection.on("tableStatusUpdate", handleTableStatusUpdate);
    socketConnection.on("paymentProcessed", handlePaymentProcessed);

    return () => {
      socketConnection.off("orderUpdate", handleOrderUpdate);
      socketConnection.off("tableUpdate", handleTableUpdate);
      socketConnection.off("tableStatusUpdate", handleTableStatusUpdate);
      socketConnection.off("paymentProcessed", handlePaymentProcessed);
      socketConnection.disconnect();
    };
  }, [selectedTable]);

  const handleNotificationClose = () => setNotification(null);
  const handlePaymentNotificationClose = () => setPaymentNotification(null);
  const playNotificationSound = () => {
    notificationSound.current.play().catch(console.error);
  };

  useEffect(() => {
    if (notification) playNotificationSound();
  }, [notification]);

  const hours = new Date().getHours();
  const greetingMessage = hours < 12 ? "Good Morning!" : hours < 18 ? "Good Afternoon!" : "Good Evening!";
  const textColor = hours < 12 ? "text-blue-600" : hours < 18 ? "text-orange-500" : "text-purple-600";

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

  const calculateTotalPriceINR = () => tableOrders.reduce((total, order) => total + order.price, 0);

  const handleGenerateBill = () => {
    if (selectedTable !== null) {
      updateTableStatus('paid', 'completed');
    }
  };

  const updateTableStatus = (paymentStatus, foodStatus) => {
    socket?.emit("updateTableStatus", { tableId: selectedTable, paymentStatus, foodStatus });
  };

  const handleAddPersons = () => {
    if (selectedTable !== null) {
      setOrderData(prevData =>
        prevData.map(order =>
          order.tableId === selectedTable ? { ...order, persons } : order
        )
      );
      resetMenuState();
    }
  };

  return (
    <main className="flex-grow p-4 overflow-scroll">

      {/* Heading or notification bar */}
      <div className="rounded-sm shadow-md bg-red-100 px-3 py-2 mb-1">
        <h2 className="text-xl font-semibold">Notification or Alert</h2>
        <p>For notification purposes</p>
      </div>

      {/* Greeting bar */}
      <div className="px-3 py-2 mb-1">
        <h2 className={`text-2xl font-bold ${textColor}`}>{greetingMessage}</h2>
        <p>For greeting purposes</p>
      </div>

      {/* Overview panel */}
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 text-white">
        <OverviewCard title="Total Sales" value={`₹${calculateTotalPriceINR().toFixed(2)}`} icon={<FaChartLine />} color="#FF4F99" />
        <OverviewCard title="Total Orders" value={orderData.length} icon={<FaClipboardList />} color="#8262FE" />
        <OverviewCard title="Total Customers" value={[...activeTables].length} icon={<MdMenuBook />} color="#567DFF" />
        <OverviewCard title="Total Menu Items" value={items.length} icon={<FaUser />} color="#A953FF" />
      </div>

      {/* Customer Orders Table */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4">Customer Orders</h2>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 py-3">
          {orderData.map(order => (
            <OrderCard key={order.tableId} order={order} onClick={() => setSelectedTable(order.tableId)} />
          ))}
        </div>
      </div>

      {/* Notification Snackbar */}
      <Snackbar
        open={Boolean(notification)}
        autoHideDuration={12000}
        onClose={handleNotificationClose}
        message={notification}
        action={<Button color="inherit" onClick={handleNotificationClose}>Close</Button>}
      />

      {/* Payment Notification Snackbar */}
      <Snackbar
        open={Boolean(paymentNotification)}
        autoHideDuration={12000}
        onClose={handlePaymentNotificationClose}
        message={paymentNotification}
        action={<Button color="inherit" onClick={handlePaymentNotificationClose}>Close</Button>}
      />

      {/* Table Specific Orders */}
      {selectedTable && (
        <TableOrders
          selectedTable={selectedTable}
          tableOrders={tableOrders}
          handleGenerateBill={handleGenerateBill}
          updateTableStatus={updateTableStatus}
          calculateTotalPrice={calculateTotalPriceINR}
          setShowMenu={setShowMenu}
          handleAddPersons={handleAddPersons}
        />
      )}

      {/* Item Selection Menu */}
      {showMenu && (
        <ItemSelectionMenu
          items={items}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          quantity={quantity}
          setQuantity={setQuantity}
          persons={persons}
          setPersons={setPersons}
          handleAddItem={handleAddItem}
          closeMenu={() => setShowMenu(false)}
        />
      )}

      {/* Charts panel */}
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 py-3">
        <BookingChart title={"Sales Report"} url={"/ticket/tickets/all"} />
        {/* <FeaturedItem title={"Featured Items"} data={items} /> */}
        {/* <FeaturedItem title={"Most Popular Items"} data={items} /> */}
      </div>

      <Outlet />
    </main>
  );
}

// OverviewCard Component
const OverviewCard = ({ title, value, icon, color }) => (
  <div className={`bg-[${color}] p-4 rounded shadow flex items-center justify-between px-6`}>
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
    className={`bg-gray-100 p-4 rounded-lg shadow-lg cursor-pointer 
        ${order.paymentStatus === 'paid' ? 'border-green-500' :
        order.paymentStatus === 'unpaid' ? 'border-red-500' :
          'border-yellow-500'} border-2 transition-transform transform hover:scale-105`}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
  >
    <Typography variant="h6" component="h3" className="font-bold">Table {order.tableId}</Typography>
    <Typography variant="body1">Order Total: ₹{order.totalAmount.toFixed(2)}</Typography>
    <Typography variant="body1">Payment Status: {order.paymentStatus}</Typography>
    {order.transactionId && <Typography variant="body1">Transaction ID: {order.transactionId}</Typography>}
    <Typography variant="body1">Food Status: {order.foodStatus}</Typography>
    <Typography variant="body1">Persons: {order.persons}</Typography>
  </motion.div>
);

// TableOrders Component
const TableOrders = ({ selectedTable, tableOrders, handleGenerateBill, updateTableStatus, calculateTotalPrice, setShowMenu, handleAddPersons }) => (
  <div className="mb-4">
    <h2 className="text-2xl font-bold mb-4">Orders for Table {selectedTable}</h2>
    <div className="mb-4">
      <Typography variant="h6" className="font-bold mb-2">Manage Orders</Typography>
      <div className="flex gap-2 mb-4">
        <Button variant="contained" color="primary" onClick={() => setShowMenu(true)}>Add Item to Order</Button>
        <Button variant="contained" color="success" onClick={handleGenerateBill}>Generate Bill</Button>
        <Button variant="contained" color="warning" onClick={() => updateTableStatus('completed', 'delivered')}>Mark as Completed</Button>
      </div>
      <Typography variant="h6" className="mb-2">Total Price (INR): ₹{calculateTotalPrice().toFixed(2)}</Typography>
    </div>
    <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 py-3">
      {tableOrders.map(order => (
        <Card key={order.id} className="shadow-lg">
          <CardContent>
            <Typography variant="h6" component="h3" className="font-bold">{order.itemName}</Typography>
            <Typography variant="body1">Quantity: {order.quantity}</Typography>
            <Typography variant="body1">Price: ₹{order.price.toFixed(2)}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

// ItemSelectionMenu Component
const ItemSelectionMenu = ({ items, selectedItem, setSelectedItem, quantity, setQuantity, persons, setPersons, handleAddItem, closeMenu }) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
      <Typography variant="h6" component="h3" className="font-bold mb-4">Select Item</Typography>
      <div className="mb-4">
        <Typography variant="body1" className="block mb-2">Item</Typography>
        <Select value={selectedItem || ''} onChange={(e) => setSelectedItem(Number(e.target.value))} fullWidth>
          <MenuItem value="">Select an item</MenuItem>
          {items.map(item => (
            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
          ))}
        </Select>
      </div>
      <div className="mb-4">
        <Typography variant="body1" className="block mb-2">Quantity</Typography>
        <TextField type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} fullWidth inputProps={{ min: 1 }} />
      </div>
      <div className="mb-4">
        <Typography variant="body1" className="block mb-2">Persons</Typography>
        <TextField type="number" value={persons} onChange={(e) => setPersons(Number(e.target.value))} fullWidth inputProps={{ min: 1 }} />
      </div>
      <div className="flex gap-2">
        <Button variant="contained" color="primary" onClick={handleAddItem}>Add Item</Button>
        <Button variant="contained" color="success" onClick={handleAddPersons}>Update Persons</Button>
        <Button variant="outlined" color="error" onClick={closeMenu}>Cancel</Button>
      </div>
    </div>
  </div>
);

export default Dashboard;


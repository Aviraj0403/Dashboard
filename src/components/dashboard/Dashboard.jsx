import React, { useState, useEffect } from "react";
import { FaChartLine, FaClipboardList, FaUser } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import BookingChart from "../chart/BookingChart";
import FeaturedItem from "./featured/FeaturedItem";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";
import { Button, Card, CardContent, Typography, MenuItem, Select, TextField } from "@mui/material";
import { motion } from "framer-motion";

// Sample data for items and orders
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
    const socketConnection = io("YOUR_WEBSOCKET_SERVER_URL");
    setSocket(socketConnection);

    socketConnection.on("orderUpdate", (data) => {
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
    });

    socketConnection.on("tableUpdate", (data) => {
      if (selectedTable === data.tableId) {
        setTableOrders(data.orders);
      }
      setActiveTables(prevTables => new Set([...prevTables, data.tableId]));
    });

    socketConnection.on("tableStatusUpdate", (data) => {
      setActiveTables(prevTables => {
        const newTables = new Set(prevTables);
        if (data.status === 'completed') {
          newTables.delete(data.tableId);
        }
        return newTables;
      });
    });

    return () => {
      socketConnection.off("orderUpdate");
      socketConnection.off("tableUpdate");
      socketConnection.off("tableStatusUpdate");
    };
  }, [selectedTable]);

  const hours = new Date().getHours();
  let greetingMessage;
  let textColor;

  if (hours < 12) {
    greetingMessage = "Good Morning!";
    textColor = "text-blue-600";
  } else if (hours < 18) {
    greetingMessage = "Good Afternoon!";
    textColor = "text-orange-500";
  } else {
    greetingMessage = "Good Evening!";
    textColor = "text-purple-600";
  }

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
        setShowMenu(false);
        setSelectedItem(null);
        setQuantity(1);
      }
    }
  };

  const calculateTotalPriceINR = () => {
    return tableOrders.reduce((total, order) => total + order.price, 0);
  };

  const handleGenerateBill = () => {
    if (selectedTable !== null) {
      console.log("Generating bill for table", selectedTable);
    }
  };

  const updateTableStatus = (paymentStatus, foodStatus) => {
    if (socket) {
      socket.emit("updateTableStatus", { tableId: selectedTable, paymentStatus, foodStatus });
    }
  };

  const handleAddPersons = () => {
    if (selectedTable !== null) {
      setOrderData(prevData => {
        const updatedData = prevData.map(order =>
          order.tableId === selectedTable ? { ...order, persons } : order
        );
        return updatedData;
      });
      setShowMenu(false);
      setPersons(1);
    }
  };

  return (
    <main className="flex-grow p-4 overflow-scroll">
      {/* Heading or notification bar */}
      <div className="rounded-sm shadow-md bg-red-100 px-3 py-2 mb-1">
        <h2 className="text-xl font-semibold">Notification or Alert</h2>
        <p>For Notification purpose</p>
      </div>

      {/* Greeting bars */}
      <div className="px-3 py-2 mb-1">
        <h2 className={`text-2xl font-bold ${textColor}`}>{greetingMessage}</h2>
        <p>For greeting purpose</p>
      </div>

      {/* Overview panel */}
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 text-white">
        <div className="bg-[#FF4F99] p-4 rounded shadow flex items-center justify-between px-6">
          <FaChartLine size={38} />
          <div>
            <h3 className="text-xl font-bold mb-2">Total Sales</h3>
            <p className="text-3xl font-bold">₹{calculateTotalPriceINR().toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-[#8262FE] p-4 rounded shadow flex items-center justify-between px-6">
          <FaClipboardList size={38} />
          <div>
            <h3 className="text-xl font-bold mb-2">Total Orders</h3>
            <p className="text-3xl font-bold">{orderData.length}</p>
          </div>
        </div>
        <div className="bg-[#567DFF] p-4 rounded shadow flex items-center justify-between px-6">
          <MdMenuBook size={38} />
          <div>
            <h3 className="text-xl font-bold mb-2">Total Customers</h3>
            <p className="text-3xl font-bold">{[...activeTables].length}</p>
          </div>
        </div>
        <div className="bg-[#A953FF] p-4 rounded shadow flex items-center justify-between px-6">
          <FaUser size={38} />
          <div>
            <h3 className="text-xl font-bold mb-2">Total Menu Items</h3>
            <p className="text-3xl font-bold">{items.length}</p>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4">Customer Orders</h2>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 py-3">
          {orderData.map(order => (
            <motion.div
              key={order.tableId}
              className={`bg-gray-100 p-4 rounded-lg shadow-lg cursor-pointer ${
                order.paymentStatus === 'paid' ? 'border-green-500 border-2' : 
                order.paymentStatus === 'unpaid' ? 'border-red-500 border-2' : 
                'border-yellow-500 border-2'
              } transition-transform transform hover:scale-105`}
              onClick={() => setSelectedTable(order.tableId)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Typography variant="h6" component="h3" className="font-bold">Table {order.tableId}</Typography>
              <Typography variant="body1">Order Total: ₹{order.totalAmount.toFixed(2)}</Typography>
              <Typography variant="body1">Payment Status: {order.paymentStatus}</Typography>
              <Typography variant="body1">Food Status: {order.foodStatus}</Typography>
              <Typography variant="body1">Persons: {order.persons}</Typography>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Table Specific Orders */}
      {selectedTable && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4">Orders for Table {selectedTable}</h2>
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
          <div className="flex gap-2 mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowMenu(true)}
            >
              Add Item to Order
            </Button>
            <Typography variant="h6" className="flex items-center mt-2">Total Price (INR): ₹{calculateTotalPriceINR().toFixed(2)}</Typography>
            <Button
              variant="contained"
              color="success"
              onClick={handleGenerateBill}
            >
              Generate Bill
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => updateTableStatus('completed', 'delivered')}
            >
              Mark as Completed
            </Button>
          </div>
        </div>
      )}

      {/* Item Selection Menu */}
      {showMenu && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <Typography variant="h6" component="h3" className="font-bold mb-4">Select Item</Typography>
            <div className="mb-4">
              <Typography variant="body1" className="block mb-2">Item</Typography>
              <Select
                value={selectedItem || ''}
                onChange={(e) => setSelectedItem(Number(e.target.value))}
                fullWidth
              >
                <MenuItem value="">Select an item</MenuItem>
                {items.map(item => (
                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </div>
            <div className="mb-4">
              <Typography variant="body1" className="block mb-2">Quantity</Typography>
              <TextField
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                fullWidth
                inputProps={{ min: 1 }}
              />
            </div>
            <div className="mb-4">
              <Typography variant="body1" className="block mb-2">Persons</Typography>
              <TextField
                type="number"
                value={persons}
                onChange={(e) => setPersons(Number(e.target.value))}
                fullWidth
                inputProps={{ min: 1 }}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddItem}
              >
                Add Item
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleAddPersons}
              >
                Update Persons
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setShowMenu(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Charts panel */}
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 py-3">
        <BookingChart title={"Sales Report"} url={"/ticket/tickets/all"} />
        <BookingChart title={"Sales Report"} url={"/ticket/tickets/all"} />
        <FeaturedItem title={"Featured Items"} data={items} />
        <FeaturedItem title={"Most Popular Items"} data={items} />
      </div>

      <Outlet />
    </main>
  );
}

export default Dashboard;

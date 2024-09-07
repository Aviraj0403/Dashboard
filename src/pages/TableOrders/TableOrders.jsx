// src/TableOrders.js

import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv'; // For CSV export
import { HiEye } from 'react-icons/hi'; // Eye icon from react-icons
import { useNavigate } from 'react-router-dom';

const sampleOrders = [
  { id: '1507244', type: 'Dining Table', customer: 'Avi Raj', amount: '6.50', date: '03:21 PM, 15-07-2024', status: 'Accept' },
  { id: '1507243', type: 'Dining Table', customer: 'Will Smith', amount: '8.50', date: '03:21 PM, 15-07-2024', status: 'Delivered' },
  // Add more sample data if needed
];

const statusColors = {
  Accept: 'bg-blue-200 text-blue-800',
  Delivered: 'bg-red-200 text-red-800',
  // Add more status colors if needed
};

const orderTypeColors = {
  'Dining Table': 'bg-green-100 text-green-800',
  // Add more order type colors if needed
};

const TableOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Uncomment and replace with your actual API endpoint
        // const response = await fetch('https://api.example.com/orders');
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        // const data = await response.json();

        // Use sample data while the backend is not connected
        const data = sampleOrders;

        setOrders(data);
        setFilteredOrders(data); // Initialize filtered orders
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const filterOrders = () => {
      const result = orders.filter(order =>
        Object.values(order).join(' ').toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredOrders(result);
    };

    filterOrders();
  }, [filter, orders]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleClearFilter = () => {
    setFilter('');
    setFilteredOrders(orders);
  };
  // Handle View 
  const handleViewDetails = (orderId) => {
    navigate(`${orderId}`); // Navigate to the OrderDetails page
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Table Orders</h1>
        <div className="flex gap-2">
          <CSVLink
            data={filteredOrders}
            filename="orders.csv"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Export to CSV
          </CSVLink>
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Search"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleClearFilter}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Clear
          </button>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Order ID</th>
            <th className="border border-gray-300 p-2">Order Type</th>
            <th className="border border-gray-300 p-2">Customer</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <tr key={order.id}>
                <td className="border border-gray-300 p-2">{order.id}</td>
                <td className={`border border-gray-300 p-2 ${orderTypeColors[order.type] || 'bg-gray-100 text-gray-800'}`}>
                  {order.type}
                </td>
                <td className="border border-gray-300 p-2">{order.customer}</td>
                <td className="border border-gray-300 p-2">{order.amount}</td>
                <td className="border border-gray-300 p-2">{order.date}</td>
                <td className={`border border-gray-300 p-2 ${statusColors[order.status] || 'bg-gray-200 text-gray-800'}`}>
                  {order.status}
                </td>
                {/* VIEW */}
                <td className="border border-gray-300 p-2 text-center">
                  {/* Eye icon with click handler for future use */}
                  <button
                    onClick={() => handleViewDetails(order.id)}
                    className="text-blue-500 relative hover:text-blue-700 rounded-md p-2 bg-blue-100 transition-transform duration-300 ease-in-out transform hover:scale-110"
                  >
                  
                    <HiEye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="border border-gray-300 p-2 text-center">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4">
        Showing 1 to {filteredOrders.length} of {orders.length} entries
      </div>
    </div>
  );
};

export default TableOrders;

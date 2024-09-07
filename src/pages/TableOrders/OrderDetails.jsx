// src/OrderDetails.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For fetching order ID from URL params

const sampleOrderDetails = {
  id: '1507244',
  paymentStatus: 'Unpaid',
  foodStatus: 'Accept',
  date: '03:21 PM, 15-07-2024',
  paymentType: 'Cash/Card',
  orderType: 'Dining Table',
  deliveryTime: '03:21 PM, 15-07-2024',
  tableName: 'Table 1',
  items: [
    { name: 'Kung Pao Chicken', quantity: '6 pcs', price: 'DH4.00' },
    { name: 'Iced Coffee', size: 'Regular', price: 'DH1.50' }
  ],
  subtotal: 'DH5.50',
  total: 'DH6.50',
  customer: {
    name: 'Will Smith',
    email: 'customer@example.com',
    phone: '+880125333344'
  }
};

// Restaurant information can be part of props or context
const restaurantInfo = {
  name: 'BR Tech Restaurant',
  address: 'Gannipur Muzaffarpur, '
};

const OrderDetails = () => {
  const { orderId } = useParams(); // Get the order ID from URL params
  const [order, setOrder] = useState(sampleOrderDetails); // Replace with fetched data
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);
  const [foodStatus, setFoodStatus] = useState(order.foodStatus);

  useEffect(() => {
    // TODO: Fetch data from backend using the orderId
    // Uncomment and modify the following code when integrating with backend
    /*
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        const data = await response.json();
        setOrder(data);
        setPaymentStatus(data.paymentStatus);
        setFoodStatus(data.foodStatus);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
    */
  }, [orderId]);

  const handlePaymentStatusChange = (event) => setPaymentStatus(event.target.value);
  const handleFoodStatusChange = (event) => setFoodStatus(event.target.value);

  const generatePrintContent = () => {
    return `
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .header h1 { margin: 0; }
            .header p { margin: 5px 0; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
            .footer { text-align: center; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${restaurantInfo.name}</h1>
              <p>${restaurantInfo.address}</p>
              <h2>Invoice - Order #${order.id}</h2>
            </div>
            <p><strong>Payment Status:</strong> ${paymentStatus}</p>
            <p><strong>Food Status:</strong> ${foodStatus}</p>
            <p><strong>Order Type:</strong> ${order.orderType}</p>
            <p><strong>Delivery Time:</strong> ${order.deliveryTime}</p>
            <p><strong>Table Name:</strong> ${order.tableName}</p>

            <h3>Order Items</h3>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity/Size</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity || item.size}</td>
                    <td>${item.price}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <p><strong>Subtotal:</strong> ${order.subtotal}</p>
            <p><strong>Total:</strong> ${order.total}</p>

            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${order.customer.name}</p>
            <p><strong>Email:</strong> ${order.customer.email}</p>
            <p><strong>Phone:</strong> ${order.customer.phone}</p>

            <div class="footer">Thank you for your order!</div>
          </div>
        </body>
      </html>
    `;
  };

  const handlePrintInvoice = () => {
    const printWindow = window.open('', '', 'height=800,width=600');
    printWindow.document.open();
    printWindow.document.write(generatePrintContent());
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order ID: #{order.id}</h1>
      <div className="bg-white shadow-md rounded-md p-6 mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <span className="text-gray-600">Payment Status:</span>
            <select
              value={paymentStatus}
              onChange={handlePaymentStatusChange}
              className="mt-2 p-2 border rounded-md"
            >
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Food Status:</span>
            <select
              value={foodStatus}
              onChange={handleFoodStatusChange}
              className="mt-2 p-2 border rounded-md"
            >
              <option value="Accept">Accept</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <span className="text-gray-600">Order Type:</span>
          <div className="mt-2 p-2 border rounded-md bg-gray-100">{order.orderType}</div>
        </div>
        <div className="mb-4">
          <span className="text-gray-600">Delivery Time:</span>
          <div className="mt-2 p-2 border rounded-md bg-gray-100">{order.deliveryTime}</div>
        </div>
        <div className="mb-4">
          <span className="text-gray-600">Table Name:</span>
          <div className="mt-2 p-2 border rounded-md bg-gray-100">{order.tableName}</div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => alert('Token added')}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Add Token
          </button>
          <button
            onClick={handlePrintInvoice}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Print Invoice
          </button>
        </div>

        <h2 className="text-xl font-bold mb-2">Order Details</h2>
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between border-b py-2">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/50"
                alt={item.name}
                className="w-12 h-12 object-cover mr-4"
              />
              <div>
                <div className="font-semibold">{item.name}</div>
                {item.quantity && <div className="text-gray-600">Quantity: {item.quantity}</div>}
                {item.size && <div className="text-gray-600">Size: {item.size}</div>}
              </div>
            </div>
            <div className="font-semibold">{item.price}</div>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-4">
          <span>Subtotal</span>
          <span>{order.subtotal}</span>
        </div>
        <div className="flex justify-between font-bold mt-2">
          <span>Total</span>
          <span>{order.total}</span>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-xl font-bold mb-2">Delivery Information</h2>
        <div className="flex items-center mb-4">
          <img
            src="https://via.placeholder.com/50"
            alt={order.customer.name}
            className="w-12 h-12 object-cover rounded-full mr-4"
          />
          <div>
            <div className="font-semibold">{order.customer.name}</div>
            <div className="text-gray-600">{order.customer.email}</div>
            <div className="text-gray-600">{order.customer.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

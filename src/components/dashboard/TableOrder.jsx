import React, { useState, useEffect } from 'react';

const TodayOrders = ({ restaurantId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${URL}/api/orders/today/${restaurantId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        
        console.log('Fetched Orders:', data);
        
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [restaurantId]);

  if (loading) {
    return <div className="text-center text-xl text-red-500">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold text-center mb-5">Today's Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center">No orders for today.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {orders.map((order) => (
            <div
              className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              key={order._id}
            >
              <h3 className="text-lg font-bold">Order Number: {order.orderNumber}</h3> {/* Display order number */}
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total Price:</strong> ₹{order.totalPrice.toLocaleString()}</p>
              
              {/* Apply green color if table is active */}
              <p className={`mt-2 text-lg font-semibold ${order.status === 'Active' ? 'text-green-500' : ''}`}>
                <strong>Dining Table:</strong> {order.diningTableName}
              </p>
              
              <h4 className="mt-3 text-md font-semibold">Items:</h4>
              <ul className="list-none p-0">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.quantity} x {order.foodDetails?.name || 'Unknown Food'} - ₹{(order.foodDetails?.price * item.quantity).toLocaleString() || '0'}
                  </li>
                ))}
              </ul>
              {order.offerDetails && (
                <div className="mt-3">
                  <h4 className="font-semibold">Offer Applied: {order.offerDetails.name}</h4>
                  <p>Discount: {order.offerDetails.discount}%</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayOrders;

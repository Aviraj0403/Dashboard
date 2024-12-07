import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRestaurantId } from '../../context/userContext.jsx'; // Import restaurantId from context

const DishDetails = () => {
  const { id } = useParams(); // Get the ID from URL params
  const restaurantId = useRestaurantId(); // Get restaurantId from context
  const [dish, setDish] = useState(null);

  const fetchDish = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
      const response = await axios.get(`${apiUrl}/api/food/${restaurantId}/${id}`);
      if (response.data.success) {
        setDish(response.data.data);
      } else {
        toast.error(response.data.message || 'Error fetching dish details');
      }
    } catch (error) {
      toast.error(error.message || 'Error fetching dish details');
    }
  };

  useEffect(() => {
    fetchDish();
  }, [id, restaurantId]);

  if (!dish) return <p className="text-center py-4 text-gray-600">Loading...</p>;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 transition-all duration-500 transform hover:scale-105">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left animate__animated animate__fadeIn animate__delay-1s">
        {dish.name}
      </h1>

      {/* Dish Image */}
      <div className="flex justify-center sm:justify-start mt-4">
        <img
          src={dish.imageUrl}
          alt={dish.name}
          className="w-full sm:w-64 md:w-80 h-auto object-cover rounded-md transition-transform duration-300 transform hover:scale-110 max-w-full"
        />
      </div>

      {/* Dish Details */}
      <div className="mt-4 space-y-3">
        <p className="text-gray-700 text-center sm:text-left animate__animated animate__fadeIn animate__delay-1s">
          {dish.description}
        </p>
        <p className="mt-2 text-xl font-semibold text-gray-900 text-center sm:text-left animate__animated animate__fadeIn animate__delay-1s">
          ₹{dish.price}
        </p>
        <p className="mt-2 text-gray-600 text-center sm:text-left animate__animated animate__fadeIn animate__delay-1s">
          Category: {dish.category}
        </p>
        <p className="mt-2 text-gray-600 text-center sm:text-left animate__animated animate__fadeIn animate__delay-1s">
          Item Type: {dish.itemType}
        </p>
        <p className="mt-2 text-gray-600 text-center sm:text-left animate__animated animate__fadeIn animate__delay-1s">
          Variety: {dish.variety}
        </p>
        <p className="mt-2 text-gray-600 text-center sm:text-left animate__animated animate__fadeIn animate__delay-1s">
          Status: {dish.status}
        </p>
        <p className="mt-2 text-gray-600 text-center sm:text-left animate__animated animate__fadeIn animate__delay-1s">
          Featured: {dish.isFeatured ? 'Yes' : 'No'}
        </p>
      </div>
    </div>
  );
};

export default DishDetails;

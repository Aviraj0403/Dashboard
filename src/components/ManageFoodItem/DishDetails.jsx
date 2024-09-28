import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const DishDetails = () => {
  const { id } = useParams(); // Get the ID from URL params
  const [dish, setDish] = useState(null);

  const fetchDish = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/food/${id}`);
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
  }, [id]);

  if (!dish) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900">{dish.name}</h1>
      <img src={dish.imageUrl} alt={dish.name} className="w-64 h-64 object-cover rounded-md mt-4" />
      <p className="mt-4 text-gray-700">{dish.description}</p>
      <p className="mt-2 text-xl font-semibold text-gray-900">₹{dish.price}</p>
      <p className="mt-2 text-gray-600">Category: {dish.category}</p>
      <p className="mt-2 text-gray-600">Item Type: {dish.itemType}</p> {/* New field */}
      <p className="mt-2 text-gray-600">Variety: {dish.variety}</p> {/* New field for variety */}
      <p className="mt-2 text-gray-600">Status: {dish.status}</p>
      <p className="mt-2 text-gray-600">Featured: {dish.isFeatured ? 'Yes' : 'No'}</p> {/* New field */}
    </div>
  );
};

export default DishDetails;

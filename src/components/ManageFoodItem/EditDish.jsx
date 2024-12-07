import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRestaurantId } from '../../context/userContext.jsx'; // Assuming you have this context

const EditDish = () => {
  const { id } = useParams();
  const restaurantId = useRestaurantId(); // Get restaurantId from context
  const [dish, setDish] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Available');
  const [itemType, setItemType] = useState('');
  const [variety, setVariety] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [recommended, setRecommended] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000"; 

  const fetchDish = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/food/${restaurantId}/${id}`);
      const { success, data, message } = response.data;

      if (success) {
        setDish(data);
        setName(data.name);
        setCategory(data.category);
        setPrice(data.price);
        setDescription(data.description);
        setStatus(data.status);
        setItemType(data.itemType);
        setVariety(data.variety);
        setIsFeatured(data.isFeatured);
        setRecommended(data.recommended);
      } else {
        toast.error(message || 'Error fetching dish details');
      }
    } catch (error) {
      toast.error(error.message || 'Error fetching dish details');
    }
  };

  useEffect(() => {
    fetchDish();
  }, [id, restaurantId]);

  const handleSave = async () => {
    if (!name || !category || !price || !itemType) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.put(
        `${apiUrl}/api/food/${restaurantId}/${id}`,
        {
          name,
          category,
          price,
          description,
          status,
          itemType,
          variety,
          isFeatured,
          recommended,
        },
        { withCredentials: true }
      );

      const { success, message } = response.data;

      if (success) {
        toast.success('Dish updated successfully');
      } else {
        toast.error(message || 'Error updating dish');
      }
    } catch (error) {
      toast.error(error.message || 'Error updating dish');
    }
  };

  if (!dish) return <p>Loading...</p>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center sm:text-left">Edit Dish</h1>
      <form className="mt-6 space-y-6">
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Salad">Salad</option>
            <option value="Cake">Cake</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Variety */}
        <div className="mb-4">
          <label className="block text-gray-700">Variety:</label>
          <input
            type="text"
            value={variety}
            onChange={(e) => setVariety(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-gray-700">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        {/* Item Type */}
        <div className="mb-4">
          <label className="block text-gray-700">Item Type:</label>
          <select
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Item Type</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>

        {/* Featured */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="mr-2"
            />
            Featured
          </label>
        </div>

        {/* Recommended */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={recommended}
              onChange={(e) => setRecommended(e.target.checked)}
              className="mr-2"
            />
            Recommended
          </label>
        </div>

        {/* Save Button */}
        <div className="flex justify-center sm:justify-start">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDish;

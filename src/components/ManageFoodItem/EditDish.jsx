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

  const fetchDish = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000"; 
      const response = await axios.get(`${apiUrl}/api/food/${restaurantId}/${id}`); // Use restaurantId here
      if (response.data.success) {
        const data = response.data.data;
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
        toast.error(response.data.message || 'Error fetching dish details');
      }
    } catch (error) {
      toast.error(error.message || 'Error fetching dish details');
    }
  };

  useEffect(() => {
    fetchDish();
  }, [id, restaurantId]); // Include restaurantId in the dependencies

  const handleSave = async () => {
    try {
      const response = await axios.put(`${apiUrl}/api/food/${restaurantId}/${id}`, { // Use restaurantId here
        name,
        category,
        price,
        description,
        status,
        itemType,
        variety,
        isFeatured,
        recommended,
      }, { withCredentials: true });

      if (response.data.success) {
        toast.success('Dish updated successfully');
      } else {
        toast.error(response.data.message || 'Error updating dish');
      }
    } catch (error) {
      toast.error(error.message || 'Error updating dish');
    }
  };

  if (!dish) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900">Edit Dish</h1>
      <form className="mt-6">
        {/* Input fields for editing the dish */}
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Category</option>
            <option value="Salad">Salad</option>
            <option value="Cake">Cake</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Variety:</label>
          <input
            type="text"
            value={variety}
            onChange={(e) => setVariety(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Item Type:</label>
          <select
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Item Type</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>
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
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditDish;

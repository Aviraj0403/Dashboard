import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const EditDish = () => {
  const { id } = useParams(); // Get the ID from URL params
  const [dish, setDish] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const fetchDish = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/food/${id}`);
      if (response.data.success) {
        const data = response.data.data;
        setDish(data);
        setName(data.name);
        setCategory(data.category);
        setPrice(data.price);
        setDescription(data.description);
        setStatus(data.status);
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

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/food/${id}`, {
        name,
        category,
        price,
        description,
        status,
      });
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
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
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

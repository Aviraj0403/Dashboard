import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRestaurantId } from '../../context/userContext.jsx'; // Import your context for restaurant ID

const EditOffer = () => {
  const [formData, setFormData] = useState({ name: '', discountPercentage: '', startDate: '', endDate: '', status: '' });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { offerId } = useParams(); // Get the offer ID from the URL
  const URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const restaurantId = useRestaurantId(); // Get the restaurant ID from context

  useEffect(() => {
    if (!restaurantId) {
      toast.error('Restaurant ID not found');
      return;
    }
    fetchOfferDetails();
  }, [restaurantId, offerId]);

  const fetchOfferDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${URL}/api/offer/${restaurantId}/${offerId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setFormData({
          ...response.data.data,
          startDate: response.data.data.startDate ? response.data.data.startDate.slice(0, 10) : '',
          endDate: response.data.data.endDate ? response.data.data.endDate.slice(0, 10) : ''
        });
      } else {
        toast.error(response.data.message || 'Error fetching offer details');
      }
    } catch (error) {
      toast.error(error.message || 'Error fetching offer details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const updatedFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedFormData);
    console.log(updatedFormData); // This will log form data every time it changes
  };

  const handleSaveOffer = async (e) => {
    e.preventDefault();
  
    // Prepare updated offer data
    const updatedOffer = { 
      ...formData, 
      restaurantId, 
      discountPercentage: parseFloat(formData.discountPercentage) // Ensure it's a float
    };
  
    try {
      const response = await axios.put(`${URL}/api/offer/${restaurantId}/${offerId}`, updatedOffer, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      if (response.data.success) {
        toast.success('Offer updated successfully');
        navigate('/admin/offers'); // Redirect to the offers list
      } else {
        toast.error(response.data.message || 'Error updating offer');
      }
    } catch (error) {
      toast.error(error.response?.data.message || error.message || 'Error updating offer');
    }
  };
  

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-4">Edit Offer</h1>
      <form onSubmit={handleSaveOffer}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Discount Percentage</label>
          <input
            type="number"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate} // Format for input
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate} // Format for input
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditOffer;

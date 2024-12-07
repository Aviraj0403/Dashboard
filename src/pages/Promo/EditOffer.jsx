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
  
  if (isLoading) return <div className="text-center text-gray-700">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-full sm:max-w-lg lg:max-w-2xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-gray-800">Edit Offer</h1>
      <form onSubmit={handleSaveOffer}>
        <div className="mb-6">
          <label className="block text-sm sm:text-base font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2 sm:p-3"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm sm:text-base font-medium text-gray-700">Discount Percentage</label>
          <input
            type="number"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2 sm:p-3"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm sm:text-base font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate} // Format for input
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2 sm:p-3"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm sm:text-base font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate} // Format for input
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2 sm:p-3"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm sm:text-base font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2 sm:p-3"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="w-full sm:w-auto bg-orange-500 text-white hover:bg-orange-600 px-4 py-3 sm:px-6 sm:py-3 rounded-md transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOffer;

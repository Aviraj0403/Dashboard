import React, { useEffect, useState } from 'react';
import { FaPlusCircle, FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRestaurantId } from '../../context/userContext.jsx'; // Import your context for restaurant ID

const OffersList = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const URL = 'http://localhost:4000';
  const restaurantId = useRestaurantId(); // Get the restaurant ID from context

  useEffect(() => {
    if (!restaurantId) {
      toast.error('Restaurant ID not found');
      return;
    }
    fetchOffers();
  }, [restaurantId]);

  const fetchOffers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${URL}/api/offer/${restaurantId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setOffers(response.data.data);
      } else {
        toast.error(response.data.message || 'Error fetching offers');
      }
    } catch (error) {
      toast.error(error.message || 'Error fetching offers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddOffer = () => {
    navigate('/admin/add-offer');
  };

  const handleEditOffer = (offerId) => {
    navigate(`/admin/edit-offer/${restaurantId}/${offerId}`);
  };

  const handleRemoveOffer = async (offerId) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      try {
        const response = await axios.delete(`${URL}/api/offer/${restaurantId}/${offerId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (response.data.success) {
          toast.success(response.data.message);
          fetchOffers(); // Refresh the offers list
        } else {
          toast.error(response.data.message || 'Error removing offer');
        }
      } catch (error) {
        toast.error(error.message || 'Error removing offer');
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (!offers.length) return <div>No offers available</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Offers</h1>
        <button
          onClick={handleAddOffer}
          className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlusCircle /> Add Offer
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">Discount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">Start Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">End Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {offers.map((offer) => (
              <tr key={offer._id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{offer.name}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">{offer.discountPercentage}%</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">{new Date(offer.startDate).toLocaleString()}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">{new Date(offer.endDate).toLocaleString()}</td>
                <td className="px-6 py-4 text-sm font-medium">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${offer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {offer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-500">
                  <div className="flex gap-2">
                    <button onClick={() => handleEditOffer(offer._id)} className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleRemoveOffer(offer._id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OffersList;

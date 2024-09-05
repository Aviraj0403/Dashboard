import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useOffers } from '../../context/OffersContext';

const AddOffer = () => {
  const navigate = useNavigate();
  const { addOffer } = useOffers();
  const [offer, setOffer] = useState({
    name: '',
    discountPercentage: '',
    startDate: '',
    endDate: '',
    image: null,
    status: 'Active'
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setOffer(prevState => ({ ...prevState, [name]: files[0] }));
    } else {
      setOffer(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    for (const key in offer) {
      formData.append(key, offer[key]);
    }

    const message = await addOffer(formData);
    if (message === 'Offer added successfully') {
      toast.success(message);
      navigate('/offersList'); // Redirect after successful addition
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 relative">
      <button
        onClick={() => navigate('/offersList')}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        X
      </button>
      <h1 className="text-2xl font-bold mb-6">Add Offer</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={offer.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Discount Percentage</label>
          <input
            type="number"
            name="discountPercentage"
            value={offer.discountPercentage}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="datetime-local"
            name="startDate"
            value={offer.startDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="datetime-local"
            name="endDate"
            value={offer.endDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image (548px x 140px)</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />
          <p className="mt-1 text-sm text-gray-500">No file chosen</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={offer.status}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate('/offersList')}
            className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOffer;

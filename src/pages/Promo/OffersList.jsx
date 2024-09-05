// src/pages/Promo/OffersList.jsx
import React from 'react';
import { useOffers } from '../../context/OffersContext';
import { FaFilter, FaFileExport, FaPlusCircle, FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OffersList = () => {
  const { offers, isLoading } = useOffers();
  const navigate = useNavigate();

  const handleAddOffer = () => {
    navigate('/add-offer');
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Offers</h1>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-300">
            <FaFilter />
            Filter
          </button>
          <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-300">
            <FaFileExport />
            Export
          </button>
          <button
            onClick={handleAddOffer}
            className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-md flex items-center gap-2"
          >
            <FaPlusCircle />
            Add Offer
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">Amount</th>
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
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
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

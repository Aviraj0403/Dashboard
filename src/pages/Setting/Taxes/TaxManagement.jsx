import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import axios from 'axios';

const TaxManagement = () => {
  const [isAddTaxOpen, setIsAddTaxOpen] = useState(false);
  const [taxes, setTaxes] = useState([]);
  const [newTax, setNewTax] = useState({ name: '', code: '', rate: '', status: 'Active' });
  const [editTaxIndex, setEditTaxIndex] = useState(null);

  // Fetch taxes from the backend (Placeholder for future integration)
  useEffect(() => {
    // Replace the URL with your backend endpoint
    // axios.get('/api/taxes')
    //   .then(response => setTaxes(response.data))
    //   .catch(error => console.error('Error fetching taxes:', error));
    
    // Sample data for visualization
    setTaxes([
      { id: 1, name: 'GST', code: 'GST-10%', rate: 10.00, status: 'Active' },
      { id: 2, name: 'GST', code: 'GST-5%', rate: 5.00, status: 'Active' },
      { id: 3, name: 'VAT', code: 'VAT-10%', rate: 10.00, status: 'Active' },
      { id: 4, name: 'VAT', code: 'VAT-5%', rate: 5.00, status: 'Active' },
      { id: 5, name: 'No-VAT', code: 'VAT-0', rate: 0.00, status: 'Active' },
    ]);
  }, []);

  const handleAddOrEditTax = () => {
    if (editTaxIndex !== null) {
      // Update existing tax (Placeholder for future integration)
      // axios.put(`/api/taxes/${taxes[editTaxIndex].id}`, newTax)
      //   .then(response => {
      //     const updatedTaxes = [...taxes];
      //     updatedTaxes[editTaxIndex] = response.data;
      //     setTaxes(updatedTaxes);
      //     setEditTaxIndex(null);
      //     setIsAddTaxOpen(false);
      //   })
      //   .catch(error => console.error('Error updating tax:', error));
    } else {
      // Add new tax (Placeholder for future integration)
      // axios.post('/api/taxes', newTax)
      //   .then(response => {
      //     setTaxes([...taxes, response.data]);
      //     setNewTax({ name: '', code: '', rate: '', status: 'Active' });
      //     setIsAddTaxOpen(false);
      //   })
      //   .catch(error => console.error('Error adding tax:', error));
    }
  };

  const openEditModal = (index) => {
    setNewTax(taxes[index]);
    setEditTaxIndex(index);
    setIsAddTaxOpen(true);
  };

  const handleDeleteTax = (index) => {
    // Delete tax (Placeholder for future integration)
    // axios.delete(`/api/taxes/${taxes[index].id}`)
    //   .then(() => {
    //     setTaxes(taxes.filter((_, i) => i !== index));
    //   })
    //   .catch(error => console.error('Error deleting tax:', error));
  };

  return (
    <div className="relative">
      {/* Background overlay */}
      {(isAddTaxOpen) && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-30 z-40" />
      )}
      
      {/* Content with blur effect */}
      <div className={`content relative transition-all ${isAddTaxOpen ? 'blur-md' : ''} z-10`}>
        <div className="w-full max-w-4xl mx-auto px-4 py-8 bg-white shadow-md rounded-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Taxes</h2>
            <button
              onClick={() => setIsAddTaxOpen(true)}
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
            >
              <MdAdd className="inline mr-2" size={20} />
              Add Tax
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Code</th>
                <th className="border border-gray-300 px-4 py-2">Tax Rate</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {taxes.map((tax, index) => (
                <tr key={tax.id}>
                  <td className="border border-gray-300 px-4 py-2">{tax.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{tax.code}</td>
                  <td className="border border-gray-300 px-4 py-2">{tax.rate.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">{tax.status}</td>
                  <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => openEditModal(index)}
                      className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition"
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteTax(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Tax Modal */}
      <Dialog open={isAddTaxOpen} onClose={() => setIsAddTaxOpen(false)} className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
        <div className="flex items-center justify-center h-full">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md relative z-50">
            <Dialog.Title className="text-lg font-semibold mb-4">
              {editTaxIndex !== null ? 'Edit Tax' : 'Add Tax'}
            </Dialog.Title>
            <form>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={newTax.name}
                    onChange={(e) => setNewTax({ ...newTax, name: e.target.value })}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter tax name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700">Code</label>
                  <input
                    type="text"
                    value={newTax.code}
                    onChange={(e) => setNewTax({ ...newTax, code: e.target.value })}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter tax code"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700">Tax Rate</label>
                  <input
                    type="number"
                    value={newTax.rate}
                    onChange={(e) => setNewTax({ ...newTax, rate: parseFloat(e.target.value) })}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter tax rate"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={newTax.status}
                    onChange={(e) => setNewTax({ ...newTax, status: e.target.value })}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-4 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsAddTaxOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddOrEditTax}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  {editTaxIndex !== null ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default TaxManagement;

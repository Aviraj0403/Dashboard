import React, { useState, useEffect } from 'react';
import './Currency.css'; // Ensure CSS file is correctly imported

const currenciesData = [
  { name: 'Peso', symbol: '₱', code: 'ARS', isCrypto: 'No', exchangeRate: 1 },
  { name: 'Naira', symbol: '₦', code: 'NGN', isCrypto: 'No', exchangeRate: 1 },
  { name: 'Taka', symbol: '৳', code: 'BDT', isCrypto: 'No', exchangeRate: 1 },
  { name: 'Rupee', symbol: '₹', code: 'INR', isCrypto: 'No', exchangeRate: 1 },
  { name: 'Dollars(Default)', symbol: '$', code: 'USD', isCrypto: 'No', exchangeRate: 1 },
];

const Currency = () => {
  const [currencies, setCurrencies] = useState(currenciesData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCurrency, setNewCurrency] = useState({
    name: '',
    symbol: '',
    code: '',
    isCrypto: 'No',
    exchangeRate: 1
  });

  useEffect(() => {
    // TODO: Fetch data from the backend API
  }, []);

  const handleAddCurrency = () => {
    if (!newCurrency.name || !newCurrency.symbol || !newCurrency.code || !newCurrency.exchangeRate) {
      alert('Please fill in all fields.');
      return;
    }

    // TODO: Post new currency to the backend

    // Temporarily adding to state
    setCurrencies([...currencies, newCurrency]);
    setNewCurrency({
      name: '',
      symbol: '',
      code: '',
      isCrypto: 'No',
      exchangeRate: 1
    });
    setIsAddModalOpen(false);
  };

  const handleDeleteCurrency = (index) => {
    const currency = currencies[index];
    // TODO: Delete currency from the backend

    // Temporarily removing from state
    setCurrencies(currencies.filter((_, i) => i !== index));
  };

  return (
    <div className="relative">
      <div className={`content ${isAddModalOpen ? 'blurred' : ''}`}>
        <div className="w-full max-w-4xl mx-auto px-4 py-8 bg-white shadow-md rounded-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Currencies</h2>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Currency
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Symbol</th>
                <th className="border border-gray-300 px-4 py-2">Code</th>
                <th className="border border-gray-300 px-4 py-2">Is Cryptocurrency</th>
                <th className="border border-gray-300 px-4 py-2">Exchange Rate</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{currency.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{currency.symbol}</td>
                  <td className="border border-gray-300 px-4 py-2">{currency.code}</td>
                  <td className="border border-gray-300 px-4 py-2">{currency.isCrypto}</td>
                  <td className="border border-gray-300 px-4 py-2">{currency.exchangeRate}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDeleteCurrency(index)}
                      className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Currency Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay"></div> {/* Background blur */}
          <div className="modal-content bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Currency</h3>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Name</label>
                <input
                  type="text"
                  value={newCurrency.name}
                  onChange={(e) => setNewCurrency({ ...newCurrency, name: e.target.value })}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Symbol</label>
                <input
                  type="text"
                  value={newCurrency.symbol}
                  onChange={(e) => setNewCurrency({ ...newCurrency, symbol: e.target.value })}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Code</label>
                <input
                  type="text"
                  value={newCurrency.code}
                  onChange={(e) => setNewCurrency({ ...newCurrency, code: e.target.value })}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Is Cryptocurrency</label>
                <select
                  value={newCurrency.isCrypto}
                  onChange={(e) => setNewCurrency({ ...newCurrency, isCrypto: e.target.value })}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Exchange Rate</label>
                <input
                  type="number"
                  step="0.01"
                  value={newCurrency.exchangeRate}
                  onChange={(e) => setNewCurrency({ ...newCurrency, exchangeRate: parseFloat(e.target.value) })}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
              >
                Close
              </button>
              <button
                onClick={handleAddCurrency}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Currency;

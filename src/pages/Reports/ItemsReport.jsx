import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

// Sample data for demonstration
const sampleData = [
  { name: 'Mojito', category: 'Beverages', type: 'Veg', quantity: 5 },
  { name: 'Szechuan Shrimp', category: 'Seafood Entrees', type: 'Non Veg', quantity: 2 },
  { name: 'Homemade Mashed Potato', category: 'Side Orders', type: 'Veg', quantity: 2 },
  { name: 'Vegan Hum-burger with Cheese', category: 'Veggie & Plant Based Burgers', type: 'Veg', quantity: 2 },
  { name: 'French Fries', category: 'Side Orders', type: 'Veg', quantity: 2 },
  { name: 'Cappuccino', category: 'Beverages', type: 'Veg', quantity: 2 },
  { name: 'Baked Potato', category: 'Side Orders', type: 'Veg', quantity: 2 },
  { name: 'American BBQ Double', category: 'Flame Grill Burgers', type: 'Non Veg', quantity: 2 },
  { name: 'Chicken Mushroom', category: 'Sandwich from the Grill', type: 'Non Veg', quantity: 2 },
  { name: 'Sesame Chicken', category: 'Hot Chicken Entrees', type: 'Non Veg', quantity: 1 },
];

const ItemsReport = () => {
  const [filterCategory, setFilterCategory] = useState('');
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

//     LOGIC FOR BACKEND

// useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/items-report'); // Replace with your API endpoint
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

   


  // Filter data based on both category and type
  const filteredData = sampleData.filter(item => {
    return (
      (filterCategory === '' || item.category === filterCategory) &&
      (filterType === '' || item.type === filterType)
    );
  });

  // Pagination logic for filtered data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4 max-w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4 sm:mb-0">
          <button
            onClick={() => window.print()}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm sm:text-base"
          >
            Print
          </button>
          <CSVLink
            data={filteredData}
            filename={"items-report.csv"}
            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm sm:text-base"
          >
            Export CSV
          </CSVLink>
        </div>
        <div className="flex space-x-4">
          <select
            className="px-3 py-1 border rounded-md text-sm sm:text-base"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Beverages">Beverages</option>
            <option value="Seafood Entrees">Seafood Entrees</option>
            <option value="Side Orders">Side Orders</option>
            <option value="Veggie & Plant Based Burgers">Veggie & Plant Based Burgers</option>
            <option value="Flame Grill Burgers">Flame Grill Burgers</option>
            <option value="Sandwich from the Grill">Sandwich from the Grill</option>
            <option value="Hot Chicken Entrees">Hot Chicken Entrees</option>
          </select>
          <select
            className="px-3 py-1 border rounded-md text-sm sm:text-base"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Veg">Veg</option>
            <option value="Non Veg">Non Veg</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="p-2 border-b text-xs sm:text-sm">Name</th>
              <th className="p-2 border-b text-xs sm:text-sm">Category</th>
              <th className="p-2 border-b text-xs sm:text-sm">Type</th>
              <th className="p-2 border-b text-xs sm:text-sm">Quantity</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-xs sm:text-sm">
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 border-b">{item.name}</td>
                  <td className="p-2 border-b">{item.category}</td>
                  <td className={`p-2 border-b ${item.type === 'Veg' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.type}
                  </td>
                  <td className="p-2 border-b">{item.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-2 text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-gray-600 text-xs sm:text-sm">
        <div>
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-2 py-1 border rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemsReport;

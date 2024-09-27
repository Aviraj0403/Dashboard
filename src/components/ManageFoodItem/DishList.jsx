import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const DishList = () => {
  const URL = 'http://localhost:4000';

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${URL}/api/food/list-food`,{
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message || 'Error fetching data');
      }
    } catch (error) {
      toast.error(error.message || 'Error fetching data');
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${URL}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message || 'Error removing item');
      }
    } catch (error) {
      toast.error(error.message || 'Error removing item');
    }
  };

  const toggleFeatured = async (foodId, currentStatus) => {
    try {
      const newStatus = !currentStatus; // Toggle the current featured status
      const response = await axios.put(`${URL}/api/food/${foodId}`, { isFeatured: newStatus });
      if (response.data.success) {
        toast.success(`Dish marked as ${newStatus ? 'featured' : 'not featured'}`);
        fetchList(); // Refresh the list after toggling
      } else {
        toast.error(response.data.message || 'Error updating featured status');
      }
    } catch (error) {
      toast.error(error.message || 'Error updating featured status');
    }
  };

  const toggleRecommended = async (foodId, currentStatus) => {
    try {
      const newStatus = !currentStatus; // Toggle the current recommended status
      const response = await axios.put(`${URL}/api/food/${foodId}`, { recommended: newStatus });
      if (response.data.success) {
        toast.success(`Dish marked as ${newStatus ? 'recommended' : 'not recommended'}`);
        fetchList(); // Refresh the list after toggling
      } else {
        toast.error(response.data.message || 'Error updating recommended status');
      }
    } catch (error) {
      toast.error(error.message || 'Error updating recommended status');
    }
  };
  

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-2xl font-semibold text-gray-800">Dishes List</h4>
        <NavLink
          to="/admin/add-item"
          className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          <svg
            className="mr-2"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
          Add Dish
        </NavLink>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dish Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dish Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Type</th> {/* New Column */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th> {/* New Column */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended</th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {list.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  <img
                    src={item.imageUrl} // Assuming imageUrl is the field for Cloudinary URL
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-full" // Rounded icon styling
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.category}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.itemType}</td> {/* Display item type */}
                <td className="px-6 py-4 text-sm text-gray-900">₹{item.price}</td> {/* Updated to INR */}
                <td className="px-6 py-4 text-sm text-gray-900">{item.description}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => toggleFeatured(item._id, item.isFeatured)}
                    className={`px-2 py-1 text-xs font-medium rounded-full ${item.isFeatured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}
                  >
                    {item.isFeatured ? 'Featured' : 'Not Featured'}
                  </button>
                </td>
                <td className="px-6 py-4 text-sm">
                     <button
                           onClick={() => toggleRecommended(item._id, item.recommended)}
                           className={`px-2 py-1 text-xs font-medium rounded-full ${item.recommended ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                              >
                           {item.recommended ? 'Recommended' : 'Not Recommended'}
                    </button>
                </td>
                <td className="px-6 py-4 text-sm font-medium flex space-x-3">
                  <NavLink to={`edit-dish/${item._id}`} className="text-blue-600 hover:text-blue-800">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                      <path d="m15 5 4 4"></path>
                    </svg>
                  </NavLink>
                  <NavLink to={`dish-details/${item._id}`} className="text-gray-600 hover:text-gray-800">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </NavLink>
                  <button
                    onClick={() => removeFood(item._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" x2="10" y1="11" y2="17"></line>
                      <line x1="14" x2="14" y1="11" y2="17"></line>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DishList;

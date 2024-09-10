import React, { useState, useEffect } from 'react';
// import './ItemCategory.css'; // Ensure CSS file is correctly imported

// Sample data for categories
const sampleCategories = [
  { name: 'Appetizers', status: 'Active' },
  { name: 'Flame Grill Burgers', status: 'Active' },
  { name: 'Veggie & Plant Based Burgers', status: 'Active' },
  { name: 'Sandwich from the Grill', status: 'Active' },
  { name: 'Hot Chicken Entrees', status: 'Active' },
  { name: 'Beef Entrees', status: 'Active' },
  { name: 'Seafood Entrees', status: 'Active' },
  { name: 'House Special Salads', status: 'Active' },
  { name: 'Zoop Soups', status: 'Active' },
  { name: 'Side Orders', status: 'Active' },
];

const ItemCategory = () => {
  const [categories, setCategories] = useState(sampleCategories);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    status: 'Active',
    image: null,
    description: ''
  });

  useEffect(() => {
    // TODO: Fetch data from the backend API
  }, []);

  const handleAddCategory = () => {
    if (!newCategory.name) {
      alert('Please fill in the name.');
      return;
    }

    // TODO: Post new category to the backend
    setCategories([...categories, newCategory]);
    resetModal();
  };

  const handleEditCategory = () => {
    if (selectedCategoryIndex === null) return;

    if (!newCategory.name) {
      alert('Please fill in the name.');
      return;
    }

    // TODO: Update category in the backend
    const updatedCategories = categories.map((category, index) =>
      index === selectedCategoryIndex ? newCategory : category
    );
    setCategories(updatedCategories);
    resetModal();
  };

  const handleDeleteCategory = (index) => {
    // TODO: Delete category from the backend
    setCategories(categories.filter((_, i) => i !== index));
  };

  const openEditModal = (index) => {
    setSelectedCategoryIndex(index);
    setNewCategory(categories[index]);
    setIsEditModalOpen(true);
  };

  const resetModal = () => {
    setNewCategory({
      name: '',
      status: 'Active',
      image: null,
      description: ''
    });
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedCategoryIndex(null);
  };

  return (
    <div className="relative">
      <div className={`content ${isAddModalOpen || isEditModalOpen ? 'blurred' : ''}`}>
        <div className="w-full max-w-4xl mx-auto px-4 py-8 bg-white shadow-md rounded-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Item Categories</h2>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
            >
              Add Item Category
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {category.image ? (
                      <img
                        src={URL.createObjectURL(category.image)}
                        alt="Category"
                        className="w-20 h-12 object-cover"
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{category.status}</td>
                  <td className="border border-gray-300 px-4 py-2">{category.description}</td>
                  <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => openEditModal(index)}
                      className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
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

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay"></div> {/* Background blur */}
          <div className="modal-content bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddCategory(); }}>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewCategory({ ...newCategory, image: e.target.files[0] })}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={newCategory.status}
                    onChange={(e) => setNewCategory({ ...newCategory, status: e.target.value })}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex space-x-4 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => resetModal()}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay"></div> {/* Background blur */}
          <div className="modal-content bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleEditCategory(); }}>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewCategory({ ...newCategory, image: e.target.files[0] })}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {newCategory.image && <img src={URL.createObjectURL(newCategory.image)} alt="Category" className="mt-2 w-20 h-12 object-cover" />}
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={newCategory.status}
                    onChange={(e) => setNewCategory({ ...newCategory, status: e.target.value })}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex space-x-4 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => resetModal()}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCategory;

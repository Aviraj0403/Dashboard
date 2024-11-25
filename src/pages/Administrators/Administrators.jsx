import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

// Dummy data; replace with data from backend in the future
const initialAdmins = [
  { name: 'John Doe', email: 'admin@example.com', phone: '+8801254875855', status: 'Active' },
];

const Administrators = () => {
  const [adminsList, setAdminsList] = useState(initialAdmins);
  const [filter, setFilter] = useState('');
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      status: 'Active',
      password: '',
      passwordConfirmation: '',
      branch: '',
    },
  });

  const filteredAdmins = adminsList.filter(admin =>
    admin.name.toLowerCase().includes(filter.toLowerCase()) ||
    admin.email.toLowerCase().includes(filter.toLowerCase()) ||
    admin.phone.includes(filter) ||
    admin.status.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    // TODO: Fetch data from backend and update adminsList
  }, []);

  const handleAddAdmin = () => {
    setIsAdding(true);
    setEditingAdmin(null);
    reset();
  };

  const handleEditAdmin = (admin) => {
    setIsEditing(true);
    setIsAdding(false);
    setEditingAdmin(admin);
    reset(admin);
  };

  const handleDeleteAdmin = (admin) => {
    // TODO: Implement API call to delete admin from backend
    setAdminsList(adminsList.filter(a => a !== admin));
  };

  const onSubmit = async (data) => {
    if (isAdding) {
      // TODO: Implement API call to add admin to backend
      setAdminsList([...adminsList, data]);
    } else if (isEditing) {
      // TODO: Implement API call to update admin in backend
      setAdminsList(adminsList.map(a => a.email === editingAdmin.email ? data : a));
    }
    setIsAdding(false);
    setIsEditing(false);
    reset();
  };

  const handleClose = () => {
    setIsAdding(false);
    setIsEditing(false);
    reset();
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid black; padding: 8px; text-align: left; } thead { background-color: #f4f4f4; }</style>');
    printWindow.document.write('</head><body >');
    printWindow.document.write('<h1>Administrators List</h1>');
    printWindow.document.write(document.getElementById('admin-table').outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Print
          </button>
          <CSVLink
            data={filteredAdmins}
            filename={"administrators.csv"}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Export CSV
          </CSVLink>
        </div>
        <button
          onClick={handleAddAdmin}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Add Administrator
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter administrators..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      {!isAdding && !isEditing && (
        <div className="overflow-x-auto">
          <table id="admin-table" className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAdmins.map((admin, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`${admin.status.toLowerCase() === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} text-sm px-2 py-1 rounded-full`}>
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-3">
                    <button
                      onClick={() => handleEditAdmin(admin)}
                      className="text-green-500 hover:text-green-700"
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteAdmin(admin)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Delete"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(isAdding || isEditing) && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">{isAdding ? 'Add New Administrator' : 'Edit Administrator'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    {...register('phone', { required: 'Phone number is required' })}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    {...register('status')}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    {...register('password', { required: isAdding ? 'Password is required' : false })}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    {...register('passwordConfirmation', {
                      validate: (value) =>
                        value === watch('password') || "Passwords don't match"
                    })}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.passwordConfirmation && <p className="text-red-500 text-sm">{errors.passwordConfirmation.message}</p>}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {isAdding ? 'Add Admin' : 'Update Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Administrators;
``
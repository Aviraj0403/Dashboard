// src/components/AddEmployee.js

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      status: 'Active',
      password: '',
      passwordConfirmation: '',
      role: '',
      branch: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Handle form submission
    console.log('Form data:', data);
    // Reset the form after submission
    reset();
    // Navigate to another route
    navigate('/admin/add-offer');
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 border border-gray-200 rounded-lg shadow-md">
        {/* Grid for Name and Email */}
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
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: 'Invalid email address',
                },
              })}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
        </div>

        {/* Phone and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        {/* Password and Confirmation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700">Password Confirmation</label>
            <input
              type="password"
              {...register('passwordConfirmation', {
                validate: (value) => value === watch('password') || 'Passwords must match',
              })}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.passwordConfirmation && <p className="text-red-500 text-sm">{errors.passwordConfirmation.message}</p>}
          </div>
        </div>

        {/* Role and Branch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              {...register('role', { required: 'Role is required' })}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              <option value="Branch Manager">Branch Manager</option>
              <option value="Staff">Staff</option>
              <option value="POS Operator">POS Operator</option>
              <option value="Cook">Cook</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700">Branch</label>
            <input
              type="text"
              {...register('branch', { required: 'Branch is required' })}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.branch && <p className="text-red-500 text-sm">{errors.branch.message}</p>}
          </div>
        </div>

        <div className="flex space-x-2 justify-end mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;

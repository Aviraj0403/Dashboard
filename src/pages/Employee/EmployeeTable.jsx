// src/components/EmployeeTable.js

import React, { useState, useEffect } from 'react';
import ReactToPrint from 'react-to-print';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

// Dummy data; this will be fetched from the backend in the future
const employees = [
  { name: 'Avi Raj', email: 'stuff@example.com', phone: '+8801222224443', role: 'Stuff', status: 'Active' },
  { name: 'Farha Israt', email: 'posoperator@example.com', phone: '+880156873641', role: 'POS Operator', status: 'Active' },
  { name: 'Sunny Bhaiya', email: 'branchmanager@example.com', phone: '+8801275333453', role: 'Branch Manager', status: 'Active' },
];

const EmployeeTable = () => {
  const [filter, setFilter] = useState('');
  const [employeesList, setEmployeesList] = useState(employees);
  const navigate = useNavigate();

  // Filter employees based on the filter state
  const filteredEmployees = employeesList.filter(employee =>
    employee.name.toLowerCase().includes(filter.toLowerCase()) ||
    employee.email.toLowerCase().includes(filter.toLowerCase()) ||
    employee.phone.includes(filter) ||
    employee.role.toLowerCase().includes(filter.toLowerCase()) ||
    employee.status.toLowerCase().includes(filter.toLowerCase())
  );

  // Function for future backend integration
  const fetchEmployees = async () => {
    // TODO: Fetch data from backend
    // Example:
    // const response = await fetch('/api/employees');
    // const data = await response.json();
    // setEmployeesList(data);
  };

  // Call fetchEmployees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle navigation to AddEmployee page
  const handleAddEmployeeClick = () => {
    navigate('/admin/add-employee');
  };

  // Handle view, edit, and delete actions
  const handleView = (employee) => {
    // Navigate to the employee detail page or show a modal with employee details
    console.log('View details for', employee);
  };

  const handleEdit = (employee) => {
    // Navigate to the edit page or show an edit form
    console.log('Edit', employee);
  };

  const handleDelete = (employee) => {
    // Remove the employee from the list
    setEmployeesList(employeesList.filter(e => e !== employee));
    console.log('Deleted', employee);
  };

  return (
    <div className="p-4">
      {/* Print and Export Buttons */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <ReactToPrint
            trigger={() => <button className="bg-blue-500 text-white px-4 py-2 rounded">Print</button>}
            content={() => document.getElementById('employee-table')}
          />
          <CSVLink
            data={filteredEmployees}
            filename={"employees.csv"}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Export CSV
          </CSVLink>
        </div>
        <button
          onClick={handleAddEmployeeClick}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Add Employee
        </button>
      </div>

      {/* Filter Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter employees..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table id="employee-table" className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`${
                      employee.status.toLowerCase() === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    } text-sm px-2 py-1 rounded-full`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-3">
                  <button
                    onClick={() => handleView(employee)}
                    className="text-blue-500 hover:text-blue-700"
                    aria-label="View"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleEdit(employee)}
                    className="text-green-500 hover:text-green-700"
                    aria-label="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(employee)}
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
    </div>
  );
};

export default EmployeeTable;

import React, { useState, useEffect } from 'react';
import ReactToPrint from 'react-to-print';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

// Dummy data; replace with data from backend in the future
const initialEmployees = [
  { name: 'Avi Raj', email: 'stuff@example.com', phone: '+8801222224443', role: 'Stuff', status: 'Active' },
  { name: 'Farha Israt', email: 'posoperator@example.com', phone: '+880156873641', role: 'POS Operator', status: 'Active' },
  { name: 'Sunny Bhaiya', email: 'branchmanager@example.com', phone: '+8801275333453', role: 'Branch Manager', status: 'Active' },
];

const EmployeeTable = () => {
  const [employeesList, setEmployeesList] = useState(initialEmployees);
  const [filter, setFilter] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
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

  // Filter employees based on the filter state
  const filteredEmployees = employeesList.filter(employee =>
    employee.name.toLowerCase().includes(filter.toLowerCase()) ||
    employee.email.toLowerCase().includes(filter.toLowerCase()) ||
    employee.phone.includes(filter) ||
    employee.role.toLowerCase().includes(filter.toLowerCase()) ||
    employee.status.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    // TODO: Fetch data from backend and update employeesList
    // Example function to fetch employees:
    // const fetchEmployees = async () => {
    //   try {
    //     const response = await fetch('/api/employees');
    //     const data = await response.json();
    //     setEmployeesList(data);
    //   } catch (error) {
    //     console.error('Error fetching employees:', error);
    //   }
    // };
    // fetchEmployees();
  }, []);

  const handleAddEmployee = () => {
    setIsAdding(true);
    setEditingEmployee(null);
    reset();
  };

  const handleEditEmployee = (employee) => {
    setIsEditing(true);
    setIsAdding(false);
    setEditingEmployee(employee);
    reset(employee);
  };

  const handleDeleteEmployee = (employee) => {
    // TODO: Implement API call to delete employee from backend
    // Example function to delete an employee:
    // const deleteEmployee = async (email) => {
    //   try {
    //     await fetch(`/api/employees/${email}`, {
    //       method: 'DELETE',
    //     });
    //     setEmployeesList(employeesList.filter(e => e.email !== email));
    //   } catch (error) {
    //     console.error('Error deleting employee:', error);
    //   }
    // };
    // deleteEmployee(employee.email);
    setEmployeesList(employeesList.filter(e => e !== employee));
  };

  const onSubmit = async (data) => {
    if (isAdding) {
      // TODO: Implement API call to add employee to backend
      // Example function to add an employee:
      // const addEmployee = async (employee) => {
      //   try {
      //     await fetch('/api/employees', {
      //       method: 'POST',
      //       headers: { 'Content-Type': 'application/json' },
      //       body: JSON.stringify(employee),
      //     });
      //     setEmployeesList([...employeesList, employee]);
      //   } catch (error) {
      //     console.error('Error adding employee:', error);
      //   }
      // };
      // addEmployee(data);
      setEmployeesList([...employeesList, data]);
    } else if (isEditing) {
      // TODO: Implement API call to update employee in backend
      // Example function to update an employee:
      // const updateEmployee = async (employee) => {
      //   try {
      //     await fetch(`/api/employees/${employee.email}`, {
      //       method: 'PUT',
      //       headers: { 'Content-Type': 'application/json' },
      //       body: JSON.stringify(employee),
      //     });
      //     setEmployeesList(employeesList.map(emp => emp.email === editingEmployee.email ? employee : emp));
      //   } catch (error) {
      //     console.error('Error updating employee:', error);
      //   }
      // };
      // updateEmployee(data);
      setEmployeesList(employeesList.map(emp => emp.email === editingEmployee.email ? data : emp));
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
          onClick={handleAddEmployee}
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
      {!isAdding && !isEditing && (
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
                      onClick={() => handleEditEmployee(employee)}
                      className="text-green-500 hover:text-green-700"
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(employee)}
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

      {/* Form for Adding/Editing Employee */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">{isAdding ? 'Add New Employee' : 'Edit Employee'}</h2>
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
              </div>
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  {isAdding ? 'Save' : 'Update'}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
// 
// Backend Guidlines :
// useEffect(() => {
//   // TODO: Fetch data from backend and update employeesList
//   // Example function to fetch employees:
//   const fetchEmployees = async () => {
//     try {
//       const response = await fetch('/api/employees');
//       const data = await response.json();
//       setEmployeesList(data);
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };
//   fetchEmployees();
// }, []);
// Add emp
// const onSubmit = async (data) => {
//   if (isAdding) {
//     // TODO: Implement API call to add employee to backend
//     // Example function to add an employee:
//     const addEmployee = async (employee) => {
//       try {
//         await fetch('/api/employees', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(employee),
//         });
//         setEmployeesList([...employeesList, employee]);
//       } catch (error) {
//         console.error('Error adding employee:', error);
//       }
//     };
//     addEmployee(data);
//   }
//   // Rest of the onSubmit function
// };
// edit 
// const onSubmit = async (data) => {
//   if (isEditing) {
//     // TODO: Implement API call to update employee in backend
//     // Example function to update an employee:
//     const updateEmployee = async (employee) => {
//       try {
//         await fetch(`/api/employees/${employee.email}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(employee),
//         });
//         setEmployeesList(employeesList.map(emp => emp.email === editingEmployee.email ? employee : emp));
//       } catch (error) {
//         console.error('Error updating employee:', error);
//       }
//     };
//     updateEmployee(data);
//   }
//   // Rest of the onSubmit function
// };
// delete
// const handleDeleteEmployee = (employee) => {
//   // TODO: Implement API call to delete employee from backend
//   // Example function to delete an employee:
//   const deleteEmployee = async (email) => {
//     try {
//       await fetch(`/api/employees/${email}`, {
//         method: 'DELETE',
//       });
//       setEmployeesList(employeesList.filter(e => e.email !== email));
//     } catch (error) {
//       console.error('Error deleting employee:', error);
//     }
//   };
//   deleteEmployee(employee.email);
// };

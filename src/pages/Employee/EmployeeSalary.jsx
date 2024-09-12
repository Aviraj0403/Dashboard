import React, { useState } from 'react';

// Sample data for salaries; replace with actual data from your backend
const salaryData = [
  { name: 'Avi Raj', month: 'September', salary: 3000 },
  { name: 'Farha Israt', month: 'September', salary: 2800 },
  { name: 'Sunny Bhaiya', month: 'September', salary: 3500 },
];

const EmployeeSalary = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Show salary details of the selected employee
  const handleShowSalary = (name) => {
    setSelectedEmployee(name);
  };

  // Get salary data for the selected employee
  const getSalaryDetails = (name) => {
    return salaryData.filter(salary => salary.name === name);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Employee Salaries</h2>
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {salaryData.map((salary, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{salary.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{salary.month}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${salary.salary}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => handleShowSalary(salary.name)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display selected employee salary details */}
      {selectedEmployee && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <h3 className="text-lg font-semibold">Salary Details for {selectedEmployee}</h3>
          <ul>
            {getSalaryDetails(selectedEmployee).map((salary, index) => (
              <li key={index} className="py-2">
                <span className="font-medium">{salary.month}:</span> ${salary.salary}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmployeeSalary;

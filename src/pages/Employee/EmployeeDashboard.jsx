import React, { useState } from 'react';

// Sample data for salaries and attendance
const salaryData = [
  { name: 'Avi Raj', baseSalary: 3000 },
  { name: 'Farha Israt', baseSalary: 2800 },
  { name: 'Sunny Bhaiya', baseSalary: 3500 },
];

const attendanceData = [
  { name: 'Avi Raj', date: '2024-09-01', inTime: '09:00 AM', outTime: '05:00 PM', present: true },
  { name: 'Farha Israt', date: '2024-09-01', inTime: '09:10 AM', outTime: '05:10 PM', present: true },
  { name: 'Sunny Bhaiya', date: '2024-09-01', inTime: '09:05 AM', outTime: '05:00 PM', present: false },
  { name: 'Avi Raj', date: '2024-09-02', inTime: '09:00 AM', outTime: '05:00 PM', present: true },
  { name: 'Farha Israt', date: '2024-09-02', inTime: '09:10 AM', outTime: '05:10 PM', present: false },
  { name: 'Sunny Bhaiya', date: '2024-09-02', inTime: '09:05 AM', outTime: '05:00 PM', present: true },
  // Add more data as needed
];

const EmployeeDashboard = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('09'); // Set default to September

  // Calculate the salary for the selected employee based on attendance
  const calculateSalary = (name) => {
    const monthPrefix = `2024-${selectedMonth}`;
    const totalDays = attendanceData.filter(attendance => attendance.name === name && attendance.date.startsWith(monthPrefix)).length;
    const presentDays = attendanceData.filter(attendance => attendance.name === name && attendance.present && attendance.date.startsWith(monthPrefix)).length;

    const employeeSalary = salaryData.find(salary => salary.name === name);
    const monthlySalary = employeeSalary ? employeeSalary.baseSalary : 0;

    // Assuming salary is prorated based on attendance
    const dailySalary = totalDays > 0 ? monthlySalary / totalDays : 0;
    return dailySalary * presentDays;
  };

  // Get attendance data for the selected employee and month
  const getAttendanceDetails = (name, month) => {
    const monthPrefix = `2024-${month}`;
    return attendanceData.filter(attendance => attendance.name === name && attendance.date.startsWith(monthPrefix));
  };

  // Handle the change of month selection
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Employee Dashboard</h2>

      {/* Month Selector */}
      <div className="mb-4">
        <label htmlFor="month" className="mr-2">Select Month:</label>
        <select
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border border-gray-300 rounded p-2"
        >
          <option value="09">September</option>
          <option value="10">October</option>
          {/* Add more months as needed */}
        </select>
      </div>

      {/* Employee List */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Employee List</h3>
        <ul>
          {salaryData.map((salary, index) => (
            <li key={index} className="py-2">
              <button
                onClick={() => setSelectedEmployee(salary.name)}
                className="text-blue-500 hover:text-blue-700"
              >
                {salary.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Display Salary and Attendance Details */}
      {selectedEmployee && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <h3 className="text-lg font-semibold">Details for {selectedEmployee}</h3>

          {/* Display Salary */}
          <div className="mb-4">
            <h4 className="font-medium">Calculated Salary for {selectedMonth}:</h4>
            <p>${calculateSalary(selectedEmployee).toFixed(2)}</p>
          </div>

          {/* Display Attendance */}
          <h4 className="font-medium">Attendance Details for {selectedMonth}:</h4>
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Out Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getAttendanceDetails(selectedEmployee, selectedMonth).map((attendance, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendance.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendance.inTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendance.outTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`${
                        attendance.present ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      } text-sm px-2 py-1 rounded-full`}
                    >
                      {attendance.present ? 'Yes' : 'No'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;

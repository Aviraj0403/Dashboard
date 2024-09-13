import React, { useState } from 'react'; 
import { Button, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';

// Sample data for salaries and attendance
const salaryData = [
  { name: 'Avi Raj', baseSalary: 3000, role: 'Manager' },
  { name: 'Rajnish', baseSalary: 2800, role: 'Cook' },
  { name: 'Sunny Bhaiya', baseSalary: 3500, role: 'Admin' },
  { name: 'Sunny Bhaiya', baseSalary: 3500, role: 'Admin' },
  // Add more data as needed
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

  // Get role-wise employee list
  const getRoleWiseEmployees = (role) => {
    return salaryData.filter(employee => employee.role === role);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Typography variant="h4" gutterBottom>
        Employee Dashboard
      </Typography>
      {/* Month Selector */}
      <div className="mb-4">
        <Typography variant="h6" gutterBottom>
          Select Month:
        </Typography>
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="09">September</MenuItem>
          <MenuItem value="10">October</MenuItem>
          {/* Add more months as needed */}
        </Select>
      </div>
      {/* Employee List by Role */}
      <div className="mb-6">
        <Typography variant="h6" gutterBottom>
          Employee List by Role
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Admin', 'Cook', 'Waiter', 'Manager', 'POS Operator', 'Others'].map((role) => (
            <Paper key={role} className="p-4">
              <Typography variant="h6" gutterBottom>
                {role}
              </Typography>
              <ul>
                {getRoleWiseEmployees(role).map((employee, index) => (
                  <li key={index} className="py-2">
                    <Button
                      onClick={() => setSelectedEmployee(employee.name)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {employee.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </Paper>
          ))}
        </div>
      </div>
      {/* Display Salary and Attendance Details */}
      {selectedEmployee && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <Typography variant="h6" gutterBottom>
            Details for {selectedEmployee}
          </Typography>
          {/* Display Salary */}
          <div className="mb-4">
            <Typography variant="body1" gutterBottom>
              Calculated Salary for {selectedMonth}:
            </Typography>
            <Typography variant="h6">
              ₹{calculateSalary(selectedEmployee).toFixed(2)}
            </Typography>
          </div>
          {/* Display Attendance */}
          <Typography variant="body1" gutterBottom>
            Attendance Details for {selectedMonth}:
          </Typography>
          <TableContainer component={Paper} className="mt-4">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>In Time</TableCell>
                  <TableCell>Out Time</TableCell>
                  <TableCell>Present</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getAttendanceDetails(selectedEmployee, selectedMonth).map((attendance, index) => (
                  <TableRow key={index}>
                    <TableCell>{attendance.date}</TableCell>
                    <TableCell>{attendance.inTime}</TableCell>
                    <TableCell>{attendance.outTime}</TableCell>
                    <TableCell>
                      <span
                        className={`${
                          attendance.present ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        } text-sm px-2 py-1 rounded-full`}
                      >
                        {attendance.present ? 'Yes' : 'No'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {/* TODO: Integrate Backend */}
      {/* 
      1. Set up backend to manage employees and attendance data.
      2. Implement API endpoints for fetching employee and attendance data.
      3. Handle data synchronization between frontend and backend.
      */}
    </div>
  );
};

export default EmployeeDashboard;

import React, { useState } from 'react';

// Sample data for attendance; replace with actual data from your backend
const attendanceData = [
  { name: 'Avi Raj', date: '2024-09-01', inTime: '09:00 AM', outTime: '05:00 PM', present: true },
  { name: 'Farha Israt', date: '2024-09-01', inTime: '09:10 AM', outTime: '05:10 PM', present: true },
  { name: 'Sunny Bhaiya', date: '2024-09-01', inTime: '09:05 AM', outTime: '05:00 PM', present: true },
];

const EmployeeAttendance = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null); // Simulate user's current location

  // Mock function to simulate getting user location
  const getLocation = () => {
    // In a real app, use navigator.geolocation.getCurrentPosition() to get actual location
    setCurrentLocation({ lat: 23.8103, lon: 90.4125 }); // Example coordinates (Dhaka)
  };

  // Show attendance details of the selected employee
  const handleShowAttendance = (name) => {
    setSelectedEmployee(name);
  };

  // Check if the employee was present based on location
  const checkProximity = (inTime, outTime) => {
    if (currentLocation) {
      // Simulate proximity check (within 100 meters of restaurant)
      const restaurantLocation = { lat: 23.8103, lon: 90.4125 }; // Example coordinates (Dhaka)
      const distance = getDistance(currentLocation, restaurantLocation);
      return distance <= 0.1; // Assuming 0.1 km = 100 meters
    }
    return false;
  };

  // Calculate distance between two locations (Haversine formula)
  const getDistance = (loc1, loc2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
    const dLon = (loc2.lon - loc1.lon) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(loc1.lat * (Math.PI / 180)) * Math.cos(loc2.lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get attendance data for the selected employee
  const getAttendanceDetails = (name) => {
    return attendanceData.filter(attendance => attendance.name === name);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Employee Attendance</h2>
      <button
        onClick={getLocation}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Get My Location
      </button>
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Out Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {attendanceData.map((attendance, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{attendance.name}</td>
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => handleShowAttendance(attendance.name)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display selected employee attendance details */}
      {selectedEmployee && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <h3 className="text-lg font-semibold">Attendance Details for {selectedEmployee}</h3>
          <ul>
            {getAttendanceDetails(selectedEmployee).map((attendance, index) => (
              <li key={index} className="py-2">
                <div className="font-medium">{attendance.date}</div>
                <div>In Time: {attendance.inTime}</div>
                <div>Out Time: {attendance.outTime}</div>
                <div>Present: {checkProximity(attendance.inTime, attendance.outTime) ? 'Yes' : 'No'}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmployeeAttendance;

import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';

const SalesReport = () => {
  const [filter, setFilter] = useState('');
  const [data, setData] = useState([]);

  // Sample data for demonstration purposes
  const sampleData = [
    { id: 1507246, date: '03:21 PM, 15-07-2024', total: 8.50, discount: 0.00, deliveryCharge: 0.00, paymentType: 'Cash On Delivery', paymentStatus: 'Paid' },
    { id: 1507245, date: '03:21 PM, 15-07-2024', total: 18.73, discount: 0.00, deliveryCharge: 0.00, paymentType: 'Cash On Delivery', paymentStatus: 'Paid' },
    { id: 1507244, date: '03:21 PM, 15-07-2024', total: 6.50, discount: 0.00, deliveryCharge: 1.00, paymentType: 'Cash On Delivery', paymentStatus: 'Unpaid' },
    { id: 1507243, date: '03:21 PM, 15-07-2024', total: 8.50, discount: 0.00, deliveryCharge: 0.36, paymentType: 'Cash On Delivery', paymentStatus: 'Paid' },
    { id: 1507242, date: '03:21 PM, 15-07-2024', total: 23.38, discount: 5.00, deliveryCharge: 5.36, paymentType: 'PAYPAL', paymentStatus: 'Paid' },
    { id: 1507241, date: '03:21 PM, 15-07-2024', total: 24.09, discount: 0.00, deliveryCharge: 5.36, paymentType: 'Cash On Delivery', paymentStatus: 'Paid' }
  ];

  useEffect(() => {
    // Fetch data from the backend
    // Replace with your API endpoint once available
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('/api/sales-report');
    //     const result = await response.json();
    //     setData(result);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    // fetchData();
    
    // Using sample data for demonstration
    setData(sampleData);
  }, []);

  const filteredData = data.filter(entry =>
    filter === '' || entry.paymentStatus === filter
  );

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid black; padding: 8px; text-align: left; } thead { background-color: #f4f4f4; }</style>');
    printWindow.document.write('</head><body >');
    printWindow.document.write('<h1>Sales Report</h1>');
    printWindow.document.write(document.querySelector('table').outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="p-4 max-w-full mx-auto">
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 items-center justify-between mb-4">
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4">
          <button
            onClick={handlePrint}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm sm:text-base"
          >
            Print
          </button>
          <CSVLink
            data={filteredData}
            filename={"sales-report.csv"}
            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm sm:text-base"
          >
            Export CSV
          </CSVLink>
        </div>
        <select
          className="px-3 py-1 border rounded-md text-sm sm:text-base w-full sm:w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="p-2 border-b text-xs sm:text-sm">Order ID</th>
              <th className="p-2 border-b text-xs sm:text-sm">Date</th>
              <th className="p-2 border-b text-xs sm:text-sm">Total</th>
              <th className="p-2 border-b text-xs sm:text-sm">Discount</th>
              <th className="p-2 border-b text-xs sm:text-sm">Delivery Charge</th>
              <th className="p-2 border-b text-xs sm:text-sm">Payment Type</th>
              <th className="p-2 border-b text-xs sm:text-sm">Payment Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-xs sm:text-sm">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="p-2 border-b">{item.id}</td>
                  <td className="p-2 border-b">{item.date}</td>
                  <td className="p-2 border-b">{item.total.toFixed(2)}</td>
                  <td className="p-2 border-b">{item.discount.toFixed(2)}</td>
                  <td className="p-2 border-b">{item.deliveryCharge.toFixed(2)}</td>
                  <td className="p-2 border-b">{item.paymentType}</td>
                  <td className={`p-2 border-b ${
                    item.paymentStatus === 'Paid' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.paymentStatus}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-2 text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-gray-600 text-xs sm:text-sm">
        Showing {filteredData.length} of {data.length} entries
      </div>
    </div>
  );
};

export default SalesReport;

// src/GSTReport.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For fetching report ID from URL params

// Sample GST report data
const sampleGSTReport = {
  id: 'GST123456',
  period: 'July 2024',
  totalSales: '₹100,000.00',
  taxableAmount: '₹85,000.00',
  gstCollected: '₹15,000.00',
  gstRate: '18%',
  items: [
    { name: 'Item 1', quantity: '100 pcs', price: '₹500.00' },
    { name: 'Item 2', quantity: '50 pcs', price: '₹750.00' }
  ],
  restaurant: {
    name: 'BR Tech Restaurant',
    address: 'Gannipur Muzaffarpur, '
  }
};

const GSTReport = () => {
  const { reportId } = useParams(); // Get the report ID from URL params
  const [report, setReport] = useState(sampleGSTReport); // Default to sample data
  const [gstRate, setGstRate] = useState('18%'); // Default GST rate
  const [totalSales, setTotalSales] = useState('₹100,000.00'); // Default total sales amount
  const [taxableAmount, setTaxableAmount] = useState('₹85,000.00'); // Default taxable amount
  const [gstCollected, setGstCollected] = useState('₹15,000.00'); // Default GST collected

  useEffect(() => {
    // TODO: Fetch data from backend using the reportId
    /*
    const fetchGSTReport = async () => {
      try {
        // Replace with your API endpoint
        const response = await fetch(`/api/reports/${reportId}`);
        
        // Check if response is ok
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        setReport(data); // Set the fetched report data
        setGstRate(data.gstRate); // Update GST rate
        setTotalSales(data.totalSales); // Update total sales amount
        setTaxableAmount(data.taxableAmount); // Update taxable amount
        setGstCollected(data.gstCollected); // Update GST collected
      } catch (error) {
        console.error('Error fetching GST report:', error);
      }
    };

    fetchGSTReport();
    */
  }, [reportId]);

  const calculateGst = () => {
    const rate = parseFloat(gstRate) / 100;
    const taxable = parseFloat(taxableAmount.replace('₹', '').replace(',', ''));
    const gst = taxable * rate;
    setGstCollected(`₹${gst.toFixed(2)}`);
  };

  const generatePrintContent = () => {
    if (!report) return ''; // Ensure report data is available

    return `
      <html>
        <head>
          <title>GST Report</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .header h1 { margin: 0; }
            .header p { margin: 5px 0; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
            .footer { text-align: center; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${report.restaurant.name}</h1>
              <p>${report.restaurant.address}</p>
              <h2>GST Report - ${report.id}</h2>
            </div>
            <p><strong>Report Period:</strong> ${report.period}</p>
            <p><strong>Total Sales:</strong> ${totalSales}</p>
            <p><strong>Taxable Amount:</strong> ${taxableAmount}</p>
            <p><strong>GST Collected:</strong> ${gstCollected}</p>
            <p><strong>GST Rate:</strong> ${gstRate}</p>

            <h3>Items</h3>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${report.items.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="footer">Thank you for your business!</div>
          </div>
        </body>
      </html>
    `;
  };

  const handlePrintReport = () => {
    const printWindow = window.open('', '', 'height=800,width=600');
    printWindow.document.open();
    printWindow.document.write(generatePrintContent());
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleGstRateChange = (event) => setGstRate(event.target.value);
  const handleTotalSalesChange = (event) => setTotalSales(event.target.value);
  const handleTaxableAmountChange = (event) => setTaxableAmount(event.target.value);

  // Display loading state while fetching data
  if (!report) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">GST Report ID: {report.id}</h1>
      
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <div className="mb-4">
          <span className="text-gray-700 font-semibold">Report Period:</span>
          <div className="mt-2 p-2 border rounded-md bg-gray-100">{report.period}</div>
        </div>
        
        <div className="mb-4">
          <span className="text-gray-700 font-semibold">Total Sales:</span>
          <input
            type="text"
            value={totalSales}
            onChange={handleTotalSalesChange}
            className="mt-2 p-2 border rounded-md w-full bg-gray-50"
            placeholder="Enter total sales amount"
          />
        </div>
        
        <div className="mb-4">
          <span className="text-gray-700 font-semibold">Taxable Amount:</span>
          <input
            type="text"
            value={taxableAmount}
            onChange={handleTaxableAmountChange}
            className="mt-2 p-2 border rounded-md w-full bg-gray-50"
            placeholder="Enter taxable amount"
          />
        </div>
        
        <div className="mb-4">
          <span className="text-gray-700 font-semibold">GST Collected:</span>
          <input
            type="text"
            value={gstCollected}
            readOnly
            className="mt-2 p-2 border rounded-md w-full bg-gray-100"
          />
        </div>
        
        <div className="mb-4">
          <span className="text-gray-700 font-semibold">GST Rate (%):</span>
          <input
            type="text"
            value={gstRate}
            onChange={handleGstRateChange}
            className="mt-2 p-2 border rounded-md w-full bg-gray-50"
            placeholder="Enter GST rate"
          />
        </div>
        
        <button
          onClick={calculateGst}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Calculate GST
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Items List</h2>
        {report.items.map((item, index) => (
          <div key={index} className="flex justify-between border-b py-2">
            <div className="flex items-center">
              <div>
                <div className="font-semibold text-gray-700">{item.name}</div>
                <div className="text-gray-600">Quantity: {item.quantity}</div>
              </div>
            </div>
            <div className="font-semibold text-gray-700">{item.price}</div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Restaurant Information</h2>
        <div>
          <div className="font-semibold text-gray-700">{report.restaurant.name}</div>
          <div className="text-gray-600">{report.restaurant.address}</div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handlePrintReport}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Print Report
        </button>
      </div>
    </div>
  );
};

export default GSTReport;

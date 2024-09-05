// src/TransactionDashboard.js

import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv'; // For CSV export


 
const sampleTransactions = [
    { id: '2P498472RR750594R', date: '03:21 PM, 15-07-2024', method: 'PAYPAL', orderSerialNo: '1507242', amount: '+ 23.38' },
    { id: '2P498472RR750595S', date: '04:15 PM, 16-07-2024', method: 'CREDIT CARD', orderSerialNo: '1507243', amount: '- 15.00' },
    { id: '2P498472RR750596T', date: '05:30 PM, 17-07-2024', method: 'BANK TRANSFER', orderSerialNo: '1507244', amount: '+ 120.00' },
    // Add more sample data if needed
  ];
const TransactionDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         setLoading(true);
//         // Replace the URL with your actual API endpoint
//         const response = await fetch('https://api.example.com/transactions');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setTransactions(data);
//         setFilteredTransactions(data); // Initialize filtered transactions
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, []);
  
// SAMPLE DATA ?


useEffect(() => {
    // Simulate data fetching
    const fetchTransactions = () => {
      try {
        setLoading(true);
        // Simulate a delay
        setTimeout(() => {
          setTransactions(sampleTransactions);
          setFilteredTransactions(sampleTransactions); // Initialize filtered transactions
        }, 1000);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const filterTransactions = () => {
      const result = transactions.filter(transaction =>
        Object.values(transaction).join(' ').toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredTransactions(result);
    };

    filterTransactions();
  }, [filter, transactions]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(document.querySelector('table').outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleClearFilter = () => {
    setFilter('');
    setFilteredTransactions(transactions);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Print
          </button>
          <CSVLink
            data={filteredTransactions}
            filename="transactions.csv"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Export to CSV
          </CSVLink>
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Search"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleClearFilter}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Clear
          </button>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Transaction Id</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Payment Method</th>
            <th className="border border-gray-300 p-2">Order Serial No</th>
            <th className="border border-gray-300 p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td className="border border-gray-300 p-2">{transaction.id}</td>
                <td className="border border-gray-300 p-2">{transaction.date}</td>
                <td className="border border-gray-300 p-2">{transaction.method}</td>
                <td className="border border-gray-300 p-2">{transaction.orderSerialNo}</td>
                <td className="border border-gray-300 p-2">{transaction.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border border-gray-300 p-2 text-center">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4">
        Showing 1 to {filteredTransactions.length} of {transactions.length} entries
      </div>
    </div>
  );
};

export default TransactionDashboard;

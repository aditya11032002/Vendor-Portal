import React, { useState, useMemo } from 'react';
import { 
  CheckIcon, 
  XMarkIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/react/24/solid';

const ApproverPage = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([
    {
      id: '1',
      invoiceNo: 'INV-2024-001',
      vendor: 'Tech Suppliers Inc.',
      amount: 50000,
      date: '2024-01-15',
      status: 'Pending',
      discount: 1000
    },
    {
      id: '2',
      invoiceNo: 'INV-2024-002',
      vendor: 'Office Supplies Co.',
      amount: 25000,
      date: '2024-01-18',
      status: 'Pending',
      discount: 1500
    },
    {
      id: '3',
      invoiceNo: 'INV-2024-003',
      vendor: 'Consulting Services',
      amount: 75000,
      date: '2024-01-20',
      status: 'Pending',
      discount: 2000
    },
    {
      id: '4',
      invoiceNo: 'INV-2024-004',
      vendor: 'IT Solutions Group',
      amount: 90000,
      date: '2024-01-25',
      status: 'Pending',
      discount: 2500
    }
  ]);

  // Calculations
  const totalDiscount = useMemo(() => 
    data.reduce((sum, item) => sum + item.discount, 0),
    [data]
  );

  const totalInvoiceValue = useMemo(() => 
    data.reduce((sum, item) => sum + item.amount, 0),
    [data]
  );

  // Row selection handler
  const toggleRowSelection = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  // Approve handler
  const handleApprove = () => {
    const updatedData = data.map(item => 
      selectedRows.includes(item.id) 
        ? {...item, status: 'Approved'} 
        : item
    );
    setData(updatedData);
    setSelectedRows([]);
  };

  // Reject handler
  const handleReject = () => {
    const updatedData = data.map(item => 
      selectedRows.includes(item.id) 
        ? {...item, status: 'Rejected'} 
        : item
    );
    setData(updatedData);
    setSelectedRows([]);
  };

  // Filtered and searched data
  const filteredData = data.filter(item => 
    item.invoiceNo.toLowerCase().includes(searchText.toLowerCase()) ||
    item.vendor.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="flex-grow p-6 space-y-6">
        {/* Action Bar */}
        <div className="flex justify-between items-center">
          {/* Search Input */}
          <div className="relative flex-grow max-w-md mr-4">
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#059b9a]"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleApprove}
              disabled={selectedRows.length === 0}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-full 
                ${selectedRows.length > 0 
                  ? 'bg-[#2ed9cc] text-white hover:bg-[#059b9a]' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
              `}
            >
              <CheckIcon className="h-5 w-5" />
              <span>Approve</span>
            </button>
            <button
              onClick={handleReject}
              disabled={selectedRows.length === 0}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-full 
                ${selectedRows.length > 0 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
              `}
            >
              <XMarkIcon className="h-5 w-5" />
              <span>Reject</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
       <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#059b9a] text-white">
              <tr>
                <th className="p-3 text-left">
                  <input 
                    type="checkbox"
                    checked={selectedRows.length === data.length}
                    onChange={() => 
                      setSelectedRows(
                        selectedRows.length === data.length 
                          ? [] 
                          : data.map(item => item.id)
                      )
                    }
                    className="form-checkbox h-5 w-5 text-[#2ed9cc]"
                  />
                </th>
                <th className="p-3 text-left">Invoice No</th>
                <th className="p-3 text-left">Vendor</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
           </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr 
                  key={item.id} 
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">
                    <input 
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => toggleRowSelection(item.id)}
                      className="form-checkbox h-5 w-5 text-[#2ed9cc]"
                    />
                  </td>
                  <td className="p-3 text-gray-600">{item.invoiceNo}</td>
                  <td className="p-3 text-gray-600">{item.vendor}</td>
                  <td className="p-3 text-gray-600">${item.amount.toLocaleString()}</td>
                  <td className="p-3 text-gray-600">{item.date}</td>
                  <td className="p-3">
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-bold
                      ${
                        item.status === 'Pending' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : item.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-[#059b9a] p-6 text-white">
        <h2 className="text-xl font-bold mb-6">Summary</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Total Discount</h3>
            <p className="text-lg font-bold">${totalDiscount.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2">Total Invoice Value</h3>
            <p className="text-lg font-bold">${totalInvoiceValue.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2">Pending Invoices</h3>
            <p className="text-lg font-bold">
              {data.filter(item => item.status === 'Pending').length}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2">Approved Invoices</h3>
            <p className="text-lg font-bold">
              {data.filter(item => item.status === 'Approved').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproverPage;
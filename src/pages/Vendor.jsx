import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Filter, 
  MoreVertical 
} from 'lucide-react';

const vendorData = [
  {
    id: 1,
    name: 'Tech Innovations Inc.',
    category: 'Technology',
    contact: 'John Smith',
    email: 'john@techinnovations.com',
    status: 'Active',
    contracts: 5,
    totalSpend: '$250,000'
  },
  {
    id: 2,
    name: 'GlobalSupply Solutions',
    category: 'Logistics',
    contact: 'Emily Johnson',
    email: 'emily@globalsupply.com',
    status: 'Active',
    contracts: 3,
    totalSpend: '$180,000'
  },
  {
    id: 3,
    name: 'Green Energy Suppliers',
    category: 'Utilities',
    contact: 'Michael Chen',
    email: 'michael@greenenergy.com',
    status: 'Pending',
    contracts: 2,
    totalSpend: '$95,000'
  },
  {
    id: 4,
    name: 'Office Essentials Corp',
    category: 'Office Supplies',
    contact: 'Sarah Williams',
    email: 'sarah@officeessentials.com',
    status: 'Active',
    contracts: 4,
    totalSpend: '$120,000'
  }
];

const VendorManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVendors, setFilteredVendors] = useState(vendorData);
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Search and Filter Function
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = vendorData.filter(vendor => 
      vendor.name.toLowerCase().includes(term) ||
      vendor.category.toLowerCase().includes(term) ||
      vendor.contact.toLowerCase().includes(term)
    ).filter(vendor => 
      selectedStatus === 'All' || vendor.status === selectedStatus
    );

    setFilteredVendors(filtered);
  };

  // Status Filter Function
  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    const filtered = vendorData.filter(vendor => 
      status === 'All' || vendor.status === status
    ).filter(vendor => 
      vendor.name.toLowerCase().includes(searchTerm)
    );

    setFilteredVendors(filtered);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Vendor Management</h1>
        <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          <Plus className="mr-2" size={20} />
          Add New Vendor
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <div className="flex space-x-4">
          {/* Search Input */}
          <div className="relative flex-grow">
            <input 
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <div className="text-gray-600">Status:</div>
            {['All', 'Active', 'Pending'].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusFilter(status)}
                className={`
                  px-3 py-2 rounded-lg text-sm 
                  ${selectedStatus === status 
                    ? 'bg-indigo-100 text-indigo-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                `}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vendor List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contracts</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spend</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredVendors.map((vendor) => (
              <tr key={vendor.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                  <div className="text-sm text-gray-500">{vendor.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {vendor.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.contact}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`
                    px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${vendor.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'}
                  `}>
                    {vendor.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.contracts}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vendor.totalSpend}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end items-center space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <Edit2 size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Results State */}
        {filteredVendors.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No vendors found. Try adjusting your search or filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorManagement;
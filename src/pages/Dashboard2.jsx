import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  FileText, 
  Percent, 
  Home, 
  ChevronRight,
  ChevronDown
} from 'lucide-react';

const sampleDiscountData = [
  {
    id: 1,
    sapDocument: 'SAP-001',
    invoiceNo: 'INV-2024-001',
    vendorName: 'Tech Suppliers Inc.',
    invoiceDate: '2024-01-15',
    baseInvoice: 50000,
    gstAmount: 9000,
    tds: 1000,
    discountBase: 49000,
    dueDate: '2024-02-15',
    remainingDays: 30,
    discountPercentage: 0,
    tobePaid: 49000,
    discountAmount: 0,
    requestRaised: '2024-01-20',
    status: 'Pending'
  },
  {
    id: 2,
    sapDocument: 'SAP-002',
    invoiceNo: 'INV-2024-002',
    vendorName: 'Global Tech Solutions',
    invoiceDate: '2024-01-10',
    baseInvoice: 75000,
    gstAmount: 13500,
    tds: 1500,
    discountBase: 74000,
    dueDate: '2024-02-10',
    remainingDays: 25,
    discountPercentage: 0,
    tobePaid: 74000,
    discountAmount: 0,
    requestRaised: '2024-01-18',
    status: 'Pending'
  },
  {
      id: 3,
      "sapDocument" : "SAP-001",
      "invoiceNo" : "INV-2024-001",
      "vendorName" : "Tech Suppliers Inc.",
      "invoiceDate" : '2024-01-15',
      "baseInvoice": 50000,
      "gstAmount": 9000,
      "tds": 1000,
      "discountBase": 49000,
      "dueDate": "2024-02-15",
      "remainingDays": 30,
      "discountPercentage": 0,
      "tobePaid": 49000,
      "discountAmount": 0,
      "requestRaised": "2024-01-20",
      "status": "Pending"
    },
    {
      "id": 4,
      "sapDocument": "SAP-002",
      "invoiceNo": "INV-2024-002",
      "vendorName": "Office Supplies Co.",
      "invoiceDate": "2024-01-18",
      "baseInvoice": 25000,
      "gstAmount": 4500,
      "tds": 500,
      "discountBase": 24500,
      "dueDate": "2024-02-18",
      "remainingDays": 31,
      "discountPercentage": 5,
      "tobePaid": 23275,
      "discountAmount": 1225,
      "requestRaised": "2024-01-22",
      "status": "Approved"
    },
    {
      "id": 5,
      "sapDocument": "SAP-003",
      "invoiceNo": "INV-2024-003",
      "vendorName": "Consulting Services Ltd.",
      "invoiceDate": "2024-01-20",
      "baseInvoice": 75000,
      "gstAmount": 13500,
      "tds": 1500,
      "discountBase": 73500,
      "dueDate": "2024-02-20",
      "remainingDays": 31,
      "discountPercentage": 10,
      "tobePaid": 66150,
      "discountAmount": 7350,
      "requestRaised": "2024-01-25",
      "status": "Pending"
    },
    {
      "id": 6,
      "sapDocument": "SAP-004",
      "invoiceNo": "INV-2024-004",
      "vendorName": "Logistics Solutions Inc.",
      "invoiceDate": "2024-01-22",
      "baseInvoice": 60000,
      "gstAmount": 10800,
      "tds": 1200,
      "discountBase": 58800,
      "dueDate": "2024-02-22",
      "remainingDays": 31,
      "discountPercentage": 0,
      "tobePaid": 57600,
      "discountAmount": 0,
      "requestRaised": "2024-01-27",
      "status": "Pending"
    },
    {
      "id": 7,
      "sapDocument": "SAP-005",
      "invoiceNo": "INV-2024-005",
      "vendorName": "IT Solutions Group",
      "invoiceDate": "2024-01-25",
      "baseInvoice": 90000,
      "gstAmount": 16200,
      "tds": 1800,
      "discountBase": 88200,
      "dueDate": "2024-02-25",
      "remainingDays": 31,
      "discountPercentage": 5,
      "tobePaid": 83850,
      "discountAmount": 4410,
      "requestRaised": "2024-01-30",
      "status": "Approved"
    },
    {
      "id": 8,
      "sapDocument": "SAP-006",
      "invoiceNo": "INV-2024-006",
      "vendorName": "Marketing Agency",
      "invoiceDate": "2024-01-28",
      "baseInvoice": 30000,
      "gstAmount": 5400,
      "tds": 600,
      "discountBase": 29400,
      "dueDate": "2024-02-28",
      "remainingDays": 31,
      "discountPercentage": 0,
      "tobePaid": 28800,
      "discountAmount": 0,
      "requestRaised": "2024-02-01",
      "status": "Pending"
    }
];

const sampleInvoices = [
  {
    id: 1,
    invoiceNo: 'INV-2024-001',
    vendor: 'Tech Suppliers Inc.',
    amount: 50000,
    date: '2024-01-15',
    status: 'Pending',
    daysRemaining: 30
  },
  {
    id: 2,
    invoiceNo: 'INV-2024-002',
    vendor: 'Global Tech Solutions',
    amount: 75000,
    date: '2024-01-10',
    status: 'Pending',
    daysRemaining: 25
  },
  {
    id: 3,
    invoiceNo: 'INV-2024-003',
    vendor: 'IT Infrastructure Ltd.',
    amount: 60000,
    date: '2024-01-20',
    status: 'Approved',
    daysRemaining: 35
  },
    {
      id: 4,
      invoiceNo: 'INV-2024-002',
      vendor: 'Office Supplies Co.',
      amount: 25000,
      date: '2024-01-18',
      status: 'Approved',
      daysRemaining: 31
    },
    {
      id: 4,
      invoiceNo: 'INV-2024-003',
      vendor: 'Consulting Services Ltd.',
      amount: 75000,
      date: '2024-01-20',
      status: 'Pending',
      daysRemaining: 31
    },
    {
      id: 5,
      invoiceNo: 'INV-2024-004',
      vendor: 'Logistics Solutions Inc.',
      amount: 60000,
      date: '2024-01-22',
      status: 'Pending',
      daysRemaining: 31
    },
    {
      id: 6,
      invoiceNo:' INV-2024-005',
      vendor: 'IT Solutions Group',
      amount: 90000,
      date: '2024-01-25',
      status: 'Approved',
      daysRemaining: 31
    },
    {
      id: 7,
      invoiceNo: 'INV-2024-006',
      vendor: 'Marketing Agency',
      amount: 30000,
      date: '2024-01-28',
      status: 'Pending',
      daysRemaining: 31
    },
    {
      id: 8,
      invoiceNo: 'INV-2024-007',
      vendor: 'Creative Designs Ltd.',
      amount: 45000,
      date: '2024-01-30',
      status: 'Pending',
      daysRemaining: 28
    },
    {
      id: 9,
      invoiceNo: 'INV-2024-008',
      vendor: 'Global Tech Solutions',
      amount: 120000,
      date: '2024-02-01',
      status: 'Approved',
      daysRemaining: 27
    },
    {
      id: 10,
      invoiceNo: 'INV-2024-009',
      vendor: 'Construction Supplies Co.',
      amount: 85000,
      date: '2024-02-03',
      status: 'Pending',
      daysRemaining: 25
    },
    {
      id: 11,
      invoiceNo: 'INV-2024-010',
      vendor: 'Digital Marketing Agency',
      amount: 70000,
      date: '2024-02-05',
      status: 'Approved',
      daysRemaining: 23
    },
    {
      id: 12,
      invoiceNo:' INV-2024-011',
      vendor: 'Event Management Group',
      amount: 55000,
      date: '2024-02-07',
      status: 'Pending',
      daysRemaining: 21
    }
];

const Dashboard2 = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('discounting');
  const [discountData, setDiscountData] = useState(sampleDiscountData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [invoices, setInvoices] = useState(sampleInvoices);
  const [expandedRows, setExpandedRows] = useState({});

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleRowSelect = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleDiscountPercentageChange = (id, value) => {
    if (selectedRows.includes(id)) {
      setDiscountData(prev => prev.map(row => 
        row.id === id 
          ? { 
              ...row, 
              discountPercentage: value,
              discountAmount: row.discountBase * (value / 100),
              tobePaid: row.discountBase - (row.discountBase * (value / 100))
            }
          : row
      ));
    }
  };

  const handleTobePaidChange = (id, value) => {
    if (selectedRows.includes(id)) {
      setDiscountData(prev => prev.map(row => 
        row.id === id ? { ...row, tobePaid: value } : row
      ));
    }
  };

  const handleSubmitForApproval = () => {
    if (selectedRows.length === 0) {
      alert('Please select at least one row');
      return;
    }

    setDiscountData(prev => prev.map(row => 
      selectedRows.includes(row.id) 
        ? { ...row, status: 'Sent for Approval' } 
        : row
    ));
  };

  const toggleRowExpand = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderDesktopTable = () => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#059b9a] text-white">
            <tr>
              <th className="p-3 border"><input type="checkbox" /></th>
              <th className="p-3 border">SAP Document</th>
              <th className="p-3 border">Invoice No</th>
              <th className="p-3 border">Vendor Name</th>
              <th className="p-3 border">Invoice Date</th>
              <th className="p-3 border">Base Invoice (Rs)</th>
              <th className="p-3 border">Discount %</th>
              <th className="p-3 border">To be Paid</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {discountData.map(row => (
              <tr key={row.id} className="border-b hover:bg-[#2ed9cc]/10">
                <td className="p-3 text-center">
                  <input 
                    type="checkbox" 
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                    disabled={row.status === 'Approved' || row.status === 'Sent for Approval'}
                  />
                </td>
                <td className="p-3">{row.sapDocument}</td>
                <td className="p-3">{row.invoiceNo}</td>
                <td className="p-3">{row.vendorName}</td>
                <td className="p-3">{row.invoiceDate}</td>
                <td className="p-3">{row.baseInvoice.toLocaleString()}</td>
                <td className="p-3">
                  <input 
                    type="number" 
                    value={row.discountPercentage}
                    onChange={(e) => handleDiscountPercentageChange(row.id, parseFloat(e.target.value))}
                    className="w-20 p-1 border rounded"
                    disabled={!selectedRows.includes(row.id) || row.status === 'Approved' || row.status === 'Sent for Approval'}
                  />
                </td>
                <td className="p-3">
                  <input 
                    type="number" 
                    value={row.tobePaid}
                    onChange={(e) => handleTobePaidChange(row.id, parseFloat(e.target.value))}
                    className="w-24 p-1 border rounded"
                    disabled={!selectedRows.includes(row.id) || row.status === 'Approved' || row.status === 'Sent for Approval'}
                  />
                </td>
                <td className="p-3">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderMobileTable = () => {
    return (
      <div className="space-y-4">
        {discountData.map(row => (
          <div 
            key={row.id} 
            className="bg-white rounded-lg shadow-md p-4 border"
          >
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleRowExpand(row.id)}
            >
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleRowSelect(row.id)}
                  disabled={row.status === 'Approved' || row.status === 'Sent for Approval'}
                  className="mr-3"
                />
                <div>
                  <p className="font-bold text-[#059b9a]">{row.vendorName}</p>
                  <p className="text-sm text-gray-500">{row.invoiceNo}</p>
                </div>
              </div>
              <ChevronDown 
                className={`transform transition-transform ${expandedRows[row.id] ? 'rotate-180' : ''}`} 
              />
            </div>

            {expandedRows[row.id] && (
              <div className="mt-4 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">SAP Document</p>
                    <p>{row.sapDocument}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Invoice Date</p>
                    <p>{row.invoiceDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Base Invoice</p>
                    <p>{row.baseInvoice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p>{row.status}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-xs text-gray-500">Discount %</label>
                  <input 
                    type="number" 
                    value={row.discountPercentage}
                    onChange={(e) => handleDiscountPercentageChange(row.id, parseFloat(e.target.value))}
                    className="flex-1 p-1 border rounded"
                    disabled={!selectedRows.includes(row.id) || row.status === 'Approved' || row.status === 'Sent for Approval'}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-xs text-gray-500">To be Paid</label>
                  <input 
                    type="number" 
                    value={row.tobePaid}
                    onChange={(e) => handleTobePaidChange(row.id, parseFloat(e.target.value))}
                    className="flex-1 p-1 border rounded"
                    disabled={!selectedRows.includes(row.id) || row.status === 'Approved' || row.status === 'Sent for Approval'}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div 
        className={`
          bg-[#059b9a] text-white shadow-md transition-all duration-300 
          ${isNavCollapsed ? 'w-20' : 'w-64'}
        `}
      >
        <div className="flex justify-between items-center p-4 border-b border-[#2ed9cc]">
          {!isNavCollapsed && <h1 className="text-2xl font-bold">Vendor Portal</h1>}
          <button 
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
            className="p-2 hover:bg-[#2ed9cc]/20 rounded"
          >
            {isNavCollapsed ? <ChevronRight className="text-white" /> : <X className="text-white" />}
          </button>
        </div>
        
        <nav className="p-4">
          <ul>
            {[
              { section: 'home', icon: Home, label: 'Home' },
              { section: 'discounting', icon: Percent, label: 'Discounting' },
              { section: 'invoices', icon: FileText, label: 'Invoices' }
            ].map(({ section, icon: Icon, label }) => (
              <li 
                key={section}
                className={`
                  p-3 hover:bg-[#2ed9cc]/20 cursor-pointer flex items-center 
                  ${activeSection === section ? 'bg-[#2ed9cc]/30' : ''}
                `}
                onClick={() => setActiveSection(section)}
              >
                <Icon className="mr-3" /> 
                {!isNavCollapsed && <span>{label}</span>}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-[#059b9a] capitalize">
            {activeSection} Overview
          </h2>
          <button 
            onClick={handleSubmitForApproval}
            className="bg-[#059b9a] text-white px-4 py-2 rounded hover:bg-[#2ed9cc] transition-colors"
            disabled={selectedRows.length === 0}
          >
            Submit for Approval
          </button>
        </div>

        {activeSection === 'discounting' && (
          <div className="space-y-4">
            {isMobile ? renderMobileTable() : renderDesktopTable()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard2;
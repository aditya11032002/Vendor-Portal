import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  FileText, 
  Percent, 
  Home, 
  Clock,
  DollarSign,
  FileCheck,
  AlertCircle
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
      "VendorName" : "Tech Suppliers Inc.",
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

const FIXED_DISCOUNT_PERCENTAGES = [1, 2, 3, 3.5, 4, 4.5, 4.75, 5, 99.99];

const Dashboard = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('discounting');
  const [discountData, setDiscountData] = useState(sampleDiscountData);
  const [invoices, setInvoices] = useState(sampleInvoices);
  const [selectedRows, setSelectedRows] = useState([]);

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

  const renderHomeSection = () => {
    const summaryCards = [
      {
        icon: Clock,
        title: 'Pending Invoices',
        value: invoices.filter(inv => inv.status === 'Pending').length,
        color: 'text-yellow-500'
      },
      {
        icon: DollarSign,
        title: 'Total Invoice Value',
        value: `₹${invoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}`,
        color: 'text-green-500'
      },
      {
        icon: FileCheck,
        title: 'Approved Invoices',
        value: invoices.filter(inv => inv.status === 'Approved').length,
        color: 'text-blue-500'
      },
      {
        icon: AlertCircle,
        title: 'Overdue Invoices',
        value: invoices.filter(inv => inv.daysRemaining <= 0).length,
        color: 'text-red-500'
      }
    ];

    return (
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        style={{ backgroundColor: "#eeeee4" }}
      >
        {summaryCards.map(({ icon: Icon, title, value, color }) => (
          <div 
            key={title} 
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center hover:shadow-lg transition-shadow"
          >
            <Icon className={`w-12 h-12 mb-4 ${color}`} />
            <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderInvoicesSection = () => {
    return (
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">All Invoices</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Invoice No</th>
                <th className="p-2 border">Vendor</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Days Remaining</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(invoice => (
                <tr key={invoice.id} className="border hover:bg-gray-50">
                  <td className="p-2 border">{invoice.invoiceNo}</td>
                  <td className="p-2 border">{invoice.vendor}</td>
                  <td className="p-2 border">₹{invoice.amount.toLocaleString()}</td>
                  <td className="p-2 border">{invoice.date}</td>
                  <td className="p-2 border">
                    <span 
                      className={`
                        px-2 py-1 rounded text-xs 
                        ${invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          invoice.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                          'bg-red-100 text-red-800'}
                      `}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-2 border">
                    <span 
                      className={`
                        ${invoice.daysRemaining <= 0 ? 'text-red-600 font-bold' : 'text-gray-700'}
                      `}
                    >
                      {invoice.daysRemaining}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderDiscountTable = () => {
    return (
      <div 
        className="bg-white p-4 md:p-6 rounded-lg shadow-md overflow-x-auto"
        style={{ backgroundColor: "white" }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-2 md:space-y-0">
          <h2 className="text-xl font-semibold text-white">Discounting</h2>
          <button 
            onClick={handleSubmitForApproval}
            className="bg-[#2ed9cc] text-white px-4 py-2 rounded hover:opacity-90 w-full md:w-auto"
            disabled={selectedRows.length === 0}
          >
            Submit for Approval
          </button>
        </div>
        <div className="w-full overflow-x-scroll">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border"><input type="checkbox" /></th>
                <th className="p-2 border">SAP Doc</th>
                <th className="p-2 border">Invoice No</th>
                <th className="p-2 border">Vendor</th>
                <th className="p-2 border">Invoice Date</th>
                <th className="p-2 border">Base Invoice</th>
                <th className="p-2 border">GST</th>
                <th className="p-2 border">TDS</th>
                <th className="p-2 border">Discount Base</th>
                <th className="p-2 border">Due Date</th>
                <th className="p-2 border">Remaining Days</th>
                <th className="p-2 border">Discount %</th>
                <th className="p-2 border">To be Paid</th>
                <th className="p-2 border">Discount (Rs)</th>
                <th className="p-2 border">Request Raised</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {discountData.map(row => (
                <tr key={row.id} className="border hover:bg-gray-100">
                  <td className="p-2 border text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleRowSelect(row.id)}
                      disabled={row.status === 'Approved' || row.status === 'Sent for Approval'}
                    />
                  </td>
                  <td className="p-2 border">{row.sapDocument}</td>
                  <td className="p-2 border">{row.invoiceNo}</td>
                  <td className="p-2 border">{row.vendorName}</td>
                  <td className="p-2 border">{row.invoiceDate}</td>
                  <td className="p-2 border">{row.baseInvoice.toLocaleString()}</td>
                  <td className="p-2 border">{row.gstAmount.toLocaleString()}</td>
                  <td className="p-2 border">{row.tds.toLocaleString()}</td>
                  <td className="p-2 border">{row.discountBase.toLocaleString()}</td>
                  <td className="p-2 border">{row.dueDate}</td>
                  <td className="p-2 border">{row.remainingDays}</td>
                  <td className="p-2 border">
                    <select 
                      value={row.discountPercentage}
                      onChange={(e) => handleDiscountPercentageChange(row.id, parseFloat(e.target.value))}
                      className="w-24 p-1 border rounded"
                      disabled={!selectedRows.includes(row.id) || row.status === 'Approved' || row.status === 'Sent for Approval'}
                    >
                      <option value={0}>Select Discount</option>
                      {FIXED_DISCOUNT_PERCENTAGES.map(percentage => (
                        <option key={percentage} value={percentage}>
                          {percentage}%
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2 border">
                    <input 
                      type="number" 
                      value={row.tobePaid}
                      onChange={(e) => handleTobePaidChange(row.id, parseFloat(e.target.value))}
                      className="w-24 p-1 border rounded"
                      disabled={!selectedRows.includes(row.id) || row.status === 'Approved' || row.status === 'Sent for Approval'}
                    />
                  </td>
                  <td className="p-2 border">{row.discountAmount.toLocaleString()}</td>
                  <td className="p-2 border">{row.requestRaised}</td>
                  <td className="p-2 border">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return renderHomeSection();
      case 'discounting':
        return renderDiscountTable();
      case 'invoices':
        return renderInvoicesSection();
      default:
        return renderHomeSection();
    }
  };

  return (
    <div 
      className="flex flex-col md:flex-row h-screen"
      style={{ backgroundColor: "#eeeee4" }}
    >
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-md flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Vendor Portal</h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 pt-16">
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
                    p-3 hover:bg-gray-100 cursor-pointer flex items-center 
                    ${activeSection === section ? 'bg-blue-50 text-blue-600' : ''}
                  `}
                  onClick={() => {
                    setActiveSection(section);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Icon className="mr-3" /> 
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block bg-white shadow-md transition-all duration-300 w-64">
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-2xl font-bold">Vendor Portal</h1>
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
                  p-3 hover:bg-gray-100 cursor-pointer flex items-center 
                  ${activeSection === section ? 'bg-blue-50 text-blue-600' : ''}
                `}
                onClick={() => setActiveSection(section)}
              >
                <Icon className="mr-3" /> 
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-10 overflow-y-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 capitalize">
          {activeSection} Overview
        </h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
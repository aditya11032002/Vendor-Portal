import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  CreditCard, 
  ShoppingCart, 
  Menu,
  X,
  LogOut,
  Edit,
  Trash2,
  PlusCircle
} from 'lucide-react';

// Expanded sample data (same as previous implementation)
const sampleVendorData = {
  name: "Vendor Portal",
  totalProducts: 45,
  totalRevenue: 124500.75,
  pendingOrders: 12,
  customerCount: 256,
  recentOrders: [
    { id: 1, product: "Smart Home Hub", amount: 299.99, date: "2024-01-15", customer: "John Doe", status: "Completed" },
    { id: 2, product: "IoT Sensor Kit", amount: 199.50, date: "2024-01-14", customer: "Jane Smith", status: "Shipped" },
    { id: 3, product: "Advanced Router", amount: 249.99, date: "2024-01-13", customer: "Mike Johnson", status: "Processing" }
  ],
  inventory: [
    { id: 1, name: "Smart Home Hub", price: 299.99, stock: 25, category: "Smart Home" },
    { id: 2, name: "IoT Sensor Kit", price: 199.50, stock: 40, category: "Sensors" },
    { id: 3, name: "Advanced Router", price: 249.99, stock: 15, category: "Networking" }
  ],
  customers: [
    { id: 1, name: "John Doe", email: "john.doe@example.com", totalPurchases: 3, lastPurchase: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", totalPurchases: 2, lastPurchase: "2024-01-14" },
    { id: 3, name: "Mike Johnson", email: "mike.johnson@example.com", totalPurchases: 1, lastPurchase: "2024-01-13" }
  ]
};

const Home = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [inventory, setInventory] = useState(sampleVendorData.inventory);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logging out");
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleDeleteProduct = (productId) => {
    setInventory(inventory.filter(product => product.id !== productId));
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: inventory.length + 1,
      name: "New Product",
      price: 0,
      stock: 0,
      category: "Uncategorized"
    };
    setInventory([...inventory, newProduct]);
    setEditingProduct(newProduct);
  };

  const renderDashboardContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { 
                  icon: Package, 
                  color: 'text-[#2ed9cc]', 
                  label: 'Total Products', 
                  value: sampleVendorData.totalProducts 
                },
                { 
                  icon: CreditCard, 
                  color: 'text-[#059b9a]', 
                  label: 'Total Revenue', 
                  value: `$${sampleVendorData.totalRevenue.toLocaleString()}` 
                },
                { 
                  icon: ShoppingCart, 
                  color: 'text-purple-500', 
                  label: 'Pending Orders', 
                  value: sampleVendorData.pendingOrders 
                },
                { 
                  icon: Users, 
                  color: 'text-orange-500', 
                  label: 'Customers', 
                  value: sampleVendorData.customerCount 
                }
              ].map(({ icon: Icon, color, label, value }) => (
                <div key={label} className="bg-white p-4 rounded-lg shadow flex items-center">
                  <Icon className={`mr-4 ${color}`} />
                  <div>
                    <h3 className="text-gray-500">{label}</h3>
                    <p className="text-2xl font-bold">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Sales Table */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px]">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">Product</th>
                        <th className="p-2">Customer</th>
                        <th className="p-2">Amount</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleVendorData.recentOrders.map(sale => ( 
                        <tr key={sale.id} className="border-b last:border-b-0">
                          <td className="p-2">{sale.product}</td>
                          <td className="p-2 text-center">{sale.customer}</td>
                          <td className="p-2 text-center">${sale.amount}</td>
                          <td className="p-2 text-center">
                            <span className={`
                              px-2 py-1 rounded-full text-xs font-semibold
                              ${sale.status === 'Completed' ? 'bg-[#2ed9cc]/20 text-[#059b9a]' : 
                                sale.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'}
                            `}>
                              {sale.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Customers Table */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Top Customers</h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px]">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Total Purchases</th>
                        <th className="p-2">Last Purchase</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleVendorData.customers.map(customer => (
                        <tr key={customer.id} className="border-b last:border-b-0">
                          <td className="p-2">{customer.name}</td>
                          <td className="p-2 text-center">{customer.email}</td>
                          <td className="p-2 text-center">{customer.totalPurchases}</td>
                          <td className="p-2 text-center">{customer.lastPurchase}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
              <h2 className="text-xl font-semibold">Product Catalog</h2>
              <button 
                onClick={handleAddProduct}
                className="flex items-center bg-[#059b9a] text-white px-3 py-2 rounded hover:bg-[#2ed9cc] w-full sm:w-auto"
              >
                <PlusCircle className="mr-2" /> Add Product
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Product Name</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Stock</th>
                    <th className="p-2">Category</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map(product => (
                    <tr key={product.id} className="border-b last:border-b-0">
                      <td className="p-2">{product.name}</td>
                      <td className="p-2 text-center">${product.price.toFixed(2)}</td>
                      <td className="p-2 text-center">{product.stock}</td>
                      <td className="p-2 text-center">{product.category}</td>
                      <td className="p-2 text-center">
                        <div className="flex space-x-2 justify-center">
                          <button 
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Edit />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Menu */}
      <div className="md:hidden fixed w-full bg-white z-10">
        <div className="flex justify-between p-4 shadow">
          <h1 className="text-2xl font-bold text-[#059b9a]">{sampleVendorData.name}</h1>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="bg-white p-4 shadow-md">
            <nav>
              <ul>
                {[
                  { section: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                  { section: 'products', icon: Package, label: 'Products' },
                  { section: 'logout', icon: LogOut, label: 'Logout' }
                ].map(({ section, icon: Icon, label }) => (
                  <li
                    key={section}
                    className={`p-3 hover:bg-gray-100 cursor-pointer flex items-center ${activeSection === section ? 'bg-[#2ed9cc]/10 text-[#059b9a]' : ''}`}
                    onClick={() => {
                      if (section === 'logout') {
                        handleLogout();
                      } else {
                        setActiveSection(section);
                      }
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
      </div>

      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-white shadow-md h-full">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-[#059b9a]">{sampleVendorData.name}</h1>
        </div>
        <nav>
          <ul>
            {[
              { section: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { section: 'products', icon: Package, label: 'Products' },
              { section: 'logout', icon: LogOut, label: 'Logout' }
            ].map(({ section, icon: Icon, label }) => (
              <li
                key={section}
                className={`p-3 hover:bg-gray-100 cursor-pointer flex items-center ${activeSection === section ? 'bg-[#2ed9cc]/10 text-[#059b9a]' : ''}`}
                onClick={() => {
                  if (section === 'logout') {
                    handleLogout();
                  } else {
                    setActiveSection(section);
                  }
                }}
              >
                <Icon className="mr-3" /> 
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {renderDashboardContent()}
      </main>
    </div>
  );
};

export default Home;

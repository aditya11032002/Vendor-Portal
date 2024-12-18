import React, { useState } from 'react';
import { 
  Palette, 
  UserPlus, 
  Database, 
  ChevronRight, 
  Save, 
  Trash2, 
  Upload 
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('themes');
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: '#3B82F6', // Default blue
    secondaryColor: '#10B981', // Default green
    backgroundColor: '#F3F4F6', // Light gray
    backgroundImage: null
  });

  const [approvers, setApprovers] = useState([
    { id: 1, name: '', email: '' },
    { id: 2, name: '', email: '' },
    { id: 3, name: '', email: '' },
    { id: 4, name: '', email: '' },
    { id: 5, name: '', email: '' }
  ]);

  const [odataConfig, setOdataConfig] = useState({
    baseUrl: '',
    username: '',
    password: '',
    serviceName: ''
  });

  const handleThemeColorChange = (field, value) => {
    setThemeSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBackgroundImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThemeSettings(prev => ({
          ...prev,
          backgroundImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApproverChange = (id, field, value) => {
    setApprovers(prev => 
      prev.map(approver => 
        approver.id === id ? {...approver, [field]: value} : approver
      )
    );
  };

  const handleOdataConfigChange = (field, value) => {
    setOdataConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'themes':
        return (
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Theme Customization</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Color Customization */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Color Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2">Primary Color</label>
                    <div className="flex items-center">
                      <input 
                        type="color" 
                        value={themeSettings.primaryColor}
                        onChange={(e) => handleThemeColorChange('primaryColor', e.target.value)}
                        className="mr-2"
                      />
                      <input 
                        type="text" 
                        value={themeSettings.primaryColor}
                        onChange={(e) => handleThemeColorChange('primaryColor', e.target.value)}
                        className="border p-2 rounded w-24"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2">Secondary Color</label>
                    <div className="flex items-center">
                      <input 
                        type="color" 
                        value={themeSettings.secondaryColor}
                        onChange={(e) => handleThemeColorChange('secondaryColor', e.target.value)}
                        className="mr-2"
                      />
                      <input 
                        type="text" 
                        value={themeSettings.secondaryColor}
                        onChange={(e) => handleThemeColorChange('secondaryColor', e.target.value)}
                        className="border p-2 rounded w-24"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2">Background Color</label>
                    <div className="flex items-center">
                      <input 
                        type="color" 
                        value={themeSettings.backgroundColor}
                        onChange={(e) => handleThemeColorChange('backgroundColor', e.target.value)}
                        className="mr-2"
                      />
                      <input 
                        type="text" 
                        value={themeSettings.backgroundColor}
                        onChange={(e) => handleThemeColorChange('backgroundColor', e.target.value)}
                        className="border p-2 rounded w-24"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Image */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Companies Logo</h3>
                <div className="border-2 border-dashed p-4 rounded-lg text-center">
                  {themeSettings.backgroundImage ? (
                    <img 
                      src={themeSettings.backgroundImage} 
                      alt="Background" 
                      className="max-w-full max-h-64 mx-auto object-cover rounded"
                    />
                  ) : (
                    <p className="text-gray-500">No image uploaded</p>
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleBackgroundImageUpload}
                    className="hidden"
                    id="backgroundImageUpload"
                  />
                  <label 
                    htmlFor="backgroundImageUpload"
                    className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
                  >
                    <Upload className="inline-block mr-2" /> Upload Image
                  </label>
                </div>
              </div>
            </div>

            {/* Save Theme Button */}
            <div className="mt-6 flex justify-end">
              <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 flex items-center">
                <Save className="mr-2" /> Save Theme
              </button>
            </div>
          </div>
        );
      
      case 'approvers':
        return (
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Approver Management</h2>
            
            <div className="space-y-4">
              {approvers.map((approver) => (
                <div key={approver.id} className="grid md:grid-cols-3 gap-4 items-center">
                  <input 
                    type="text"
                    placeholder="Approver Name"
                    value={approver.name}
                    onChange={(e) => handleApproverChange(approver.id, 'name', e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input 
                    type="email"
                    placeholder="Approver Email"
                    value={approver.email}
                    onChange={(e) => handleApproverChange(approver.id, 'email', e.target.value)}
                    className="border p-2 rounded"
                  />
                  <button 
                    onClick={() => handleApproverChange(approver.id, 'name', '')}
                    className="text-red-500 hover:bg-red-50 p-2 rounded"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>

            {/* Save Approvers Button */}
            <div className="mt-6 flex justify-end">
              <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 flex items-center">
                <Save className="mr-2" /> Save Approvers
              </button>
            </div>
          </div>
        );
      
      case 'odata':
        return (
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6">OData Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Base URL</label>
                <input 
                  type="text"
                  placeholder="Enter OData Service Base URL"
                  value={odataConfig.baseUrl}
                  onChange={(e) => handleOdataConfigChange('baseUrl', e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-2">Username</label>
                <input 
                  type="text"
                  placeholder="Enter Username"
                  value={odataConfig.username}
                  onChange={(e) => handleOdataConfigChange('username', e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-2">Password</label>
                <input 
                  type="password"
                  placeholder="Enter Password"
                  value={odataConfig.password}
                  onChange={(e) => handleOdataConfigChange('password', e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-2">Service Name</label>
                <input 
                  type="text"
                  placeholder="Enter OData Service Name"
                  value={odataConfig.serviceName}
                  onChange={(e) => handleOdataConfigChange('serviceName', e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
            </div>

            {/* Save OData Configuration Button */}
            <div className="mt-6 flex justify-end">
              <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 flex items-center">
                <Save className="mr-2" /> Save Configuration
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="p-4">
          <ul>
            <li 
              className={`p-3 hover:bg-gray-100 cursor-pointer flex items-center ${activeSection === 'themes' ? 'bg-blue-50 text-blue-600' : ''}`}
              onClick={() => setActiveSection('themes')}
            >
              <Palette className="mr-3" /> Themes
            </li>
            <li 
              className={`p-3 hover:bg-gray-100 cursor-pointer flex items-center ${activeSection === 'approvers' ? 'bg-blue-50 text-blue-600' : ''}`}
              onClick={() => setActiveSection('approvers')}
            >
              <UserPlus className="mr-3" /> Add Approvers
            </li>
            <li 
              className={`p-3 hover:bg-gray-100 cursor-pointer flex items-center ${activeSection === 'odata' ? 'bg-blue-50 text-blue-600' : ''}`}
              onClick={() => setActiveSection('odata')}
            >
              <Database className="mr-3" /> OData Configuration
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10 overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-6 capitalize">
          {activeSection} Configuration
        </h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
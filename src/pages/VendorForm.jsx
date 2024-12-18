import React, { useState } from 'react';
import axios from 'axios';

const VendorOrderForm = () => {
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    customerName: '',
    orderAmount: '',
    orderDate: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value
    });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setUploadStatus('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('orderId', orderDetails.orderId);
    formData.append('customerName', orderDetails.customerName);
    formData.append('orderAmount', orderDetails.orderAmount);
    formData.append('orderDate', orderDetails.orderDate);

    setLoading(true);
    try {
      const response = await axios.post('/api/uploadOrderDetails', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus('Order details and file uploaded successfully!');
      console.log('Upload response:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Failed to upload file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-xl overflow-hidden">
        <div 
          className="text-white py-4 px-6"
          style={{ 
            background: `linear-gradient(to right, #2ed9cc, #059b9a)` 
          }}
        >
          <h1 className="text-2xl font-semibold tracking-wide">Vendor Order Submission</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Order ID */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Order ID
              </label>
              <input
                type="text"
                name="orderId"
                value={orderDetails.orderId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                required
                placeholder="Enter Order ID"
              />
            </div>

            {/* Customer Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Customer Name
              </label>
              <input
                type="text"
                name="customerName"
                value={orderDetails.customerName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                required
                placeholder="Enter Customer Name"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Order Amount */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Order Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  name="orderAmount"
                  value={orderDetails.orderAmount}
                  onChange={handleInputChange}
                  className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                  required
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Order Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Order Date
              </label>
              <input
                type="date"
                name="orderDate"
                value={orderDetails.orderDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Attachment
            </label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-all duration-300">
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
              <div className="text-gray-500">
                {selectedFile 
                  ? `Selected: ${selectedFile.name}` 
                  : 'Drag and drop or click to upload (Invoice, Purchase Order)'}
              </div>
            </div>
          </div>

          {/* Upload Status */}
          {uploadStatus && (
            <div className={`p-3 rounded-md text-center ${uploadStatus.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {uploadStatus}
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className={`
                w-full py-3 rounded-md text-white font-semibold tracking-wide uppercase
                ${loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'hover:opacity-90'}
                transition-all duration-300
              `}
              style={{
                background: loading ? '#cccccc' : `linear-gradient(to right, #2ed9cc, #059b9a)`
              }}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorOrderForm;
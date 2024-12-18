import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesOrderTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const axiosInstance = axios.create({
          baseURL: '/api/sap/opu/odata/sap/ZRS_CURD1_SRV_01/', // Proxy to handle CORS
          auth: {
            username: 'iws_consult', // Use your SAP OData API credentials
            password: 'Support@123'
          },
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        const response = await axiosInstance.get('EmployeeDetailsSet');
        console.log('API Response:', response.data); // Debugging API response

        if (response.data?.d?.results) {
          const employeeData = response.data.d.results;
          console.log('Employee Data:', employeeData); // Debugging employee data
          setEmployees(employeeData);
        } else {
          setError('Unexpected API response format');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching employee data:', err);
        setError(err.message || 'Error fetching employee data');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!employees.length) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">No Employee Data Available</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Depno (Employee Number)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emdesign (Designation)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emplo (Location)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empname (Employee Name)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.map((employee, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">{employee.Depno || 'N/A'}</td>
                <td className="px-4 py-4 whitespace-nowrap">{employee.Emdesign || 'N/A'}</td>
                <td className="px-4 py-4 whitespace-nowrap">{employee.Location || 'N/A'}</td>
                <td className="px-4 py-4 whitespace-nowrap">{employee.Empname || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesOrderTable;

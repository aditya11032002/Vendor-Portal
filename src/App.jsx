import React from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Dashboard from './pages/Dashboard';
import Login from "./pages/login";
import VendorManagement from "./pages/Vendor";
import SalesOrderTable from "./components/tables";
import AdminDashboard from "./pages/Admin";
import VendorOrderForm from "./pages/VendorForm";
import Home from "./pages/Home";
import Dashboard2 from "./pages/Dashboard2";
import ApproverPage from "./pages/Approver";

 
const App = () => {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/vendor" element={<VendorManagement />} />  
        <Route path="/tables" element={<SalesOrderTable/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/form" element={<VendorOrderForm/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/dashboard2" element={<Dashboard2/>} />
        <Route path="/approver" element={<ApproverPage/>} />
      </Routes>
    </BrowserRouter>
  );
};
 
export default App;
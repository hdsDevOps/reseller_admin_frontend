import React from 'react';
import { Route, Routes } from 'react-router-dom';
const AddCustomer = React.lazy(() => import('./AddCustomer'));
const CustomerList = React.lazy(() => import('./CustomerList'));

const CustomerApp: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/customer" element={<CustomerList />} />
        <Route path="/addcustomer" element={<AddCustomer />} />
      </Routes>
    </div>
  );
};

export default CustomerApp;

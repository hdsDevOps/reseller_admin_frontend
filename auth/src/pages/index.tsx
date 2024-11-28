import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";


const CustomerManagement = React.lazy(() => import("./CustomerManagement"));
const CustomerInformation = React.lazy(() => import("./CustomerInformation"));
const AddCustomer = React.lazy(() => import("./AddCustomer"));
const EditCustomer = React.lazy(() => import("./EditCustomer"));


const CustomerApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/customers" element={<CustomerManagement />} />
        <Route path="/customer-information" element={<CustomerInformation />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/edit-customer" element={<EditCustomer />} />
      </Routes>
    </Suspense>
  );
};

export default CustomerApp;
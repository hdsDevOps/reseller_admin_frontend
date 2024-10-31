import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";


const Customer = React.lazy(() => import("./Customer"));
const CustomerManagement = React.lazy(() => import("./CustomerManagement"));
const CustomerInformation = React.lazy(() => import("./CustomerInformation"));


const CustomerApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/customer" element={<Customer />} />
        <Route path="/customers" element={<CustomerManagement />} />
        <Route path="/customer-information" element={<CustomerInformation />} />
      </Routes>
    </Suspense>
  );
};

export default CustomerApp;
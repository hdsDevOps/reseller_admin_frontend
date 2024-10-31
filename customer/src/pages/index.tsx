import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";


const Customer = React.lazy(() => import("./Customer"));


const CustomerApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/customer" element={<Customer />} />
      </Routes>
    </Suspense>
  );
};

export default CustomerApp;
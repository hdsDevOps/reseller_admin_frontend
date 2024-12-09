import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";


const Payment = React.lazy(() => import("./Payment"));
const BillingHistory = React.lazy(() => import("./BillingHistory"));


const PaymentApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/payment-method" element={<Payment />} />
        <Route path="/billing-history" element={<BillingHistory />} />
      </Routes>
    </Suspense>
  );
};

export default PaymentApp;
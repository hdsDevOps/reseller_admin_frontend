import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import BillingInvoice from "../components/BillingInvoice";
import { ToastContainer } from "react-toastify";


const Payment = React.lazy(() => import("./Payment"));
const BillingHistory = React.lazy(() => import("./BillingHistory"));


const PaymentApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ToastContainer />
      <Routes>
        <Route path="/payment-method" element={<Payment />} />
        <Route path="/billing-history" element={<BillingHistory />} />
        <Route path="/invoice" element={<BillingInvoice />} />
      </Routes>
    </Suspense>
  );
};

export default PaymentApp;
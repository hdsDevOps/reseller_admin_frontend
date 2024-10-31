import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";


const Voucher = React.lazy(() => import("./Voucher"));


const VoucherApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/voucher" element={<Voucher />} />
      </Routes>
    </Suspense>
  );
};

export default VoucherApp;
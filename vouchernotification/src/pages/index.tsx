import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NotificationTemplate from "./NotificationTemplate";


const VoucherList = React.lazy(() => import("./VoucherList"));
const CustomerGroup = React.lazy(() => import("./CustomerGroup"));
const AddCustomerGroup = React.lazy(() => import("./AddCustomerGroup"));
const EditCustomerGroup = React.lazy(() => import("./EditCustomerGroup"));
const AddVoucher = React.lazy(() => import("./AddVoucher"));
const EditVoucher = React.lazy(() => import("./EditVoucher"));


const VoucherApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/voucher-list" element={<VoucherList />} />
        <Route path="/customer-group" element={<CustomerGroup />} />
        <Route path="/add-customer-group" element={<AddCustomerGroup />} />
        <Route path="/edit-customer-group" element={<EditCustomerGroup />} />
        <Route path="/add-voucher" element={<AddVoucher />} />
        <Route path="/edit-voucher" element={<EditVoucher />} />
        <Route path="/notification-template" element={<NotificationTemplate />} />
      </Routes>
    </Suspense>
  );
};

export default VoucherApp;
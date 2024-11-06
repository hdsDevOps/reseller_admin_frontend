import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import GroupForm from '../components/GroupForm';
import VoucherForm from '../components/VoucherForm';
import NotificationTemplate from "./NotificationTemplate";


const Voucher = React.lazy(() => import("./Voucher"));
const CustomerGroup = React.lazy(() => import("./CustomerGroup"));


const VoucherApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/voucher-list" element={<Voucher />} />
        <Route path="/customer-group" element={<CustomerGroup />} />
        <Route path="/add-group" element={<GroupForm />} />
        <Route path="/add-voucher" element={<VoucherForm />} />
        <Route path="/notification-template" element={<NotificationTemplate />} />
      </Routes>
    </Suspense>
  );
};

export default VoucherApp;
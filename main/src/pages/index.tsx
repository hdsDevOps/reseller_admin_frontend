import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomerApp from "customer/CustomerApp";
import PaymentApp from "paymenthistory/PaymentApp";
import RoleApp from "role/RoleApp";
import SettingsApp from "settings/SettingsApp";
import SubscriptionApp from "subscription/SubscriptionApp";
import VoucherApp from "vouchernotification/VoucherApp";
// import DomainApp from "domains/DomainApp";

const Dashboard = React.lazy(() => import("./Dashboard"));

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Dashboard /> },
];

const MainApp: React.FC = () => (
  <div className="main-wrapper">
    <Header />
    <div
      className="flex flex-row mt-[94px]"
    >
      <Navbar />
      <div className="content-body p-6 flex flex-col min-h-screen">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
        <CustomerApp />
        <PaymentApp />
        <RoleApp />
        <SettingsApp />
        <SubscriptionApp />
        <VoucherApp />
        {/* <div
          className="sticky bottom-0"
        >
          <Footer />
        </div> */}
      </div>
    </div>
  </div>
);

export default MainApp;

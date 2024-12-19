import React, { useState } from "react";
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
    <div className="flex flex-row mt-[94px]">
      <Navbar />

      <div className="content-body md:p-6 p-1 pb-6 flex flex-col min-h-screen relative w-full">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
        <CustomerApp />
        <PaymentApp />
        
      
        <SubscriptionApp />
        
        <Footer />
      </div>
    </div>
  </div>
);

export default MainApp;

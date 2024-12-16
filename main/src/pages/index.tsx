import React from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomerApp from "customer/CustomerApp";

const Dashboard = React.lazy(() => import("./Dashboard"));
const About = React.lazy(() => import("./About"));

const routes = [
  
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/about", element: <About /> },
  { path: "/customer/*", element: <CustomerApp /> },
];

const MainApp: React.FC = () => (
  <div className="main-wrapper">
    <Navbar />
    <div className="content-body">
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
    <Footer />
  </div>
);

export default MainApp;

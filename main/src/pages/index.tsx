import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
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
      <div className="content-body p-6">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </div>
  </div>
);

export default MainApp;

import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";


const Role = React.lazy(() => import("./Role"));


const RoleApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/role" element={<Role />} />
      </Routes>
    </Suspense>
  );
};

export default RoleApp;
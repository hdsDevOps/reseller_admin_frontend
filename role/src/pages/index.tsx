import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";


const Role = React.lazy(() => import("./Role"));
const UserList = React.lazy(() => import("./UserList"));


const RoleApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/role" element={<Role />} />
        <Route path="/user-list" element={<UserList />} />
      </Routes>
    </Suspense>
  );
};

export default RoleApp;
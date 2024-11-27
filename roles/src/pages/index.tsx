import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Role = React.lazy(() => import("./Role"));
const UserList = React.lazy(() => import("./UserList"));
const AddRole = React.lazy(() => import("./AddRole"));
const EditRole = React.lazy(() => import("./EditRole"));


const RoleApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/role" element={<Role />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/add-role" element={<AddRole />} />
        <Route path="/edit-role" element={<EditRole />} />
      </Routes>
    </Suspense>
  );
};

export default RoleApp;
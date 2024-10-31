import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";


const Settings = React.lazy(() => import("./Settings"));


const SettingsApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
};

export default SettingsApp;
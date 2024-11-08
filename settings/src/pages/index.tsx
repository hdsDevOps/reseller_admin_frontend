import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";


const Settings = React.lazy(() => import("./Settings"));
const EmailLog = React.lazy(() => import("./EmailLog"));
const Faqs = React.lazy(() => import("./Faqs"));


const SettingsApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/email-log" element={<EmailLog />} />
        <Route path="/faqs" element={<Faqs />} />
      </Routes>
    </Suspense>
  );
};

export default SettingsApp;
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import CustomerAgreement from "../components/CustomerAgreement";
import TermsConditions from "../components/TermsConditions";
import PrivacyPolicy from "../components/PrivacyPolicy";
import ProfileSettings from "../components/ProfileSettings";


const Settings = React.lazy(() => import("./Settings"));


const SettingsApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/customer-agreement" element={<CustomerAgreement />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/admin-profile" element={<ProfileSettings />} />
      </Routes>
    </Suspense>
  );
};

export default SettingsApp;
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";


const EmailLog = React.lazy(() => import("./EmailLog"));
const Faqs = React.lazy(() => import("./Faqs"));
const CMS = React.lazy(() => import("./CMS"));
const CustomerAgreement = React.lazy(() => import("./CustomerAgreement"));
const PrivacyPolicy = React.lazy(() => import("./PrivacyPolicy"));
const TermsConditions = React.lazy(() => import("./TermsAndConditions"));
const ProfileSettings = React.lazy(() => import("./ProfileSettings"));
const EmailServices = React.lazy(() => import("./EmailServices"));


const SettingsApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/email-log" element={<EmailLog />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/cms" element={<CMS />} />
        <Route path="/customer-agreement" element={<CustomerAgreement />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/email-services" element={<EmailServices />} />
      </Routes>
    </Suspense>
  );
};

export default SettingsApp;
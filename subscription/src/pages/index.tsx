import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";


const Subscription = React.lazy(() => import("./Subscription"));
const PlanPriceSetup = React.lazy(() => import("./PlanPriceSetup"));
const AddPlanPriceSetup = React.lazy(() => import("./AddPlanPriceSetup"));
const GeminiSetup = React.lazy(() => import("./GeminiSetup"));


const SubscriptionApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/plan-and-price-setup" element={<PlanPriceSetup />} />
        <Route path="/add-plan-and-price-setup" element={<AddPlanPriceSetup />} />
        <Route path="/gemini-setup" element={<GeminiSetup />} />
      </Routes>
    </Suspense>
  );
};

export default SubscriptionApp;
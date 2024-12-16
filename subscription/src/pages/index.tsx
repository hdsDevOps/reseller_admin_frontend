import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";


const PlanPriceSetup = React.lazy(() => import("./PlanPriceSetup"));
const AddPlanPriceSetup = React.lazy(() => import("./AddPlanPriceSetup"));
const EditPlanPriceSetup = React.lazy(() => import("./EditPlanPriceSetup"));
const GeminiSetup = React.lazy(() => import("./GeminiSetup"));


const SubscriptionApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/plan-and-price-setup" element={<PlanPriceSetup />} />
        <Route path="/add-plan-and-price-setup" element={<AddPlanPriceSetup />} />
        <Route path="/edit-plan-and-price-setup" element={<EditPlanPriceSetup />} />
        <Route path="/gemini-setup" element={<GeminiSetup />} />
      </Routes>
    </Suspense>
  );
};

export default SubscriptionApp;
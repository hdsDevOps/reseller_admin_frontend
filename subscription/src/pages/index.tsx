import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import GeminiSetup from "./GeminiSetup";
import PlanPriceSetup from "./PlanPriceSetup";

const Subscription = React.lazy(() => import("./Subscription"));

const SubscriptionApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/plan-and-price-setup" element={<PlanPriceSetup />} />
        <Route path="/gemini-setup" element={<GeminiSetup />} />
      </Routes>
    </Suspense>
  );
};

export default SubscriptionApp;

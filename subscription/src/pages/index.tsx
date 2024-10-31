import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";


const Subscription = React.lazy(() => import("./Subscription"));


const SubscriptionApp: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </Suspense>
  );
};

export default SubscriptionApp;
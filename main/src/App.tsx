// src/index.tsx
import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {

  return (
    <Suspense fallback={<h2>Loading.....</h2>}>
      {token ? <MainApp /> : <AuthApp />}
    </Suspense>
  );
};

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");


const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <h2>Testing.....</h2>
  </React.StrictMode>
);




ReactDOM.render(
  <React.StrictMode>
   <h2>Testing.....</h2>
  </React.StrictMode>,
  rootElement
);

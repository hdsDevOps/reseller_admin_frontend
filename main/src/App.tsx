// src/index.tsx
import React from "react";
import ReactDOM from "react-dom";  // Import ReactDOM to render to the DOM
// Import your other necessary providers like ReduxProvider, BrowserRouter, etc.
import { BrowserRouter } from "react-router-dom";
// import { ReduxProvider } from './redux/store'; // Uncomment if using Redux

const App: React.FC = () => {
  return (
    <div>
      <h2>Loading.....</h2>
    </div>
  );
};

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
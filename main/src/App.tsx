// src/index.tsx
import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ReduxProvider from "store/ReduxProvider";
import UserAuth from "./hoc/UserAuth.hoc";
import MainApp from "./pages";
import AuthApp from "auth/AuthApp";
import { useAppDispatch, useAppSelector } from "store/hooks";
import "auth/AuthCss";
import { getUserAuthTokenFromLSThunk } from "store/user.thunk";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  // const token = "usy6767jshs688ytmbqa88654sgsgs5sgs6sgs6q";
  // const token = "";
  // console.log(token, 'token');
  

  useEffect(() => {
    const getUserAuthToken = async () => {
      try {
        const result = await dispatch(getUserAuthTokenFromLSThunk()).unwrap();
        if (result) {
          // console.log("Token fetched:", result);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    getUserAuthToken();
  }, [token, dispatch]);

  return (
    <Suspense fallback={<h2>Loading.....</h2>}>
      {token ? <MainApp /> : <AuthApp />}
    </Suspense>
  );
};

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider>
      <BrowserRouter>
        <UserAuth>
          <App />
        </UserAuth>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
  rootElement
);

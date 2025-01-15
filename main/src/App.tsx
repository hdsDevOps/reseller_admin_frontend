// src/index.tsx
import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, useNavigate } from "react-router-dom";
import ReduxProvider from "store/ReduxProvider";
import UserAuth from "./hoc/UserAuth.hoc";
import MainApp from "./pages";
import AuthApp from "auth/AuthApp";
import { useAppDispatch, useAppSelector } from "store/hooks";
import "auth/AuthCss";
import { getUserAuthTokenFromLSThunk, getUserIdFromLSThunk, getAdminDetailsThunk, getDefaultCurrencyThunk } from "store/user.thunk";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);
  // const token = "usy6767jshs688ytmbqa88654sgsgs5sgs6sgs6q";
  // const token = "";
  // console.log(token, 'token');
  const { userId } = useAppSelector((state) => state.auth);
  const { defaultCurrency } = useAppSelector((state) => state.auth);
  
  

  useEffect(() => {
    const getUserAuthToken = async () => {
      try {
        await dispatch(getUserAuthTokenFromLSThunk()).unwrap();
        await dispatch(getUserIdFromLSThunk()).unwrap();
      } catch (error) {
        // console.error("Error fetching token:", error);
        navigate('/login');
      }
    };

    getUserAuthToken();
  }, [token, dispatch, navigate]);

  useEffect(() => {
    const fetchUserDetails = async() => {
      if(token) {
        try {
          const getUserIdFromLocalStorage = await dispatch(getUserIdFromLSThunk()).unwrap();
          await dispatch(getAdminDetailsThunk({userid: getUserIdFromLocalStorage})).unwrap();
          await dispatch(getDefaultCurrencyThunk({userid: getUserIdFromLocalStorage})).unwrap();
        } catch (error) {
          //
        }
      }
    };

    fetchUserDetails();
  }, [userId, dispatch, navigate]);

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

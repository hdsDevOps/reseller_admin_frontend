// src/index.tsx
import React, { Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, useNavigate } from "react-router-dom";
import ReduxProvider from "store/ReduxProvider";
import UserAuth from "./hoc/UserAuth.hoc";
import MainApp from "./pages";
import AuthApp from "auth/AuthApp";
import { useAppDispatch, useAppSelector } from "store/hooks";
import "auth/AuthCss";
import { getUserAuthTokenFromLSThunk, getUserIdFromLSThunk, getAdminDetailsThunk, getDefaultCurrencyThunk, updateDefaultCurrencyThunk, removeUserAuthTokenFromLSThunk } from "store/user.thunk";
import { setUserDefaultCurrency, setUserDetails, setUserIdDetails } from "store/authSlice";
import { toast } from "react-toastify";

const flagList = [
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/european-flag.png?alt=media&token=bb4a2892-0544-4e13-81a6-88c3477a2a64', name: 'EUR', logo: '€',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/australia-flag.png?alt=media&token=5a2db638-131e-49c7-be83-d0c84db8d440', name: 'AUD', logo: 'A$',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/us-flag.png?alt=media&token=c8bc35ae-de58-4a91-bf00-05a3fc9dd85a', name: 'USD', logo: '$',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/nigeria-flag.png?alt=media&token=80438147-6c10-4b4b-8cf9-181c7c8ad4d2', name: 'NGN', logo: 'N₦',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/england-flag.png?alt=media&token=64f093ef-b2a9-4b35-b510-a5943039ae5c', name: 'GBP', logo: '£',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/canada-flag.png?alt=media&token=4f660f4d-0f72-495c-bad4-7b8681f1c936', name: 'CAD', logo: 'C$',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/India-flag.png?alt=media&token=2c9bf400-34b3-42ae-9f2b-1548c32d0345', name: 'INR', logo: '₹',},
];

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, userId, defaultCurrency, userDetails, rolePermissionsSlice } = useAppSelector((state) => state.auth);

  const [currency, setCurrency] = useState(defaultCurrency);
  // console.log("currency...", currency);
  
  const [showCurrency, setShowCurrency] = useState(false);
  const [newCurrency, setNewCurrency] = useState("USD");

  // console.log({userId, userDetails});
  // console.log("userDetails...", userDetails);
  console.log("rolePermissionsSlice...", rolePermissionsSlice);

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
    setCurrency(defaultCurrency);
  }, [defaultCurrency]);

  useEffect(() => {
    const getUserDefaultCurrency = async () => {
      try {
        const currencyDefault = await dispatch(getDefaultCurrencyThunk({userid: userId})).unwrap();
        // console.log("currencyDefault...", currencyDefault);
      } catch (error) {
        await dispatch(setUserDefaultCurrency("USD"));
      }
    }
    if(userId) {
      getUserDefaultCurrency();
    }
  }, [userId]);

  useEffect(() => {
    const fetchUserDetails = async() => {
      if(token) {
        try {
          const getUserIdFromLocalStorage = await dispatch(getUserIdFromLSThunk()).unwrap();
          // console.log("getUserIdFromLocalStorage...", getUserIdFromLocalStorage);
          // await dispatch(setUserIdDetails(getUserAuthTokenFromLSThunk));
          const userAdminDetails = await dispatch(getAdminDetailsThunk({userid: getUserIdFromLocalStorage})).unwrap();
          // console.log("userDetails...", userAdminDetails);
          // await dispatch(setUserDetails(userAdminDetails?.data));
        } catch (error) {
          //
        }
      }
    };

    fetchUserDetails();
  }, [userId, dispatch, navigate]);

  return (
    <Suspense fallback={<h2>Loading.....</h2>}>
      {
        token
        ? <MainApp />
        : <AuthApp />
      }
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

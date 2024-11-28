import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { authenticatedRoutes, unauthenticatedRoutes } from "../router";
import { getUserAuthTokenFromLSThunk } from "store/user.thunk";

interface UserAuthProps {
  children: React.ReactNode;
}

export default function UserAuth({ children }: UserAuthProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    //localStorage.clear();
    getUserAuthToken();
  }, [dispatch]);

  useEffect(() => {
    checkUserAuthStatus();
  }, [token, location.pathname]);

  const getUserAuthToken = async () => {
    try {
      const result = await dispatch(getUserAuthTokenFromLSThunk()).unwrap();
      if (result) {
        console.log("result", result);
      }
    } catch (error) {
      console.error("Error fetching token:", error);
      navigate("/login");
    }
  };

  const checkUserAuthStatus = () => {
    const currentPath = location.pathname;
    if (!token) {
      if (unauthenticatedRoutes.includes(currentPath)) {
        return; // Allow access to the unauthenticated page
      } else {
        navigate("/login"); // Redirect unauthenticated users to the login page
      }
    } else {
      if (authenticatedRoutes.includes(currentPath)) {
        return; // Allow access to authenticated paths
      } else if (!currentPath.startsWith("/dashboard")) {
        navigate("/dashboard"); // Redirect authenticated users to the dashboard
      }
    }
  };

  return <div>{children}</div>;
}

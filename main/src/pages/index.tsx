import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomerApp from "customer/CustomerApp";
import PaymentApp from "paymenthistory/PaymentApp";
import RoleApp from "role/RoleApp";
import SettingsApp from "settings/SettingsApp";
import SubscriptionApp from "subscription/SubscriptionApp";
import VoucherApp from "vouchernotification/VoucherApp";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAdminDetailsThunk, getRolesThunk, removeUserAuthTokenFromLSThunk } from "store/user.thunk";
import { setRolesPermissionsStatus } from "store/authSlice";
// import DomainApp from "domains/DomainApp";
import { motion } from "framer-motion";
import { BeatLoader } from "react-spinners";

const Dashboard = React.lazy(() => import("./Dashboard"));

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Dashboard /> },
];

const intitalPermissions = {
  dashboard: false,
  customer_management: {
      overall: false,
      add: false,
      edit: false,
      delete: false,
      login: false,
      authorization: false,
      send_mail: false,
      details: false,
      reset_password: false
  },
  voucher_management: {
      overall: false,
      customer_group: {
          overall: false,
          add: false,
          view: false,
          delete: false
      },
      voucher_list: {
          overall: false,
          send_mail: false,
          add: false,
          delete: false
      }
  },
  notification_template: {
      overall: false,
      add: false,
      preview: false,
      update: false,
      cancel: false,
      send_mail: false
  },
  subscription_master: {
      overall: false,
      plan_and_price_setup: {
          overall: false,
          add: false,
          edit: false,
          delete: false
      },
      gemini_setup: {
          overall: false,
          add: false,
          edit: false,
          delete: false
      }
  },
  payment_method: {
      overall: false,
      action: false
  },
  billing_history: {
      overall: false,
      download: false
  },
  faqs: {
      overall: false,
      add: false
  },
  email_log: {
      overall: false,
      view_details: false
  },
  role_management: {
      overall: false,
      user_list: {
          overall: false,
          add: false,
          edit: false,
          delete: false
      },
      role: {
          overall: false,
          add: false,
          edit: false,
          delete: false
      }
  },
  cms: {
      overall: false,
      view_details: false
  },
  settings: {
      overall: false,
      dashboard_widget: false,
      about: false,
      privacy_policy: false,
      terms_and_conditions: false,
      customer_agreement: false
  }
}

const MainApp: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const { navOpen, rolePermissionsSlice, userDetails, userId } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const adminDetails = async () => {
      try {
        await dispatch(getAdminDetailsThunk({userid: userId})).unwrap();
      } catch (error) {
        //
      }
    }

    adminDetails();
  }, [userId]);

  useEffect(() => {
    const getRole = async() => {
      try {
        const result = await dispatch(getRolesThunk({user_type: "", sortdata: { sort_text: "", order: "asc" }})).unwrap();
        const rolesList = result?.roles;
        if(rolesList?.length > 0) {
          const findUserRole = rolesList?.find(item => item?.id === userDetails?.role);
          if(findUserRole) {
            await dispatch(setRolesPermissionsStatus(findUserRole?.permission));
          } else {
            await dispatch(setRolesPermissionsStatus(intitalPermissions));
          }
        }
      } catch (error) {
        await dispatch(setRolesPermissionsStatus(intitalPermissions));
        if(error?.message == "Request failed with status code 401") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      }
    };

    getRole();
  }, [userDetails?.role]);

  return (
  <div className="main-wrapper">
    {
      rolePermissionsSlice?.dashboard
      ? (
        <>
          <Header />
            <div className="flex flex-row mt-[94px] relative">
              <Navbar />

              <ToastContainer />

              <div className={`absolute top-0 right-0 md:p-6 p-1 pb-6 flex flex-col min-h-screen ${width >= 769 ? navOpen ? "left-[300px]" : "left-[80px]" : "left-[80px]"}`}>
                <Routes>
                  {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                  ))}
                </Routes>
                <CustomerApp />
                <PaymentApp />
                <RoleApp />
                <SettingsApp />
                <SubscriptionApp />
                <VoucherApp />
                <Footer />
              </div>
            </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <BeatLoader color="#12A833" />
        </div>
      )
    }
  </div>
)};

export default MainApp;

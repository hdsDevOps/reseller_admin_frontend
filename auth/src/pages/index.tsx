import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";


const Login = React.lazy(() => import("./Login"));
const OTP = React.lazy(() => import("./OTP"));
const ForgotPassword = React.lazy(() => import("./ForgotPassword"));
const ResetPassword = React.lazy(() => import("./ResetPassword"));
const  PasswordResetSuccessful = React.lazy(() => import('./PasswordResetSuccessful'));


const AuthApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-white w-full">
      <Suspense fallback={<div>Loading...</div>}>
      <Toaster />
 
        <main className="flex items-center justify-center max-w-full">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/password-reset-successful" element={<PasswordResetSuccessful />} />
          </Routes>
        </main>
        {/* <Footer/> */}
      </Suspense>
    </div>
  );
};

export default AuthApp;
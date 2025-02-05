import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from "date-fns";

const logo = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/hordanso-fixed-logo.png?alt=media&token=ecd5d548-0aa7-46d4-9757-c24cba11693c";

const PasswordResetSuccessful: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("Your password has been reset! Please log in.");
  }, [])

  return (
    <div className="w-full flex flex-col justify-center items-center h-full xsm-max:px-1 font-inter pt-[50px]">
      <div className="w-full max-w-[32rem] bg-gray-50 p-12 rounded-3xl xsm-max:px-4">
        <div className="w-full">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <img
                src={logo}
                alt="logo"
                className="w-[108px] mb-[10px]"
              />
            </div>
            <h3 className="h3-text pt-4 mb-[100px]">
              Successful password reset!
            </h3>
          </div>
          <div
            className="w-full flex  items-start justify-center mb-[80px]"
          >
            <p
              className="text-center font-inter-16px-400 w-[430px]"
            >
              Now you can use your new password to log in to your account!
            </p>
          </div>
          <div className="max-w-[456px] mt-[25px]">
            <button
              onClick={() => navigate('/login')}
              data-testid="log-in"
              className="w-full h-11 btn-black"
            >
              Back to log in
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 mb-10 text-center">
        <p className="text-[#848484] text-xs font-normal mt-8">© {format(new Date(), "yyyy")} HORDANSO WORKSPACE. All rights reserved</p>
      </div>
    </div>
  );
};

export default PasswordResetSuccessful;

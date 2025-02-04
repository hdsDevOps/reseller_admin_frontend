import { MoveLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/styles.css'
import { forgetPasswordOtpThunk } from "store/user.thunk";
import { useAppDispatch } from "store/hooks";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    // Handle the login logic here
    try {
      const result = await dispatch(
        forgetPasswordOtpThunk({
          email: email
        })
      ).unwrap();
      console.log("result....", result);
      navigate("/otp", {state: { email: email }});
    } catch (error) {
      // console.error("Login error:", error);
      toast.error(error?.message || "Please enter valid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[570px]">
        <div className="px-[60px] xsm-max:px-4 bg-custom-white5 rounded-lg shadow-sm">
          <div className={`mb-5 flex items-center justify-center`}>
            <img
              src={"https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo.jpeg?alt=media&token=c210a6cb-a46f-462f-a00a-dfdff341e899"}
              alt="logo"
              className={`w-[108px]`}
            />
          </div>
          <div>
            <h3 className="h3-text">
              Forgot password?
            </h3>
            <p className="mt-2 text-left text-base text-custom-black">
              Enter the email address associated with your account and we’ll send
              you an OTP to reset your password.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="">
              <div className="space-y-1 w-full flex flex-col">
                <label
                  htmlFor="email-address"
                  className="login-label mb-[15px]"
                >
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="login-input"
                  placeholder="Robertclive@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="email"
                />
              </div>
            </div>

            <div className="max-w-[451px] mt-[25px]">
              <button
                type="submit"
                data-testid="log-in"
                className="w-full h-11 btn-black"
              >
                Next
              </button>
            </div>
          </form>

          <div
            className="text-center flex flex-row justify-center mt-8"
          >
            <button
              type="button"
              className="flex flex-row"
              onClick={() => navigate('/login')}
            >
              <MoveLeft
                className="w-2 pt-[2px]"
              />
              <p
                className="ml-2 font-inter font-semibold text-base"
              >Back to log in</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

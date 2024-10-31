import { MoveLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the login logic here
    navigate("/otp");
  };

  const onGoBackhandler = () => {
    navigate("/login"); // Replace '/login' with your login route path
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[570px]">
        <div className="px-[60px] xsm-max:px-4 bg-[#F9FAFB] rounded-lg shadow-sm">
          <div className={`mb-[20px] flex items-center justify-center`}>
            <img
              src={process.env.BASE_URL + "/images/logo.jpeg"}
              alt="logo"
              className={`w-[108px]`}
            />
          </div>
          <div>
            <h3 className="font-inter font-medium mb-4 text-[28px]">
              Forgot password?
            </h3>
            <p className="mt-2 text-left text-base text-[#151515]">
              Enter the email address associated with your account and we’ll send
              you an OTP to reset your password.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="">
              <div className="space-y-1 w-full flex flex-col">
                <label
                  htmlFor="email-address"
                  className="text-base font-bold text-black mb-[15px]"
                >
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full h-[52px] rounded-[8px] border px-[4px] py-[3.5px] text-gray-500 border-gray-300 font-inter text-base font-normal"
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
                className="w-full btn-green bg-black h-11 py-0.625 px-1.25 rounded-lg text-base font-semibold text-[#F0F0F3]"
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

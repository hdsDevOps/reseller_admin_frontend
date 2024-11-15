import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";
// import { makeUserLoginThunk } from "store/user.thunk";
import { RiInformation2Line } from "react-icons/ri";
import '../styles/styles.css'

const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if(password != confirmPassword){
      alert('Your passwords do not match');
    }
    else{
      navigate('/password-reset-successful')
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-full xsm-max:px-1 font-inter">
      <div className="w-full max-w-[32rem] bg-gray-50 p-12 rounded-3xl xsm-max:px-4">
        <div className="w-full">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <img
                src={"https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo.jpeg?alt=media&token=c210a6cb-a46f-462f-a00a-dfdff341e899"}
                alt="logo"
                className="w-[108px]"
              />
            </div>
            <h3 className="h3-text pt-4">
              Log in your account
            </h3>
            
          </div>
          <div className="mt-6">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col"
            >
              <div className="max-w-[456px] mt-4">
                <div
                  className="flex flex-row justify-between"
                >
                  <label className="login-label">
                    Password
                  </label>
                  <RiInformation2Line
                    className="w-[20px] h-[20px] text-[#12A833] mt-[3px] mr-[17px]"
                  />
                </div>
                <div className="my-[6px]">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                    }}
                    className="login-input"
                    minLength={8}
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="relative float-right mt-[-35px] mr-[15px]"
                  >
                    {showPassword ? (
                      <HiOutlineEye className="h-[25px] w-[25px]" aria-hidden="true" />
                    ) : (
                      <RiEyeCloseLine className="h-[25px] w-[25px]" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
              <div className="max-w-[456px] mt-4">
                <label className="login-label">
                  Confirm Password
                </label>
                <div className="my-[6px]">
                  <input
                    type={"password"}
                    value={confirmPassword}
                    onChange={e => {
                      setConfirmPassword(e.target.value);
                    }}
                    className="login-input"
                    minLength={8}
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>
              <div className="max-w-[456px] mt-[25px]">
                <button
                  type="submit"
                  data-testid="log-in"
                  className="w-full btn-black"
                >
                  Confirm Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-12 mb-10 text-center">
        <p className="text-[#848484] text-xs font-normal mt-8">© 2024 HORDANSO WORKSPACE. All rights reserved</p>
      </div>
    </div>
  );
};

export default ResetPassword;

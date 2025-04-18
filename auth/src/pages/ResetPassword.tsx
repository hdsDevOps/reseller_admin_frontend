import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";
import { forgetPasswordResetThunk } from "store/user.thunk";
import { RiInformation2Line } from "react-icons/ri";
import '../styles/styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MoveLeft } from "lucide-react";

const logo = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/hordanso-fixed-logo.png?alt=media&token=ecd5d548-0aa7-46d4-9757-c24cba11693c";

const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const email = location.state?.email;
  const otp = location.state?.otp;
  // console.log({email, otp});
  const [isHovered, setIsHovered] = useState<Boolean>(false);
  // console.log(isHovered);
  

  useEffect(() => {
    toast.success("OTP has been verified, please update your password!");
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if(password != confirmPassword){
      toast.warning("Password and confirm password do not match.")
    }
    else{
      try {
        const result = await dispatch(
          forgetPasswordResetThunk({
            email: email,
            otp: otp,
            newpassword: password
          })
        ).unwrap();
        if(result.message == 'Password reset successfully'){
          navigate('/password-reset-successful');
        }
        else{
          toast.error("Enter valid OTP!");
        }
      } catch (error) {
        // console.log("Error on otp");
        toast.error(error?.message || "Enter valid OTP!");
      }
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
                src={logo}
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
                  <div className="relative ml-auto">
                    <RiInformation2Line
                      className="w-[20px] h-[20px] text-[#12A833] mt-[3px] mr-[17px]"
                      onMouseEnter={() => {setIsHovered(true)}}
                      onMouseLeave={() => {setIsHovered(false)}}
                    />
                    {
                      isHovered && (
                        <div
                          className="absolute z-[9999] md:-ml-[120px] min-[380px]:-ml-[266px] -ml-[220px] w-full md:bottom-5 min-[380px]:-bottom-10 -bottom-12 md:-right-[5px] left-0"
                        >
                          <div className="relative min-[380px]:w-[244px] w-[200px] bg-[#12A833] bottom-5 font-inter font-medium text-xs text-white p-2 rounded-[10px]">Create a Strong Password to Keep Your Account Safe! But your password should be at least 8 characters long.</div>
                          <div
                            className="absolute bottom-0 ml-[126px] w-2 h-5 bg-[#12A833] md:block hidden"
                            style={{
                              clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                            }}
                          ></div>
                          <div
                            className="absolute min-[380px]:bottom-10 bottom-12 min-[380px]:ml-[250px] ml-[205px] w-2 h-5 bg-[#12A833] md:hidden block -rotate-90"
                            style={{
                              clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                            }}
                          ></div>
                        </div>
                      )
                    }
                  </div>
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
                    name="newPassword"
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
                    name="confirmPassword"
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

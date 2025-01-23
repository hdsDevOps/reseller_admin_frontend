import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { verifyUserOtpThunk, setUserAuthTokenToLSThunk, getUserAuthTokenFromLSThunk, resendUserOtpThunk, forgetPasswordVerifyOtpThunk, forgetPasswordResendOtpThunk, setUserIdToLSThunk, getUserIdFromLSThunk } from "store/user.thunk";
import { setTokenDetails } from "store/authSlice";
import { MoveLeft } from 'lucide-react';
import '../styles/styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OTP: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");
  const email = `${location.state != null ? location.state.email : ""}`;
  const adminId = location.state.adminId;
  // console.log("Admin Id...", adminId);
  const [isLoading, setIsLoading] = useState(false);
  
  const otpRefs = useRef([]);
  const [otpValues, SetOptValues] = useState(["", "", "", "", "", "",]);

  const [ time, setTime ] = useState(120);
  const [ seconds, setSeconds ] = useState(0);
  const [ minutes, setMinutes ] = useState(0);

  useEffect(() => {
    toast.success("OTP has been sent to your email!");
  }, [])
  

  useEffect(() => {
    if(time>0){
      setSeconds(time%60);
      setMinutes((parseInt(time/60)).toFixed(0));
      setTimeout(() => {
        setTime(time-1);
      }, 1000);
    }
    else{
      setSeconds(0);
      setMinutes(0);
      setTime(0);
    }
  }, [time]);

  useEffect(() => {
    otpRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    if(/^\d$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index - 1] = value;
      SetOptValues(newOtpValues);

      if(index < 6) {
        otpRefs.current[index]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if(e.key === "Backspace") {
      const newOtpValues = [...otpValues];
      newOtpValues[index - 1] = "";
      SetOptValues(newOtpValues);
      if(!otpValues[index - 1] && index > 1) {
        otpRefs.current[index - 2]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").slice(0, 6);

    if(/^\d{1,6}$/.test(pastedData)) {
      const newOtpValues = pastedData.split("");
      SetOptValues((prev) => 
        newOtpValues.concat(Array(6 - newOtpValues.length).fill("")).slice(0, 6)
      );

      newOtpValues.forEach((val, i) => {
        otpRefs.current[i].value = val;
      });

      const lastFilledIndex = newOtpValues.length - 1;
      if(lastFilledIndex < 6) {
        otpRefs.current[lastFilledIndex]?.focus();
      }
    }
  };

  const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otp = otpValues.join("");
    setIsLoading(true);

    if (otp.length === 6) {
      const isValidOtp = true;

      if (isValidOtp) {
        // if() {
          if (mode === "signin") {
            try {
              const result = await dispatch(
                verifyUserOtpThunk({
                  admin_id: adminId,
                  otp: otp
                })
              ).unwrap()
              if(result.message == 'Login successful'){
                try {
                  const setToken = await dispatch(setUserAuthTokenToLSThunk(result?.token)).unwrap();
                  //aXINQcCzh9z0WnNVXvt2
                  const setUserId = await dispatch(setUserIdToLSThunk(adminId)).unwrap();
                  // console.log({setToken, setUserId})
                  navigate('/dashboard', {state: {from: 'otp'}})
                } catch (error) {
                  console.log("Error on token")
                } finally {
                  try {
                    const getToken = await dispatch(getUserAuthTokenFromLSThunk()).unwrap();
                    const getUserId = await dispatch(getUserIdFromLSThunk()).unwrap();
                    navigate('/dashboard', {state: {from: 'otp'}})
                  } catch (error) {
                    console.log("Error on token")
                  }
                }
              }
              else{
                navigate('/login');
                setIsLoading(false);
              }
            } catch (error) {
              // console.log("Error on otp");
              toast.error("Enter valid OTP!");
              setIsLoading(false);
            }
          } else {
            try {
              const result = await dispatch(
                forgetPasswordVerifyOtpThunk({
                  email: email,
                  otp: otp
                })
              ).unwrap()
              if(result.message == 'OTP verified successfully'){
                navigate('/resetpassword', { state: { email: email, otp: otp } });
              }
              else{
                toast.error("Enter valid OTP!");
                setIsLoading(false);
              }
            } catch (error) {
              // console.log("Error on otp");
              toast.error("Enter valid OTP!");
              setIsLoading(false);
            }
          }
        // } else {
        //   toast.warning("Input fields cannot be empty.");
        // }
      } else {
        // alert("Invalid OTP. Please try again.");
        toast.error("Enter valid OTP!");
        setIsLoading(false);
      }
    } else {
      // alert("Please enter all 6 digits.");
      toast.warning("Please enter all 6 digits.");
      setIsLoading(false);
    }
  };

  const handleEditmail = () => {
    navigate("/forgotpassword");
  };

  const resendOtp = async() => {
    setTime(120);
    if(mode == "signin"){
      try {
        const otpResend = await dispatch(
          resendUserOtpThunk({
            admin_id: adminId
          })
        ).unwrap()
        toast.success("OTP has been resend to your email!");
      } catch (error) {
        console.log("Error sending otp")
        toast.error("OTP resending is failed!");
      }
    }
    else{
      try {
        const otpResend = await dispatch(
          forgetPasswordResendOtpThunk({
            email: email
          })
        ).unwrap();
        console.log("result...", otpResend)
        toast.success("OTP has been resend to your email!");
      } catch (error) {
        console.log("Error sending otp")
        toast.error("OTP resending is failed!");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[570px]">
        <div className="p-8 xsm-max:px-4 bg-[#F9FAFB] rounded-lg shadow-sm">
          <div
            className={`mb-[20px] flex items-center justify-center`}
          >
            <img
              src={"https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo.jpeg?alt=media&token=c210a6cb-a46f-462f-a00a-dfdff341e899"}
              alt="logo"
              className={`w-[108px]`}
            />
          </div>
          <h3 className="text-center h3-text mb-4">
            {mode === "signin" ? "Sign in your account" : "Verify your email"}
          </h3>
          <div
            className="w-full flex items-start justify-center"
          >
            <p
              className="text-center font-inter-16px-400 w-[430px]"
            >
              {
                mode === "signin" ? "Enter the six digit code we sent to your email address to verify your Hordanso account:" : `Enter the six digit code we sent to your email address to verify your Hordanso account:`
              }
              <div className="inline-block ml-[5px]">
                {/* <p dangerouslySetInnerHTML={{ __html: message }} /> */}
                {mode !== "signin" && (
                  <button
                    type="button"
                    onClick={() => handleEditmail()}
                    className="font-medium text-green-600 hover:text-gray-500"
                    data-testid="back-to-login"
                  >
                    Edit
                  </button>
                )}
              </div>
            </p>
          </div>
          <form onSubmit={handleLogin}
            className="flex flex-col w-full text-center"
          >
            <div className="flex justify-between mt-12 w-[451px]">
              <p className="text-md font-bold">OTP verification</p>
              <span className="text-red-600">{
                `0${minutes}:${
                  seconds<10 ? "0"+seconds : seconds
                }`
              }</span>
            </div>
            <div className="grid grid-cols-6 gap-2 mt-4 w-[451px]">
              {
                [1, 2, 3, 4, 5, 6].map((index) => (
                  <input
                  key={index}
                    type="text"
                    maxLength={1}
                    // ref={otp1Ref}
                    ref={(el) => (otpRefs.current[index - 1] = el)}
                    value={otpValues[index-1]}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                    placeholder="0"
                  />
                ))
              }
            </div>
            <div className="max-w-[451px] mt-[25px]">
              <button
                type="submit"
                data-testid="log-in"
                className={`w-full ${
                  mode === "signin" ? "btn-green" : "btn-black"
                } h-11`}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
            <div className="text-center mt-8 xsm-max:text-sm">
              <p>
                Didn't get an OTP?{" "}
                <button
                  type="button"
                  className={`${
                    time>0 ? 'text-[#858585]' : 'text-red-600 underline'
                  } ml-4`}
                  onClick={() => {
                    resendOtp()
                  }}
                  disabled={
                    time>0 ? true : false
                  }
                >
                  Resend OTP
                </button>{" "}
              </p>
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
  );
};

export default OTP;

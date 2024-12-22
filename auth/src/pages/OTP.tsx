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

  const otp1Ref = useRef<HTMLInputElement>(null);
  const otp2Ref = useRef<HTMLInputElement>(null);
  const otp3Ref = useRef<HTMLInputElement>(null);
  const otp4Ref = useRef<HTMLInputElement>(null);
  const otp5Ref = useRef<HTMLInputElement>(null);
  const otp6Ref = useRef<HTMLInputElement>(null);

  const [otp1, setOtp1] = useState<string>("");
  const [otp2, setOtp2] = useState<string>("");
  const [otp3, setOtp3] = useState<string>("");
  const [otp4, setOtp4] = useState<string>("");
  const [otp5, setOtp5] = useState<string>("");
  const [otp6, setOtp6] = useState<string>("");

  const [ time, setTime ] = useState(0);
  const [ seconds, setSeconds ] = useState(0);
  const [ minutes, setMinutes ] = useState(0);

  useEffect(() => {
    toast.success("Otp has been sent to your email!");
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
  }, [time])

  useEffect(() => {
    otp1Ref.current?.focus();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = (e.target as HTMLInputElement).value;
    if (/^\d$/.test(value)) {
      switch (index) {
        case 1:
          setOtp1(value);
          otp2Ref.current?.focus();
          break;
        case 2:
          setOtp2(value);
          otp3Ref.current?.focus();
          break;
        case 3:
          setOtp3(value);
          otp4Ref.current?.focus();
          break;
        case 4:
          setOtp4(value);
          otp5Ref.current?.focus();
          break;
        case 5:
          setOtp5(value);
          otp6Ref.current?.focus();
          break;
        case 6:
          setOtp6(value);
          break;
        default:
          break;
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      switch (index) {
        case 1:
          if (!otp1) {
            otp1Ref.current?.focus();
          } else {
            setOtp1("");
          }
          break;
        case 2:
          if (!otp2) {
            otp1Ref.current?.focus();
          } else {
            setOtp2("");
          }
          break;
        case 3:
          if (!otp3) {
            otp2Ref.current?.focus();
          } else {
            setOtp3("");
          }
          break;
        case 4:
          if (!otp4) {
            otp3Ref.current?.focus();
          } else {
            setOtp4("");
          }
          break;
        case 5:
          if (!otp5) {
            otp4Ref.current?.focus();
          } else {
            setOtp5("");
          }
          break;
        case 6:
          if (!otp6) {
            otp5Ref.current?.focus();
          } else {
            setOtp6("");
          }
          break;
        default:
          break;
      }
    }
  };

  const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;

    if (otp.length === 6) {
      const isValidOtp = true;

      if (isValidOtp) {
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
              navigate('/login')
            }
          } catch (error) {
            // console.log("Error on otp");
            toast.error("Enter valid otp!");
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
              toast.error("Enter valid otp!")
            }
          } catch (error) {
            // console.log("Error on otp");
            toast.error("Enter valid otp!");
          }
        }
      } else {
        // alert("Invalid OTP. Please try again.");
        toast.error("Enter valid otp!");
      }
    } else {
      // alert("Please enter all 6 digits.");
      toast.warning("Please enter all 6 digits.");
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
        toast.success("Otp has been resent to your email!");
      } catch (error) {
        console.log("Error sending otp")
        toast.error("Otp resending is failed!");
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
        toast.success("Otp has been resent to your email!");
      } catch (error) {
        console.log("Error sending otp")
        toast.error("Otp resending is failed!");
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
              <input
                type="text"
                maxLength={1}
                ref={otp1Ref}
                value={otp1}
                onChange={(e) => handleInputChange(e, 1)}
                onKeyDown={(e) => handleKeyDown(e, 1)}
                className="otp-input"
                placeholder="0"
                data-otp-index="0"
              />
              <input
                type="text"
                maxLength={1}
                ref={otp2Ref}
                value={otp2}
                onChange={(e) => handleInputChange(e, 2)}
                onKeyDown={(e) => handleKeyDown(e, 2)}
                className="otp-input"
                placeholder="0"
                data-otp-index="1"
              />
              <input
                type="text"
                maxLength={1}
                ref={otp3Ref}
                value={otp3}
                onChange={(e) => handleInputChange(e, 3)}
                onKeyDown={(e) => handleKeyDown(e, 3)}
                className="otp-input"
                placeholder="0"
                data-otp-index="2"
              />
              <input
                type="text"
                maxLength={1}
                ref={otp4Ref}
                value={otp4}
                onChange={(e) => handleInputChange(e, 4)}
                onKeyDown={(e) => handleKeyDown(e, 4)}
                className="otp-input"
                placeholder="0"
                data-otp-index="3"
              />
              <input
                type="text"
                maxLength={1}
                ref={otp5Ref}
                value={otp5}
                onChange={(e) => handleInputChange(e, 5)}
                onKeyDown={(e) => handleKeyDown(e, 5)}
                className="otp-input"
                placeholder="0"
                data-otp-index="4"
              />
              <input
                type="text"
                maxLength={1}
                ref={otp6Ref}
                value={otp6}
                onChange={(e) => handleInputChange(e, 6)}
                onKeyDown={(e) => handleKeyDown(e, 6)}
                className="otp-input"
                placeholder="0"
                data-otp-index="5"
              />
            </div>
            <div className="max-w-[451px] mt-[25px]">
              <button
                type="submit"
                data-testid="log-in"
                className={`w-full ${
                  mode === "signin" ? "btn-green" : "btn-black"
                } h-11`}
              >
                Submit
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

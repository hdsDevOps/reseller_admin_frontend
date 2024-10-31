import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
// import { makeUserLoginThunk } from "store/user.thunk";
import { setTokenDetails } from "store/authSlice";
import { MoveLeft } from 'lucide-react';

const OTP: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");

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

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;

    if (otp.length === 6) {
      const isValidOtp = true;

      if (isValidOtp) {
        if (mode === "signin") {
          dispatch(setTokenDetails("usy6767jshs688ytmbqa88654sgsgs5sgs6sgs6q"));
          navigate("/dashboard");
        } else {
          navigate("/resetpassword");
        }
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } else {
      alert("Please enter all 6 digits.");
    }
  };

  const handleEditmail = () => {
    navigate("/forgotpassword");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[570px]">
        <div className="p-8 xsm-max:px-4 bg-[#F9FAFB] rounded-lg shadow-sm">
          <div
            className={`mb-[20px] flex items-center justify-center`}
          >
            <img
              src={process.env.BASE_URL + "/images/logo.jpeg"}
              alt="logo"
              className={`w-[108px]`}
            />
          </div>
          <h3 className="text-center font-inter font-medium mb-4 text-[28px]">
            {mode === "signin" ? "Sign in your account" : "Verify your email"}
          </h3>
          <div
            className="w-full flex  items-start justify-center"
          >
            <p
              className="text-center font-inter font-normal text-[16px] w-[430px]"
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
                className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                placeholder="0"
              />
              <input
                type="text"
                maxLength={1}
                ref={otp2Ref}
                value={otp2}
                onChange={(e) => handleInputChange(e, 2)}
                onKeyDown={(e) => handleKeyDown(e, 2)}
                className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                placeholder="0"
              />
              <input
                type="text"
                maxLength={1}
                ref={otp3Ref}
                value={otp3}
                onChange={(e) => handleInputChange(e, 3)}
                onKeyDown={(e) => handleKeyDown(e, 3)}
                className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                placeholder="0"
              />
              <input
                type="text"
                maxLength={1}
                ref={otp4Ref}
                value={otp4}
                onChange={(e) => handleInputChange(e, 4)}
                onKeyDown={(e) => handleKeyDown(e, 4)}
                className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                placeholder="0"
              />
              <input
                type="text"
                maxLength={1}
                ref={otp5Ref}
                value={otp5}
                onChange={(e) => handleInputChange(e, 5)}
                onKeyDown={(e) => handleKeyDown(e, 5)}
                className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                placeholder="0"
              />
              <input
                type="text"
                maxLength={1}
                ref={otp6Ref}
                value={otp6}
                onChange={(e) => handleInputChange(e, 6)}
                onKeyDown={(e) => handleKeyDown(e, 6)}
                className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                placeholder="0"
              />
            </div>
            <div className="max-w-[451px] mt-[25px]">
              <button
                type="submit"
                data-testid="log-in"
                className={`w-full btn-green ${
                  mode === "signin" ? "bg-[#12A833]" : "bg-black"
                } h-11 py-0.625 px-1.25 rounded-lg text-base font-semibold text-[#F0F0F3]`}
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
                    setTime(120);
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

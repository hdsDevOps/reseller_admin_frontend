import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";

const OTP: React.FC = () => {
  const navigate = useNavigate();

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

  useEffect(() => {
    otp1Ref.current?.focus();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
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
      // Process the OTP login
      // Add your login logic here
    } else {
      // Add error handling logic here
    }
  };

  const onGoBackhandler = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="otp" className="sr-only">
                OTP Verification
              </label>
              <div className="flex justify-between">
                {[otp1Ref, otp2Ref, otp3Ref, otp4Ref, otp5Ref, otp6Ref].map((ref, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    ref={ref}
                    value={[otp1, otp2, otp3, otp4, otp5, otp6][index]}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, index + 1)
                    }
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                      handleKeyDown(e, index + 1)
                    }
                    className="appearance-none rounded-none relative block w-12 h-12 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-center"
                    data-testid={`otp-${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              data-testid="submit"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Didn't get an OTP?{" "}
            <Link
              to="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              data-testid="resend-otp"
            >
              Resend OTP
            </Link>{" "}
            <span className="text-gray-500">01:19</span>
          </p>
        </div>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={onGoBackhandler}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            data-testid="back-to-login"
          >
            ← Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTP;
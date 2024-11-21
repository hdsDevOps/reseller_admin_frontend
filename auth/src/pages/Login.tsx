import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";
import { makeUserLoginThunk } from "store/user.thunk";
import '../styles/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // navigate("/otp?mode=signin");

    try {
      const result = await dispatch(
        makeUserLoginThunk({
          email: email,
          password: password
        })
      ).unwrap();
      console.log("result....", result);
      navigate("/otp?mode=signin");
    } catch (error) {
      // console.error("Login error:", error);
      toast.error("Please enter valid email or password!");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-full xsm-max:px-1 font-inter">
      <ToastContainer />
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
              <div className="max-w-[456px]">
                <label
                  className="login-label"
                  htmlFor="formBasicEmail"
                >
                  Email
                </label>
                <div
                  className="my-[6px] w-full"
                >
                  <input
                    type="email"
                    id="formBasicEmail"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    data-testid="email"
                    required
                  />
                </div>
              </div>
              <div className="max-w-[456px] mt-4">
                <label className="login-label">
                  Password
                </label>
                <div className="my-[6px]">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
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
              <div className="mt-[25px] flex justify-between">
                <div className="flex-row-between w-32 pt-1.5">
                  <input
                    type="checkbox"
                    className="border border-[#545454] h-4 w-4"
                  />

                  <label
                    className="text-xs text-gray-900"
                  >
                    Keep me logged in
                  </label>
                </div>

                <div className="">
                  <Link
                    to="/forgotpassword"
                    className="text-xs font-normal text-custom-green"
                    data-testid="forgot-password"
                  >
                    Forgot Password
                  </Link>
                </div>
              </div>
              <div className="max-w-[456px] mt-[25px]">
                <button
                  type="submit"
                  data-testid="log-in"
                  className="w-full btn-green h-11"
                >
                  Log in
                </button>
              </div>
              <div className="text-center mt-8">
                <p className="text-sm font-medium text-gray-900">
                  By signing in, you agree to our{" "}
                  <button
                    type="button"
                    onClick={handleOpen}
                    className="text-green-600"
                    data-testid="terms-conditions"
                  >
                    Terms and conditions
                  </button>
                </p>
              </div>
            </form>
          </div>
          {show && (
            <div className="fixed-full-screen">
              <div className="fixed-popup max-w-xl w-full p-2">
                <div className="flex justify-between items-center pb-3">
                  <h1 className="h1-text">Terms of Services</h1>
                  <button onClick={handleClose} className="text-black">
                    <img
                      src={'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/close.png?alt=media&token=3fac7102-9ead-4bfa-a6f0-2c84d72260c6'}
                      alt="close"
                      className="w-[40px] h-[40px]"
                    />
                  </button>
                </div>
                <p
                  className="h-[500px] overflow-scroll overflow-x-hidden font-inter text-[14px] pr-1"
                >
                &nbsp;1. Introduction
                These Terms and Conditions ("Terms") govern your use of the design services provided by [Your Company Name] ("Company," "we," "us," or "our"). By using our design services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our design services.

                <br /><br />

                &nbsp;2. Intellectual Property Rights

                <br />

                2.1. Ownership: All design work, including but not limited to graphics, logos, illustrations, and layouts created by [Your Company Name] remains the intellectual property of [Your Company Name] until full payment is received.

                <br /><br />

                2.2. Usage Rights: Upon full payment, you are granted a non-exclusive, non-transferable license to use the design work for the intended purpose as agreed upon. This license does not grant you ownership of the design work, only the right to use it.

                <br /><br />

                2.3. Third-Party Elements: Any third-party elements, such as stock images or fonts, included in the design work may have separate licenses. It is your responsibility to comply with the terms of these licenses.

                <br /><br />

                &nbsp;3. Payment and Fees

                <br />

                3.1. Payment Terms: Payment terms will be outlined in the invoice provided. Full payment is required upon completion of the design work unless otherwise agreed upon in writing.

                <br /><br />

                3.2. Late Payments: Late payments may incur additional fees as specified in the invoice or agreed upon separately.

                <br /><br />

                &nbsp;4. Revisions and Modifications

                <br />

                4.1. Revisions: We offer a reasonable number of revisions to the design work as part of our service. The scope of revisions will be defined in the project agreement.

                <br /><br />

                4.2. Additional Revisions: Any additional revisions beyond the agreed-upon scope may incur extra charges.

                <br /><br />

                &nbsp;5. Use of Designs

                <br /><br />

                5.1. Permitted Use: The design work may be used for the specific purpose for which it was created and as described in the project agreement.

                <br /><br />

                5.2. Prohibited Use: You may not resell, redistribute, or use the design work for any other purpose without prior written consent from [Your Company Name].

                <br /><br />
                
                &nbsp;6. Confidentiality

                <br />

                6.1. Confidential Information: Any confidential information shared during the course of the project will be kept confidential and will not be disclosed to any third parties without your consent.

                <br /><br />
                
                &nbsp;7. Liability

                <br />

                7.1. No Warranty: The design work is provided "as is" without any warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability and fitness for a particular purpose.
                
                <br /><br />

                7.2. Limitation of Liability: In no event shall [Your Company Name] be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use or inability to use the design work.

                <br /><br />
                
                &nbsp;8. Termination
                
                <br />

                8.1. Termination by Client: You may terminate the project at any time by providing written notice. In such cases, you will be billed for any completed work and any expenses incurred up to the date of termination.

                <br /><br />
                
                8.2. Termination by Company: We reserve the right to terminate the project if you breach any of these Terms. In such cases, no refund will be provided.

                <br /><br />
                
                &nbsp;9. Governing Law

                <br />

                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction].

                <br /><br />
                
                &nbsp;10. Changes to Terms

                <br />

                We reserve the right to update these Terms from time to time. Any changes will be posted on our website, and it is your responsibility to review these Terms periodically.

                <br /><br />
                
                &nbsp;11. Contact Information

                <br />

                If you have any questions about these Terms, please contact us at [Your Contact Information].
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 mb-10 text-center">
        <p className="text-[#848484] text-xs font-normal mt-8">© 2024 HORDANSO WORKSPACE. All rights reserved</p>
      </div>

      {/* <div className="mt-6 mb-10 text-center">
        <p className="mb-3">Or</p>© 2024 HORDANSO WORKSPACE. All rights reserved
        <button
          type="button"
          className="flex items-center justify-center w-full px-4 py-[.7rem] border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google logo"
            className="h-5 w-5 mr-2"
          />
          <span className="text-gray-900 text-sm">Sign in with Google</span>
        </button>
      </div> */}
    </div>
  );
};

export default Login;

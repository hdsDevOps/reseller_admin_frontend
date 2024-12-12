import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { makeUserLoginThunk } from "store/user.thunk";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("biswajit@yopmail.com");
  const [password, setPassword] = useState("Admin@1234");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const result = await dispatch(
        makeUserLoginThunk({
          email: email,
          password: password,
          login_user_type: 0,
        })
      ).unwrap();
      console.log("result....", result);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Sign in your account</h3>
            <p className="text-gray-600">
              New to Hordanso?{" "}
              <Link to="/register" className="text-blue-500 hover:text-blue-700">
                Register Now 1111
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="password"
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                data-testid="log-in"
              >
                Log in
              </button>
              <Link
                to="/forgotpassword"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                data-testid="forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-xs">
                By signing in, you agree to our{" "}
                <button
                  onClick={() => setShowModal(true)}
                  className="text-blue-500 hover:text-blue-800"
                  data-testid="terms-conditions"
                >
                  Terms and conditions
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Terms of Services</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Woohoo, you are reading this text in a modal!
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";
// import { makeUserLoginThunk } from "store/user.thunk";
import { RiInformation2Line } from "react-icons/ri";
import '../styles/styles.css'

const PasswordResetSuccessful: React.FC = () => {
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
      navigate('/password-reset-success')
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-full xsm-max:px-1 font-inter pt-[50px]">
      <div className="w-full max-w-[32rem] bg-gray-50 p-12 rounded-3xl xsm-max:px-4">
        <div className="w-full">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <img
                src={process.env.BASE_URL + "/images/logo.jpeg"}
                alt="logo"
                className="w-[108px] mb-[10px]"
              />
            </div>
            <h3 className="h3-text pt-4 mb-[100px]">
              Successful password reset!
            </h3>
          </div>
          <div
            className="w-full flex  items-start justify-center mb-[80px]"
          >
            <p
              className="text-center font-inter-16px-400 w-[430px]"
            >
              Now you can use your new password to log in in to your account!
            </p>
          </div>
          <div className="max-w-[456px] mt-[25px]">
            <button
              onClick={() => navigate('/login')}
              data-testid="log-in"
              className="w-full h-11 btn-black"
            >
              Back to log in
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 mb-10 text-center">
        <p className="text-[#848484] text-xs font-normal mt-8">© 2024 HORDANSO WORKSPACE. All rights reserved</p>
      </div>
    </div>
  );
};

export default PasswordResetSuccessful;

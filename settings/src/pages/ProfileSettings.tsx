import React, { useEffect, useRef, useState } from 'react';
import '../styles/styles.css';
import { RiCameraFill } from "react-icons/ri";
import { X } from 'lucide-react';
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { updateAdminDetailsThunk, uploadImageThunk, removeUserAuthTokenFromLSThunk } from "store/user.thunk";
import { setUserDetails } from 'store/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function ProfileSettings() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userDetails, userId } = useAppSelector((state) => state.auth);
  // console.log("userDetails...", userDetails);
  const modalRef = useRef();

  const [modalShow, setModalShow] = useState(false);
  const [profile, setProfile] = useState(userDetails);
  const [cPassword, setCPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [showCPassword,setShowCPassword] = useState(false);
  
  const formList = [
    { label: 'First Name', placeholder: 'Enter first name', name: 'first_name', type: 'text',},
    { label: 'Last Name', placeholder: 'Enter last name', name: 'last_name', type: 'text',},
    { label: 'Email', placeholder: 'Enter email', name: 'email', type: 'email',},
    { label: 'Phone Number', placeholder: 'Enter phone number', name: 'phone', type: 'text',},
    { label: 'Street Address', placeholder: 'Enter street address', name: 'street_name', type: 'text',},
    { label: 'City', placeholder: 'Enter name of City', name: 'city', type: 'text',},
    { label: 'State', placeholder: 'Enter name of State', name: 'state_name', type: 'text',},
    { label: 'Country', placeholder: 'Enter name of Country', name: 'country', type: 'text',},
  ];

  useEffect(() => {
    setProfile(userDetails);
  }, [userDetails]);
  
  const updateProfile = e => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const submitProfile = async(e) => {
    e.preventDefault();
    try {
      if(cPassword !== "") {
        if(profile?.password === cPassword){
          const result = await dispatch(updateAdminDetailsThunk({
            userid: userId,
            first_name: profile?.first_name,
            last_name: profile?.last_name,
            email: profile?.email,
            phone: profile?.phone,
            password: cPassword,
            profile_pic: profile?.profile_pic,
            street_name: profile?.street_name,
            city: profile?.city,
            state_name: profile?.state_name,
            country: profile?.country
          })).unwrap();
          dispatch(setUserDetails(profile));
          toast.success(result?.message);
          setModalShow(false);
        } else {
          toast.warning("Password and confirm password do not match");
        }
      } else {
        const result = await dispatch(updateAdminDetailsThunk({
          userid: userId,
          first_name: profile?.first_name,
          last_name: profile?.last_name,
          email: profile?.email,
          phone: profile?.phone,
          profile_pic: profile?.profile_pic,
          street_name: profile?.street_name,
          city: profile?.city,
          state_name: profile?.state_name,
          country: profile?.country
        })).unwrap();
        dispatch(setUserDetails(profile));
        toast.success(result?.message);
        setModalShow(false);
      }
    } catch (error) {
      toast.error("Error updating profile");
      if(error?.message == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  const handleClickOutOfFilter = e => {
    if(modalRef.current && !modalRef.current.contains(e.target)){
      setModalShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutOfFilter);
    return() => {
      document.removeEventListener('mousedown', handleClickOutOfFilter);
    };
  }, []);

  const imageUpload = async(e) => {
    e.preventDefault();
    try {
      const result = await dispatch(uploadImageThunk({image: e.target.files[0]})).unwrap();
        toast.success("Profile image updated successfully");
        setProfile({
          ...profile,
          profile_pic: result?.url,
        });
        const updateProfile = await dispatch(updateAdminDetailsThunk({
          userid: userId,
          profile_pic: result?.url
        })).unwrap();
    } catch (error) {
      toast.error("Error uploading profile image");
      if(error?.message == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      dispatch(setUserDetails(profile));
    }
  };

  return (
    <div className='flex flex-col px-2 max-[400px]:px-0'>
      <ToastContainer />
      <h3
        className='h3-text-3'
      >Profile Settings</h3>

      <div
        className='p-4 mt-8 grid grid-col-3 max-w-[727px]'
      >
        <div
          className='col-span-2'
        >
          <div
            className='flex flex-col w-[93px]'
          >
            <img
              src={profile?.profile_pic}
              alt='Profile'
              className='border-[3px] border-white w-full h-[93px] rounded-full bg-custom-green'
            />
            <label
              htmlFor="file-upload"
              className="float-right ml-auto mt-[-20px] w-[29px] h-[29px] border border-custom-gray-2 rounded-full items-center bg-white cursor-pointer"
            >
              <RiCameraFill
                className='mx-auto my-auto mt-[5px] w-[20px] text-custom-green'
              />
              <input id="file-upload" type="file" className="hidden" name='image' onChange={e => {imageUpload(e)}} accept='image/*' />
            </label>
          </div>

          <div
            className='flex min-sm:flex-row max-sm:flex-col justify-between'
          >
            <div
              className='flex flex-col'
            >
              <h6 className='h6-text'>{userDetails?.first_name} {userDetails?.last_name}</h6>
              <p className='font-inter-14px-bold-cBlack7'>{userDetails?.role || "role"}</p>
            </div>
            <div
              className='transition-all my-auto flex justify-end'
            >
              <button
                className='btn-green-4 duration-500 ease-in-out'
                onClick={() => {
                  setModalShow(true);
                }}
              >Edit</button>
            </div>
          </div>

          <h6 className='h6-text-2 mt-10'>Basic Information</h6>

          <div
            className='grid grid-cols-2 gap-2 mt-1'
          >
            {
              formList.map((item, index) => {
                if(item.name == 'email' || item.name == 'phone'){
                  return(
                    <div
                      key={index}
                      className='flex flex-col col-span-2 my-1'
                    >
                      <label className='search-input-label'>{item.label}</label>
                      <input
                        type={item.type}
                        name={item.name}
                        placeholder={item.placeholder}
                        value={userDetails[item.name] || ""}
                        className='search-input-text'
                      />
                    </div>
                  )
                }
                else if(item.name == 'street_name' || item.name == "city" || item.name == 'state_name' || item.name == 'country'){
                  return(
                    <div
                      key={index}
                      className='flex flex-col sm:col-span-1 col-span-2 my-1'
                    >
                      <label className='search-input-label'>{item.label}</label>
                      <input
                        type={item.type}
                        name={item.name}
                        placeholder={item.placeholder}
                        value={userDetails[item.name] || ""}
                        className='search-input-text'
                      />
                    </div>
                  )
                }
                else{
                  return(
                    <div
                      key={index}
                      className='flex flex-col sm:col-span-1 col-span-6 my-2'
                    >
                      <label className='search-input-label'>{item.label}</label>
                      <input
                        type={item.type}
                        name={item.name}
                        placeholder={item.placeholder}
                        value={userDetails[item.name] || ""}
                        className='search-input-text'
                      />
                    </div>
                  )
                }
              })
            }
          </div>
        </div>
      </div>

      {
        modalShow && (
          <div className='fixed-full-screen'>
            <div
              className='fixed-popup p-10'
              ref={modalRef}
            >
              <div
                className='flex justify-between'
              >
                <h6 className='h6-text-2'>Basic Information</h6>
                <button
                  type='button'
                  onClick={() => {setModalShow(false)}}
                >
                  <X />
                </button>
              </div>

              <form
                onSubmit={submitProfile}
                className='grid grid-cols-1 gap-2 mt-1'
              >
                <div
                  className='grid grid-cols-2 gap-2 mt-1 max-h-[300px] overflow-y-scroll'
                >
                  {
                    formList.map((item, index) => {
                      if(item.name == 'email' || item.name == 'phone'){
                        return(
                          <div
                            key={index}
                            className='flex flex-col col-span-2 my-1'
                          >
                            <label className='search-input-label'>{item.label}</label>
                            <input
                              type={item.type}
                              name={item.name}
                              placeholder={item.placeholder}
                              defaultValue={profile[item.name] || ""}
                              className='search-input-text'
                              onChange={updateProfile}
                              required
                            />
                          </div>
                        )
                      }
                      else if(item.name == 'street_name' || item.name == "city" || item.name == 'state_name' || item.name == 'country'){
                        return(
                          <div
                            key={index}
                            className='flex flex-col sm:col-span-1 col-span-2 my-1'
                          >
                            <label className='search-input-label'>{item.label}</label>
                            <input
                              type={item.type}
                              name={item.name}
                              placeholder={item.placeholder}
                              defaultValue={profile[item.name] || ""}
                              className='search-input-text'
                              onChange={updateProfile}
                              required
                            />
                          </div>
                        )
                      }
                      else{
                        return(
                          <div
                            key={index}
                            className='flex flex-col sm:col-span-1 col-span-2 my-1'
                          >
                            <label className='search-input-label'>{item.label}</label>
                            <input
                              type={item.type}
                              name={item.name}
                              placeholder={item.placeholder}
                              defaultValue={profile[item.name] || ""}
                              className='search-input-text'
                              onChange={updateProfile}
                              required
                            />
                          </div>
                        )
                      }
                    })
                  }

                  <div
                    className='flex flex-col sm:col-span-1 col-span-2 my-1'
                  >
                    <label className='search-input-label'>Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      onChange={updateProfile}
                      className="search-input-text"
                      minLength={8}
                      placeholder="Enter password"
                      name='password'
                    />
                    <button
                      type="button"
                      onClick={() => { setShowPassword(!showPassword) }}
                      className="relative float-right mt-[-35px] mr-[15px] ml-auto"
                    >
                      {showPassword ? (
                        <HiOutlineEye className="h-[25px] w-[25px]" aria-hidden="true" />
                      ) : (
                        <RiEyeCloseLine className="h-[25px] w-[25px]" aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  <div
                    className='flex flex-col sm:col-span-1 col-span-2 my-1'
                  >
                    <label className='search-input-label'>Confirm Password</label>
                    <input
                      type={showCPassword ? "text" : "password"}
                      name='cPassword'
                      placeholder='Enter password'
                      onChange={e => {setCPassword(e.target.value)}}
                      minLength={8}
                      className='search-input-text'
                    />
                    <button
                      type="button"
                      onClick={() => { setShowCPassword(!showCPassword) }}
                      className="relative float-right mt-[-35px] mr-[15px] ml-auto"
                    >
                      {showCPassword ? (
                        <HiOutlineEye className="h-[25px] w-[25px]" aria-hidden="true" />
                      ) : (
                        <RiEyeCloseLine className="h-[25px] w-[25px]" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  className='btn-green w-[104px] max-sm:mx-auto mt-2'
                  type='submit'
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        )
      }
    </div>
  )
};

export default ProfileSettings;
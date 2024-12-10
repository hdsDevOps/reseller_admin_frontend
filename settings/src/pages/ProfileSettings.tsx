import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import { RiCameraFill } from "react-icons/ri";
import { X } from 'lucide-react';
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";
import { useAppSelector } from 'store/hooks';

function ProfileSettings() {
  const { userDetails } = useAppSelector((state) => state.auth);
  console.log("userDetails...", userDetails);

  const [modalShow, setModalShow] = useState(false);
  const [profile, setProfile] = useState(userDetails);
  const [cPassword, setCPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [showCPassword,setShowCPassword] = useState(false);
  const formList = [
    { label: 'First Name', placeholder: 'Enter first name', name: 'first_name', type: 'text',},
    { label: 'Last Name', placeholder: 'Enter last name', name: 'last_name', type: 'text',},
    { label: 'Email', placeholder: 'Enter email', name: 'email', type: 'email',},
    { label: 'Phone Number', placeholder: 'Enter phone number', name: 'phone', type: 'number',},
    { label: 'Address', placeholder: 'Enter address', name: 'address', type: 'text',},
    { label: 'State/City', placeholder: 'Enter State/City', name: 'state', type: 'text',},
    { label: 'Country', placeholder: 'Enter Country', name: 'country', type: 'text',},
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

  const submitProfile = e => {
    e.preventDefault();
    setModalShow(false);
  };
  return (
    <div className='flex flex-col px-2 max-[400px]:px-0'>
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
              src={userDetails?.image || ""}
              alt='Profile'
              className='border-[3px] border-white w-full h-[93px] rounded-full bg-custom-green'
            />
            {/* <button
              type='button'
              className='f'
            >
              <RiCameraFill
                className='mx-auto w-[20px] text-custom-green'
              />
            </button> */}
            <label
              htmlFor="file-upload"
              className="float-right ml-auto mt-[-20px] w-[29px] h-[29px] border border-custom-gray-2 rounded-full items-center bg-white cursor-pointer"
            >
              <RiCameraFill
                className='mx-auto my-auto mt-[5px] w-[20px] text-custom-green'
              />
              <input id="file-upload" type="file" className="hidden" name='image' />
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
            className='grid grid-cols-6 gap-2 mt-1'
          >
            {
              formList.map((item, index) => {
                if(item.name == 'email' || item.name == 'phone'){
                  return(
                    <div
                      key={index}
                      className='flex flex-col col-span-6 my-1'
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
                else if(item.name == 'address' || item.name == 'state' || item.name == 'country'){
                  return(
                    <div
                      key={index}
                      className='flex flex-col sm:col-span-2 col-span-6 my-1'
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
                      className='flex flex-col sm:col-span-3 col-span-6 my-1'
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
            >
              <div
                className='float-right'
              >
                <button
                  type='button'
                  onClick={() => {setModalShow(false)}}
                >
                  <X />
                </button>
              </div>

              <div
                className='flex flex-col w-[93px]'
              >
                <img
                  src={profile?.image}
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
                  <input id="file-upload" type="file" className="hidden" name='image' />
                </label>
              </div>

              <div
                className='flex min-sm:flex-row max-sm:flex-col justify-between'
              >
                <div
                  className='flex flex-col'
                >
                  <h6 className='h6-text'>{profile?.first_name} {profile?.last_name}</h6>
                  <p className='font-inter-14px-bold-cBlack7'>{profile?.role}</p>
                </div>
              </div>

              <h6 className='h6-text-2 mt-10'>Basic Information</h6>

              <form
                onSubmit={submitProfile}
                className='grid grid-cols-6 gap-2 mt-1 max-h-[400px] max-sm:overflow-y-scroll'
              >
                {
                  formList.map((item, index) => {
                    if(item.name == 'email' || item.name == 'phone'){
                      return(
                        <div
                          key={index}
                          className='flex flex-col col-span-6 my-1'
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
                    else if(item.name == 'address' || item.name == 'state' || item.name == 'country'){
                      return(
                        <div
                          key={index}
                          className='flex flex-col sm:col-span-2 col-span-6 my-1'
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
                          className='flex flex-col sm:col-span-3 col-span-6 my-1'
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
                  className='flex flex-col sm:col-span-3 col-span-6 my-1'
                >
                  <label className='search-input-label'>Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    defaultValue={profile?.password}
                    onChange={updateProfile}
                    className="search-input-text"
                    minLength={8}
                    placeholder="Enter password"
                    required
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
                  className='flex flex-col sm:col-span-3 col-span-6 my-1'
                >
                  <label className='search-input-label'>Confirm Password</label>
                  <input
                    type={showCPassword ? "text" : "password"}
                    name='cPassword'
                    placeholder='Enter password'
                    defaultValue={cPassword}
                    onChange={e => {setCPassword(e.target.value)}}
                    minLength={8}
                    required
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

                <button
                  className='btn-green w-[104px] col-span-6 max-sm:mx-auto mt-2'
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
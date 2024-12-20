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
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function ProfileSettings() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userDetails, userId } = useAppSelector((state) => state.auth);
  console.log("userDetails...", userDetails);
  const modalRef = useRef();

  const [modalShow, setModalShow] = useState(false);
  const [profile, setProfile] = useState(userDetails);
  const [cPassword, setCPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [showCPassword,setShowCPassword] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [image, setImage] = useState(null);
  // console.log("image...", image);
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCitites] = useState([]);
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  const [city, setCity] = useState({});
  // console.log({country, state, city});
  console.log("countries...", countries);
  // console.log("states...", states);
  // console.log("cities...", cities);
  // console.log({countryName, stateName, cityName});
  
  const [crop, setCrop] = useState<Crop>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    unit: '%',
  });
  const [zoom, setZoom] = useState(1);
  const imgRef = useRef(null);
  // console.log("imgRef", imgRef);
  
  const [selectedOption, setSelectedOption] = useState<{
    name: string;
    dial_code: string;
    code: string;
  } | { name: "United States", dial_code: '+1', code: "US" }>({ name: "United States", dial_code: '+1', code: "US" });

  useEffect(() => {
    if(country?.iso2 != undefined){
      
      setSelectedOption({ name: country?.name, dial_code: `+${country?.phonecode}`, code: country?.iso2 });
    }
    else{
      setSelectedOption({ name: "United States", dial_code: '+1', code: "US" });
    }
  }, [profile?.country]);

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

  const handlePhoneChange = (value: string) => {
    setProfile((prevData) => ({ ...prevData, phone: value }));
  };

  const showImage = () => {
    const file = image;
    if(file){
      if(file instanceof File){
        const reader = new FileReader();
        reader.onload = () => {
          if (imgRef.current) {
            imgRef.current.src = reader.result;
          }
        };
        reader.readAsDataURL(file);
      }
      else if(typeof file === 'string'){
        if (imgRef.current) {
          imgRef.current.src = file;
        }
      }
    }
  };

  useEffect(() => {
    showImage();
  }, [image]);

  const handleZoomChange = (e) => {
    setZoom(Number(e.target.value)); // Update zoom state
  };
  
  const updateProfile = e => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const submitProfile = async(e) => {
    e.preventDefault();
    if(
      profile?.first_name === "" || profile?.first_name.trim() === "" ||
      profile?.last_name === "" || profile?.last_name.trim() === "" ||
      profile?.email === "" || profile?.email.trim() === "" ||
      profile?.phone === "" || profile?.phone.trim() === "" ||
      profile?.street_name === "" || profile?.street_name.trim() === "" ||
      profile?.country === "" || profile?.country.trim() === ""
    ) {
      toast.warning("Please fill the fields.");
    } else if(states.length > 0 && profile?.state_name === "" && profile?.state_name.trim() === "") {
      toast.warning("Please fill the fields.");
    } else if(cities.length > 0 && profile?.city === "" && profile?.city.trim() === "") {
      toast.warning("Please fill the fields.");
    } else {
      try {
        if(cPassword !== "" && cPassword.trim() !== "") {
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

  const handleEditProfileClose = () => {
    setModalShow(false);
    setCountryName("");
    setStateName("");
    setCityName("");
  }

  const imageUpload = async(e) => {
    e.preventDefault();
    if(image === null) {
      const defaultImageURL = userDetails?.profile_pic;
      // const defaultImageURL = 'http://localhost:3000/images/logo.jpeg'

      const response = await fetch(defaultImageURL);
      const blob = await response.blob();
      const imageFile = new Image();
      imageFile.src = URL.createObjectURL(blob);
      await new Promise((resolve) => {
        imageFile.onload = resolve;
      });
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const scale = zoom;
        const naturalWidth = imageFile.naturalWidth;
        const naturalHeight = imageFile.naturalHeight;
        const width = naturalWidth * scale;
        const height = naturalHeight * scale;
        
        canvas.width = 300;
        canvas.height = 300;

        const offsetX = (300 - width) / 2;
        const offsetY = (300 - height) / 2;

        ctx?.clearRect(0, 0, 300, 300);
        ctx.drawImage(imageFile, offsetX, offsetY, width, height);
        
        canvas.toBlob(async (blob) => {
          if (!blob) {
            return;
          } else {
            const file = new File([blob], "resized-image.png", {type: 'image/png'});
            const result = await dispatch(uploadImageThunk({image: file})).unwrap();
            toast.success("Profile image updated successfully");
            setProfile({
              ...profile,
              profile_pic: result?.url,
            });
            const updateProfile = await dispatch(updateAdminDetailsThunk({
              userid: userId,
              profile_pic: result?.url
            })).unwrap();
          }
        })
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
        setImageModal(false);
        setImage(null);
        setZoom(1);
      }
    } else {
      try {
        const imageFile = imgRef.current;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const scale = zoom;
        const naturalWidth = imageFile.naturalWidth;
        const naturalHeight = imageFile.naturalHeight;
        const width = naturalWidth * scale;
        const height = naturalHeight * scale;
        
        canvas.width = 300;
        canvas.height = 300;

        const offsetX = (300 - width) / 2;
        const offsetY = (300 - height) / 2;

        ctx?.clearRect(0, 0, 300, 300);
        ctx.drawImage(imageFile, offsetX, offsetY, width, height);
        
        canvas.toBlob(async (blob) => {
          if (!blob) {
            return;
          } else {
            const file = new File([blob], "resized-image.png", {type: 'image/png'});
            const result = await dispatch(uploadImageThunk({image: file})).unwrap();
            toast.success("Profile image updated successfully");
            setProfile({
              ...profile,
              profile_pic: result?.url,
            });
            const updateProfile = await dispatch(updateAdminDetailsThunk({
              userid: userId,
              profile_pic: result?.url
            })).unwrap();
          }
        })
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
        setImageModal(false);
        setImage(null);
        setZoom(1);
      }
    }
  };

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://api.countrystatecity.in/v1/countries',
      headers: {
        'X-CSCAPI-KEY': 'Nk5BN011UlE5QXZ6eXc1c05Id3VsSmVwMlhIWWNwYm41S1NRTmJHMA=='
      }
    };
    axios(config)
      .then(res => {
        setCountries(res.data);
        // console.log(res.data);
      })
      .catch(err => {
        setCountries([]);
        console.log("error...", err);
      })
  }, []);
  
  useEffect(() => {
    if(country?.iso2 !== undefined) {
      var config = {
        method: 'get',
        url: `https://api.countrystatecity.in/v1/countries/${country?.iso2}/states`,
        headers: {
          'X-CSCAPI-KEY': 'Nk5BN011UlE5QXZ6eXc1c05Id3VsSmVwMlhIWWNwYm41S1NRTmJHMA=='
        }
      };
      axios(config)
      .then(res => {
        setStates(res.data);
      })
      .catch(err => {
        setStates([]);
        console.log("error...", err);
      })
    } else {
      setStates([]);
    }
  }, [country]);
  
  useEffect(() => {
    if(country?.iso2 !== undefined && state?.iso2 !== undefined) {
      var config = {
        method: 'get',
        url: `https://api.countrystatecity.in/v1/countries/${country?.iso2}/states/${state?.iso2}/cities`,
        headers: {
          'X-CSCAPI-KEY': 'Nk5BN011UlE5QXZ6eXc1c05Id3VsSmVwMlhIWWNwYm41S1NRTmJHMA=='
        }
      };
      axios(config)
      .then(res => {
        setCitites(res.data);
      })
      .catch(err => {
        setCitites([]);
        console.log("error...", err);
      })
    } else {
      setCitites([]);
    }
  }, [country, state]);

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
              className={`border-[3px] ${profile?.profile_pic ? "border-custom-green" : "border-white"} w-full h-full min-h-[93px] rounded-full bg-custom-green object-cover`}
            />
            <label
              className="float-right ml-auto mt-[-20px] w-[29px] h-[29px] border border-custom-gray-2 rounded-full items-center bg-white cursor-pointer"
              onClick={() => {setImageModal(true)}}
            >
              <RiCameraFill
                className='mx-auto my-auto mt-[5px] w-[20px] text-custom-green'
              />
              {/* <input id="file-upload" type="file" className="hidden" name='image' onChange={e => {imageUpload(e)}} accept='image/*' /> */}
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
                } else if(item.name == 'street_name' || item.name == "city" || item.name == 'state_name' || item.name == 'country'){
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
                } else{
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
                  onClick={handleEditProfileClose}
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
                      if(item.name == 'email'){
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
                      } else if(item.name == 'phone'){
                        return(
                          <div
                            key={index}
                            className='flex flex-col col-span-2 mb-2'
                          >
                            <label
                              className='search-input-label'
                            >{item.label}</label>
                            <PhoneInput
                              country={selectedOption?.code?.toLowerCase()}
                              onChange={handlePhoneChange}
                              value={profile?.phone}
                              placeholder='00000-00000'
                              inputProps={{
                                required: true,
                                name: 'phone'
                              }}
                              containerClass='min-w-full border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] items-center'
                              inputClass="react-tel-input outline-none !w-full bord !border-0 !h-full"
                              dropdownClass="peer"
                              buttonClass="!border-0 !h-full !w-[40px]"
                            />
                          </div>
                        )
                      } else if(item.name == 'country'){
                        return(
                          <div
                            key={index}
                            className='flex flex-col sm:col-span-1 col-span-2 my-1 relative'
                          >
                            <label
                              className='search-input-label'
                            >{item.label}</label>
                            <input
                              className='search-input-text relative focus:outline-none w-full h-full p-0'
                              type='text'
                              placeholder={item?.placeholder}
                              name='country'
                              onChange={e => {
                                setProfile({
                                  ...profile,
                                  country: '',
                                  state_name: '',
                                  city: ''
                                });
                                setCountryName(e.target.value);
                                setStateName("");
                                setCityName("");
                                setCountry({});
                                setState({});
                                setCity({});
                              }}
                              value={profile?.country || countryName}
                              required
                            />
                            {
                              countryName?.length>2 && (
                                <div className='w-full max-h-32 absolute mt-14 bg-white overflow-y-auto z-[100] px-2'>
                                  {
                                    countries?.filter(name => name?.name.toLowerCase().includes(countryName.toLowerCase())).map((country, idx) => (
                                      <p
                                        key={idx}
                                        className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                        dropdown-name="country-dropdown"
                                        onClick={() => {
                                          setProfile({
                                            ...profile,
                                            country: country?.name
                                          });
                                          setCountryName("");
                                          setStateName("");
                                          setCityName("");
                                          setCountry(country);
                                          setState({});
                                          setCity({});
                                        }}
                                      >{country?.name}</p>
                                    ))
                                  }
                                </div>
                              )
                            }
                          </div>
                        )
                      } else if(item.name == 'state_name'){
                        return(
                          <div
                            key={index}
                            className='flex flex-col sm:col-span-1 col-span-2 my-1 relative'
                          >
                            <label
                              className='search-input-label'
                            >{item.label}</label>
                            <input
                              type='text'
                              className='search-input-text focus:outline-none w-full h-full p-0'
                              placeholder={item?.placeholder}
                              name='state_name'
                              onChange={e => {
                                setProfile({
                                  ...profile,
                                  state_name: "",
                                  city: ""
                                });
                                setStateName(e.target.value);
                                setCityName("");
                                setState({});
                                setCity({});
                              }}
                              value={profile?.state_name || stateName}
                              required={states?.length > 0 ? true : false}
                            />
                            {
                              stateName?.length>2 && (
                                <div className='w-full max-h-32 absolute mt-14 bg-white overflow-y-auto z-[100] px-2'>
                                  {
                                    states?.filter(name => name?.name.toLowerCase().includes(stateName.toLowerCase())).map((region, idx) => (
                                      <p
                                        key={idx}
                                        className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                        onClick={() => {
                                          setProfile({
                                            ...profile,
                                            state_name: region?.name,
                                            city: ""
                                          });
                                          setStateName("");
                                          setCityName("");
                                          setState(region);
                                          setCity({});
                                        }}
                                      >{region?.name}</p>
                                    ))
                                  }
                                </div>
                              )
                            }
                          </div>
                        )
                      } else if(item.name == 'city'){
                        return(
                          <div
                            key={index}
                            className='flex flex-col sm:col-span-1 col-span-2 my-1 relative'
                          >
                            <label
                              className='search-input-label'
                            >{item.label}</label>
                            <input
                              type='text'
                              className='search-input-text focus:outline-none w-full h-full p-0'
                              placeholder={item?.placeholder}
                              name='city'
                              onChange={e => {
                                setProfile({
                                  ...profile,
                                  city: ''
                                });
                                setCityName(e.target.value);
                                setCity({});
                              }}
                              value={profile?.city || cityName}
                              required={cities?.length > 0 ? true : false}
                            />
                            {
                              cityName?.length>2 && (
                                <div className='w-full max-h-32 absolute mt-14 bg-white overflow-y-auto z-[100] px-2'>
                                  {
                                    cities?.filter(name => name?.name.toLowerCase().includes(cityName.toLowerCase())).map((city_name, idx) => (
                                      <p
                                        key={idx}
                                        className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                        onClick={() => {
                                          setProfile({
                                            ...profile,
                                            city: city_name?.name
                                          });
                                          setCityName("");
                                          setCity(city_name);
                                        }}
                                      >{city_name?.name}</p>
                                    ))
                                  }
                                </div>
                              )
                            }
                          </div>
                        )
                      } else{
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

      <Dialog
        open={imageModal}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {
          setImageModal(false);
          setImage(null);
          setZoom(1);
        }}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen mt-16">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-[1053px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-between items-center mb-6">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900"
                >Edit about us</DialogTitle>
                <div className='btn-close-bg'>
                  <button
                    type='button'
                    className='text-3xl rotate-45 mt-[-8px] text-white'
                    onClick={() => {
                      setImageModal(false);
                      setImage(null);
                      setZoom(1);
                    }}
                  >+</button>
                </div>
              </div>
              <form
                className="grid grid-cols-1 max-h-[400px]"
                onSubmit={imageUpload}
              >
                <div className="flex flex-col justify-center items-center">
                  <div className="relative items-center w-[300px] [300px] border">
                    <ReactCrop
                      // crop={crop}
                      onChange={(newCrop) => { setCrop(newCrop) }}
                      className='w-[300px] h-[300px] relative overflow-hidden'
                    >
                      <img
                        ref={imgRef}
                        src={image === null ? profile?.profile_pic : image}
                        alt='profile picture'
                        className={`absolute top-0 left-0 transform scale-[${zoom}] duration-200 ease-in-out w-full h-full`}
                      />
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-full h-full rounded-full bg-transparent z-10' style={{boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)'}}></div>
                        {/* <div className='absolute inset-0 bg-black opacity-50 mix-blend-darken pointer-events-none'></div> */}
                      </div>
                    </ReactCrop>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="file-upload"
                    className="float-right ml-auto mt-[-20px] w-[29px] h-[29px] border border-custom-gray-2 rounded-full items-center bg-white cursor-pointer"
                  >
                    <RiCameraFill
                      className='mx-auto my-auto mt-[5px] w-[20px] text-custom-green'
                    />
                    <input id="file-upload" type="file" className="hidden" name='image' onChange={e => {setImage(e.target.files[0])}} accept='image/*' />
                  </label>
                </div>
                <div className="flex flex-row justify-center gap-3 pt-4">
                <label htmlFor="zoom" className="font-medium">
                  Zoom: {Math.round(zoom * 100)}%
                </label>
                <input
                  type="range"
                  id="zoom"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={handleZoomChange}
                  className="w-64"
                />
                </div>
                <div className="flex flex-row justify-center gap-3 pt-4">
                  <button
                    type="submit"
                    className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImageModal(false);
                      setImage(null);
                      setZoom(1);
                    }}
                    className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
};

export default ProfileSettings;
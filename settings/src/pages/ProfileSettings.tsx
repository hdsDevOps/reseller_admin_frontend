import React, { useEffect, useRef, useState } from 'react';
import '../styles/styles.css';
import { RiCameraFill } from "react-icons/ri";
import { Plus, X } from 'lucide-react';
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { updateAdminDetailsThunk, uploadImageThunk, removeUserAuthTokenFromLSThunk, getAdminDetailsThunk, hereMapSearchThunk, getBase64ImageThunk } from "store/user.thunk";
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
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const streetRef = useRef(null);
  const { userDetails, userId } = useAppSelector((state) => state.auth);
  // console.log("userDetails...", userDetails);
  const modalRef = useRef();
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [base64ProfileImage, setBase64ProfileImage] = useState("");
  // console.log("base64ProfileImage....", base64ProfileImage);
  const [modalShow, setModalShow] = useState(false);
  const [profile, setProfile] = useState<object|null>(null);
  console.log("profile...", profile);
  const [newProfile, setNewProfile] = useState<object|null>(null);
  const [cPassword, setCPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [showCPassword,setShowCPassword] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [image, setImage] = useState(null);
  console.log("image...", image);
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
  // console.log("countries...", countries);
  // console.log("states...", states);
  // console.log("cities...", cities);
  // console.log({countryName, stateName, cityName});

  const [hereList, setHereList] = useState([]);
  const [hereSearch, setHereSearch] = useState("");
  const [hereData, setHereData] = useState<object|null>(null);

  const [countryDropdownOpen, setCountryDropdownOpen] = useState<Boolean>(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState<Boolean>(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState<Boolean>(false);
  const [streetDropdownOpen, setStreetDropdownOpen] = useState<Boolean>(false);
  // console.log("isDropdownOpen", isDropdownOpen);
  
  const handleClickOutsideCountry = (event: MouseEvent) => {
    if(countryRef.current && !countryRef.current.contains(event.target as Node)) {
      setCountryDropdownOpen(false);
    }
  };
  const handleClickOutsideState = (event: MouseEvent) => {
    if(stateRef.current && !stateRef.current.contains(event.target as Node)) {
      setStateDropdownOpen(false);
    }
  };
  const handleClickOutsideCity = (event: MouseEvent) => {
    if(cityRef.current && !cityRef.current.contains(event.target as Node)) {
      setCityDropdownOpen(false);
    }
  };
  const handleClickOutsideStreet = (event: MouseEvent) => {
    if(streetRef.current && !streetRef.current.contains(event.target as Node)) {
      setStreetDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideCountry);
    document.addEventListener('mousedown', handleClickOutsideState);
    document.addEventListener('mousedown', handleClickOutsideCity);
    document.addEventListener('mousedown', handleClickOutsideStreet);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideCountry);
      document.removeEventListener('mousedown', handleClickOutsideState);
      document.removeEventListener('mousedown', handleClickOutsideCity);
      document.removeEventListener('mousedown', handleClickOutsideStreet);
    };
  }, []);

  const getBase64ProfileImage = async (url:string) => {
    try {
      const result = await dispatch(getBase64ImageThunk({url: url})).unwrap();
      setBase64ProfileImage(result?.base64)
    } catch (error) {
      setBase64ProfileImage("")
    }
  };

  useEffect(() => {
    if(userDetails?.profile_pic) {
      getBase64ProfileImage(userDetails?.profile_pic);
    } else {
      setBase64ProfileImage("")
    }
  }, [userDetails?.profile_pic]);

  useEffect(() => {
    if(countries?.length > 0 && countryName !== "") {
      setCountryDropdownOpen(true);
    }
  }, [countries, countryName]);

  useEffect(() => {
    if(states?.length > 0 && stateName !== "") {
      setStateDropdownOpen(true);
    }
  }, [states, stateName]);

  useEffect(() => {
    if(cities?.length > 0 && cityName !== "") {
      setCityDropdownOpen(true);
    }
  }, [cities, cityName]);

  useEffect(() => {
    if(hereList?.length > 0 && hereSearch !== "") {
      setStreetDropdownOpen(true);
    }
  }, [hereList, hereSearch]);

  const getFirstAlphabet = (str: string) => {
    return Array?.from(str)[0]?.toUpperCase();
  };

  useEffect(() => {
    if(userDetails?.phone_no === newProfile?.phone_no) {
      setIsNumberValid(true);
    }
  }, [userDetails?.phone_no, profile?.phone_no]);

  useEffect(() => {
    if(profile) {
      if(profile?.country !== "" && countries?.length > 0) {
        const countryData = countries?.find(item => item?.name === profile?.country);
        setCountry(countryData);
      } else {
        setCountry({});
      }
    }
  }, [profile?.country, countries]);

  useEffect(() => {
    if(profile) {
      if(profile?.state_name !== "" && states?.length > 0) {
        const statesData = states?.find(item2 => item2?.name === profile?.state_name);
        setState(statesData)
      } else {
        setState({});
      }
    }
  }, [profile?.state_name, states]);

  useEffect(() => {
    if(profile) {
      if(profile?.city !== "" && cities?.length > 0) {
        const cityData = cities?.find(item3 => item3?.name === profile?.city);
        setCity(cityData)
      } else {
        setCity({});
      }
    }
  }, [profile?.city, cities]);
  
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
  }, [country]);

  const formList = [
    { label: 'First Name', placeholder: 'Enter first name', name: 'first_name', type: 'text',},
    { label: 'Last Name', placeholder: 'Enter last name', name: 'last_name', type: 'text',},
    { label: 'Email', placeholder: 'Enter email', name: 'email', type: 'email',},
    { label: 'Phone Number', placeholder: 'Enter phone number', name: 'phone', type: 'text',},
    { label: 'Street Address', placeholder: 'Enter street address', name: 'street_name', type: 'text',},
    { label: 'Country', placeholder: 'Enter name of Country', name: 'country', type: 'text',},
    { label: 'State', placeholder: 'Enter name of State', name: 'state_name', type: 'text',},
    { label: 'City', placeholder: 'Enter name of City', name: 'city', type: 'text',},
  ];

  useEffect(() => {
    setProfile(userDetails);
  }, [userDetails]);

  const handlePhoneChange = (value: string) => {
    setNewProfile((prevData) => ({ ...prevData, phone: value }));
  };

  const getHereData = async() => {
    try {
      const result = await dispatch(hereMapSearchThunk({address: hereSearch})).unwrap();
      setHereList(result?.data?.items);
    } catch (error) {
      setHereList([]);
    }
  };

  useEffect(() => {
    if(hereSearch !== '') {
      getHereData();
    }
  }, [hereSearch]);

  const removePrefix = (input:string, prefix:string) => {
    if(input?.startsWith(prefix)) {
      return input?.slice(prefix.length);
    } else if(input?.startsWith('0')) {
      return input?.slice(1);
    }
    return input;
  };

  useEffect(() => {
    setHereData(userDetails?.street_name);
  }, [userDetails?.street_name]);

  useEffect(() => {
    setNewProfile({
      ...newProfile,
      street_name: hereData === null ? "" : hereData,
    })
  }, [hereData]);

  useEffect(() => {
    if(hereData !== null && countries?.length > 0) {
      const findCountry = countries?.find(item => item?.name?.toLowerCase() === hereData?.address?.countryName?.toLowerCase());
      if(findCountry) {
        setCountry(findCountry);
        setNewProfile({
          ...newProfile,
          country: findCountry?.name
        })
        if(hereData !== null && states?.length > 0) {
          const findState = states?.find(item => item?.name?.toLowerCase() === hereData?.address?.state?.toLowerCase());
          if(findState) {
            setState(findState);
            setNewProfile({
              ...newProfile,
              state_name: findState?.name
            })
            if(hereData !== null && cities?.length > 0) {
              const findCity = cities?.find(item => item?.name?.toLowerCase() === hereData?.address?.city?.toLowerCase());
              if(findCity) {
                setCity(findCity);
                setNewProfile({
                  ...newProfile,
                  city: findCity?.name
                })
              }
            }
          }
        }
      }
    }
  }, [hereData, countries, states, cities]);

  // useEffect(() => {
  //   if(hereData !== null && states?.length > 0) {
  //     const findCountry = states?.find(item => item?.name?.toLowerCase() === hereData?.address?.state?.toLowerCase());
  //     if(findCountry) {
  //       setState(findCountry);
  //       setNewProfile({
  //         ...newProfile,
  //         state_name: findCountry?.name
  //       })
  //     }
  //   }
  // }, [hereData, states]);

  // useEffect(() => {
  //   if(hereData !== null && cities?.length > 0) {
  //     const findCountry = cities?.find(item => item?.name?.toLowerCase() === hereData?.address?.countryName?.toLowerCase());
  //     if(findCountry) {
  //       setCity(findCountry);
  //       setNewProfile({
  //         ...newProfile,
  //         city: findCountry?.name
  //       })
  //     }
  //   }
  // }, [hereData, cities]);

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
    setNewProfile({
      ...newProfile,
      [e.target.name]: e.target.value,
    });
  };
  
  const updateProfileName = (e) => {
    const value = e.target.value;
    const filteredValue = value?.replace(/[^a-zA-Z\s]/g, "");
    setNewProfile({
      ...newProfile,
      [e.target.name]: filteredValue,
    });
  };

  const getAdminDetails = async() => {
    try {
      const result = await dispatch(getAdminDetailsThunk({userid: userId})).unwrap();
      console.log("result...", result);
    } catch (error) {
      // toast.error()
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

  const submitProfile = async(e) => {
    e.preventDefault();
    if(isNumberValid) {
      if(
        newProfile?.first_name === "" || newProfile?.first_name?.trim() === "" ||
        newProfile?.last_name === "" || newProfile?.last_name?.trim() === "" ||
        newProfile?.email === "" || newProfile?.email?.trim() === "" ||
        newProfile?.phone === "" || newProfile?.phone?.trim() === "" ||
        hereData === null ||
        newProfile?.country === "" || newProfile?.country?.trim() === ""
      ) {
        toast.warning("Please fill the fields.");
      } else if(states.length > 0 && newProfile?.state_name === "" && newProfile?.state_name.trim() === "") {
        toast.warning("Please fill the fields.");
      } else if(cities.length > 0 && newProfile?.city === "" && newProfile?.city.trim() === "") {
        toast.warning("Please fill the fields.");
      } else {
        try {
          if(cPassword !== "" && cPassword.trim() !== "") {
            if(newProfile?.password === cPassword){
              const result = await dispatch(updateAdminDetailsThunk({
                userid: userId,
                first_name: newProfile?.first_name,
                last_name: newProfile?.last_name,
                email: newProfile?.email,
                phone: newProfile?.phone,
                password: cPassword,
                profile_pic: newProfile?.profile_pic,
                street_name: hereData,
                city: newProfile?.city,
                state_name: newProfile?.state_name,
                country: newProfile?.country
              })).unwrap();
              dispatch(setUserDetails(newProfile));
              toast.success(result?.message);
              setModalShow(false);
            } else {
              toast.warning("Password and confirm password do not match");
            }
          } else {
            const result = await dispatch(updateAdminDetailsThunk({
              userid: userId,
              first_name: newProfile?.first_name,
              last_name: newProfile?.last_name,
              email: newProfile?.email,
              phone: newProfile?.phone,
              profile_pic: newProfile?.profile_pic,
              street_name: hereData,
              city: newProfile?.city,
              state_name: newProfile?.state_name,
              country: newProfile?.country
            })).unwrap();
            dispatch(setUserDetails(newProfile));
            toast.success(result?.message);
            setModalShow(false);
          }
        } catch (error) {
          toast.error(error?.message || "Error updating profile");
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
    } else {
      toast.warning("Please enter a valid number");
    }
  };

  const handleClickOutOfFilter = e => {
    if(modalRef.current && !modalRef.current.contains(e.target)){
      setModalShow(false);
      setNewProfile(null);
      setCountryName("");
      setStateName("");
      setCityName("");
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
    setNewProfile(null);
  };

  useEffect(() => {

  });

  const imageUpload = async(e) => {
    e.preventDefault();
    if(image === null) {
      const defaultImageURL = base64ProfileImage;
      console.log(defaultImageURL)
      // const defaultImageURL = 'http://localhost:3000/images/logo.jpeg'

      const response = await fetch(defaultImageURL);
      const blob = await response.blob();
      const imageFile = new Image();
      imageFile.src = URL.createObjectURL(blob);
      await new Promise((resolve) => {
        imageFile.onload = resolve;
      });
      console.log(blob)
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
            await getAdminDetails();
          }
        })
      } catch (error) {
        toast.error(error?.message || "Error uploading profile image");
        console.log("errror...", error);
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
        const imageFile = image;
    
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const newImage = new Image();
        newImage.src = URL.createObjectURL(imageFile);
        
        newImage.onload = async () => {
          const maxSize = 300; // Fixed output size (300x300)

          let scale = zoom;
          // if (zoom < 1) scale = 1; // Prevent shrink below 1x
        
          // Set canvas size to fixed 300x300
          canvas.width = maxSize;
          canvas.height = maxSize;
        
          // Get original image dimensions
          const originalWidth = newImage.width;
          const originalHeight = newImage.height;
        
          // Preserve aspect ratio while fitting within maxSize
          const aspectRatio = originalWidth / originalHeight;
          let targetWidth, targetHeight;
        
          if (aspectRatio > 1) {
            // Landscape image
            targetWidth = maxSize * scale;
            targetHeight = (maxSize / aspectRatio) * scale;
          } else {
            // Portrait or square image
            targetHeight = maxSize * scale;
            targetWidth = (maxSize * aspectRatio) * scale;
          }
        
          // Ensure at least maxSize x maxSize (crop if needed)
          // if (targetWidth < maxSize) targetWidth = maxSize;
          // if (targetHeight < maxSize) targetHeight = maxSize;
        
          // Calculate center position (so it doesn't cut off incorrectly)
          const offsetX = (maxSize - targetWidth) / 2;
          const offsetY = (maxSize - targetHeight) / 2;
        
          // Clear canvas
          ctx.clearRect(0, 0, maxSize, maxSize);
        
          if (zoom < 1) {
            // Add transparency for padding when zooming out
            ctx.fillStyle = "rgba(0,0,0,0)";
            ctx.fillRect(0, 0, maxSize, maxSize);
          }
        
          // Draw the scaled image properly centered
          ctx.drawImage(newImage, offsetX, offsetY, targetWidth, targetHeight);
          
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
              await getAdminDetails();
            }
          })
        }
      } catch (error) {
        toast.error(error?.message || "Error uploading profile image");
        console.log("errror...", error);
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
            {
              profile?.profile_pic ?
              (
                <img
                  src={profile?.profile_pic}
                  alt='Profile'
                  className={`border-[3px] ${profile?.profile_pic ? "border-custom-green" : "border-white"} w-full h-full rounded-full bg-custom-green object-contain`}
                />
              ) : (
                <h6 className='border-[3px] border-white w-full h-full min-h-[93px] rounded-full bg-custom-green text-center items-center text-white text-5xl pt-4'>
                  {getFirstAlphabet(profile ? profile?.first_name : "")}{getFirstAlphabet(profile ? profile?.last_name : "")}
                </h6>
              )
            }
            <label
              className="float-right ml-auto mt-[-20px] w-[29px] h-[29px] border border-custom-gray-2 rounded-full items-center bg-white cursor-pointer"
              onClick={() => {
                setImageModal(true);
                // setImage(profile?.profile_pic);
              }}
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
                  setNewProfile(userDetails);
                }}
              >Edit</button>
            </div>
          </div>

          <h6 className='h6-text-2 mt-10'>Basic Information</h6>

          <div
            className='grid grid-cols-2 gap-2 mt-1'
          >
            {
              profile !== null && formList.map((item, index) => {
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
                        value={item.name === "phone" ? `+${userDetails[item.name]}` : userDetails[item.name] || ""}
                        className='search-input-text'
                        disabled
                      />
                    </div>
                  )
                } else if(item.name == "city" || item.name == 'state_name' || item.name == 'country'){
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
                        disabled
                      />
                    </div>
                  )
                }  else if(item.name == 'street_name'){
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
                        value={userDetails?.street_name?.title || ""}
                        className='search-input-text'
                        disabled
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
                        disabled
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
                    newProfile !== null && formList.map((item, index) => {
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
                              defaultValue={newProfile[item.name] || ""}
                              className='search-input-text'
                              onChange={updateProfile}
                              required
                            />
                          </div>
                        )
                      } else if(item.name === 'phone'){
                        return(
                          <div
                            key={index}
                            className='flex flex-col col-span-2 mb-2'
                          >
                            <label
                              className='search-input-label'
                            >{item.label}</label>
                            <PhoneInput
                              country={"us"}
                              // onChange={handlePhoneChange}
                              onChange={(inputPhone, countryData, event, formattedValue) => {
                                handlePhoneChange(inputPhone);
                                if(countryData?.format?.length === formattedValue.length) {
                                  const newValue = removePrefix(inputPhone, countryData?.dialCode);
                                  if (newValue.startsWith('0')) {
                                    setIsNumberValid(false);
                                  } else {
                                    setIsNumberValid(true);
                                  }
                                } else {
                                  setIsNumberValid(false);
                                }
                              }}
                              value={newProfile?.phone}
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
                      } else if(item.name === 'country'){
                        return(
                          <div
                            key={index}
                            className='flex flex-col sm:col-span-1 col-span-2 my-1 relative'
                            ref={countryRef}
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
                                setNewProfile({
                                  ...newProfile,
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
                              value={newProfile?.country || countryName}
                              required
                              onFocus={() => {setCountryDropdownOpen(true)}}
                            />
                            {
                              countryDropdownOpen && (
                                <div className='w-full max-h-32 absolute mt-14 bg-white border border-[#E4E4E4] rounded-md overflow-y-auto z-[100] px-2'>
                                  {
                                    countries?.filter(name => name?.name?.toLowerCase()?.includes(countryName?.toLowerCase()))?.map((country, idx) => (
                                      <p
                                        key={idx}
                                        className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                        dropdown-name="country-dropdown"
                                        onClick={() => {
                                          setNewProfile({
                                            ...newProfile,
                                            country: country?.name
                                          });
                                          setCountryName("");
                                          setStateName("");
                                          setCityName("");
                                          setCountry(country);
                                          setState({});
                                          setCity({});
                                          setCountryDropdownOpen(false);
                                        }}
                                      >{country?.name}</p>
                                    ))
                                  }
                                </div>
                              )
                            }
                          </div>
                        )
                      } else if(item.name === 'state_name'){
                        return(
                          <div
                            key={index}
                            className='flex flex-col sm:col-span-1 col-span-2 my-1 relative'
                            ref={stateRef}
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
                                setNewProfile({
                                  ...newProfile,
                                  state_name: "",
                                  city: ""
                                });
                                setStateName(e.target.value);
                                setCityName("");
                                setState({});
                                setCity({});
                              }}
                              value={newProfile?.state_name || stateName}
                              required={states?.length > 0 ? true : false}
                              onFocus={() => {setStateDropdownOpen(true)}}
                            />
                            {
                              stateDropdownOpen && (
                                <div className='w-full max-h-32 absolute mt-14 bg-white border border-[#E4E4E4] rounded-md overflow-y-auto z-[100] px-2'>
                                  {
                                    states?.filter(name => name?.name.toLowerCase()?.includes(stateName?.toLowerCase()))?.map((region, idx) => (
                                      <p
                                        key={idx}
                                        className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                        onClick={() => {
                                          setNewProfile({
                                            ...newProfile,
                                            state_name: region?.name,
                                            city: ""
                                          });
                                          setStateName("");
                                          setCityName("");
                                          setState(region);
                                          setCity({});
                                          setStateDropdownOpen(false);
                                        }}
                                      >{region?.name}</p>
                                    ))
                                  }
                                </div>
                              )
                            }
                          </div>
                        )
                      } else if(item.name === 'city'){
                        return(
                          <div
                            key={index}
                            className='flex flex-col sm:col-span-1 col-span-2 my-1 relative'
                            ref={cityRef}
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
                                setNewProfile({
                                  ...newProfile,
                                  city: ''
                                });
                                setCityName(e.target.value);
                                setCity({});
                              }}
                              value={newProfile?.city || cityName}
                              required={cities?.length > 0 ? true : false}
                              onFocus={() => {setCityDropdownOpen(true)}}
                            />
                            {
                              cityDropdownOpen && (
                                <div className='w-full max-h-32 absolute mt-14 bg-white border border-[#E4E4E4] rounded-md overflow-y-auto z-[100] px-2'>
                                  {
                                    cities?.filter(name => name?.name.toLowerCase()?.includes(cityName?.toLowerCase()))?.map((city_name, idx) => (
                                      <p
                                        key={idx}
                                        className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                        onClick={() => {
                                          setNewProfile({
                                            ...newProfile,
                                            city: city_name?.name
                                          });
                                          setCityName("");
                                          setCity(city_name);
                                          setCityDropdownOpen(false);
                                        }}
                                      >{city_name?.name}</p>
                                    ))
                                  }
                                </div>
                              )
                            }
                          </div>
                        )
                      } else if(item.name === "first_name" || item.name === "last_name") {
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
                              value={newProfile[item.name] || ""}
                              className='search-input-text'
                              onChange={updateProfileName}
                              required
                            />
                          </div>
                        )
                      } else if(item.name === 'street_name'){
                        return(
                          <div
                            key={index}
                            className='flex flex-col sm:col-span-1 col-span-2 my-1 relative'
                            ref={streetRef}
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
                                setNewProfile({
                                  ...newProfile,
                                  street_name: ''
                                });
                                setHereSearch(e.target.value);
                                setHereData(null);
                              }}
                              value={hereData?.title || hereSearch}
                              required
                              onFocus={() => {setStreetDropdownOpen(true)}}
                            />
                            {
                              streetDropdownOpen && (
                                <div className='w-full max-h-32 absolute mt-14 bg-white border border-[#E4E4E4] rounded-md overflow-y-auto z-[100] px-2'>
                                  {
                                    hereList?.map((address, idx) => (
                                      <p
                                        key={idx}
                                        className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                        onClick={() => {
                                          setNewProfile({
                                            ...newProfile,
                                            street_name: address
                                          });
                                          setHereSearch("");
                                          setHereData(address);
                                          setStreetDropdownOpen(false);
                                        }}
                                      >{address?.title}</p>
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
                              value={newProfile[item.name] || ""}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-full mt-20">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-[600px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-between items-center mb-6">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900"
                >Change Profile Photo</DialogTitle>
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
                      {
                        image === null && base64ProfileImage === ""
                        ? (
                          <div className={`absolute top-0 left-0 bottom-0 right-0 transform duration-200 ease-in-out w-full h-full items-center`}>
                            <p className='my-auto text-center items-center pt-32'>Add profile photo from the camera icon</p>
                          </div>
                        ) : (
                          <img
                            ref={imgRef}
                            src={image === null ? base64ProfileImage : image}
                            alt='profile picture'
                            className={`absolute top-0 left-0 transform scale-[${zoom}] duration-200 ease-in-out w-full h-full`}
                          />
                        )
                      }
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
                {
                  image === null && base64ProfileImage === ""
                  ? ("") : (
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
                  )
                }
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
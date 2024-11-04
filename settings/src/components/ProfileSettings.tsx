import React, { useState } from "react";
import { Eye, EyeOff, Camera } from "lucide-react";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  stateCity: string;
  country: string;
  password: string;
  confirmPassword: string;
}

const ProfileSettings: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "Lorem ipsum dolor sit",
    lastName: "Lorem ipsum dolor sit",
    email: "philipbassey@gmail.com",
    phoneNumber: "",
    address: "Lorem ipsum dolor sit",
    stateCity: "Lorem ipsum dolor sit",
    country: "Lorem ipsum dolor sit",
    password: "••••••••",
    confirmPassword: "••••••••",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    // max-w-3xl mx-auto p-6
    <div className="p-6 min-h-screen">
      <div className="max-w-3xl">
        <h1 className="text-2xl font-semibold text-[#12A833] mb-6">
          Profile settings
        </h1>

        {/* Profile Header */}
        <div className="">
          <div className="w-16 h-16 rounded-full bg-[#12A833] flex items-center justify-center text-white text-xl font-semibold mb-5 relative">
            LU
            <Camera className="absolute bottom-0 right-0 z-50 p-0.5 border bg-white rounded-full"  fill="#12A833" />
          </div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Lemmy Ugochukwu</h2>
                <p className="text-gray-600">Admin</p>
              </div>
            </div>
            <button className="px-4 py-1 border border-[#12A833] text-[#12A833] rounded hover:bg-green-50">
              Edit
            </button>
          </div>
        </div>

        {/* Basic Information Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Basic information</h3>

          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#12A833]"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#12A833]"
              />
            </div>

            {/* Email */}
            <div className="col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#12A833]"
              />
            </div>

            {/* Phone Number */}
            <div className="col-span-2">
              <label className="block text-sm text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter number"
                value={profileData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#12A833]"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#12A833]"
              />
            </div>

            {/* State/City */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                State/City
              </label>
              <input
                type="text"
                name="stateCity"
                value={profileData.stateCity}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#12A833]"
              />
            </div>

            {/* Country */}
            <div className="col-span-2">
              <label className="block text-sm text-gray-600 mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={profileData.country}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#12A833]"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={profileData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#12A833]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={profileData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#12A833]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;

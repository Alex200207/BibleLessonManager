import React, { useState } from "react";
import {
  Camera,
  MapPin,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

interface UserProfile {
  name: string;
  bio: string;
  location: string;
  work: string;
  education: string;
  email: string;
  phone: string;
  birthday: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    bio: "Software Developer | Photography Enthusiast",
    location: "San Francisco, CA",
    work: "Senior Developer at Tech Co",
    education: "Computer Science, Stanford University",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    birthday: "1990-05-15",
  });

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here you would typically save to a backend
    console.log("Saving profile:", profile);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-800 ">
      {/* Cover Photo */}
      <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600">
        <button
          onClick={() => navigate("/home")}
          className="text-black cursor-pointer mt-5 "
        >
          <IoIosArrowRoundBack className="w-10 h-10" />
        </button>

        <button className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white">
          <Camera className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Profile Picture */}
      <div className="relative -mt-20 px-6">
        <div className="relative inline-block">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50">
            <Camera className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <div className="p-6 space-y-6  dark:text-slate-950">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
              Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
              Bio
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>
        </div>

        {/* Contact & Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={profile.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                placeholder="Location"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={profile.work}
                onChange={(e) => handleChange("work", e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                placeholder="Work"
              />
            </div>

            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={profile.education}
                onChange={(e) => handleChange("education", e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                placeholder="Education"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                placeholder="Email"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                placeholder="Phone"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400 " />
              <input
                type="date"
                value={profile.birthday}
                onChange={(e) => handleChange("birthday", e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [LastName, setLastName] = useState(user.LastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, LastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser({ firstName, LastName, photoUrl, age, gender, about }));
      setShowToast(true);

      setTimeout(() => setShowToast(false), 3000); // hide after 3 seconds
    } catch (err) {
      setError(err.message || "Error updating profile");
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center gap-10 flex-wrap my-6">
        {/* Form Section */}
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-center justify-center">
              Edit Profile
            </h2>

            {/* First Name */}
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                className="input input-bordered w-80 h-10 text-sm px-2"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label htmlFor="LastName" className="block text-sm font-medium text-gray-400 mb-1">
                Last Name
              </label>
              <input
                id="LastName"
                type="text"
                className="input input-bordered w-80 h-10 text-sm px-2"
                placeholder="Enter your last name"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Age */}
            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-medium text-gray-400 mb-1">
                Age
              </label>
              <input
                id="age"
                type="number"
                className="input input-bordered w-80 h-10 text-sm px-2"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-400 mb-1">
                Gender
              </label>
              <select
                id="gender"
                className="select select-bordered w-80 h-10 text-sm"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* About */}
            <div className="mb-4">
              <label htmlFor="about" className="block text-sm font-medium text-gray-400 mb-1">
                About
              </label>
              <textarea
                id="about"
                className="textarea textarea-bordered w-80 h-20 text-sm px-2"
                placeholder="Tell something about yourself"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>

            {/* Photo URL */}
            <div className="mb-4">
              <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-400 mb-1">
                Photo URL
              </label>
              <input
                id="photoUrl"
                type="text"
                className="input input-bordered w-80 h-10 text-sm px-2"
                placeholder="Paste image URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            {/* Error */}
            <p className="text-red-500 text-sm">{error}</p>

            {/* Save Button */}
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <UserCard user={{ firstName, LastName, photoUrl, age, gender, about }} />
      </div>

      {/* ✅ Toast for success */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

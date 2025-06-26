import axios from "axios";
import React, { useState } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔒 LOGIN handler
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      navigate("/"); // Go to home after login
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  // 📝 SIGNUP handler
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/signup`,
        { firstName, LastName, emailId, password, age, gender },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      navigate("/profile"); // Go to profile after signup
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center justify-center">
            {isSignup ? "Sign Up" : "Login"}
          </h2>

          {/* First & Last Name, Age, Gender - only in signup */}
          {isSignup && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  className="input input-bordered w-80 h-10 text-sm px-2"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className="input input-bordered w-80 h-10 text-sm px-2"
                  placeholder="Enter last name"
                  value={LastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  className="input input-bordered w-80 h-10 text-sm px-2"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Gender
                </label>
                <select
                  className="select select-bordered w-80 h-10 text-sm"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email ID
            </label>
            <input
              type="email"
              className="input input-bordered w-80 h-10 text-sm px-2"
              placeholder="Enter your email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              className="input input-bordered w-80 h-10 text-sm px-2"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error */}
          <p className="text-red-500 text-sm">{error}</p>

          {/* Submit */}
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary"
              onClick={isSignup ? handleSignUp : handleLogin}
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </div>

          {/* Toggle */}
          <p className="text-center text-sm text-gray-500 mt-4">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
              }}
            >
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

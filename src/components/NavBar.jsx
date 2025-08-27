import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/auth/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar bg-base-300 shadow-sm px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          👩‍💻 DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          <p className="px-4 hidden sm:block">Welcome! {user.firstName}</p>

          {/* Profile avatar button */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="btn btn-ghost btn-circle avatar focus:outline-none"
          >
            <div className="w-10 rounded-full">
              <img alt="user avatar" src={user.photoUrl} />
            </div>
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <ul className="absolute top-full right-0 mt-2 w-52 bg-base-100 rounded-box shadow-lg z-50 p-2 menu menu-sm">
              <li>
                <Link to="/profile" className="justify-between" onClick={() => setDropdownOpen(false)}>
                  Profile <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" onClick={() => setDropdownOpen(false)}>
                  Connection
                </Link>
              </li>
              <li>
                <Link to="/requests" onClick={() => setDropdownOpen(false)}>
                  Requests
                </Link>
              </li>
              <li>
                <Link to="/premium" onClick={() => setDropdownOpen(false)}>
                  Premium
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="w-full text-left">
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;

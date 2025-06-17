import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

const Body = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get("http://localhost:5000/profile/view", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // if you're also using cookies (optional)
      });

      setUser(res.data.user); // adjust based on backend response
    } catch (err) {
      console.error("Error fetching user:", err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <NavBar user={user} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;

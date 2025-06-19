import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get("http://localhost:5000/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data)); // ✅ this is the actual array
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex justify-center my-10">
      {feed && feed.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : (
        <p className="text-center">Loading feed...</p>
      )}
    </div>
  );
};

export default Feed;

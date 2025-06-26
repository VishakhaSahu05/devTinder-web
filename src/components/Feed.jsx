import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./usercard";

const Feed = () => {
  const user = useSelector((store) => store.user);
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const getFeed = async () => {
    if (!user || (feed && feed.length > 0)) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, [user]);

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (!user) {
    return (
      <h1 className="text-center mt-10 text-xl font-medium">
        Please log in to view your feed.
      </h1>
    );
  }

  if (!feed || feed.length === 0) {
    return <p className="text-center mt-10">Loading feed...</p>;
  }

  const currentUser = feed[currentIndex];

  if (!currentUser) {
    return (
      <h1 className="text-center mt-10 text-xl font-medium">
        No more users in your feed.
      </h1>
    );
  }

  return (
    <div className="flex justify-center my-10">
      <UserCard user={currentUser} onAction={handleNext} />
    </div>
  );
};

export default Feed;

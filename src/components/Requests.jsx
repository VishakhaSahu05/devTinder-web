import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  // Review request function
  const reviewRequest = async (status, requestId) => {
    console.log("Reviewing:", status, requestId); // Debug log

    try {
      await axios.post(
        `${BASE_URL}/request/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      fetchRequest(); // Refresh after accepting/rejecting
    } catch (err) {
      console.error("Error reviewing request", err.response?.data || err.message);
    }
  };

  // Fetch requests from backend
  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/request/recieved`, {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error("Error fetching requests", err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <h1 className="text-center text-xl mt-10 font-medium text-gray-600">
        No Requests Found
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-2xl mb-6">Connection Requests</h1>
      <div className="flex flex-col items-center gap-4">
        {requests.map((connection) => {
          const { _id, fromUserId } = connection;
          const {
            firstName,
            LastName,
            photoUrl,
            about,
            age,
            gender,
          } = fromUserId;

          return (
            <div
              key={_id}
              className="w-80 p-4 border rounded-xl bg-base-300 shadow-md flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-4 w-full">
                <img
                  alt="photo"
                  className="w-16 h-16 rounded-full object-cover"
                  src={photoUrl}
                />
                <div className="text-left">
                  <h2 className="font-semibold text-lg">
                    {firstName + " " + (LastName || "")}
                  </h2>
                  <p className="text-sm text-gray-700">Age: {age}</p>
                  <p className="text-sm text-gray-700 capitalize">
                    Gender: {gender}
                  </p>
                  <p className="text-sm mt-1">{about}</p>
                </div>
              </div>

              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => reviewRequest("accepted", _id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm transition-all"
                >
                  Accept
                </button>
                <button
                  onClick={() => reviewRequest("rejected", _id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm transition-all"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;

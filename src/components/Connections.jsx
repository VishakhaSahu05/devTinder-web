import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/connection", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <h1>Loading...</h1>;
  if (connections.length === 0)
    return <h1 className="text-center text-xl mt-10">No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-2xl mb-6">Connections</h1>
      <div className="flex flex-col items-center gap-4">
        {connections.map((connection, index) => {
          const { _id, firstName, LastName, photoUrl, about, age, gender } = connection;
          return (
            <div
              key={index}
              className="w-96 p-4 border rounded-lg bg-base-300 shadow-md flex items-center justify-between"
            >
              <div className="flex gap-4 items-center">
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
                  <p className="text-sm text-gray-700 capitalize">Gender: {gender}</p>
                  <p className="text-sm mt-1">{about}</p>
                </div>
              </div>
              <Link to={`/chat/${_id}`} className="btn btn-primary">💬 Chat</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;

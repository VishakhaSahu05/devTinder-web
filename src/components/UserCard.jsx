import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';


const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  if (!user) return null;

  const { _id, firstName, LastName, photoUrl, age, gender, about } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      console.log("Sending request to:", `${BASE_URL}/request/request/send/${status}/${userId}`);
      const res = await axios.post(
        `${BASE_URL}/request/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log("Response:", res.data);
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Send request error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="photo" className="h-60 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName} {LastName}</h2>
        {age && gender && <p>{age}, {gender}</p>}
        {about && <p>{about}</p>}
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignore", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

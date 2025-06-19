import React from 'react';

const UserCard = ({ user }) => {
  if (!user) return null;
  const { firstName, LastName, photoUrl, age, gender, about } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={photoUrl}
          alt="photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName} {LastName}</h2>
        {age && gender && <p>{age} , {gender}</p>}
        {about && <p>{about}</p>}
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Connect</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

import React from "react";

const UserCard = ({ image, name, description, rating, uploader }) => {
  return (
    <div className="usercard">
      <img src={image} alt={name} className="usercard-image" onError={(e) => e.target.src = "placeholder.jpg"} />
      <h2 className="usercard-name">{name}</h2>
      <p className="usercard-description">{description}</p>
      <div className="usercard-rating">Rating: {rating}</div>
      <p className="usercard-uploader">Uploaded By: {uploader}</p>
    </div>
  );
};

export default UserCard;

import React from "react";
import './cakecard.css';

const  UserCard=({image,name,description,rating,uploader})=>{
    return(
        <div className="usercard">
            <img src={image} alt={name} className="usercard-image" />
            <h2 className="usercard-name">{name}</h2>
            <p className="usercard-description">{description}</p>
            <div className="usercard-rating">Rating: {rating}</div>
            <p className="usercard-uploader">Uploaded By: {uploader}</p>

        </div>
    );

};
export default UserCard;


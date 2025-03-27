import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link for navigation



const UserCard = ({ id, image, name, description, rating, uploader, onDelete }) => {
  
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this cake?")) {
      fetch(`http://localhost:3000/api/items/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert("Cake deleted successfully!");
          onDelete(id); // ✅ Update state in parent component
        })
        .catch((err) => console.log("Delete error:", err));
    };
  };

  return (
    <div className="usercard">
      <img
        src={image}
        alt={name}
        className="usercard-image"
        onError={(e) => (e.target.src = "placeholder.jpg")} // ✅ Default image on error
      />
      <h2 className="usercard-name">{name}</h2>
      <p className="usercard-description">{description}</p>
      <div className="usercard-rating">Rating: {rating}</div>
      <p className="usercard-uploader">Uploaded By: {uploader|| "Unknown" }</p>

      {/* Edit Button */}
      <Link to={`/update/${id}`}>
        <button>Edit</button>
      </Link>

      {/* Delete Button */}
      <button onClick={handleDelete} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>
        Delete
      </button>
    </div>
  );
};

export default UserCard;

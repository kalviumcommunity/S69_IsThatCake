import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCake = () => {
  const { id } = useParams(); // Get cake ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    rating: "",
    uploader: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.log("Error fetching cake:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        alert("Cake updated successfully!");
        navigate("/"); // Redirect to home
      })
      .catch((err) => console.log("Update error:", err));
  };

  return (
    <div>
      <h2>Update Cake</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Cake Name" />
        <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input type="number" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" />
        <input type="text" name="uploader" value={formData.uploader} onChange={handleChange} placeholder="Uploader Name" />
        <button type="submit">Update Cake</button>
      </form>
    </div>
  );
};

export default UpdateCake;

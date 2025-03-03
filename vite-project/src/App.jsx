import React, { useState, useEffect } from "react";
import "./App.css";
import SignupForm from "./components/Signup";

import UserCard from "./components/UserCard";

function App() {
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/items")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched cake data:", data); // ✅ Debugging step
        setCakes(data.items || data); // ✅ Ensure correct assignment
      })
      .catch((err) => console.log("Errors: ", err));
  }, []);
  

  return (
    <div className="app">
      <header className="hero">
        <h1>IsThatCake</h1>
        <p>Weird cakes. Funny ones. Laughs guaranteed!</p>
        <button>Explore Gallery</button>
      </header>

      {/* Sign-Up Section */}
      <section className="signup-section">
        <SignupForm />
      </section>

      <section className="cake-gallery">
        {cakes.length > 0 ? (
          cakes.map((cake) => (
            <UserCard
              key={cake._id || cake.id}  // ✅ Ensure unique key exists
              image={cake.image || "placeholder.jpg"}  // ✅ Avoid undefined images
              name={cake.name || "Unknown"}
              description={cake.description || "No description available"}
              rating={cake.rating || "No rating"}
              uploader={cake.uploader || "Anonymous"}
      />
    ))
  ) : (
    <p>No cakes found!</p> // ✅ Displays fallback text if no cakes exist
  )}
     </section>

    </div>
  );
}

export default App;

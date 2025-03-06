import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Import Router
import "./App.css";
import SignupForm from "./components/Signup";
import UserCard from "./components/UserCard";
import UpdateCake from "./pages/UpdateEntity";

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

  // ✅ Delete function to remove cake from the state
  const handleDelete = (id) => {
    setCakes(cakes.filter((cake)=>cake._id!==id));
  };

  return (
    <Router> {/* ✅ Router should wrap everything */}
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

        {/* Routing Section */}
        <Routes>
          <Route path="/" element={
            <section className="cake-gallery">
              {cakes.length > 0 ? (
                cakes.map((cake) => (
                  <UserCard
                    key={cake._id} {...cake} onDelete={handleDelete} />
                
                ))
              ) : (
                <p>No cakes found!</p> // ✅ Displays fallback text if no cakes exist
              )}
            </section>
          } />

          <Route path="/update/:id" element={<UpdateCake />} /> {/* ✅ Update page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

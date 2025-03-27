import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Import Router
import "./App.css";
import SignupForm from "./components/Signup";
import UserCard from "./components/UserCard";
import UpdateCake from "./pages/UpdateEntity";
import AddItemForm from "./components/AddItemForm";

function App() {
  const [cakes, setCakes] = useState([]);
  const [users, setUsers] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(""); // Store selected user ID

  // Fetch users for the dropdown
  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users", err));
  }, []);

  // Fetch cakes (filtered by user if selected)
  useEffect(() => {
    const url = selectedUser
      ? `http://localhost:3000/api/items/user/${selectedUser}`
      : "http://localhost:3000/api/items";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched cake data:", data);
        setCakes(data.items || data);
      })
      .catch((err) => console.log("Errors: ", err));
  }, [selectedUser]); // Runs whenever selectedUser changes

  // Delete function to remove a cake
  const handleDelete = (id) => {
    setCakes(cakes.filter((cake) => cake._id !== id));
  };


  return (
    <Router>
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
  
        {/* User Filter Dropdown */}
        <div className="filter-section">
          <label>Select User:</label>
          <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
            <option value="">All Users</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
  
        {/* Routing Section */}
        <Routes>
          <Route
            path="/"
            element={
              <section>
                {/* ✅ Add Item Form Before Cakes List */}
                <AddItemForm users={users} onItemAdded={() => fetchItems()} />
  
                {/* Cake Gallery */}
                <section className="cake-gallery">
                  {cakes.length > 0 ? (
                    cakes.map((cake) => <UserCard key={cake._id} {...cake} onDelete={handleDelete} />)
                  ) : (
                    <p>No cakes found!</p>
                  )}
                </section>
              </section>
            }
          />
          <Route path="/update/:id" element={<UpdateCake />} />
        </Routes>
      </div>
    </Router>
  );
  
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import CakeCard from './components/CakeCard'; // Ensure correct import



  


function App() {
  const [cakes, setCakes]=useState([]);

  useEffect(()=>{
    fetch(`http://localhost:3000/api/items`)
    .then((res)=>res.json())
    .then((data) => {
      console.log("Fetched cake data:", data);
      setCakes(data.items);
    })
    .catch((err)=>console.log("Errors: ", err))
  },[]);
  
  return (
    <div className="app">
      <header className="hero">
        <h1>IsThatCake</h1>
        <p>Weird cakes. Funny ones. Laughs guaranteed!</p>
        <button>Explore Gallery</button>
      </header>

      <section className="cake-gallery">
      {cakes.length > 0 ? (
          cakes.map((cake) => <CakeCard key={cake._id} {...cake} />)
        ) : (
          <p>No cakes found!</p>
        )}
      </section>
    </div>
  );
}

export default App;

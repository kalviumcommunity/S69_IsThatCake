// client/src/App.jsx
import React from 'react';
import './App.css';
import UserCard from './components/CakeCard';



function App() {
  // Dummy data for the cake
  const cakeData = {
    image: "https://preview.redd.it/o6wk4jkf64961.jpg?width=640&crop=smart&auto=webp&s=52c494257495b8ba9ccd5dff84c311114c99f765", // Link to a weird cake image
    name: "The Moldy Cake",
    description: "A cake that was left out too long. Don't eat it!",
    rating: 2,
    uploader: "CakeLover123"
  };

  return (
    <div className="app">
      <header className="hero">
        <h1>IsThatCake</h1>
        <p>Weird cakes. Funny ones. Laughs guaranteed!</p>
        <button>Explore Gallery</button>
      </header>

     
      <section className="cake-gallery">
        <UserCard {...cakeData} />
        
      </section>
    </div>
  );
}

export default App;

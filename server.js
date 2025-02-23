require('dotenv').config();

const express = require('express');
const mongoose= require('mongoose');

const app = express();
app.use(express.json());
const PORT = 3000;
const MONGO_URI= process.env.MONGO_URI;
const routes=require('./routes');
app.use(routes);




mongoose.connect(MONGO_URI).then(()=>console.log("Connected to database.")).catch((err)=>console.log('Falied: ', err));


app.get('/', (req, res) => {
  const status= mongoose.connection.readyState===1 ? "Connected" : "Not Connected";
  res.status(200).json({message: "Welcome to IsThatCake", database: status});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

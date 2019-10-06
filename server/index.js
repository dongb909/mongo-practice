//import express framework
const express = require ('express');
const path = require('path');
const dbController = require('../database/index.js')


//set PORT# to listen on
const PORT = 7000;

//create server
const app = express();

//body parser, express now has it built in
app.use(express.json());
//serve static files
app.use(express.static(path.join(__dirname, '../client/dist')))

//start server
app.listen(PORT, () => console.log('Express server started on' , PORT));

// app.get(req,res) NOOOOO **********
app.post("/movies", (req, res) => {
  dbController.addMovies(req,res);
})

app.get("/movies", (req, res) => {
  dbController.getAllMovies(req,res);
 })



app.put("/movies", (req, res) => {
  dbController.updateMovie(req, res);
  
})


app.delete("/movies", (req, res) => {
  dbController.deleteMovie(req,res)
})


























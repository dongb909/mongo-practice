var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/movieList', {useNewUrlParser: true});  //name of db

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error to DB:'));
db.once('open', function() {
  console.log('=============Connected to MONGO  DATABASE===============')
});

//DEFINE schema
//Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
//plural
var moviesSchema = new mongoose.Schema({
  title: String,
  watchStatus: {
    type: Boolean,
    default: false
  }
});

//CREATE MODEL CONSTRUCTOR
//To use our schema definition, we need to convert our blogSchema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema)
//Instances of Models are documents.
//singular
var Movie = mongoose.model('Movie', moviesSchema);


//can use req.body here too without requiring bc being used in server not here
const addMovies = (req,res) => {
  //must save the title in a new doc creation aka instance of the model constructor
  //don't need to worry about watchstatus bc it's created with a default
  //DOC.SAVE
  var movieDoc = new Movie({title: req.body.title});
  //then save the doc using the MODEL method
  movieDoc.save((err, movieDoc) => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log('DOC from DB: ', movieDoc)
      res.status(200).send(movieDoc)
    }
  })

}

const getAllMovies = (req,res) => {
  //MODEL.FIND (filter, cb)
  Movie.find({}, (err, allDocsWithThisModelStructure) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.status(200). send(allDocsWithThisModelStructure)
    }
  })

}

const updateMovie = (req, res) => {
  //on model.update (find with a title filter, then update a prop in that doc, cb)
  //don't do {watchStatus: !watchStatus} bc the client is updating its own state first before sending the updated value to db
  //vs when we post db change first before we do get to display movie
  Movie.findOneAndUpdate({title: req.body.title}, {watchStatus: req.body.watchStatus}, (err, doc) => {
  
    if (err) {
      res.sendStatus(500)
    } else {
      console.log(doc)
      res.status(200).send(doc)
    }
  })

}

//Models have static deleteOne() and deleteMany() functions for removing all documents matching the given filter
//bc filtering all docs that are a child of our model
//deleteOne will delete only ONE doc that matches that filter
//deleteMany will delete all that matches that filter
//if you want to delete another filter then you HAVE to write a different function for that filter, you can't combine filters
const deleteMovie = (req,res) => {
  Movie.deleteOne({title: req.body.title}, (err, resObj) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.status(200).send(resObj)
    }
  })

}
 



module.exports.db = db
module.exports.addMovies = addMovies
module.exports.getAllMovies = getAllMovies
module.exports.updateMovie = updateMovie
module.exports.deleteMovie = deleteMovie

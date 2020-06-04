var express = require('express');
var router = express.Router();
var request = require('sync-request');
var movieModel = require('../models/movies')

router.get('/new-movies', function(req, res, next) {

  var data = request("GET", "https://api.themoviedb.org/3/discover/movie?api_key=d597c84dec0f7968fd9654a902650f5e&language=fr-FR&region=fr&sort_by=release_date.desc&include_adult=false&include_video=false&page=1");  

  data = JSON.parse(data.body);

  res.json({result: true, movies: data.results});
});

router.post('/whishlist-movie', async function(req, res, next) {

  var newMovie = new movieModel({
    movieName : req.body.name,
    movieImg : req.body.img
  })

  var movieSave = await newMovie.save()

  var result = false

  if (movieSave.movieName) {
    result = true
  }

  res.json({result});
});

router.delete('/whishlist-movie/:name', async function(req, res, next) {

  var returnDb = await movieModel.deleteOne({ movieName: req.params.name})

  var result = false

  if (returnDb.deletedCount === 1) {
    result = true
  }

  res.json({result});
});

router.get('/whishlist-movie', async function(req, res, next) {

  var movies = await movieModel.find()

  res.json({movies});
});

module.exports = router;

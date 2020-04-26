const MovieSchema = require('../models/Movie.js');
const Rating = require('../models/Rating');

module.exports.controller = (app) => {
  // Fetch all movies
  app.get('/movies/add', (req, res) => {
    MovieSchema.find({}, 'name description release_year genre', (error,
      movies) => {
      // eslint-disable-next-line no-console
      if (error) { console.log(error); }
      res.send({
        movies,
      });
    });
  });

  // fetch a single movie
  app.get('/api/movies/:id', (req, res) => {
    MovieSchema.findById({ _id: req.params.id }, 'name description release_year genre', (error, movie) => {
      // eslint-disable-next-line no-console
      if (error) { console.error(error); }
      res.send({
        movie,
      });
    });
  });

  // rate a movie
  app.post('/movies/rate/:id', (req, res) => {
    const ratings = new Rating({
      movie_id: req.params.id,
      user_id: req.body.user_id,
      rate: req.body.rate,
    });

    // eslint-disable-next-line func-names
    ratings.save((error, rating) => {
      // eslint-disable-next-line no-console
      if (error) { console.log(error); }
      res.send({
        movie_id: rating.movie_id,
        user_id: rating.user_id,
        rate: rating.rate,
      });
    });
  });

  // add a new movie
  app.post('/movies/add', (req, res) => {
    const newMovie = new MovieSchema({
      name: req.body.name,
      description: req.body.description,
      release_year: req.body.release_year,
      genre: req.body.genre,
    });

    newMovie.save((error, movie) => {
      // eslint-disable-next-line no-console
      if (error) { console.log(error); }
      res.send(movie);
    });
  });
};

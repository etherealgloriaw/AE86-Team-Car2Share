var mySchemas = require('../models/Schemas')
var express = require('express');
var router = express.Router();

// get main page active posts
router.get('/', async (req, res, next) => {
  const userPosts = await mySchemas.postItem.find({}).populate("driver").exec((err, tweetData) => {
    if (err) throw err;
    if (postData) {
      console.log(postData);
      res.end(JSON.stringify(postData));
    } else {
      res.end();
    }
  });
});

// get a single post (search)
router.get('/:name', async (req, res, next) => {
  try {
    await mySchemas.postItem.find({ title: req.params.name.trim() }).then(card => res.send(card))
      .catch(err => console.error(err));
  } catch (error) {
    console.log(error);
  }
});

/* add a new post. */
router.post('/add', async (req, res, next) => {
  const post = { startPoint: req.params.startPoint, destination: req.params.destination, lat: req.params.lat,
    long: req.params.long, distance: req.params.distance, price: req.params.price, date: req.params.date, 
    contact_info: req.params.contact_info, seats: req.params.seats, isActive: true, driver: '62cc948a3dc6303d5d1cd263' };
  try {
    await mySchemas.postItem(post).save().then(card => res.send(card))
      .catch(err => console.error(err));
  } catch (error) {
    console.log(error);
  }
});

/* delete a post. */
router.delete('/:id', function (req, res, next) {
  const id = req.params.id.trim();
  mySchemas.recipeItem.findByIdAndDelete(id).then(card => res.send(id))
    .catch(err => console.error(err))
  // res.json({ message: "Post deleted successfully." });
});

/* Edit a post. */
router.patch('/edit/:id', async (req, res, next) => {
  const id = req.params.id.trim();
  const post = { startPoint: req.params.startPoint, destination: req.params.destination, lat: req.params.lat,
    long: req.params.long, distance: req.params.distance, price: req.params.price, date: req.params.date, 
    contact_info: req.params.contact_info, seats: req.params.seats, isActive: true, driver: '62cc948a3dc6303d5d1cd263' };
  await mySchemas.postItem.findByIdAndUpdate(id, post, { new: true }).then(card => res.send(card))
    .catch(err => console.error(err))
})

module.exports = router;

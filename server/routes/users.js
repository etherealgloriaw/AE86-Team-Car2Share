var express = require('express');
var router = express.Router();
var mySchemas = require('../models/Schemas')

// no use now
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// get profile history posts
router.get('/:username', async (req, res, next) => {
 await mySchemas.historyItem.find({username: req.params.name.trim()}).populate("user").exec((err, postData) => {
    if (err) throw err;
    if (postData) {
      console.log(postData);
      res.end(JSON.stringify(postData));
    } else {
      res.end();
    }
  });
});

// user join a post
router.post('/add', async (req, res, next) => {
  const id = '62cc948a3dc6303d5d1cd263';
  const post = { startPoint: req.params.startPoint, destination: req.params.destination, lat: req.params.lat,
    long: req.params.long, distance: req.params.distance, price: req.params.price, date: req.params.date,
    contact_info: req.params.contact_info, seats: req.params.seats, isActive: true, driver: '62cc948a3dc6303d5d1cd263',
  user: req.params.id };
  try {
    await mySchemas.historyItem(post).save().then(card => res.send(card))
      .catch(err => console.error(err));
  } catch (error) {
    console.log(error);
  }
});

// edit profile
router.patch('/', async (req, res, next) => {
  const id = req.body.id.trim();
  const post = { username: req.body.username, introduction: req.body.introduction };
  await mySchemas.userItem.findByIdAndUpdate(id, post, { new: true }).then(card => res.send(card))
    .catch(err => console.error(err))
})

module.exports = router;

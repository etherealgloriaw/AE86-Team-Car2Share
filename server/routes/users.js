var express = require('express');
var router = express.Router();
var mySchemas = require('../models/Schemas')
var mongoose = require('mongoose')
// no use now
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// get profile history posts
router.get('/:userid', async (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.userid)
  const userID = await mySchemas.userItem.findById(id)
  const result = await mySchemas.historyItem.find({user: {$eq: userID._id}}).populate("driver").exec((err, postData) => {
    if (err) throw err;
    if (postData) {
      console.log(postData)
      res.send(JSON.stringify(postData));
    } else {
      res.end();
    }
  });
});

// user join a post
router.post('/join', async (req, res, next) => {
  const userId = mongoose.Types.ObjectId(req.body.user)
  const postId = mongoose.Types.ObjectId(req.body.id)
  const post = await mySchemas.postItem.findById(postId)
  console.log(post)
  const joinPost = {
    original_id: postId,
    from: post.from, to: post.to, lat: post.lat,
    lng: post.lng, distance: post.distance, price: post.price, startingTime: post.startingTime,
    contactInfo: post.contactInfo, availableSeats: post.availableSeats, active: true, driver: post.driver,
    user: userId
  };
  console.log(joinPost)
  try {
    await mySchemas.historyItem(joinPost).save().then(card => res.send(card))
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

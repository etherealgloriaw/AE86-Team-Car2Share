var mySchemas = require('../models/Schemas')
var express = require('express');
var router = express.Router();


const posts = mySchemas.postItem
// get main page active posts
router.get("/", async (req, res, next) => {
  // const data = await mySchemas.postItem.find({});
  // console.log(data);
  await posts.find({active : true}).populate("driver").exec((err, postData) => {
    if (err) throw err;
    if (postData) {
      console.log(postData)
      res.send(JSON.stringify(postData));
    } else {
      res.end();
    }
  });
});

// get a single post (search)
router.get('/:name', async (req, res, next) => {
  try {
    await mySchemas.postItem.find({ title: req.params.destination }).then(card => res.send(card))
        .catch(err => console.error(err));
  } catch (error) {
    console.log(error);
  }
});

/* add a new post. */
router.post('/add', async (req, res, next) => {
  const post = {
    availableSeats: req.body.availableSeats,
    rating: req.body.rating,
    startingTime: req.body.startingTime,
    totalTime: req.body.totalTime,
    lat: req.body.lat,
    lng: req.body.lng,
    contactInfo: req.body.contactInfo,
    active: req.body.active,
    price: req.body.price,
    to: req.body.to,
    from: req.body.from,
    driver: '62cc948a3dc6303d5d1cd263'
  };

  try {
    await mySchemas.postItem(post).save().then(card => res.send(card))
        .catch(err => console.error(err));
  } catch (error) {
    console.log(error);
  }
});

/* delete a post. */
router.delete('/delete/:id', async (req, res, next) => {
  const id = req.params.id;
  // mySchemas.postItem.findByIdAndDelete(id).then(card => res.send(id))
  //     .catch(err => console.error(err))
  try {
    await mySchemas.postItem.deleteOne( {_id: req.params.id}).exec();
    const allPosts = await mySchemas.postItem.find({}).exec();
    res.send(allPosts)
  } catch {
    console.log("err")
  }
  // res.json({ message: "Post deleted successfully." });
});

/* Edit a post. */
router.put('/Edit/:id', async (req, res, next) => {
  const id = req.params.id;
  console.log(id)
  const post = {
    availableSeats: req.body.availableSeats,
    rating: req.body.rating,
    startingTime: req.body.startingTime,
    totalTime: req.body.totalTime,
    lat: req.body.lat,
    lng: req.body.lng,
    contactInfo: req.body.contactInfo,
    active: req.body.active,
    price: req.body.price,
    to: req.body.to,
    from: req.body.from,
    driver: '62cc948a3dc6303d5d1cd263'
  }
  await mySchemas.postItem.findByIdAndUpdate(id, post).then(
      card => res.send(card)
  )
      .catch(err => console.error(err))
})

module.exports = router;

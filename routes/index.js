var mySchemas = require('../models/Schemas')
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var dateTime = require('node-datetime');

const posts = mySchemas.postItem

/// get main page active posts
router.get("/", async (req, res, next) => {
  var dt = dateTime.create();
  await posts.find({$and:[{active: 0, startingTime: {$gt: dt._now}}]}).populate("driver").exec((err, postData) => {
    if (err) throw err;
    if (postData) {
      res.send(JSON.stringify(postData));
    } else {
      res.end();
    }
  });
});


// get a single post (search)
router.get('/search/:dest/:selection/:sorting', async (req, res, next) => {
  var dest = req.params.dest;
  var sorting = req.params.sorting;
  var selection = req.params.selection;
  console.log("Dest: " + dest);
  if(dest != "NULL"){
    try {
      await posts.find({$and:[{active: 0}, {to: {$regex: dest, $options: 'i'}}]})
      .populate("driver").then(results => {
        if(sorting == "ascending"){
          if(selection == "availableSeats") results.sort((a,b)=>parseFloat(a.availableSeats)-(b.availableSeats));
          if(selection == "rating") results.sort((a,b)=>parseFloat(a.rating)-(b.rating));
          if(selection == "totalTime") results.sort((a,b)=>parseFloat(a.totalTime)-(b.totalTime));
        }else if(sorting == "descending"){
          if(selection == "availableSeats") results.sort((a,b)=>parseFloat(b.availableSeats)-(a.availableSeats));
          if(selection == "rating") results.sort((a,b)=>parseFloat(b.rating)-(a.rating));
          if(selection == "totalTime") results.sort((a,b)=>parseFloat(b.totalTime)-(a.totalTime));
        }
        res.send(JSON.stringify(results));
      })
          .catch(err => console.error(err));
    } catch (error) {
      console.log(error);
    }
  }else{
    try {
      await posts.find({active: 0}).populate("driver").then(results => {
        if(sorting == "ascending"){
          if(selection == "availableSeats") results.sort((a,b)=>parseFloat(a.availableSeats)-(b.availableSeats));
          if(selection == "rating") results.sort((a,b)=>parseFloat(a.rating)-(b.rating));
          if(selection == "totalTime") results.sort((a,b)=>parseFloat(a.totalTime)-(b.totalTime));
        }else if(sorting == "descending"){
          console.log("descending");
          if(selection == "availableSeats") results.sort((a,b)=>parseFloat(b.availableSeats)-(a.availableSeats));
          if(selection == "rating") results.sort((a,b)=>parseFloat(b.rating)-(a.rating));
          if(selection == "totalTime") results.sort((a,b)=>parseFloat(b.totalTime)-(a.totalTime));
        }
        // console.log("results:" + results);
        res.send(JSON.stringify(results));
      })
          .catch(err => console.error(err));
    } catch (error) {
      console.log(error);
    }
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
    driver: mongoose.Types.ObjectId(req.body.driver)
  };

  try {
    await mySchemas.postItem(post).save().populate("driver").then(card => res.send(card))
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
    const allPosts = await mySchemas.postItem.find({}).populate("driver").exec();
    res.send(allPosts)
  } catch {
    console.log("err")
  }
  // res.json({ message: "Post deleted successfully." });
});

/* Edit a post. */
router.put('/Edit/:id', async (req, res, next) => {
  const id = req.params.id;
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
    driver: req.body.driver,
  }
  await mySchemas.postItem.findByIdAndUpdate(id, post).populate("driver").then(
      card => res.send(card)
  )
      .catch(err => console.error(err))
})


router.patch('/finish/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await mySchemas.postItem.findByIdAndUpdate(id, {active: 2}).populate("driver");
    const allPosts = await mySchemas.postItem.find({}).populate("driver").exec();
    res.send(allPosts)
  } catch (e) {
    console.error(e)
  }


})

module.exports = router

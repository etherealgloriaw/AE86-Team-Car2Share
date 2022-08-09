var mySchemas = require('../models/Schemas')
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var dateTime = require('node-datetime');
var nodeoutlook = require('nodejs-nodemailer-outlook')
const posts = mySchemas.postItem

/// get main page active posts
router.get("/home", async (req, res, next) => {
  var dt = dateTime.create();
  await posts.find({ $and: [{ active: { $lt: 2 }, startingTime: { $gt: dt._now }, availableSeats: { $gt: 0 } }] }).populate("driver").exec((err, postData) => {
    if (err) throw err;
    if (postData) {
      res.send(JSON.stringify(postData));
    } else {
      res.end();
    }
  });
});


// get a single post (search)
router.get('/search/:selection/:sorting/:lat/:lng', async (req, res, next) => {

  function calcDist(i) {
    const R = 3958.8; // Radius of the Earth in miles
    const rlat1 = i.lat * (Math.PI / 180); // Convert degrees to radians
    const rlat2 = lat * (Math.PI / 180); // Convert degrees to radians
    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon = (lng - i.lng) * (Math.PI / 180); // Radian difference (longitudes)
    const d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) *
      Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
  }
  var sorting = req.params.sorting;
  var selection = req.params.selection;
  var lat = req.params.lat;
  var lng = req.params.lng;
  if (selection == 'distance') {
    var dt = dateTime.create();
    await posts.find({ $and: [{ active: { $lt: 2 }, startingTime: { $gt: dt._now }, availableSeats: { $gt: 0 } }] }).populate("driver").exec((err, results) => {
      if (err) throw err;
      if (results) {
        if (sorting == "ascending") {
          results.sort((a, b) => parseFloat(calcDist(a)) - calcDist(b));
        } else if (sorting == "descending") {
          results.sort((a, b) => parseFloat(calcDist(b)) - calcDist(a));
        }
        res.send(JSON.stringify(results));
      } else {
        res.end();
      }
    });
  } else {
    var dt = dateTime.create();
    await posts.find({ $and: [{ lat: lat, lng: lng, active: { $lt: 2 }, startingTime: { $gt: dt._now }, availableSeats: { $gt: 0 } }] }).populate("driver").exec((err, results) => {
      if (err) throw err;
      if (results) {
        if (sorting == "ascending") {
          if (selection == "availableSeats") results.sort((a, b) => parseFloat(a.availableSeats) - (b.availableSeats));
          if (selection == "rating") results.sort((a, b) => (a.driver.rating) - (b.driver.rating));
          if (selection == "totalTime") results.sort((a, b) => parseFloat(a.totalTime) - (b.totalTime));
          if (selection == "distance") results.sort((a, b) => parseFloat(calcDist(a)) - calcDist(b));
        } else if (sorting == "descending") {
          if (selection == "availableSeats") results.sort((a, b) => parseFloat(b.availableSeats) - (a.availableSeats));
          if (selection == "rating") results.sort((a, b) => (b.driver.rating) - (a.driver.rating));
          if (selection == "totalTime") results.sort((a, b) => parseFloat(b.totalTime) - (a.totalTime));
          if (selection == "distance") results.sort((a, b) => parseFloat(calcDist(b)) - calcDist(a));
        }
        res.send(JSON.stringify(results));
      } else {
        res.end();
      }
    });
  }
});


/* delete a post. */
router.delete('/delete/:id', async (req, res, next) => {
  try {
    await mySchemas.postItem.deleteOne({ _id: req.params.id }).exec();
    const allPosts = await mySchemas.postItem.find({}).populate("driver").exec();
    res.send(allPosts)
  } catch {
    console.log("err")
  }
  // res.json({ message: "Post deleted successfully." });
});

/* Edit a post. */
router.put('/Edit/:id', async (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.body._id);
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
  const historyPost = await mySchemas.historyItem.find({ original_id: { $eq: id } }).populate("user");
  for (var p of historyPost) {
    const historyID = p._id;
    user = p.user;
    nodeoutlook.sendEmail({
      auth: {
        user: "car2share@outlook.com",
        pass: "Notification"
      },
      from: 'car2share@outlook.com',
      to: user.email,
      subject: 'Your ride has been edited by driver!',
      text:
        `     Hello ${user.username}, your ride from ${p.from} to ${p.to} start at ${p.startingTime} has been edited by driver, please check the new post in Car2Share(https://ae86-car.herokuapp.com)!
  Car2Share Official`,
      replyTo: 'car2share@outlook.com',
      attachments: [],
      onError: (e) => console.log(e),
      onSuccess: (i) => console.log(i)
    });
    await mySchemas.historyItem.findByIdAndUpdate(historyID, {
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
    });
  }
  await mySchemas.postItem.findByIdAndUpdate(id, post).populate("driver").then(
    card => {
      res.send(card)
    }
  )
    .catch(err => console.error(err))
})


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
  await mySchemas.postItem(post).save();
  try {
    await mySchemas.postItem.findbyID({}).populate("driver").then(card => res.send(card))
      .catch(err => console.error(err));
  } catch (error) {
    console.log(error);
  }
});


router.patch('/finish/:id', async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const post = await mySchemas.postItem.findById(id);
    await mySchemas.historyItem.find({ original_id: { $eq: id } }).populate("user").then(
      card => {
        if (post.active == 1) {
          if (card) {
            for (var curr of card) {
              user = curr.user;
              nodeoutlook.sendEmail({
                auth: {
                  user: "car2share@outlook.com",
                  pass: "Notification"
                },
                from: 'car2share@outlook.com',
                to: user.email,
                subject: 'Your ride has been finished by driver!',
                text:
                  `     Hello ${user.username}, your ride from ${post.from} to ${post.to} start at ${post.startingTime} has been finished by driver, please check the status in Car2Share(https://ae86-car.herokuapp.com)!
  Car2Share Official`,
                replyTo: 'car2share@outlook.com',
                attachments: [],
                onError: (e) => console.log(e),
                onSuccess: (i) => console.log(i)
              });
            }
          }
        }
      }
    )
    await mySchemas.postItem.findByIdAndUpdate(id, { active: 2 });
    const historyPost = await mySchemas.historyItem.find({ original_id: { $eq: id } })
    for (var p of historyPost) {
      const historyID = p._id;
      await mySchemas.historyItem.findByIdAndUpdate(historyID, { active: 2 });
    }
    const allPosts = await mySchemas.postItem.find({}).populate("driver").exec();
    res.send(allPosts)
  } catch (e) {
    console.error(e)
  }

})

module.exports = router

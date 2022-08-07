var express = require('express');
var router = express.Router();
var mySchemas = require('../models/Schemas')
var mongoose = require('mongoose')
var nodeoutlook = require('nodejs-nodemailer-outlook')
// var auth = require('../middleware/secret.js')

// get profile history posts
router.get('/:userid', async (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.userid)
  const userID = await mySchemas.userItem.findById(id)
  const result = await mySchemas.historyItem.find({user: {$eq: userID._id}}).populate("driver").exec((err, postData) => {
    if (err) throw err;
    if (postData) {
      res.send(JSON.stringify(postData));
    } else {
      res.end();
    }
  });
});

router.get('/driver/:userid', async (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.userid)
  const userID = await mySchemas.userItem.findById(id)
  const result = await mySchemas.postItem.find({driver: {$eq: userID._id}}).populate("driver").exec((err, postData) => {
    if (err) throw err;
    if (postData) {
      // console.log(postData)
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
  const joinPost = {
    original_id: postId,
    from: post.from, to: post.to, lat: post.lat,
    lng: post.lng, distance: post.distance, price: post.price, startingTime: post.startingTime,
    contactInfo: post.contactInfo, availableSeats: post.availableSeats, active: 1, driver: post.driver,
    user: userId
  };
  const driverID = mongoose.Types.ObjectId(post.driver)
  const driver = await mySchemas.userItem.findById(driverID)
  await mySchemas.postItem.findByIdAndUpdate(postId, joinPost);
  await mySchemas.historyItem(joinPost).save();
  await mySchemas.historyItem.find({user: {$eq: userId}}).populate("driver").exec((err, postData) => {
    if (err) throw err;
    if (postData) {
      nodeoutlook.sendEmail({
        auth: {
          user: "car2share@outlook.com",
          pass: "Notification"
        },
        from: 'car2share@outlook.com',
        to: driver.email,
        subject: 'Someone has joined your post!',
        text: ` Hello ${driver.username}, your post from ${post.from} to ${post.to} start at ${post.startingTime} has been joined by a user, please check the status in Car2Share!
        
        Car2Share Official`,
        replyTo: 'car2share@outlook.com',
        attachments: [],
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
      });
      res.send(JSON.stringify(postData));
    } else {
      res.end();
    }
  });
});


router.patch('/cancel/:id', async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);

    const post = await mySchemas.historyItem.findById(id).populate("driver");

    // console.log(post)

    const original_id = post.original_id;
    const driverID = post.driver;
    const driver = await mySchemas.userItem.findById(driverID)
    await mySchemas.postItem.findByIdAndUpdate(original_id, { active: 0 }).populate("driver");
    await mySchemas.historyItem.deleteOne({ _id: id }).exec();

    const allPosts = await mySchemas.historyItem.find({}).populate("driver").exec((err, posts) => {
      if (err) throw err;
      if (posts) {
        nodeoutlook.sendEmail({
          auth: {
            user: "car2share@outlook.com",
            pass: "Notification"
          },
          from: 'car2share@outlook.com',
          to: driver.email,
          subject: 'Someone has canceled your post!',
          text: ` Hello ${driver.username}, your post from ${post.from} to ${post.to} start at ${post.startingTime} has been canceled, please check the status in Car2Share!
        
        Car2Share Official`,
          replyTo: 'car2share@outlook.com',
          attachments: [],
          onError: (e) => console.log(e),
          onSuccess: (i) => console.log(i)
        });
      }

    });
    res.send(allPosts)
  } catch (e) {
    console.error(e)
  }

})



module.exports = router;

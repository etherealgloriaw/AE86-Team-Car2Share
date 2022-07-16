var mySchemas = require('../models/Schemas')
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

const posts = mySchemas.postItem
// get main page active posts
router.get("/", async (req, res, next) => {
  // const data = await mySchemas.postItem.find({});
  // console.log(data);
  await posts.find({active : true}).populate("driver").exec((err, postData) => {
    if (err) throw err;
    if (postData) {
      res.send(JSON.stringify(postData));
    } else {
      res.end();
    }
  });
});


// get a single post (search)
router.get('/:dest/:selection/:sorting', async (req, res, next) => {
  dest = req.params.dest;
  sorting = req.params.sorting;
  
  selection = req.params.selection;
  try {
    await mySchemas.postItem.find({$and:[{active: true}, {to: {$regex: dest, $options: 'i'}}]})
    .then(results => {
      if(sorting == "ascending"){
        if(selection == "availableSeats") results.sort((a,b)=>parseFloat(a.availableSeats)-(b.availableSeats));
        if(selection == "rating") results.sort((a,b)=>parseFloat(a.rating)-(b.rating));
        if(selection == "totalTime") results.sort((a,b)=>parseFloat(a.totalTime)-(b.totalTime));    
      }else if(sorting == "descending"){
        // results.sort((a,b)=>{
        //   console.log("a:"+ a);
        //   console.log("b:" + JSON.stringify(b.availableSeats));
        //   parseFloat(a.${selection})-(b.selection);
        // })
        if(selection == "availableSeats") results.sort((a,b)=>parseFloat(b.availableSeats)-(a.availableSeats));
        if(selection == "rating") results.sort((a,b)=>parseFloat(b.rating)-(a.rating));
        if(selection == "totalTime") results.sort((a,b)=>parseFloat(b.totalTime)-(a.totalTime));    
      }
      console.log("results:" + results);
      res.send(JSON.stringify(results));
    })
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
    driver: mongoose.Types.ObjectId(req.body.driver)
  };
  console.log(post)

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
    const allPosts = await mySchemas.postItem.find({active : true}).populate("driver").exec();
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

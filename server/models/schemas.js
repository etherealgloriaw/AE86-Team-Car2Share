var mongoose = require('mongoose')
const Schema = mongoose.Schema;
const CONNECTION_URL = 'mongodb+srv://car2share:groupae86@cluster0.fjt9o67.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Server Running on Port'))
.catch((error) => console.log(error));

const postSchema = new Schema({
    // _id: objectId
    startPoint:  {type: String, required:true}, // String is shorthand for {type: String}
    destination: {type: String},
    lat:   {type:mongoose.Decimal128},
    long: {type: mongoose.Decimal128},
    distance: {type: mongoose.Decimal128},
    price: {type: Number},
    date: { type: Date},
    contact_info: {type: String},
    seats: {type: Number},
    isActive: {type: Boolean, default: true},
    driver: {type: Schema.Types.ObjectId, ref:'userItem'},
  }, { collection: 'posts' , versionKey: false});
  
  const userSchema = new Schema({
    // _id: objectId
    username: {type: String, required:true}, 
    introduction: {type: String},
    rating: {type: mongoose.Decimal128},
  }, { collection: 'users', versionKey: false});

  const historySchema = new Schema({
    // _id: objectId
    startPoint:  {type: String, required:true}, // String is shorthand for {type: String}
    destination: {type: String},
    lat:   {type: mongoose.Decimal128},
    long: {type: mongoose.Decimal128},
    distance: {type: mongoose.Decimal128},
    price: {type: Number},
    date: { type: Date},
    contact_info: {type: String},
    seats: {type: Number},
    isActive: {type: Boolean, default: true},
    driver: {type: Schema.Types.ObjectId, ref:'userItem'},
    user: {type: Schema.Types.ObjectId, ref:'userItem'},
  }, { collection: 'posts' , versionKey: false});
  
  const postItem = mongoose.model('postItem', postSchema, 'posts');
  const userItem = mongoose.model('userItem', userSchema, 'users');
  const historyItem = mongoose.model('historyItem', userSchema, 'users_history');
  const mySchemas = {'postItem': postItem, 'userItem': userItem, 'historyitem': historyItem};
  
  module.exports = mySchemas;
var mongoose = require('mongoose')
const Schema = mongoose.Schema;


const postSchema = new Schema({
    // _id: objectId
    from:  {type: String}, // String is shorthand for {type: String}
    to: {type: String},
    lat:   {type: mongoose.Decimal128},
    lng: {type: mongoose.Decimal128},
    distance: {type: mongoose.Decimal128},
    price: {type: Number},
    contactInfo: {type: String},
    availableSeats: {type: Number},
    startingTime:{type: Date},
    rating: {type: Number},
    active: {type: Boolean, default: true},
    driver: {type: Schema.Types.ObjectId, ref: 'userItem'}
}, { collection: 'posts' , versionKey: false});

const userSchema = new Schema({
    // _id: objectId
    username: {type: String, required:true},
    introduction: {type: String},
    rating: {type: mongoose.Decimal128},
    password: {type: String},
    email: {type: String},
}, { collection: 'users', versionKey: false});

const historySchema = new Schema({
    // _id: objectId
    from:  {type: String}, // String is shorthand for {type: String}
    to: {type: String},
    lat:   {type: mongoose.Decimal128},
    lng: {type: mongoose.Decimal128},
    distance: {type: mongoose.Decimal128},
    price: {type: Number},
    contactInfo: {type: String},
    availableSeats: {type: Number},
    startingTime:{type: Date},
    rating: {type: Number},
    active: {type: Boolean, default: true},
    original_id: {type: Schema.Types.ObjectId, ref: 'postItem'},
    driver: {type: Schema.Types.ObjectId, ref: 'userItem'},
    user: {type: Schema.Types.ObjectId, ref: 'userItem'},

}, { collection: 'user_history' , versionKey: false});

const postItem = mongoose.model('postItem', historySchema, 'posts');
const userItem = mongoose.model('userItem', userSchema, 'users');
const historyItem = mongoose.model('historyItem', historySchema, 'users_history');
const mySchemas = {'postItem': postItem, 'userItem': userItem, 'historyItem': historyItem};

module.exports = mySchemas;

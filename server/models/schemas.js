var mongoose = require('mongoose')
const Schema = mongoose.Schema;


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
    from:  {type: String, required:true}, // String is shorthand for {type: String}
    to: {type: String},
    lat:   {type: mongoose.Decimal128},
    lng: {type: mongoose.Decimal128},
    distance: {type: mongoose.Decimal128},
    price: {type: Number},
    contactInfo: {type: String},
    seats: {type: Number},
    startingTime:{type: Date},
    rating: {type: Number},
    active: {type: Boolean, default: true},
    driver: {type: Schema.Types.ObjectId, ref:'userItem'},
    // user: {type: Schema.Types.ObjectId, ref:'userItem'},

}, { collection: 'posts' , versionKey: false});

const postItem = mongoose.model('postItem', historySchema, 'posts');
const userItem = mongoose.model('userItem', userSchema, 'users');
const historyItem = mongoose.model('historyItem', userSchema, 'users_history');
const mySchemas = {'postItem': postItem, 'userItem': userItem, 'historyItem': historyItem};

module.exports = mySchemas;

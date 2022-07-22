const router = require("express").Router();
const mySchemas = require('../models/Schemas');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'test';

// fake signin
router.get("/:email", async (req, res, next) => {
	console.log(req.params.email);
	try {
		await mySchemas.userItem.find({ email: req.params.email }).then(card => res.send(card))
			.catch(err => console.error(err));
	} catch (error) {
		console.log(error);
	}
});

// edit profile
router.patch('/Edit', async (req, res, next) => {
	const id = mongoose.Types.ObjectId(req.body.id);
	const post = { username: req.body.username, introduction: req.body.introduction };
	console.log(post)
	await mySchemas.userItem.findByIdAndUpdate(id, post, { new: true }).then(card => res.send(card))
		.catch(err => console.error(err))
})


// router.get("/google", passport.authenticate("google", ["profile", "email"]));

// router.get(
// 	"/google/callback",
// 	passport.authenticate("google", {
// 		successRedirect: process.env.CLIENT_URL,
// 		failureRedirect: "/login/failed",
// 	})
// );

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

// signIn a new user
router.post('/signIn', async (req, res, next) => {
	const user = { email: req.body.email, password: req.body.password };
	try {
		const oldUser = await mySchemas.userItem.findOne({ email: user.email });
		if (oldUser == null) return res.status(400).json({ message: "User doesn't exist" });
		const isPasswordCorrect = await bcrypt.compare(user.password, oldUser.password);
		if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
		const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
		console.log(token);
		res.status(200).json({ result: oldUser, token });
	} catch (error) {
		console.log(error);
	}
});


// signup a new user
router.post('/signUp', async (req, res, next) => {
	let currentDate = new Date().toJSON().slice(0, 10);
	const user = {
		email: req.body.email, username: req.body.username, password: req.body.password, rating: 0.0,
		join_date: currentDate
	};
	// console.log(user);
	try {
		const oldUser = await mySchemas.userItem.findOne({ email: user.email });
		if (oldUser) return res.status(400).json({ message: "User already exists" });
		const hashedPassword = await bcrypt.hash(user.password, 12);
		user.password = hashedPassword;
		const result = await mySchemas.userItem(user).save();
		const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });
		res.status(201).json({ result, token });
	} catch (error) {
		console.log(error);
	}
});

// rate a new user
router.patch('/rate', async (req, res, next) => {
	const id = mongoose.Types.ObjectId(req.body.id);
	const oldUser = await mySchemas.userItem.findOne({ _id: id });
	var postNum = 0;
	const result = await mySchemas.historyItem.find({
		$and: [
			{ user: { $eq: id } },
			{ rate: { $ne: 0 } },
		]
	}).populate("driver");
	postNum = result.length;
	const currRate = (oldUser.rating * postNum + req.body.rate) / (postNum + 1);
	const post = { rating: currRate.toFixed(2) };
	await mySchemas.userItem.findByIdAndUpdate(id, post, { new: true }).then(card => res.send(card))
		.catch(err => console.error(err))
});

module.exports = router;

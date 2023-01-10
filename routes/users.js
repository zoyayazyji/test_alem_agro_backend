const express = require("express");
const User = require("../models/User");
const router = express.Router();


router.post('/', async (req, res) => {
  const user = new User(req.body);
  try {
    user.generateToken();
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/session", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const errorMessage = { message: "Username or password are invalid" };
  if (!user) return res.status(401).send(errorMessage);
  const isMatch = await user.checkPassword(req.body.password);
  if (!isMatch) return res.status(401).send(errorMessage);
  user.generateToken();
  await user.save();
  res.send (user)
});



module.exports = router;
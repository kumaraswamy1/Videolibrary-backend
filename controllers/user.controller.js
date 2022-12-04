const { User } = require("../models/user.model.js")
const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const secretKey = process.env['secretKey']

var app = express();


const registerUser = async (req, res) => {
const { name, username, email, password } = req.body.user;
  if (!(email && password)) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }
  const oldUser = await User.findOne({ email: email.toLowerCase() });
  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }
  else {
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      name,
      email: email.toLowerCase(),
      password: passwordEncrypted
    });
    return res.json({ success: true, username: username });
  }
}

const findUser = async (req, res) => {
  const { username, password } = req.body
  if (!(username && password)) {
    res.status(400).send("All input is required");
  }
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ _id: user._id, username: user.username }, secretKey, { expiresIn: "24h" })
    res.json({ success: true, token, username, userId: user })

  }
}


const getUser = async (req, res) => {
  try {
    const userId = req;

    const user = await User.findOne({ userId });
    res.json({ user })
  }
  catch (err) {
    res.status(500).json({ success: false, message: "Not working", errorMessage: err.message })
  }
}


module.exports = { registerUser, findUser, getUser }
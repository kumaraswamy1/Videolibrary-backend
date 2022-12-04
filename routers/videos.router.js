const express = require('express');
const videoRouter = express.Router();

const { getVideos } = require("../controllers/videos.controller.js");

videoRouter.get("/", getVideos);

module.exports = videoRouter

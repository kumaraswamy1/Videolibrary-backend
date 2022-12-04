const express = require("express");
const likedVideoRouter = express.Router();
const {getUserLikedVideos }= require("../middlewares/likedVideo.js")
const{ getLikedVideos,updateLikedVideo,removeLikedVideo}= require("../controllers/likedVideo.controller.js");

likedVideoRouter.use(getUserLikedVideos)
likedVideoRouter
  .get("/", getLikedVideos)
.post("/",updateLikedVideo)
 .post("/remove",removeLikedVideo)

module.exports = likedVideoRouter
const express = require("express");
const playlistRouter = express.Router();
const {getUserPlaylist,findPlaylistById }= require("../middlewares/playlist.js")
const { findPlaylist, createPlaylist,
  getPlaylistVideos,
  deletePlaylist,
  updatePlaylistVideo,deletePlaylistVideo} = require("../controllers/playlist.controller.js");

playlistRouter.use(getUserPlaylist)
playlistRouter
  .get("/", findPlaylist)
  .post("/create", createPlaylist)

 

playlistRouter.param("playlistId", findPlaylistById);
playlistRouter
  .route("/:playlistId")
  .get(getPlaylistVideos)
  .post(updatePlaylistVideo)
  .put(deletePlaylistVideo)
.delete(deletePlaylist);

module.exports = playlistRouter
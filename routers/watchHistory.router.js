const express = require('express');
const watchHistoryRouter = express.Router();
const {getUserWatchHistory }= require("../middlewares/watchHistory.js")
const { getWatchHistory,addToWatchHistory,removeWatchHistory } = require("../controllers/watchHistory.controller.js");

watchHistoryRouter.use(getUserWatchHistory);
watchHistoryRouter
  .get("/", getWatchHistory)
  .post("/add",addToWatchHistory)
  .post("/remove",removeWatchHistory)

  

module.exports = watchHistoryRouter

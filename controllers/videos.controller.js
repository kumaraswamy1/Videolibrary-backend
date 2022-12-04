
const { Video } = require("../models/video.model.js")
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.json({
      success: true,
      videos,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
      message: "Not working"
    })
  }
}


module.exports = { getVideos }
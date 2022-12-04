const LikedVideo  = require("../models/likedVideo.model.js")

const getUserLikedVideos = async (req, res, next) => {
  try {
    const { user } = req;
    let likedVideos = await LikedVideo.findOne({ userId: user._id })
  
    if (!likedVideos) {
      likedVideos = new LikedVideo({ userId: user._id, videos: [] })
      likedVideos = await likedVideos.save()
    
    } req.likedVideos = likedVideos

    next()
  } catch (e) {
    return res.status(500).json({ success: false, message: "Unable to retrive cart details", errorMessage: e.message })
  }
}


module.exports = { getUserLikedVideos }
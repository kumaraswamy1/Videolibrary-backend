const WatchHistory  = require("../models/watchHistory.model.js")


const getUserWatchHistory = async (req, res, next) => {
  try {
    const { user } = req;
    let watchHistory = await WatchHistory.findOne({ userId: user._id })
    if (!watchHistory) {
      watchHistory = new WatchHistory({ userId: user._id,videos: [] })
      watchHistory = await watchHistory.save()
    
    } req.watchHistory = watchHistory

    next()
  } catch (e) {
    return res.status(500).json({ success: false, message: "Unable to retrive cart details", errorMessage: e.message })
  }
}


module.exports= {getUserWatchHistory}
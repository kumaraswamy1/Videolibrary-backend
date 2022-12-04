
const findWatchHistory = async (watchHistory) => {
  watchHistory.videos = watchHistory.videos.filter((watchHistory) => watchHistory.active);
  return watchHistory;
};

const getWatchHistory = async (req, res) => {
  try {
    let { watchHistory } = req
    let watchHistories = await findWatchHistory(watchHistory);
    res.json({
      success: true,
      videos: watchHistories
    });
  }
  catch (err) {
    res.status(500).json({ success: false, message: "Not working", errorMessage: err.message })
  }
}

const addToWatchHistory = async (req, res) => {
  const { _id, Date } = req.body
  let { watchHistory } = req

  const iswatchHistory = watchHistory.videos.some(video => video._id == _id)
  try {
    if (iswatchHistory) {
      for (let video of watchHistory.videos) {
        if (video._id == _id) {

          watchHistory.videos.unshift({ _id, active: video.active, Date: Date })
        }
      }
    } else {
      watchHistory.videos.unshift({ _id, active: true })
    }
    let updatewatchHistory = await watchHistory.save();
    watchHistory = await findWatchHistory(updatewatchHistory);
    res.json({ success: true, videos: watchHistory });
  }

  catch (err) {
    res.status(500).json({ success: false, message: "Not working", errorMessage: err.message })
  }
}


const removeWatchHistory = async (req, res) => {

  let { watchHistory } = req
  const { _id } = req.body
  const iswatchHistory = watchHistory.videos.some(video => video._id == _id)
  try {
    if (iswatchHistory) {
      for (let video of watchHistory.videos) {
        if (video._id == _id) {
          video.active = false
        }
      }

    }
    let updatewatchHistory = await watchHistory.save();
    watchHistory = await findWatchHistory(updatewatchHistory);
    res.json({ success: true, videos: watchHistory });
  }

  catch (err) {
    res.status(500).json({ success: false, message: "Not working", errorMessage: err.message })
  }
}



module.exports = { getWatchHistory, addToWatchHistory, removeWatchHistory }
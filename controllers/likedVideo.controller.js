
const findLikedVideo = async (likedVideos) => {
  likedVideos.videos = likedVideos.videos.filter((likedVideo) => likedVideo.active);

  return likedVideos;
};

const getLikedVideos = async (req, res) => {
  try {
    let { likedVideos } = req;
    let { videos } = await findLikedVideo(likedVideos);
    res.json({
      success: true,
      likedVideos: videos
    });
  }
  catch (err) {
    res.status(500).json({ success: false, message: "Not working", errorMessage: err.message })
  }
}

const updateLikedVideo = async (req, res) => {
  let { likedVideos } = req
  const { _id } = req.body
  try {
    let isVideo = likedVideos.videos.some((video) => video._id == _id)
    if (isVideo) {
      for (let video of likedVideos.videos) {
        if (video._id == _id) {
          video.active = !video.active;
        }
      }
    } else {
      likedVideos.videos.push({ _id, active: true })
    }
    let updatedLikedVideo = await likedVideos.save();
    likedVideos = await findLikedVideo(updatedLikedVideo);
    res.json({ success: true, videos: likedVideos });
  }

  catch (err) {
    res.status(500).json({ success: false, message: "Not working", errorMessage: err.message })
  }
}

const removeLikedVideo = async (req, res) => {

  let { likedVideos } = req
  const { _id } = req.body
  const isLikedVideo = likedVideos.videos.some(video => video._id == _id)
  try {
    if (isLikedVideo) {
      for (let video of likedVideos.videos) {
        if (video._id == _id) {
          video.active = false
        }
      }

    }
    let updateLikedVideos = await likedVideos.save();
    likedVideos = await findLikedVideo(updateLikedVideos);
    res.json({ success: true, videos: likedVideos });
  } catch (err) {
    res.status(500).json({ success: false, message: "Not working", errorMessage: err.message })
  }
}

module.exports = { getLikedVideos, updateLikedVideo, removeLikedVideo }